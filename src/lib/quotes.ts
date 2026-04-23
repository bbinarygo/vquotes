import fs from 'fs';
import path from 'path';
import { Quote } from '@/types/quote';

const QUOTES_DIR = path.join(process.cwd(), 'quotes');

export function getAllQuotes(): Quote[] {
  const files = fs.readdirSync(QUOTES_DIR).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(QUOTES_DIR, file), 'utf-8');
    return JSON.parse(content) as Quote;
  });
}

export function getQuoteById(id: string): Quote | undefined {
  return getAllQuotes().find(q => q.id === id);
}
