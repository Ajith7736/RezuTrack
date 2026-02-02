import { supabase } from "@/lib/supabase"

export default async function DeleteImage(path: string) {
    try {
        const { error } = await supabase.storage.from('Photos').remove([path]);


        if (error) {
            console.error(error)
            return { success: false, error }
        }

        return { success: true }
    } catch (error) {
        console.error(error)
    }
}