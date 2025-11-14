import { Template1 } from '@/lib/Templates/Template1'
import { Ionicons } from '@expo/vector-icons'
import * as Print from "expo-print"
import React, { useEffect, useState } from 'react'
import { Pressable, Text } from 'react-native'
import Pdf from "react-native-pdf"
import { SafeAreaView } from 'react-native-safe-area-context'

const ResumePreview = ({ setshowresume }: { setshowresume: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [Pdfuri, setPdfuri] = useState("")
    const [PdfSource, setPdfSource] = useState<string>("")

    useEffect(() => {
        generatePDF();
    }, []);

    const generatePDF = async () => {
        try {
            const { base64 } = await Print.printToFileAsync({
                html: Template1,
                width: 595,
                height: 842,
                base64: true,
            });

            const htmlContent = `data:application/pdf;base64,${base64}`;

            setPdfSource(htmlContent);

        } catch (err) {
            console.error(err);
        }
    };



    return (
        <SafeAreaView
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}
            className='flex-1 bg-light-white/20 items-center justify-between pt-16 pb-10'
        >
            <Pressable
                onPress={() => setshowresume(false)}
                className='absolute right-6 top-10 bg-white p-2 rounded-md'
            >
                <Ionicons name='close' size={24} color="black" />
            </Pressable>
            {PdfSource ? <>
                <Pdf
                    trustAllCerts={false}
                    source={{
                        uri: PdfSource,
                        cache: false
                    }}
                    style={{
                        width: 330,
                        height: 495,
                        marginTop : 30
                    }}
                    onLoadComplete={(numberofpages, filepath) => {

                    }}
                />
                <Pressable
                    className='p-4 border border-light-activeborder/20 rounded-md bg-dark-gray mt-6 w-40'
                >
                    <Text className='text-white text-center font-semibold'>Share PDF</Text>
                </Pressable>
            </> : <Text className='absolute text-light-black top-1/2 dark:text-dark-white'>Loading...</Text>}
        </SafeAreaView>
    )
}



export default ResumePreview