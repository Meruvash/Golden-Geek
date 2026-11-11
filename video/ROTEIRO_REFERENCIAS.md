# Referências de roteiro e direção para as animações

Regras tiradas de skills abertas (MIT e Apache 2.0) que destilam explainers que funcionam.
Lidas em 10/11/2026; só a documentação, nenhum código executado. Complementa o `PADRAO_VIDEO.md`.

- **Vox Director** (github.com/Alisa0808/vox-director, `references/beat-layer.md`): arcos narrativos, ganchos, ritmo.
- **Huashu Art Motion** (github.com/alchaincyf/huashu-art-motion, `references/09-视频动画语法.md`): "gramáticas" de explicação e regras de câmera.
- **Bang Motion** (github.com/bangtutorial/bang-motion, `references/explainer.md`, `kartun-panggung.md`, `anti-ppt.md`): cena que acumula, desenho de palco, anti-PPT.

Princípio comum às três: **das referências, copie o ritmo, nunca a pele** (paleta, fontes, layout, frases).

## 1. Escolha um arco antes de escrever

| Arco | Quando usar | Forma |
|---|---|---|
| `man_in_hole` (o mais bem avaliado) | personagem que se ferra e sai melhor | está bem → cai → afunda → sai do buraco → melhor que antes |
| `hook_payoff` (o mais seguro) | uma ideia só | gancho → contexto → construção → recompensa → arremate |
| `myth_buster` | corrigir um erro comum de regra | o fato → o mito → por que está errado → o certo → CTA |
| `how_it_works` | explicar um sistema (turno, combate) | gancho → o que é → 2–3 passos mostrados → benefício → CTA |
| `three_act` | qualquer narrativa de 60 s | preparação → confronto crescente → resolução |
| `story_spine` | origem de personagem | era uma vez… → todo dia… → até que um dia… → por isso… → até que enfim… → desde então… |
| `listicle` | "3 erros que todo iniciante comete" | promessa → item → item → #1 → recapitulação |

Nossa série "E se você acordasse dentro de…" é `man_in_hole` com miolo `how_it_works`: o personagem se ferra por não saber a regra e a regra o tira do buraco.

## 2. Gancho, ritmo e duração

- **Gancho em até 3 s**: cerca de 65% decide nesse tempo. A cena 1 já carrega a promessa; nunca gaste a cena 1 com preparação.
- Tipos de gancho: erro apontado · dor · número surpreendente · pergunta direta · alerta · segredo revelado · experimento · quebra de padrão · prévia do resultado.
- **Batidas** (cada uma ≈ uma frase de narração com um evento visual):

  | Duração | Batidas | Palavras de narração |
  |---|---|---|
  | 30 s | 6–8 (4–5 s cada) | ~75 |
  | 60 s | 10–12 (5–6 s cada) | ~130–150 |

- **Proporção**: gancho 1–3 s · corpo 70–80% · recompensa 10–20% · CTA 0–2 s.
- **Algo muda na tela a cada 3–5 s**; nada fica parado mais de 8 s.
- **Finais**: corte seco na recompensa (gera replay) · CTA rápido (≤ 2 s, 3–5 palavras) · loop (a última frase espelha a primeira).

## 3. Gramática por trecho (não misturar dentro do mesmo trecho)

| O trecho está… | Gramática | Como fica |
|---|---|---|
| contando a piada / a trapalhada do personagem | **storytime** | pose troca em 0,1 s e congela; a piada vem num corte para close de reação, em silêncio; plano médio de ~2,4 s |
| explicando um raciocínio / uma regra passo a passo | **quadro-negro** | "fala uma frase, escreve uma frase"; a câmera acompanha no quadro e no fim abre para mostrar tudo |
| explicando escala ou mecanismo ("o que tem dentro") | **Kurzgesagt** | o conceito vira um objeto; a câmera mergulha entre escalas |
| números, pontuação, comparação | **gráfico** | primeiro o eixo, depois o dado cresce, por último um único destaque; número honesto |
| lista de itens / frase de efeito | **texto animado** | a palavra-chave entra batendo no acento da fala; um foco só |

## 4. Regras de direção que valem sempre

1. **Um foco por tela**: só uma coisa entra por vez; o resto parado. Palavra principal no mínimo 3× maior que a de apoio.
2. **Entra devagar, sai rápido, e para**: entrada 0,3–0,4 s, saída ~0,18 s; número parado ≥ 0,5 s depois de cair; depois da piada, congela ≥ 0,9 s.
3. **A câmera só se mexe num evento**: aproximação suave de 0,6–1,5 s para mudar o olhar; aproximação rápida (0,28 s) ou "pancada" (0,17 s) só em revelação, virada ou número-chave. Entrou, sai ou vai para o lado; nunca três aproximações seguidas. **Nunca o mesmo movimento em duas batidas vizinhas**; o plano parado fica reservado para a recompensa.
4. **Número e palavra grande ficam dentro do mundo** (quadro-negro, tela, placa, peça do jogo), não num quadro de texto solto por cima: isso lê como "slide de PPT".
5. **A cena acumula**: cada frase acrescenta um elemento e os anteriores ficam. A cena fecha com 3–5 elementos que juntos explicam (sujeito + prova + escala + rótulo).
6. **Cenário vivo**: cada palco tem 10 ou mais coisas se mexendo com sentido (luzes, ponteiros, fumaça, partículas).
7. **Personagem grande**: 55–65% da altura do quadro no close e 35% no plano aberto; nunca miniatura.
8. **Cor = conceito**, no máximo 3–4 cores com significado.
9. **Transição na respiração ou na troca de assunto**, nunca no meio da frase. Variar o tipo de transição.
10. **O primeiro evento é visual**, não um título. Texto na tela tem no máximo 14 caracteres por bloco; a fala inteira vai na legenda. Menos da metade dos eventos é texto.
11. **Revisar a lógica e os números**, não só se está bonito ("subiu 8,7 vezes" ≠ "subiu para 8,7 vezes").

## 4b. História e comédia (Anidoodle)

Fonte: github.com/alexgreensh/anidoodle (Apache 2.0), `references/storytelling.md`. Cada regra veio de um erro real no filme de exemplo do projeto.

**O que todo filme precisa, mesmo com 60 s:**
- **Uma transformação que cabe em duas palavras com uma seta.** Ex.: "perdido → mestre". Se a ideia é uma lista ("e aí mostramos a regra X"), ainda não é história.
- **Gancho nos primeiros 3 s**, que planta uma pergunta. Nada de logo, tela parada ou "apresentação".
- **Uma virada que dá para apontar na linha do tempo**, causada por algo **dentro do mundo** do filme (não por um corte de narrador).
- **Escalada física**: o mundo cresce porque o personagem cresce (a câmera abre conforme ele avança).
- **Um objeto-símbolo que volta mudado**: aparece cedo, nunca é explicado e volta pequeno no fim. O público descobre sozinho, e esse é o prêmio.
- **Um defeito que se cura**: uma imperfeição armada no começo e paga no fim vale mais que qualquer polimento.
- **Resolver e dar espaço**: termina no tempo forte e deixa uns segundos para ler. Nunca termina em cima do último evento.

**Testes antes de produzir:** contar em 3 frases; dizer em que quadro está a virada; nomear o objeto-símbolo e os dois quadros onde ele aparece; para cada plano perguntar "o que mudou para o personagem?" (se a resposta for "só o visual", o plano sai); cada elemento na tela tem um motivo de uma linha.

**Nada de ar morto:** algo visível se mexe em todo segundo, desde o quadro 0.

**Roteiro como ação, não como fato:** cada linha do storyboard diz o que **se move** e no que vira, e o que **carrega** da linha anterior (um objeto, uma forma, a câmera). Duas linhas seguidas que não carregam nada são dois slides. Diga cada coisa uma vez só; um número repetido é um fato contado duas vezes.

**Comédia:**
- **Dor primeiro, piada depois**: liste as dores reais de quem joga (o manual de 40 páginas, a regra esquecida, o amigo que explica tudo errado) e escreva uma piada por dor. Substantivos específicos ganham de piada genérica.
- **A piada mira a situação ou o hábito, nunca uma pessoa real nem o jogo.** Nossos personagens são pessoas da comunidade: a graça vem do que eles fazem, nunca de quem eles são.
- **Variar o tipo de piada**, com pelo menos 4: verbal, trocadilho visual, interação, física (pastelão), estrutural (texto que se corrige sozinho, cadeira vazia). Nenhum tipo passa de 60% das piadas.
- **Cada piada tem uma linha "quem ri e por quê"**; se precisar explicar, sai ou é reescrita.
- **O personagem mantém a "voz visual"**: uma fala dele sempre aparece com a mesma cara (cor de legenda, balão, pose).

## 4c. Série interativa: o caso @saveo.house ("Every Dollar Leaves a Trail")

Analisado em 10/11/2026 pelas legendas e números públicos de 12 Reels (o vídeo em si o Instagram não deixou baixar).
Perfil com ~239 mil seguidores. A Parte 1 fez **16 milhões de visualizações e 12.900 comentários**; o Dia 7, 1,6 milhão; o Dia 8, 852 mil e 2.582 comentários.

**O que eles fazem:**
1. **Você é o protagonista**, na segunda pessoa: "Você acabou de roubar 10 milhões." (a nossa "E se você acordasse dentro de…" é a mesma ideia).
2. **Gancho com número concreto e prazo**: "24 milhões em dinheiro. Pesa 240 quilos. Em 90 segundos a gaiola tranca."
3. **O episódio termina numa escolha de 2 ou 3 opções**, cada uma com **preço claro** ("PAGAR: ela te leva até o guarda. Você perde 4 milhões."), e o público **comenta uma palavra só**. "A maioria escreve a Parte 9." Comentários em massa empurram o vídeo no algoritmo.
4. **Prova social dentro da história**: "1.355 de vocês acertaram o nome dele", "61% de vocês pouparam o Dre".
5. **Série diária** (Dia 1…9), com finale, recapitulação e temporada 2 anunciada com data.
6. **Personagem recorrente com perfil próprio** (o primo Dre tem conta, @cousin.dre) e **membros da comunidade creditados** ("Fundadores no placar: @…").
7. **Tudo leva ao site**: cada escolha fica salva na "ficha" do espectador no site, com placar, ranking e prêmios. É um funil de tráfego.
8. **Alerta**: a temporada 2 caiu para 100–250 mil por episódio; a novidade cansa. Gancho novo a cada temporada.

**Como aplicar aos nossos jogos ("Você decide a jogada"):**
- O personagem (Ronaldo, Lukita…) para diante de uma decisão do jogo e o vídeo termina com **"Comenta LANÇAR ou RETORNAR"**.
- O episódio seguinte mostra a consequência, **e a consequência é a regra de verdade**: o público aprende pela escolha que fez.
- Cada opção mostra o custo em termos do jogo (pontos, recursos, risco de batalha).
- No episódio seguinte, a prova social: "68% de vocês mandaram ele para a nebulosa…".
- Link para o tutorial do site como a "ficha" do jogador.

## 4d. Mapa de batidas ASSISTIDO do @saveo.house (Partes 4, 5 e 8, assistidas em 10/11/2026)

Vídeos enviados pelo editor, vistos com `/watch` (folhas de contato a cada 3 s) e transcritos palavra por palavra.
Este é o molde. O roteiro novo é escrito **batida por batida contra esta tabela**, não "inspirado" nela.

**Números medidos:** 97 s, 108 s e 178 s. Fala a ~2,7 palavras/s, frases de 2 a 8 palavras ("You swung hard." / "Nothing." / "Too far.").
**Um plano novo a cada ~2,5 s** (cerca de 35 imagens diferentes em 95 s). Não existe "palco" parado por 15 s.

| # | Batida | Tempo (P4 / P5 / P8) | O que acontece | Exemplo real |
|---|---|---|---|---|
| 1 | **Gancho na 2ª pessoa com número** | 0–5 s | Você + valor + conflito em 2 frases. Na P5 e P8, um **título grande em 2 cores** no topo (branco + magenta) | "You stole $10 million. Your cousin wants half or he talks." / título "SHE MAKES PEOPLE **DISAPPEAR**." |
| 2 | **Recap pelo voto do público** | 5–10 s | A escolha da parte anterior, em %, vira o motor da cena | "88% of you said no, so he went for the bags." / cartão "THE COMMENTS DECIDE · DAY 1 HIDE 61% · DAY 2 PAY 59%" |
| 3 | **Ação em frases curtas** | 10–25 s | Consequência física, um plano por frase, câmera colada na ação | "You swung hard. He came back harder." |
| 4 | **Semente de mistério** | 23–38 s | Um detalhe visto "por um segundo" que liga a uma parte antiga | "for one second, you saw the plate… same car that was parked outside Dre's place" |
| 5 | **Silêncio e escolha forçada** | 38–50 s | Tentativas que falham, decisão seca | "You called him. Nothing. You called again. So you did the only thing left." |
| 6 | **Carimbo de hora + fala citada** | 54–65 s | Relógio na tela ("5:40 AM"), fala de outro personagem entre aspas, piada seca | "Morning, Dre. Nice eyebrow. Where's your chain?" |
| 7 | **"O que você não sabe"** | 65–75 s | A virada: informação que o público não tinha | "And here's what Dre doesn't know. Police are allowed to lie to him." |
| 8 | **Cartão "ISSO É REAL"** | 75–80 s | Papel creme sobre fundo escuro, fato do mundo real, carimbo magenta (ALLOWED / REAL) + lista "PERSONS OF INTEREST" com @ dos comentaristas | "The Supreme Court allowed exactly that…" / "In Japan, they're called night movers." |
| 9 | **Escolha com preço claro** | 80–90 s | "Se você acha X, faça A. Se acha Y, faça B." Botões grandes com subtítulo do custo | "If you think he talks, run right now. If you think he lies, stay." RUN *if he talks* / STAY *if he lies* |
| 10 | **CTA de comentário + compartilhamento** | 88–97 s | Uma palavra no comentário; segundo voto do outro personagem na conta dele; "A maioria escreve a Parte N"; "manda para o primo que você levaria" | Tela final com 2 cartões: "YOUR VOTE RUN or STAY / DRE'S VOTE TALK or LIE · Together they write Part 5." |

**Elementos fixos de tela (sempre visíveis):**
- **Painel de estado no topo** (CASH / BANKED / SUSPICION %), que muda na hora do evento (o número cai, a barra sobe). É a "ficha" do jogo.
- **Legenda palavra por palavra** no terço de baixo, uma linha, palavra dita em branco e as seguintes em cinza.
- **Rótulos pequenos em monoespaçada** ("THE FIXER", "DRE VOTES → @cousin.dre", "5:40 AM", "CAM 03 · LIVE").
- **Paleta**: cenas pintadas escuras e iluminadas por uma fonte motivada (farol, lanterna, abajur, néon) + um único acento magenta para a interface.

**Desenho:** personagens **simples** (cabeça branca em forma de feijão, olhos de ponto, sobrancelha que atua, contorno grosso de nanquim, membros de borracha) dentro de **cenários ricos**: luz volumétrica, chuva, poeira, reflexo no chão molhado, objetos em close (corrente, celular, formulário). A qualidade está **no cenário, na luz e no número de planos**, não num personagem complicado.

**O que fizemos errado na primeira "O Assalto do Wan"** (para não repetir): 5 palcos em 63 s (um a cada 12 s, a referência troca a cada 2,5 s); sem painel de estado; sem recap pelo voto; sem "o que você não sabe"; sem cartão "isso é real"; escolha sem preço escrito; personagem complexo e cenário pobre (o contrário da referência).

## 4e. Mapa ASSISTIDO de um microdrama ("Maid for My Nemesis", estilo ReelShort, 3:58, assistido em 11/11/2026)

Vídeo enviado pelo editor, visto em folha de contato (1 quadro a cada 4 s) e transcrito.

| Tempo | Batida | O que faz pela retenção |
|---|---|---|
| 0:00–0:15 | **Abertura no clímax** (flash-forward): a frase mais forte ("I'd rather die than work for you") + o choque final ("Meu inimigo é o meu chefe?") antes de qualquer contexto | O espectador já sabe AONDE vai dar e fica para ver COMO |
| 0:15–0:30 | Volta no tempo: confronto com insulto específico ("vendendo o corpo pra comprar bolsa que o papai não paga?") | Conflito em 10 s, sem apresentação |
| 0:28–0:48 | **Monólogo interior** revela o motivo escondido ("ele não sabe o que eu faço pra manter meu pai vivo") + o inimigo nota uma lágrima | Simpatia: o público toma partido |
| 0:50–0:58 | A frase do início volta no lugar certo ("Prefiro morrer…") | **Callback**: recompensa por ter assistido desde o começo |
| 1:00–1:10 | **Ironia dramática**: o rival repete a frase dela com deboche e manda fazer "uma oferta que ela não pode recusar". O público sabe, ela não | Toda cena seguinte fica tensa porque o público sabe mais que ela |
| 1:12–1:25 | Motivo visual (pai no hospital, monitor cardíaco) | Aposta concreta |
| 1:25–2:00 | A armadilha chega como oportunidade, com número exato ("$2.000 por semana") | Número concreto = aposta real |
| 2:00–3:30 | Lista de regras absurdamente específicas ("lanche doce às 16h em ponto", "café meio creme, meio açúcar, até 10 min depois de acordar") + **pistas** ("mimado, chato, exigente… igual ao Lucas Bennett") | Humor por detalhe e suspense por pista: o público grita "é ele!" |
| 3:30–3:52 | Revelação: a mesma cena da abertura, agora com contexto | Fecha o laço aberto em 0:00 |
| 3:52–3:58 | **Frase de efeito** do vilão ("Parece que você é a minha nova empregada, Madame Presidente") e corte seco | Termina num pico, com uma pergunta nova |

**Técnica de tela:** troca de plano a cada ~4 s (mais lento que o saveo.house, porque é diálogo); um rosto por plano em close; plano de reação depois de cada fala forte; título da série como marca-d'água fixa; legenda curta (1 linha); música dramática só nas viradas e silêncio antes da revelação.

**O que serve para nós:**
1. Abrir no clímax e repetir a mesma frase no fim (laço aberto/fechado).
2. Ironia dramática: uma cena que o "você" da história não vê, mas o público vê.
3. Monólogo interior de um personagem revelando o motivo escondido (cria lado e comentário).
4. Callback de frase: a fala do começo volta com outro sentido.
5. Pistas plantadas que o público decifra antes do protagonista.
6. Detalhe específico e engraçado no lugar de descrição genérica.
7. Frase de efeito no último segundo, depois da revelação, e corte seco.

## 5. Desenho (Claude Drawing)

Fonte: github.com/cloveric/claude-drawing-skill (MIT), `docs/PRINCIPLES.md`. A skill pinta com código (Python + Pillow, sem modelo de imagem), em 83 estilos.

**Vetor chapado (o estilo da série):**
- Ganha com poucas formas grandes e espaço vazio, não com detalhe: 3–4 camadas de chão, um astro, céu generoso e **uma pequena história contada com um ou dois acentos quentes**.
- **Sete cores**; todo outro tom é variação de uma delas.
- **Uma luz só** para a cena inteira, com o lado sombreado sempre do lado oposto.
- Sem contorno: escolha a cor de cada objeto **contra o que está atrás dele** (barraca laranja na areia, não na frente do morro laranja).
- Descole as camadas alguns pixels, com uma sombra suave; textura em torno de 1%, para o chapado continuar chapado.

**Quadro-negro (cenário do Lukita):**
- Mesmo o giz com força total deixa ~15% de falhas e bordas quebradas; senão parece linha vetorial.
- Símbolos de física feitos à mão (o ∝ de fonte grossa vira ∞).
- Áreas grandes sombreadas de leve, com gradiente de pressão.
- **Fantasmas da aula anterior** ficam bem apagados, nos espaços vazios.
- O apagador tira o giz de verdade, arrasta uma mancha e deixa o fantasma.

## 6. Diferença deliberada em relação às referências

As referências recomendam vídeo sem legenda. Nós **mantemos a legenda palavra por palavra**, porque no Reels muita gente assiste sem som.
