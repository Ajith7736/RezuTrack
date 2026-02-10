import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Info, RefreshCcw } from 'lucide-react-native'
import { colors } from '@/components/ui/colors'
import TitleBackButton from '@/components/ui/TitleBackButton'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';

const Insightpage = () => {
    const [isLoading, setisLoading] = useState(false)
    const Animatedloader = Animated.createAnimatedComponent(RefreshCcw)

    const rotate = useSharedValue(0)


    useEffect(() => {
        if (isLoading) {
            rotate.value = withRepeat(withTiming(360, {
                duration: 1000,
                easing: Easing.ease
            }), -1, false)
        } else {
            rotate.value = 0
        }
    }, [isLoading])

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



    const statusColors = {
        info: { text: colors.tailwind.blue[700], bg: colors.tailwind.blue[100]  },
        success: { text: colors.tailwind.green[700], bg: colors.tailwind.green[100] },
        warning: { text: colors.tailwind.amber[700], bg: colors.tailwind.amber[100] },
        error: { text: colors.tailwind.red[700], bg: colors.tailwind.red[100] },
    };




    return (
        <SafeAreaView className='flex-1 p-5'>
            <View className='flex flex-row items-center justify-between'>
                <View className='flex gap-1'>
                    <TitleBackButton title='Analysis' />
                    <Text className="text-[11px] pl-10 text-slate-500 font-bold tracking-wider">
                        Daily summary of your progress
                    </Text>
                </View>
                <Pressable onPress={() => setisLoading(!isLoading)} className='p-3 bg-white border border-slate-200 rounded-lg'>
                    <Animatedloader style={animatedStyle} color={colors.tailwind.indigo[600]} size={20} />
                </Pressable>
            </View>


            <View className='m-3 mt-10'>
                <View className='w-full flex gap-3 p-6 rounded-[18px] border border-slate-200 bg-white'>
                    <View className='w-full flex flex-row  items-center gap-5'>
                        <View className='p-3 bg-white border border-slate-200 rounded-lg'>
                            <Info color={statusColors['info'].text} />
                        </View>
                        <Text className=' font-bold tracking-widest text-slate-800'>AI Insights</Text>
                    </View>
                    <View style={{
                        backgroundColor: statusColors['info'].bg
                    }} className='px-2 py-3 rounded-md'>
                        <Text className="text-[11px] px-2 py-1 tracking-widest">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, ullam nobis enim perspiciatis possimus blanditiis molestias sapiente rem, et natus ipsam quasi dolor.
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Insightpage