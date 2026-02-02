import CustomText from '@/components/ui/CustomText'
import { useContent } from '@/context/ContentContext'
import { contentcard } from '@/lib/Contents/ContentCard'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { clsx } from 'clsx'
import { colors } from '@/components/ui/colors'
import { useResumeContent } from '@/context/ResumeContentContext'

const content = () => {

  const { selectedcontents, setselectedcontents } = useContent();
  const { ResumeContent } = useResumeContent();

  const [contents, setcontents] = useState<Set<string>>(new Set())


  const handlepress = (title: string) => {
    if (!contents.has(title)) {
      setcontents((prev) => new Set(prev).add(title))
    } else {
      setcontents((prev) => {
        const newset = new Set(prev);
        newset.delete(title);
        return newset;
      })
    }
  }

  const handlecontent = async () => {
    setselectedcontents(prev => new Set([...prev, ...contents]))
    
    // const { } = await supabase.from('Resume').update({
    //   ResumeContent : {
    //     ...ResumeContent,
    //     ...contents 
    //   }
    // })

    router.back();
  }


  return (
    <SafeAreaView className='flex-1 bg-white relative'>
      <CustomText className='text-xl m-5 font-extrabold tracking-widest'>Add Content</CustomText>
      <ScrollView className='flex gap-2'>
        {contentcard.map((content) => {
          return !selectedcontents.has(content.title) &&
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: contents.has(content.title) ? colors.tailwind.slate[400] : colors.tailwind.slate[200],
                boxShadow: "0 3px 10px rgb(0,0,0,0.04)"
              }}
              onPress={() => handlepress(content.title)}
              key={content.title}
              className={clsx(`m-5 p-5 flex gap-4  bg-slate-100 rounded-lg `)}>
              <View className='flex flex-row items-center '>
                <Text>{content.icon}</Text>
                <Text className='font-extrabold text-slate-500 tracking-widest uppercase w-full'> {content.title}</Text>
              </View>

              <CustomText className='text-sm text-stone-600 font-semibold '>{content.desc}</CustomText>
            </Pressable>
        })}
      </ScrollView>
      {contents.size > 0 && <Animated.View entering={FadeIn} exiting={FadeOut} className='absolute bottom-20 right-16'>
        <Pressable
          onPress={handlecontent}
          style={{
            boxShadow: "0 3px 10px rgb(99, 102, 241,0.3)",
          }}
          className='bg-indigo-500 rounded-md text-black py-4 px-5'
        >
          <Text
            className='uppercase tracking-widest font-bold text-white'
          >
            Submit
          </Text>
        </Pressable>
      </Animated.View>}
    </SafeAreaView>
  )
}

export default content

const styles = StyleSheet.create({
  contentstyle: {
    borderColor: "black"
  }
})