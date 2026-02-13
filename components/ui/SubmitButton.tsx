import clsx from 'clsx'
import React from 'react'
import { Pressable } from 'react-native'

const SubmitButton = ({ children, onPress, className }: { children: React.ReactNode, onPress?: () => void, className?: string }) => {
  return (
    <Pressable style={{
      borderRadius : 15
    }} className={clsx('bg-indigo-500 shadow-md h-14 flex justify-center',className)} onPress={onPress}>
      {children}
    </Pressable>
  )
}

export default SubmitButton

