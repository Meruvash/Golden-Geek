"""Gera o Mercado da Elite: anúncios de jogos cadastrados pelos próprios vendedores.

Uso: python3 tools/build_mercado.py   (o build_home.py também chama)
Páginas: /mercado/ (vitrine), /mercado/anunciar/ (formulário), /mercado/anuncio/?id=N (anúncio), /mercado/meu/ (gerenciar),
/mercado/pedido/?p=N&k=... (o comprador acompanha as etapas: pagamento, envio, entrega e conclusão, e avalia o vendedor).
O frete é cotado no Melhor Envio pelo CEP do comprador, e o vendedor gera a etiqueta (com QR para abrir no celular,
mercado/qr.js) em Meus anúncios.
e /mercado/jogos.json (lista de jogos para o vendedor escolher, com o menor preço de novo visto pelo Black de Verdade).

A compra é paga pelo site, pelo Mercado Pago, na conta do vendedor; a Elite fica com 5% do preço do jogo
(worker/src/mercadopago.js). Os anúncios moram no serviço da Cloudflare (worker/src/mercado.js); as páginas são cascas estáticas e o
/mercado/mercado.js (escrito à mão, como o interacoes.js) busca e desenha os anúncios. Enquanto
conteudo/interacoes.json não tiver "mercado": true (o instalador grava quando o serviço está no ar), nada é gerado
e o botão do Mercado não aparece no menu.
"""
import datetime as dt
import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import seo  # noqa: E402
from build_home import pagina  # noqa: E402
from layout import SITE, _config_interacoes, botao_compartilhar, cabecalho, icone, rodape, trilha  # noqa: E402

e = html.escape
DIR = ROOT / "mercado"
URL = f"{SITE}/mercado/"
OG = f"{SITE}/mercado/capa.jpg"
VERSAO_JS = "3"   # troque quando mudar o mercado.js, para o navegador buscar o novo

UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split()
PACOTES = [("p", "Pequena", "até 20 × 20 × 6 cm · card games, jogos de bolso"), ("m", "Média", "até 30 × 30 × 8 cm · a maioria dos jogos"),
           ("g", "Grande", "até 32 × 32 × 12 cm · caixa quadrada cheia"), ("gg", "Muito grande", "até 42 × 42 × 16 cm · big box")]
CONDICOES = [("lacrado", "Lacrado", "Nunca aberto, plástico original"),
             ("como-novo", "Como novo", "Aberto, sem sinais de uso"),
             ("usado-otimo", "Usado, ótimo", "Pouco jogado, tudo perfeito"),
             ("usado-bom", "Usado, bom", "Desgaste leve, tudo funciona"),
             ("usado-marcas", "Usado, com marcas", "Marcas visíveis, descreva abaixo")]

ICONES_MERCADO = {
    "sacola": '<path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/>',
    "pino": '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',
    "caixa": '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
    "troca": '<path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/>',
    "camera": '<path d="M4 8h3l1.6-2.4h6.8L17 8h3v11H4V8Z"/><circle cx="12" cy="13" r="3.4"/>',
    "escudo": '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    "mais": '<path d="M12 5v14M5 12h14"/>',
    "bandeira": '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    "lapis": '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m14 6 4 4"/>',
    "lixo": '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
    "relogio": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    "estrela": '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
}


def ic(nome, cls="ic"):
    if nome in ICONES_MERCADO:
        return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICONES_MERCADO[nome]}</svg>'
    return icone(nome, cls)


CSS = """<style>
/* Mercado da Elite: vitrine de anúncios de jogador para jogador. Moldura preta, cartões claros, dourado da marca */
.mc{padding-top:14px;padding-bottom:48px;display:grid;grid-template-columns:minmax(0,1fr);gap:20px}.mc>*{min-width:0}
.mc a{color:inherit}.mc [hidden]{display:none!important}
.mc h2{font-size:1.3rem;line-height:1.2;margin:0;color:#fff;letter-spacing:-.01em}
.mc .sub{color:var(--muted);font-size:.95rem;margin:4px 0 0}
.mc-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:46px;padding:0 20px;border-radius:999px;font:inherit;font-weight:800;font-size:.95rem;text-decoration:none;cursor:pointer;border:0;white-space:nowrap}
.mc-btn .ic{width:20px;height:20px}
.mc .mc-btn.pri{background:var(--gold);color:#111}.mc .mc-btn.pri:hover{background:#f0c44f}
.mc .mc-btn.sec{background:transparent;color:#fff;border:1px solid #4a4f58}.mc .mc-btn.sec:hover{border-color:var(--gold);color:var(--gold)}
.mc .mc-btn.zap{background:var(--zap);color:#fff}.mc .mc-btn.zap:hover{background:#11683a}
.mc .mc-btn.ig{background:#fff;color:#14171c;border:1px solid var(--paper-line)}.mc .mc-btn.ig:hover{border-color:#14171c}
.mc-btn:disabled{opacity:.55;cursor:default}
.mc-ok,.mc-pedido,.mc-compra,.mc-contato,.mc-info .bloco{grid-template-columns:minmax(0,1fr)}.mc-ok .mc-btn,.mc-compra .mc-btn,.mc-contato .mc-btn,.mc-erro .mc-btn{white-space:normal;text-align:center;line-height:1.25;padding-top:8px;padding-bottom:8px}
/* topo */
.mc-hero{position:relative;overflow:hidden;border-radius:16px;padding:22px 18px 18px;border:1px solid #2b3140;
 background:radial-gradient(110% 90% at 100% 0,rgba(227,178,60,.22),transparent 55%),radial-gradient(80% 80% at 0 100%,rgba(31,95,174,.28),transparent 60%),linear-gradient(160deg,#0d1220,#000 70%)}
.mc-kick{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.74rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin:0}
.mc-kick .ic{width:18px;height:18px}
.mc-hero h1{font-size:clamp(2rem,7.4vw,3.4rem);line-height:1.02;letter-spacing:-.025em;margin:10px 0 12px;color:#fff;font-weight:800;text-wrap:balance;max-width:18ch}
.mc-hero h1 span{color:var(--gold)}
.mc-hero .lide{font-size:1.04rem;line-height:1.5;color:#d9dee7;max-width:60ch;margin:0}
.mc-acoes{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.mc-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:20px 0 0;padding:0;list-style:none}
.mc-stats li{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px 12px}
.mc-stats b{display:block;font-size:1.5rem;line-height:1.1;color:#fff;font-variant-numeric:tabular-nums}
.mc-stats span{font-size:.8rem;color:var(--muted)}
@media (min-width:760px){.mc-hero{padding:36px 36px 28px}.mc-stats{grid-template-columns:repeat(4,minmax(0,1fr));max-width:720px}}
/* barra de busca e filtros, presa logo abaixo do menu */
.mc-busca{grid-template-columns:minmax(0,1fr);position:sticky;top:var(--nav-h,49px);z-index:15;display:grid;gap:10px;padding:10px 0;background:linear-gradient(#000 85%,rgba(0,0,0,0))}
.mc-q{position:relative}.mc-q .ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);pointer-events:none}
.mc-q input{width:100%;min-height:48px;padding:10px 14px 10px 44px;border-radius:999px;border:1px solid #3a3f48;background:var(--panel2);color:#fff;font:inherit;font-size:16px}
.mc-q input:focus{border-color:var(--gold);outline:none;box-shadow:0 0 0 3px rgba(227,178,60,.25)}
.mc-filtros{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.mc-filtros::-webkit-scrollbar{display:none}
.mc-filtros select,.mc-chip{flex:none;min-height:40px;border-radius:999px;border:1px solid #3a3f48;background:var(--panel2);color:var(--ink);font:inherit;font-size:.88rem;font-weight:700;padding:0 14px;cursor:pointer}
.mc-filtros select{padding-right:30px;appearance:none;background-image:linear-gradient(45deg,transparent 50%,#a1a9b5 50%),linear-gradient(135deg,#a1a9b5 50%,transparent 50%);background-position:calc(100% - 17px) 52%,calc(100% - 12px) 52%;background-size:5px 5px;background-repeat:no-repeat}
.mc-filtros select.on{border-color:var(--gold);color:var(--gold)}
.mc-chip{position:relative;display:inline-flex;align-items:center;gap:6px}.mc-chip input{position:absolute;opacity:0;pointer-events:none}
.mc-chip:has(input:checked){background:var(--gold);border-color:var(--gold);color:#111}
.mc-chip:has(input:focus-visible){outline:3px solid var(--gold);outline-offset:2px}
.mc-chip .ic{width:17px;height:17px}
.mc-limpar{flex:none;min-height:40px;padding:0 12px;border:0;background:none;color:var(--gold);font:inherit;font-weight:700;font-size:.88rem;cursor:pointer;text-decoration:underline}.mc-limpar[hidden]{display:none}
.mc-n{margin:0;color:var(--muted);font-size:.9rem}
/* grade de anúncios */
.mc-grade{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0;padding:0;list-style:none}
@media (min-width:640px){.mc-grade{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}}
@media (min-width:1000px){.mc-grade{grid-template-columns:repeat(4,minmax(0,1fr))}}
.mc-card>a,.mc-card>div{display:flex;flex-direction:column;height:100%;background:var(--paper);color:var(--paper-ink);border-radius:12px;overflow:hidden;text-decoration:none;border:2px solid transparent;transition:border-color .15s ease,transform .2s cubic-bezier(.2,.8,.2,1)}
.mc-card>a:hover{border-color:var(--gold)}.mc-card>a:active{transform:scale(.985)}
.mc-card>a:hover .mc-nome{text-decoration:underline}
.mc-foto{position:relative;display:block;aspect-ratio:1;background:#e6e9ee;overflow:hidden}
.mc-foto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.mc-selos{position:absolute;left:8px;top:8px;right:8px;display:flex;flex-wrap:wrap;gap:4px}
.mc-selo{display:inline-flex;align-items:center;gap:4px;font-size:.68rem;font-weight:800;letter-spacing:.03em;text-transform:uppercase;border-radius:5px;padding:3px 7px;background:rgba(20,23,28,.86);color:#fff;backdrop-filter:blur(4px)}
.mc-selo.lacrado{background:#157a43}.mc-selo.como-novo{background:#1f5fae}.mc-selo.troca{background:var(--gold);color:#111}.mc-selo.vendido{background:#b3263e}
.mc-txt{display:flex;flex-direction:column;gap:3px;padding:10px 12px 12px;flex:1}
.mc-nome{font-size:.98rem;line-height:1.22;font-weight:800;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-wrap:balance}
.mc-ed{font-size:.8rem;color:var(--paper-muted);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.mc-preco{font-size:1.3rem;line-height:1.1;font-weight:800;letter-spacing:-.01em;margin-top:auto;padding-top:6px;font-variant-numeric:tabular-nums}
.mc-eco{font-size:.74rem;font-weight:800;color:var(--brasil)}
.mc-onde{display:flex;align-items:center;gap:4px;font-size:.8rem;color:var(--paper-muted)}.mc-onde .ic{width:15px;height:15px}
.mc-quem{display:flex;align-items:center;gap:6px;font-size:.78rem;color:var(--paper-muted);border-top:1px solid var(--paper-line);margin-top:6px;padding-top:8px;min-width:0}
.mc-quem span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mc-av{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#14171c;color:var(--gold);font-size:.72rem;font-weight:800;font-style:normal;text-transform:uppercase}
@media (max-width:420px){.mc-txt{padding:9px 10px 10px}.mc-nome{font-size:.92rem}.mc-preco{font-size:1.15rem}}
/* esqueleto enquanto carrega */
.mc-card.esq>div{pointer-events:none}.mc-card.esq .mc-foto,.mc-card.esq i.l{background:linear-gradient(90deg,#e6e9ee 30%,#f2f4f7 50%,#e6e9ee 70%);background-size:300% 100%;animation:mc-brilho 1.4s ease infinite}
.mc-card.esq i.l{display:block;height:12px;border-radius:6px;margin:4px 0}.mc-card.esq i.l.c{width:60%}.mc-card.esq i.l.p{height:20px;width:45%;margin-top:10px}
@keyframes mc-brilho{0%{background-position:100% 0}100%{background-position:0 0}}
/* vazio */
.mc-vazio{display:grid;justify-items:center;text-align:center;gap:10px;padding:36px 18px;border:1px dashed #3a3f48;border-radius:16px;color:var(--muted)}
.mc-vazio[hidden]{display:none}.mc-vazio b{color:#fff;font-size:1.15rem}.mc-vazio .ic{width:40px;height:40px;color:var(--gold)}
/* como funciona */
.mc-como{display:grid;gap:12px}
.mc-passos{display:grid;gap:10px;margin:0;padding:0;list-style:none;counter-reset:p}
.mc-passos li{counter-increment:p;position:relative;background:var(--panel2);border:1px solid var(--line);border-radius:14px;padding:16px 16px 16px 60px;color:#cfd5de;font-size:.94rem}
.mc-passos li::before{content:counter(p);position:absolute;left:16px;top:16px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--gold);color:#111;font-weight:800}
.mc-passos b{display:block;color:#fff;font-size:1rem;margin-bottom:2px}
@media (min-width:760px){.mc-passos{grid-template-columns:repeat(2,1fr)}}@media (min-width:1100px){.mc-passos{grid-template-columns:repeat(4,1fr)}}
/* cartões claros de texto (dicas, regras) */
.mc .bloco>h2{display:flex;align-items:center;justify-content:flex-start;gap:8px;color:var(--paper-ink);font-size:1.1rem;letter-spacing:-.005em;text-transform:none;margin:0 0 10px;padding:0;border:0}.mc .bloco>h2 .ic{width:22px;height:22px;color:var(--brasil)}.mc-lista+.mc-lista{margin-top:10px}.mc .bloco>.mc-aviso{margin-top:12px}
.mc-lista{display:grid;gap:8px;margin:0;padding:0;list-style:none}
.mc-lista li{position:relative;padding-left:28px;font-size:.93rem;color:#3a414c;line-height:1.45}
.mc-lista li::before{content:"";position:absolute;left:4px;top:.45em;width:12px;height:7px;border-left:2.5px solid var(--brasil);border-bottom:2.5px solid var(--brasil);transform:rotate(-45deg)}
.mc-lista.nao li::before{width:12px;height:0;border-left:0;border-bottom:2.5px solid #b3263e;transform:none;top:.7em}
.mc-dois{display:grid;gap:16px}@media (min-width:900px){.mc-dois{grid-template-columns:1fr 1fr}}
.mc-aviso{font-size:.85rem;color:var(--muted);margin:0}.mc-aviso a{color:var(--gold)}
.mc .bloco .mc-aviso{color:var(--paper-muted)}.mc .bloco .mc-aviso a{color:var(--link)}

/* página do anúncio */
.mc-an{display:grid;gap:18px}.mc-an[hidden]{display:none}
@media (min-width:900px){.mc-an{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start;gap:28px}}
.mc-gal{display:grid;gap:8px;min-width:0}
.mc-gal-v{position:relative;border-radius:14px;overflow:hidden;background:#0f1115;border:1px solid var(--line)}
.mc-trilho{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;aspect-ratio:1}.mc-trilho::-webkit-scrollbar{display:none}
.mc-trilho button{flex:0 0 100%;scroll-snap-align:center;padding:0;border:0;background:none;cursor:zoom-in}
.mc-trilho img{width:100%;height:100%;object-fit:contain}
.mc-cont{position:absolute;right:10px;bottom:10px;font-size:.78rem;font-weight:800;padding:3px 9px;border-radius:999px;background:rgba(0,0,0,.7);color:#fff;font-variant-numeric:tabular-nums}
.mc-seta{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.92);color:#14171c;display:none;place-items:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3)}
.mc-seta.a{left:10px}.mc-seta.p{right:10px}.mc-seta.p .ic{transform:scaleX(-1)}
@media (hover:hover) and (min-width:700px){.mc-gal-v:hover .mc-seta{display:grid}}
.mc-mini{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:2px}
.mc-mini button{flex:none;width:68px;height:68px;padding:0;border-radius:10px;overflow:hidden;border:2px solid transparent;background:#1c1f25;cursor:pointer;opacity:.7}
.mc-mini button[aria-current=true]{border-color:var(--gold);opacity:1}.mc-mini img{width:100%;height:100%;object-fit:cover}
.mc-info{display:grid;gap:14px;min-width:0}
.mc-info .bloco{display:grid;gap:12px}
.mc-tit{font-size:clamp(1.6rem,5vw,2.3rem);line-height:1.08;font-weight:800;letter-spacing:-.02em;margin:0;text-wrap:balance}
.mc-info .mc-ed{font-size:.95rem;-webkit-line-clamp:3}
.mc-info .mc-preco{font-size:2.2rem;padding:0;margin:0}
.mc-selos-l{display:flex;flex-wrap:wrap;gap:6px}.mc-selos-l .mc-selo{font-size:.72rem;padding:4px 9px}
.mc-fatos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0}
.mc-fatos div{background:#fff;border:1px solid var(--paper-line);border-radius:10px;padding:9px 11px;min-width:0}
.mc-fatos dt{display:flex;align-items:center;gap:5px;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--paper-muted)}.mc-fatos dt .ic{width:15px;height:15px}
.mc-fatos dd{margin:2px 0 0;font-weight:700;font-size:.93rem;overflow-wrap:anywhere}
.mc-vend{display:flex;align-items:center;gap:12px;padding-top:12px;border-top:1px solid var(--paper-line)}
.mc-vend .mc-av{width:44px;height:44px;font-size:1.1rem}
.mc-vend b{display:block;font-size:1.02rem}.mc-vend small{display:block;color:var(--paper-muted);font-size:.84rem}
.mc-contato{display:grid;gap:8px}.mc-contato .mc-btn{width:100%}
.mc-novo{display:grid;gap:4px;background:var(--brasil-bg);color:#123d26;border-radius:10px;padding:10px 12px;font-size:.9rem}
.mc-novo b{font-size:1rem}.mc-novo a{color:var(--brasil);font-weight:700}
.mc-res{display:flex;align-items:center;gap:10px;background:#fff8e6;border:1px solid var(--gold);border-radius:10px;padding:10px 12px;font-weight:700;font-size:.92rem;text-decoration:none}
.mc-res .ic{color:#8a6100}.mc-res:hover{text-decoration:underline}
.mc-vendido{background:#b3263e;color:#fff;border-radius:10px;padding:12px 14px;font-weight:800}
.mc-desc{white-space:pre-wrap;color:#3a414c;font-size:.98rem;margin:0;overflow-wrap:anywhere}
.mc-rodape-an{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;font-size:.84rem;color:var(--paper-muted)}
.mc-denuncia{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 4px;border:0;background:none;color:var(--paper-muted);font:inherit;font-size:.86rem;font-weight:700;cursor:pointer;text-decoration:underline}
.mc-denuncia .ic{width:16px;height:16px}
.mc-erro{display:grid;gap:12px;justify-items:start;padding:24px;border-radius:14px;background:var(--panel2);border:1px solid var(--line);color:#cfd5de}.mc-erro[hidden]{display:none}.mc-erro b{color:#fff;font-size:1.2rem}
/* janelas (foto em tela cheia e denúncia) */
.mc-dlg{border:0;padding:0;max-width:min(560px,calc(100vw - 24px));width:100%;border-radius:16px;background:var(--paper);color:var(--paper-ink);box-shadow:0 20px 60px rgba(0,0,0,.5)}
.mc-dlg::backdrop{background:rgba(0,0,0,.75)}
.mc-dlg form{display:grid;gap:12px;padding:20px}.mc-dlg h2{color:var(--paper-ink);font-size:1.15rem;margin:0}
.mc-dlg label{display:flex;gap:10px;align-items:center;min-height:40px;font-weight:600}
.mc-dlg .acoes{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}
.mc-dlg .mc-btn.sec{color:var(--paper-ink);border-color:var(--paper-line)}
.mc-zoom{max-width:100vw;max-height:100vh;width:100vw;height:100vh;border-radius:0;background:#000}
.mc-zoom img{width:100%;height:100%;object-fit:contain}
.mc-zoom .fechar{position:absolute;top:calc(10px + env(safe-area-inset-top));right:10px;width:48px;height:48px;border-radius:50%;border:0;background:rgba(255,255,255,.92);display:grid;place-items:center;cursor:pointer}

/* formulário de anúncio */
.mc-form-l{display:grid;gap:18px}
@media (min-width:980px){.mc-form-l{grid-template-columns:minmax(0,1fr) 300px;align-items:start;gap:28px}.mc-prev{position:sticky;top:calc(var(--nav-h,49px) + 16px)}}
.mc-form{display:grid;gap:14px}
.mc-passo,.mc-ok,.mc-meu,.mc-dlg{color-scheme:light}.mc-passo{background:var(--paper);color:var(--paper-ink);border-radius:14px;padding:18px 16px;display:grid;gap:14px;border:0;margin:0;min-width:0}
.mc-passo legend{float:left;width:100%;padding:0;display:flex;align-items:center;gap:10px;font-size:1.08rem;font-weight:800}
.mc-passo legend+*{clear:both}
.mc-passo legend i{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#14171c;color:var(--gold);font-style:normal;font-size:.85rem}
.mc-passo .dica{margin:-6px 0 0;font-size:.86rem;color:var(--paper-muted)}
.mc-campo{display:grid;gap:5px;font-weight:700;font-size:.9rem;min-width:0}
.mc-campo small{font-weight:600;color:var(--paper-muted)}
.mc-campo input,.mc-campo select,.mc-campo textarea{width:100%;font:inherit;font-size:16px;font-weight:400;min-height:48px;padding:10px 12px;border:1px solid #c8cdd5;border-radius:10px;background:#fff;color:#14171c}
.mc-campo textarea{min-height:120px;resize:vertical;line-height:1.45}
.mc-campo input:focus,.mc-campo select:focus,.mc-campo textarea:focus{outline:none;border-color:#14171c;box-shadow:0 0 0 3px rgba(227,178,60,.45)}
.mc-campo[data-erro] input,.mc-campo[data-erro] select{border-color:#b3263e}
.mc-cont-t{justify-self:end;font-size:.78rem;font-weight:600;color:var(--paper-muted);font-variant-numeric:tabular-nums}
.mc-linha{display:grid;gap:12px}@media (min-width:560px){.mc-linha{grid-template-columns:1fr 1fr}.mc-linha.c3{grid-template-columns:2fr 1fr}}
.mc-preco-in{position:relative}.mc-preco-in span{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-weight:800;color:var(--paper-muted)}
.mc-preco-in input{padding-left:44px;font-weight:800;font-size:1.15rem}
/* busca do jogo */
.mc-ac{position:relative}
.mc-sug{position:absolute;z-index:10;left:0;right:0;top:calc(100% + 4px);margin:0;padding:6px;list-style:none;background:#fff;border:1px solid var(--paper-line);border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.22);max-height:340px;overflow:auto}
.mc-sug[hidden]{display:none}
.mc-sug li{display:grid;grid-template-columns:40px 1fr;gap:10px;align-items:center;padding:6px 8px;border-radius:8px;cursor:pointer;font-weight:600}
.mc-sug li[aria-selected=true],.mc-sug li:hover{background:#eef1f4}
.mc-sug img,.mc-sug .sem{width:40px;height:40px;border-radius:6px;object-fit:cover;background:#e6e9ee;display:grid;place-items:center;color:var(--paper-muted)}
.mc-sug small{display:block;font-weight:500;color:var(--paper-muted);font-size:.8rem}
.mc-sug li.livre{grid-template-columns:1fr;color:var(--paper-muted)}
.mc-escolhido{display:flex;align-items:center;gap:10px;background:#eef6f1;border:1px solid #bfe0cb;color:#123d26;border-radius:10px;padding:8px 10px;font-size:.88rem;font-weight:700}.mc-escolhido[hidden]{display:none}
.mc-escolhido img{width:36px;height:36px;border-radius:6px;object-fit:cover}
/* fotos */
.mc-fotos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0;padding:0;list-style:none}
@media (min-width:560px){.mc-fotos{grid-template-columns:repeat(4,minmax(0,1fr))}}
.mc-fotos li{position:relative;aspect-ratio:1;border-radius:10px;overflow:hidden;background:#e6e9ee}
.mc-fotos li img{width:100%;height:100%;object-fit:cover}
.mc-fotos .capa-s{position:absolute;left:6px;top:6px;font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;padding:2px 7px;border-radius:5px;background:var(--gold);color:#111}
.mc-fotos .acs{position:absolute;right:4px;bottom:4px;display:flex;gap:4px}
.mc-fotos .acs button{width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.94);color:#14171c;display:grid;place-items:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.mc-fotos .acs .ic{width:17px;height:17px}
.mc-fotos li.proc{display:grid;place-items:center;font-size:.8rem;font-weight:700;color:var(--paper-muted)}
.mc-add{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;min-height:96px;border:2px dashed #b9c0ca;border-radius:10px;background:#fff;color:#14171c;font-weight:800;font-size:.85rem;cursor:pointer;text-align:center;padding:6px}
.mc-add:hover,.mc-add.sobre{border-color:var(--gold);background:#fffaf0}.mc-add .ic{width:28px;height:28px;color:#8a6100}
.mc-add input{position:absolute;width:1px;height:1px;opacity:0}.mc-add:has(input:focus-visible){outline:3px solid var(--gold);outline-offset:2px}
.mc-add[hidden]{display:none}
/* opções em cartão (estado, entrega) */
.mc-ops{display:grid;gap:8px}.mc-ops.c2{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.mc-op{position:relative;display:grid;gap:2px;padding:11px 12px 11px 40px;border:1px solid #c8cdd5;border-radius:10px;background:#fff;cursor:pointer;font-weight:800;font-size:.92rem}
.mc-op small{font-weight:500;color:var(--paper-muted);font-size:.8rem}
.mc-op input{position:absolute;left:13px;top:13px;width:18px;height:18px;margin:0;accent-color:#14171c}
.mc-op:has(input:checked){border-color:#14171c;box-shadow:inset 0 0 0 1px #14171c;background:#fffaf0}
.mc-check{display:flex;gap:10px;align-items:flex-start;font-size:.92rem;font-weight:600;line-height:1.4;cursor:pointer}
.mc-check input{flex:none;width:20px;height:20px;margin:1px 0 0;accent-color:#14171c}
.mc-check a{color:var(--link)}
.mc .isca{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.mc-enviar{display:grid;gap:10px}
.mc-enviar .mc-btn{min-height:54px;font-size:1.05rem}
.mc-st{margin:0;font-weight:700;font-size:.95rem}.mc-st:empty{display:none}.mc-st.erro{color:#ff8094}.mc-st.ok{color:#5fd38d}
.mc-prev{display:grid;gap:8px}.mc-prev>p{margin:0;font-size:.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.mc-prev .mc-card{max-width:300px}
.mc-prev .mc-foto .sem{position:absolute;inset:0;display:grid;place-items:center;color:var(--paper-muted)}.mc-prev .mc-foto .sem .ic{width:44px;height:44px}
/* sucesso e gerenciamento */
.mc-ok{display:grid;gap:14px;background:var(--paper);color:var(--paper-ink);border-radius:16px;padding:22px 18px}.mc-ok[hidden]{display:none}
.mc-ok h2{color:var(--paper-ink);font-size:1.4rem}.mc-ok p{margin:0;color:#3a414c}
.mc-link{display:flex;gap:8px;flex-wrap:wrap}.mc-link input{flex:1 1 260px;min-height:46px;font:inherit;font-size:14px;padding:8px 12px;border-radius:10px;border:1px solid #c8cdd5;background:#fff;color:#14171c}
.mc-ok .mc-btn.sec{color:var(--paper-ink);border-color:#c8cdd5}
.mc-meus{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.mc-meu{display:grid;grid-template-columns:88px minmax(0,1fr);gap:12px;background:var(--paper);color:var(--paper-ink);border-radius:14px;padding:12px}
.mc-meu>img,.mc-meu>.sem{width:88px;height:88px;border-radius:10px;object-fit:cover;background:#e6e9ee}
.mc-meu h3{margin:0;font-size:1.02rem;line-height:1.25}
.mc-meu .est{justify-self:start;display:inline-block;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;border-radius:5px;padding:2px 8px;margin:4px 0}
.est.pendente,.est.duvidoso{background:#fff4d1;color:#8a5f00}.est.aprovado{background:var(--brasil-bg);color:var(--brasil)}.est.vendido{background:#e3ecf8;color:#1f5fae}.est.reprovado,.est.removido,.est.vencido{background:#fbe5e9;color:#a3223a}
.mc-meu p{margin:0;font-size:.88rem;color:#3a414c}
.mc-meu .acs{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:8px}
.mc-meu .acs button,.mc-meu .acs a{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid #c8cdd5;background:#fff;color:#14171c;font:inherit;font-size:.86rem;font-weight:800;cursor:pointer;text-decoration:none}
.mc-meu .acs .ic{width:16px;height:16px}.mc-meu .acs .perigo{color:#a3223a;border-color:#f0c2cb}
.mc-meu .acs button:hover,.mc-meu .acs a:hover{border-color:#14171c}
.mc-meu .preco-ed{grid-column:1/-1;display:flex;gap:8px;flex-wrap:wrap;align-items:center}.mc-meu .preco-ed[hidden]{display:none}
.mc-meu .preco-ed input{width:140px;min-height:40px;font:inherit;font-size:16px;padding:6px 10px;border-radius:8px;border:1px solid #c8cdd5}
/* compra */
.mc-compra{display:grid;gap:10px}.mc-compra[hidden],.mc-ent[hidden],.mc-reservado[hidden],.mc-frete[hidden]{display:none}
.mc-compra .mc-btn{width:100%;min-height:54px;font-size:1.05rem}
.mc-ent{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mc-ent .mc-op{padding:10px 10px 10px 36px;font-size:.88rem}.mc-ent .mc-op input{left:11px;top:12px}
.mc-total{margin:0;font-size:.95rem;color:#3a414c}.mc-total b{color:var(--paper-ink)}
.mc-pag{margin:0;font-size:.82rem;color:var(--paper-muted);text-align:center}
.mc-reservado{display:flex;gap:10px;align-items:flex-start;margin:0;background:#fff4d1;color:#5c3f00;border-radius:10px;padding:10px 12px;font-weight:700;font-size:.9rem}.mc-reservado .ic{flex:none;color:#8a5f00}
.mc-selo.reservado{background:#8a5f00}
.mc-resumo{margin:0;font-size:.92rem;color:#3a414c;background:#fff;border:1px solid var(--paper-line);border-radius:10px;padding:10px 12px}
.mc-dlg .mc-campo{display:grid;gap:5px;min-height:0}.mc-dlg .mc-check{min-height:0}
.mc-taxa{margin:0;font-size:.86rem;color:#3a414c;background:#fff;border:1px solid var(--paper-line);border-radius:10px;padding:10px 12px}.mc-liquido{display:block;margin-top:4px;font-weight:800;color:var(--brasil)}.mc-liquido:empty{display:none}
/* frete, etapas, etiqueta e avaliações */
.mc-cep-l{display:flex;gap:8px}.mc-cep-l input{flex:1 1 auto;min-width:0;width:auto}.mc .mc-compra .mc-cep-l .mc-btn.sec{flex:none;width:auto;min-height:48px;padding:0 18px;color:var(--paper-ink);border-color:#c8cdd5}
.mc-fretes{display:grid;gap:6px}.mc-fretes .mc-op{grid-template-columns:1fr auto;align-items:center;padding:10px 12px 10px 38px}.mc-fretes .mc-op b{font-variant-numeric:tabular-nums}.mc-fretes .mc-op span small{display:block}
.mc-rot{margin:2px 0 -4px;font-weight:800;font-size:.9rem}
.mc-end{border:0;padding:0;margin:0;display:grid;gap:10px}.mc-end legend{font-weight:800;padding:0;margin-bottom:4px}
.mc-etapas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:0;padding:0;list-style:none;counter-reset:e}
.mc-etapas li{counter-increment:e;position:relative;display:grid;justify-items:center;gap:6px;text-align:center;font-size:.76rem;font-weight:700;color:var(--paper-muted);line-height:1.2}
.mc-etapas li::before{content:counter(e);display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#e6e9ee;color:var(--paper-muted);font-weight:800;position:relative;z-index:1}
.mc-etapas li::after{content:"";position:absolute;top:14px;left:calc(-50% + 18px);right:calc(50% + 18px);height:3px;border-radius:2px;background:#e6e9ee}
.mc-etapas li:first-child::after{display:none}
.mc-etapas li.feito{color:var(--paper-ink)}.mc-etapas li.feito::before{content:"✓";background:var(--brasil);color:#fff}.mc-etapas li.feito::after,.mc-etapas li.agora::after{background:var(--brasil)}
.mc-etapas li.agora{color:var(--paper-ink)}.mc-etapas li.agora::before{background:var(--gold);color:#111;box-shadow:0 0 0 4px rgba(227,178,60,.3)}
.mc-etapas li.parou::before{content:"!";background:#b3263e;color:#fff}
.mc-etapas small{display:block;font-weight:600;font-size:.7rem;color:var(--paper-muted)}
.mc-rastreio{display:grid;gap:6px;background:#fff;border:1px solid var(--paper-line);border-radius:10px;padding:10px 12px;font-size:.9rem}.mc-rastreio b{font-family:ui-monospace,monospace;font-size:1rem;letter-spacing:.04em}
.mc-rastreio a{color:var(--link);font-weight:800}
.mc-ped-acoes{display:flex;flex-wrap:wrap;gap:8px}.mc-ped-acoes .mc-btn{flex:1 1 200px}.mc-ped-acoes .mc-btn.sec{color:var(--paper-ink);border-color:#c8cdd5}
.mc-estrelas{display:flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px}
.mc-estrelas label{cursor:pointer;font-size:2.1rem;line-height:1;color:#c8cdd5}.mc-estrelas input{position:absolute;opacity:0}
.mc-estrelas label:hover,.mc-estrelas label:hover~label,.mc-estrelas label:has(input:checked),.mc-estrelas label:has(input:checked)~label{color:#e3a400}
.mc-estrelas label:has(input:focus-visible){outline:3px solid var(--gold);outline-offset:2px;border-radius:4px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.mc-aval-f{display:grid;gap:12px}.mc-aval-f .mc-btn{justify-self:start}
.mc-rep{display:inline-flex;align-items:center;gap:4px;font-weight:800;color:#8a5f00}.mc-rep small{font-weight:600;color:var(--paper-muted)}
.mc-avals{display:grid;gap:8px;margin:0;padding:0;list-style:none}.mc-avals li{background:#fff;border:1px solid var(--paper-line);border-radius:10px;padding:10px 12px;font-size:.9rem;color:#3a414c}
.mc-avals b{color:#e3a400;letter-spacing:1px}.mc-avals time{color:var(--paper-muted);font-size:.8rem;margin-left:6px}
.mc-etq{grid-column:1/-1;display:grid;grid-template-columns:132px minmax(0,1fr);gap:12px;align-items:center;background:#fff;border:2px dashed #b9c0ca;border-radius:12px;padding:12px}
.mc-etq svg{width:132px;height:132px;display:block;border-radius:6px}
.mc-etq p{margin:0;font-size:.86rem;color:#3a414c}.mc-etq .mc-btn{min-height:42px;font-size:.88rem;margin-top:6px}
@media (max-width:420px){.mc-etq{grid-template-columns:1fr;justify-items:center;text-align:center}}
.mc-prazo{display:inline-block;font-weight:800;color:#8a5f00}
@media print{.mc-etq{border:0}}
/* pedido */
.mc-pedido{display:grid;gap:14px}.mc-ped-topo{display:grid;grid-template-columns:88px minmax(0,1fr);gap:14px;align-items:center}
.mc-ped-foto img,.mc-ped-foto{display:block;width:88px;height:88px;border-radius:12px;object-fit:cover;background:#e6e9ee}
.mc-pedido .est{justify-self:start;display:inline-block;font-size:.74rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;border-radius:5px;padding:2px 8px;margin:0 0 4px}
.est.aguardando,.est.processando{background:#fff4d1;color:#8a5f00}.est.pago{background:var(--brasil-bg);color:var(--brasil)}.est.cancelado,.est.devolvido{background:#fbe5e9;color:#a3223a}
.mc-ped-sub{margin:4px 0 0;color:var(--paper-muted);font-size:.9rem}.mc-ped-msg p{margin:0;color:#3a414c}
.mc-contato{display:grid;gap:8px}.mc-contato .mc-btn{width:100%}
.mc-vendas{grid-column:1/-1;display:grid;gap:8px;margin:0;padding:0;list-style:none}
.mc-vendas>li{background:#fff;border:1px solid var(--paper-line);border-radius:10px;padding:10px 12px;font-size:.88rem;color:#3a414c}
.mc-vendas b{color:var(--paper-ink)}.mc-vendas a{color:var(--brasil);font-weight:800}
.mc-mp{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;background:#fff4d1;color:#5c3f00;border-radius:10px;padding:10px 12px;font-size:.88rem;font-weight:700}
.mc-mp.ok{background:var(--brasil-bg);color:#123d26}
.mc-meu .mc-mp button{min-height:40px;padding:0 14px;border-radius:999px;border:0;background:#14171c;color:#fff;font:inherit;font-size:.86rem;font-weight:800;cursor:pointer}
.mc-compras{display:grid;gap:12px}.mc-compras[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.mc-card.esq .mc-foto,.mc-card.esq i.l{animation:none}.mc-card>a:active{transform:none}}
</style>"""


def jogos():
    """Lista de jogos para o vendedor escolher: a base do Black de Verdade (3.600+ jogos com nome e ano) e as resenhas.

    Cada item: [slug, nome, ano, menor preço de novo, dia desse preço, capa local, tem resenha].
    O preço é o ponto mais recente do histórico do radar (só lojas conferidas), se tiver no máximo 3 dias.
    """
    hist = json.loads((ROOT / "conteudo" / "black" / "historico.json").read_text(encoding="utf-8"))
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    resenhas = {p["url"].rstrip("/").split("/")[-1]: p["jogo"] for p in pauta["publicadas"]}
    limite = (dt.date.today() - dt.timedelta(days=3)).isoformat()
    saida, vistos = [], set()
    for slug, h in hist.items():
        nome = (h.get("nome") or "").strip()
        if not nome or h.get("tipo") not in (None, "game", "expansion"):
            continue
        pontos = h.get("pontos") or {}
        dia = max(pontos) if pontos else None
        preco, quando = (round(pontos[dia], 2), dia) if dia and dia >= limite else (None, None)
        capa = None
        if (ROOT / "img" / "black" / f"{slug}.webp").exists():
            capa = f"img/black/{slug}.webp"
        elif slug in resenhas and (ROOT / slug / "capa.jpg").exists():
            capa = f"{slug}/capa.jpg"
        saida.append([slug, nome, h.get("ano"), preco, quando, capa, 1 if slug in resenhas else 0])
        vistos.add(slug)
    for slug, nome in resenhas.items():
        if slug not in vistos:
            saida.append([slug, nome, None, None, None, f"{slug}/capa.jpg" if (ROOT / slug / "capa.jpg").exists() else None, 1])
    saida.sort(key=lambda j: j[1].lower())
    return {"gerado": dt.date.today().isoformat(), "jogos": saida}


def _casca(pre, dados_pagina, cfg):
    return (f'data-mercado data-pagina="{dados_pagina}" data-api="{e(cfg["api"])}" data-turnstile="{e(cfg.get("turnstile", ""))}" '
            f'data-raiz="{pre}mercado/" data-site="{pre}"')


DICAS = """<ul class="mc-lista">
   <li>Pague só pelo botão Comprar, pelo Mercado Pago. Nunca faça Pix ou depósito direto para o vendedor.</li>
   <li>O vendedor tem 10 dias para postar. Sem postagem no prazo, o pagamento volta para você sozinho.</li>
   <li>Acompanhe o rastreio na página do pedido e só confirme o recebimento depois de conferir o jogo.</li>
   <li>Na retirada em mãos, marque num lugar público e confira as peças na hora.</li>
   <li>Quem pede para pagar por fora do site está quebrando as regras: denuncie o anúncio.</li>
   <li>Desconfie de preço muito abaixo do normal e de pressa para fechar.</li>
  </ul>"""

REGRAS = """<ul class="mc-lista">
   <li>Só jogos de tabuleiro, card games, expansões e acessórios de jogos.</li>
   <li>Foto real do item à venda: nada de imagem da caixa tirada da internet.</li>
   <li>Preço final em reais. O frete é calculado pelo site, e a etiqueta sai pronta em Meus anúncios.</li>
   <li>Postar em até 10 dias depois do pagamento. Sem postagem no prazo, o pagamento volta para o comprador.</li>
   <li>Venda e pagamento sempre pelo site. A Elite fica com 5% do preço do jogo e usa o frete pago para comprar a etiqueta.</li>
   <li>Um anúncio por jogo, com conta do Mercado Pago conectada para receber.</li>
  </ul>
  <ul class="mc-lista nao">
   <li>Sem cópias piratas, falsificações ou jogos "print and play" vendidos como originais.</li>
   <li>Sem pedir pagamento por fora do site, rifas, sorteios, lojas disfarçadas de pessoa física ou links para outros sites.</li>
   <li>Sem dados de outras pessoas e sem linguagem ofensiva.</li>
  </ul>"""


def build_lista(cfg):
    pre = "../"
    filtros_cond = "".join(f'<option value="{v}">{r}</option>' for v, r, _ in CONDICOES)
    filtros_uf = "".join(f'<option value="{u}">{u}</option>' for u in UFS)
    esqueleto = "".join('<li class="mc-card esq" aria-hidden="true"><div><span class="mc-foto"></span><span class="mc-txt"><i class="l"></i><i class="l c"></i><i class="l p"></i></span></div></li>' for _ in range(8))
    corpo = f"""{cabecalho(pre, "Mercado")}
<main id="conteudo" class="in mc" {_casca(pre, "lista", cfg)}>
 {trilha(("Início", pre), ("Mercado", ""))}
 <section class="mc-hero" aria-labelledby="mc-h1">
  <p class="mc-kick">{ic("sacola")}Mercado da Elite · de jogador para jogador</p>
  <h1 id="mc-h1">Compre e venda jogos de tabuleiro <span>direto com quem joga</span></h1>
  <p class="lide">Anúncios feitos pelos próprios jogadores, com foto real do jogo, estado de conservação e cidade. Você paga pelo Mercado Pago, com Pix ou cartão, e o contato do vendedor é liberado assim que o pagamento é aprovado.</p>
  <div class="mc-acoes"><a class="mc-btn pri" href="anunciar/">{ic("mais")}Anunciar meu jogo</a><a class="mc-btn sec" href="#como-funciona">Como funciona</a><a class="mc-btn sec" href="meu/">Meus anúncios</a></div>
  <ul class="mc-stats" aria-live="polite">
   <li><b data-n="total">–</b><span>anúncios no ar</span></li>
   <li><b data-n="cidades">–</b><span>cidades</span></li>
   <li><b data-n="troca">–</b><span>aceitam troca</span></li>
   <li><b data-n="lacrados">–</b><span>lacrados</span></li>
  </ul>
 </section>
 <section class="mc-busca" aria-label="Buscar e filtrar anúncios">
  <label class="mc-q">{ic("busca")}<input type="search" name="q" placeholder="Buscar jogo, edição ou cidade" autocomplete="off" enterkeyhint="search" aria-label="Buscar jogo, edição ou cidade"></label>
  <div class="mc-filtros">
   <select name="cond" aria-label="Estado do jogo"><option value="">Estado: todos</option>{filtros_cond}</select>
   <select name="uf" aria-label="Estado (UF)"><option value="">Brasil todo</option>{filtros_uf}</select>
   <label class="mc-chip"><input type="checkbox" name="troca">{ic("troca")}Aceita troca</label>
   <label class="mc-chip"><input type="checkbox" name="envio">{ic("caixa")}Envia</label>
   <select name="ordem" aria-label="Ordenar"><option value="">Mais recentes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="az">Nome (A–Z)</option></select>
   <button type="button" class="mc-limpar" hidden>Limpar filtros</button>
  </div>
 </section>
 <p class="mc-n" role="status">Carregando anúncios…</p>
 <ul class="mc-grade" aria-label="Anúncios">{esqueleto}</ul>
 <div class="mc-vazio" hidden>{ic("sacola")}<b>Nenhum anúncio por aqui ainda</b><span class="mc-vazio-t">Que tal ser a primeira pessoa a anunciar?</span><a class="mc-btn pri" href="anunciar/">{ic("mais")}Anunciar meu jogo</a></div>
 <div class="mc-erro" hidden><b>Não conseguimos carregar os anúncios agora</b><span>Pode ser a sua conexão ou o nosso serviço. Tente de novo em alguns minutos.</span><button type="button" class="mc-btn pri mc-tentar">Tentar de novo</button></div>
 <noscript><p class="mc-aviso">O Mercado precisa de JavaScript ligado para mostrar os anúncios.</p></noscript>
 <section class="mc-como" id="como-funciona" aria-labelledby="h-como">
  <div><h2 id="h-como">Como funciona</h2><p class="sub">Anunciar é grátis e leva uns três minutos, sem criar conta. A Elite só ganha quando você vende: 5% do preço do jogo.</p></div>
  <ol class="mc-passos">
   <li><b>Anuncie com fotos reais</b>Escolha o jogo, tire até 6 fotos, diga o estado, o preço e o tamanho da caixa. Conecte o Mercado Pago para receber. A moderação confere antes de publicar.</li>
   <li><b>Pagamento pelo site</b>O comprador calcula o frete pelo CEP e paga por Pix ou cartão. O dinheiro do jogo cai na sua conta do Mercado Pago.</li>
   <li><b>Etiqueta pronta</b>Você gera a etiqueta em Meus anúncios, imprime (ou abre pelo QR no celular) e posta em até 10 dias. O rastreio aparece para os dois.</li>
   <li><b>Entrega e avaliação</b>O comprador confirma que recebeu e avalia você. Boas avaliações aparecem nos seus próximos anúncios.</li>
  </ol>
 </section>
 <div class="mc-dois">
  <section class="bloco" id="seguranca"><h2>{ic("escudo")} Para comprar com segurança</h2>{DICAS}</section>
  <section class="bloco" id="regras"><h2>Regras do Mercado</h2>{REGRAS}
   <p class="mc-aviso">Quem vende é o anunciante: o pagamento vai pelo Mercado Pago direto para a conta dele, e a Elite Boardgamers fica com 5% do preço do jogo como comissão pela vitrine. <a href="{pre}politica-editorial/#mercado">Regras de pagamento e como tratamos os seus dados</a></p></section>
 </div>
</main>
{rodape(pre)}
<script src="{pre}mercado/mercado.js?v={VERSAO_JS}" defer></script>"""
    ld = seo.script({"@type": "CollectionPage", "@id": URL, "url": URL, "name": "Mercado da Elite: compre e venda jogos de tabuleiro", "inLanguage": "pt-BR",
                     "isPartOf": {"@id": seo.SITE_ID}, "publisher": {"@id": seo.ORG_ID}},
                    seo.trilha(("Início", f"{SITE}/"), ("Mercado", URL)))
    titulo = "Mercado da Elite: compre e venda jogos de tabuleiro usados e lacrados | Elite Boardgamers"
    descr = ("Anúncios de jogos de tabuleiro feitos pelos próprios jogadores, com foto real, estado e cidade, e pagamento pelo Mercado Pago. "
             "Anunciar é grátis e todo anúncio passa por moderação.")
    return pagina(titulo, descr, URL, OG, pre, corpo, head_extra="\n" + CSS, jsonld=ld)


def build_anuncio(cfg):
    pre = "../../"
    corpo = f"""{cabecalho(pre, "Mercado", sub=True)}
<main id="conteudo" class="in mc" {_casca(pre, "anuncio", cfg)}>
 {trilha(("Início", pre), ("Mercado", "../"), ("Anúncio", ""))}
 <article class="mc-an" aria-busy="true">
  <div class="mc-gal">
   <div class="mc-gal-v"><div class="mc-trilho" tabindex="0" aria-label="Fotos do anúncio"></div>
    <button type="button" class="mc-seta a" aria-label="Foto anterior">{icone("voltar")}</button><button type="button" class="mc-seta p" aria-label="Próxima foto">{icone("voltar")}</button>
    <span class="mc-cont" aria-hidden="true"></span></div>
   <div class="mc-mini" role="group" aria-label="Escolher foto"></div>
  </div>
  <div class="mc-info">
   <section class="bloco">
    <div class="mc-selos-l"></div>
    <h1 class="mc-tit">Carregando anúncio…</h1>
    <p class="mc-ed" hidden></p>
    <p class="mc-preco"></p>
    <div class="mc-vendido" hidden>Este jogo já foi vendido.</div>
    <dl class="mc-fatos"></dl>
    <div class="mc-vend"></div>
    <div class="mc-compra" hidden>
     <div class="mc-ent" role="radiogroup" aria-label="Como receber" hidden></div>
     <div class="mc-cep" hidden><label class="mc-campo">CEP para calcular o frete<span class="mc-cep-l"><input name="cep" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" maxlength="9"><button type="button" class="mc-btn sec mc-calc">Calcular</button></span></label>
      <p class="mc-st mc-st-frete" role="status"></p><div class="mc-fretes" role="radiogroup" aria-label="Opções de envio"></div></div>
     <p class="mc-total"></p>
     <button type="button" class="mc-btn pri mc-comprar">{ic("sacola")}Comprar</button>
     <p class="mc-pag">Pix ou cartão em até 12x pelo Mercado Pago. O contato do vendedor aparece assim que o pagamento é aprovado.</p>
    </div>
    <p class="mc-reservado" hidden>{ic("relogio")}<span>Alguém está pagando por este jogo agora. Se o pagamento não for concluído, ele volta à venda em até 30 minutos.</span></p>
    <div class="mc-novo" hidden></div>
    <a class="mc-res" hidden>{ic("estrela")}<span></span></a>
   </section>
   <section class="bloco mc-desc-b" hidden><h2>Descrição do vendedor</h2><p class="mc-desc"></p></section>
   <section class="bloco mc-aval-b" hidden><h2>{ic("estrela")} Avaliações do vendedor</h2><ul class="mc-avals"></ul></section>
   <section class="bloco"><div class="mc-rodape-an"><span class="mc-quando"></span>{botao_compartilhar("Olha esse anúncio no Mercado da Elite", "", mini=True)}</div>
    <button type="button" class="mc-denuncia">{ic("bandeira")}Denunciar este anúncio</button></section>
   <section class="bloco"><h2>{ic("escudo")} Antes de fechar negócio</h2>{DICAS}
    <p class="mc-aviso">Quem vende é o anunciante. O pagamento vai pelo Mercado Pago direto para a conta dele, e a Elite fica com 5% do preço do jogo.</p></section>
  </div>
 </article>
 <div class="mc-erro" hidden><b>Anúncio não encontrado</b><span class="mc-erro-t">Ele pode ter sido vendido, removido pelo vendedor ou vencido.</span><a class="mc-btn pri" href="../">Ver outros anúncios</a></div>
 <dialog class="mc-dlg mc-zoom" aria-label="Foto em tela cheia"><img alt=""><button type="button" class="fechar" aria-label="Fechar">{icone("nao")}</button></dialog>
 <dialog class="mc-dlg mc-compra-dlg" aria-labelledby="h-compra"><form method="dialog" novalidate>
  <h2 id="h-compra">Seus dados para a compra</h2>
  <p class="mc-resumo"></p>
  <label class="mc-campo">Seu nome<input name="nome" required minlength="2" maxlength="60" autocomplete="name"></label>
  <label class="mc-campo">E-mail <small>(o Mercado Pago manda o comprovante)</small><input name="email" type="email" required maxlength="120" autocomplete="email"></label>
  <label class="mc-campo">WhatsApp <small>(o vendedor recebe para combinar a entrega)</small><input name="whatsapp" type="tel" inputmode="tel" required autocomplete="tel-national" placeholder="(11) 98765-4321" maxlength="20"></label>
  <fieldset class="mc-end" hidden><legend>Endereço de entrega</legend>
   <p class="mc-aviso" style="color:var(--paper-muted)">Vai só para a etiqueta do envio, não aparece para ninguém. A transportadora exige o CPF de quem recebe.</p>
   <div class="mc-linha"><label class="mc-campo">Nome completo de quem recebe<input name="e_nome" maxlength="80" autocomplete="name"></label><label class="mc-campo">CPF<input name="e_cpf" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" autocomplete="off"></label></div>
   <div class="mc-linha c3"><label class="mc-campo">Rua<input name="e_rua" maxlength="120" autocomplete="address-line1"></label><label class="mc-campo">Número<input name="e_numero" maxlength="20" autocomplete="off"></label></div>
   <div class="mc-linha"><label class="mc-campo"><span>Complemento <small>(opcional)</small></span><input name="e_complemento" maxlength="60" autocomplete="address-line2"></label><label class="mc-campo">Bairro<input name="e_bairro" maxlength="80"></label></div>
   <div class="mc-linha c3"><label class="mc-campo">Cidade<input name="e_cidade" maxlength="60" autocomplete="address-level2"></label><label class="mc-campo">UF<input name="e_uf" maxlength="2" autocomplete="address-level1"></label></div>
  </fieldset>
  <label class="isca" aria-hidden="true">Site<input name="site" tabindex="-1" autocomplete="off"></label>
  <label class="mc-check"><input type="checkbox" name="aceite" value="1" required> <span>Li as <a href="../#regras" target="_blank">regras do Mercado</a> e sei que a compra é feita com o vendedor, pelo Mercado Pago.</span></label>
  <div class="mc-ts"></div>
  <p class="mc-st" role="status"></p>
  <div class="acoes"><button class="mc-btn sec" value="cancelar" formnovalidate>Cancelar</button><button class="mc-btn pri" value="pagar">Ir para o pagamento</button></div>
 </form></dialog>
 <dialog class="mc-dlg mc-den-dlg" aria-labelledby="h-den"><form method="dialog">
  <h2 id="h-den">Denunciar anúncio</h2><p class="mc-aviso" style="color:var(--paper-muted)">Com três denúncias o anúncio sai do ar até a moderação conferir.</p>
  <label><input type="radio" name="motivo" value="golpe" required> Parece golpe</label>
  <label><input type="radio" name="motivo" value="falso"> Foto ou jogo falso, pirata ou diferente do anunciado</label>
  <label><input type="radio" name="motivo" value="vendido"> Já foi vendido</label>
  <label><input type="radio" name="motivo" value="ofensivo"> Conteúdo ofensivo, propaganda ou pedido de pagamento por fora</label>
  <label><input type="radio" name="motivo" value="outro"> Outro motivo</label>
  <p class="mc-st" role="status"></p>
  <div class="acoes"><button class="mc-btn sec" value="cancelar" formnovalidate>Cancelar</button><button class="mc-btn pri" value="enviar">Enviar denúncia</button></div>
 </form></dialog>
</main>
{rodape(pre)}
<script src="{pre}mercado/mercado.js?v={VERSAO_JS}" defer></script>"""
    return pagina("Anúncio no Mercado da Elite | Elite Boardgamers", "Jogo de tabuleiro anunciado por um jogador no Mercado da Elite, com fotos, estado, preço e contato.",
                  "", OG, pre, corpo, head_extra="\n" + CSS)


def build_anunciar(cfg):
    pre = "../../"
    ufs = "".join(f'<option value="{u}">{u}</option>' for u in UFS)
    conds = "".join(f'<label class="mc-op"><input type="radio" name="condicao" value="{v}" required>{r}<small>{d}</small></label>' for v, r, d in CONDICOES)
    pacotes = "".join(f'<label class="mc-op"><input type="radio" name="pacote" value="{v}"{" checked" if v == "m" else ""}>{r}<small>{d}</small></label>' for v, r, d in PACOTES)
    corpo = f"""{cabecalho(pre, "Mercado", sub=True)}
<main id="conteudo" class="in mc" {_casca(pre, "anunciar", cfg)}>
 {trilha(("Início", pre), ("Mercado", "../"), ("Anunciar", ""))}
 <header><h1 class="mc-tit" style="color:#fff">Anunciar meu jogo</h1><p class="sub">Grátis para anunciar e sem criar conta. Você só paga quando vender: 5% do preço do jogo. O anúncio aparece depois da moderação e fica no ar por 60 dias, renováveis.</p></header>
 <div class="mc-form-l">
  <form class="mc-form" novalidate>
   <fieldset class="mc-passo"><legend><i>1</i>Qual é o jogo?</legend>
    <div class="mc-campo mc-ac"><label for="mc-jogo">Nome do jogo</label>
     <input id="mc-jogo" name="jogo" required minlength="2" maxlength="120" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="mc-sug" placeholder="Comece a digitar: Brass, Azul, Cascadia…">
     <ul class="mc-sug" id="mc-sug" role="listbox" hidden></ul></div>
    <input type="hidden" name="jogo_slug">
    <div class="mc-escolhido" hidden></div>
    <label class="mc-campo"><span>Edição e o que vem junto <small>(opcional)</small></span><input name="edicao" maxlength="120" placeholder="Ex.: edição nacional da Ludofy, com sleeves e expansão"></label>
   </fieldset>
   <fieldset class="mc-passo"><legend><i>2</i>Fotos</legend>
    <p class="dica">De 1 a 6 fotos reais do seu jogo, com boa luz. A primeira é a capa do anúncio. Mostre a caixa, os componentes e qualquer marca de uso.</p>
    <ul class="mc-fotos" aria-label="Fotos escolhidas"></ul>
    <label class="mc-add">{ic("camera")}<span>Adicionar fotos</span><input type="file" name="fotos" accept="image/*" multiple></label>
    <p class="mc-st mc-st-fotos" role="status"></p>
   </fieldset>
   <fieldset class="mc-passo"><legend><i>3</i>Estado e preço</legend>
    <div class="mc-ops c2" role="radiogroup" aria-label="Estado do jogo">{conds}</div>
    <div class="mc-linha">
     <label class="mc-campo">Preço<span class="mc-preco-in"><span>R$</span><input name="preco_txt" inputmode="decimal" required placeholder="0,00" autocomplete="off"></span></label>
     <label class="mc-campo">Idioma<select name="idioma" required><option value="pt">Português</option><option value="en">Inglês</option><option value="independente">Independente de idioma</option><option value="outro">Outro idioma</option></select></label>
    </div>
    <label class="mc-check"><input type="checkbox" name="troca" value="1"> Aceito propostas de troca</label>
    <div class="mc-ops" role="radiogroup" aria-label="Entrega">
     <label class="mc-op"><input type="radio" name="entrega" value="ambos" required checked>Envio ou retirada<small>Mando pelos Correios ou entrego em mãos</small></label>
     <label class="mc-op"><input type="radio" name="entrega" value="envio">Só envio<small>Mando pelos Correios ou transportadora</small></label>
     <label class="mc-op"><input type="radio" name="entrega" value="retirada">Só retirada<small>Entrego em mãos na minha cidade</small></label>
    </div>
    <div class="mc-frete">
     <label class="mc-campo"><span>CEP de onde o jogo sai <small>(não aparece no anúncio; serve para calcular o frete)</small></span><input name="cep_origem" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" maxlength="9"></label>
     <p class="mc-rot">Tamanho da caixa do envio, já embalada</p>
     <div class="mc-ops c2" role="radiogroup" aria-label="Tamanho da caixa">{pacotes}</div>
     <label class="mc-check"><input type="checkbox" name="frete_gratis" value="1"> <span>Ofereço frete grátis <small>(o valor da etiqueta sai do que você recebe)</small></span></label>
    </div>
    <label class="mc-campo"><span>Descrição <small>(opcional)</small></span><textarea name="descricao" maxlength="1500" rows="5" placeholder="Quantas vezes foi jogado, se está completo, se tem sleeves ou insert, marcas de uso…"></textarea><span class="mc-cont-t" aria-live="polite">0/1.500</span></label>
   </fieldset>
   <fieldset class="mc-passo"><legend><i>4</i>Você e o contato</legend>
    <p class="dica">Nome, cidade e contato aparecem no anúncio para quem quiser comprar. O e-mail não aparece.</p>
    <label class="mc-campo">Seu nome ou apelido<input name="vendedor" required minlength="2" maxlength="60" autocomplete="nickname"></label>
    <div class="mc-linha c3">
     <label class="mc-campo">Cidade<input name="cidade" required minlength="2" maxlength="60" autocomplete="address-level2"></label>
     <label class="mc-campo">UF<select name="uf" required autocomplete="address-level1"><option value="">Escolha</option>{ufs}</select></label>
    </div>
    <div class="mc-linha">
     <label class="mc-campo">WhatsApp<input name="whatsapp" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(11) 98765-4321" maxlength="20"></label>
     <label class="mc-campo"><span>Instagram <small>(opcional)</small></span><input name="instagram" autocomplete="off" placeholder="@seu.perfil" maxlength="60"></label>
    </div>
    <label class="mc-campo"><span>E-mail <small>(opcional, não aparece; só para avisarmos sobre o anúncio)</small></span><input name="email" type="email" maxlength="120" autocomplete="email"></label>
    <label class="isca" aria-hidden="true">Site<input name="site" tabindex="-1" autocomplete="off"></label>
   </fieldset>
   <fieldset class="mc-passo"><legend><i>5</i>Publicar</legend>
    <label class="mc-check"><input type="checkbox" name="aceite" value="1" required> <span>Li as <a href="../#regras" target="_blank">regras do Mercado</a> e autorizo a Elite Boardgamers a publicar este anúncio com o meu nome, a cidade, as fotos e o contato que deixei, até eu remover. <a href="{pre}politica-editorial/#mercado" target="_blank">Como tratamos os dados</a></span></label>
    <p class="mc-taxa">Quando vender pelo site, você recebe na sua conta do Mercado Pago o preço do jogo menos 5% da Elite (e menos o frete, se você oferecer frete grátis). A tarifa do próprio Mercado Pago também é descontada do que você recebe. A etiqueta do envio sai pronta, paga com o frete do comprador. <span class="mc-liquido"></span></p>
    <div class="mc-ts"></div>
    <div class="mc-enviar"><button type="submit" class="mc-btn pri">{ic("sacola")}Enviar anúncio para moderação</button>
     <p class="mc-st mc-st-envio" role="status"></p></div>
   </fieldset>
  </form>
  <aside class="mc-prev" aria-label="Prévia do anúncio"><p>Prévia do seu anúncio</p><ul class="mc-grade" style="grid-template-columns:1fr"></ul></aside>
 </div>
 <section class="mc-ok" hidden aria-live="polite">
  <h2>Anúncio enviado! Falta um passo</h2>
  <p>Conecte a sua conta do Mercado Pago: é nela que você recebe o dinheiro das vendas. Sem isso o anúncio não aparece no Mercado, mesmo depois de aprovado pela moderação.</p>
  <div class="mc-acoes"><button type="button" class="mc-btn pri mc-conectar">{ic("caixa")}Conectar minha conta do Mercado Pago</button></div>
  <p class="mc-st mc-st-con" role="status"></p>
  <p>Guarde também o link abaixo: é por ele que você acompanha, muda o preço, conecta o Mercado Pago e vê as vendas. Quem tiver o link consegue mexer no anúncio, então não compartilhe.</p>
  <div class="mc-link"><input readonly aria-label="Seu link de gerenciamento"><button type="button" class="mc-btn pri mc-copiar">{icone("copiar")}Copiar link</button></div>
  <div class="mc-acoes"><a class="mc-btn zap mc-zap-eu" target="_blank" rel="noopener">{icone("zap")}Mandar o link para o meu WhatsApp</a><a class="mc-btn sec" href="../meu/">Ver meus anúncios</a><a class="mc-btn sec" href="./">Anunciar outro jogo</a></div>
 </section>
</main>
{rodape(pre, barra="")}
<script src="{pre}mercado/mercado.js?v={VERSAO_JS}" defer></script>"""
    return pagina("Anunciar jogo no Mercado da Elite | Elite Boardgamers", "Anuncie grátis seu jogo de tabuleiro no Mercado da Elite: fotos reais, estado, preço e contato direto, sem comissão.",
                  f"{SITE}/mercado/anunciar/", OG, pre, corpo, head_extra="\n" + CSS)


def build_meu(cfg):
    pre = "../../"
    corpo = f"""{cabecalho(pre, "Mercado", sub=True)}
<main id="conteudo" class="in mc" {_casca(pre, "meu", cfg)}>
 {trilha(("Início", pre), ("Mercado", "../"), ("Meus anúncios", ""))}
 <dialog class="mc-dlg mc-etq-dlg" aria-labelledby="h-etq"><form method="dialog" novalidate>
  <h2 id="h-etq">Gerar etiqueta de envio</h2>
  <p class="mc-resumo"></p>
  <p class="mc-aviso" style="color:var(--paper-muted)">Seus dados de remetente vão só para a etiqueta e não ficam guardados no site. A transportadora exige o CPF de quem envia.</p>
  <div class="mc-linha"><label class="mc-campo">Nome completo<input name="r_nome" maxlength="80" autocomplete="name"></label><label class="mc-campo">CPF<input name="r_cpf" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" autocomplete="off"></label></div>
  <div class="mc-linha"><label class="mc-campo">CEP<input name="r_cep" inputmode="numeric" maxlength="9" autocomplete="postal-code"></label><label class="mc-campo">Número<input name="r_numero" maxlength="20"></label></div>
  <label class="mc-campo">Rua<input name="r_rua" maxlength="120" autocomplete="address-line1"></label>
  <div class="mc-linha"><label class="mc-campo"><span>Complemento <small>(opcional)</small></span><input name="r_complemento" maxlength="60" autocomplete="address-line2"></label><label class="mc-campo">Bairro<input name="r_bairro" maxlength="80"></label></div>
  <div class="mc-linha c3"><label class="mc-campo">Cidade<input name="r_cidade" maxlength="60" autocomplete="address-level2"></label><label class="mc-campo">UF<input name="r_uf" maxlength="2" autocomplete="address-level1"></label></div>
  <label class="mc-check"><input type="checkbox" name="r_lembrar" value="1" checked> <span>Lembrar o endereço neste aparelho (o CPF não é lembrado)</span></label>
  <p class="mc-st" role="status"></p>
  <div class="acoes"><button class="mc-btn sec" value="cancelar" formnovalidate>Cancelar</button><button class="mc-btn pri" value="gerar">Gerar etiqueta</button></div>
 </form></dialog>
 <header><h1 class="mc-tit" style="color:#fff">Meus anúncios</h1><p class="sub">Os anúncios que você fez neste aparelho, ou que abriu pelo seu link de gerenciamento.</p></header>
 <p class="mc-st mc-st-meu" role="status"></p>
 <ul class="mc-meus"></ul>
 <section class="mc-compras" hidden><h2>Minhas compras</h2><ul class="mc-meus mc-compras-l"></ul></section>
 <div class="mc-vazio" hidden>{ic("sacola")}<b>Nenhum anúncio neste aparelho</b><span>Abra o link de gerenciamento que você recebeu ao anunciar, ou faça um anúncio novo.</span><a class="mc-btn pri" href="../anunciar/">{ic("mais")}Anunciar meu jogo</a></div>
</main>
{rodape(pre, barra="")}
<script src="{pre}mercado/qr.js?v={VERSAO_JS}" defer></script>
<script src="{pre}mercado/mercado.js?v={VERSAO_JS}" defer></script>"""
    return pagina("Meus anúncios no Mercado da Elite | Elite Boardgamers", "Acompanhe, mude o preço, marque como vendido ou remova os seus anúncios do Mercado da Elite.",
                  "", OG, pre, corpo, head_extra="\n" + CSS)


def build_pedido(cfg):
    pre = "../../"
    corpo = f"""{cabecalho(pre, "Mercado", sub=True)}
<main id="conteudo" class="in mc" {_casca(pre, "pedido", cfg)}>
 {trilha(("Início", pre), ("Mercado", "../"), ("Pedido", ""))}
 <section class="mc-pedido bloco" aria-live="polite" aria-busy="true">
  <div class="mc-ped-topo"><span class="mc-ped-foto"></span><div><p class="est"></p><h1 class="mc-tit">Carregando pedido…</h1><p class="mc-ped-sub"></p></div></div>
  <ol class="mc-etapas" aria-label="Etapas do pedido"></ol>
  <dl class="mc-fatos mc-ped-val"></dl>
  <div class="mc-ped-msg"></div>
  <div class="mc-rastreio" hidden></div>
  <div class="mc-contato"></div>
  <div class="mc-ped-acoes"></div>
 </section>
 <section class="bloco mc-avaliar" hidden><h2>{ic("estrela")} Avalie o vendedor</h2>
  <form class="mc-aval-f" novalidate><div class="mc-estrelas" role="radiogroup" aria-label="Nota">{"".join(f'<label><input type="radio" name="nota" value="{n}"><span aria-hidden="true">★</span><b class="sr">{n} estrela{"s" if n > 1 else ""}</b></label>' for n in range(5, 0, -1))}</div>
   <label class="mc-campo"><span>Comentário <small>(opcional, aparece nos anúncios do vendedor)</small></span><textarea name="comentario" maxlength="500" rows="3"></textarea></label>
   <button type="submit" class="mc-btn pri">Enviar avaliação</button><p class="mc-st" role="status"></p></form></section>
 <dialog class="mc-dlg mc-prob-dlg" aria-labelledby="h-prob"><form method="dialog" novalidate>
  <h2 id="h-prob">Tive um problema com o pedido</h2>
  <p class="mc-aviso" style="color:var(--paper-muted)">A moderação da Elite recebe o seu relato e fala com você e com o vendedor. Se for o caso, o pagamento é devolvido pelo Mercado Pago.</p>
  <label class="mc-campo">O que aconteceu?<textarea name="motivo" maxlength="1000" rows="4" placeholder="Ex.: o jogo chegou sem as cartas da expansão; o vendedor não respondeu para a retirada."></textarea></label>
  <p class="mc-st" role="status"></p>
  <div class="acoes"><button class="mc-btn sec" value="cancelar" formnovalidate>Cancelar</button><button class="mc-btn pri" value="enviar">Enviar para a moderação</button></div>
 </form></dialog>
 <div class="mc-erro" hidden><b>Pedido não encontrado</b><span>Use o endereço que abriu quando você voltou do Mercado Pago. O comprovante também chega no seu e-mail.</span><a class="mc-btn pri" href="../">Voltar ao Mercado</a></div>
 <section class="bloco"><h2>{ic("escudo")} Depois da compra</h2><ul class="mc-lista">
  <li>O vendedor tem 10 dias para postar. Sem postagem no prazo, o pagamento volta para você sozinho.</li>
  <li>O rastreio aparece aqui assim que o pacote é postado.</li>
  <li>Confira o jogo e confirme o recebimento. Sem confirmação, o pedido é concluído 7 dias depois da entrega.</li>
  <li>Algum problema? Use o botão "Tive um problema" antes de confirmar: a moderação da Elite acompanha.</li>
 </ul></section>
</main>
{rodape(pre, barra="")}
<script src="{pre}mercado/mercado.js?v={VERSAO_JS}" defer></script>"""
    return pagina("Seu pedido no Mercado da Elite | Elite Boardgamers", "Acompanhe as etapas da sua compra no Mercado da Elite: pagamento, envio, entrega e avaliação.", "", OG, pre, corpo, head_extra="\n" + CSS)


def build():
    """Gera as páginas e devolve quantas escreveu (0 enquanto o serviço do Mercado não estiver instalado)."""
    cfg = _config_interacoes()
    if not (cfg.get("api") and cfg.get("mercado")):
        return 0
    for sub in ("", "anunciar", "anuncio", "meu", "pedido"):
        (DIR / sub).mkdir(parents=True, exist_ok=True)
    (DIR / "index.html").write_text(build_lista(cfg), encoding="utf-8")
    (DIR / "anunciar" / "index.html").write_text(build_anunciar(cfg), encoding="utf-8")
    (DIR / "anuncio" / "index.html").write_text(build_anuncio(cfg), encoding="utf-8")
    (DIR / "meu" / "index.html").write_text(build_meu(cfg), encoding="utf-8")
    (DIR / "pedido" / "index.html").write_text(build_pedido(cfg), encoding="utf-8")
    (DIR / "jogos.json").write_text(json.dumps(jogos(), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return 5


if __name__ == "__main__":
    n = build()
    print(f"ok mercado: {n} páginas" if n else "Mercado desligado: conteudo/interacoes.json sem \"mercado\": true (rode tools/comentarios/instalar.py)")
