import { colors } from "@/components/ui/colors";
import CustomText from "@/components/ui/CustomText";
import ResumePreview from "@/features/Resume/components/ResumePreview";
import { contents } from "@/types/types";
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Resume = () => {
    const [showresume, setshowresume] = useState<boolean>(false)
    const { colorScheme } = useColorScheme()
    const iconColor = colorScheme === "light" ? colors.light.black : colors.dark.white
    const contents: contents[] = [
        {
            icon: <Ionicons name="person" size={28} color={iconColor} />,
            title: "Profile"
        },
        {
            icon: <Entypo name="graduation-cap" size={28} color={iconColor} />,
            title: "Education"
        },
        {
            icon: <MaterialCommunityIcons name="briefcase" size={28} color={iconColor} />,
            title: "Experience"
        },
        {
            icon: <MaterialCommunityIcons name="trophy" size={28} color={iconColor} />,
            title: "Skills"
        }
    ];

    const profileitems = [
        {
            icon: <EvilIcons name="envelope" size={20} color={iconColor} />,
            value: "ajith.aju39502@gmail.com"
        }, {
            icon: <Feather name="phone" size={15} color={iconColor} />,
            value: "+91 7736696075"
        }, {
            icon: <EvilIcons name="location" size={20} color={iconColor} />,
            value: "Palakkad,Kerala,India"
        }

    ]

    return (
        <SafeAreaView className='flex-1 relative bg-light-white dark:bg-dark-black'>
            <View className="flex flex-row items-center p-5 gap-4">
                <Link href={"/home/templates"}><Ionicons name="arrow-back" size={25} color={colorScheme === "light" ? colors.light.black : colors.dark.white} /></Link>
                <Text className=' text-black dark:text-white font-bold text-2xl'> Resume</Text>
            </View>

            <View className="flex flex-row justify-between items-start gap-4 m-5 bg-dark-gray p-6 border border-light-activeborder/20 rounded-md">
                <View className="flex gap-3">
                    <View>
                        <CustomText className="text-xl font-bold">Ajith P</CustomText>
                        <CustomText className="text-light-activeborder dark:text-dark-activeborder italic">Full Stack Developer</CustomText>
                    </View>
                    {profileitems.map((item) => <View key={item.value} className="text-sm flex flex-row gap-3">
                        <CustomText>{item.icon}</CustomText>
                        <CustomText>{item.value}</CustomText>
                    </View>)}
                </View>

                <Link href={{
                    pathname : "/resume/[content]",
                    params : { content : "profile"}
                }}><CustomText className="bg-light-white dark:bg-dark-black p-2 rounded-full"><Feather name="edit" size={17} color={iconColor} /></CustomText> </Link>
            </View>

            {/* Resume Show button */}

            <Pressable className=' dark:bg-dark-inputfield bg-light-inputfield p-5 border border-light-activeborder/20 transition-all w-[60px] flex justify-center items-center absolute bottom-10 left-5 ease-in-out duration-300 rounded-md' onPress={() => setshowresume(!showresume)}>
                <MaterialCommunityIcons name="file-search-outline" size={24} color={colorScheme === "light" ? colors.light.black : colors.dark.white} />
            </Pressable>

            {/* Resume Content */}

            <View style={styles.carditem}>
                {contents.map((content) => {
                    return <Pressable key={content.title} className="px-6 py-6 flex gap-2 items-center w-32 rounded-md border border-light-activeborder/20">
                        {content.icon}
                        <Text className="dark:text-white font-bold text-sm">{content.title}</Text>
                    </Pressable>
                })}

                {/* Content Add */}

                <Pressable onPress={() => router.push("/resume/content")} className="flex items-center justify-center border border-light-activeborder/20 w-32 border-dashed rounded-md">
                    <Ionicons name="add" size={25} color={iconColor} />
                </Pressable>
            </View>

            {/* Resume Preview */}

            {
                showresume && <>
                    <ResumePreview setshowresume={setshowresume} />
                </>
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    carditem: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 20,
        gap: 15
    }
})

export default Resume;