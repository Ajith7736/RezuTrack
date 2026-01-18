import { useUserData } from '@/context/UserDataContext'
import { delay } from '@/lib/customdelay'
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from 'expo-router'
import React from 'react'
import { Controller, Path, useForm } from "react-hook-form"
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from "zod"
import RHFRichEditor from '../domcomponents/RHFRichEditor'
import CustomText from '../ui/CustomText'
import RHFInput from '../ui/InputText'
import RHFDatePicker from '../ui/RHFDatePicker'
import SubmitButton from '../ui/SubmitButton'
import TitleBackButton from '../ui/TitleBackButton'

const Profile = () => {

    type ProfileInput = z.infer<typeof ProfileSchema>
    const { userdata, setuserdata } = useUserData();


    const ProfileSchema = z.object({
        fullname: z.string().min(1, "This field is required"),
        professionaltitle: z.string().min(1, "This field is required"),
        email: z.email("Invalid email address").min(1, "This field is required"),
        phonenumber: z.string().min(1, "This field is required"),
        address: z.string().min(1, "This field is required"),
        date: z.date('This field is required')
    })


    const { control, handleSubmit, formState: { isSubmitting }, watch } = useForm<ProfileInput>({
        defaultValues: userdata,
        resolver: zodResolver(ProfileSchema)
    })



    const onSubmit = async (data: any) => {
        await delay();
        console.log(data);
        setuserdata(data);
        router.back();
    }


    const PersonalContents: {
        label: string,
        name: Path<ProfileInput>,
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


    return (
        <SafeAreaView className='m-5 flex justify-between h-screen pb-14 gap-5'>
            <ScrollView contentContainerStyle={{
                display: 'flex',
                gap: 20
            }}>
                <TitleBackButton title="Profile" />
                {PersonalContents.map((content, indx) => {
                    return <View key={indx} className='flex gap-2'>

                        <CustomText className='uppercase text-sm font-bold tracking-widest text-stone-500'>{content.label}</CustomText>
                        <Controller
                            control={control}
                            name={content.name}
                            render={({ formState: { errors }, field: { onChange, value } }) => {
                                return <RHFInput placeholder={content.placeholder} errors={errors[content.name]?.message} value={value as string} onChange={onChange} />
                            }}
                        />
                    </View>
                })}

                <View className='flex gap-2'>
                    <CustomText className='uppercase text-sm font-bold tracking-widest text-stone-500'>Start Date</CustomText>
                    <Controller
                        control={control}
                        name={'date'}
                        render={({ formState: { errors }, field: { onChange, value } }) => {
                            return <RHFDatePicker onChange={onChange} value={value} errors={errors.date?.message} />
                        }}
                    />
                </View>

                <RHFRichEditor dom={{ scrollEnabled: false, cacheEnabled: true, matchContents: true }} />
            </ScrollView>

            <SubmitButton onPress={handleSubmit(onSubmit)}>{isSubmitting ? <View className='flex flex-row gap-5 items-center justify-center'><ActivityIndicator color={"white"} /><Text className='text-white tracking-widest font-semibold'>Submitting...</Text></View> : <Text className='text-white font-semibold tracking-widest  text-center'>Submit</Text>}</SubmitButton>
        </SafeAreaView>
    )
}

export default Profile

