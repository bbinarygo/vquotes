-- supabase/migrations/002_quotes_schema.sql

CREATE TABLE IF NOT EXISTS quotes (
  id                 TEXT        PRIMARY KEY,
  quote_vi           TEXT        NOT NULL CHECK (char_length(trim(quote_vi)) > 0),
  quote_en           TEXT        NOT NULL CHECK (char_length(trim(quote_en)) > 0),
  author             TEXT        NOT NULL CHECK (char_length(trim(author)) > 0),
  source             TEXT        NOT NULL CHECK (char_length(trim(source)) > 0),
  source_url         TEXT,
  category           TEXT[]      NOT NULL DEFAULT '{}',
  tags               TEXT[]      NOT NULL DEFAULT '{}',
  year               INTEGER,
  verified           BOOLEAN     NOT NULL DEFAULT false,
  contributor_github TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS quotes_year_idx ON quotes (year DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS quotes_category_gin_idx ON quotes USING GIN (category);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- No write policies: table is read-only for all client roles.
-- Inserts happen via Supabase service role (seed scripts / admin only).
CREATE POLICY "public read" ON quotes
  FOR SELECT USING (true);
