import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/components/ui/colors'

const SocialCard = ({ fields , append}: {
    fields: {
        name: string,
        label: string,
        link: string
    }[], append: Function
}) => {


    const links = [
        'github', 'linkedin', 'website', 'search', 'gitbook', 'medium', 'orcid',
        'skype', 'bluesky', 'threads', 'x', 'discord', 'dribbble', 'behance',
        'stack overflow', 'gitlab', 'quora', 'facebook', 'instagram', 'wechat',
        'hugging face', 'kaggle', 'youtube', 'tiktok', 'signal', 'telegram'
    ]


    return (
        <>
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
        </>
    )
}

export default SocialCard

