import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://grjxuwsdqovezwslrqlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyanh1d3NkcW92ZXp3c2xycWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzE3NDcsImV4cCI6MjA3NDQ0Nzc0N30.jt4YymUAdV7JxX2Bepxb8HJ4rFKBYmEtv_Qf6tOglE4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
