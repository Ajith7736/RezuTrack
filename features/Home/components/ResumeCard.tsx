import { colors } from '@/components/ui/colors'
import { ResumeData, Setter } from '@/types/types'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, TextInputSubmitEditingEvent, View } from 'react-native'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const ResumeCard = ({ resume, refetch, showoptions, setshowoptions }: { resume: ResumeData, refetch: Function, showoptions: { id: string | null, show: boolean }, setshowoptions: Setter<{ id: string | null, show: boolean }> }) => {

    const queryclient = useQueryClient();
    const [resumeName, setresumeName] = useState(resume.name);
    const [editResume, seteditResume] = useState<{
        id: string | null,
        show: boolean
    }>({
        show: false,
        id: null
    })



    const handledelete = async () => {
        const { error } = await supabase.from('Resume').delete().eq('id', resume.id);

        if (error) {
            console.error(error.message)
            toast.error(error.message)
        }
        queryclient.invalidateQueries({
            queryKey: ['Resumes']
        })
        refetch();
    }

    const handleoptions = () => {
        if (resume.id !== showoptions.id) {
            setshowoptions({
                id: resume.id,
                show: true
            })
        } else {
            setshowoptions({
                id: resume.id,
                show: !showoptions.show
            })
        }

    }

    const handleEdit = async (e: TextInputSubmitEditingEvent) => {

        const name = e.nativeEvent.text;

        const { error } = await supabase.from('Resume').update({
            name
        }).eq('id', resume.id)

        if (error) {
            console.error(error.message);
            toast.error(error.message)
        }

        queryclient.invalidateQueries({
            queryKey: ['Resumes']
        })

        refetch();

        seteditResume({
            id: null,
            show: false
        })
    }


    return (
        <View key={resume.id} className="flex relative gap-2  m-4  w-[11rem]">
            <Pressable style={{
                borderWidth: 1,
                borderColor: colors.tailwind.stone[200],
                borderRadius: 5
            }} onPress={() => router.push(`/resume/${resume.id}`)} className="bg-stone-100 h-[15rem] w-full  flex justify-center items-center">
                <Image
                    source={require('@/assets/images/resume1.webp')}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 5
                    }}
                    contentFit="cover"
                    contentPosition={'center'}
                />
            </Pressable>
            <View className="w-full flex flex-row">
                <View className="w-[90%]">
                    {editResume.id === resume.id && editResume.show ? <TextInput
                        style={{
                            color: 'black',
                            fontSize: 10
                        }}
                        value={resumeName}
                        onChange={(e) => setresumeName(e.nativeEvent.text)}
                        onSubmitEditing={(e) => handleEdit(e)}
                        placeholderTextColor={"#a8a29e"}
                        className={clsx('py-[3px] placeholder:font-medium tracking-widest border-b border-b-stone-400 bg-stone-50')} /> : <Text className="tracking-widest text-xs">{resumeName}</Text>}
                    <Text className=" text-[8px] italic">Created At : {new Date(resume.createdAt).toDateString()}</Text>
                </View>
                <Pressable className="w-[10%]" onPress={handleoptions}>
                    <Entypo name="dots-three-vertical" />
                </Pressable>
            </View>

            {(showoptions.id === resume.id && showoptions.show) &&
                <>
                    <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute w-[90%] -bottom-[68px] shadow-sm z-20 right-0 rounded-md bg-stone-50 border border-stone-200">
                        <Pressable className="p-2 flex flex-row gap-2 items-center w-full border-b border-stone-100" onPress={() => {
                            seteditResume({
                                id: resume.id,
                                show: true
                            });
                            setshowoptions({
                                id: null,
                                show: false
                            });
                        }}>
                            <MaterialCommunityIcons name="pencil-outline" size={15} color="black" />
                            <Text className="text-stone-500 tracking-widest text-sm font-bold w-full">Rename</Text>
                        </Pressable>
                        <Pressable className="p-2 flex flex-row gap-2 items-center w-full" onPress={handledelete}>
                            <MaterialCommunityIcons name="delete-outline" size={15} color="red" />
                            <Text className=" text-red-500 text-sm font-semibold tracking-widest w-full">Delete</Text>
                        </Pressable>
                    </Animated.View>
                </>
            }
        </View>
    )
}

export default ResumeCard

