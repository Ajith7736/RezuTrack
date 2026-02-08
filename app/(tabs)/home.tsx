import { colors } from "@/components/ui/colors";
import { useSession } from "@/context/AuthContext";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts"
import { FileText, Target, TimerIcon, TrendingUp } from "lucide-react-native";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import ActivityChart from "@/features/Home/components/ActivityChart";
import { api } from "@/lib/Utils/FetchUtils";


export default function Index() {
  const { session } = useSession();
  const [showactivity, setshowactivity] = useState(false);

  const Today = new Date().getDay();

  const { data } = useQuery({
    queryKey: ['RecentApplications'],
    queryFn: async () => {

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      let counts: Map<number, number> = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]])
      const { data: resdata, error } = await supabase.from('Application').select('Date').eq("userId", session?.user.id as string).gt('Date', oneWeekAgo.toISOString()).order('Date', { ascending: true })

      if (error) {
        return counts;
      }

      resdata?.forEach((res) => {

        const Day = new Date(res.Date).getDay()

        counts.set(Day, counts.get(Day)! + 1);

      })

      return counts;
    },
    enabled: !!session?.user.id,
    refetchOnMount: true
  })

  const { data: successdata, error: successerror } = useQuery({
    queryKey: ['ResumeSuccess'],
    queryFn: async () => {
      const data = await api.post({ userId: session?.user.id },'/api/getresumedata')

      console.log(data.success)

      return data;
    }
  })



  const cardcontent = [
    {
      icon: <Target color={colors.tailwind.indigo[500]} />,
      label: 'Total Sent',
      value: '3',
      background: colors.tailwind.indigo[100]
    },
    {
      icon: <TrendingUp size={20} color={colors.tailwind.emerald[500]} />,
      label: 'Response Rate',
      value: '0.0%',
      background: colors.tailwind.emerald[100]
    }
  ]


  const resumeData = [
    { value: 5, label: 'full stack' },
    { value: 4, label: 'Backend' },
    { value: 1, label: 'Software' },
    { value: 4, label: 'Frontend' },
    { value: 1, label: 'Devops' },
  ];




  return (
    <>
      <SafeAreaView className="h-screen flex gap-5 bg-slate-50" >

        <ScrollView>

          <View style={{
            paddingBottom: 80
          }} className="flex gap-3 p-5">
            <View className="flex flex-row justify-between items-center">
              <View>
                <Text className="text-2xl font-extrabold tracking-widest text-slate-700">Your Stats</Text>
                <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
                  Daily summary of your progress
                </Text>
              </View>
              <View style={{
                backgroundColor: colors.tailwind.gray[200]
              }} className="bg-stone-100 shadow-stone-400 h-11 w-11 rounded-full overflow-hidden">
                <Image
                  source={session?.user.user_metadata.avatar_url ?? require('@/assets/images/person.png')}
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                  contentFit="cover"
                  contentPosition={'center'}
                />
              </View>
            </View>

            <View className="flex flex-row justify-center mt-5 gap-5">
              {cardcontent.map((card, indx) => {
                return <View key={indx} className="bg-white w-[45%] flex gap-2 border border-slate-200 rounded-[25px] p-5">
                  <View style={{
                    backgroundColor: card.background
                  }} className=" rounded-lg h-10 w-10 flex items-center justify-center">
                    {card.icon}
                  </View>
                  <Text className="font-medium tracking-widest text-slate-700">{card.label}</Text>
                  <Text className="font-extrabold text-slate-800 text-xl">{card.value}</Text>
                </View>
              })}

            </View>

            <ActivityChart data={data} />

            <View className="bg-white p-5 border-slate-200 rounded-[25px] border flex gap-5">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-2 items-center">
                  <FileText color={colors.tailwind.emerald[500]} />
                  <Text className="text-xl font-extrabold tracking-widest">Resume Success</Text>
                </View>
              </View>
              <View>
                <BarChart
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
                  data={resumeData}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  width={280}
                />
              </View>
            </View>
          </View>
        </ScrollView>

      </SafeAreaView >

    </>
  );
}
