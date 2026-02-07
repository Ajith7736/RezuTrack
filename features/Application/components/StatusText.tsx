import { colors } from '@/components/ui/colors'
import { delay } from '@/lib/customdelay'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { Status } from '@/types/types'
import { QueryClient } from '@tanstack/react-query'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

const StatusText = ({ text, id, refetch }: { text: Status, id: string, refetch: Function }) => {
    const [expanded, setexpanded] = useState(false)
    const queryClient = new QueryClient();
    const variants = {
        "Applied": {
            color: colors.tailwind.indigo[500],
            bg: colors.tailwind.indigo[100],
            border: colors.tailwind.indigo[500]
        },
        "Pending": {
            color: colors.tailwind.amber[500],
            bg: colors.tailwind.amber[100],
            border: colors.tailwind.amber[500]
        },
        "Interviewing": {
            color: colors.tailwind.purple[500],
            bg: colors.tailwind.purple[100],
            border: colors.tailwind.purple[500]
        },
        "No_Response": {
            color: colors.tailwind.slate[500],
            bg: colors.tailwind.slate[100],
            border: colors.tailwind.slate[500]
        },
        "Rejected": {
            color: colors.tailwind.red[500],
            bg: colors.tailwind.red[100],
            border: colors.tailwind.red[500]
        },
        "Offer": {
            color: colors.tailwind.emerald[500],
            bg: colors.tailwind.emerald[100],
            border: colors.tailwind.emerald[500]
        }
    }

    const currentStyle = variants[text];

    const dropdata: Record<string, Status>[] = [
        { name: 'Applied' },
        { name: 'Pending' },
        { name: 'Interviewing' },
        { name: 'No_Response' },
        { name: 'Rejected' },
        { name: 'Offer' },
    ]

    const handlestatus = async (Status: Status) => {
        try {
            const { error } = await supabase.from('Application').update({
                Status
            }).eq("id", id)

            if (error) {
                toast.error("Server error");
                console.error(error.message);
            }

            queryClient.invalidateQueries({
                queryKey: ['Applications']
            })

            refetch()
            await delay(2);
            setexpanded(false);
        } catch (err) {

        }

    }

    return (
        <Pressable onPress={() => setexpanded(!expanded)} className='flex relative flex-row items-center justify-between' style={{
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
            {expanded ? <ChevronUp color={currentStyle.color} size={12} /> : <ChevronDown color={currentStyle.color} size={12} />}
            {expanded && <View style={{
                width: 130,
                height: 'auto',
                position: 'absolute',
                zIndex: 100,
                bottom: -227,
                left: 0,
                backgroundColor: currentStyle.bg,
                borderWidth: 1,
                borderColor: currentStyle.border,
                borderRadius: 10,
                boxShadow: '0px 3px 14px rgba(0,0,0,0.07)'
            }} >
                {dropdata.map((data, indx) => {
                    return <TouchableOpacity key={indx} onPress={() => handlestatus(data.name)} className='p-3 ' style={{
                        borderBottomWidth: indx === dropdata.length - 1 ? 0 : 1,
                        borderColor: currentStyle.border
                    }}>
                        <Text style={{
                            color: currentStyle.color
                        }} className=' tracking-widest text-[11px]'>{data.name}</Text>
                    </TouchableOpacity>
                })}
            </View>}
        </Pressable>
    )
}

export default StatusText