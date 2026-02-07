import { DocumentPickerAsset } from "expo-document-picker";
import { supabase } from "./supabase";


export async function PdfUpload(assets: DocumentPickerAsset[], id: string) {
    const file = assets[0].file;

    const filename = assets[0].uri.split('/').pop();

    console.log(filename)

    const { data, error } = await supabase.storage.from("Resumes").upload(`${id}/${Date()}_${filename}`, file!, {
        cacheControl: '3600',
        upsert: true,
        contentType : "application/pdf"
    })

    console.log(data);

}