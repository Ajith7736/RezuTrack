import { UseTemplate } from "@/context/TemplateContext";
import { EvilIcons, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {  FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";


const Resume = () => {

    const { currenttemplate, setcurrenttemplate } = UseTemplate();


    const handletemplate = (Template: string) => {
        setcurrenttemplate(Template)
    }



    useEffect(() => {
        setcurrenttemplate("")
    }, [])



    return (
        <SafeAreaView className='h-screen-safe bg-light-white dark:bg-dark-black relative'>
            <Text className='m-5 tracking-widest uppercase font-extrabold text-center'>Select Template</Text>
            <View className="flex flex-row items-center justify-center">
                {['Template 1', 'Template 2'].map((item, indx) => {
                    return <Pressable key={indx} className={`bg-stone-100 dark:bg-dark-gray h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border  ${currenttemplate === item ? "border-blue-500/30" : "border-light-activeborder/30"}`}
                        onPress={() => handletemplate(item)}
                    >
                        <Text className="text-stone-400 dark:text-dark-white text-sm uppercase tracking-widest w-full text-center font-bold">{item}</Text>
                    </Pressable>
                })}
            </View>
            {currenttemplate &&  <Animated.View entering={FadeIn} exiting={FadeOut} className={"absolute bottom-20 right-10"}><Pressable className="bg-indigo-500 py-4 w-[10rem] rounded-md flex flex-row justify-center items-center gap-2 transition-all duration-300"
                onPress={() => {
                    router.push("/resume")
                }}
            >
                <Text className="text-white font-extrabold tracking-widest uppercase">Continue</Text>
                <FontAwesome6 name="angle-right" color={"white"} size={15} />
            </Pressable>
            </Animated.View>}
           
        </SafeAreaView>
    )
}

export default Resume

