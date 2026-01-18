import React from 'react'
import { Pressable, Text } from 'react-native'

const SubmitButton = ({ children, onPress }: { children: React.ReactNode, onPress: () => void }) => {
  return (
    <Pressable className='bg-indigo-500 shadow-md h-14 flex justify-center rounded-md' onPress={onPress}>
      {children}
    </Pressable>
  )
}

export default SubmitButton

