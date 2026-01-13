import { colors } from "@/components/ui/colors";
import CustomText from "@/components/ui/CustomText";
import { useContent } from "@/context/ContentContext";
import { useUserData } from "@/context/UserDataContext";
import ResumeButton from "@/features/Resume/components/ResumeButton";
import ResumePreview from "@/features/Resume/components/ResumePreview";
import { contentcard } from "@/lib/Contents/ContentCard";
import { contents } from "@/types/types";
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useColorScheme } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Resume = () => {
    const { colorScheme } = useColorScheme()
    const [showresume, setshowresume] = useState<boolean>(false)
    const { selectedcontents } = useContent();

    const contentcards: contents[] = useMemo(() => {
        return contentcard.map((item) => {
            return {
                title: item.title,
                icon: React.cloneElement(item.icon, { size: 28 })
            }
        })
    }, [])

    const profileitems = [
        {
            icon: <MaterialCommunityIcons name="email-outline" size={18} color={"blue"} />,
            value: "ajith.aju39502@gmail.com"
        }, {
            icon: <MaterialCommunityIcons name="phone-outline" size={18} color={"blue"} />,
            value: "+91 7736696075"
        }, {
            icon: <Feather name="map-pin" size={18} color={"blue"} />,
            value: "Palakkad,Kerala,India"
        }

    ]

    return (
        <SafeAreaView className='flex-1 relative bg-light-white dark:bg-dark-black'>
            <ResumeButton showresume={showresume} setshowresume={setshowresume} />
            {
                showresume && <>
                    <ResumePreview setshowresume={setshowresume} />
                </>
            }
            <ScrollView>
                <View className="flex flex-row items-center p-5 gap-4">
                    <Link href={"/home/templates"}><Ionicons name="arrow-back" size={25} color={colorScheme === "light" ? colors.light.black : colors.dark.white} /></Link>
                    <Text className=' text-black dark:text-white font-bold text-2xl'>Resume</Text>
                </View>

                <View className="flex flex-row shadow-md  justify-between items-start gap-4 m-5 bg-stone-50 border border-gray-200 border-dotted p-6 rounded-lg">
                    <View className="flex gap-3">
                        <View>
                            <CustomText className="text-xl font-extrabold tracking-widest">Ajith P</CustomText>
                            <CustomText className="text-stone-700 dark:text-dark-activeborder italic">Full Stack Developer</CustomText>
                        </View>
                        {profileitems.map((item) => <View key={item.value} className="text-sm flex flex-row gap-3">
                            <CustomText className="text-stone-800">{item.icon}</CustomText>
                            <CustomText>{item.value}</CustomText>
                        </View>)}
                    </View>

                    <Link href={{
                        pathname: "/resume/[content]",
                        params: { content: "profile" }
                    }}><View className="rounded-full p-2 bg-indigo-500"><Feather name="edit" size={17} color={"white"} /></View> </Link>
                </View>

                {/* Resume Content */}

                <View style={styles.carditem}>
                    {contentcards.map((content) => {
                        return selectedcontents.has(content.title) && <Pressable key={content.title} className="shadow-md py-5 px-5 flex flex-row justify-between gap-2 items-center w-full rounded-md bg-stone-50 border border-stone-200">
                            <View className="flex flex-row w-[80%] items-center gap-3">
                                <Text className="text-indigo-500">{content.icon}</Text>
                                <Text className="text-stone-700 font-bold text-sm uppercase tracking-widest w-full">{content.title}</Text>
                            </View>
                            <Entypo name="chevron-down" size={18} color={"#44403c"} />
                        </Pressable>
                    })}

                    {/* Content Add */}


                    <Pressable onPress={() => router.push("/resume/content")} className="bg-indigo-500 shadow-lg shadow-indigo-600 border-solid w-full rounded-[8px] p-5">
                        <View className="items-center justify-center w-full flex flex-row gap-2">
                            <Text><MaterialCommunityIcons name="plus" size={19} color={'white'} /></Text>
                            <Text className="text-white uppercase font-bold tracking-widest">Add Content</Text>
                        </View>
                    </Pressable>

                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    carditem: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        margin: 20,
        gap: 15
    }
})

export default Resume;