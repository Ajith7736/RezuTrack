import { colors } from "@/components/ui/colors";
import Loading from "@/components/ui/Loading";
import { useSession } from "@/context/AuthContext";
import ActivityChart from "@/features/Home/components/ActivityChart";
import ResumeChart from "@/features/Home/components/ResumeChart";
import { supabase } from "@/lib/supabase";
import { api } from "@/lib/Utils/FetchUtils";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ChevronRight, FileText, Sparkles, Target, TrendingUp, Zap } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const { session } = useSession();



  const { data, isLoading: ApplicationLoading } = useQuery({
    queryKey: ['RecentApplications'],
    queryFn: async () => {

      let counts: Map<number, number> = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]])

      const [totalapplication, resdata, response] = await Promise.all([gettotalApplication(), getoneweekData(), getRespondedApplications()])

      const responserate = totalapplication ? ((response ?? 0) / totalapplication) * 100 : 0


      console.log(resdata)

      resdata?.forEach((res) => {

        const Day = new Date(res.Date).getDay()

        counts.set(Day, counts.get(Day)! + 1);

      })

      return { counts, totalapplication, responserate };
    },
    enabled: !!session?.user.id
  })

  const getoneweekData = async () => {

    const ThisWeek = new Date();
    ThisWeek.setDate(ThisWeek.getDate() - new Date().getDay());

    const { data: resdata, error } = await supabase.from('Application').select('Date').eq("userId", session?.user.id as string).gt('Date', ThisWeek.toISOString()).order('Date', { ascending: true })


    if (error) {
      throw new Error('Db error')
    }

    return resdata;
  }

  const gettotalApplication = async () => {
    const { count } = await supabase.from('Application').select("*", { count: 'exact', head: true }).eq('userId', session?.user.id as string)

    return count;
  }

  const getRespondedApplications = async () => {
    const { count } = await supabase.from('Application').select('*', { count: 'exact', head: true }).eq('userId', session?.user.id as string).in('Status', ['Interviewing', 'Offer', 'Rejected']);

    return count;
  }

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

            <Pressable onPress={() => router.push('/ai-tools')} style={{
              boxShadow: '0px 0px 15px rgba(79, 70, 229, 0.3)'
            }} className="w-full mt-5 p-5 flex gap-3 rounded-[20px] bg-indigo-500">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-3 items-center">
                  <View style={{
                    backgroundColor: colors.tailwind.indigo[400]
                  }} className=" p-4 rounded-lg">
                    <Sparkles size={25} color={'white'} />
                  </View>
                  <View style={{
                    width: 250
                  }}>
                    <Text className="text-white text-lg font-bold">AI Resume Insights</Text>
                    <Text className="text-indigo-100 text-xs font-medium">
                      Get a comprehensive analysis of your resume and unlock your full potential.
                    </Text>
                  </View>
                </View>
                <ChevronRight color={'white'} />
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
