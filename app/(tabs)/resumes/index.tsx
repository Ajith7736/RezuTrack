import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FileText, Plus } from 'lucide-react-native'
import { colors } from '@/components/ui/colors'
import { router } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useSession } from '@/context/AuthContext'
import Loading from '@/components/ui/Loading'
import ResumeCard from '@/features/Resume/components/ResumeCard'
import { FlatList } from 'react-native'

const resumes = () => {

  const { session } = useSession();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Resumes'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Resume').select("id,name,updatedAt").eq("userId", session?.user.id as string);

      if (error) {
        console.error(error.message);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!session?.user.id
  })



  return (
    <SafeAreaView className='flex-1 bg-slate-50 p-5'>

      <Pressable className='w-full' onPress={() => router.push('/resumeform')} style={{
        position: 'absolute',
        bottom: 20,
        zIndex: 20,
        left: 15,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.tailwind.indigo[500]
      }}>
        <View className='flex flex-row items-center gap-2'>
          <Plus size={25} color={colors.tailwind.indigo[500]} />
          <Text className='text-lg font-bold ' style={{
            color: colors.tailwind.indigo[500]
          }}>Add new version</Text>
        </View>
      </Pressable>

      <View>
        <Text className="text-2xl font-extrabold tracking-widest text-slate-700">Resume</Text>
        <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
          Manage your document versions
        </Text>
      </View>

      {isLoading ? <View style={{
        display: 'flex',
        justifyContent : 'center',
        height : '80%',
        gap: 8
      }}>
        <ActivityIndicator color={colors.tailwind.slate[300]} />
        <Text className='text-center text-sm tracking-widest text-slate-300 '>Loading</Text>
      </View>
        : data && data.length > 0 ? <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ResumeCard data={item} refetch={refetch} />}
        /> : <View className='h-[47rem] flex items-center justify-center gap-2'>
          <View className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center  mx-auto border border-slate-200 shadow-sm">
            <FileText size={40} color={colors.tailwind.slate[300]} />
          </View>
          <Text className='text-[16px] text-center text-slate-800 font-bold tracking-widest'>No Resume Found</Text>
          <Text className="text-[12px] text-slate-500 text-center w-96 tracking-wider">
            Add a version to start tracking its performance
          </Text>
        </View>}
    </SafeAreaView>
  )
}

export default resumes

