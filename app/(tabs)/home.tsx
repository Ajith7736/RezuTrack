import { colors } from "@/components/ui/colors";
import { useSession } from "@/context/AuthContext";
import { Image } from "expo-image";
import { Pressable, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts"
import { ChevronRight, FileText, Sparkles, Target, TimerIcon, TrendingUp, Zap } from "lucide-react-native";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import ActivityChart from "@/features/Home/components/ActivityChart";
import { api } from "@/lib/Utils/FetchUtils";
import ResumeChart from "@/features/Home/components/ResumeChart";
import Loading from "@/components/ui/Loading";
import { router } from "expo-router";


export default function Index() {
  const { session } = useSession();



  const { data, isLoading: ApplicationLoading } = useQuery({
    queryKey: ['RecentApplications'],
    queryFn: async () => {

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      let counts: Map<number, number> = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]])
      
      const { data: resdata, error } = await supabase.from('Application').select('Date').eq("userId", session?.user.id as string).gt('Date', oneWeekAgo.toISOString()).order('Date', { ascending: true })

      const { count: totalapplication } = await supabase.from('Application').select("*", { count: 'exact', head: true }).eq('userId', session?.user.id as string)

      const { count: response } = await supabase.from('Application').select('*', { count: 'exact', head: true }).eq('userId', session?.user.id as string).in('Status', ['Interviewing', 'Offer', 'Rejected']);

      const responserate = totalapplication ? ((response ?? 0) / totalapplication) * 100 : 0


      if (error) {
        throw new Error('Db error')
      }

      resdata?.forEach((res) => {

        const Day = new Date(res.Date).getDay()

        counts.set(Day, counts.get(Day)! + 1);

      })

      return { counts, totalapplication, responserate };
    },
    enabled: !!session?.user.id
  })

  const { data: resumedata, isLoading } = useQuery({
    queryKey: ['resumesuccess'],
    queryFn: async () => {
      const data = await api.post({ userId: session?.user.id }, '/api/getresumedata')

      if (!data) return []

      return data.resumedata as { value: number, label: string }[];
    },
    enabled: !!session?.user.id
  })




  const cardcontent = [
    {
      icon: <Target color={colors.tailwind.indigo[500]} />,
      label: 'Total Sent',
      value: data?.totalapplication ?? 0,
      background: colors.tailwind.indigo[100]
    },
    {
      icon: <TrendingUp size={20} color={colors.tailwind.emerald[500]} />,
      label: 'Response Rate',
      value: `${data?.responserate.toFixed(2)}%`,
      background: colors.tailwind.emerald[100]
    }
  ]

  if (ApplicationLoading) {
    return <Loading />
  }



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

            <Pressable onPress={() => router.push('/insightpage')} style={{
              boxShadow: '0px 0px 15px rgba(79, 70, 229, 0.3)'
            }} className="w-full mt-5 p-5 flex gap-3 rounded-[28px] bg-indigo-500">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-5">
                  <View style={{
                    backgroundColor: colors.tailwind.indigo[400]
                  }} className=" p-3 rounded-lg">
                    <Sparkles size={25} color={'white'} />
                  </View>
                  <View>
                    <Text className=" text-white font-bold tracking-widest uppercase">AI Insight</Text>
                    <Text className="text-[12px] text-indigo-200 tracking-widest">
                      Full Strategy Analysis
                    </Text>
                  </View>
                </View>
                <ChevronRight color={'white'} />
              </View>
              <View className="">
                <Text className="text-[11px] text-indigo-200 tracking-widest">
                  Discover which resume version are landing interviews and how to optimize it.
                </Text>
              </View>
              <View style={{
                borderTopWidth: 1,
                borderTopColor: colors.tailwind.indigo[400],
                paddingTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5
              }}>
                <Zap size={15} color={'white'} />
                <Text className="text-[12px]  font-semibold uppercase text-white tracking-widest">
                  View Information
                </Text>
              </View>
            </Pressable>

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

            <ActivityChart data={data?.counts} />

            <ResumeChart resumedata={resumedata} isLoading={isLoading} />

          </View>
        </ScrollView>

      </SafeAreaView >

    </>
  );
}
