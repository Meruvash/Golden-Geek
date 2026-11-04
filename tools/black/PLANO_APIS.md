# Radar Black de Verdade: plano das leituras por API

Pedido do usuário em 04/11/2026: ligar as fontes que exigem cadastro de API, da que traz mais promoções para a que
traz menos, só as relevantes. O Claude in Chrome faz o cadastro no navegador. O usuário só cria as contas, digita as
senhas, confirma códigos (SMS, e-mail, 2FA, captcha) e paga quando houver pagamento.

## Regras para o Claude in Chrome (valem para todas as etapas)

1. **Segredo nunca sai do navegador.** Chave, token, App Secret e api_hash vão direto do site da API para o
   formulário de segredos do GitHub (https://github.com/Meruvash/Golden-Geek/settings/secrets/actions/new).
   Nunca escreva o valor no chat, em arquivo, em nota, em print ou na resposta final. Para conferir, diga só "segredo
   KEEPA_KEY salvo".
2. **Pare e chame o usuário** em login, senha, código por SMS ou e-mail, 2FA, captcha, aceite de termos pagos e
   pagamento. Não invente dados pessoais. CPF, telefone e endereço são do usuário, digitados por ele.
3. **Não é afiliado.** Não entre em programa de afiliados, não gere link de afiliado e não aceite termos de afiliado.
   O bloco "Opcional" no fim só começa com autorização explícita do usuário.
4. **Só leitura.** Escolha sempre a permissão mínima (somente leitura). Nada de vender, postar ou mexer em conta.
5. No fim de cada etapa, escreva ao usuário uma linha: "Etapa N pronta: segredos X e Y salvos no GitHub". O usuário
   avisa o Claude Code, que liga a fonte no robô e testa.

## Ordem (maior impacto primeiro)

| # | Fonte | Por que vem nesta posição | Custo | Segredos no GitHub |
|---|---|---|---|---|
| 1 | Keepa (Amazon) | A Amazon é onde mais aparece queda de preço de jogo de tabuleiro, e hoje o radar não lê a Amazon (o robots.txt dela proíbe). O Keepa tem o histórico de preço e uma lista de quedas ("deals") por categoria: além de confirmar as ofertas que o Compara Jogos já liga à Amazon, ele **descobre** promoções novas. | Pago (assinatura da API do Keepa; o valor aparece na tela de compra) | `KEEPA_KEY` |
| 2 | Mercado Livre Developers | Lojas oficiais de editoras e lojas grandes vendem no Mercado Livre, que o radar também não lê (robots.txt). A API mostra o vencedor do anúncio (buy box), a loja oficial e a medalha do vendedor. | Grátis (conta do Mercado Livre validada) | `ML_CLIENT_ID`, `ML_CLIENT_SECRET` |
| 3 | Telegram API (my.telegram.org) | Hoje o robô lê só a prévia pública de 5 canais. Com a API ele lê canais sem prévia, o histórico inteiro e grupos públicos de promoção de jogos. | Grátis (precisa do número de celular) | `TELEGRAM_API_ID`, `TELEGRAM_API_HASH` e depois `TELEGRAM_SESSAO` |
| 4 | Bluesky | Busca de posts de promoção ("jogo de tabuleiro" + "promoção", "cupom") de lojas e da comunidade. Sem login a busca é recusada. | Grátis | `BSKY_USUARIO`, `BSKY_SENHA_APP` |

Ficam de fora por pouco retorno: Reddit (pouca promoção brasileira de jogos), Mastodon e Google Custom Search
(100 buscas por dia, não traz preço).

---

## Etapa 1: Keepa (Amazon)

1. Abra https://keepa.com. **Usuário:** cria a conta (ou faz login) e confirma o e-mail.
2. Abra https://keepa.com/#!api. Mostre ao usuário os planos de acesso à API com o preço de cada um. **Usuário:**
   escolhe o plano de menor preço (dá para o radar: ele lê poucos produtos por rodada) e paga.
3. Na mesma página, quando a chave de acesso aparecer, abra em outra aba
   https://github.com/Meruvash/Golden-Geek/settings/secrets/actions/new. Nome: `KEEPA_KEY`. Valor: a chave. Salve.
4. Responda: "Etapa 1 pronta: segredo KEEPA_KEY salvo no GitHub".

## Etapa 2: Mercado Livre Developers

1. Abra https://developers.mercadolivre.com.br e clique em entrar. **Usuário:** faz login com a conta do Mercado
   Livre. Se o portal pedir validação (CPF, telefone), o usuário preenche.
2. Abra "Minhas aplicações" (https://developers.mercadolivre.com.br/devcenter) e clique em "Criar aplicação":
   - Nome: `Elite Boardgamers Radar`
   - Nome curto: `eliteradar`
   - Descrição: `Leitura de preços públicos de jogos de tabuleiro para o radar de promoções do site eliteboardgamers.com.br. Somente leitura.`
   - Logo: pode pular. Se for obrigatório, peça ao usuário o arquivo `icon-192.png` do site.
   - URI de redirect: `https://eliteboardgamers.com.br/black/robo/`
   - Fluxo: marque só o que for obrigatório. Escopos: **somente leitura**, sem escrita e sem acesso offline.
   - Tópicos de notificação: nenhum. URL de notificação: deixe em branco ou use a mesma URI de redirect se for obrigatória.
3. **Usuário:** aceita os termos de desenvolvedor, se pedir.
4. Na aplicação criada, copie o **App ID** para o segredo `ML_CLIENT_ID` e a **Secret Key** para o segredo
   `ML_CLIENT_SECRET`, cada um pelo formulário do GitHub (link nas regras).
5. Responda: "Etapa 2 pronta: segredos ML_CLIENT_ID e ML_CLIENT_SECRET salvos no GitHub".

## Etapa 3: Telegram API

1. Abra https://my.telegram.org. **Usuário:** digita o número de celular e o código que chega no app do Telegram.
2. Entre em "API development tools" e preencha:
   - App title: `Elite Boardgamers Radar`
   - Short name: `eliteradar`
   - URL: `https://eliteboardgamers.com.br/black/robo/`
   - Platform: `Other`
   - Description: `Leitura de canais públicos de promoções de jogos de tabuleiro. Somente leitura.`
3. Copie o **api_id** para o segredo `TELEGRAM_API_ID` e o **api_hash** para o segredo `TELEGRAM_API_HASH`.
4. Responda: "Etapa 3 pronta: segredos TELEGRAM_API_ID e TELEGRAM_API_HASH salvos no GitHub".
5. O segredo `TELEGRAM_SESSAO` (a sessão de leitura) é gerado depois, num passo guiado pelo Claude Code, com o código
   de login que chega no celular do usuário. O Claude in Chrome não faz esse passo.

## Etapa 4: Bluesky

1. Abra https://bsky.app. **Usuário:** cria a conta (sugestão: `eliteboardgamers.bsky.social`) ou faz login.
2. Abra Configurações → Privacidade e segurança → Senhas de app
   (https://bsky.app/settings/app-passwords) → "Adicionar senha de app". Nome: `radar-black`. **Não** marque acesso
   a mensagens diretas.
3. Salve o identificador da conta (ex.: `eliteboardgamers.bsky.social`) no segredo `BSKY_USUARIO` e a senha de app
   gerada no segredo `BSKY_SENHA_APP`.
4. Responda: "Etapa 4 pronta: segredos BSKY_USUARIO e BSKY_SENHA_APP salvos no GitHub".

---

## Opcional: só com autorização explícita do usuário (exige programa de afiliados)

O usuário decidiu em 03/11/2026 não usar afiliados. Estas fontes trariam muitas ofertas, mas todas exigem entrar num
programa de afiliados. Não comece nenhuma sem um "pode" do usuário:

- **Amazon Product Advertising API**: exige ser Associado Amazon com vendas recentes. O Keepa (etapa 1) já cobre a
  Amazon sem afiliado.
- **Lomadee / Awin / Rakuten**: ofertas de Magalu, Casas Bahia, Americanas e outras lojas grandes, por API de feed.
- **API de afiliados da Shopee**.

## Depois de cada etapa (Claude Code)

- **Keepa:** liga a busca de quedas (`/deal`) na categoria de jogos de tabuleiro da amazon.com.br e a confirmação
  de preço vendido pela própria Amazon (regra: só "vendido e entregue pela Amazon"). Dispara um teste no Actions e
  confere quantas ofertas novas entraram.
- **Mercado Livre:** testa o token, a leitura do buy box e a busca na categoria de jogos de tabuleiro (regra: só loja
  oficial ou MercadoLíder).
- **Telegram:** gera a sessão com o usuário, lê os 5 canais atuais pela API e propõe canais novos da lista do fórum
  do Compara Jogos.
- **Bluesky:** liga a busca de posts no robô normal, com os mesmos filtros de produto do Telegram.
- Cada chave nova entra nos workflows `radar-normal.yml` e `radar-educado.yml` e só é usada por eles. Nenhuma chave
  aparece em arquivo, commit ou mensagem.
