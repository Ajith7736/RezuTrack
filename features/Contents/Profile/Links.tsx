import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import CustomText from '@/components/ui/CustomText'
import { Control, Controller } from 'react-hook-form'
import { ProfileProps, Setter } from '@/types/types'
import RHFInput from '@/components/ui/InputText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/components/ui/colors'

const Links = ({ indx, remove, control, link, ShowUrl, setShowUrl }: {
  indx: number,
  remove: Function,
  control: Control<ProfileProps>,
  link: {
    name: string,
    label: string,
    link: string
  },
  ShowUrl: {
    name: string | null,
    show: boolean
  }, setShowUrl: Setter<{
    name: string | null,
    show: boolean
  }>
}) => {
  return (
    <View key={indx} className='flex relative gap-2'>
      <View className='flex flex-row justify-between'>
        <CustomText className='uppercase text-sm w-[50%] font-bold tracking-widest text-stone-500'>{link.name}</CustomText>
        <Pressable className='w-[50%] flex items-end' onPress={() => {
          remove(indx)
        }}><Text className='text-sm text-end text-red-500 tracking-wider' >Remove</Text></Pressable>
      </View>

      <Controller
        control={control}
        name={`links.${indx}.label`}
        render={({ field: { onChange, value } }) => {
          return <RHFInput value={value} onChange={onChange} />
        }}
      />

      <Pressable onPress={() => {
        setShowUrl({
          name: link.name,
          show: !ShowUrl.show
        })
      }} className='absolute right-2 top-9 h-10 w-10 flex items-center justify-center'>
        <MaterialCommunityIcons name='link' size={20} color={colors.tailwind.indigo[500]} />
      </Pressable>


      {ShowUrl.name === link.name && ShowUrl.show && <Animated.View entering={FadeIn} exiting={FadeOut} className=' flex flex-row items-center absolute w-[85%] left-16 -top-3'>
        <Controller
          control={control}
          name={`links.${indx}.link`}
          render={({ field: { onChange, value } }) => {
            return <RHFInput onSubmitEditing={() => {
              setShowUrl({
                name: null,
                show: false
              })
            }} placeholder='Enter Url' className='w-[82%] h-full rounded-none' focusstyle={false} shadow value={value} onChange={onChange} />
          }}
        />
        <View className='bg-slate-100 p-2 w-[18%] border-y border-r border-slate-200 h-full'>
          <Pressable onPress={() => {
            setShowUrl({
              name: null,
              show: false
            })
          }} className=' bg-indigo-500  rounded-md w-full h-10 flex items-center justify-center'><MaterialCommunityIcons name='check' color={'white'} size={20} /></Pressable>
        </View>

      </Animated.View>}


    </View>
  )
}

export default Links
