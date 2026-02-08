import { View, Text, Pressable } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { Status } from '@/lib/generated/prisma'
import { FlatList } from 'react-native'
import { colors } from '@/components/ui/colors'
import {
    Send,
    Clock,
    Users,
    MailQuestion,
    XCircle,
    BadgeCheck,
    Check
} from 'lucide-react-native';
import SubmitButton from '@/components/ui/SubmitButton'
import { router, useLocalSearchParams } from 'expo-router'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { toast } from '@/lib/Toast/ToastUtility'
import { supabase } from '@/lib/supabase'
import clsx from 'clsx'


const status = () => {
    const { status, id }: { status: Status, id: string } = useLocalSearchParams();
    const [selectedstatus, setselectedstatus] = useState<Status>(status)
    const queryClient = new QueryClient();

    const dropdata: { name: Status, icon: ReactElement }[] = [
        { name: 'Applied', icon: <Send color={colors.tailwind.indigo[500]} /> },
        { name: 'Pending', icon: <Clock color={colors.tailwind.amber[500]} /> },
        { name: 'Interviewing', icon: <Users color={colors.tailwind.purple[500]} /> },
        { name: 'No_Response', icon: <MailQuestion color={colors.tailwind.slate[500]} /> },
        { name: 'Rejected', icon: <XCircle color={colors.tailwind.red[500]} /> },
        { name: 'Offer', icon: <BadgeCheck color={colors.tailwind.emerald[500]} /> },
    ];

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


    const handleselect = async (status: Status) => {
        try {

            setselectedstatus(status);


            const { error } = await supabase.from('Application').update({
                Status: status
            }).eq('id', id)

            if (error) {
                toast.error('Server Error');
            }

            queryClient.invalidateQueries({
                queryKey: ['applications']
            })

            router.push('/(tabs)/applications')
        } catch (err) {
            console.error(err)
            toast.error('Server Error');
            router.push('/(tabs)/applications')
        }
    }



    return (
        <View className='bg-slate-50 flex-1'>
            <FlatList
                data={dropdata}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    margin: 20
                }}
                renderItem={({ item }) => {
                    return <Pressable onPress={() => handleselect(item.name as Status)} className='rounded-xl flex flex-row items-center w-[95%] justify-between' style={{
                        padding: 10,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: item.name === selectedstatus ? colors.tailwind.indigo[500] : colors.tailwind.slate[200]
                    }}>
                        <View className='flex flex-row gap-5 items-center w-[80%]'>
                            <View style={{
                                backgroundColor: variants[item.name as Status].bg
                            }} className=' h-12 flex justify-center items-center w-12 rounded-lg'>{item.icon}</View>
                            <Text style={{
                                color: item.name === selectedstatus ? colors.tailwind.indigo[500] : colors.tailwind.slate[400]
                            }} className={clsx('font-semibold text-sm w-full tracking-widest ')}>{item.name}</Text>
                        </View>
                        <View>
                            {item.name === selectedstatus && <View className='bg-indigo-500 rounded-full flex justify-center items-center p-1'>
                                <Check size={15} color={'white'} />
                            </View>}
                        </View>

                    </Pressable>
                }}
            />
        </View>
    )
}

export default status