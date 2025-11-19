import { Template1 } from '@/lib/Templates/Template1'
import { Ionicons } from '@expo/vector-icons'
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import Pdf from "react-native-pdf"
import { SafeAreaView } from 'react-native-safe-area-context'

const ResumePreview = ({ setshowresume }: { setshowresume: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [Pdfuri, setPdfuri] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            generatePDF();
        }, 500);

        return () => clearTimeout(timeout);
    }, [Template1]);

    const generatePDF = async () => {
        try {
            const { uri, base64 } = await Print.printToFileAsync({
                html: Template1,
                width: 595,
                height: 842,
                base64: true,
            });

            setPdfuri(uri)


        } catch (err) {
            console.error(err);
        }
    };

    const handleShare = async () => {
        try {
            if (!Pdfuri) {
                return console.error("uri not found");
            }

            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                console.warn("Sharing is not Available on this device")
                return;
            }

            await Sharing.shareAsync(Pdfuri);

        } catch (err) {
            console.error(err);
        }
    }



    return (
        <SafeAreaView
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}
            className='flex-1 bg-light-hoverblack/5 dark:bg-dark-white/5  items-center justify-center pt-16 pb-10'
        >
            <Pressable
                onPress={() => setshowresume(false)}
                className='absolute right-6 top-10 bg-white p-2 rounded-md'
            >
                <Ionicons name='close' size={24} color="black" />
            </Pressable>
            {Pdfuri !== "" ? <>
                <Pdf
                    trustAllCerts={false}
                    source={{
                        uri: Pdfuri,
                        cache: false
                    }}
                    style={{
                        width: 305,
                        height: 430
                    }}
                />
                <Pressable
                    className='p-4 border border-light-activeborder/20 rounded-md bg-dark-gray mt-6 w-40'
                    onPress={handleShare}
                >
                    <Text className='text-white text-center font-semibold'>Share PDF</Text>
                </Pressable>
            </> : <Text className='absolute text-light-black top-1/2 dark:text-dark-white'><ActivityIndicator color={"white"}/></Text>}
        </SafeAreaView>
    )
}



export default ResumePreview