import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/components/ui/colors';
import { TimerIcon } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


const ActivityChart = ({ data }: { data: Map<number, number> | undefined }) => {
    const Today = new Date().getDay();
    const [Active, setActive] = useState<number | null>(null)
    type Barchartprops = { value: number | undefined, label: string, labelTextStyle: { color: string, fontSize: number }, frontColor: string }[]


    const barData: Barchartprops = [
        { value: data?.get(0), label: 'S', labelTextStyle: { color: Today === 0 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 0 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(1), label: 'M', labelTextStyle: { color: Today === 1 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 1 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(2), label: 'T', labelTextStyle: { color: Today === 2 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 2 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(3), label: 'W', labelTextStyle: { color: Today === 3 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 3 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(4), label: 'T', labelTextStyle: { color: Today === 4 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 4 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(5), label: 'F', labelTextStyle: { color: Today === 5 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 5 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
        { value: data?.get(6), label: 'S', labelTextStyle: { color: Today === 6 ? colors.tailwind.indigo[500] : colors.tailwind.slate[400], fontSize: 12 }, frontColor: Today === 6 ? colors.tailwind.indigo[500] : colors.tailwind.stone[200] },
    ];

    const ChartData = barData.map((item, indx) => {
        return {
            ...item,
            onPress: () => {
                setActive(Active === indx ? null : indx)
            },
            topLabelComponent: () => {
                return (Active === indx ? (<Animated.View entering={FadeIn} exiting={FadeOut} style={{ marginBottom: 2 }}>
                    <Text className='text-slate-600 text-xs '>{item.value}</Text>
                </Animated.View>) : null)
            }
        }
    })




    return (
        <View className="bg-white border-slate-200 p-5 rounded-[25px] border flex gap-5">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-2 items-center">
                    <TimerIcon color={colors.tailwind.indigo[500]} />
                    <Text className="text-xl font-extrabold tracking-widest">Profile Activity</Text>
                </View>
                <View>
                    <Text className="text-xs bg-indigo-100 py-1 px-2 text-indigo-600">This week</Text>
                </View>
            </View>
            <BarChart
                barWidth={13}
                noOfSections={5}
                initialSpacing={15}
                spacing={28}
                endSpacing={0}
                data={ChartData}
                yAxisThickness={0.2}
                xAxisThickness={1}
                xAxisColor={colors.tailwind.slate[100]}
                yAxisColor={colors.tailwind.slate[300]}
                xAxisLabelTextStyle={{
                    fontSize: 10
                }}
                width={280}
                yAxisTextStyle={{
                    fontSize: 12
                }}
                showFractionalValues={false}
                topLabelTextStyle={{
                    fontSize: 9,
                    fontWeight: '600'
                }}
                onBackgroundPress={() => setActive(null)}
                focusBarOnPress
                focusedBarConfig={{
                    color: 'none'
                }}
            />
        </View>
    )
}

export default ActivityChart