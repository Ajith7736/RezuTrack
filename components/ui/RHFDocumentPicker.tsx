import { toast } from '@/lib/Toast/ToastUtility'
import clsx from 'clsx'
import * as DocumentPicker from 'expo-document-picker'
import { CloudUpload } from 'lucide-react-native'
import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'
import { colors } from './colors'

const RHFDocumentPicker = ({ onChange, errors }: { onChange: (...event: any[]) => void, errors: string | undefined }) => {

    const [currentFile, setcurrentFile] = useState<string>("")

    const handledocument = async () => {
        try {
            const { canceled, assets } = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true
            })


            if (canceled || !assets) {
                return
            }


            const localfile = await fetch(assets[0].uri);

            setcurrentFile(assets[0].name)

            const blob = await localfile.blob();



            const res = await fetch('/api/pdfextract', {
                method: 'POST',
                body: blob,
                headers: {
                    "Content-Type": "application/pdf"
                }
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            }


            onChange(data.text);


        } catch (err) {
            console.error(err)
        }

    }

    return (
        <Pressable onPress={handledocument} className={clsx('bg-slate-100 flex flex-row items-center justify-between px-3 h-12 w-full border  rounded-lg', errors ? 'border-red-500' : 'border-slate-200')}>
            <Text numberOfLines={1} ellipsizeMode='tail' className='text-slate-600 font-extrabold text-ellipsis  text-sm w-[80%] '>{currentFile ? currentFile : "Select Files"}</Text>
            <CloudUpload size={18} color={colors.tailwind.slate[600]} />
        </Pressable>
    )
}

export default RHFDocumentPicker