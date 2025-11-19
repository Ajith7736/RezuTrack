import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '../ui/CustomText'
import InputText from '../ui/InputText'
import SubmitButton from '../ui/SubmitButton'

const Profile = () => {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            fullname: "",
            professionaltitle: ""
        }
    })

    const delay = () => new Promise(resolve => setTimeout(resolve, 1000))

    const onSubmit = async (data: any) => {
        await delay();
        console.log(data);
    }

    return (
        <SafeAreaView className='m-5 flex gap-5'>
            <CustomText className='text-2xl font-extrabold'>Edit Personal Details</CustomText>
            <CustomText className='text-lg font-semibold'>Full Name</CustomText>
            <Controller
                control={control}
                name='fullname'
                rules={{
                    required: true
                }}
                render={({ field: { onChange, value } }) => {
                    return <InputText placeholder='Enter your full name' value={value} onChange={onChange} />
                }}
            />
            <CustomText className='text-lg font-semibold'>Professional Title</CustomText>
            <Controller
                control={control}
                name='professionaltitle'
                rules={{
                    required: true
                }}
                render={({ field: { onChange, value } }) => {
                    return <InputText placeholder='Enter your professional title' value={value} onChange={onChange} />
                }}
            />
            <SubmitButton onPress={handleSubmit(onSubmit)}>{isSubmitting ? <View  className='animate-spin'><ActivityIndicator color={"black"} /></View> : <>Submit</>}</SubmitButton>
        </SafeAreaView>
    )
}

export default Profile

