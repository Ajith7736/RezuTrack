import React from 'react'
import { Pressable, Text } from 'react-native'

const SubmitButton = ({ children, onPress }: { children: React.ReactNode, onPress: () => void }) => {
  return (
    <Pressable className='bg-light-black dark:bg-dark-white p-4 rounded-md' onPress={onPress}>
      <Text className='text-white dark:text-black font-bold text-center'>{children}</Text>
    </Pressable>
  )
}

export default SubmitButton

