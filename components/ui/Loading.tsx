import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { colors } from './colors'

const Loading = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center'  }} className='h-screen bg-slate-50'>
           <ActivityIndicator size={'large'} color={colors.tailwind.indigo[500]}/>
        </View>
    )
}

export default Loading;
