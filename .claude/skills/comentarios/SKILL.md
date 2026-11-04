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

## Mercado da Elite (anúncios dos vendedores)

Os anúncios do Mercado (`/mercado/`, código em `worker/src/mercado.js`) entram na mesma fila de moderação, em separado, e **nada aparece sem estar aprovado**. Mesma regra de decisão: a IA aprova os claramente bons, reprova o proibido óbvio e marca **duvidoso** o resto, que fica para o editor no painel (abas "Mercado esperando" e "Mercado recentes", onde estão as fotos).

1. `python3 tools/comentarios/moderar.py mercado-fila` — anúncios pendentes e duvidosos, com jogo, edição, estado, preço em centavos, cidade, vendedor, contato, descrição, chaves das fotos e denúncias. Duvidosos já são do editor (inclusive os que saíram do ar por denúncia): não decida de novo.
2. Veja as fotos em `https://api.eliteboardgamers.com.br/v1/mercado/foto/<chave>`.
3. `python3 tools/comentarios/moderar.py mercado-decidir <id> aprovado|reprovado|duvidoso "<parecer>"` (o parecer da reprovação aparece para o vendedor na página Meus anúncios: escreva com educação e diga o que corrigir).

**Aprovar** (todas): é jogo de tabuleiro, card game, expansão ou acessório de jogo; as fotos mostram o item de verdade (não só a imagem da caixa copiada da internet); o preço é coerente com o jogo; nome, descrição e contato não trazem propaganda, link, ofensa nem dado de terceiros.

**Reprovar**: pedido de pagamento por fora do site (Pix, depósito, "chama no zap para fechar") na descrição, no nome ou na edição; pirataria, falsificação ou "print and play" vendido como original; produto que não é jogo; rifa, sorteio, pedido de doação; loja ou revendedor com vários itens disfarçado de pessoa física; link para loja ou site; fotos sem relação com o anúncio; ofensa ou conteúdo sexual.

**Duvidoso**: só imagem oficial da caixa (pode ser lacrado, mas pede conferência), preço muito abaixo do normal (possível golpe), descrição que menciona Pix antecipado ou pressa, vários anúncios iguais do mesmo vendedor, qualquer hesitação.

A venda é paga pelo site, pelo Mercado Pago, direto na conta do vendedor; a Elite fica com 5% do preço do jogo (`worker/src/mercadopago.js`). Anúncio aprovado só aparece depois que o vendedor conecta a conta do Mercado Pago (o painel mostra "não conectado"). A aba **Vendas** do painel lista os pedidos com as etapas (pago → enviado → entregue → concluído), a etiqueta, o rastreio e os problemas abertos pelos compradores. Fluxo de cada venda: o frete é cotado no Melhor Envio pelo CEP do comprador; o vendedor gera a etiqueta em Meus anúncios (a Elite compra pela carteira dela no Melhor Envio: **mantenha saldo**) e posta em até 10 dias; sem postagem, o serviço devolve o pagamento sozinho; o comprador confirma e avalia (ou o pedido conclui 7 dias depois da entrega). Pedido com **problema** é sempre do editor: a IA não decide, só resume no relatório. Os botões do painel são Reabrir (sem problema), Concluir e Devolver o pagamento. Falha de etiqueta por falta de saldo aparece em vermelho no pedido.

## Instalação (uma vez)

Com `CLOUDFLARE_API_TOKEN_COMENTARIOS` e `MODERACAO_SENHA` no ambiente: `python3 tools/comentarios/instalar.py`, depois `python3 tools/build_home.py`, commit e push. Enquanto `conteudo/interacoes.json` não tiver `api`, o site não mostra curtidas nem comentários; enquanto não tiver `"mercado": true` (o instalador grava), o Mercado não é gerado e o botão não aparece no menu.
