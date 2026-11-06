# Auditoria: Como Jogar Pandemic

Autoverificação de quem escreveu o tutorial (06/11/2026). Não substitui a auditoria independente, que será feita por outro agente antes de `"publicar": true`.

## 1. Fontes usadas e não obtidas

- Usado: livro de regras da Galápagos, `PAN001_regras_v2.0.pdf` (8 páginas, 14/10/2024), biblioteca da Asmodee Brasil, item 2022, grupo `b2c`. Texto por página em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/pandemic/txt/p1.txt` a `p8.txt` (com `-layout`) e `raw_p1.txt` a `raw_p8.txt`; imagens das páginas em `img/`.
- Usado para conferir tradução: manual oficial em inglês da Z-Man (8 páginas). Usada para jogadores, idade e duração: página oficial da Z-Man.
- Não obtido: FAQ ou errata oficial; texto das 5 Cartas de Evento (o manual mostra só três). O item 818 da biblioteca (mesmo PAN001) respondeu 404.

## 2. Conferência regra por regra (tutorial contra o manual BR)

| Afirmação do tutorial | Página | Resultado |
|---|---|---|
| Componentes e quantidades (59 = 48 + 6 + 5; 96 cubos, 24 por cor; 7 funções e peões; 4 Referências; 48 Infecção; 6 Centros; 4 Curas) | 1 | Confere |
| Passo 1: tabuleiro, Centros e cubos ao lado, 4 montes, 1 Centro em Atlanta | 2 | Confere |
| Passo 2: Surtos no 0; Curas com frasco vazio perto do Indicador | 2 | Confere |
| Passo 3: velocidade no "2" mais à esquerda; 3/3/3 cartas com 3, 2, 1 cubos; 18 cubos; 9 cartas para o descarte | 3 | Confere; 39 restantes é conta (48 - 9) |
| Passo 4: Referência, Função virada para cima, peão em Atlanta; Epidemias de lado; mão 4/3/2 | 2 | Confere (tabela lida na imagem) |
| Passo 5: 4/5/6 Epidemias; pilhas parecidas; menores embaixo; não usadas saem | 3 | Confere |
| Passo 6: maior população começa; vez à esquerda | 3 | Confere |
| O que volta para a caixa | 2, 3 | Confere |
| Turno em três partes | 3 | Confere |
| Quatro ações de movimento | 4 | Confere |
| Linha que dá a volta, Sydney e Los Angeles | 4 | Confere |
| Construir, Tratar, Compartilhar, Descobrir uma Cura | 4 | Confere |
| Todos os Centros construídos: pegar do tabuleiro | 4 | Confere |
| Uma ação por cor curada | 4 | Confere |
| Erradicação (duas formas); último cubo de doença sem cura sem efeito | 4 | Confere |
| Receber carta e passar de 7: descartar ou jogar Evento na hora | 4, 8 | Confere |
| Cura em qualquer Centro, cor da cidade irrelevante | 8 | Confere |
| Doença curada continua recebendo cubos | 4 | Confere |
| Funções (tabela e três `[!mais]`) | 8 | Confere, frase por frase |
| Comprar 2 ao mesmo tempo; menos de 2 = derrota; nunca reembaralhar | 6 | Confere |
| Epidemia: Aumentar, Infectar (fundo, 3 cubos, completa até 3 e surto, erradicada não recebe), Intensificar (só o descarte) | 6 | Confere |
| Duas Epidemias; a carta da segunda volta ao topo e causa surto, salvo Evento | 6 | Confere |
| Epidemia sai da partida, sem substituta | 6 | Confere |
| Limite de 7; Função e Referência não contam; vale na hora | 6, 7, 8 | Confere |
| Eventos: qualquer jogador, sem ação, quem joga decide, exceto entre comprar e resolver; após a primeira de duas Epidemias; descarte depois | 7 | Confere |
| Textos de Transporte Aéreo, Prognóstico e Uma Noite Tranquila | 1, 7 | Confere (cartas ilustradas; camada de texto e imagem) |
| Mão aberta na Introdutória, fechada na Normal e Heroica, opção de abrir; descartes visíveis | 7 | Confere |
| Infectar: velocidade atual, uma a uma, 1 cubo, erradicada não, 3 = surto, descarte | 6 | Confere |
| Surto e surto em cadeia; cidade que já teve surto nesta carta não recebe | 7 | Confere |
| Várias cores, até 3 de cada; não afeta infecções | 7 | Confere |
| Falta de cubos = derrota, em epidemia, surto ou infecção | 6, 7 | Confere |
| Vitória e três derrotas | 7 | Confere |
| Trilha de Velocidade 2, 2, 2, 3, 3, 4, 4 | 6 (ilustração) | Confere na imagem |
| Evento depois do surto, não durante (exemplo do Transporte Aéreo) | 7 | Confere |
| Duração 45 min e 8+ | página Z-Man | Confere; o manual não traz |

**Exemplos refeitos** (script `scratchpad/d1106/pandemic/scripts/contas.py` e leitura):
- João (p. 5): duas ações de Automóvel/Balsa e dois Tratar; nenhum descarte. As conexões Atlanta-Chicago e Chicago-São Francisco vêm do próprio exemplo.
- Ana (p. 5): Tratar remove 3 vermelhos com cura e erradica; Voo Fretado com a carta de Manila estando em Manila; Compartilhar pega Chennai estando os dois em Chennai; Cientista cura com 4 pretas num Centro.
- Fim do turno de Ana (p. 6 e 7): velocidade 3; Seul erradicada sem cubo; Paris 1 para 2 azuis; Argel surto (+1), cubos em Madri, Paris, Istambul; Cairo com 3 vira surto em cadeia (+1), cubos em Istambul, Bagdá, Riad e Cartum, não em Argel. Total 7 cubos pretos e 2 avanços: confere com o script.
- Etapa 1 (Lima): Voo Direto com Lima ou Voo Fretado com Atlanta estando em Atlanta; os dois legais. As conexões do mapa não são usadas.
- Etapa 3 (Lagos): terceiro espaço (2) para o quarto (3), carta do fundo recebe 3 cubos, reembaralhar o descarte com ela; se sair nas Infecções, surto. Confere com a trilha.
- Pilhas de 13, 12, 12 e 12 (2 jogadores, 4 Epidemias): 53 - 8 = 45; 45 = 12 + 11 + 11 + 11; +1 Epidemia cada.

## 3. Regras classificadas como interpretada ou lacuna

- `[interpretada]` Especialista em Quarentena e Médico também impedem os cubos da Epidemia: o manual não faz exceção além da preparação (p. 8). No tutorial, em `[!edicao]`.
- `[interpretada]` Com divisão inexata, a pilha maior vai por cima (de "pilhas menores embaixo", p. 3). Só no exemplo da montagem.
- `[lacuna]` Texto e nome de 2 das 5 Cartas de Evento: o manual não traz. O tutorial diz que o efeito está na carta e não os inventa.
- `[lacuna]` Duração e idade: não estão no manual; vêm da página da Z-Man.

## 4. Pontos fracos que restam

- Extensão: cerca de 6.900 palavras por `wc -w`, acima do alvo de 6.000 (justificativa no dossiê, seção 8). A parte à vista tem cerca de 3.200.
- Os exemplos inventados (Lima, Lagos, Bogotá) não dependem de conexões do mapa nem da cor das cidades, salvo a dica "cidade amarela" da etapa 2, que é hipotética e não depende de qual cidade seja.
- O passo 6 da montagem (quem começa) não tem figura: o manual não o ilustra. A figura do passo 1 dos cubos e a dos Marcadores de Cura são recortes pequenos.
- A figura `exemplo-ana.webp` é alta (711 x 1474) porque junta os quatro quadros do turno; pode ficar longa no celular.
- Vídeo do Romir Play House sem data nem edição conferidas; o Duque não tem vídeo do Pandemic base.
- O exemplo do turno de João não diz quantos cubos azuis São Francisco tinha; o tutorial também não diz.
- Legibilidade não medida (ferramenta ausente no repositório).
- Durante a sessão rodei `python3 tools/como_jogar_md.py` sem argumento para testar o conversor, e ele reescreveu os 29 `como-jogar/<slug>/index.html` publicados sem a moldura do site. Restaurei os 29 com `git checkout HEAD --` logo em seguida; `git status` voltou a mostrar só os arquivos de outros agentes e os desta sessão. A página do Pandemic não foi gerada (`"publicar": false`).

## 5. Teste com leitores (proposta)

O mesmo protocolo de `PROMPT_PILOTO.md`, seção 10: de 5 a 8 adultos que nunca jogaram; tarefas: montar para 2 e para 4 jogadores, jogar um turno completo com uma Epidemia e uma infecção que cause surto, decidir se a partida acabou em três situações; medir autonomia, precisão (lista tirada da base de regras do dossiê), tempo, retenção em 7 dias, esforço mental (escala de Paas) e satisfação. Nenhum resultado foi observado.

## 6. Ligação com a resenha

O site não tem resenha do Pandemic base; a de `/pandemic-legacy/` é de outro jogo. Proposta: quando houver resenha do base, um link do tutorial para ela e da resenha para o tutorial, e um aviso de que o tutorial ensina o jogo base, não o Legacy. Nada implementado.
