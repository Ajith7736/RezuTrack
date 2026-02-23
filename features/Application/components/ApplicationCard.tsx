import { colors } from '@/components/ui/colors'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { Application } from '@/types/types'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { Building, Calendar, ExternalLink, Trash2 } from 'lucide-react-native'
import React from 'react'
import { Linking, Pressable, Text, View } from 'react-native'
import StatusText from './StatusText'
import { api } from '@/lib/Utils/FetchUtils'
import { useSession } from '@/context/AuthContext'

const ApplicationCard = ({ data, refetch, index }: { data: Application, refetch: Function, index: number }) => {

    const queryClient = useQueryClient();

    const handleLinkClick = () => {
        Linking.openURL(data.Link)
    }

    const date = new Date(data.Date).toDateString();
    const { session } = useSession()

    const handledelete = async () => {
        try {
            const res = await api.delete({ ApplicationId: data.id, userId: session?.user.id }, '/api/deleteapplication');

            if (!res.success) {
                return
            }

            await queryClient.invalidateQueries({
                queryKey: ['applications']
            })

            await queryClient.invalidateQueries({
                queryKey: ['resumesuccess']
            })

            await queryClient.invalidateQueries({
                queryKey: ['RecentApplications']
            })

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <View style={{
            zIndex: 200 - index
        }} className='bg-white rounded-[25px] border border-slate-200 p-5 flex flex-col gap-5'>

            <View className='flex flex-row justify-between items-center'>
                <View className='flex flex-row items-center gap-3'>
                    <View className='bg-slate-100 w-fit rounded-lg p-3'>
                        <Building color={colors.tailwind.slate[300]} />
                    </View>
                    <View>
                        <Text className='font-extrabold tracking-widest'>{data.companyName}</Text>
                        <Text className='text-xs text-slate-500 tracking-widest'>{data.roleTitle}</Text>
                    </View>
                </View>
                <Pressable onPress={handledelete}>
                    <Trash2 color={colors.tailwind.slate[300]} />
                </Pressable>
            </View>

            <View>
                <View className='flex flex-row items-center gap-3'>
                    <Text className='text-slate-700 font-bold tracking-widest' style={{ fontSize: 11 }}>RESUME :</Text>
                    <Text className='text-slate-700 tracking-widest' style={{ fontSize: 11 }}>{data.resumeUsed}</Text>
                </View>
            </View>

            <View className='flex flex-row justify-between items-center'>
                <View>
                    <StatusText text={data.Status} id={data.id} refetch={refetch} />
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <View className='flex flex-row gap-2 items-center'>
                        <Calendar size={15} color={colors.tailwind.slate[400]} />
                        <Text className='text-slate-600 text-xs font-bold'>{date}</Text>
                    </View>

                    {data.Link && <Pressable onPress={handleLinkClick} className='bg-slate-100 w-fit rounded-full p-3'>
                        <ExternalLink size={15} color={colors.tailwind.slate[600]} />
                    </Pressable>}
                </View>
            </View>
        </View>

    )
}

export default ApplicationCard

