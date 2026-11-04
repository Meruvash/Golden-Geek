// Mercado da Elite: anúncios de jogos que os próprios vendedores cadastram, com venda inteira pelo site.
//
// Etapas de um pedido (inspiradas no fluxo de "pagamento seguro" dos mercados de jogos):
//   1. Pagamento   o comprador paga pelo Mercado Pago na conta do vendedor; a Elite recebe a comissão (5% do jogo)
//                  e o frete pela marketplace_fee (src/mercadopago.js). O frete é cotado na hora no Melhor Envio.
//   2. Envio       o vendedor gera a etiqueta em Meus anúncios (a Elite compra pela carteira dela no Melhor Envio,
//                  src/melhorenvio.js), imprime pelo link ou pelo QR e posta em até 10 dias. Sem postagem no
//                  prazo, o pagamento é devolvido sozinho.
//   3. Entrega     o Melhor Envio avisa postagem e entrega (webhook e rastreio periódico).
//   4. Conclusão   o comprador confirma que recebeu (ou o pedido conclui sozinho 7 dias depois da entrega)
//                  e avalia o vendedor; a nota aparece nos anúncios dele. Problema: o comprador abre e o editor decide.
//   Retirada em mãos: pagamento -> combinam pelo WhatsApp -> o comprador confirma (ou conclui em 15 dias).
//
// Público (só aceita chamadas do site):
//   GET  /v1/mercado/lista | /v1/mercado/anuncio?id=N | /v1/mercado/foto/<chave>
//   POST /v1/mercado/anunciar               multipart: campos + até 6 fotos + turnstile
//   POST /v1/mercado/frete    {id, cep}     opções de envio do Melhor Envio para o CEP do comprador
//   POST /v1/mercado/comprar  {id, nome, email, whatsapp, entrega, cep, servico, endereco, aceite, turnstile}
//   POST /v1/mercado/pedido   {p, k, pagamento}             o comprador acompanha as etapas
//   POST /v1/mercado/pedido/acao {p, k, acao, nota, comentario, motivo}   recebi | problema | avaliar
//   POST /v1/mercado/meu      {id, t}  |  /v1/mercado/meu/acao {id, t, acao, preco}
//   POST /v1/mercado/meu/etiqueta {id, t, pedido, remetente}   gera a etiqueta do envio
//   POST /v1/mercado/mp/conectar {id, t}  |  GET /v1/mercado/mp/retorno  (conta do Mercado Pago do vendedor)
//   POST /v1/mercado/denunciar {id, motivo}
// Serviços externos: POST /v1/mercado/mp/aviso?pedido=N (Mercado Pago), POST /v1/envio/aviso (Melhor Envio),
//   GET /v1/envio/retorno (a Elite conectando a conta do Melhor Envio)
// Moderação (Authorization: Bearer <MODERACAO_TOKEN>): /v1/moderacao/mercado/{fila, recentes, pedidos, decidir,
//   pedido (reembolsar | concluir | reabrir), envio (situação), envio/conectar}
//
// O link secreto (t) do vendedor e a chave (k) do comprador só existem no navegador deles; aqui fica só o SHA-256.
// CPF e endereço do comprador ficam cifrados e só saem para a etiqueta; o CPF do vendedor nem é guardado.

import * as mp from "./mercadopago.js";
import * as me from "./melhorenvio.js";

export const TAXA = 0.05;               // comissão da Elite sobre o preço do jogo
export const RESERVA_MIN = 30;          // tempo para pagar; enquanto isso o anúncio fica reservado
export const PRAZO_DIAS = 60;           // anúncio aprovado fica no ar 60 dias; o vendedor renova pelo link
export const PRAZO_ENVIO_DIAS = 10;     // para postar depois do pagamento; sem postagem, devolve o pagamento
export const CONCLUIR_ENTREGUE_DIAS = 7, CONCLUIR_RETIRADA_DIAS = 15;
export const MAX_FOTOS = 6;
export const MAX_FOTO_BYTES = 700 * 1024;  // o site reduz a foto no aparelho antes de enviar (1600 px, webp)
const MAX_POR_HORA = 3, MAX_POR_DIA = 10, DENUNCIAS_PARA_TIRAR = 3, COTACOES_POR_HORA = 30;

export const CONDICOES = { lacrado: "Lacrado", "como-novo": "Como novo", "usado-otimo": "Usado, ótimo estado", "usado-bom": "Usado, bom estado", "usado-marcas": "Usado, com marcas de uso" };
export const ENTREGAS = { ambos: "Envio ou retirada", envio: "Só envio", retirada: "Só retirada" };
export const IDIOMAS = { pt: "Português", en: "Inglês", independente: "Independente de idioma", outro: "Outro idioma" };
export const UFS = new Set("AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" "));
const ESTADOS_MOD = new Set(["pendente", "aprovado", "reprovado", "duvidoso"]);
const MOTIVOS = new Set(["golpe", "falso", "vendido", "ofensivo", "outro"]);
const PAGOS = ["pago", "enviado", "entregue", "concluido", "problema"];   // estados em que o contato está liberado
const PAGOS_SQL = PAGOS.map(x => `'${x}'`).join(", ");

const RESERVADO = `EXISTS (SELECT 1 FROM mercado_pedidos p WHERE p.anuncio = mercado_anuncios.id AND p.estado IN ('aguardando', 'processando')
  AND p.criado > datetime('now', '-${RESERVA_MIN + 5} minutes')) AS reservado`;
// reputação do vendedor (pela conta do Mercado Pago, que não muda de um anúncio para outro)
const REPUTACAO = `(SELECT ROUND(AVG(nota), 1) FROM mercado_avaliacoes v WHERE v.mp_usuario = mercado_anuncios.mp_usuario) AS nota,
  (SELECT COUNT(*) FROM mercado_avaliacoes v WHERE v.mp_usuario = mercado_anuncios.mp_usuario) AS avaliacoes,
  (SELECT COUNT(*) FROM mercado_pedidos p JOIN mercado_anuncios x ON x.id = p.anuncio WHERE x.mp_usuario = mercado_anuncios.mp_usuario AND p.estado = 'concluido') AS vendas`;
const LISTA_CAMPOS = "id, jogo, jogo_slug, edicao, condicao, idioma, preco, troca, entrega, frete_gratis, pacote, cidade, uf, vendedor, fotos, aprovado_em";
const PUBLICO_CAMPOS = LISTA_CAMPOS + ", descricao, estado, expira";

const limpa = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().replace(/[ \t]+/g, " ").slice(0, max + 1);
const linha = (v, max) => limpa(v, max).replace(/\s+/g, " ");
const agoraSql = () => new Date().toISOString().replace("T", " ").slice(0, 19);
const sqlData = (d) => d.toISOString().replace("T", " ").slice(0, 19);
const quandoSql = (s) => Date.parse(String(s).replace(" ", "T") + "Z");

async function sha256(texto) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function aleatorio(n) {
  const b = crypto.getRandomValues(new Uint8Array(n));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// confere a assinatura do arquivo, não só o tipo que o navegador declarou
function tipoImagem(bytes) {
  if (bytes.length > 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "image/webp";
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  return null;
}

// "(11) 98765-4321" → "5511987654321"; aceita com ou sem 55
export function normalizaWhatsapp(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  if (d.length < 10 || d.length > 11 || d[0] === "0") return null;
  return "55" + d;
}

export function normalizaInstagram(v) {
  let s = String(v || "").trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/[/?#].*$/, "");
  if (!s) return "";
  return /^[A-Za-z0-9._]{1,30}$/.test(s) ? s.toLowerCase() : null;
}

export const normalizaCep = v => { const d = String(v || "").replace(/\D/g, ""); return d.length === 8 ? d : null; };

// CPF com os dois dígitos verificadores
export function cpfValido(v) {
  const d = String(v || "").replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return null;
  const dv = n => { let s = 0; for (let i = 0; i < n; i++) s += +d[i] * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; };
  return dv(9) === +d[9] && dv(10) === +d[10] ? d : null;
}

// endereço completo (comprador na compra, vendedor na etiqueta); devolve {erro} ou {dados}
export function validaEndereco(e, quem) {
  e = e || {};
  const dados = { nome: linha(e.nome, 80), cpf: cpfValido(e.cpf), telefone: String(e.telefone || "").replace(/\D/g, "").slice(-11) || null,
    cep: normalizaCep(e.cep), rua: linha(e.rua, 120), numero: linha(e.numero, 20), complemento: linha(e.complemento, 60) || null,
    bairro: linha(e.bairro, 80), cidade: linha(e.cidade, 60), uf: String(e.uf || "").toUpperCase(), email: linha(e.email, 120) || null };
  if (dados.nome.length < 3) return { erro: `Escreva o nome completo ${quem}.` };
  if (!dados.cpf) return { erro: `CPF ${quem} inválido. Ele é exigido pela transportadora na etiqueta.` };
  if (!dados.cep) return { erro: "CEP inválido: use os 8 números." };
  if (dados.rua.length < 3 || !dados.numero || dados.bairro.length < 2 || dados.cidade.length < 2 || !UFS.has(dados.uf))
    return { erro: "Preencha o endereço completo: rua, número, bairro, cidade e UF." };
  return { dados };
}

// valida os campos de texto do anúncio; devolve {erro} ou {dados}
export function validaCampos(f) {
  const jogo = linha(f.jogo, 120), edicao = linha(f.edicao, 120), cidade = linha(f.cidade, 60), vendedor = linha(f.vendedor, 60);
  const descricao = limpa(f.descricao, 1500).replace(/\n{3,}/g, "\n\n"), uf = String(f.uf || "").toUpperCase();
  const preco = Number(f.preco), email = linha(f.email, 120);
  const slug = String(f.jogo_slug || "");
  if (jogo.length < 2 || jogo.length > 120) return { erro: "Diga qual é o jogo (de 2 a 120 letras)." };
  if (edicao.length > 120) return { erro: "A edição pode ter no máximo 120 letras." };
  if (!CONDICOES[f.condicao]) return { erro: "Escolha o estado do jogo." };
  if (!IDIOMAS[f.idioma]) return { erro: "Escolha o idioma do jogo." };
  if (!Number.isInteger(preco) || preco < 100 || preco > 10000000) return { erro: "Informe um preço entre R$ 1 e R$ 100.000." };
  if (!ENTREGAS[f.entrega]) return { erro: "Diga se envia, entrega em mãos ou os dois." };
  const envia = f.entrega !== "retirada", cep = normalizaCep(f.cep_origem);
  if (envia && !cep) return { erro: "Informe o CEP de onde o jogo vai sair: ele calcula o frete para o comprador." };
  if (envia && !me.PACOTES[f.pacote]) return { erro: "Escolha o tamanho da caixa do envio." };
  if (cidade.length < 2 || cidade.length > 60) return { erro: "Informe a cidade." };
  if (!UFS.has(uf)) return { erro: "Escolha o estado (UF)." };
  if (descricao.length > 1500) return { erro: "A descrição pode ter no máximo 1.500 caracteres." };
  if (vendedor.length < 2 || vendedor.length > 60) return { erro: "Escreva seu nome ou apelido (de 2 a 60 letras)." };
  const whatsapp = normalizaWhatsapp(f.whatsapp), instagram = normalizaInstagram(f.instagram);
  if (whatsapp === null) return { erro: "Esse WhatsApp não parece válido. Use DDD + número, por exemplo (11) 98765-4321." };
  if (instagram === null) return { erro: "Esse Instagram não parece válido. Use só o @ do perfil." };
  if (!whatsapp && !instagram) return { erro: "Deixe pelo menos um contato: WhatsApp ou Instagram." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { erro: "Esse e-mail não parece válido (ele é opcional)." };
  if (String(f.aceite) !== "1") return { erro: "Para anunciar, aceite as regras do Mercado." };
  return { dados: {
    jogo, jogo_slug: /^[a-z0-9-]{1,120}$/.test(slug) ? slug : null, edicao: edicao || null, condicao: f.condicao, idioma: f.idioma,
    preco, troca: String(f.troca) === "1" ? 1 : 0, entrega: f.entrega, cep_origem: envia ? cep : null, pacote: envia ? f.pacote : null,
    frete_gratis: envia && String(f.frete_gratis) === "1" ? 1 : 0, cidade, uf, descricao: descricao || null, vendedor,
    whatsapp: whatsapp || null, instagram: instagram || null, email: email || null } };
}

const lista = (row) => ({ ...row, fotos: JSON.parse(row.fotos || "[]"), ...("reservado" in row ? { reservado: Boolean(row.reservado) } : {}) });

async function anunciar(req, env, h, aux) {
  let form;
  try { form = await req.formData(); } catch { return aux.json({ erro: "Envio inválido." }, 400, h); }
  const f = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"));
  if (f.isca) return aux.json({ ok: true, estado: "pendente" }, 200, h);  // robô preencheu o campo escondido
  const { erro, dados } = validaCampos(f);
  if (erro) return aux.json({ erro }, 400, h);
  const arquivos = form.getAll("foto").filter(x => typeof x !== "string");
  if (!arquivos.length) return aux.json({ erro: "Coloque pelo menos uma foto do jogo." }, 400, h);
  if (arquivos.length > MAX_FOTOS) return aux.json({ erro: `No máximo ${MAX_FOTOS} fotos.` }, 400, h);
  const fotos = [];
  for (const a of arquivos) {
    const bytes = new Uint8Array(await a.arrayBuffer());
    if (bytes.length > MAX_FOTO_BYTES) return aux.json({ erro: "Uma das fotos ficou grande demais. Tente outra." }, 400, h);
    const tipo = tipoImagem(bytes);
    if (!tipo) return aux.json({ erro: "Use fotos em JPG ou WEBP." }, 400, h);
    fotos.push({ bytes, tipo });
  }
  if (!(await aux.turnstileOk(f.turnstile, req, env))) return aux.json({ erro: "Não conseguimos confirmar que você não é um robô. Tente de novo." }, 400, h);
  const ip = await aux.ipHash(req, env);
  const hora = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_anuncios WHERE ip_hash = ? AND criado > datetime('now', '-1 hour')").bind(ip).first("n");
  const dia = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_anuncios WHERE ip_hash = ?").bind(ip).first("n");  // o sal do IP muda todo dia
  if (hora >= MAX_POR_HORA || dia >= MAX_POR_DIA) return aux.json({ erro: "Muitos anúncios seguidos. Tente de novo mais tarde." }, 429, h);

  const token = aleatorio(24);
  const d = dados;
  const r = await env.DB.prepare(
    `INSERT INTO mercado_anuncios (jogo, jogo_slug, edicao, condicao, idioma, preco, troca, entrega, cep_origem, pacote, frete_gratis, cidade, uf, descricao, vendedor,
       whatsapp, instagram, email, token_hash, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(d.jogo, d.jogo_slug, d.edicao, d.condicao, d.idioma, d.preco, d.troca, d.entrega, d.cep_origem, d.pacote, d.frete_gratis, d.cidade, d.uf, d.descricao,
          d.vendedor, d.whatsapp, d.instagram, d.email, await sha256(token), ip).first();
  const id = r.id;
  const chaves = fotos.map((_, i) => `${id}-${aleatorio(6)}-${i + 1}`);
  await env.DB.batch(fotos.map((ft, i) => env.DB.prepare("INSERT INTO mercado_fotos (chave, anuncio, ordem, tipo, dados) VALUES (?, ?, ?, ?, ?)")
    .bind(chaves[i], id, i, ft.tipo, ft.bytes)));
  await env.DB.prepare("UPDATE mercado_anuncios SET fotos = ? WHERE id = ?").bind(JSON.stringify(chaves), id).run();
  return aux.json({ ok: true, id, token, estado: "pendente" }, 200, h);
}

async function listar(env, h, aux) {
  const { results } = await env.DB.prepare(
    `SELECT ${LISTA_CAMPOS}, ${RESERVADO}, ${REPUTACAO} FROM mercado_anuncios WHERE estado = 'aprovado' AND expira > datetime('now') AND mp_usuario IS NOT NULL
     ORDER BY aprovado_em DESC LIMIT 1000`).all();
  return aux.json({ anuncios: results.map(lista), prazo_dias: PRAZO_DIAS, taxa: TAXA }, 200, { ...h, "cache-control": "public, max-age=60" });
}

async function anuncio(url, env, h, aux) {
  const id = Number(url.searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) return aux.json({ erro: "anúncio inválido" }, 400, h);
  const row = await env.DB.prepare(`SELECT ${PUBLICO_CAMPOS}, mp_usuario, ${RESERVADO}, ${REPUTACAO} FROM mercado_anuncios WHERE id = ? AND estado IN ('aprovado', 'vendido')`).bind(id).first();
  if (!row) return aux.json({ erro: "Esse anúncio não existe ou saiu do ar." }, 404, h);
  if (row.estado === "aprovado" && row.expira && row.expira <= agoraSql()) return aux.json({ erro: "Esse anúncio venceu e saiu do ar." }, 404, h);
  if (row.estado === "aprovado" && !row.mp_usuario) return aux.json({ erro: "Esse anúncio ainda não está à venda." }, 404, h);
  const sai = lista(row);
  sai.compra = sai.estado === "aprovado" && mp.configurado(env);  // o botão Comprar só aparece com o pagamento ligado
  sai.envio_site = sai.entrega !== "retirada" && me.configurado(env) && await me.conectado(env);  // frete calculado pelo site
  if (sai.entrega !== "retirada" && !sai.envio_site) sai.compra = sai.compra && sai.entrega === "ambos";  // sem envio ligado, só retirada
  // últimas avaliações do vendedor
  const { results } = row.mp_usuario ? await env.DB.prepare(
    "SELECT nota, comentario, criado FROM mercado_avaliacoes WHERE mp_usuario = ? ORDER BY criado DESC LIMIT 5").bind(row.mp_usuario).all() : { results: [] };
  sai.ultimas_avaliacoes = results;
  delete sai.expira; delete sai.mp_usuario;
  return aux.json({ anuncio: sai }, 200, { ...h, "cache-control": "no-store" });
}

async function foto(url, env, ctx) {
  const chave = url.pathname.slice("/v1/mercado/foto/".length);
  if (!/^\d+-[A-Za-z0-9_-]{8}-\d$/.test(chave)) return new Response("não encontrada", { status: 404 });
  const cache = typeof caches !== "undefined" ? caches.default : null;
  const guardada = cache && await cache.match(url.toString());
  if (guardada) return guardada;
  const row = await env.DB.prepare(
    `SELECT f.tipo, f.dados FROM mercado_fotos f JOIN mercado_anuncios a ON a.id = f.anuncio
     WHERE f.chave = ? AND a.estado IN ('pendente', 'duvidoso', 'aprovado', 'vendido', 'removido')`).bind(chave).first();
  if (!row) return new Response("não encontrada", { status: 404 });
  const resp = new Response(row.dados instanceof ArrayBuffer ? row.dados : new Uint8Array(row.dados), {
    headers: { "content-type": row.tipo, "cache-control": "public, max-age=3600", "x-content-type-options": "nosniff" } });
  if (cache && ctx) ctx.waitUntil(cache.put(url.toString(), resp.clone()));
  return resp;
}

async function doDono(b, env) {
  const id = Number(b.id), t = String(b.t || "");
  if (!Number.isInteger(id) || id < 1 || t.length < 20 || t.length > 64) return null;
  const row = await env.DB.prepare(`SELECT ${PUBLICO_CAMPOS}, cep_origem, whatsapp, instagram, email, token_hash, criado, parecer, mp_usuario FROM mercado_anuncios WHERE id = ?`).bind(id).first();
  if (!row || row.token_hash !== await sha256(t)) return null;
  delete row.token_hash;
  return row;
}

const CAMPOS_VENDA = `id, comprador, email, whatsapp, entrega, valor, frete, frete_custo, frete_gratis, taxa, servico_nome, prazo_dias, estado, pago_em, criado,
  prazo_envio, etiqueta_url, envio_estado, envio_erro, rastreio, rastreio_url, postado_em, entregue_em, concluido_em, problema`;

async function meu(req, env, h, aux) {
  const row = await doDono(await req.json().catch(() => ({})), env);
  if (!row || row.estado === "removido") return aux.json({ erro: "Link de gerenciamento inválido ou anúncio já removido." }, 404, h);
  const sai = lista(row);
  if (sai.estado === "reprovado") sai.motivo = row.parecer || null;
  sai.mp_conectado = Boolean(row.mp_usuario);
  delete sai.parecer; delete sai.mp_usuario;
  // vendas pelo site: o contato do comprador só aparece depois de pago
  const { results } = await env.DB.prepare(
    `SELECT ${CAMPOS_VENDA} FROM mercado_pedidos WHERE anuncio = ? AND estado NOT IN ('aguardando', 'cancelado') ORDER BY criado DESC LIMIT 20`).bind(row.id).all();
  const vendas = results.map(v => PAGOS.includes(v.estado) ? v : { ...v, comprador: v.comprador.split(" ")[0], email: null, whatsapp: null });
  return aux.json({ anuncio: sai, vendas, prazo_dias: PRAZO_DIAS, taxa: TAXA, pagamento: mp.configurado(env), envio: me.configurado(env) }, 200, { ...h, "cache-control": "no-store" });
}

async function meuAcao(req, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  const row = await doDono(b, env);
  if (!row || row.estado === "removido") return aux.json({ erro: "Link de gerenciamento inválido ou anúncio já removido." }, 404, h);
  const id = row.id;
  if (b.acao === "remover") {
    // some do site e as fotos são apagadas; o registro fica só com o estado, sem contato.
    // Se já houve venda paga, o contato e as fotos ficam para o comprador conseguir falar com o vendedor.
    const vendeu = await env.DB.prepare(`SELECT COUNT(*) AS n FROM mercado_pedidos WHERE anuncio = ? AND estado IN (${PAGOS_SQL})`).bind(id).first("n");
    if (vendeu) {
      await env.DB.prepare("UPDATE mercado_anuncios SET estado = 'removido', atualizado = datetime('now') WHERE id = ?").bind(id).run();
      return aux.json({ ok: true, estado: "removido" }, 200, h);
    }
    await env.DB.batch([
      env.DB.prepare("DELETE FROM mercado_fotos WHERE anuncio = ?").bind(id),
      env.DB.prepare("UPDATE mercado_anuncios SET estado = 'removido', whatsapp = NULL, instagram = NULL, email = NULL, cep_origem = NULL, fotos = '[]', atualizado = datetime('now') WHERE id = ?").bind(id),
    ]);
    return aux.json({ ok: true, estado: "removido" }, 200, h);
  }
  if (b.acao === "renovar") {
    if (row.estado !== "aprovado") return aux.json({ erro: "Só um anúncio publicado pode ser renovado." }, 400, h);
    await env.DB.prepare(`UPDATE mercado_anuncios SET expira = datetime('now', '+${PRAZO_DIAS} days'), atualizado = datetime('now') WHERE id = ?`).bind(id).run();
    return aux.json({ ok: true, estado: "aprovado" }, 200, h);
  }
  if (b.acao === "preco") {
    const preco = Number(b.preco);
    if (!Number.isInteger(preco) || preco < 100 || preco > 10000000) return aux.json({ erro: "Informe um preço entre R$ 1 e R$ 100.000." }, 400, h);
    if (!["aprovado", "pendente", "duvidoso"].includes(row.estado)) return aux.json({ erro: "Esse anúncio não aceita mais mudança de preço." }, 400, h);
    await env.DB.prepare("UPDATE mercado_anuncios SET preco = ?, atualizado = datetime('now') WHERE id = ?").bind(preco, id).run();
    return aux.json({ ok: true, preco }, 200, h);
  }
  return aux.json({ erro: "ação desconhecida" }, 400, h);
}

async function denunciar(req, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  const id = Number(b.id), motivo = MOTIVOS.has(b.motivo) ? b.motivo : null;
  if (!Number.isInteger(id) || !motivo) return aux.json({ erro: "dados inválidos" }, 400, h);
  const ip = await aux.ipHash(req, env);
  const r = await env.DB.prepare("INSERT OR IGNORE INTO mercado_denuncias (anuncio, ip_hash, motivo) SELECT id, ?, ? FROM mercado_anuncios WHERE id = ? AND estado = 'aprovado'")
    .bind(ip, motivo, id).run();
  if (r.meta.changes) {
    const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_denuncias WHERE anuncio = ?").bind(id).first("n");
    if (n >= DENUNCIAS_PARA_TIRAR)
      await env.DB.prepare("UPDATE mercado_anuncios SET estado = 'duvidoso', parecer = ?, decidido_por = 'denuncias', decidido_em = datetime('now') WHERE id = ? AND estado = 'aprovado'")
        .bind(`Saiu do ar sozinho depois de ${n} denúncias. Confira antes de publicar de novo.`, id).run();
  }
  return aux.json({ ok: true }, 200, h);
}

/* ---------- Mercado Pago: conexão da conta do vendedor ---------- */
const origemApi = (url, env) => env.API_ORIGEM || url.origin;
const retornoMP = (url, env) => `${origemApi(url, env)}/v1/mercado/mp/retorno`;
const retornoME = (url, env) => `${origemApi(url, env)}/v1/envio/retorno`;

async function conectar(req, url, env, h, aux) {
  if (!mp.configurado(env)) return aux.json({ erro: "Os pagamentos do Mercado ainda não foram ligados. Tente mais tarde." }, 503, h);
  const row = await doDono(await req.json().catch(() => ({})), env);
  if (!row || ["removido", "reprovado", "vendido"].includes(row.estado)) return aux.json({ erro: "Link de gerenciamento inválido ou anúncio encerrado." }, 404, h);
  const state = mp.aleatorioUrl(24), verificador = mp.aleatorioUrl(48);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM mercado_mp_oauth WHERE criado < datetime('now', '-15 minutes')"),
    env.DB.prepare("INSERT INTO mercado_mp_oauth (state, anuncio, verificador) VALUES (?, ?, ?)").bind(state, row.id, verificador),
  ]);
  return aux.json({ url: mp.urlAutorizacao(env, { state, desafio: await mp.desafioPkce(verificador), retorno: retornoMP(url, env) }) }, 200, h);
}

async function retorno(url, env) {
  const volta = (q) => Response.redirect(`${env.ORIGEM}/mercado/meu/?${q}`, 302);
  const state = url.searchParams.get("state") || "", codigo = url.searchParams.get("code") || "";
  const o = state && await env.DB.prepare("SELECT anuncio, verificador FROM mercado_mp_oauth WHERE state = ? AND criado > datetime('now', '-15 minutes')").bind(state).first();
  if (!o) return volta("mp=expirou");
  await env.DB.prepare("DELETE FROM mercado_mp_oauth WHERE state = ?").bind(state).run();
  if (!codigo) return volta(`mp=recusado&id=${o.anuncio}`);
  try {
    const usuario = await mp.trocaCodigo(env, { codigo, verificador: o.verificador, retorno: retornoMP(url, env) });
    await env.DB.prepare("UPDATE mercado_anuncios SET mp_usuario = ?, atualizado = datetime('now') WHERE id = ?").bind(usuario, o.anuncio).run();
    return volta(`mp=ok&id=${o.anuncio}`);
  } catch {
    return volta(`mp=erro&id=${o.anuncio}`);
  }
}

/* ---------- frete (Melhor Envio) ---------- */
async function opcoesFrete(env, a, cep) {
  const ops = await me.cota(env, { cepOrigem: a.cep_origem, cepDestino: cep, pacote: a.pacote, valor: a.preco });
  // frete grátis: o vendedor paga, então só a opção mais barata entra (sem custo para o comprador)
  return a.frete_gratis ? ops.slice(0, 1).map(o => ({ ...o, cobrado: 0 })) : ops.slice(0, 6).map(o => ({ ...o, cobrado: o.preco }));
}

async function frete(req, env, h, aux) {
  if (!me.configurado(env) || !(await me.conectado(env))) return aux.json({ erro: "O cálculo de frete pelo site ainda não foi ligado." }, 503, h);
  const b = await req.json().catch(() => ({}));
  const id = Number(b.id), cep = normalizaCep(b.cep);
  if (!cep) return aux.json({ erro: "CEP inválido: use os 8 números." }, 400, h);
  const a = await env.DB.prepare("SELECT id, preco, entrega, cep_origem, pacote, frete_gratis, estado FROM mercado_anuncios WHERE id = ?").bind(id).first();
  if (!a || a.estado !== "aprovado" || a.entrega === "retirada" || !a.cep_origem) return aux.json({ erro: "Esse anúncio não tem envio." }, 404, h);
  const ip = await aux.ipHash(req, env);
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_cotacoes WHERE ip_hash = ? AND criado > datetime('now', '-1 hour')").bind(ip).first("n");
  if (n >= COTACOES_POR_HORA) return aux.json({ erro: "Muitas cotações seguidas. Tente de novo daqui a pouco." }, 429, h);
  await env.DB.prepare("INSERT INTO mercado_cotacoes (ip_hash) VALUES (?)").bind(ip).run();
  try {
    const opcoes = await opcoesFrete(env, a, cep);
    if (!opcoes.length) return aux.json({ erro: "Nenhuma transportadora atende esse CEP para este pacote." }, 404, h);
    return aux.json({ opcoes: opcoes.map(({ servico, nome, empresa, logo, prazo, cobrado }) => ({ servico, nome, empresa, logo, prazo, preco: cobrado })), gratis: Boolean(a.frete_gratis) }, 200, h);
  } catch {
    return aux.json({ erro: "Não conseguimos calcular o frete agora. Tente de novo em alguns minutos." }, 502, h);
  }
}

/* ---------- compra ---------- */
const reaisMP = c => Math.round(c) / 100;
const isoMP = d => d.toISOString().replace("Z", "-00:00");  // formato das datas que o Mercado Pago pede

async function comprar(req, url, env, h, aux) {
  if (!mp.configurado(env)) return aux.json({ erro: "Os pagamentos do Mercado ainda não foram ligados." }, 503, h);
  const b = await req.json().catch(() => ({}));
  const id = Number(b.id), nome = linha(b.nome, 60), email = linha(b.email, 120), whatsapp = normalizaWhatsapp(b.whatsapp);
  if (b.isca) return aux.json({ erro: "Não deu para iniciar a compra." }, 400, h);
  if (!Number.isInteger(id) || id < 1) return aux.json({ erro: "anúncio inválido" }, 400, h);
  if (nome.length < 2 || nome.length > 60) return aux.json({ erro: "Escreva seu nome (de 2 a 60 letras)." }, 400, h);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return aux.json({ erro: "Informe um e-mail válido: é por ele que o Mercado Pago manda o comprovante." }, 400, h);
  if (!whatsapp) return aux.json({ erro: "Informe seu WhatsApp com DDD, para o vendedor combinar a entrega com você." }, 400, h);
  if (String(b.aceite) !== "1") return aux.json({ erro: "Para comprar, aceite as regras do Mercado." }, 400, h);
  const a = await env.DB.prepare(`SELECT id, jogo, edicao, preco, entrega, cep_origem, pacote, frete_gratis, estado, expira, mp_usuario, fotos FROM mercado_anuncios WHERE id = ?`).bind(id).first();
  if (!a || a.estado !== "aprovado" || !a.mp_usuario || !(a.expira > agoraSql())) return aux.json({ erro: "Esse jogo não está mais à venda." }, 409, h);
  const entrega = a.entrega === "ambos" ? b.entrega : a.entrega;
  if (!["envio", "retirada"].includes(entrega)) return aux.json({ erro: "Escolha se quer receber pelo correio ou retirar em mãos." }, 400, h);
  let opcao = null, destino = null;
  if (entrega === "envio") {
    if (!me.configurado(env) || !(await me.conectado(env))) return aux.json({ erro: "O envio pelo site ainda não foi ligado. Escolha retirada em mãos." }, 503, h);
    const end = validaEndereco({ ...b.endereco, nome: (b.endereco && b.endereco.nome) || nome, email, telefone: whatsapp }, "de quem recebe");
    if (end.erro) return aux.json({ erro: end.erro }, 400, h);
    destino = end.dados;
    try { opcao = (await opcoesFrete(env, a, destino.cep)).find(o => o.servico === Number(b.servico)); }
    catch { return aux.json({ erro: "Não conseguimos confirmar o frete agora. Tente de novo em alguns minutos." }, 502, h); }
    if (!opcao) return aux.json({ erro: "Essa opção de envio não está mais disponível. Calcule o frete de novo." }, 409, h);
  }
  if (!(await aux.turnstileOk(b.turnstile, req, env))) return aux.json({ erro: "Não conseguimos confirmar que você não é um robô. Tente de novo." }, 400, h);
  const ip = await aux.ipHash(req, env);
  const tentativas = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_pedidos WHERE ip_hash = ? AND criado > datetime('now', '-1 hour')").bind(ip).first("n");
  if (tentativas >= 10) return aux.json({ erro: "Muitas tentativas seguidas. Tente de novo mais tarde." }, 429, h);
  // reserva: só uma pessoa paga por vez. Quem fechou a janela do pagamento pode tentar de novo (o pedido antigo é cancelado).
  const aberto = await env.DB.prepare(`SELECT id, ip_hash, estado FROM mercado_pedidos WHERE anuncio = ? AND estado IN ('aguardando', 'processando')
    AND criado > datetime('now', '-${RESERVA_MIN + 5} minutes') ORDER BY id DESC LIMIT 1`).bind(id).first();
  if (aberto && !(aberto.ip_hash === ip && aberto.estado === "aguardando"))
    return aux.json({ erro: `Alguém está pagando por este jogo agora. Se o pagamento não for concluído, ele volta à venda em até ${RESERVA_MIN} minutos.` }, 409, h);
  if (aberto) await env.DB.prepare("UPDATE mercado_pedidos SET estado = 'cancelado', mp_status = 'substituido', atualizado = datetime('now') WHERE id = ?").bind(aberto.id).run();

  const taxa = Math.round(a.preco * TAXA), custo = opcao ? opcao.preco : 0, cobrado = opcao ? opcao.cobrado : 0;
  // a Elite recebe a comissão e o custo da etiqueta (que ela compra); com frete grátis o custo sai da parte do vendedor
  const paraElite = taxa + custo;
  if (paraElite > Math.round(a.preco * 0.6)) return aux.json({ erro: "O frete grátis deste anúncio não cobre o envio até o seu CEP. Escolha retirada ou fale com o vendedor." }, 409, h);
  const chave = mp.aleatorioUrl(24);
  const ped = await env.DB.prepare(`INSERT INTO mercado_pedidos (anuncio, chave_hash, comprador, email, whatsapp, entrega, valor, frete, frete_custo, frete_gratis,
      servico, servico_nome, prazo_dias, destino, taxa, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(id, await sha256(chave), nome, email, whatsapp, entrega, a.preco, cobrado, custo, a.frete_gratis && opcao ? 1 : 0,
          opcao ? opcao.servico : null, opcao ? `${opcao.empresa || ""} ${opcao.nome}`.trim() : null, opcao ? opcao.prazo : null,
          destino ? await mp.cifra(env, JSON.stringify(destino)) : null, taxa, ip).first();
  const volta = `${env.ORIGEM}/mercado/pedido/?p=${ped.id}&k=${chave}`, fim = new Date(Date.now() + RESERVA_MIN * 60e3);
  const itens = [{ id: `anuncio-${a.id}`, title: a.jogo.slice(0, 250), description: (a.edicao || "Mercado da Elite").slice(0, 250), category_id: "games",
                   quantity: 1, currency_id: "BRL", unit_price: reaisMP(a.preco) }];
  if (cobrado) itens.push({ id: `frete-${a.id}`, title: `Envio ${opcao.nome}`.slice(0, 250), quantity: 1, currency_id: "BRL", unit_price: reaisMP(cobrado) });
  try {
    const token = await mp.tokenVendedor(env, a.mp_usuario);
    const pref = await mp.criaPreferencia(token, {
      items: itens, marketplace_fee: reaisMP(paraElite), external_reference: `eb-${ped.id}`,
      payer: { name: nome, email },
      back_urls: { success: volta, pending: volta, failure: volta }, auto_return: "approved",
      notification_url: `${origemApi(url, env)}/v1/mercado/mp/aviso?pedido=${ped.id}`,
      payment_methods: { excluded_payment_types: [{ id: "ticket" }], installments: 12 },  // sem boleto: demora dias e prenderia a reserva
      expires: true, expiration_date_from: isoMP(new Date(Date.now() - 60e3)), expiration_date_to: isoMP(fim), date_of_expiration: isoMP(fim),
      statement_descriptor: "ELITE MERCADO",
    });
    await env.DB.prepare("UPDATE mercado_pedidos SET preferencia = ? WHERE id = ?").bind(String(pref.id), ped.id).run();
    return aux.json({ ok: true, pedido: ped.id, chave, url: pref.init_point }, 200, h);
  } catch {
    await env.DB.prepare("UPDATE mercado_pedidos SET estado = 'cancelado', mp_status = 'erro-preferencia', atualizado = datetime('now') WHERE id = ?").bind(ped.id).run();
    return aux.json({ erro: "Não conseguimos abrir o pagamento agora. Tente de novo em alguns minutos." }, 502, h);
  }
}

// estado do pagamento no Mercado Pago -> estado do pedido
const ESTADO_PAGAMENTO = { approved: "pago", pending: "processando", in_process: "processando", authorized: "processando", in_mediation: "pago",
                           rejected: "cancelado", cancelled: "cancelado", refunded: "devolvido", charged_back: "devolvido" };

// confere o pagamento direto na API do Mercado Pago (nunca confia só na notificação) e atualiza pedido e anúncio
async function sincroniza(env, pedido, pagamentoId) {
  const a = await env.DB.prepare("SELECT id, estado, mp_usuario FROM mercado_anuncios WHERE id = ?").bind(pedido.anuncio).first();
  if (!a || !a.mp_usuario) return pedido;
  const pay = await mp.buscaPagamento(await mp.tokenVendedor(env, a.mp_usuario), pagamentoId);
  if (pay.external_reference !== `eb-${pedido.id}`) return pedido;  // pagamento de outro pedido: ignora
  let estado = ESTADO_PAGAMENTO[pay.status] || pedido.estado;
  if (estado === "pago" && Math.round(Number(pay.transaction_amount) * 100) < pedido.valor + pedido.frete) estado = "processando";  // valor menor que o pedido: não libera
  // depois de pago, o pagamento "aprovado" não faz o pedido voltar etapas (enviado, entregue, concluído...)
  if (PAGOS.includes(pedido.estado) && (estado === "pago" || estado === "processando" || estado === "cancelado")) estado = pedido.estado;
  if (pedido.estado === "devolvido") estado = "devolvido";
  const novoPago = estado === "pago" && !PAGOS.includes(pedido.estado);
  const prazo = novoPago && pedido.entrega === "envio" ? sqlData(new Date(Date.now() + PRAZO_ENVIO_DIAS * 86400e3)) : pedido.prazo_envio || null;
  await env.DB.prepare(`UPDATE mercado_pedidos SET estado = ?, pagamento = ?, mp_status = ?, prazo_envio = ?, atualizado = datetime('now'),
    pago_em = CASE WHEN ? THEN COALESCE(pago_em, datetime('now')) ELSE pago_em END WHERE id = ?`)
    .bind(estado, String(pay.id), String(pay.status), prazo, novoPago ? 1 : 0, pedido.id).run();
  if (novoPago && a.estado === "aprovado")
    await env.DB.prepare("UPDATE mercado_anuncios SET estado = 'vendido', atualizado = datetime('now') WHERE id = ?").bind(a.id).run();
  return { ...pedido, estado, pagamento: String(pay.id), prazo_envio: prazo };
}

async function aviso(req, url, env) {
  const corpo = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  const tipo = corpo.type || corpo.topic || url.searchParams.get("type") || url.searchParams.get("topic");
  const pagamentoId = (corpo.data && corpo.data.id) || url.searchParams.get("data.id") || (tipo === "payment" ? url.searchParams.get("id") : null);
  const pid = Number(url.searchParams.get("pedido"));
  if (tipo !== "payment" || !pagamentoId || !Number.isInteger(pid)) return new Response("ok");  // outros avisos não interessam
  const pedido = await env.DB.prepare("SELECT * FROM mercado_pedidos WHERE id = ?").bind(pid).first();
  if (!pedido) return new Response("ok");
  try { await sincroniza(env, pedido, pagamentoId); } catch { return new Response("tente de novo", { status: 500 }); }  // o Mercado Pago reenvia
  return new Response("ok");
}

async function doComprador(b, env) {
  const id = Number(b.p), k = String(b.k || "");
  if (!Number.isInteger(id) || k.length < 20 || k.length > 64) return null;
  const pedido = await env.DB.prepare("SELECT * FROM mercado_pedidos WHERE id = ?").bind(id).first();
  return pedido && pedido.chave_hash === await sha256(k) ? pedido : null;
}

async function verPedido(req, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  let pedido = await doComprador(b, env);
  if (!pedido) return aux.json({ erro: "Pedido não encontrado." }, 404, h);
  // na volta do Mercado Pago o endereço traz o número do pagamento: confere na hora, sem esperar a notificação
  const pag = String(b.pagamento || "");
  if (/^\d{5,20}$/.test(pag) && ["aguardando", "processando"].includes(pedido.estado)) {
    try { pedido = await sincroniza(env, pedido, pag); } catch { /* segue com o que já sabemos */ }
  }
  if (pedido.estado === "aguardando" && quandoSql(pedido.criado) < Date.now() - (RESERVA_MIN + 5) * 60e3) pedido.estado = "cancelado";
  const a = await env.DB.prepare("SELECT id, jogo, edicao, cidade, uf, vendedor, whatsapp, instagram, fotos FROM mercado_anuncios WHERE id = ?").bind(pedido.anuncio).first();
  const nota = await env.DB.prepare("SELECT nota, comentario FROM mercado_avaliacoes WHERE pedido = ?").bind(pedido.id).first();
  const campos = ["id", "estado", "entrega", "valor", "frete", "frete_gratis", "servico_nome", "prazo_dias", "criado", "pago_em", "prazo_envio",
                  "envio_estado", "rastreio", "rastreio_url", "etiqueta_em", "postado_em", "entregue_em", "concluido_em", "problema"];
  const sai = Object.fromEntries(campos.map(c => [c, pedido[c] ?? null]));
  sai.avaliacao = nota || null;
  sai.anuncio = { id: a.id, jogo: a.jogo, edicao: a.edicao, cidade: a.cidade, uf: a.uf, vendedor: a.vendedor, foto: JSON.parse(a.fotos || "[]")[0] || null };
  if (PAGOS.includes(pedido.estado)) Object.assign(sai.anuncio, { whatsapp: a.whatsapp, instagram: a.instagram });  // só quem pagou vê o contato
  return aux.json({ pedido: sai, prazos: { envio: PRAZO_ENVIO_DIAS, concluir: CONCLUIR_ENTREGUE_DIAS } }, 200, { ...h, "cache-control": "no-store" });
}

// o comprador confirma que recebeu, abre um problema ou avalia o vendedor
async function pedidoAcao(req, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  const pedido = await doComprador(b, env);
  if (!pedido) return aux.json({ erro: "Pedido não encontrado." }, 404, h);
  if (b.acao === "recebi") {
    const pode = ["enviado", "entregue"].includes(pedido.estado) || (pedido.estado === "pago" && pedido.entrega === "retirada");
    if (!pode) return aux.json({ erro: pedido.estado === "pago" ? "O jogo ainda não foi postado." : "Esse pedido não está esperando confirmação." }, 409, h);
    await env.DB.prepare("UPDATE mercado_pedidos SET estado = 'concluido', concluido_em = datetime('now'), entregue_em = COALESCE(entregue_em, datetime('now')), atualizado = datetime('now') WHERE id = ?").bind(pedido.id).run();
    return aux.json({ ok: true, estado: "concluido" }, 200, h);
  }
  if (b.acao === "problema") {
    const motivo = limpa(b.motivo, 1000);
    if (!["pago", "enviado", "entregue"].includes(pedido.estado)) return aux.json({ erro: "Esse pedido não aceita mais reclamação pelo site. Fale com a Elite pelo Instagram." }, 409, h);
    if (motivo.length < 10) return aux.json({ erro: "Conte em poucas palavras o que aconteceu (pelo menos 10 letras)." }, 400, h);
    await env.DB.prepare("UPDATE mercado_pedidos SET estado = 'problema', problema = ?, atualizado = datetime('now') WHERE id = ?").bind(motivo, pedido.id).run();
    return aux.json({ ok: true, estado: "problema" }, 200, h);
  }
  if (b.acao === "avaliar") {
    const nota = Number(b.nota), comentario = limpa(b.comentario, 500) || null;
    if (pedido.estado !== "concluido") return aux.json({ erro: "Dá para avaliar depois que o pedido é concluído." }, 409, h);
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) return aux.json({ erro: "Escolha de 1 a 5 estrelas." }, 400, h);
    const a = await env.DB.prepare("SELECT mp_usuario FROM mercado_anuncios WHERE id = ?").bind(pedido.anuncio).first();
    const r = await env.DB.prepare("INSERT OR IGNORE INTO mercado_avaliacoes (pedido, mp_usuario, nota, comentario) VALUES (?, ?, ?, ?)")
      .bind(pedido.id, a.mp_usuario, nota, comentario).run();
    if (!r.meta.changes) return aux.json({ erro: "Você já avaliou este pedido." }, 409, h);
    return aux.json({ ok: true }, 200, h);
  }
  return aux.json({ erro: "ação desconhecida" }, 400, h);
}

/* ---------- etiqueta (o vendedor gera em Meus anúncios) ---------- */
async function etiqueta(req, url, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  const row = await doDono(b, env);
  if (!row) return aux.json({ erro: "Link de gerenciamento inválido." }, 404, h);
  const pedido = await env.DB.prepare("SELECT * FROM mercado_pedidos WHERE id = ? AND anuncio = ?").bind(Number(b.pedido), row.id).first();
  if (!pedido) return aux.json({ erro: "Venda não encontrada." }, 404, h);
  if (pedido.estado !== "pago" || pedido.entrega !== "envio") return aux.json({ erro: "Essa venda não está esperando etiqueta." }, 409, h);
  if (pedido.etiqueta_url) return aux.json({ ok: true, url: pedido.etiqueta_url }, 200, h);
  if (!me.configurado(env) || !(await me.conectado(env))) return aux.json({ erro: "A geração de etiquetas está fora do ar. A Elite já foi avisada." }, 503, h);
  const rem = validaEndereco({ ...b.remetente, telefone: (b.remetente && b.remetente.telefone) || (row.whatsapp || "").slice(2) }, "de quem envia");
  if (rem.erro) return aux.json({ erro: rem.erro }, 400, h);
  // trava: só uma geração por venda, mesmo com dois cliques
  const trava = await env.DB.prepare("UPDATE mercado_pedidos SET envio_estado = 'gerando', atualizado = datetime('now') WHERE id = ? AND (envio_estado IS NULL OR envio_estado IN ('erro', 'cancelada'))").bind(pedido.id).run();
  if (!trava.meta.changes) return aux.json({ erro: "A etiqueta já está sendo gerada. Atualize a página em alguns segundos." }, 409, h);
  const destino = JSON.parse(await mp.decifra(env, pedido.destino));
  try {
    const e = await me.compraEtiqueta(env, { servico: pedido.servico, remetente: rem.dados, destinatario: destino, pacote: row.pacote,
      jogo: row.jogo, valor: pedido.valor, pedido: pedido.id, url: `${env.ORIGEM}/mercado/` });
    await env.DB.prepare(`UPDATE mercado_pedidos SET envio_estado = 'gerada', envio_erro = NULL, etiqueta = ?, etiqueta_url = ?, etiqueta_custo = ?, protocolo = ?,
      etiqueta_em = datetime('now'), atualizado = datetime('now') WHERE id = ?`).bind(e.id, e.url, e.custo, e.protocolo, pedido.id).run();
    return aux.json({ ok: true, url: e.url, protocolo: e.protocolo }, 200, h);
  } catch (ex) {
    const msg = String(ex.message || "erro").slice(0, 300);
    await env.DB.prepare("UPDATE mercado_pedidos SET envio_estado = 'erro', envio_erro = ?, atualizado = datetime('now') WHERE id = ?").bind(msg, pedido.id).run();
    const saldo = /saldo|balance|insufficient|insuficiente/i.test(JSON.stringify(ex.dados || {}) + msg);
    return aux.json({ erro: saldo ? "A Elite está sem saldo para etiquetas agora. O editor foi avisado pelo painel; tente de novo mais tarde."
                                  : "Não conseguimos gerar a etiqueta. Confira o endereço de quem envia e tente de novo." }, 502, h);
  }
}

// aplica um estado do Melhor Envio (webhook ou rastreio) num pedido
async function aplicaEnvio(env, pedido, d) {
  const status = String(d.status || "");
  const rastreio = d.tracking || d.self_tracking || d.melhorenvio_tracking || pedido.rastreio || null;
  const rastreioUrl = d.tracking_url || (rastreio ? `https://melhorrastreio.com.br/rastreio/${encodeURIComponent(rastreio)}` : null);
  let estado = pedido.estado, envio = pedido.envio_estado;
  if (status === "posted" && pedido.estado === "pago") { estado = "enviado"; envio = "postada"; }
  if (status === "delivered" && ["pago", "enviado"].includes(pedido.estado)) { estado = "entregue"; envio = "entregue"; }
  if (status === "canceled" || status === "cancelled") envio = "cancelada";
  if (["undelivered", "paused", "suspended"].includes(status)) envio = "atencao";
  await env.DB.prepare(`UPDATE mercado_pedidos SET estado = ?, envio_estado = ?, rastreio = ?, rastreio_url = ?,
      postado_em = COALESCE(postado_em, ?), entregue_em = COALESCE(entregue_em, ?), etiqueta_url = CASE WHEN ? = 'cancelada' THEN NULL ELSE etiqueta_url END,
      rastreado_em = datetime('now'), atualizado = datetime('now') WHERE id = ?`)
    .bind(estado, envio, rastreio, rastreioUrl, d.posted_at || (envio === "postada" ? agoraSql() : null),
          d.delivered_at || (envio === "entregue" ? agoraSql() : null), envio, pedido.id).run();
}

async function avisoEnvio(req, env) {
  const corpo = await req.text();
  if (!(await me.assinaturaOk(env, corpo, req.headers.get("x-me-signature")))) return new Response("assinatura", { status: 401 });
  let d; try { d = JSON.parse(corpo); } catch { return new Response("ok"); }
  const dados = d.data || {}, tag = (dados.tags || []).map(t => t.tag || "").find(t => /^eb-\d+$/.test(t));
  const pedido = tag ? await env.DB.prepare("SELECT * FROM mercado_pedidos WHERE id = ? AND etiqueta = ?").bind(Number(tag.slice(3)), String(dados.id)).first() : null;
  if (!pedido) return new Response("ok");
  const evento = String(d.event || "").replace(/^order\./, "");
  const status = { posted: "posted", delivered: "delivered", cancelled: "canceled", undelivered: "undelivered", paused: "paused", suspended: "suspended" }[evento];
  if (status) await aplicaEnvio(env, pedido, { ...dados, status });
  return new Response("ok");
}

/* ---------- rotina (cron): rastreio, prazos e conclusões ---------- */
export async function rotinaMercado(env) {
  const feito = { rastreados: 0, concluidos: 0, devolvidos: 0 };
  // 1. rastreio das etiquetas em trânsito (o webhook é o principal; isto cobre aviso perdido), no máximo a cada 2 horas por pedido
  if (me.configurado(env) && await me.conectado(env).catch(() => false)) {
    const { results } = await env.DB.prepare(`SELECT * FROM mercado_pedidos WHERE etiqueta IS NOT NULL AND estado IN ('pago', 'enviado')
      AND (rastreado_em IS NULL OR rastreado_em < datetime('now', '-2 hours')) LIMIT 50`).all();
    if (results.length) {
      try {
        const r = await me.rastreia(env, results.map(p => p.etiqueta));
        for (const p of results) if (r[p.etiqueta]) { await aplicaEnvio(env, p, r[p.etiqueta]); feito.rastreados++; }
      } catch { /* tenta na próxima */ }
    }
    try { await me.token(env); } catch { /* renova o token do Melhor Envio quando estiver perto de vencer */ }
  }
  // 2. conclusão automática: entregue há 7 dias, ou retirada paga há 15 dias, sem reclamação
  const c = await env.DB.prepare(`UPDATE mercado_pedidos SET estado = 'concluido', concluido_em = datetime('now'), atualizado = datetime('now')
    WHERE (estado = 'entregue' AND entregue_em < datetime('now', '-${CONCLUIR_ENTREGUE_DIAS} days'))
       OR (estado = 'pago' AND entrega = 'retirada' AND pago_em < datetime('now', '-${CONCLUIR_RETIRADA_DIAS} days'))`).run();
  feito.concluidos = c.meta.changes;
  // 3. prazo de envio estourado sem postagem: devolve o pagamento ao comprador e o anúncio volta à venda
  if (mp.configurado(env)) {
    const { results } = await env.DB.prepare(`SELECT p.*, a.mp_usuario FROM mercado_pedidos p JOIN mercado_anuncios a ON a.id = p.anuncio
      WHERE p.estado = 'pago' AND p.entrega = 'envio' AND p.postado_em IS NULL AND p.prazo_envio < datetime('now') AND p.pagamento IS NOT NULL LIMIT 20`).all();
    for (const p of results) {
      try {
        await mp.reembolsa(await mp.tokenVendedor(env, p.mp_usuario), p.pagamento, `eb-prazo-${p.id}`);
        await env.DB.batch([
          env.DB.prepare(`UPDATE mercado_pedidos SET estado = 'devolvido', envio_erro = COALESCE(envio_erro, ?), atualizado = datetime('now') WHERE id = ?`)
            .bind(p.etiqueta ? "Devolvido por prazo: cancele a etiqueta no Melhor Envio para recuperar o valor." : "Devolvido por prazo de envio.", p.id),
          env.DB.prepare("UPDATE mercado_anuncios SET estado = 'aprovado', atualizado = datetime('now') WHERE id = ? AND estado = 'vendido'").bind(p.anuncio),
        ]);
        feito.devolvidos++;
      } catch { /* tenta na próxima rodada */ }
    }
  }
  return feito;
}

/* ---------- moderação ---------- */
async function moderacao(req, url, env, aux) {
  const rota = url.pathname.slice("/v1/moderacao/mercado/".length);
  const campos = `${PUBLICO_CAMPOS}, cep_origem, whatsapp, instagram, email, criado, parecer, decidido_por, decidido_em, mp_usuario,
    (SELECT COUNT(*) FROM mercado_denuncias d WHERE d.anuncio = mercado_anuncios.id) AS denuncias,
    (SELECT group_concat(motivo) FROM mercado_denuncias d WHERE d.anuncio = mercado_anuncios.id) AS motivos`;
  if (rota === "fila") {
    const { results } = await env.DB.prepare(`SELECT ${campos} FROM mercado_anuncios WHERE estado IN ('pendente', 'duvidoso') ORDER BY criado ASC LIMIT 200`).all();
    return aux.json({ anuncios: results.map(lista) });
  }
  if (rota === "pedidos") {
    const { results } = await env.DB.prepare(
      `SELECT p.*, a.jogo, a.vendedor FROM mercado_pedidos p JOIN mercado_anuncios a ON a.id = p.anuncio ORDER BY p.criado DESC LIMIT 200`).all();
    results.forEach(x => { delete x.chave_hash; delete x.ip_hash; delete x.destino; });
    return aux.json({ pedidos: results, envio: { configurado: me.configurado(env), conectado: await me.conectado(env) } });
  }
  if (rota === "recentes") {
    const { results } = await env.DB.prepare(`SELECT ${campos} FROM mercado_anuncios ORDER BY criado DESC LIMIT 200`).all();
    return aux.json({ anuncios: results.map(lista) });
  }
  if (rota === "envio") return aux.json({ configurado: me.configurado(env), conectado: await me.conectado(env) });
  if (rota === "envio/conectar" && req.method === "POST") {
    if (!me.configurado(env)) return aux.json({ erro: "Faltam ME_CLIENT_ID, ME_CLIENT_SECRET e ME_CONTATO no serviço." }, 503);
    const state = mp.aleatorioUrl(24);
    await env.DB.batch([env.DB.prepare("DELETE FROM mercado_envio_oauth WHERE criado < datetime('now', '-15 minutes')"),
                        env.DB.prepare("INSERT INTO mercado_envio_oauth (state) VALUES (?)").bind(state)]);
    return aux.json({ url: me.urlAutorizacao(env, { state, retorno: retornoME(url, env) }) });
  }
  if (rota === "pedido" && req.method === "POST") {
    const { id, acao } = await req.json().catch(() => ({}));
    const p = await env.DB.prepare("SELECT p.*, a.mp_usuario FROM mercado_pedidos p JOIN mercado_anuncios a ON a.id = p.anuncio WHERE p.id = ?").bind(Number(id)).first();
    if (!p) return aux.json({ erro: "pedido não encontrado" }, 404);
    if (acao === "reembolsar") {
      if (!PAGOS.includes(p.estado) || !p.pagamento) return aux.json({ erro: "só pedido pago pode ser devolvido" }, 409);
      try { await mp.reembolsa(await mp.tokenVendedor(env, p.mp_usuario), p.pagamento, `eb-editor-${p.id}`); }
      catch (e) { return aux.json({ erro: `o Mercado Pago recusou: ${e.message}` }, 502); }
      await env.DB.prepare("UPDATE mercado_pedidos SET estado = 'devolvido', atualizado = datetime('now') WHERE id = ?").bind(p.id).run();
      return aux.json({ ok: true, estado: "devolvido" });
    }
    if (acao === "concluir") {
      await env.DB.prepare("UPDATE mercado_pedidos SET estado = 'concluido', concluido_em = datetime('now'), atualizado = datetime('now') WHERE id = ?").bind(p.id).run();
      return aux.json({ ok: true, estado: "concluido" });
    }
    if (acao === "reabrir" && p.estado === "problema") {
      const volta = p.entregue_em ? "entregue" : p.postado_em ? "enviado" : "pago";
      await env.DB.prepare("UPDATE mercado_pedidos SET estado = ?, atualizado = datetime('now') WHERE id = ?").bind(volta, p.id).run();
      return aux.json({ ok: true, estado: volta });
    }
    return aux.json({ erro: "ação desconhecida" }, 400);
  }
  if (rota === "decidir" && req.method === "POST") {
    const { id, estado, parecer, por } = await req.json().catch(() => ({}));
    if (!Number.isInteger(id) || !ESTADOS_MOD.has(estado)) return aux.json({ erro: "dados inválidos" }, 400);
    const atual = await env.DB.prepare("SELECT estado FROM mercado_anuncios WHERE id = ?").bind(id).first("estado");
    if (!atual || atual === "removido") return aux.json({ erro: "anúncio removido pelo vendedor" }, 409);
    // a aprovação começa a contar o prazo; reaprovar depois de uma denúncia infundada mantém o prazo que já corria
    const prazo = estado === "aprovado" ? `, aprovado_em = COALESCE(aprovado_em, datetime('now')), expira = COALESCE(expira, datetime('now', '+${PRAZO_DIAS} days'))` : "";
    await env.DB.prepare(`UPDATE mercado_anuncios SET estado = ?, parecer = COALESCE(?, parecer), decidido_por = ?, decidido_em = datetime('now')${prazo} WHERE id = ?`)
      .bind(estado, parecer ? String(parecer).slice(0, 500) : null, por === "ia" ? "ia" : "editor", id).run();
    if (estado === "aprovado") await env.DB.prepare("DELETE FROM mercado_denuncias WHERE anuncio = ?").bind(id).run();
    return aux.json({ ok: true });
  }
  return aux.json({ erro: "rota desconhecida" }, 404);
}

async function retornoEnvio(url, env) {
  const volta = (q) => Response.redirect(`${origemApi(url, env)}/painel?envio=${q}`, 302);
  const state = url.searchParams.get("state") || "", codigo = url.searchParams.get("code") || "";
  const ok = state && await env.DB.prepare("SELECT 1 AS ok FROM mercado_envio_oauth WHERE state = ? AND criado > datetime('now', '-15 minutes')").bind(state).first("ok");
  if (!ok) return volta("expirou");
  await env.DB.prepare("DELETE FROM mercado_envio_oauth WHERE state = ?").bind(state).run();
  if (!codigo) return volta("recusado");
  try { await me.trocaCodigo(env, { codigo, retorno: retornoME(url, env) }); return volta("ok"); }
  catch { return volta("erro"); }
}

// aux: {json, turnstileOk, ipHash, autorizado} vindos de index.js
export async function rotasMercado(req, url, env, h, aux, ctx) {
  const p = url.pathname;
  if (p.startsWith("/v1/moderacao/mercado/")) {
    if (!aux.autorizado(req, env)) return aux.json({ erro: "não autorizado" }, 401);
    return moderacao(req, url, env, aux);
  }
  if (p.startsWith("/v1/mercado/foto/") && req.method === "GET") return foto(url, env, ctx);
  // chamadas do Mercado Pago, do Melhor Envio e dos navegadores voltando das autorizações (não vêm do site)
  if (p === "/v1/mercado/mp/aviso") return aviso(req, url, env);
  if (p === "/v1/mercado/mp/retorno" && req.method === "GET") return retorno(url, env);
  if (p === "/v1/envio/aviso" && req.method === "POST") return avisoEnvio(req, env);
  if (p === "/v1/envio/retorno" && req.method === "GET") return retornoEnvio(url, env);
  if (req.method === "POST" && !h["access-control-allow-origin"]) return aux.json({ erro: "origem" }, 403, h);
  if (p === "/v1/mercado/mp/conectar" && req.method === "POST") return conectar(req, url, env, h, aux);
  if (p === "/v1/mercado/frete" && req.method === "POST") return frete(req, env, h, aux);
  if (p === "/v1/mercado/comprar" && req.method === "POST") return comprar(req, url, env, h, aux);
  if (p === "/v1/mercado/pedido" && req.method === "POST") return verPedido(req, env, h, aux);
  if (p === "/v1/mercado/pedido/acao" && req.method === "POST") return pedidoAcao(req, env, h, aux);
  if (p === "/v1/mercado/lista" && req.method === "GET") return listar(env, h, aux);
  if (p === "/v1/mercado/anuncio" && req.method === "GET") return anuncio(url, env, h, aux);
  if (p === "/v1/mercado/anunciar" && req.method === "POST") return anunciar(req, env, h, aux);
  if (p === "/v1/mercado/meu" && req.method === "POST") return meu(req, env, h, aux);
  if (p === "/v1/mercado/meu/acao" && req.method === "POST") return meuAcao(req, env, h, aux);
  if (p === "/v1/mercado/meu/etiqueta" && req.method === "POST") return etiqueta(req, url, env, h, aux);
  if (p === "/v1/mercado/denunciar" && req.method === "POST") return denunciar(req, env, h, aux);
  return aux.json({ erro: "rota desconhecida" }, 404, h);
}
