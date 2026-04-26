ALTER TABLE quotes ADD COLUMN featured BOOLEAN DEFAULT FALSE;
CREATE INDEX idx_quotes_featured ON quotes(featured) WHERE featured = TRUE;
