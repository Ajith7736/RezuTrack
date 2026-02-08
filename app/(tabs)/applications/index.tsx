import { colors } from '@/components/ui/colors'
import Loading from '@/components/ui/Loading'
import { useSession } from '@/context/AuthContext'
import ApplicationCard from '@/features/Application/components/ApplicationCard'
import { Application } from '@/lib/generated/prisma'
import { api } from '@/lib/Utils/FetchUtils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { ClipboardList, Plus, Search } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const applications = () => {

  const { session } = useSession();
  const [SearchText, setSearchText] = useState<string>("")
  const [DebounceText, setDebounceText] = useState<string>("")



  const { data: applications, hasNextPage, fetchNextPage, isLoading, refetch } = useInfiniteQuery({
    queryKey: ['applications'],
    queryFn: async ({ pageParam }) => {
      const data = await api.post({ lastId: pageParam, userId: session?.user.id }, '/api/getapplication')

      if (!data) {
        throw new Error("Couldnt get data")
      }
      return data.applications as Application[];
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => {
      if (!lastpage || lastpage.length === 0) return undefined
      console.log(lastpage[lastpage.length - 1].id)
      return lastpage[lastpage.length - 1].id;
    }
  })

  useEffect(() => {
    console.log(JSON.stringify(applications, null, 2));
  }, [applications])







  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceText(SearchText)
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [SearchText])


  const [Status, setStatus] = useState("All")

  const FilterStatus = ["All", "Applied", "Interviewing", "Rejected", "Offer"]


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

        <View className='flex gap-3' style={{ paddingBottom: 150 }}>
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

          {(applications?.pages && applications?.pages.length > 0) ?
            <FlatList
              data={applications.pages.flat() || []}
              keyExtractor={(item) => item.id}
              renderItem={({ index, item }) => <View style={{ marginBottom: 15 }}><ApplicationCard data={item} index={index} refetch={refetch} /></View>}
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.5}
            />
            : <View className='h-[47rem] flex items-center justify-center gap-2'>
              <View className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center  mx-auto border border-slate-200 shadow-sm">
                <ClipboardList size={40} color={colors.tailwind.slate[300]} />
              </View>
              <Text className='text-[16px] text-center text-slate-800 font-bold tracking-widest'>No Applications</Text>
              <Text className="text-[12px] text-slate-500 text-center w-96 tracking-wider">
                Your job search history will appear here. Tap the + to start logging.
              </Text>
            </View>}

        </View>
      </SafeAreaView >
    </>
  )
}

export default applications
