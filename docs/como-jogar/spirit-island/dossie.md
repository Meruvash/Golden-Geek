# Dossiê: Como jogar Spirit Island

Produzido em 04/11/2026 seguindo `docs/como-jogar/BRIEF.md` (e a Parte 2 de `PROMPT_PILOTO.md`), por pedido direto do editor. Jogo base, sem expansões. Nada daqui está publicado (`"publicar": false`).

## 1. Edição brasileira e escolha da fonte de regra

**O pedido dizia "Edição brasileira: MeepleBR (confira na página da editora)". Não confere.** O sitemap de produtos da Meeple BR (https://meeplebr.com/meeple_product-sitemap.xml, 309 endereços, lido em 04/11/2026) não tem Spirit Island, e as URLs `/product/spirit-island/` respondem 404. A editora brasileira é a **Ace Studios**:

- Site da Ace Studios (https://www.acestudiosjogos.com/, que é para onde redireciona acestudios.com.br): o menu tem "SPIRIT ISLAND", na página https://www.acestudiosjogos.com/copia-warzoo (o endereço da página tem nome trocado no próprio site), com a descrição do jogo e nenhum manual para baixar.
- Loja Masmorra, produto ACE0009 "Spirit Island Jogo de Tabuleiro", "EDIÇÃO 2023", "Marca: Ace Studios", 1 a 4 jogadores, 14+, 90 min; e ACE0011 "Spirit Island: Expansão Galhos e Garras" (https://www.masmorra.com.br/produtos/ace0009 e /ace0011; robots.txt permite).
- Resumo de busca da web (não aberto: Ludopedia está atrás de Cloudflare, 403, e a API pede token) indica a Ace Studios como editora nacional, com lançamento em 2019.

**Manual em português:** não encontrado em fonte oficial. O site da Ace não oferece download; a busca só achou PDFs de terceiros sem procedência (descartados) e um PDF do ComparaJogos que é de outro jogo. Por isso, conforme a exceção do BRIEF (decisão do editor de 31/10/2026), a fonte de regra é o **manual oficial em inglês da Greater Than Games**. O tutorial avisa isso na linha 3 e o JSON usa `"edicao": "Regras do manual em inglês (Greater Than Games)"`, como no Santuário.

## 2. Fontes

| Fonte | Versão | Onde | Uso |
|---|---|---|---|
| **Manual oficial** *Spirit Island* (jogo base), Greater Than Games | 32 páginas quadradas, "VER : 23.08" impresso na p. 32; PDF criado em 18/09/2023 (InDesign 18.5), 113 MB | link "Digital rulebook" de https://greaterthangames.com/pages/spirit-island (Dropbox, `SISL-CORE_Rulebook.pdf`), baixado em 04/11/2026 | Única fonte de regra |
| Manual anterior, mesma editora | 32 páginas, PDF de 19/07/2018 (modificado 27/09/2018) | link da página https://greaterthangames.com/products/spirit-island (`Spirit-Island-CORE-Rulebook.pdf`) | Comparação: a diferença de regra é só a errata da Praga (abaixo) |
| Errata "one more Blight" | | https://bit.ly/3grk6SS, citada na p. 6, redireciona para o FAQ oficial (querki.net/u/darker/spirit-island-faq/#!one-more-blight-errata) | O texto da errata já está na p. 6 do manual de 2023; a página do FAQ não foi aberta |
| Página do produto, Greater Than Games | | https://greaterthangames.com/products/spirit-island | 1 a 4 jogadores, 100 min, 14+ |
| Ace Studios e Masmorra | | acima | Editora brasileira, expansão Galhos e Garras, idade 14+ |
| Vídeo | "Spirit Island - Como Jogar", Romir Play House | https://www.youtube.com/watch?v=610Ms1ZMbng (título e canal pelo oEmbed) | Só referência ao leitor. A busca do canal Duque Board Games (`/@DuqueBoardgames/search?query=spirit island`, 20 resultados conferidos no oEmbed) não tem vídeo do jogo |

robots.txt: Meeple BR, Ace (Wix), Greater Than Games e Masmorra permitem as páginas lidas. Nenhum bloqueio contornado (Ludopedia ficou de fora por Cloudflare). User-Agent padrão do curl.

**Como o manual foi lido.** Texto extraído com `pdftotext -layout` e sem `-layout`, este último paginado em `A_paginado.txt` (página do PDF = página impressa). As páginas com texto embaralhado pelas colunas laterais (p. 10 e 12) foram conferidas na versão `-layout` e na imagem. Ilustrações lidas a 300 a 900 dpi: tabuleiro dos Invasores (p. 4: 5 Pragas por jogador no espaço impresso, "Victory when revealed" sob o baralho de Medo, 4 marcadores de Medo por jogador), cartas de Praga (p. 5), painel do Lightning's Swift Strike (p. 14), carta "Sap the Strength of Multitudes" e Poder Inato "Gather the Warriors" (p. 16), exemplos das p. 11, 12 e 19.

Arquivos no scratchpad (fora do repositório):
- PDF: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/spirit-island/manual/A_SISL-CORE_Rulebook.pdf` (e `B_Spirit-Island-CORE-Rulebook.pdf`, 2018).
- Texto paginado: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/spirit-island/manual/A_paginado.txt` (também `A_raw.txt`, `A_SISL-CORE_Rulebook.txt` com `-layout`, e os de 2018 `B_raw.txt`, `B_Spirit-Island-CORE-Rulebook.txt`).
- Contas: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/spirit-island/scripts/contas.py`; conferência por grep: `.../scripts/grep_conferencia.txt`.

## 3. O Espírito escolhido

O manual indica para iniciantes quatro Espíritos de complexidade baixa: Lightning's Swift Strike, Vital Strength of the Earth, River Surges in Sunlight e Shadows Flicker Like Flame (p. 3). O guia usa **Lightning's Swift Strike** ("Golpe Veloz do Relâmpago", tradução nossa) porque é o único cujo painel aparece inteiro no manual (anatomia do painel, p. 14), o que permite exemplos com números reais:

- Montagem: "Put 2 Presence on your starting board in the highest-numbered Sands." Complexidade "LOW".
- Crescimento (escolha 1): (1) Reclaim Cards + Gain Power Card + Gain Energy +1; (2) Add a Presence alcance 2 + Add a Presence alcance 0; (3) Add a Presence alcance 1 + Gain Energy +3.
- Trilha Energy/Turn: 1 (descoberto), 1, 2, 2, 3, 4, 4, 5. Trilha Card Plays: 2 (descoberto), 3, 4, 5, 6.
- Poder Inato Thundering Destruction: ícone de tartaruga azul (Lento), alcance 1, alvo Any. 3 Fogo 2 Ar: Destroy 1 Town. 4 Fogo 3 Ar: You may instead destroy 1 City. 5 Fogo 4 Ar 1 Água: Also, destroy 1 Town/City. 5 Fogo 5 Ar 2 Água: Also, destroy 1 Town/City.
- Regra especial Swiftness of Lightning: "For every Air you have, you may use 1 Slow Power as if it were Fast. (Power Cards or your Inn...)": o fim do parêntese está coberto pelo selo numerado da ilustração.

Lacuna: as 4 cartas Únicas do Relâmpago e a lista da carta de Progressão de Poder não aparecem no manual. O tutorial não as nomeia nem dá custo; os exemplos usam só o painel e totais de Elementos.

## 4. Glossário (inglês do manual para o português do tutorial)

Os nomes impressos na caixa da Ace Studios não foram confirmados em fonte confiável (não há manual em português acessível). A loja e a Ace usam, na descrição, "Espíritos", "Invasores", "Dahan", "Cartas de Poder", "Poder Maior", "Poder Menor", "Tabuleiros de Ilha", "cartas de Invasor", "cartas de medo", "adversários", "Cenários", "energia", "terras", "exploram", "constroem", "devastam". O tutorial segue esses onde existem; o resto é tradução nossa, e o inglês aparece entre parênteses na primeira vez e na folha de consulta.

| Inglês (manual) | Tutorial | Página |
|---|---|---|
| Spirit / Spirit Panel | Espírito / painel | 14 |
| Presence / Sacred Site | Presença / Local Sagrado | 13 |
| Growth | Crescimento | 8, 14 |
| Energy / Energy Presence Track | Energia / trilha de Energia | 13, 14 |
| Card Plays | Jogadas / trilha de Jogadas | 13, 14 |
| Power Card (Unique, Minor, Major) | carta de Poder (Única, Poder Menor, Poder Maior) | 16, 18 |
| Innate Power | Poder Inato | 14, 16 |
| Fast / Slow | Rápido / Lento | 16 |
| Element (Sun, Moon, Fire, Air, Water, Earth, Plant, Animal) | Elemento (Sol, Lua, Fogo, Ar, Água, Terra, Planta, Animal) | 16, 17 |
| Elemental Threshold | limiar | 17 |
| Range / Target | Alcance / Alvo | 16 |
| Reclaim / Reclaim One / Forget | Recuperar / Recuperar 1 / Esquecer | 14, 18 |
| Power Progression Card | carta de Progressão de Poder | 3, 18 |
| Invaders: Explorer, Town, City | Invasores: Explorador, Vila, Cidade | 15 |
| Explore / Build / Ravage | Explorar / Construir / Devastar | 9, 10 |
| Invader Card / Deck / Stage I, II, III | carta / baralho de Invasores / Estágio I, II, III | 6, 10 |
| Invader Board / Island Board | tabuleiro dos Invasores / tabuleiro da Ilha | 6 |
| land, Jungle, Mountain, Sands, Wetland | terra, Selva, Montanha, Areia, Pântano | 13 |
| Coastal / Inland / Ocean | costeira / interior / Oceano | 13 |
| Blight / Blight Card / Healthy Island / Blighted Island / Cascade | Praga / carta de Praga / Ilha Saudável / Ilha Arruinada / cascata | 15 |
| Fear / Fear Pool / Generated Fear / Earned Fear Cards / Fear Card | Medo / reserva de Medo / Medo Gerado / Cartas de Medo Conquistadas / carta de Medo | 12 |
| Terror Level / divider | Nível de Terror / divisória | 6, 12 |
| Damage / Health / Destroy / Remove / Replace | Dano / Vida / destruir / Remover / Substituir | 15, 18 |
| Defend / Gather / Push / Repeat | Defender / Reunir / Empurrar / Repetir | 18, 19 |
| Spirit Phase, Fast Power Phase, Invader Phase, Slow Power Phase, Time Passes | fase dos Espíritos, dos Poderes Rápidos, dos Invasores, dos Poderes Lentos, O Tempo Passa | 8 a 10 |
| Adversary / Scenario / Thematic Map | Adversário / Cenário / mapa temático | 22, 23 |

## 5. Base de regras

Classificação: [V] lida no manual nesta sessão; [I] interpretada; [L] lacuna. Página do manual em inglês de 2023.

**Montagem**
- Adversário e Cenário escolhidos antes da montagem [V p. 6, 22]. Primeira partida: Espírito de complexidade baixa com Progressão; sem carta de Praga, Adversário ou Cenário se todos forem novatos [V p. 3].
- 4 marcadores de Medo por jogador; 9 cartas de Medo com as divisórias a 3 e a 6 do fundo [V p. 6].
- Baralho de Invasores: 3 I, 4 II, 5 III; o jogo traz 4, 5 e 6 [V p. 6].
- Carta de Praga sorteada, lado Healthy, sem olhar o verso; ou espaço impresso com 5 por jogador [V p. 4 ilustração, p. 6]; errata: exatamente 1 Praga a mais, qualquer número de jogadores [V p. 6].
- Um tabuleiro da Ilha por jogador, ícones de montagem, Praga da caixa [V p. 6].
- Jogador: Presenças e marcadores de uma cor, painel, 4 cartas Únicas = mão inicial; tabuleiros diferentes; montagem do painel; trilhas cobertas menos o número da esquerda [V p. 6]. Depois, Presença e Poderes em qualquer tabuleiro [V p. 6].
- Ação inicial: revelar, Explorar, carta em Construir [V p. 6].
- Peças de Invasor ilimitadas, marcadores de Energia como substitutos [V p. 15]; Dahan ilimitados [V p. 16].

**Turno**
- Cinco fases; jogo simultâneo; conversa livre [V p. 8].
- Espíritos: Crescer (1 opção, tudo, ordem livre), Energia (maior descoberto), jogar e pagar cartas até as Jogadas, Elementos na hora, sem alvos ainda [V p. 8, 16].
- Poderes Rápidos: Inatos e cartas; ordem livre sem interromper; pular efeito; não adiar para a fase Lenta [V p. 8, 17].
- Invasores: Ilha Arruinada, Medo, Devastar, Construir, Explorar, avançar cartas [V p. 9, 10]. Sem carta no espaço, nada [V p. 9].
- Lentos como os Rápidos [V p. 10]. O Tempo Passa: descarte, Dano e Elementos somem [V p. 10].
- Quem decide; ordem das terras [V p. 8, 9]. Limite de tempo [V p. 8] (cortado do tutorial na revisão de tamanho).

**Espíritos e Poderes**
- Presença, "suas terras", Local Sagrado com 2+ [V p. 13]. Trilhas da esquerda para a direita, números não somam, Presença destruída fora de jogo [V p. 14]. Reposicionar [V p. 14]. Recuperar 1 e Elementos fixos [V p. 14].
- Energia acumula, não se transfere; Jogadas não acumulam [V p. 13].
- Crescimento comum [V p. 14]. Ganhar carta: 4, fica 1; Maior obriga a Esquecer; Progressão [V p. 18].
- Carta: custo, Elementos, velocidade, alcance, alvo, efeito, limiar; "Instead" [V p. 16, 17]. Inatos sem custo nem jogada, 1 vez por turno [V p. 14, 17]. Uma terra, um turno, um uso; faça o que der; menos Elementos de propósito [V p. 17].
- Dano de Poder: aos Invasores, dividido, somado, cura no fim [V p. 18]. Remover/Substituir sem Medo [V p. 18]. Defender soma e dura o turno [V p. 18]. Reunir/Empurrar só vizinhas, sem Oceano [V p. 19]. Repetir [V p. 19].
- Thundering Destruction é Lento: lido no ícone da ilustração (tartaruga azul, mesmo ícone de "Slow" no tabuleiro e na p. 32) [V ilustração p. 14].
- Swiftness of Lightning [V ilustração p. 14]; se inclui o Poder Inato [I]: o parêntese está coberto. O tutorial não afirma o alcance da regra; o exemplo resolvido da etapa 3 foi reescrito para não depender disso.

**Invasores e Dahan**
- Vida e Dano: Explorador 1/1, Vila 2/2, Cidade 3/3; Vila e Cidade são fontes de Explorar [V p. 15].
- Explorar: tipo da carta; Vila ou Cidade na terra, ou vizinha de Vila, Cidade ou Oceano; 1 Explorador [V p. 10]. Bandeira do Estágio II ignorada sem Adversário; Estágio III com dois terrenos [V p. 10].
- Construir: só com Invasores; mais Vilas que Cidades, Cidade; senão Vila [V p. 10].
- Devastar: soma, Defender, 1 Praga se 2+, cada 2 destrói 1 Dahan da forma mais eficiente, 1 fere; Dahan vivos revidam 2 cada, mesmo com Dano zerado, não se a Devastação foi impedida; Presença não revida [V p. 9].
- Dahan: 2 de Vida; Dano dos Espíritos não os fere [V p. 16].
- Vizinhança, costeira, interior, Oceano [V p. 13].

**Praga, Medo, fim**
- Praga sai e volta para a carta ou espaço; ao entrar (depois da montagem): destrói 1 Presença de cada Espírito; cascata para uma vizinha [V p. 9, 15]. Carta virada não volta [V p. 15, 18].
- Medo: Vila 1, Cidade 2, símbolo de Medo; marcadores; carta conquistada; divisória vale na hora; sobra volta para Medo Gerado; cartas resolvidas na próxima fase dos Invasores, na ordem, no Nível atual [V p. 9, 12]. Medo gerado por efeito de Medo vai para o fundo da pilha [V p. 9]. "Each player" [V p. 9].
- Vitória: condições dos Níveis 1 a 3, imediata [V p. 12]. Vitória com sacrifício [V p. 12].
- Vitória ao revelar o espaço "Victory" sob o baralho de Medo: o tabuleiro ilustrado traz "VICTORY / WHEN REVEALED" (p. 4 e 12) e a p. 12 fala em "Terror Level VICTORY: Immediate victory!" [I]: o texto corrido não descreve o momento; a leitura é que conquistar a 9ª carta deixa o espaço à mostra.
- Derrota: Praga, Espírito sem Presença, baralho vazio ao Explorar [V p. 12]. Espaço impresso: "If there is ever no Blight here, you lose" [V p. 4 ilustração].
- Opções: solo, Adversários, Cenários, mapa temático, pontuação, jogo mais fácil [V p. 21 a 23]. Erros não precisam ser desfeitos [V p. 20] (cortado na revisão de tamanho).

**Lacunas**
- [L] Cartas Únicas e Progressão do Relâmpago.
- [L] Quantidade de Praga das cartas de Praga no lado Healthy (a ilustração da p. 5 a cobre; só o lado Blighted mostra "5 per player").
- [L] Nomes da edição brasileira.

**Diferenças entre edições.** Manual de 2018 contra 2023: mesmas regras, revisão de redação (maiúsculas em Destroy/Remove; "You can skip" virou "You don't have to use a Power"; definição de Replace; dica de alvos na p. 20) e a errata de 1 Praga a mais (p. 6), que só existe no de 2023. Não se sabe qual versão a Ace traduziu: o tutorial manda aplicar a errata (bloco [!edicao] da etapa 1).

## 6. Plano

Cinco etapas, como sugerido pelo editor, com uma mudança de recorte: os Dahan entram na etapa 4, junto de Devastar, porque o contra-ataque é parte da Devastação; a etapa 5 junta Praga, Medo e o fim. Comece em 5 minutos (e não 4) porque o primeiro turno tem cinco fases. Casos especiais em `[!mais]`. Figuras: 7 recortes (p. 7, 11, 11, 11, 12, 14, 19) em `como-jogar/spirit-island/figuras/`, só a parte gráfica, com crédito "Ilustração: manual oficial Greater Than Games (p. N)".

## 7. Portões

- Travessões: 0. `tools/vicios.py` (função `avisos` sobre o texto do tutorial e sobre o JSON): nenhum aviso.
- `python3 tools/checar_comece.py docs/como-jogar/spirit-island/tutorial.md`: passa.
- Conversor `tools/como_jogar_md.py` (`pagina()`), rodado numa cópia do repositório no scratchpad: gera a página sem marcação crua.
- Extensão: cerca de 6.460 palavras de texto (sem as linhas de figura e vídeo; `wc -w` dá cerca de 8.000 por contar marcadores), um pouco acima do teto de 6.000, contando os exercícios. Cortes já feitos: perguntas repetidas, limite de tempo, erro descoberto no meio, partes da seção 0.
