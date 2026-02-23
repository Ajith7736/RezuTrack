import { colors } from '@/components/ui/colors'
import { useSession } from '@/context/AuthContext'
import ApplicationCard from '@/features/Application/components/ApplicationCard'
import { Application } from '@/lib/generated/prisma'
import { api } from '@/lib/Utils/FetchUtils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { ClipboardList, Plus, Search } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Applications = () => {

  const { session } = useSession();
  const [SearchText, setSearchText] = useState<string>("")
  const [DebounceText, setDebounceText] = useState<string>("")
  const [Status, setStatus] = useState<string>("")



  const { data: applications, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, isFetching, refetch } = useInfiniteQuery({
    queryKey: ['applications', DebounceText, Status],
    queryFn: async ({ pageParam }) => {
      const data = await api.post({ lastId: pageParam, userId: session?.user.id, Search: DebounceText, Status }, '/api/getapplication')

      if (!data) {
        throw new Error("Couldnt get data")
      }

      return data.applications as Application[];
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => {
      if (!lastpage || lastpage.length === 0) return undefined

      return lastpage[lastpage.length - 1].id;
    },
    select: (data) => data.pages.flat()
  })



  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceText(SearchText)
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [SearchText])


  const statuses = [
    { label: 'All', value: '' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Interviewing', value: 'Interviewing' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Pending', value: 'Pending' },
    { label: 'No Response', value: 'No_Response' },
    { label: 'Rejected', value: 'Rejected' },
  ];


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
              <TextInput value={SearchText} onChange={(e) => setSearchText(e.nativeEvent.text)} placeholder='Search Company...' placeholderTextColor={colors.tailwind.slate[300]} className=' text-slate-700 w-[20rem] tracking-widest' />
            </View>
          </View>

          <View className='flex flex-row flex-wrap gap-2'>
            {statuses.map((status) => {
              return <Pressable onPress={() => setStatus(status.value)} key={status.label} style={{
                borderColor: Status === status.value ? colors.tailwind.slate[500] : colors.tailwind.slate[100]
              }} className='bg-white w-[110px] p-2 border rounded-full'>
                <Text style={{
                  color: Status === status.value ? 'black' : colors.tailwind.slate[300]
                }} className='text-sm text-center  tracking-widest'>{status.label}</Text>
              </Pressable>
            })}
          </View>

          {isLoading || (isFetching && !isFetchingNextPage) ? <View style={{
            display: 'flex',
            paddingTop: 50,
            gap: 8
          }}>
            <ActivityIndicator color={colors.tailwind.slate[300]} />
            <Text className='text-center text-sm tracking-widest text-slate-300 '>Loading</Text>
          </View> : (applications && applications.length > 0) ?
            <FlatList
              data={applications || []}
              contentContainerStyle={{
                display: 'flex',
                gap: 8,
                paddingBottom: 20
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ index, item }) => <ApplicationCard data={item} index={index} refetch={refetch} />}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={isFetchingNextPage && hasNextPage && applications.length! >= 10 ?
                (<View style={{
                  marginTop: 15
                }}>
                  <ActivityIndicator color={colors.tailwind.slate[300]} />
                </View>) : null
              }
            />
            : <View style={{
              height: 460
            }} className=' flex items-center justify-center gap-2'>
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

export default Applications
