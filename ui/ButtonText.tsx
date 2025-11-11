import React from 'react'
import { Text } from 'react-native'

const ButtonText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="text-white dark:text-dark-white">
      {children}
    </Text>
  )
}

export default ButtonText

