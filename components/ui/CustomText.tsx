import React, { ReactNode } from 'react'
import { Text } from 'react-native'

const CustomText = ({ className, children }: { className?: string, children: ReactNode }) => {
  return (
    <Text className={`${className} text-black dark:text-white`}>
      {children}
    </Text>
  )
}

export default CustomText