"""Pacote de divulgação do dia: textos prontos para copiar e colar no Instagram, nos grupos de WhatsApp/Telegram
e no fórum da Ludopédia (resenhas).

Uso: python3 tools/divulgacao.py [AAAA-MM-DD]   (sem data: hoje, no horário de Brasília)
     python3 tools/divulgacao.py --ludopedia     (todas as resenhas já publicadas, em divulgacao/ludopedia.md)
Grava divulgacao/<data>.md (fica no repositório, fora do site) e imprime o resumo para os grupos.
Os textos saem só do que já está publicado (título, lide, opinião, legenda da resenha): nada é inventado aqui.
Pedido do usuário em 29/10/2026: trazer gente para o site pelas redes enquanto o Google ainda manda pouco.
"""
import json
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://eliteboardgamers.com.br"
BRT = timezone(timedelta(hours=-3))
GERAIS = "#JogosDeTabuleiro #BoardGames #Boardgamer #EliteBoardgamers"
CHAMADAS = ROOT / "conteudo" / "chamadas.json"  # chamada e pergunta de cada nota/resenha (fora da página)


def chamadas():
    return json.loads(CHAMADAS.read_text(encoding="utf-8")) if CHAMADAS.exists() else {}


def primeira_frase(t):
    return re.split(r"(?<=[.!?])\s+", (t or "").strip())[0]


def hashtag(t):
    t = re.sub(r"[^\w\s]", "", t or "")
    return "#" + "".join(p[:1].upper() + p[1:] for p in t.split()) if t.strip() else ""


def dia_brt(iso):
    return datetime.fromisoformat(iso).astimezone(BRT).date().isoformat() if iso else None


def noticias(dia):
    ns = [json.loads(p.read_text(encoding="utf-8")) for p in sorted((ROOT / "conteudo" / "noticias").glob("*.json"))]
    ns = [n for n in ns if dia_brt(n.get("publicado_em")) == dia or (not n.get("publicado_em") and n.get("data") == dia)]
    # manchete primeiro, depois a pontuação
    return sorted(ns, key=lambda n: (not n.get("manchete"), -(n.get("crivo", {}).get("pontos") or 0)))


def resenhas(dia):
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    res = []
    for pub in pauta["publicadas"]:
        if pub.get("data") == dia:
            slug = pub["url"].rstrip("/").split("/")[-1]
            arq = ROOT / "conteudo" / f"{slug}.json"
            if arq.exists():
                res.append(json.loads(arq.read_text(encoding="utf-8")))
    return res


def bloco_noticia(n, ch):
    url = f"{SITE}/noticias/{n['slug']}/"
    c = ch.get(n["slug"], {})
    gancho, pergunta = c.get("chamada") or n["titulo"], c.get("pergunta")
    tags = " ".join(t for t in [hashtag(n.get("categoria")), hashtag(n.get("editora"))] if t)
    insta = (f"{gancho}\n\n{primeira_frase(n['lide'])}\n\n"
             f"Nossa opinião: {primeira_frase(n['veredito'])}\n\n"
             + (f"💬 {pergunta}\n\n" if pergunta else "")
             + f"Notícia completa no link da bio.\n\n{tags} {GERAIS}".replace("  ", " "))
    zap = f"*{gancho}*\n\n{n['titulo']}\n{url}" + (f"\n\n💬 {pergunta}" if pergunta else "")
    return (f"### {n['titulo']}\n\n"
            f"Link: {url}\n"
            f"Imagem para o post: {SITE}/img/og/noticia-{n['slug']}.jpg\n\n"
            f"**WhatsApp / Telegram**\n\n```\n{zap}\n```\n\n"
            f"**Instagram (legenda)**\n\n```\n{insta}\n```\n")


def bloco_resenha(c, ch):
    url = f"{SITE}/{c['slug']}/"
    titulo = c.get("og_titulo") or f"Resenha de {c['jogo']}"
    x = ch.get(c["slug"], {})
    gancho, pergunta = x.get("chamada"), x.get("pergunta")
    insta = (f"{gancho}\n\n" if gancho else "") + (c.get("legenda") or (f"{titulo}\n\n{c.get('tagline', '')}\n\nResenha completa no link da bio.\n\n"
                                 f"{hashtag(c['jogo'])} {GERAIS}"))
    zap = (f"*{gancho}*\n\nResenha de {c['jogo']}\n{url}" if gancho else f"*Resenha: {c['jogo']}*\n{c.get('tagline', '')}\n{url}") \
        + (f"\n\n💬 {pergunta}" if pergunta else "")
    return (f"### Resenha: {c['jogo']}\n\n"
            f"Link: {url}\n"
            f"Imagem para o post: {SITE}/img/og/resenha-{c['slug']}.jpg\n\n"
            f"**WhatsApp / Telegram**\n\n```\n{zap}\n```\n\n"
            f"**Instagram (legenda)**\n\n```\n{insta}\n```\n")


def pagina_ludopedia(c):
    """Página do jogo na Ludopédia, quando a resenha a usou como fonte (sem os parâmetros de aba)."""
    for _, url, *_ in c.get("fontes", []):
        if "ludopedia.com.br/jogo/" in url:
            return re.split(r"[?&]", url)[0]
    return None


def post_ludopedia(c):
    """Tópico de análise para o fórum do jogo na Ludopédia: um resumo próprio, não a resenha inteira
    (texto idêntico ao do site concorreria com ele no Google), com o link para a resenha completa no fim.
    Texto simples, sem marcação, para sair igual em qualquer editor. Tudo sai da resenha publicada."""
    url = f"{SITE}/{c['slug']}/"
    titulo = f"(Análise) {c['jogo']}: {c['tagline']}"
    partes = [c["lede"]]
    if c.get("experiencia"):
        partes.append("COMO É JOGAR\n" + c["experiencia"][0])
    if c.get("funciona"):
        partes.append("O QUE FUNCIONA\n" + "\n".join(f"• {t}: {primeira_frase(x)}" for t, x in c["funciona"][:3]))
    if c.get("atencao"):
        partes.append("PONTOS DE ATENÇÃO\n" + "\n".join(f"• {t}: {primeira_frase(x)}" for _, t, x in c["atencao"][:3]))
    if c.get("para_quem"):
        partes.append("É PARA VOCÊ SE...\n" + "\n".join(f"• {x}" for x in c["para_quem"][:3]))
    partes.append(f"VEREDITO ({c['selo']})\n{c['veredito']}")
    if c.get("edicao_nacional"):
        preco = c.get("preco_ref") or {}
        partes.append("NO BRASIL\n" + primeira_frase(c["edicao_nacional"])
                      + (f" Preço: {preco['faixa']} (consulta em {preco['data']})." if preco.get("faixa") else ""))
    partes.append("A resenha completa, com as regras passo a passo, o que diz a crítica, as fontes e a comparação com outros jogos, "
                  f"está no site da Elite Board Gamers:\n{url}")
    onde = pagina_ludopedia(c)
    return (f"### Ludopédia: {c['jogo']}\n\n"
            + (f"Onde postar: fórum do jogo em {onde} (novo tópico, categoria de análise ou resenha)\n\n" if onde
               else "Onde postar: procure o jogo na busca da Ludopédia e abra um novo tópico no fórum dele (categoria de análise ou resenha)\n\n")
            + f"**Título do tópico**\n\n```\n{titulo}\n```\n\n**Texto**\n\n```\n" + "\n\n".join(partes) + "\n```\n")


AVISO_LUDOPEDIA = ("Cole o título e o texto num tópico novo do fórum do jogo. Responda aos comentários: isso mantém o tópico em destaque. "
                   "Não cole a resenha inteira do site nem só o link: o resumo com o link é o que a comunidade aceita melhor.\n\n")


def resumo_grupos(dia, ns, rs, ch):
    d = datetime.fromisoformat(dia).strftime("%d/%m")
    linhas = [f"🎲 *O que rolou no tabuleiro hoje ({d})*", ""]
    linhas += [f"👉 {ch.get(n['slug'], {}).get('chamada') or n['titulo']}\n{SITE}/noticias/{n['slug']}/\n" for n in ns]
    linhas += [f"⭐ Resenha de {c['jogo']}: {ch.get(c['slug'], {}).get('chamada') or c.get('tagline', '')}\n{SITE}/{c['slug']}/\n" for c in rs]
    # a pergunta da manchete (ou do primeiro item) puxa a conversa no grupo
    pergunta = next((ch[x["slug"]]["pergunta"] for x in ns + rs if ch.get(x["slug"], {}).get("pergunta")), None)
    if pergunta:
        linhas += [f"💬 *{pergunta}*", ""]
    linhas += [f"Tudo em {SITE.removeprefix('https://')}"]
    return "\n".join(linhas)


def gerar(dia):
    ns, rs, ch = noticias(dia), resenhas(dia), chamadas()
    if not ns and not rs:
        return None, ""
    resumo = resumo_grupos(dia, ns, rs, ch)
    md = (f"# Divulgação de {datetime.fromisoformat(dia).strftime('%d/%m/%Y')}\n\n"
          "Textos prontos para copiar e colar. Os do Instagram dizem \"link na bio\"; nos Stories, use a figurinha de link "
          "com o endereço da notícia. Poste em horários diferentes ao longo do dia, não tudo de uma vez.\n\n"
          f"## Resumo do dia para grupos de WhatsApp e Telegram\n\n```\n{resumo}\n```\n\n"
          + (f"## Notícias ({len(ns)})\n\n" + "\n".join(bloco_noticia(n, ch) for n in ns) if ns else "")
          + (f"\n## Resenhas ({len(rs)})\n\n" + "\n".join(bloco_resenha(c, ch) for c in rs) if rs else "")
          + (f"\n## Ludopédia ({len(rs)})\n\n{AVISO_LUDOPEDIA}" + "\n".join(post_ludopedia(c) for c in rs) if rs else ""))
    destino = ROOT / "divulgacao" / f"{dia}.md"
    destino.parent.mkdir(exist_ok=True)
    destino.write_text(md, encoding="utf-8")
    return destino, resumo


def todas_ludopedia():
    """Arquivo com o tópico da Ludopédia de todas as resenhas publicadas (para ir postando aos poucos)."""
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    rs = []
    for pub in sorted(pauta["publicadas"], key=lambda p: p.get("data", ""), reverse=True):
        arq = ROOT / "conteudo" / f'{pub["url"].rstrip("/").split("/")[-1]}.json'
        if arq.exists():
            rs.append(json.loads(arq.read_text(encoding="utf-8")))
    destino = ROOT / "divulgacao" / "ludopedia.md"
    destino.write_text(f"# Resenhas para a Ludopédia ({len(rs)})\n\nDa mais nova para a mais antiga. Uma ou duas por dia é o bastante. "
                       + AVISO_LUDOPEDIA + "\n".join(post_ludopedia(c) for c in rs), encoding="utf-8")
    return destino, len(rs)


if __name__ == "__main__":
    if "--ludopedia" in sys.argv:
        destino, n = todas_ludopedia()
        sys.exit(print(f"ok {destino.relative_to(ROOT)}: {n} resenhas"))
    dia = sys.argv[1] if len(sys.argv) > 1 else datetime.now(BRT).date().isoformat()
    destino, resumo = gerar(dia)
    if not destino:
        sys.exit(f"Nada publicado em {dia}.")
    print(f"ok {destino.relative_to(ROOT)}\n\n{resumo}")
