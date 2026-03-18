import { createClient } from '@supabase/supabase-js';
import 'expo-sqlite/localStorage/install';
import { Database } from './database.types';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.startsWith('https://')
    ? process.env.EXPO_PUBLIC_SUPABASE_URL
    : 'https://lommrxllbefhqzhadfmx.supabase.co';

const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_KEY?.startsWith('sb_')
    ? process.env.EXPO_PUBLIC_SUPABASE_KEY
    : 'sb_publishable_ctFnhg30ouuO4TZyB1EyVw_LIgjMSoy';



export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})