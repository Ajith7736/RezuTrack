import { Stack } from 'expo-router'
import React from 'react'

const ApplicationLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
        >
            <Stack.Screen name='index' />
        </Stack>
    )
}

export default ApplicationLayout