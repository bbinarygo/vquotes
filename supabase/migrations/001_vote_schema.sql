-- Create votes table (deduplication + rate limiting)
CREATE TABLE IF NOT EXISTS votes (
  id         BIGSERIAL PRIMARY KEY,
  quote_id   TEXT        NOT NULL,
  ip_hash    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS votes_ip_hash_quote_id_idx
  ON votes (ip_hash, quote_id);

CREATE INDEX IF NOT EXISTS votes_ip_hash_created_at_idx
  ON votes (ip_hash, created_at);

-- Create quote_stats table (denormalized vote counts)
CREATE TABLE IF NOT EXISTS quote_stats (
  quote_id   TEXT    PRIMARY KEY,
  vote_count INTEGER NOT NULL DEFAULT 0
);

-- RPC: upsert vote count (insert 1 on first vote, increment on subsequent)
CREATE OR REPLACE FUNCTION increment_vote_count(p_quote_id TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO quote_stats (quote_id, vote_count)
  VALUES (p_quote_id, 1)
  ON CONFLICT (quote_id)
  DO UPDATE SET vote_count = quote_stats.vote_count + 1;
END;
$$;
