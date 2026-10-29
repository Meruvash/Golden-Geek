---
name: comentarios
description: Moderação dos comentários do site da Elite Boardgamers — lê a fila do serviço de interações, aplica o crivo, publica sozinha os comentários claramente bons, descarta spam óbvio e deixa os duvidosos para o editor no painel. Use quando pedirem "/comentarios", "moderar comentários", "fila de comentários" ou quando a tarefa agendada de moderação disparar.
---

# Moderação de comentários

Comentários de notícias e resenhas entram numa fila no serviço `api.eliteboardgamers.com.br` (código em `worker/`) e **nada aparece no site sem estar aprovado**. Decisão do editor (29/10/2026): a IA aprova sozinha os claramente bons, reprova o spam óbvio e marca como **duvidoso** tudo o que não for claro; os duvidosos ficam para o editor no painel `https://api.eliteboardgamers.com.br/painel` (senha = `MODERACAO_SENHA`).

## Passos

1. `python3 tools/comentarios/moderar.py fila` — lista pendentes e duvidosos (id, página, nome, e-mail, texto, data). Os já marcados como `duvidoso` são do editor: não decida de novo.
2. Para cada pendente, abra a página citada só se precisar de contexto e aplique o crivo abaixo.
3. Registre cada decisão com um parecer curto e objetivo (uma frase, sem repetir o comentário):
   `python3 tools/comentarios/moderar.py decidir <id> aprovado|reprovado|duvidoso "<parecer>"`
4. Termine com um resumo para o editor: quantos aprovados, reprovados e duvidosos, e para cada duvidoso o motivo e o link do painel.

## Crivo

**Aprovar** (todas as condições): fala do jogo, da notícia, da resenha ou de jogos de tabuleiro em geral; é respeitoso, mesmo discordando do site ou de outras pessoas; não traz link, telefone, e-mail, endereço ou outro dado pessoal; não é propaganda. Crítica ao site, à resenha ou a uma editora, feita com educação, é aprovada: discordância não é motivo de reprovação.

**Reprovar** (spam óbvio ou proibido):
- propaganda, venda, sorteio, golpe, link para loja ou site, pedido de contato fora do site;
- texto sem sentido, repetido, só emoji ou só letras soltas;
- palavrão dirigido a alguém, xingamento, discurso de ódio, preconceito, assédio, conteúdo sexual;
- dado pessoal de terceiros (telefone, endereço, CPF, e-mail de outra pessoa).

**Duvidoso** (fica para o editor): acusação a pessoa ou empresa (por exemplo "a editora X engana os clientes"), informação que precisaria ser checada, política ou assunto fora de jogos, ironia que pode ser ofensa, palavrão leve sem alvo, comentário que cita a própria loja ou canal sem ser claramente propaganda, e qualquer caso em que você hesitou.

Na dúvida entre aprovar e duvidoso, escolha **duvidoso**. Nunca edite o texto de um comentário: ou ele sai como está, ou não sai. O e-mail nunca é publicado e não deve aparecer no resumo além do necessário para o editor.

## Instalação (uma vez)

Com `CLOUDFLARE_API_TOKEN_COMENTARIOS` e `MODERACAO_SENHA` no ambiente: `python3 tools/comentarios/instalar.py`, depois `python3 tools/build_home.py`, commit e push. Enquanto `conteudo/interacoes.json` não tiver `api`, o site não mostra curtidas nem comentários.
