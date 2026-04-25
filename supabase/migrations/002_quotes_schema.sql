-- supabase/migrations/002_quotes_schema.sql

CREATE TABLE IF NOT EXISTS quotes (
  id                 TEXT        PRIMARY KEY,
  quote_vi           TEXT        NOT NULL,
  quote_en           TEXT        NOT NULL,
  author             TEXT        NOT NULL,
  source             TEXT        NOT NULL,
  source_url         TEXT,
  category           TEXT[]      NOT NULL DEFAULT '{}',
  tags               TEXT[]      NOT NULL DEFAULT '{}',
  year               INTEGER,
  verified           BOOLEAN     NOT NULL DEFAULT false,
  contributor_github TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON quotes
  FOR SELECT USING (true);
