import { createClient } from '@supabase/supabase-js';
import 'expo-sqlite/localStorage/install';
import { Database } from './database.types';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})