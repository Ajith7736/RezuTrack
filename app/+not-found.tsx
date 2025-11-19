import CustomText from '@/components/ui/CustomText'
import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const NotFound = () => {
  return (
    <View className='flex-1 justify-center items-center bg-light-gray dark:bg-dark-black'>
      <View className='flex items-center gap-2'>
        <CustomText className='text-9xl font-bold'>404</CustomText>
        <CustomText>Page not found</CustomText>
        <Link href={"/(tabs)/home"} className='text-white dark:text-black bg-light-black dark:bg-dark-white font-extrabold px-3 py-3 rounded-md border-light-activeborder/20'>Go to HomePage</Link>
      </View>
    </View>
  )
}

export default NotFound