import { colors } from '@/components/ui/colors'
import TemplateProvider from '@/context/TemplateContext'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'

const TabLayout = () => {
    const { colorScheme } = useColorScheme();
    return (
        <TemplateProvider>
            <Tabs screenOptions={{
                tabBarActiveTintColor : colors.tailwind.indigo[500],
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.tailwind.stone[50],
                    borderTopColor: colors.tailwind.stone[300],
                    borderTopWidth: 0.2,
                    height: 70,
                    paddingTop: 5,
                    boxShadow : "0 3px 9px rgb(0,0,0,0.12)",
                },
            }} >
                <Tabs.Screen name='home'
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => <Ionicons name='home-sharp' size={size} color={color} />
                    }} />
                <Tabs.Screen name='settings'
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, size }) => <Ionicons name='settings-sharp' size={size} color={color} />
                    }} />
            </Tabs>
        </TemplateProvider>
    )
}

export default TabLayout