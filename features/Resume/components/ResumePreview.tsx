import { colors } from '@/components/ui/colors'
import { useUserData } from '@/context/UserDataContext'
import { Template1 } from '@/lib/Templates/Template1'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Directory, File, Paths } from 'expo-file-system'
import * as FileSystem from 'expo-file-system/legacy'
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import React, { RefObject, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import Pdf from 'react-native-pdf'

const ResumePreview = ({ Sheetref }: { Sheetref: RefObject<BottomSheetModal | null> }) => {
    const [Pdfdata, setPdfdata] = useState<{
        uri: string | null,
        base64: string | null | undefined
    }>({
        uri: null,
        base64: null
    })
    const { userdata } = useUserData()
    const [numberofPages, setnumberofPages] = useState<number | null>(null)
    const [currentPage, setcurrentPage] = useState<number | null>(null)



    useEffect(() => {
        const timeout = setTimeout(() => {
            generatePDF();
        }, 500);

        return () => clearTimeout(timeout);
    }, [Template1,userdata]);

    const generatePDF = async () => {
        try {
            const { uri, base64 } = await Print.printToFileAsync({
                html: Template1(userdata),
                width: 595,
                height: 842,
                base64: true,
            });

            setPdfdata({
                uri,
                base64
            })


        } catch (err) {
            console.error(err);
        }
    };

    const handleShare = async () => {
        try {
            if (!Pdfdata.uri) {
                return console.error("uri not found");
            }

            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                console.warn("Sharing is not Available on this device")
                return;
            }

            await Sharing.shareAsync(Pdfdata.uri);

        } catch (err) {
            console.error(err);
        }
    }

    const handleDownload = async () => {
        try {
            const filename = `${Pdfdata.uri?.split("/")[Pdfdata.uri.split("/").length - 1]}`

            const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (!permission.granted) {
                console.log("permission not granted by the user")
                return;
            }

            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri, filename, "application/pdf")

            await FileSystem.writeAsStringAsync(fileUri, Pdfdata.base64 as string, { encoding: FileSystem.EncodingType.Base64 })

            Sheetref.current?.close();

        } catch (err) {
            console.error(err);
        }
    }


    const BackDropComponent = (props: any) => {
        return <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1}   {...props} />
    }


    return (
        <BottomSheetModal
            ref={Sheetref}
            index={1}
            snapPoints={["85%"]}
            backgroundStyle={{
                backgroundColor: colors.tailwind.stone[50],
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 35,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.tailwind.stone[700],
                shadowRadius: 10,
                width: "10%"
            }}
            enablePanDownToClose={true}
            backdropComponent={BackDropComponent}
        >
            <BottomSheetScrollView className='p-30' contentContainerStyle={{
                display: "flex",
                alignItems: "center",
                gap: "15",
                height: "100%"
            }}>
                <Text className='text-center stroke-stone-200 mt-5 text-lg uppercase tracking-widest font-extrabold'>Preview</Text>

                <Text className='text-xs'>{currentPage ?? ""} / {numberofPages ?? ''}</Text>

                {Pdfdata &&
                    <Pdf
                        source={{ uri: Pdfdata.uri ?? '', cache: true }}
                        style={{
                            width: 340,
                            height: 476,
                            borderWidth: 1,
                            borderColor: colors.tailwind.neutral[200],
                            borderRadius: 8,
                        }}
                        enableDoubleTapZoom
                        enablePaging
                        scrollEnabled
                        fitPolicy={0}
                        onLoadComplete={(Pages: any) => {
                            setnumberofPages(Pages)
                        }}
                        onPageChanged={(current: any) => {
                            setcurrentPage(current)
                        }}
                    />
                }
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 15
                }}>
                    <Pressable style={{
                        boxShadow: "0 3px 10px rgb(0,0,0,0.12)"
                    }}
                        onPress={handleDownload}>
                        <Text style={{
                            color: "black",
                            backgroundColor: "white",
                            paddingHorizontal: 30,
                            paddingVertical: 16,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: colors.tailwind.stone[300]
                        }} className='font-extrabold tracking-widest uppercase'>Download PDF</Text>
                    </Pressable>
                    <Pressable style={{
                        boxShadow: "0 3px 10px rgb(0,0,0,0.12)"
                    }}
                        onPress={handleShare}>
                        <Text style={{
                            color: "white",
                            backgroundColor: colors.tailwind.stone[900],
                            paddingHorizontal: 40,
                            paddingVertical: 16,
                            borderRadius: 8,

                        }} className='font-extrabold tracking-widest uppercase'>Share PDF</Text>
                    </Pressable>
                </View>


            </BottomSheetScrollView>
        </BottomSheetModal>
    )
}



export default ResumePreview