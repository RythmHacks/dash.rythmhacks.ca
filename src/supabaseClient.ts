import { createClient } from '@supabase/supabase-js'
import { Database } from './types/supabase';

const supabaseUrl:string = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey:string = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)