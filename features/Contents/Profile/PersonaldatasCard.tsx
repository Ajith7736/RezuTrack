import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/components/ui/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PersonaldatasCard = ({ details, append_personal }: {
    details: {
        name: string,
        value: string
    }[], append_personal: Function
}) => {

    const personaldetails = [
        'date of birth', 'nationality', 'passport or id', 'marital status',
        'military service', 'driving license', 'gender/pronoun', 'disability',
        'visa', 'height'
    ]

    return (
        <>
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
        </>
    )
}

export default PersonaldatasCard

const styles = StyleSheet.create({})