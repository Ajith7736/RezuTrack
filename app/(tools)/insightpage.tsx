import { colors } from '@/components/ui/colors'
import TitleBackButton from '@/components/ui/TitleBackButton'
import { useSession } from '@/context/AuthContext'
import { insight } from '@/lib/Database/Schema/OutputSchema'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { api } from '@/lib/Utils/FetchUtils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { AlertCircle, AlertTriangle, Brain, CheckCircle2, Info, RefreshCcw } from 'lucide-react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const Insightpage = () => {
    const [isLoading, setisLoading] = useState(false)
    const Animatedloader = Animated.createAnimatedComponent(RefreshCcw)
    const { session } = useSession()
    const queryClient = useQueryClient()

    console.log(session?.user.app_metadata)

    const rotate = useSharedValue(0)

    const { data, isFetching } = useQuery({
        queryKey: ['insight'],
        queryFn: async () => {
            const { data: res, error } = await supabase.from('Insights').select('data').eq('userId', session?.user.id as string).maybeSingle();

            if (error) {
                console.error(error.message)
                throw new Error('Server Error')
            }

            if (res) {
                return res.data as insight[]
            } else {
                return null
            }
        },
        enabled: !!session?.user
    })


    useEffect(() => {
        if (isLoading || isFetching) {
            rotate.value = withRepeat(withTiming(360, {
                duration: 1000,
                easing: Easing.ease
            }), -1, false)
        } else {
            rotate.value = 0
        }
    }, [isLoading, isFetching])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotate.value}deg`
                }
            ]
        }
    }
    )

    const handlegetinsight = async () => {
        try {
            setisLoading(true);
            const data = await api.post({ userId: session?.user.id }, '/api/getinsight');

            if (data.success) {
                await queryClient.invalidateQueries({
                    queryKey: ['insight']
                })
            }
        } catch (err) {
            console.log(err)
            toast.error('Server Error')
        } finally {
            setisLoading(false)
        }
    }



    const statusColors: Record<string, {
        text: string,
        bg: string,
        icon: ReactElement
    }> = {
        info: { text: colors.tailwind.blue[700], bg: colors.tailwind.blue[50], icon: <Info color={colors.tailwind.blue[700]} /> },
        success: { text: colors.tailwind.green[700], bg: colors.tailwind.green[50], icon: <CheckCircle2 color={colors.tailwind.green[700]} /> },
        warning: { text: colors.tailwind.amber[700], bg: colors.tailwind.amber[50], icon: <AlertTriangle color={colors.tailwind.amber[700]} /> },
        error: { text: colors.tailwind.red[700], bg: colors.tailwind.red[50], icon: <AlertCircle color={colors.tailwind.red[700]} /> },
    };





    return (
        <SafeAreaView className='flex-1 p-5'>
            <View className='flex flex-row items-center justify-between'>
                <View className='flex gap-1'>
                    <TitleBackButton title='Analysis' />
                </View>
                <Pressable onPress={() => {
                    if (session?.user.app_metadata.subscription === 'Pro') {
                        handlegetinsight()
                    } else {
                        router.push('/paywall')
                    }
                }} className='p-3 bg-white border border-slate-200 rounded-lg'>
                    <Animatedloader style={animatedStyle} color={colors.tailwind.indigo[600]} size={20} />
                </Pressable>
            </View>


            <View className='m-3 '>
                {isLoading || isFetching ? <View style={{
                    display: 'flex',
                    paddingTop: 50,
                    gap: 8
                }}>
                    <ActivityIndicator color={colors.tailwind.slate[300]} />
                    <Text className='text-center text-sm tracking-widest text-slate-300 '>Loading</Text>
                </View> : data && data.length > 0 ? <FlatList
                    data={data}
                    contentContainerStyle={{
                        display: 'flex',
                        gap: 10,
                        paddingBottom: 30
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return <View style={{
                            backgroundColor: statusColors[item.type].bg
                        }} className='w-full flex gap-1 p-6 rounded-[18px] border border-slate-200 bg-white'>
                            <View className='w-full flex flex-row items-center gap-2'>
                                <View className='p-2 bg-white border border-slate-300  rounded-lg'>
                                    {statusColors[item.type].icon}
                                </View>
                                <Text className='text-sm font-bold tracking-widest w-[76%] text-slate-800'>{item.title}</Text>
                            </View>
                            <View className='py-1 rounded-md'>
                                <Text className="text-[11px] px-2 py-1 tracking-widest">
                                    {item.message}
                                </Text>
                            </View>
                        </View>
                    }}
                /> : <View style={{
                    height: 570
                }} className=' flex items-center justify-center gap-2'>
                    <View className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center  mx-auto border border-slate-200 shadow-sm">
                        <Brain size={40} color={colors.tailwind.slate[800]} />
                    </View>
                    <Text className='text-[16px] text-center text-slate-800 font-bold tracking-widest'>No Insights</Text>
                    <Text className="text-[12px] text-slate-500 text-center w-96 tracking-wider">
                        Your insight will appear here.
                    </Text>
                </View>}
            </View>
        </SafeAreaView>
    )
}

export default Insightpage