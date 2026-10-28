"""Gera lancamentos/index.html: o calendário do ano com todos os lançamentos brasileiros listados na Ludopedia.

Uso: python3 tools/build_calendario.py [ano]
Lê conteudo/lancamentos/<ano>-<MM>.json (salvos por tools/noticias/coletar.py a partir da API da Ludopedia),
baixa as capas que faltam em lancamentos/capas/<id>.webp (320 px) e escreve a página. O filtro de mês,
tipo, situação e a busca rodam no navegador; sem JavaScript, a página mostra o ano inteiro.
"""
import io
import json
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import requests
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import seo  # noqa: E402
from build_home import MESES, cabecalho, capa_secao, norm, notas, pagina, rodape  # noqa: E402
from build_review import ROOT, SITE, e  # noqa: E402

PASTA = ROOT / "lancamentos"
CAPAS = PASTA / "capas"
LARGURA = 320
LUDO_CAPA = "https://storage.googleapis.com/ludopedia-capas/{id}_{t}.jpg"
# situação da Ludopedia -> (classe, rótulo curto, ordem dentro do mês)
SITUACAO = {
    "lancado": ("lancado", "Lançado", 0),
    "pre-venda": ("pre", "Pré-venda", 1),
    "em-pre-venda": ("pre", "Pré-venda", 1),
    "fc": ("financ", "Financiamento", 2),
    "em-financiamento-coletivo": ("financ", "Financiamento", 2),
    "anunciado": ("anunciado", "Anunciado", 3),
    "desenvolvimento": ("dev", "Em desenvolvimento", 4),
    "em-desenvolvimento": ("dev", "Em desenvolvimento", 4),
}
FILTRO_SITUACAO = [("", "Todas"), ("lancado", "Lançados"), ("pre", "Pré-venda"), ("financ", "Financiamento"), ("anunciado", "Anunciados")]
FILTRO_TIPO = [("", "Tudo"), ("jogo", "Jogos"), ("exp", "Expansões"), ("rpg", "RPG")]
MES_CURTO = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]


def tipo(j):
    if j.get("fl_tipo") == 2:
        return "rpg", "RPG"
    if j.get("fl_tipo") == 1:
        return ("jogo", "Jogo") if j.get("fl_jogo_base") else ("exp", "Expansão")
    return "outro", "Outros"


def situacao(j):
    s = j["status"]
    return SITUACAO.get(s["slug"], ("dev", s["label"], 5))


def baixar_capa(id_jogo):
    alvo = CAPAS / f"{id_jogo}.webp"
    if alvo.exists():
        return True
    for t in ("m", "t"):
        try:
            r = requests.get(LUDO_CAPA.format(id=id_jogo, t=t), timeout=30)
            if r.status_code != 200:
                continue
            with Image.open(io.BytesIO(r.content)) as im:
                im = im.convert("RGB")
                if im.width > LARGURA:
                    im = im.resize((LARGURA, round(im.height * LARGURA / im.width)), Image.LANCZOS)
                im.save(alvo, "WEBP", quality=74, method=6)
            return True
        except (requests.RequestException, OSError):
            continue
    return False


def carregar(ano):
    """Jogos do ano por mês; um jogo que aparece em dois meses fica no mais recente (data atualizada)."""
    por_id, rotulos = {}, {}
    for arq in sorted((ROOT / "conteudo" / "lancamentos").glob(f"{ano}-*.json")):
        d = json.loads(arq.read_text(encoding="utf-8"))
        rotulos[d["mes"]] = d["label"]
        for g in ("lancados", "previstos"):
            for j in d[g]:
                por_id[j["id_jogo"]] = dict(j, mes=d["mes"])
    return por_id, rotulos


def links_nossos():
    """Notícias (pelos ids da Ludopedia) e resenhas (pelo nome) que falam de cada jogo."""
    noticias = {}
    for n in notas():
        for i in n.get("ids_ludopedia", []):
            noticias.setdefault(i, n["slug"])
    resenhas = {}
    for pub in json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))["publicadas"]:
        slug = pub["url"].rstrip("/").split("/")[-1]
        for nome in [pub["jogo"], *pub.get("serie", [])]:
            resenhas[norm(nome)] = slug
    return noticias, resenhas


def cartao(j, noticias, resenhas, tem_capa):
    tclasse, trotulo = tipo(j)
    sclasse, srotulo, _ = situacao(j)
    nome = j["nome"].strip()
    editora = (j.get("editora") or {}).get("nome", "").strip()
    mes_i = int(j["mes"][5:]) - 1
    dados = {
        "nome": nome, "editora": editora, "mes": f"{MESES[mes_i]} de {j['mes'][:4]}", "situacao": srotulo, "tipo": trotulo,
        "ludopedia": j["url"], "topico": j.get("url_topico") or "",
        "noticia": f"../noticias/{noticias[j['id_jogo']]}/" if j["id_jogo"] in noticias else "",
        "resenha": f"../{resenhas[norm(nome)]}/" if norm(nome) in resenhas else "",
    }
    img = (f'<img src="capas/{j["id_jogo"]}.webp" width="320" height="320" alt="" loading="lazy" decoding="async">' if tem_capa
           else '<span class="sem-capa" aria-hidden="true"></span>')
    nossa = '<span class="nossa">Notícia</span>' if dados["noticia"] else ('<span class="nossa">Resenha</span>' if dados["resenha"] else "")
    busca = norm(f"{nome} {editora}")
    return (f'<li id="j{j["id_jogo"]}" data-tipo="{tclasse}" data-st="{sclasse}" data-busca="{e(busca)}">'
            f'<button type="button" class="jogo" data-j=\'{e(json.dumps(dados, ensure_ascii=False))}\'>'
            f'<span class="capa">{img}<span class="st {sclasse}">{srotulo}</span>{nossa}</span>'
            f'<span class="nome">{e(nome)}</span><span class="ed">{e(editora)}</span></button></li>')


CSS_CAL = """<style>
.cal{padding-bottom:40px}
.cal-topo{padding:18px 0 10px;display:grid;gap:6px}
.cal-topo h1{font-size:clamp(1.7rem,6vw,2.6rem);line-height:1.08;font-weight:800;letter-spacing:-.015em}
.cal-topo p{color:#c9cfd8;max-width:64ch;font-size:.98rem}
.cal-topo .fonte{font-size:.82rem;color:var(--muted)}
.cal-topo .fonte a{color:var(--gold)}
.ctrl{position:sticky;top:0;z-index:5;background:var(--ground);margin:0 -16px;padding:10px 16px 8px;border-bottom:1px solid var(--line);display:grid;gap:8px}
.busca{position:relative}
.busca input{width:100%;font:inherit;font-size:16px;padding:11px 40px 11px 14px;border-radius:10px;border:1px solid #333944;background:var(--panel2);color:var(--ink)}
.busca input::placeholder{color:#8b93a0}
.busca input::-webkit-search-cancel-button{-webkit-appearance:none;appearance:none}
.busca input:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:transparent}
.busca .limpa{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:var(--muted);font-size:1.3rem;line-height:1;cursor:pointer;display:none}
.busca.tem .limpa{display:block}
.trilho{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity;margin:0 -16px;padding:0 16px}
.trilho::-webkit-scrollbar{display:none}
.chip{flex:none;scroll-snap-align:start;font:inherit;font-size:.86rem;font-weight:700;padding:7px 12px;border-radius:999px;border:1px solid #333944;background:var(--panel2);color:var(--ink);cursor:pointer;white-space:nowrap;min-height:36px;transition:background-color .15s ease,border-color .15s ease,color .15s ease}
.chip small{font-weight:600;color:var(--muted);margin-left:4px;font-variant-numeric:tabular-nums}
.chip[aria-pressed="true"]{background:var(--gold);border-color:var(--gold);color:#000}
.chip[aria-pressed="true"] small{color:#3a2a00}
.chip.agora:not([aria-pressed="true"]){border-color:var(--gold)}
.chip:disabled{opacity:.4;cursor:default}
.filtros{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:0 -16px;padding:0 16px}
.filtros::-webkit-scrollbar{display:none}
.filtros .chip{font-size:.8rem;padding:5px 10px;min-height:32px;background:transparent}
.filtros .chip[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:#000}
.filtros .sep{flex:none;width:1px;background:var(--line);margin:4px 2px}
.contagem{font-size:.86rem;color:var(--muted);padding:12px 0 4px}
.contagem b{color:var(--ink)}
.mes{padding-top:14px;scroll-margin-top:150px}
.mes>h2{display:flex;align-items:baseline;gap:8px;font-size:1.15rem;font-weight:800;padding-bottom:10px}
.mes>h2 span{font-size:.82rem;font-weight:600;color:var(--muted)}
.grade-cal{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 12px}
@media (min-width:600px){.grade-cal{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:860px){.grade-cal{grid-template-columns:repeat(5,minmax(0,1fr));gap:18px 16px}}
@media (min-width:1120px){.grade-cal{grid-template-columns:repeat(6,minmax(0,1fr))}}
.jogo{all:unset;box-sizing:border-box;display:grid;gap:4px;width:100%;cursor:pointer;-webkit-tap-highlight-color:transparent}
.jogo:focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:8px}
.capa{position:relative;display:block;aspect-ratio:1;border-radius:8px;overflow:hidden;background:#f4f5f7}
.capa img{width:100%;height:100%;object-fit:contain;transition:transform .25s cubic-bezier(.16,1,.3,1)}
@media (hover:hover){.jogo:hover .capa img{transform:scale(1.04)}.jogo:hover .nome{text-decoration:underline}}
.jogo:active .capa{transform:scale(.98)}
.sem-capa{display:block;width:100%;height:100%;background:repeating-linear-gradient(45deg,#e6e9ee 0 10px,#eef0f3 10px 20px)}
.st{position:absolute;left:6px;top:6px;font-size:.7rem;font-weight:800;line-height:1.3;border-radius:5px;padding:2px 7px;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.35)}
.st.lancado{background:#1b7a45}.st.pre{background:#1f5fae}.st.financ{background:#6b4ea3}.st.anunciado{background:#8a5f00}.st.dev{background:#5a6270}
.nossa{position:absolute;right:6px;bottom:6px;font-size:.68rem;font-weight:800;border-radius:5px;padding:2px 6px;background:var(--gold);color:#000}
.nome{font-size:.93rem;font-weight:800;line-height:1.22;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:4px}
.ed{font-size:.8rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vazio{padding:40px 8px;text-align:center;color:var(--muted)}
.vazio button{margin-top:12px}
[hidden]{display:none!important}
/* ficha do jogo: folha de baixo no celular, janela no computador */
.ficha{border:0;padding:0;background:transparent;color:var(--paper-ink);max-width:none;max-height:none;width:100%;height:100%;margin:0}
.ficha::backdrop{background:rgba(0,0,0,.6)}
.ficha .folha{position:absolute;left:0;right:0;bottom:0;background:var(--paper);border-radius:16px 16px 0 0;padding:10px 16px calc(18px + env(safe-area-inset-bottom,0px));max-height:88vh;overflow:auto;display:grid;gap:12px;animation:sobe .28s cubic-bezier(.16,1,.3,1)}
.ficha .alca{justify-self:center;width:40px;height:5px;border-radius:3px;background:#c8cdd5}
.ficha .topo{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:start}
.ficha .topo img,.ficha .topo .sem-capa{width:120px;height:120px;object-fit:contain;border-radius:8px;background:#fff}
.ficha h2{font-size:1.25rem;line-height:1.2;font-weight:800;margin:4px 0 6px}
.ficha .ed2{font-size:.92rem;color:var(--paper-muted)}
.ficha dl{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0;font-size:.92rem}
.ficha dt{color:var(--paper-muted)}.ficha dd{margin:0;font-weight:700}
.ficha .acoes{display:grid;gap:8px}
.ficha .acoes a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:46px;border-radius:10px;font-weight:800;text-decoration:none;padding:0 14px}
.ficha .acoes .pri{background:#14171c;color:#fff}
.ficha .acoes .sec{border:1px solid #c8cdd5;color:var(--paper-ink)}
.ficha .fecha{position:absolute;right:10px;top:8px;width:40px;height:40px;border:0;border-radius:50%;background:transparent;font-size:1.6rem;line-height:1;color:var(--paper-muted);cursor:pointer}
.ficha .nota-fonte{font-size:.76rem;color:var(--paper-muted)}
@media (min-width:700px){.ficha .folha{left:50%;top:50%;bottom:auto;right:auto;transform:translate(-50%,-50%);width:min(520px,92vw);border-radius:14px;padding:18px 20px 20px;animation:aparece .2s ease-out}.ficha .alca{display:none}.ficha .topo{grid-template-columns:150px 1fr}.ficha .topo img,.ficha .topo .sem-capa{width:150px;height:150px}}
@keyframes sobe{from{transform:translateY(100%)}to{transform:none}}
@keyframes aparece{from{opacity:0;transform:translate(-50%,-48%)}to{opacity:1;transform:translate(-50%,-50%)}}
@media (prefers-reduced-motion:reduce){.ficha .folha{animation:none}.capa img{transition:none}}
</style>"""

JS = """<script>
(() => {
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const norm = t => t.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();
  const itens = $$('.grade-cal li'), meses = $$('.mes'), chipsMes = $$('.trilho .chip');
  const busca = $('#busca'), caixa = $('.busca'), cont = $('.contagem'), vazio = $('.vazio');
  const NOMES = Object.fromEntries(meses.map(m => [m.dataset.mes, m.dataset.nome]));
  const est = { mes: document.body.dataset.agora, tipo: '', st: '', q: '' };
  if (!NOMES[est.mes]) est.mes = meses.length ? meses[meses.length - 1].dataset.mes : '';

  function passa(li) {
    if (est.tipo && li.dataset.tipo !== est.tipo) return false;
    if (est.st && li.dataset.st !== est.st) return false;
    if (est.q && !li.dataset.busca.includes(est.q)) return false;
    return true;
  }
  function render(rolar) {
    const todoAno = est.q || est.mes === 'ano';
    let total = 0;
    const porMes = {};
    for (const li of itens) {
      const m = li.closest('.mes').dataset.mes, ok = passa(li);
      if (ok) porMes[m] = (porMes[m] || 0) + 1;
      const vis = ok && (todoAno || m === est.mes);
      li.hidden = !vis;
      if (vis) total++;
    }
    for (const sec of meses) {
      const n = $$('li:not([hidden])', sec).length;
      sec.hidden = n === 0;
      $('h2 span', sec).textContent = n + (n === 1 ? ' lançamento' : ' lançamentos');
    }
    for (const c of chipsMes) {
      const m = c.dataset.mes, n = m === 'ano' ? Object.values(porMes).reduce((a, b) => a + b, 0) : (porMes[m] || 0);
      c.querySelector('small').textContent = n;
      c.setAttribute('aria-pressed', String(!est.q && m === est.mes));
      c.disabled = !est.q && m !== 'ano' && n === 0;
    }
    $$('.filtros .chip').forEach(c => c.setAttribute('aria-pressed', String(est[c.dataset.f] === c.dataset.v)));
    const onde = est.q ? `para “${busca.value.trim()}” em ${document.body.dataset.ano}` : est.mes === 'ano' ? `em ${document.body.dataset.ano}` : `em ${NOMES[est.mes]}`;
    cont.innerHTML = `<b>${total}</b> ${total === 1 ? 'lançamento' : 'lançamentos'} ${onde}`;
    vazio.hidden = total > 0;
    if (rolar) window.scrollTo({ top: $('.ctrl').offsetTop - 1 > window.scrollY ? window.scrollY : $('.lista').offsetTop - $('.ctrl').offsetHeight - 8, behavior: 'auto' });
  }
  function centraChip() {
    const c = chipsMes.find(x => x.getAttribute('aria-pressed') === 'true');
    if (c) c.parentElement.scrollLeft = c.offsetLeft - c.parentElement.clientWidth / 2 + c.offsetWidth / 2;
  }
  chipsMes.forEach(c => c.addEventListener('click', () => {
    est.mes = c.dataset.mes; est.q = ''; busca.value = ''; caixa.classList.remove('tem');
    history.replaceState(null, '', est.mes === 'ano' ? '#ano' : '#' + est.mes); render(true); centraChip();
  }));
  $$('.filtros .chip').forEach(c => c.addEventListener('click', () => { est[c.dataset.f] = c.dataset.v; render(true); }));
  let t;
  busca.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => { est.q = norm(busca.value.trim()); caixa.classList.toggle('tem', !!busca.value); render(false); }, 120);
  });
  $('.limpa').addEventListener('click', () => { busca.value = ''; est.q = ''; caixa.classList.remove('tem'); render(false); busca.focus(); centraChip(); });
  $('.vazio button').addEventListener('click', () => { est.tipo = ''; est.st = ''; est.q = ''; busca.value = ''; caixa.classList.remove('tem'); render(false); });

  // ficha do jogo
  const dlg = $('#ficha');
  function abre(li) {
    const d = JSON.parse(li.querySelector('.jogo').dataset.j), img = li.querySelector('img');
    $('.topo .capa2', dlg).innerHTML = img ? `<img src="${img.getAttribute('src')}" alt="Capa de ${d.nome.replace(/"/g, '&quot;')}">` : '<span class="sem-capa"></span>';
    $('h2', dlg).textContent = d.nome;
    $('.ed2', dlg).textContent = d.editora;
    $('.v-mes', dlg).textContent = d.mes;
    $('.v-st', dlg).textContent = d.situacao;
    $('.v-tipo', dlg).textContent = d.tipo;
    const acoes = [];
    if (d.noticia) acoes.push(`<a class="pri" href="${d.noticia}">Ler a notícia da Elite</a>`);
    if (d.resenha) acoes.push(`<a class="pri" href="${d.resenha}">Ler a nossa resenha</a>`);
    acoes.push(`<a class="${acoes.length ? 'sec' : 'pri'}" href="${d.ludopedia}" target="_blank" rel="noopener">Ver o jogo na Ludopedia</a>`);
    if (d.topico) acoes.push(`<a class="sec" href="${d.topico}" target="_blank" rel="noopener">Tópico oficial na Ludopedia</a>`);
    $('.acoes', dlg).innerHTML = acoes.join('');
    history.replaceState(null, '', '#' + li.id);
    dlg.showModal();
  }
  $$('.jogo').forEach(b => b.addEventListener('click', () => abre(b.parentElement)));
  $('.fecha', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', ev => { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => history.replaceState(null, '', est.q ? location.pathname : (est.mes === 'ano' ? '#ano' : '#' + est.mes)));

  // endereço: #2026-11 abre o mês, #ano o ano todo, #j123 o mês do jogo e a ficha dele
  const h = decodeURIComponent(location.hash.slice(1));
  let alvo = null;
  if (h === 'ano' || NOMES[h]) est.mes = h;
  else if (/^j\\d+$/.test(h) && document.getElementById(h)) { alvo = document.getElementById(h); est.mes = alvo.closest('.mes').dataset.mes; }
  render(false); centraChip();
  if (alvo) { alvo.scrollIntoView({ block: 'center' }); abre(alvo); }
})();
</script>"""


def build(ano=None):
    hoje = datetime.now(timezone(timedelta(hours=-3))).date()
    ano = ano or hoje.year
    por_id, rotulos = carregar(ano)
    CAPAS.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(8) as ex:
        capas = dict(zip(por_id, ex.map(baixar_capa, por_id)))
    noticias, resenhas = links_nossos()

    porm = {}
    for j in por_id.values():
        porm.setdefault(j["mes"], []).append(j)
    secoes, chips = [], [f'<button type="button" class="chip" data-mes="ano" aria-pressed="false">Ano todo<small>{len(por_id)}</small></button>']
    agora = hoje.strftime("%Y-%m")
    for mes in sorted(porm):
        js = sorted(porm[mes], key=lambda j: (situacao(j)[2], norm(j["nome"])))
        i = int(mes[5:]) - 1
        nome_mes = f"{MESES[i]} de {mes[:4]}"
        cards = "".join(cartao(j, noticias, resenhas, capas[j["id_jogo"]]) for j in js)
        secoes.append(f'<section class="mes" id="m{mes}" data-mes="{mes}" data-nome="{nome_mes}"><h2>{nome_mes.capitalize()} '
                      f'<span>{len(js)} lançamentos</span></h2><ul class="grade-cal">{cards}</ul></section>')
        chips.append(f'<button type="button" class="chip{" agora" if mes == agora else ""}" data-mes="{mes}" aria-pressed="false">'
                     f'{MES_CURTO[i]}<small>{len(js)}</small></button>')
    filtros = ('<span class="sep" aria-hidden="true"></span>'.join(
        "".join(f'<button type="button" class="chip" data-f="{f}" data-v="{v}" aria-pressed="false">{r}</button>' for v, r in op)
        for f, op in (("tipo", FILTRO_TIPO), ("st", FILTRO_SITUACAO))))

    atualizado = max(datetime.fromtimestamp((ROOT / "conteudo" / "lancamentos" / f"{m}.json").stat().st_mtime) for m in rotulos)
    pre = "../"
    corpo = f"""{cabecalho(pre, "Lançamentos")}
<main id="conteudo" class="in cal">
 <div class="cal-topo">
  <h1>Lançamentos de {ano} no Brasil</h1>
  <p>{len(por_id)} jogos, expansões e RPGs das editoras brasileiras, mês a mês. Toque num jogo para ver os detalhes.</p>
  <p class="fonte">Dados e capas do <a href="https://ludopedia.com.br/lancamentos" target="_blank" rel="noopener">calendário da Ludopedia</a>, consultado em {atualizado:%d/%m/%Y}. Datas previstas pelas editoras podem mudar.</p>
 </div>
 <div class="ctrl">
  <div class="busca"><input id="busca" type="search" placeholder="Buscar jogo ou editora" aria-label="Buscar jogo ou editora" autocomplete="off" enterkeyhint="search"><button type="button" class="limpa" aria-label="Limpar busca">×</button></div>
  <div class="trilho" role="group" aria-label="Mês">{"".join(chips)}</div>
  <div class="filtros" role="group" aria-label="Filtros">{filtros}</div>
 </div>
 <p class="contagem" aria-live="polite"></p>
 <div class="lista">{"".join(secoes)}</div>
 <div class="vazio" hidden><p>Nenhum lançamento com esses filtros.</p><button type="button" class="chip">Limpar filtros</button></div>
</main>
<dialog class="ficha" id="ficha" aria-labelledby="ficha-nome">
 <div class="folha">
  <span class="alca" aria-hidden="true"></span>
  <button type="button" class="fecha" aria-label="Fechar">×</button>
  <div class="topo"><div class="capa2"></div><div><h2 id="ficha-nome"></h2><p class="ed2"></p></div></div>
  <dl><dt>Previsto para</dt><dd class="v-mes"></dd><dt>Situação</dt><dd class="v-st"></dd><dt>Tipo</dt><dd class="v-tipo"></dd></dl>
  <div class="acoes"></div>
  <p class="nota-fonte">Dados do calendário da Ludopedia.</p>
 </div>
</dialog>
{rodape(pre)}
{JS}"""
    url = f"{SITE}/lancamentos/"
    titulo = f"Lançamentos de jogos de tabuleiro {ano} no Brasil | Elite Boardgamers"
    descricao = f"Calendário com os {len(por_id)} lançamentos de {ano} das editoras brasileiras: jogos de tabuleiro, expansões e RPGs, mês a mês, com capa, editora e situação."
    ld = seo.script(seo.trilha(("Início", f"{SITE}/"), ("Lançamentos", url)))
    html = pagina(titulo, descricao, url, capa_secao("lancamentos"), pre, corpo, head_extra="\n" + CSS_CAL, jsonld=ld)
    html = html.replace("<body>", f'<body data-agora="{agora}" data-ano="{ano}">', 1)
    PASTA.mkdir(exist_ok=True)
    (PASTA / "index.html").write_text(html, encoding="utf-8")
    sem = sum(1 for v in capas.values() if not v)
    return len(por_id), sem


if __name__ == "__main__":
    n, sem = build(int(sys.argv[1]) if len(sys.argv) > 1 else None)
    print(f"ok lancamentos/index.html: {n} lançamentos" + (f", {sem} sem capa" if sem else ""))
