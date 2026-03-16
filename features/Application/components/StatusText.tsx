import { colors } from '@/components/ui/colors'
import { delay } from '@/lib/customdelay'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { Status } from '@/types/types'
import { QueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

const StatusText = ({ text, id, refetch }: { text: Status, id: string, refetch: Function }) => {

    const variants = {
        "Applied": {
            color: colors.tailwind.indigo[500],
            bg: colors.tailwind.indigo[50],
            border: colors.tailwind.indigo[200]
        },
        "Pending": {
            color: colors.tailwind.amber[500],
            bg: colors.tailwind.amber[50],
            border: colors.tailwind.amber[200]
        },
        "Interviewing": {
            color: colors.tailwind.purple[500],
            bg: colors.tailwind.purple[50],
            border: colors.tailwind.purple[200]
        },
        "No_Response": {
            color: colors.tailwind.slate[500],
            bg: colors.tailwind.slate[50],
            border: colors.tailwind.slate[200]
        },
        "Rejected": {
            color: colors.tailwind.red[500],
            bg: colors.tailwind.red[50],
            border: colors.tailwind.red[200]
        },
        "Offer": {
            color: colors.tailwind.emerald[500],
            bg: colors.tailwind.emerald[50],
            border: colors.tailwind.emerald[200]
        }
    }

    const currentStyle = variants[text];


    return (
        <Pressable onPress={() => router.push({
            pathname: '/(status)/status', params: {
                status: text,
                id : id
            }
        })} className='flex relative flex-row items-center justify-between' style={{
            backgroundColor: currentStyle.bg,
            borderWidth: 1,
            borderColor: currentStyle.border,
            paddingVertical: 4,
            paddingHorizontal: 5,
            borderRadius: 10
        }}>
            <Text style={{
                color: currentStyle.color,
            }} className=' font-extrabold text-[9px] tracking-widest uppercase'>{text.replace("_", " ")} </Text>
            <ChevronDown color={currentStyle.color} size={12} />
        </Pressable>
    )
}

export default StatusText