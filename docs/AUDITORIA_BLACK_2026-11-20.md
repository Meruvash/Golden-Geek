# Auditoria do Radar Black de Verdade (20/11/2026)

## Resumo
O radar estava mostrando preços velhos porque dois dos três robôs não conseguiam publicar, e um deles visitava as
lojas a cada minuto, o que fez lojas e o Compara Jogos bloquearem o robô. As três falhas foram corrigidas e estão na
`main`. Foi criado o vigia de PlayStation 5 abaixo de R$ 3.000.

## Falhas encontradas e corrigidas

| # | Falha | Efeito | Correção |
|---|-------|--------|----------|
| 1 | O Compara Jogos passou a listar a Shopee com link curto de afiliado (`s.shopee.com.br`). O robô não reconhecia o formato. | A trava de "link de afiliado de terceiros" descartava a publicação inteira. O robô normal ficou sem publicar desde 17/11 e o educado de 17/11 até 20/11 de manhã. | O robô usa a mesma regra da trava e tira o link na leitura (`tools/black/radar.py`). |
| 2 | O `ciclo.sh` do robô educado saía depois de um ciclo e disparava o próximo trabalho na hora. | Visita às lojas a cada minuto, e não a cada 3 horas: cerca de 150 commits em 12 horas. Lojas bloqueadas passaram de 6 para 27, e o Compara Jogos passou a responder 429. | O trabalho espera o resto do intervalo de 3 horas antes de disparar o próximo (`tools/black/ciclo.sh`). |
| 3 | Não havia limite de idade do preço. | Havia oferta no ar com preço visto há 9 dias (Azul: Mestre Chocolatier) e há 13 dias (Harry Potter: Batalha de Hogwarts). | Preço visto há mais de 4 dias sai do radar (`PRECO_MAX_HORAS`). |

## Qualidade das ofertas (leitura de 20/11, antes das correções)
- 50 jogos bem avaliados (nota 7 ou mais no BGG, ou premiados), com desconto real mediano de 27% sobre a média aparada
  de até 180 dias. 15 deles estão no menor preço do período. O critério é honesto.
- 3 descontos de mentira sinalizados, todos da Board Game Play Store.
- 69 de 75 ofertas principais tinham preço visto há mais de 24 horas (mediana de 61 horas), efeito da falha 1.
- Em 19 de 47 jogos, a economia é menor que R$ 30, e há itens como Altered a R$ 9,99. Sugestão editorial:
  destacar pela economia em reais ou criar um preço mínimo para o destaque.

## O que depende de você (secrets do GitHub)
- `NTFY_TOKEN`: o serviço de avisos ntfy recusa com erro 401. Nenhum alerta chega ao celular, nem os de pane, nem o
  do PS5.
- `KEEPA_KEY` vazio: a Amazon está fora do radar.
- `TELEGRAM_SESSAO`, `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CANAL` vazios: os canais do Telegram e o canal de alertas estão
  desligados.
- Lojas bloqueadas: com o robô de volta ao ritmo de 3 horas, os bloqueios de 48 horas devem vencer sozinhos. Se alguma
  continuar bloqueada, vale falar com a loja.

## PlayStation 5
Em 20/11/2026 não havia PS5 novo abaixo de R$ 3.000 em loja confiável. A Sony subiu o preço sugerido em 2026:
Digital a R$ 4.599,99, com leitor a R$ 5.099,99 e Pro a R$ 7.499,99.

Melhores preços encontrados:
- Amazon, Slim Digital com 2 jogos, cerca de R$ 3.999,90. Dado de buscador e agregador, sem conferência na página,
  porque a Amazon bloqueia leitura automática.
- Carrefour, Slim Digital com 2 jogos, R$ 4.599 no Pix. Conferido na página da loja.
- KaBuM!, Slim Digital com 2 jogos, R$ 4.649,07 no Pix. Conferido na página da loja.

Abaixo de R$ 3.000, só pegadinha: a TIM anuncia R$ 2.376, mas exige dar um PS4 usado e contratar plano com
fidelidade.

O que ficou automático:
- O robô do Mercado Livre busca console PS5 novo pela API oficial, só de loja oficial ou MercadoLíder, a cada ciclo.
- Usado, recondicionado, acessório e jogo avulso ficam fora.
- Abaixo de R$ 3.000, a oferta aparece na seção "PlayStation 5 abaixo de R$ 3.000" da página `/black/` e manda alerta,
  que depende do `NTFY_TOKEN`.
- Achado de outra loja entra a mão em `conteudo/black/ps5.json`, no campo `manuais`, com modelo, loja, preço, link
  direto e hora da conferência.
