import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const resume = () => {
    const [currenttemplate, setcurrenttemplate] = useState<string>("")


    return (
        <SafeAreaView className='flex-1 bg-light-white dark:bg-dark-black relative'>
            <Text className='m-5 text-light-black dark:text-dark-white font-bold text-center'>Select Your Resume Template</Text>
            <View className="flex flex-row items-center justify-center">
                <Pressable className={`bg-light-gray/60 dark:bg-dark-gray h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border  ${currenttemplate === "Template1" ? "border-blue-500/30" : "border-light-activeborder/30"}`}
                    onPress={() => setcurrenttemplate("Template1")}
                >
                    <Text className="text-light-activeborder dark:text-dark-white text-sm">Template 1</Text>
                </Pressable>
                <Pressable className={`bg-light-gray/60 dark:bg-dark-gray h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border  ${currenttemplate === "Template2" ? "border-blue-500/30" : "border-light-activeborder/30"}`}
                    onPress={() => setcurrenttemplate("Template2")}
                >
                    <Text className="text-light-activeborder dark:text-dark-white text-sm">Template 2</Text>
                </Pressable>
            </View>
            <Pressable className="bg-blue-500 absolute bottom-10 right-10 px-6 py-4 rounded-lg flex flex-row justify-center items-center gap-2"
            onPress={() => {
                router.push("/(tabs)/home/resume")
            }}
            >
                <Text className="text-white">Continue</Text>
                <EvilIcons name="arrow-right" color={"white"} size={25}/>
            </Pressable>
        </SafeAreaView>
    )
}

export default resume

