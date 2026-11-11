# Padrão editorial da Elite Boardgamers

Arquivo comum, lido por todas as rotinas. As partes de cada tipo de conteúdo ficam em arquivos separados, para cada rotina ler só o que usa (11/11/2026, economia de tokens):

- Resenhas (texto do site, selo, fotos oficiais e crivo das fotos): `docs/padrao/resenhas.md`
- Como Jogar: `docs/padrao/como-jogar.md`
- Infográficos (desligados desde 28/10/2026): `docs/padrao/infograficos.md`

## Texto de gente, não de fórmula (vale para tudo)

**Texto de gente, não de fórmula** (vale para resenhas e notícias). Sem muletas e adjetivos vazios ("vale a pena", "para quem gosta de", "ideal para", "jornada", "envolvente", "promete", "não é só X, é Y"): troque por um detalhe concreto (quanto tempo, quantas peças, qual jogo parecido, o que acontece na mesa). Varie a abertura das frases e dos itens de lista. Opinião com posição clara. A lista fica em `tools/vicios.py`; `checar_roteiro.py` e `checar_noticia.py` avisam (sem bloquear) e o aviso deve ser resolvido antes de publicar. Nunca use ferramenta de "humanizar" texto: ela troca palavras sem critério e cria erro.

## Nada inventado (vale para tudo)

Todo número, nome, data e preço tem fonte com link; o que não foi confirmado fica fora ou aparece como "não confirmado nas fontes consultadas". Fato tem fonte, opinião tem dono.

## Opinião forte (29/10/2026)

**Obrigatório em todas as resenhas e todas as notícias novas desde 30/10/2026** (pedido do usuário: o modo foi testado e aprovado). Não existe mais tom neutro nas partes de opinião; o que muda de um texto para outro é a técnica, nunca a presença do tom.

Pedido do usuário: a resenha precisa gerar reação e compartilhamento. O tom das partes de opinião é **inteligente, sarcástico, ácido e engraçado**, com a estrutura de stand-up de Ricky Gervais (mapa abaixo). Modelo aprovado: `conteudo/vantage.json` ("um jogo para seis pessoas que querem ficar sozinhas"). Referências: Berger e Milkman (emoção de alta ativação se compartilha), *Contágio* (STEPPS), *Ideias que colam* (o inesperado), *Breakthrough Advertising* (ângulo novo para um público que já viu tudo), *Save the Cat* (logline).

**Onde vai o tom:** `titulo_html`, `tagline`, `lede` (a partir da segunda frase), `experiencia`, títulos e textos de `atencao`, `para_quem` / `nao_e_para`, `veredito` e `legenda`. **Onde não vai:** `como_funciona`, `passos`, ficha, prêmios, edição nacional e fontes, que continuam neutros e exatos.

1. **Uma tese por resenha.** Uma frase que o leitor possa repetir ou contestar, de preferência contra o consenso ("superestimado", "solo que finge ser para seis"). Ela aparece no título ou na tagline, abre o veredito e a legenda.
2. **O sarcasmo nasce do fato.** A graça vem do contraste entre o que a caixa promete e o que a crítica e as regras mostram (até seis jogadores × "não passe de três"; oito anos de desenvolvimento × recomeçar do zero). Todo número e toda crítica citada continuam com fonte.
3. **Alvo certo.** Ironia contra o jogo, o preço, o marketing, a edição e as decisões da editora. Nunca contra pessoas, autores, editoras como empresa, lojistas ou quem gosta do jogo.
4. **Justiça na mesma página.** A resenha ácida reconhece o que o jogo faz bem em `funciona`, com o mesmo cuidado. O selo segue as regras de sempre: o tom não muda o selo, e opinião forte não é desculpa para "Não recomendado".
5. **Frase pronta para compartilhar.** Pelo menos uma frase curta e citável no veredito (capital social: o leitor compartilha para parecer entendido), e a legenda fecha com uma pergunta que provoque resposta.
6. **Inteligente, não grosseiro.** Nada de palavrão, xingamento ou deboche fácil. Comparações concretas e inesperadas ("reunião de condomínio", "peça de ficção") funcionam melhor que adjetivos.
7. **Nada inventado para causar.** Se a pesquisa não sustenta a polêmica, o tom fica firme mas sem a tese contrária. A opinião é da Elite Boardgamers e precisa ser defensável.
8. **Voz: "a gente".** Tom de conversa, mas a voz é do site: "a gente", nunca "eu". Nunca cite o nome de Gervais nem de outro humorista no texto; é só a estrutura.
9. **Nada de muleta.** A mesma piada no máximo uma vez por resenha; o preço entra no máximo três vezes nas partes de opinião (além do item de preço). Bordões de uma resenha não se repetem na seguinte: "Olha", "Isso não é uma crítica. Bom, é um pouco", "Ou outros amigos" e similares valem uma vez e depois saem do repertório. Repita as técnicas, não as frases.
10. **Sem palavrão e sem alvo vulnerável.** Gervais xinga e às vezes mira em grupos de pessoas; aqui não. Nada de piada com doença, deficiência, aparência, origem ou religião.

**Mapa do estilo (Ricky Gervais: monólogos do Globo de Ouro e especiais *Humanity*, *SuperNature* e *Armageddon*)**

1. **A verdade que ninguém fala em voz alta.** O que todo mundo pensa e o marketing esconde ("a caixa diz seis, a crítica diz três").
2. **Abertura de confissão.** "Vamos ser honestos", "olha": tom de conversa antes da faca.
3. **Frases curtas, em sequência.** Uma ideia por frase. A piada vem na última.
4. **O recuo que não recua.** Finge pedir desculpa e reforça o ataque ("Isso não é uma crítica. Bom, é um pouco.").
5. **Lógica até o absurdo.** Seguir o raciocínio com cara séria até o ridículo ("oito anos fazendo um jogo para uma pessoa e depois imprimiu seis na caixa").
6. **Ataque para cima.** O alvo é o poderoso: o jogo premiado, a editora, o marketing, o preço. Nunca o leitor.
7. **Elogio sincero no meio do ataque.** Reconhecer o mérito deixa a crítica mais crível e mais cruel.
8. **A vida real como contraponto.** "São onze e meia da noite e você trabalha amanhã"; "você já faz isso de graça no grupo da família".
9. **Final que vira de lado.** Parece conselho e termina em soco.
10. **Autoironia do próprio público.** Nós, que pagamos caro por papelão, também entramos na piada.

Outras referências de tom, para variar a técnica: Roger Ebert (a demolição elegante), A. A. Gill e Jay Rayner (o detalhe concreto e a comparação absurda), Charlie Brooker (o exagero que escala), Jeremy Clarkson (a comparação doméstica e o deadpan), Ben "Yahtzee" Croshaw e Quinns, do Shut Up & Sit Down (humor sobre o próprio hobby), Dorothy Parker (a frase curta e letal), José Simão, Stanislaw Ponte Preta e Millôr Fernandes (o humor brasileiro).


# Padrão editorial das notícias (v1)

A notícia da Elite Boardgamers não repete o release: diz o que aconteceu, por que importa para quem joga no Brasil, o que a crítica acha e o que a gente recomenda. Herda do padrão das resenhas a regra de ouro: **fato tem fonte, opinião tem dono**. Conferido por `tools/noticias/checar_noticia.py`; `tools/build_home.py` não publica nota que não passa.

| Campo (em `conteudo/noticias/<data>-<assunto>.json`) | Seção da página | Regra |
|---|---|---|
| `titulo` | título | 8 a 16 palavras: o fato e quem, sem caça-clique. |
| `selo` | selo da nota | Um de: **Vale a compra**, **Vale acompanhar**, **Para fãs do jogo base**, **Com ressalvas**, **Informativo**. |
| `lide` | abertura | 35 a 70 palavras: o fato, quando, onde e a ligação com o Brasil. |
| `por_que_importa` | Por que importa | 30 a 70 palavras de **análise nossa**, assinada pela Elite Boardgamers: o que a notícia muda para o leitor. |
| `numeros` | Em números | 2 a 4 itens `[valor, rótulo, fonte]`. Só número com fonte; preço sempre com data. |
| `corpo` | Contexto | 1 a 3 parágrafos, 40 a 200 palavras: o que o leitor precisa saber para entender. |
| `no_brasil` | No Brasil | 25 a 80 palavras: editora nacional, preço com data, disponibilidade, ou a falta de edição nacional. |
| `critica` | O que diz a crítica | 1 a 3 itens `{fonte, texto, citacao}`; vazio só em nota **Informativo** sem resenha publicada, e a página avisa isso. `citacao: true` só para frase literal traduzida ("tradução livre"); senão é paráfrase atribuída ("Para a Board Game Quest, …"). |
| `para_quem` / `nao_e_para` | Interessa a você se… / Pense duas vezes se… | 1 a 3 itens cada (`nao_e_para` pode ficar vazio em nota informativa). |
| `veredito` | Nossa opinião | 20 a 60 palavras: conselho claro (comprar, esperar, acompanhar) e o porquê. |
| `fontes` | Fontes | pelo menos 2, com link e data da consulta. |
| `crivo` | Por que esta notícia entrou | pontos e critérios do crivo (PLANO_NOTICIAS.md). No mínimo 5 notas por dia e sem máximo; a pontuação ordena as notas e escolhe a manchete (PLANO_NOTICIAS.md, "Edição diária"). |
| `publicado_em` | (ordem das Últimas notícias) | Hora de publicação, ISO 8601. Preenchido por `tools/build_home.py` (commit que criou o arquivo ou a hora da geração); não se escreve à mão. A lista da página inicial segue esta hora, e a geração para se uma nota mais nova ficar fora dela. |
| `verificacao_nacional` | (não aparece na página) | Obrigatório quando a nota diz que um jogo não tem edição nacional, e recomendado para todo jogo citado: `[{jogo, resultado, data, fontes, obs}]`, com `resultado` "edição nacional" ou "não encontrada" e pelo menos 2 fontes com link, uma brasileira. "Não encontrada" exige o link do ComparaJogos. Ver regra 6. |

Regras de texto:

- **Ludopedia só nas fontes** (29/10/2026): o texto da nota não cita a Ludopedia. Lançamento, pré-venda e data prevista se atribuem ao **nosso calendário de lançamentos** (/lancamentos/, que usa os dados dela), e a Ludopedia aparece só na lista de fontes, no campo `fonte` dos números e no crédito da capa ("Capa via Ludopedia"). `checar_noticia.py` recusa a nota que citar a Ludopedia no texto.
- **Loja não aparece no texto** (29/10/2026): nome de loja de varejo (TabuleRIO, Amazon etc.) seria publicidade de graça. No texto, escreva "em loja parceira", "em lojas brasileiras" ou "a partir de R$ X, segundo o ComparaJogos"; a loja vai só nas `fontes` e na fonte dos números. A loja da própria editora pode ser citada ("loja oficial da Ludofun"). `checar_noticia.py` recusa as lojas da lista `LOJAS`.
- **Opinião forte nas notícias** (29/10/2026; obrigatório em toda notícia desde 30/10/2026): o tom da seção "Opinião forte" (inteligente, sarcástico, ácido e engraçado, voz "a gente") vale só em `por_que_importa`, `para_quem`, `nao_e_para` e `veredito`. Título, lide, números, contexto, no Brasil (no máximo uma frase seca no fim) e crítica continuam informativos e neutros: notícia é fato. O título pode ter graça, desde que tudo nele seja fato e diga o que aconteceu, com quem (nada de caça-clique). As mesmas regras da resenha valem aqui: sarcasmo nascido do fato, alvo no jogo, no preço e nas decisões, nunca em pessoas, e sem repetir os bordões da resenha do mesmo jogo. Modelo: `conteudo/noticias/2026-10-28-vantage-chega-ao-brasil.json`.

1. **Opinião ancorada.** O veredito se apoia nas nossas resenhas (quando o jogo tem) e na crítica citada; nunca em impressão solta.
2. **Brasil primeiro.** Toda nota responde: dá para comprar aqui, por quanto e de quem? Se não dá, diz isso.
3. **Sem citação inventada.** Frase entre aspas só se a frase original existe; o resto é paráfrase com dono.
4. **Previsão é previsão.** Data de lançamento é "prevista" até o jogo chegar às lojas.
5. **Crítica dividida aparece dividida.** Se as resenhas discordam, mostre os dois lados.
6. **Edição nacional: verificação obrigatória.** Ausência de notícia de lançamento não prova que o jogo não saiu no Brasil; foi assim que erramos Galactic Cruise (Jelly Monster, nov/2025), Rebirth e Hot Streak. Antes de escrever que um jogo não tem edição nacional, faça os três passos e registre em `verificacao_nacional`:
   1. `python3 tools/noticias/edicao_nacional.py "<nome do jogo>"`: consulta o ComparaJogos. Oferta de jogo novo em loja brasileira (fora Amazon e marketplaces) é sinal forte de edição nacional: abra a página da loja e confira editora e idioma.
   2. Página do jogo na Ludopedia (campo de edição nacional e "No Brasil").
   3. Busca na web em modo estendido, em português e pensando em loja: "<nome> jogo português loja brasileira", "<nome> editora nacional". A busca comum não alcança lojas brasileiras.

   Só então, e só se nada aparecer, escreva o que foi verificado e até quando: "não encontramos edição nacional até <data>". Nunca "não há", "não tem", "ainda não há" ou "sem edição nacional": o verificador recusa essas frases. Se um jogo tem edição nacional, diga a editora, o mês de lançamento e a fonte.

# Chamadas para redes (WhatsApp, Telegram, Instagram)

Pedido do usuário em 29/10/2026: chamada com emoção, que faça clicar e comentar. Ficam em `conteudo/chamadas.json`
(`{"<slug>": {"chamada": "...", "pergunta": "..."}}`), fora da página, e `tools/divulgacao.py` usa no pacote do dia.

- **Chamada** (até 120 caracteres, 1 emoji no fim): pode usar curiosidade ("mas um deles já atrasou"), contraste ("R$ 118 ou R$ 422,99?"), opinião forte, a dor do leitor ("a caixa assusta?"), número ou prêmio real e urgência real (pré-venda aberta, prazo de campanha).
- **Pergunta** para puxar comentário: fácil de responder em uma palavra ou escolha ("Looot ou Through the Desert?", "pé embaixo ou freio?"), sobre o gosto do leitor, nunca prova de conhecimento.
- **A regra que não se quebra:** a página precisa entregar o que a chamada promete. Todo número, prêmio, preço ou data da chamada está no texto publicado. Proibido: fato inventado, urgência falsa, "você não vai acreditar", "chocante", CAIXA ALTA, mistério sobre algo que o texto não revela. Clickbait enganoso derruba a distribuição no Google Discover e no Facebook e queima a confiança do grupo.
