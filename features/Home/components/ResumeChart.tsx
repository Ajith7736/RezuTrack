import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { FileText } from 'lucide-react-native'
import { colors } from '@/components/ui/colors'
import { BarChart } from 'react-native-gifted-charts'

const ResumeChart = ({ resumedata, isLoading }: { isLoading: boolean, resumedata: { value: number, label: string }[] | undefined }) => {
    return (
        <View className="bg-white p-5 border-slate-200 rounded-[25px] border flex gap-5">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-2 items-center">
                    <FileText color={colors.tailwind.emerald[500]} />
                    <Text className="text-xl font-extrabold tracking-widest">Resume Success</Text>
                </View>
            </View>
            <View>
                {isLoading ? <View style={{
                    height: 233,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5
                }}>
                    <ActivityIndicator color={colors.tailwind.slate[300]} />
                    <Text className='text-slate-300 text-sm tracking-widest w-full text-center'>loading</Text>
                </View> : ( resumedata && resumedata.length > 0 ) ? <BarChart
                    barWidth={20}
                    noOfSections={5}
                    barBorderRadius={2}
                    initialSpacing={20}
                    spacing={40}
                    endSpacing={10}
                    frontColor={colors.tailwind.indigo[500]}
                    xAxisLabelTextStyle={{
                        fontSize: 10,
                        letterSpacing: 1,
                        fontWeight: '600'
                    }}
                    yAxisTextStyle={{
                        fontSize: 11,
                        letterSpacing: 1,
                        fontWeight: '600'
                    }}
                    data={resumedata}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    width={280}
                /> :
                    <View style={{
                        height: 233,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text className="tracking-widest font-semibold text-slate-300 text-sm w-full text-center">No Data</Text>
                    </View>
                }

            </View>
        </View>
    )
}

export default ResumeChart