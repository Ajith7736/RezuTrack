import { colors } from "@/components/ui/colors";
import Loading from "@/components/ui/Loading";
import { useSession } from "@/context/AuthContext";
import ResumeCard from "@/features/Home/components/ResumeCard";
import { supabase } from "@/lib/supabase";
import { toast } from "@/lib/Toast/ToastUtility";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [showoptions, setshowoptions] = useState<{
    id: string | null,
    show: boolean
  }>({
    show: false,
    id: null
  })


  const { session } = useSession();
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['Resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Resume')
        .select('*')
        .eq('userId', session?.user.id as string)
        .order('createdAt', { ascending: false })

      if (error) return toast.error(error.message)

      return data;
    },
  })

  // console.log(JSON.stringify(data, null, 2));

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <SafeAreaView className="h-screen flex gap-5 bg-white p-5 " >

        <View className="flex flex-row justify-between items-center">
          <View className="w-[60%]">
            <Text className="text-[25px] font-bold text-stone-700 tracking-wider">Hi {session?.user.user_metadata.name},</Text>
            <Text className="text-[12px] text-stone-400 font-bold tracking-wider">
              Welcome to your personal resume builder
            </Text>
          </View>
          <View style={{
            backgroundColor: colors.tailwind.gray[200]
          }} className="bg-stone-100 shadow-stone-400 h-14 w-14 rounded-full overflow-hidden">
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


        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='height'
          keyboardVerticalOffset={50}
        >

          <ScrollView className="flex-1" contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 90
          }}>
            <Pressable style={{
              backgroundColor: colors.tailwind.stone[50]
            }} className=" h-[15rem] m-5 w-[11rem] rounded-md flex justify-center items-center border border-stone-300 border-dashed"
              onPress={() => router.push('/(tabs)/home/templates')}
            >
              <Ionicons name="add" size={17} color={"#a8a29e"} />
              <Text className="text-stone-400 font-bold text-xs uppercase tracking-widest w-full text-center">Create Resume</Text>
            </Pressable>

            {data?.map((resume) => {
              return <ResumeCard showoptions={showoptions} setshowoptions={setshowoptions} refetch={refetch} resume={resume} key={resume.id} />
            })}

          </ScrollView>
        </KeyboardAvoidingView>

      </SafeAreaView>

    </>
  );
}
