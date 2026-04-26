// scripts/seed-quotes.js
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUOTES_DIR = join(__dirname, '..', 'quotes');
const EXCLUDE = ['example-001.json'];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const files = readdirSync(QUOTES_DIR)
  .filter(f => f.endsWith('.json') && !EXCLUDE.includes(f))
  .sort();

const quotes = [];
let parseErrors = 0;

for (const file of files) {
  try {
    const raw = readFileSync(join(QUOTES_DIR, file), 'utf-8');
    const obj = JSON.parse(raw);
    const { id, ...rest } = obj;
    quotes.push(rest);
  } catch (err) {
    console.error(`[SKIP] ${file}: ${err.message}`);
    parseErrors++;
  }
}

if (quotes.length === 0) {
  console.error('No valid quote files found.');
  process.exit(1);
}

console.log(`Inserting ${quotes.length} quotes...`);

const { error } = await supabase
  .from('quotes')
  .insert(quotes);

if (error) {
  console.error(`Supabase error: ${error.message}`);
  process.exit(1);
}

console.log(`\nDone. ${quotes.length} inserted, ${parseErrors} skipped.`);

if (parseErrors > 0) {
  process.exit(1);
}
