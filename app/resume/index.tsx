import { colors } from "@/components/ui/colors";
import CustomText from "@/components/ui/CustomText";
import TitleBackButton from "@/components/ui/TitleBackButton";
import ToastComponent from "@/components/ui/toast";
import Toast from "@/components/ui/toast";
import { useContent } from "@/context/ContentContext";
import { useUserData } from "@/context/UserDataContext";
import ResumeButton from "@/features/Resume/components/ResumeButton";
import ResumePreview from "@/features/Resume/components/ResumePreview";
import { contentcard } from "@/lib/Contents/ContentCard";
import { contents } from "@/types/types";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link, router } from "expo-router";
import React, { useMemo, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Resume = () => {
    const { selectedcontents } = useContent();
    const BottomSheetRef = useRef<BottomSheetModal>(null)
    const { userdata } = useUserData();

    const handleexpand = () => {
        BottomSheetRef.current?.present()
    }

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
            icon: <MaterialCommunityIcons name="email-outline" size={18} color={colors.tailwind.stone[500]} />,
            value: userdata ? userdata.email : 'Email'
        }, {
            icon: <MaterialCommunityIcons name="phone-outline" size={18} color={colors.tailwind.stone[500]} />,
            value: userdata ? userdata.phonenumber : 'Phone Number'
        }, {
            icon: <Feather name="map-pin" size={18} color={colors.tailwind.stone[500]} />,
            value: userdata ? userdata.address : 'Address'
        }

    ]

    return (
        <SafeAreaView className='h-screen relative bg-white'>
            <ResumeButton onPress={handleexpand} />
            <ResumePreview Sheetref={BottomSheetRef} />

            <ScrollView>
                <TitleBackButton title="Resume" className="p-5" />
                <View style={styles.PersonalItem} className="flex flex-row justify-between items-start gap-4 m-5  py-6 px-5 rounded-lg">
                    <View className="flex gap-3">
                        <View>
                            <CustomText className="text-xl font-extrabold tracking-widest">{userdata ? <>{userdata.fullname}</> : <>Name</>}</CustomText>
                            <CustomText className="text-stone-700 italic">{userdata ? <>{userdata.professionaltitle}</> : <>Professional Title</>}</CustomText>
                        </View>
                        {profileitems.map((item) => <View key={item.value} className="text-sm flex flex-row gap-3">
                            <CustomText className="text-stone-800">{item.icon}</CustomText>
                            <CustomText>{item.value}</CustomText>
                        </View>)}
                    </View>

                    <Link href={{
                        pathname: "/resume/[content]",
                        params: { content: "profile" }
                    }}><View style={[{
                        elevation: 4,
                        padding: 7
                    }]} className="rounded-lg  bg-indigo-500"><Feather name="edit" size={17} color={"white"} /></View> </Link>
                </View>

                {/* Resume Content */}

                <View style={styles.carditem}>
                    {contentcards.map((content) => {
                        return selectedcontents.has(content.title) && <Pressable key={content.title} style={styles.shadow} className=" py-5 px-5 flex flex-row justify-between gap-2 items-center w-full rounded-md bg-stone-50 border border-stone-200">
                            <View className="flex flex-row w-[80%] items-center gap-3">
                                <Text className="">{content.icon}</Text>
                                <Text className="text-stone-700 font-bold text-sm uppercase tracking-widest w-full">{content.title}</Text>
                            </View>
                            <Entypo name="chevron-down" size={18} color={"#44403c"} />
                        </Pressable>
                    })}

                    {/* Content Add */}


                    <Pressable style={{
                        boxShadow: "0 3px 10px rgb(99, 102, 241,0.5)"
                    }} onPress={() => router.push("/resume/content")} className="bg-indigo-500 border-solid w-full rounded-[8px] p-5">
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
    },
    PersonalItem: {
        borderWidth: 1,
        borderColor: colors.tailwind.stone[200],
        backgroundColor: colors.tailwind.stone[50],
        boxShadow: "0 3px 10px rgb(0,0,0,0.06)"
    },
    shadow: {
        boxShadow: "0 3px 10px rgb(0,0,0,0.09)"
    }
})

export default Resume;