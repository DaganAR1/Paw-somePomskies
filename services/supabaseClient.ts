import { createClient } from '@supabase/supabase-js';

const DEFAULT_URL = 'https://ohzlzeczotyqqyogkxdb.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oemx6ZWN6b3R5cXF5b2dreGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzkwNzgsImV4cCI6MjA4NzM1NTA3OH0.U065g4i8YvIT5vQhYDMhS2iXzfWLYn-AuSrm_ZWkdR8';

const getEnv = (name: string): string | undefined => {
  try {
    const val = import.meta.env[name];
    if (typeof val === 'string' && val !== 'undefined' && val !== 'null' && val.trim() !== '') {
      return val;
    }
  } catch (e) {}
  return undefined;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || DEFAULT_URL;
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || DEFAULT_KEY;

// Final URL validation
let finalUrl = DEFAULT_URL;
try {
  if (supabaseUrl.startsWith('http')) {
    new URL(supabaseUrl);
    finalUrl = supabaseUrl;
  }
} catch (e) {}

export const supabase = createClient(finalUrl, supabaseAnonKey);
