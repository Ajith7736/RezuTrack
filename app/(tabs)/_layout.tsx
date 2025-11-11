import { colors } from '@/ui/colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'

const TabLayout = () => {
    const { colorScheme } = useColorScheme();
    return (
        <Tabs screenOptions={{
            headerStyle : {
                backgroundColor : colorScheme === "light" ? colors.light.gray : colors.dark.gray,
            },
            headerTintColor : colorScheme === "light" ? colors.light.black : colors.dark.white,
            headerShown : false,
            tabBarStyle : {
                backgroundColor : colorScheme === "light" ? colors.light.white : colors.dark.gray,
                borderTopColor : colors.dark.activeBorder,
                borderTopWidth : 0.2,
                height : 70,
                paddingTop : 5
            }
        }} >
            <Tabs.Screen name='home' 
            options={{
                title: "Home", 
                tabBarIcon: ({ color, size }) => <Ionicons name='home-sharp' size={size} color={color}/>
            }} />
            <Tabs.Screen name='settings' 
            options={{
                title: "Settings", 
                tabBarIcon: ({ color, size }) => <Ionicons name='settings-sharp' size={size} color={color}/>
            }} />
    </Tabs>
    )
}

export default TabLayout