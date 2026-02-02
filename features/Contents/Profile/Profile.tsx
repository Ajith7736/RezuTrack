import { colors } from '@/components/ui/colors'
import { useResumeContent } from '@/context/ResumeContentContext'
import { delay } from '@/lib/customdelay'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { ProfileProps } from '@/types/types'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, Path, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form"
import { ActivityIndicator, BackHandler, KeyboardAvoidingView, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '../../../components/ui/CustomText'
import RHFInput from '../../../components/ui/InputText'
import SubmitButton from '../../../components/ui/SubmitButton'
import TitleBackButton from '../../../components/ui/TitleBackButton'
import ImageOption from './ImageOption'
import PersonalDetails from './PersonalDetails'
import Links from './Links'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const Profile = () => {
    const [ModalVisible, setModalVisible] = useState(false)
    const [isSheetOpen, setisSheetOpen] = useState(false)
    const queryclient = useQueryClient();
    const BottomSheetRef = useRef<BottomSheetModal>(null)
    const [ShowUrl, setShowUrl] = useState<{
        name: string | null,
        show: boolean
    }>({
        name: null,
        show: false
    })
    const { ResumeContent, setResumeContent, currentResumeId } = useResumeContent();

    const { control, handleSubmit, formState: { isSubmitting }, watch , setValue } = useForm<ProfileProps>({
        defaultValues: ResumeContent ? {
            email: ResumeContent.email,
            fullname: ResumeContent.fullname,
            links: ResumeContent.links,
            phonenumber: ResumeContent.phonenumber,
            professionaltitle: ResumeContent.professionaltitle,
            profilepic: ResumeContent.profilepic,
            address: ResumeContent.address,
            personaldetails: ResumeContent.personaldetails
        } : undefined
    })

    const image = useWatch({
        control,
        name : 'profilepic'
    })
    

    const { append: append_personal, fields: details, remove: remove_personal } = useFieldArray({
        control,
        name: 'personaldetails'
    })

    const { append, remove, fields } = useFieldArray({
        control,
        name: 'links'
    })


    const personaldetails = [
        'date of birth', 'nationality', 'passport or id', 'marital status',
        'military service', 'driving license', 'gender/pronoun', 'disability',
        'visa', 'height'
    ]

    const links = [
        'github', 'linkedin', 'website', 'search', 'gitbook', 'medium', 'orcid',
        'skype', 'bluesky', 'threads', 'x', 'discord', 'dribbble', 'behance',
        'stack overflow', 'gitlab', 'quora', 'facebook', 'instagram', 'wechat',
        'hugging face', 'kaggle', 'youtube', 'tiktok', 'signal', 'telegram'
    ]


    const onSubmit: SubmitHandler<ProfileProps> = async (data) => {
        try {
            await delay();

            const { error } = await supabase.from('Resume').update({
                ResumeContent: data
            }).eq('id', currentResumeId as string)

            if (error) {
                toast.error('Couldnt Save')
                console.error(error.message)
                return
            }

            queryclient.invalidateQueries({
                queryKey: ['ResumeData']
            })

            setResumeContent(data);
            router.back();
        } catch (err) {
            console.error(err);
        }
    }


    const PersonalContents: {
        label: string,
        name: Path<ProfileProps>,
        placeholder: string
    }[] = [
            {
                label: "Full Name",
                name: "fullname",
                placeholder: "Full Name"
            },
            {
                label: "Professional Title",
                name: "professionaltitle",
                placeholder: "Professional Title"
            },
            {
                label: "Email",
                name: "email",
                placeholder: "Email"
            },
            {
                label: "Phone Number",
                name: "phonenumber",
                placeholder: "Phone Number"
            },
            {
                label: "Address",
                name: "address",
                placeholder: "Address"
            }
        ]


    const handleexpand = () => {
        BottomSheetRef.current?.present()
    }


    useEffect(() => {
        const event = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isSheetOpen) {
                BottomSheetRef.current?.dismiss();
                return true;
            }

            return false;
        })

        return () => {
            event.remove();
        }
    }, [isSheetOpen])


    return (
        <SafeAreaView className='h-screen relative bg-white'>

            <Controller
                control={control}
                name='profilepic.url'
                render={({ field: { onChange } }) => {
                    return <ImageOption path={image?.path} setValue={setValue} isSheetOpen={isSheetOpen} setisSheetOpen={setisSheetOpen} BottomSheetRef={BottomSheetRef} onChange={onChange} />
                }}
            />

            <View style={{
                height: '94%'
            }}>

                <KeyboardAvoidingView
                    behavior='height'
                    keyboardVerticalOffset={10}

                >
                    <ScrollView>
                        <View
                            style={{
                                display: 'flex',
                                gap: 20,
                                margin: 20,
                                paddingBottom: 50
                            }}
                        >

                            <TitleBackButton title="Profile" />
                            <CustomText className='uppercase w-full text-center font-bold tracking-widest text-slate-500'>Photo</CustomText>

                            <View className='flex gap-3 w-full items-center justify-center'>


                                <Pressable onPress={() => handleexpand()} className='h-32 relative w-32 bg-stone-200 rounded-full flex items-center justify-center'>

                                    <View className='h-32 relative w-32 overflow-hidden bg-slate-100 rounded-full flex items-center justify-center'>
                                        {image?.url ? <>
                                            <Image
                                                source={image?.url}
                                                style={{
                                                    height: '100%',
                                                    width: '100%'
                                                }}
                                                contentFit="cover"
                                                contentPosition={'center'}
                                            />

                                        </>
                                            :
                                            <FontAwesome name="user" size={54} color="white" />
                                        }

                                    </View>
                                    <TouchableOpacity onPress={() => handleexpand()} className='absolute bg-white h-8 w-8 rounded-full bottom-0 right-0  z-50 flex items-center justify-center'>
                                        <FontAwesome name="camera" size={15} color="black" className='' />
                                    </TouchableOpacity>
                                </Pressable>
                            </View>

                            {PersonalContents.map((content, indx) => {
                                return <View key={indx} className='flex gap-2'>

                                    <CustomText className='uppercase text-sm font-bold tracking-widest text-slate-500'>{content.label}</CustomText>
                                    <Controller
                                        control={control}
                                        name={content.name}
                                        render={({ field: { onChange, value } }) => {
                                            return <RHFInput placeholder={content.placeholder} value={value as string} onChange={onChange} />
                                        }}
                                    />
                                </View>
                            })}

                            {details.map((detail, indx) => {
                                return <PersonalDetails detail={detail} key={detail.name} indx={indx} control={control} remove_personal={remove_personal} />
                            })}

                            {fields.map((link, indx) => {
                                return <Links key={link.name} ShowUrl={ShowUrl} control={control} indx={indx} link={link} remove={remove} setShowUrl={setShowUrl} />
                            })}


                            <Text className=' text-sm uppercase font-bold tracking-widest text-slate-700'>Add Details</Text>
                            <Text className=' text-xs uppercase font-bold tracking-widest text-slate-700'>Personal Details</Text>

                            <View className='flex flex-row flex-wrap gap-3'>
                                {personaldetails.map((detail) => {
                                    return <Pressable key={detail} style={{
                                        backgroundColor: colors.tailwind.slate[50],
                                        width: 'auto',
                                        padding: 4,
                                        borderWidth: 1,
                                        borderColor: colors.tailwind.slate[200],
                                        borderRadius: 5
                                    }} onPress={() => {

                                        const exists = details.some((item) => item.name === detail)

                                        if (exists) return

                                        append_personal({
                                            name: detail,
                                            value: ''
                                        })
                                    }} >
                                        <View className='text-sm font-semibold flex flex-row items-center gap-1'><MaterialCommunityIcons name='plus' size={17} /><Text className='text-xs'>{detail}</Text></View>
                                    </Pressable>
                                })}

                            </View>
                            <Text className=' text-xs uppercase font-bold tracking-widest text-slate-700'>Links / Socials</Text>

                            <View className='flex flex-row gap-4 flex-wrap'>
                                {links.map((link) => {
                                    return <Pressable key={link} style={{
                                        backgroundColor: colors.tailwind.slate[50],
                                        width: 'auto',
                                        padding: 4,
                                        borderWidth: 1,
                                        borderColor: colors.tailwind.slate[200],
                                        borderRadius: 5
                                    }} onPress={() => {
                                        const exist = fields.some((field) => field.name === link)

                                        if (exist) return

                                        append({
                                            label: '',
                                            name: link,
                                            link: ''
                                        })
                                    }} >
                                        <View className='text-sm font-semibold flex flex-row items-center gap-1'><MaterialCommunityIcons name='plus' size={17} /><Text className='text-xs'>{link}</Text></View>
                                    </Pressable>
                                })}
                            </View>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>
            </View>



            <SubmitButton className='mx-5' onPress={handleSubmit(onSubmit)}>{isSubmitting ? <View className='flex flex-row gap-2 items-center justify-center'><ActivityIndicator color={"white"} /><Text className='text-white tracking-widest font-semibold'>Saving...</Text></View> : <View className='flex flex-row justify-center gap-2 items-center'><MaterialCommunityIcons name='check' color={'white'} size={17} /><Text className='text-white font-semibold tracking-widest  text-center'>Save</Text></View>}</SubmitButton>
        </SafeAreaView>
    )
}

export default Profile

