# Notificações do sininho (Web Push)

## Como funciona
1. A pessoa toca no sininho (`sino.js`) ou em "Ativar alertas" na página do Black e escolhe os temas
   (Black de Verdade, Notícias, Resenhas). O navegador cria a inscrição e o site guarda no worker
   (`api.eliteboardgamers.com.br`, banco D1 `elite-interacoes`, tabela `push_subs`).
2. O build gera as listas públicas `alertas/conteudo.json` (notícias e resenhas, `tools/alertas_site.py`) e
   `black/alertas.json` (robô do Black).
3. **Caminho principal:** o cron de um minuto do worker (`worker/src/push.js`) lê as listas, cria o lote de cada tema
   novo e manda um push vazio para cada aparelho inscrito naquele tema. O service worker (`sw-black.js`) acorda,
   busca `/v1/push/ultimos?ep=` e mostra a notificação.
4. **Nova tentativa (dentro do worker):** alerta que o aparelho não buscou em 5 minutos ganha outro push (até 3),
   se o envio falhou ou se o aparelho já roda o service worker novo.
5. **Plano B (fora da Cloudflare):** o workflow `notificacoes.yml` roda a cada publicação das listas e a cada 15 min.
   Se o cron não processou um alerta novo, chama `/v1/push/rodar`; se nem assim, falha e o GitHub manda e-mail.

## Por que não duplica
- alerta com id fixo; entrega por aparelho com chave única: só a rodada que criou a entrega manda o push;
- cabeçalho `Topic`: o serviço de push troca um aviso não entregue pelo mais novo;
- `/ultimos` só devolve o que ainda não foi mostrado; repetido volta com a mesma tag e substitui em silêncio;
- `/rodar` tem trava de 40 s; o plano B nunca manda push sozinho.

## Diagnóstico de 04/11/2026
- 3 aparelhos inscritos: 2 Android só com o tema Black (inscritos pela página do Black ou antes do sininho existir),
  1 iPhone com todos os temas. As notícias de 04/11 (10h08 UTC) foram enviadas só ao iPhone: os Android não tinham
  Notícias marcado e nada avisava isso.
- A edição tinha 6 notas, mas o `/ultimos` mostrava no máximo 4 e marcava as 6 como vistas (2 sumiam).
- Sem nova tentativa, sem registro de erro e sem vigia: um envio que falhasse se perdia em silêncio.
- O passo que cria o lote não era atômico (uma queda no meio pulava o lote para sempre).

## Como conferir
- `curl -A teste https://api.eliteboardgamers.com.br/v1/push/saude`: última rodada, onde cada tema parou, fila,
  entregas pendentes e inscritos por tema.
- Testes: `node --test worker/test/push.test.mjs`.
- Publicar mudanças do worker: `python3 tools/black/instalar_push.py` (aplica as colunas novas no D1 antes do deploy).
