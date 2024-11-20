// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Log to check if variables are loaded
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_KEY:', SUPABASE_KEY);

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase URL or Key is missing in the environment variables");
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
