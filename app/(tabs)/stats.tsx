import TitleBackButton from '@/components/ui/TitleBackButton'
import { useSession } from '@/context/AuthContext'
import ResumeChart from '@/features/Stats/Components/ResumeChart'
import { api } from '@/lib/Utils/FetchUtils'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const stats = () => {

    const { session } = useSession();

    const { data: resumedata, isLoading } = useQuery({
        queryKey: ['resumesuccess'],
        queryFn: async () => {
            const data = await api.post({ userId: session?.user.id }, '/api/getresumedata')

            if (!data) return []

            return data.resumedata as { value: number, label: string }[];
        },
        enabled: !!session?.user.id
    })


    return (
        <SafeAreaView className='p-5 flex gap-5 bg-slate-50 flex-1'>
            <TitleBackButton title='Stats' />
            <ResumeChart isLoading={isLoading} resumedata={resumedata} />

            <View className="mt-8 items-center p-6 rounded-3xl">
                <Text className="text-slate-800 font-bold text-lg text-center">New Insights & Features</Text>
                <Text className="text-slate-500 text-sm text-center mt-1 leading-5">
                    We're working on advanced analytics, application tracking trends, and AI-powered resume suggestions. Stay tuned!
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default stats