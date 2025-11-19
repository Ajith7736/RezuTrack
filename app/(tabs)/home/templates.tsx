import { UseTemplate } from "@/context/TemplateContext";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";


const resume = () => {

    const buttonopacity = useSharedValue(0);

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: buttonopacity.value
        }
    })

    const changeopacity = () => {
        buttonopacity.value = withTiming(1, { duration: 200 })
    }

    const handletemplate = (Template : string) => {
        setcurrenttemplate(Template)
        changeopacity()
    }


    const { currenttemplate, setcurrenttemplate } = UseTemplate();

    useEffect(() => {
      setcurrenttemplate("")
    }, [])

    

    return (
        <SafeAreaView className='flex-1 bg-light-white dark:bg-dark-black relative'>
            <Text className='m-5 text-light-black dark:text-dark-white font-bold text-center'>Select Your Resume Template</Text>
            <View className="flex flex-row items-center justify-center">
                <Pressable className={`bg-light-gray/60 dark:bg-dark-gray h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border  ${currenttemplate === "Template1" ? "border-blue-500/30" : "border-light-activeborder/30"}`}
                    onPress={() => handletemplate("Template1")}
                >
                    <Text className="text-light-activeborder dark:text-dark-white text-sm ">Template 1</Text>
                </Pressable>
                <Pressable className={`bg-light-gray/60 dark:bg-dark-gray h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border  ${currenttemplate === "Template2" ? "border-blue-500/30" : "border-light-activeborder/30"}`}
                    onPress={() => handletemplate("Template2")}
                >
                    <Text className="text-light-activeborder dark:text-dark-white text-sm">Template 2</Text>
                </Pressable>
            </View>
            {currenttemplate !== "" && <Animated.View style={opacity} className={"absolute bottom-10 right-10"}><Pressable className="bg-blue-500 px-6 py-4 rounded-lg flex flex-row justify-center items-center gap-2 transition-all duration-300"
                onPress={() => {
                    router.push("/resume")
                }}
            >
                <Text className="text-white">Continue</Text>
                <EvilIcons name="arrow-right" color={"white"} size={25} />
            </Pressable>
            </Animated.View>}
        </SafeAreaView>
    )
}

export default resume

