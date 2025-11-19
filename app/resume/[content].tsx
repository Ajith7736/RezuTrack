import Profile from '@/components/contents/Profile';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const ContentDetail = () => {

    const { content } = useLocalSearchParams();

    return (
        <View className='flex-1 bg-light-white dark:bg-dark-black'>
            {content === "profile" && <Profile />}
        </View>
    )
}

export default ContentDetail;
