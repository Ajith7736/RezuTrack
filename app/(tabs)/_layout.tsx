import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor : "blue",
            tabBarInactiveTintColor : "black",
            headerShown : false
        }}>
            <Tabs.Screen name='home' 
            options={{
                title: "Home", 
                tabBarIcon: ({ color, size }) => <Ionicons name='home-outline' size={size} color={color}/>
            }} />
            <Tabs.Screen name='settings' 
            options={{
                title: "Settings", 
                tabBarIcon: ({ color, size }) => <Ionicons name='settings-outline' size={size} color={color}/>
            }} />
    </Tabs>
    )
}

export default TabLayout