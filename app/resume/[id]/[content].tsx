import Profile from '@/features/Contents/Profile/Profile';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const ContentDetail = () => {

    const { content } = useLocalSearchParams();

    return (
        <View className='flex-1 bg-light-white'>
            {content === "profile" && <Profile />}
        </View>
    )
}

export default ContentDetail
