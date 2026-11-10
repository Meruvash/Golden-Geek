# Referências de roteiro e direção para as animações

Regras tiradas de três skills abertas (licença MIT) que destilam explainers que funcionam.
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

## 5. Diferença deliberada em relação às referências

As referências recomendam vídeo sem legenda. Nós **mantemos a legenda palavra por palavra**, porque no Reels muita gente assiste sem som.
