"""Moldura comum a todas as páginas: cabeçalho, menu de seções e rodapé, num lugar só.

Usado por build_home.py (home, notícias, política, 404), build_calendario.py, build_review.py, build_lista.py
e build_consulta.py (que reescreve a moldura dentro de consulta/index.html). O CSS de cada página continua no
próprio gerador; aqui fica só a marcação, para que links, rótulos e aria-current sejam iguais no site inteiro.
"""
INSTAGRAM = "https://www.instagram.com/eliteboardgamers/"
WHATSAPP = "https://chat.whatsapp.com/IgQQkJdSkzHBaEq3UwFeAo"

ICONES = {
    "jogadores": '<path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 1a3 3 0 1 0 0-6M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 14.2c3 .4 5.5 2.8 5.5 5.8"/>',
    "duracao": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    "idade": '<path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/><path d="M9 10h.01M15 10h.01M8.5 14.5c1.9 2 5.1 2 7 0"/>',
    "peso": '<path d="M6 9h12l2 11H4L6 9Z"/><path d="M9 9a3 3 0 1 1 6 0"/>',
    "ok": '<path d="M4.5 12.5l4.5 4.5L19.5 6.5"/>',
    "insta": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
    "zap": '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19l-4.4 1Z"/><path d="M9.2 8.6c.3-.5.8-.5 1-.1l.7 1.5c.1.3 0 .6-.2.8l-.4.4c.5 1.1 1.4 2 2.5 2.5l.4-.4c.2-.2.5-.3.8-.2l1.5.7c.4.2.4.7-.1 1-.7.5-1.6.6-2.4.3a7 7 0 0 1-4.2-4.2c-.3-.8-.2-1.7.4-2.3Z"/>',
    "nao": '<path d="M6 6l12 12M18 6L6 18"/>',
    "salvar": '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.8"/><path d="M21 15.5l-5-5L5 21"/>',
    "copiar": '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
    "dica": '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
    "preco": '<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    "voltar": '<path d="M15 18l-6-6 6-6"/>',
    "topo": '<path d="M12 19V5M5 12l7-7 7 7"/>',
    "busca": '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    "compartilhar": '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
}

# (caminho a partir da raiz, rótulo) das seções do menu
SECOES = [("noticias/", "Notícias"), ("resenhas/", "Resenhas"), ("lancamentos/", "Lançamentos"), ("consulta/", "Consulta Golden Geek")]


def icone(nome, cls="ic"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICONES[nome]}</svg>'


# Disparador da busca: mostra a lupa e, no clique, em "/" ou em Ctrl+K, baixa busca.js (e o índice) pela primeira vez.
# É o único JavaScript de busca na carga da página.
DISPARADOR = ("(()=>{const b=document.querySelector('.busca-btn');let c;b.hidden=false;"
              "const a=()=>{c=c||new Promise((r,j)=>{const s=document.createElement('script');s.src='PREbusca.js';s.onload=r;"
              "s.onerror=()=>{c=null;j()};document.head.append(s)});c.then(()=>abrirBusca('PRE'),()=>{})};"
              "b.addEventListener('click',a);addEventListener('keydown',e=>{const t=e.target,ed=t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);"
              "if((e.key==='/'&&!ed&&!e.ctrlKey&&!e.metaKey)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();a()}})})()")

# CSS do botão de busca, igual em todas as páginas
CSS_BUSCA = (".busca-btn{display:grid;place-items:center;flex:none;width:44px;height:44px;padding:0;border:1px solid #3a3f48;border-radius:8px;"
             "background:none;color:#e9ecf1;cursor:pointer}.busca-btn:hover{border-color:#e3b23c;color:#e3b23c}.busca-btn[hidden]{display:none}")


def cabecalho(pre, atual="", sub=False):
    """Barra da marca + menu de seções.

    `atual` é o rótulo da seção da página. Na página-índice da seção o link recebe aria-current="page";
    numa subpágina (uma resenha, uma notícia) recebe aria-current="true", que marca a seção sem dizer
    que o link leva à própria página. O visual é o mesmo nos dois casos ([aria-current] no CSS)."""
    marca = "page" if not sub else "true"
    nav = "".join(f'<li><a href="{pre}{h}"{f" aria-current=\"{marca}\"" if t == atual else ""}>{t}</a></li>' for h, t in SECOES)
    return f"""<header class="bar" id="topo"><div class="in">
 <a class="marca" href="{pre or './'}"><img src="{pre}marca/elite-boardgamers.webp" width="318" height="254" alt="Elite Boardgamers: página inicial"></a>
 <a class="ig" href="{INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram @eliteboardgamers">{icone("insta")}<span>@eliteboardgamers</span></a>
 <a class="zap-mini" href="{WHATSAPP}" target="_blank" rel="noopener" aria-label="Grupo do WhatsApp">{icone("zap")}<span>Grupo do WhatsApp</span></a>
 <button type="button" class="busca-btn" aria-label="Buscar no site" aria-haspopup="dialog" aria-keyshortcuts="/ Control+K" hidden>{icone("busca")}</button>
</div></header>
<script>{DISPARADOR.replace("PRE", pre)}</script>
<nav class="nav" aria-label="Seções do site"><ul class="in">{nav}</ul></nav>"""


def trilha(*itens):
    """Trilha visível (breadcrumb) a partir de pares (rótulo, href); o último item é a página atual, sem link.

    Os rótulos são os mesmos do BreadcrumbList em JSON-LD (seo.trilha), que já existe nessas páginas."""
    *links, (atual, _) = itens
    lis = "".join(f'<li><a href="{h}">{r}</a></li>' for r, h in links)
    return f'<nav class="trilha" aria-label="Trilha de navegação"><ol>{lis}<li aria-current="page">{atual}</li></ol></nav>'


# CSS da trilha, igual nas páginas escuras (resenha, notícia)
CSS_TRILHA = (".trilha{min-width:0;max-width:100%}.trilha ol{display:flex;align-items:center;min-width:0;margin:0;padding:0;list-style:none;font-size:.85rem;color:var(--muted)}"
              ".trilha li{display:flex;align-items:center;white-space:nowrap}"
              ".trilha li+li::before{content:\"›\";content:\"›\" / \"\";margin:0 8px;color:var(--muted)}"
              ".trilha a{color:var(--gold);font-weight:700;text-decoration:none;padding:4px 0}.trilha a:hover{text-decoration:underline}"
              ".trilha li:last-child{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis}"
              ".trilha li:last-child::before{display:inline}")


def rodape(pre):
    return f"""<footer><div class="in">
 <span>Elite Boardgamers</span><a href="{pre}noticias/">Notícias</a><a href="{pre}resenhas/">Resenhas</a><a href="{pre}lancamentos/">Lançamentos</a><a href="{pre}consulta/">Consulta Golden Geek</a><a href="{pre}politica-editorial/">Política editorial</a>
 <a href="{INSTAGRAM}" target="_blank" rel="noopener">Instagram @eliteboardgamers</a><a href="{WHATSAPP}" target="_blank" rel="noopener">Grupo do WhatsApp</a>
</div></footer>"""
