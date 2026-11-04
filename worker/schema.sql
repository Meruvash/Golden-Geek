-- Banco D1 do serviço de interações (curtidas e comentários) da Elite Boardgamers.
-- Nada de IP em claro: ip_hash é um SHA-256 do IP com um sal que muda todo dia, usado só para limitar abuso.

CREATE TABLE IF NOT EXISTS curtidas (
  pagina      TEXT NOT NULL,          -- caminho da página, ex.: /root/ ou /noticias/vantage-chega-ao-brasil/
  dispositivo TEXT NOT NULL,          -- identificador aleatório guardado no navegador (localStorage), não é cookie
  criado      TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (pagina, dispositivo)
);

CREATE TABLE IF NOT EXISTS comentarios (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  pagina      TEXT NOT NULL,
  nome        TEXT NOT NULL,
  email       TEXT,                   -- opcional, nunca publicado
  texto       TEXT NOT NULL,
  criado      TEXT NOT NULL DEFAULT (datetime('now')),
  estado      TEXT NOT NULL DEFAULT 'pendente',   -- pendente | aprovado | reprovado | duvidoso
  parecer     TEXT,                   -- análise curta da moderação (IA ou humano)
  decidido_por TEXT,                  -- 'ia' ou 'editor'
  decidido_em TEXT,
  ip_hash     TEXT
);

CREATE INDEX IF NOT EXISTS comentarios_pagina ON comentarios (pagina, estado, criado);
CREATE INDEX IF NOT EXISTS comentarios_estado ON comentarios (estado, criado);

-- Mercado da Elite: anúncios cadastrados pelos próprios vendedores (worker/src/mercado.js).
-- Nada aparece no site sem estar aprovado. Preço em centavos. O e-mail é opcional e nunca é publicado.
CREATE TABLE IF NOT EXISTS mercado_anuncios (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  jogo        TEXT NOT NULL,          -- nome como o vendedor escolheu (da nossa lista de jogos ou digitado)
  jogo_slug   TEXT,                   -- jogo da nossa base (Black de Verdade / resenhas), quando escolhido da lista
  edicao      TEXT,                   -- edição, editora, expansões incluídas
  condicao    TEXT NOT NULL,          -- lacrado | como-novo | usado-otimo | usado-bom | usado-marcas
  idioma      TEXT NOT NULL,          -- pt | en | independente | outro
  preco       INTEGER NOT NULL,       -- centavos
  troca       INTEGER NOT NULL DEFAULT 0,
  entrega     TEXT NOT NULL,          -- ambos | envio | retirada
  cidade      TEXT NOT NULL,
  uf          TEXT NOT NULL,
  descricao   TEXT,
  vendedor    TEXT NOT NULL,          -- nome ou apelido que o vendedor quer mostrar
  whatsapp    TEXT,                   -- 55 + DDD + número; publicado porque o vendedor pediu
  instagram   TEXT,
  email       TEXT,                   -- opcional, nunca publicado
  fotos       TEXT NOT NULL DEFAULT '[]',   -- chaves de mercado_fotos, na ordem (a primeira é a capa)
  estado      TEXT NOT NULL DEFAULT 'pendente',  -- pendente | aprovado | reprovado | duvidoso | vendido | removido
  parecer     TEXT,
  decidido_por TEXT,
  decidido_em TEXT,
  criado      TEXT NOT NULL DEFAULT (datetime('now')),
  atualizado  TEXT,
  aprovado_em TEXT,
  expira      TEXT,                   -- aprovado_em + 60 dias; o vendedor renova pelo link secreto
  token_hash  TEXT NOT NULL,          -- SHA-256 do link secreto de gerenciamento
  ip_hash     TEXT
);
CREATE INDEX IF NOT EXISTS mercado_estado ON mercado_anuncios (estado, expira);
CREATE INDEX IF NOT EXISTS mercado_ip ON mercado_anuncios (ip_hash, criado);

CREATE TABLE IF NOT EXISTS mercado_fotos (
  chave       TEXT PRIMARY KEY,       -- <id>-<aleatório>-<n>: não dá para adivinhar a de outro anúncio
  anuncio     INTEGER NOT NULL,
  ordem       INTEGER NOT NULL,
  tipo        TEXT NOT NULL,          -- image/webp | image/jpeg
  dados       BLOB NOT NULL,          -- já reduzida no aparelho do vendedor (até 1600 px)
  criado      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS mercado_fotos_anuncio ON mercado_fotos (anuncio, ordem);

CREATE TABLE IF NOT EXISTS mercado_denuncias (
  anuncio     INTEGER NOT NULL,
  ip_hash     TEXT NOT NULL,          -- uma denúncia por aparelho e por dia
  motivo      TEXT NOT NULL,          -- golpe | falso | vendido | ofensivo | outro
  criado      TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (anuncio, ip_hash)
);
