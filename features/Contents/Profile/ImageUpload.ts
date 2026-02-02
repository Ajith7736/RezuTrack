import { supabase } from "@/lib/supabase";
import { ImagePickerAsset } from "expo-image-picker";
import * as FileSystem from 'expo-file-system'

export async function ImageUpload(asset: ImagePickerAsset, id: string | undefined): Promise<{ success: boolean, url?: string, error?: any , path? : string }> {
    try {
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const arrayBuffer = await new Response(blob).arrayBuffer();

        const fileext = asset.uri.split('.').pop();

        const FileName = `ProfilePhoto_${Date.now()}_${id}.${fileext}`

        const filePath = `${id}/${FileName}`

        const { error } = await supabase.storage.from('Photos').upload(filePath, arrayBuffer, {
            contentType: `image/${fileext}`,
        })

        if (error) {
            return { success: false, error }
        }

        const { data: urldata, error: signederror } = await supabase.storage.from('Photos').createSignedUrl(filePath, 60 * 60 * 24 * 365);

        if (signederror) {
            return { success: false, error }
        }

        return { success: true, url: urldata.signedUrl , path : filePath }

    } catch (error) {
        console.error(error)
        return { success: false }
    }
}