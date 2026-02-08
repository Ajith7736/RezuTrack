import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/components/ui/colors';
import { TimerIcon } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';

const ActivityChart = ({ data }: { data: Map<number, number> | undefined }) => {
    const Today = new Date().getDay();

    type Barchartprops = { value: number | undefined, label: string, frontColor: string }[]

    const barData: Barchartprops = [
        { value: data?.get(0), label: 'S', frontColor: Today === 0 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(1), label: 'M', frontColor: Today === 1 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(2), label: 'T', frontColor: Today === 2 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(3), label: 'W', frontColor: Today === 3 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(4), label: 'T', frontColor: Today === 4 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(5), label: 'F', frontColor: Today === 5 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(6), label: 'S', frontColor: Today === 6 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
    ];

    return (
        <View className="bg-white p-5 border-slate-200 rounded-[25px] border flex gap-5">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-2 items-center">
                    <TimerIcon color={colors.tailwind.indigo[500]} />
                    <Text className="text-xl font-extrabold tracking-widest">Profile Activity</Text>
                </View>
                <View>
                    <Text className="text-xs bg-indigo-100 py-1 px-2 text-indigo-600">7 Days</Text>
                </View>
            </View>
            <View>
                <BarChart
                    barWidth={20}
                    maxValue={10}
                    noOfSections={5}
                    initialSpacing={10}
                    endSpacing={0}
                    barBorderRadius={4}
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    width={280}
                    showFractionalValues={false}
                    onPress={(item: Barchartprops, indx: number) => {
                        console.log(item, indx)
                    }}
                    topLabelTextStyle={{
                        fontSize: 9,
                        fontWeight: '600'
                    }}
                    focusBarOnPress
                    focusedBarConfig={{
                        color: 'none'
                    }}
                />
            </View>
        </View>
    )
}

export default ActivityChart