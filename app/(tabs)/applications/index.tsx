import { colors } from '@/components/ui/colors'
import Loading from '@/components/ui/Loading'
import { useSession } from '@/context/AuthContext'
import ApplicationCard from '@/features/Application/components/ApplicationCard'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { ClipboardList, Plus, Search } from 'lucide-react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, TextInputChangeEvent, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const applications = () => {

  const { session } = useSession();
  const [SearchText, setSearchText] = useState<string>("")
  const [DebounceText, setDebounceText] = useState<string>("")

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Applications"],
    queryFn: async () => {
      const { data, error } = await supabase.from('Application').select("*").eq("userId", session?.user.id as string)

      if (error) {
        toast.error(error.message);
        console.error(error.message);
        throw new Error(error.message)
      }

      return data;
    },
    enabled: !!session?.user
  })

  const filteredApplications = useMemo(() => {

    if (!data) return

    if (!DebounceText) return data;

    return data?.filter((application) => {
      return application.companyName.toLowerCase().trim().includes(DebounceText.toLowerCase().trim()) ||
        application.roleTitle.toLowerCase().trim().includes(DebounceText.toLowerCase().trim())
    })
  }, [DebounceText, data])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceText(SearchText)
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [SearchText])



  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <SafeAreaView className='h-screen relative w-full bg-slate-50 p-5'>
        <Pressable style={{
          position: 'absolute',
          bottom: 120,
          right: 30,
          zIndex: 20,
          backgroundColor: colors.tailwind.indigo[500],
          height: 60,
          width: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          boxShadow: '0px 3px 12px rgba(63, 81, 181,0.12)'
        }}>
          <Link href={'/applicationform'}>
            <Plus color={'white'} size={38} />
          </Link>

        </Pressable>
        <ScrollView>
          <View className='flex gap-3'>
            <View>
              <Text className="text-2xl font-extrabold tracking-widest text-slate-700">Applications</Text>
              <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
                Keep track of your leads
              </Text>
            </View>

            <View className='flex flex-row w-full items-center border px-2 bg-white gap-1 border-slate-200 rounded-[12px]  '>
              <View className='w-[5%]'>
                <Search size={18} color={colors.tailwind.slate[300]} />
              </View>
              <View className='w-[95%]'>
                <TextInput value={SearchText} onChange={(e) => setSearchText(e.nativeEvent.text)} placeholder='Search Jobs...' placeholderTextColor={colors.tailwind.slate[300]} className=' text-slate-700 w-[20rem] tracking-widest' />
              </View>
            </View>

            {(filteredApplications && filteredApplications?.length > 0) ? filteredApplications?.map((application) => {
              return <ApplicationCard refetch={refetch} key={application.id} data={application} />
            }) : <View className='h-[47rem] flex items-center justify-center gap-2'>
              <View className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center  mx-auto border border-slate-200 shadow-sm">
                <ClipboardList size={40} color={colors.tailwind.slate[300]}/>
              </View>
              <Text className='text-[16px] text-center text-slate-800 font-bold tracking-widest'>No Applications</Text>
              <Text className="text-[12px] text-slate-500 text-center w-96 tracking-wider">
                Your job search history will appear here. Tap the + to start logging.
              </Text>
            </View>}

          </View>
        </ScrollView>
      </SafeAreaView >
    </>
  )
}

export default applications
