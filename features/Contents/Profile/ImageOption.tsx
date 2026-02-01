import { View, Text, Pressable } from 'react-native'
import React, { SetStateAction } from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

const ImageOption = ({ setModalVisible, image, setimage, onChange }: { setModalVisible: React.Dispatch<SetStateAction<boolean>>, onChange: Function, image: string, setimage: React.Dispatch<SetStateAction<string>> }) => {


    const handlecamera = async () => {
        try {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (permission.granted) {
                let result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1
                })

                if (!result.canceled) {
                    setimage(result.assets[0].uri);
                    onChange(result.assets[0].uri);
                    setModalVisible(false);
                }
            }

        } catch (err) {
            console.error(err);
        }
    }

    const handlegallery = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permission.granted) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    mediaTypes: ['images'],
                    quality: 1,
                    aspect: [1, 1]
                })

                if (!result.canceled) {
                    setimage(result.assets[0].uri);
                    onChange(result.assets[0].uri); 
                    setModalVisible(false);
                }

            }


        } catch (err) {
            console.error(err);
        }
    }

    const handledelete = () => {
        setimage('');
        onChange('');
    }


    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} className={`absolute h-screen w-full flex items-center justify-center z-30 bg-black/40`}>
            <Pressable className='bg-white absolute top-20 right-8 rounded-md' onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name='close' size={30} />
            </Pressable>
            <Animated.View entering={FadeInDown} exiting={FadeOut} className={`bg-white p-10 rounded-lg border border-stone-300 flex flex-row gap-7`}>
                <View className='flex gap-3'>
                    <Pressable onPress={handlecamera} className='bg-stone-50 border border-stone-200 h-16 w-16 flex items-center justify-center'>
                        <FontAwesome name='camera' size={20} />
                    </Pressable>
                    <Text className='text-sm tracking-widest text-center font-bold'>Capture</Text>
                </View>
                <View className='flex gap-3'>
                    <Pressable onPress={handlegallery} className='bg-stone-50 h-16 w-16 border border-stone-200 flex items-center justify-center'>
                        <MaterialCommunityIcons name='view-gallery' size={20} />
                    </Pressable>
                    <Text className='text-sm tracking-widest text-center font-bold'>Gallery</Text>
                </View>
                <View className='flex gap-3'>
                    <Pressable onPress={handledelete} className='bg-stone-50 h-16 w-16 border border-stone-200 flex items-center justify-center'>
                        <MaterialCommunityIcons name='delete' size={20} />
                    </Pressable>
                    <Text className='text-sm tracking-widest text-center font-bold'>Delete</Text>
                </View>
            </Animated.View>
        </Animated.View>
    )
}

export default ImageOption