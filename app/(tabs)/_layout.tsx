import { colors } from '@/components/ui/colors'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Stack, Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'


type Ioniconname = React.ComponentProps<typeof Ionicons>['name']

const TabIcon = ({ focused, label, size, iconname }: { focused: boolean, label: string, size: number, iconname: Ioniconname }) => {


    return (
        <View
            style={[{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
                width: 75,
            }]}
        >
            <Ionicons name={iconname} size={size} color={focused ? colors.tailwind.indigo[500] : colors.tailwind.slate[600]} />

            <Text style={{
                color: focused ? colors.tailwind.indigo[500] : colors.tailwind.slate[700],
                fontSize: 10
            }} className='tracking-widest  font-bold'>{label}</Text>
        </View>
    )
}

const TabLayout = () => {


    return (
        <Tabs initialRouteName='applications' screenOptions={{
            tabBarActiveTintColor: colors.tailwind.indigo[500],
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: colors.tailwind.stone[50],
                borderTopColor: colors.tailwind.slate[300],
                borderTopWidth: 0.2,
                height: 80,
                paddingTop: 18,
            },
        }} >
            <Tabs.Screen name='home'
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused, size }) => <TabIcon iconname={focused ? 'home-sharp' : 'home-outline'} focused={focused} label='Home' size={size} />
                }} />
            <Tabs.Screen name='applications'
                options={{
                    title: "Applications",
                    tabBarIcon: ({ focused, size }) => <TabIcon iconname={focused ? 'document-text-sharp' : 'document-text-outline'} focused={focused} label='Applications' size={size} />
                }} />
            <Tabs.Screen name='resumes'
                options={{
                    title: "Resumes",
                    tabBarIcon: ({ focused, size }) => <TabIcon focused={focused} iconname={focused ? 'documents-sharp' : 'documents-outline'} label='Resumes' size={size} />
                }} />
            <Tabs.Screen name='settings'
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused, size }) => <TabIcon focused={focused} iconname={focused ? 'settings-sharp' : 'settings-outline'} label='Settings' size={size} />
                }} />
        </Tabs>
    )
}

export default TabLayout