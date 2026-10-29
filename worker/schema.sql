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
