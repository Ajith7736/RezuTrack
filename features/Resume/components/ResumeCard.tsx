import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Calendar1, FileText, Trash2 } from 'lucide-react-native'
import { colors } from '@/components/ui/colors'
import { Resume } from '@/types/types'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useSession } from '@/context/AuthContext'
import { api } from '@/lib/Utils/FetchUtils'

const ResumeCard = ({ data, refetch }: { data: Pick<Resume, 'id' | 'updatedAt' | 'name'>, refetch: Function }) => {
    const queryClient = useQueryClient();

    const { session } = useSession()

    const handledelete = async () => {

        const res = await api.delete({ ResumeId: data.id, userId: session?.user.id }, '/api/deleteresume')

        if (!res.success) {
            return
        }

        await queryClient.invalidateQueries({
            queryKey: ['Resumes']
        })


        await queryClient.invalidateQueries({
            queryKey: ['applications']
        })

        await queryClient.invalidateQueries({
            queryKey: ['resumesuccess']
        })

        await queryClient.invalidateQueries({
            queryKey: ['RecentApplications']
        })

    }

    return (
        <View className='bg-white mt-5 flex flex-row items-center rounded-[25px] border border-slate-200 p-5  gap-5'>
            <View className='flex flex-row w-[86%] gap-3'>
                <View className='bg-indigo-100 p-4 w-[18%] rounded-lg'>
                    <FileText color={colors.tailwind.indigo[500]} />
                </View>
                <View className='flex gap-1'>
                    <Text className='font-bold tracking-widest text-slate-700'>{data.name}</Text>
                    <View className='font-bold tracking-widest flex flex-row items-center gap-1'><Calendar1 size={14} color={colors.tailwind.slate[400]} />
                        <Text className='text-xs text-slate-400'>{new Date(data.updatedAt).toDateString()}</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={handledelete}>
                <Trash2 color={colors.tailwind.slate[300]} />
            </Pressable>
        </View>
    )
}

export default ResumeCard