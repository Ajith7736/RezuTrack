import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import RHFInput from '@/components/ui/InputText'
import { ProfileProps, ResumeContentProps } from '@/types/types'
import CustomText from '@/components/ui/CustomText'

const PersonalDetails = ({ detail, indx, remove_personal, control }: {
    detail: {
        name: string;
        value: string;
    },
    indx: number,
    remove_personal: Function,
    control: Control<ProfileProps>
}) => {
    return (
        <View key={indx} className='flex relative gap-2'>
            <View className='flex flex-row justify-between'>
                <CustomText className='uppercase text-sm w-[50%] font-bold tracking-widest text-stone-500'>{detail.name}</CustomText>
                <Pressable className='w-[50%] flex items-end' onPress={() => {
                    remove_personal(indx)
                }}><Text className='text-sm text-end text-red-500 tracking-wider' >Remove</Text></Pressable>
            </View>

            <Controller
                control={control}
                name={`personaldetails.${indx}.value`}
                render={({ field: { onChange, value } }) => {
                    return <RHFInput value={value} onChange={onChange} />
                }}
            />
        </View>

    )
}

export default PersonalDetails