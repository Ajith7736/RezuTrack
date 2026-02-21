import { colors } from '@/components/ui/colors'
import TitleBackButton from '@/components/ui/TitleBackButton'
import { Href, router } from 'expo-router'
import { ChevronRight, FileText, Sparkles, Target, Zap } from 'lucide-react-native'
import React, { ReactElement } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AitoolsPage = () => {


    const toolsdata: {
        id: string,
        icon: ReactElement,
        title: string,
        subtitle: string,
        desc: string,
        footericon: ReactElement,
        footerdesc: string,
        route: Href
    }[] = [
            {
                id: "1",
                icon: <Sparkles size={25} color={'white'} />,
                title: "AI Insight",
                subtitle: "Full Strategy Analysis",
                desc: 'Discover which resume version are landing interviews and how to optimize it.',
                footericon: <Zap size={15} color={colors.tailwind.slate[400]} />,
                footerdesc: 'View Information',
                route: '/(tools)/insightpage'
            }, {
                id: "2",
                icon: <FileText size={25} color={'white'} />,
                title: "JOB MATCH",
                subtitle: "Resume Scoring",
                desc: 'Check how well your resume matches a job description and get optimization tips.',
                footericon: <Target size={15} color={colors.tailwind.slate[400]} />,
                footerdesc: 'Analyze Match',
                route: '/(tools)/job-match'
            }
        ]

    return (
        <SafeAreaView className='flex-1 bg-slate-50 p-5'>
            <TitleBackButton title='Features' />
            <FlatList
                data={toolsdata}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <Pressable onPress={() => router.push(item.route)} className="w-full bg-white border shadow-sm border-slate-200 mt-5 p-5 flex gap-3 rounded-[28px] ">
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row gap-5">
                                <View style={{
                                    backgroundColor: colors.tailwind.indigo[500]
                                }} className=" p-3 rounded-lg">
                                    {item.icon}
                                </View>
                                <View>
                                    <Text className=" text-slate-700 font-bold tracking-widest uppercase">{item.title}</Text>
                                    <Text className="text-[12px] text-slate-600 tracking-widest">
                                        {item.subtitle}
                                    </Text>
                                </View>
                            </View>
                            <ChevronRight color={colors.tailwind.slate[800]} />
                        </View>
                        <View className="">
                            <Text className="text-[11px] text-slate-500 tracking-widest">
                                {item.desc}
                            </Text>
                        </View>
                        <View style={{
                            borderTopWidth: 1,
                            borderTopColor: colors.tailwind.slate[400],
                            paddingTop: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}>
                            {item.footericon}
                            <Text className="text-[12px]  font-semibold uppercase text-slate-700 tracking-widest">
                                {item.footerdesc}
                            </Text>
                        </View>
                    </Pressable>
                }}
            />
        </SafeAreaView>
    )
}

export default AitoolsPage