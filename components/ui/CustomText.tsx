import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { Text } from 'react-native'

const CustomText = ({ className, children }: { className?: string, children: ReactNode }) => {
  return (
    <Text className={clsx(`text-stone-600`,className)}>
      {children}
    </Text>
  )
}

export default CustomText