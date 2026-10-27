# Plano de fotos do Golden Geek

Como os sites de review conseguem fotos, o que já fazemos sozinhos e o que falta para cada resenha ter foto boa de mesa, caixa e partida.

## Como os sites de review fazem

1. **Cópia de review + foto própria.** O caminho principal. A editora manda o jogo (de graça ou só com frete), o site joga e fotografa. É por isso que Shut Up & Sit Down, Dicebreaker e Meeple Mountain têm fotos que ninguém mais tem. No Brasil, a prática é a mesma: editoras mandam lançamentos para criadores de conteúdo em troca de divulgação.
2. **Kit de imprensa da editora.** Fotos em alta, liberadas para imprensa, com crédito ("Imagem: Editora"). Muitas editoras deixam o kit público (Pandasaurus, Cocktail Games, Kosmos, Plaid Hat, Free League); outras mandam por e-mail.
3. **Fotos da comunidade com crédito.** Alguns sites usam fotos de leitores e fotógrafos de jogos com autorização.

O que **não** fazem com segurança: copiar fotos de usuários do BGG, da Ludopedia, do Pinterest ou do Instagram sem autorização. A foto é de quem fotografou, não do site onde ela está.

## Fontes, em ordem

| # | Fonte | Quem faz | Comando ou ação |
|---|---|---|---|
| 1 | Site da editora original | Robô | `robo.py buscar <slug>` |
| 2 | Editoras licenciadas em outros países | Robô | fixar página em `editoras.json` + `buscar` |
| 3 | Kit de imprensa público (ZIP) | Robô | `robo.py kit <slug> <link> --nome "Editora"` |
| 4 | Kit em Dropbox/Google Drive | Você baixa, robô processa | `robo.py kit <slug> ~/Downloads/kit.zip --nome "Editora"` |
| 5 | Fotos de usuários com licença livre (Wikimedia Commons) | Robô | `robo.py livres <slug>` (categorias em `livres.json`) |
| 6 | Bancos gratuitos (Pexels, Unsplash) | Você baixa (bloqueiam robôs) | buscar o nome do jogo; licença livre, crédito opcional |
| 7 | Pedido de kit ou cópia de review | Você envia | modelos abaixo |
| 8 | Comunidade (grupo do WhatsApp) | Você publica a chamada | modelo abaixo |
| 9 | Fotos próprias | Você | guia abaixo |

### Kits de imprensa já encontrados

- **Cocktail Games** (Bomb Busters e outros): página de downloads com um ZIP de "Visuels" por jogo. Já usado em Bomb Busters.
- **Pandasaurus** (The Mind, Mind Up!, The Mind: Soulmates): pasta no Dropbox em pandasaurusgames.com/pages/media-kits. O Dropbox proíbe robôs: baixe o ZIP e rode `kit`.
- **Kosmos**: página de Pressemappen.
- **Czech Games Edition**: páginas "for press" por jogo.

### Wikimedia Commons

Categorias com fotos de usuários em CC0 ou CC BY-SA: Terraforming Mars (8), Endeavor: Deep Sea (7), Azul (6), Codenames (6), Wingspan (5), Scythe (3), Nemesis (1). O crédito sai automático: "Foto: Autor · CC BY-SA 4.0 · Wikimedia Commons". O Wikimedia limita pedidos vindos de servidores na nuvem; se pedir pausa, o robô pula e avisa. Do seu computador costuma passar direto.

## Modelos

### Pedido de cópia de review (editoras brasileiras)

> Assunto: Golden Geek – resenha de [JOGO]
>
> Olá, equipe [EDITORA]!
>
> Sou [NOME], do Golden Geek (https://meruvash.github.io/Golden-Geek/), site de resenhas de jogos premiados ligado à comunidade Elite Boardgamers ([N] pessoas no grupo do WhatsApp, @eliteboardgamers no Instagram). Publicamos [N] resenhas por semana, com infográfico para o Instagram.
>
> Queremos resenhar [JOGO], que ganhou [PRÊMIO]. Vocês teriam uma cópia para review? Se preferirem, pagamos o frete. Também aceitamos o kit de imprensa com fotos oficiais, sempre com crédito à editora.
>
> A resenha é independente: dizemos o que funciona e o que pesa, e mandamos o link assim que publicar.
>
> Obrigado!

### Pedido de autorização a quem fotografou (Instagram, Ludopedia, BGG)

> Oi, [NOME]! Que foto bonita do [JOGO]. Sou do Golden Geek, site de resenhas de jogos premiados. Posso usar essa foto na nossa resenha, com crédito para você (@[PERFIL] e link)? Não é uso comercial e tiramos do ar quando você pedir.

Guarde o print da resposta e registre no `fontes.json` da foto: `"credito": "Foto: @perfil (autorizada em AAAA-MM-DD)"`.

### Chamada no grupo

> 📸 Chamada de fotos! A próxima resenha do Golden Geek é de [JOGO]. Tem foto da sua mesa? Manda aqui (de cima, com o jogo montado, sem gente na frente). A melhor vai para o site com o seu nome. Ao enviar, você autoriza o uso na resenha e no Instagram da Elite Boardgamers, com crédito.

## Guia rápido de foto própria

- **Luz:** perto de uma janela, de dia, sem flash. Nada de luz amarela de teto.
- **Mesa:** fundo liso (madeira clara, toalha neutra). Tire copos, celulares e caixas de outros jogos.
- **Quatro fotos por jogo:** caixa de frente (em pé, fundo limpo); mesa montada vista de cima (celular paralelo à mesa); partida no meio, em ângulo de 45°; detalhe de componentes bem de perto.
- **Celular:** modo normal (não retrato), lente principal, toque para focar, 2 ou 3 fotos de cada.
- **Sem pessoas no quadro** (a página não usa fotos com gente; mãos só se for o foco).
- Mande para o robô processar: `robo.py kit <slug> fotos.zip --nome "Golden Geek"` e o crédito sai "Imagem: Golden Geek".

## Próximos passos

1. Rodar `livres` nos 7 jogos com fotos no Commons e escolher as melhores.
2. Baixar o kit da Pandasaurus (The Mind) e rodar `kit`.
3. Enviar pedidos de cópia de review às editoras brasileiras (Galápagos, Devir, Grok, MeepleBR, Ludofy, Ludofun, Across the Board) para os próximos jogos da pauta.
4. Publicar a primeira chamada de fotos no grupo para MicroMacro, Sky Team e Detective, que não têm foto de mesa.
