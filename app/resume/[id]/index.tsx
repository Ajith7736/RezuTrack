import { colors } from "@/components/ui/colors";
import CustomText from "@/components/ui/CustomText";
import Loading from "@/components/ui/Loading";
import TitleBackButton from "@/components/ui/TitleBackButton";
import { useContent } from "@/context/ContentContext";
import { useResumeContent } from "@/context/ResumeContentContext";
import ResumeButton from "@/features/Resume/components/ResumeButton";
import ResumePreview from "@/features/Resume/components/ResumePreview";
import { contentcard } from "@/lib/Contents/ContentCard";
import { supabase } from "@/lib/supabase";
import { toast } from "@/lib/Toast/ToastUtility";
import { contents, ResumeContentProps } from "@/types/types";
import { Entypo, Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Resume = () => {
    const { selectedcontents } = useContent();
    const [isSheetOpen, setisSheetOpen] = useState(false)
    const BottomSheetRef = useRef<BottomSheetModal>(null)
    const { ResumeContent, setResumeContent, setcurrentResumeId } = useResumeContent()
    const { id } = useLocalSearchParams();




    useEffect(() => {
        return () => {
            setResumeContent(null);
            setcurrentResumeId(null);
        }
    }, [])

    useEffect(() => {
        const backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isSheetOpen) {
                BottomSheetRef?.current?.dismiss();
                return true;
            }
            return false;
        })

        return () => backhandler.remove()
    }, [isSheetOpen])



    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['ResumeData'],
        queryFn: async () => {

            const { data, error } = await supabase.from('Resume').select('ResumeContent,name,template,Customization').eq('id', id as string).maybeSingle()

            if (error) {
                console.error(error.message);
                toast.error("Something went wrong!")
            }

            return { ResumeContent: data?.ResumeContent, template: data?.template, name: data?.name };
        },
        enabled: !!id,
    })

    useEffect(() => {
        setResumeContent(data?.ResumeContent as ResumeContentProps);
        setcurrentResumeId(id as string)
    }, [data])



    // console.log(JSON.stringify(data, null, 2));

    const handleexpand = () => {
        BottomSheetRef.current?.present();
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
            value: ResumeContent?.email && ResumeContent.email !== '' ? ResumeContent?.email : 'Email'
        }, {
            icon: <MaterialCommunityIcons name="phone-outline" size={18} color={colors.tailwind.stone[500]} />,
            value: ResumeContent?.phonenumber && ResumeContent.phonenumber !== '' ? ResumeContent?.phonenumber : 'Phone Number'
        }, {
            icon: <Feather name="map-pin" size={18} color={colors.tailwind.stone[500]} />,
            value: ResumeContent?.address && ResumeContent.address !== '' ? ResumeContent?.address : 'Address'
        }

    ]


    if (isLoading || isFetching) {
        return <Loading />
    }



    return (
        <SafeAreaView className='h-screen relative bg-slate-50'>
            {(!isLoading && !isFetching) && <ResumeButton onPress={handleexpand} />}
            <ResumePreview Sheetref={BottomSheetRef} setisSheetOpen={setisSheetOpen} />

            <ScrollView >
                <TitleBackButton title={data?.name} className="pb-5 pt-3 px-2" />
                <View style={{
                    margin: 10
                }}>
                    <View style={styles.PersonalItem} className="flex flex-row justify-between w-[98%] mx-auto items-start   py-6 px-5 rounded-lg">
                        <View className="flex gap-3 w-[90%]">
                            {ResumeContent?.profilepic && <View className='h-28 relative w-28 overflow-hidden  rounded-full flex items-center justify-center'>
                                <Image
                                    source={ResumeContent.profilepic}
                                    style={{
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    contentFit="cover"
                                    contentPosition={'center'}
                                />
                            </View>
                            }
                            <View>
                                <CustomText className="text-xl font-extrabold tracking-widest">{ResumeContent?.fullname && ResumeContent?.fullname !== '' ? ResumeContent?.fullname : <>Name</>}</CustomText>
                                <CustomText className="text-stone-700 italic">{ResumeContent?.professionaltitle && ResumeContent?.professionaltitle !== '' ? ResumeContent?.professionaltitle : <>Title</>}</CustomText>
                            </View>
                            {profileitems.map((item) => <View key={item.value} className="text-sm flex flex-row gap-3">
                                <CustomText className="text-stone-800">{item.icon}</CustomText>
                                <CustomText className="flex-1 flex-wrap w-full">{item.value}</CustomText>
                            </View>)}
                        </View>

                        <Link href={{
                            pathname: "/resume/[id]/[content]",
                            params: {
                                id: id as string,
                                content: "profile"
                            }
                        }}><View style={[{
                            elevation: 4,
                            padding: 9,
                            borderRadius: 8
                        }]} className="  bg-indigo-500"><Octicons name="pencil" size={20} color="white" /></View> </Link>
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
                        }} onPress={() => router.push(`/resume/${id}/content`)} className="bg-indigo-500 border-solid w-full rounded-[10px] p-4">
                            <View className="items-center justify-center w-full flex flex-row gap-2">
                                <Text><MaterialCommunityIcons name="plus" size={28} color={'white'} /></Text>
                                <Text className="text-white uppercase font-bold tracking-widest">Add Content</Text>
                            </View>
                        </Pressable>

                    </View>
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
        marginTop: 20,
        gap: 15
    },
    PersonalItem: {
        borderWidth: 1,
        borderColor: colors.tailwind.stone[200],
        boxShadow: "0 3px 10px rgb(0,0,0,0.04)"
    },
    shadow: {
        boxShadow: "0 3px 10px rgb(0,0,0,0.09)"
    }
})

export default Resume;