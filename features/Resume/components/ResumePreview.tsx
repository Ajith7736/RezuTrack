import { Template1 } from '@/lib/Templates/Template1'
import { colors } from '@/ui/colors'
import { Ionicons } from '@expo/vector-icons'
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import React from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import { WebView } from "react-native-webview"

const ResumePreview = () => {

    const { width } = Dimensions.get("window");
    const A4_RATIO = 297 / 210; // A4 height/width ratio
    const webViewWidth = width - 40; // Account for margins
    const a4Height = webViewWidth * A4_RATIO;

    const handleshare = async () => {
        try {
            const { uri } = await Print.printToFileAsync({
                html: Template1,
                width: 595.28,
                height: 841.89,
                base64: false,
            })

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri)
            } else {
                alert("Something went wrong")
            }
        } catch (err) {
            console.error("Error getting pdf : ", err)
        }
    }

    return (
        <>
            <View className='absolute  h-screen-safe w-full items-center bg-light-activeborder/20 backdrop-blur-xs'>
                <Ionicons name='close' size={20} color={"black"} className='absolute right-6 top-16 bg-light-white p-2 rounded-md border border-light-activeborder/30'/>
                <View className="flex-1 flex-row items-center">
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: Template1 }}
                        style={{
                            flex: 1,
                            maxHeight: a4Height,
                            margin: 20,
                            borderWidth: 1,
                            borderColor: colors.light.activeBorder
                        }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                
                <Pressable className='p-5 text-light-white rounded-md bg-dark-hovergray m-10 w-32'>
                    <Text className='text-white text-center' onPress={handleshare}>Share</Text>
                </Pressable>
            </View>
        </>
    )
}

export default ResumePreview