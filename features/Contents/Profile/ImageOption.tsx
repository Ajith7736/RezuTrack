import { colors } from '@/components/ui/colors';
import { useSession } from '@/context/AuthContext';
import { toast } from '@/lib/Toast/ToastUtility';
import { ProfileProps, Setter } from '@/types/types';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import React, { RefObject } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ImageUpload } from './ImageUpload';
import { UseFormSetValue } from 'react-hook-form';
import DeleteImage from './DeleteImage';

const ImageOption = ({ setValue, onChange, path, BottomSheetRef, setisSheetOpen }: { setValue: UseFormSetValue<ProfileProps>, onChange: Function, path: string | undefined, BottomSheetRef: RefObject<BottomSheetModal | null>, isSheetOpen: boolean, setisSheetOpen: Setter<boolean> }) => {

    const { session } = useSession();

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

                    const { success, error, url, path } = await ImageUpload(result.assets[0], session?.user.id)

                    if (success) {
                        onChange(url);
                        setValue('profilepic.path', path)
                    } else {
                        toast.error('Couldnt Upload Image')
                    }


                    BottomSheetRef.current?.close();
                }
            } else {
                toast.warn('Permisson required !')
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
                    const { success, error, url, path } = await ImageUpload(result.assets[0], session?.user.id)

                    if (success) {
                        onChange(url);
                        setValue('profilepic.path', path);
                    } else {
                        toast.error('Couldnt Upload Image')
                    }

                    BottomSheetRef.current?.close();

                }

            } else {
                toast.warn('Permisson required !')
            }


        } catch (err) {
            console.error(err);
        }
    }

    const handledelete = () => {
        if (path) {
            DeleteImage(path as string);
            setValue('profilepic',undefined)
            BottomSheetRef.current?.close();
        }
    }


    const BackDropComponent = (props: any) => {
        return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}   {...props} />
    }


    return (
        <BottomSheetModal
            ref={BottomSheetRef}
            index={0}
            snapPoints={['20%']}
            backgroundStyle={{
                backgroundColor: colors.tailwind.stone[50],
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 35,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.tailwind.stone[700],
                shadowRadius: 10,
                width: "10%"
            }}
            enableContentPanningGesture={false}
            enablePanDownToClose={true}
            backdropComponent={BackDropComponent}
            onChange={(index) => {
                setisSheetOpen(index >= 0)
            }}
        >
            <BottomSheetView className={` p-10 rounded-lg flex flex-row gap-8`}>
                <View className='flex gap-3'>
                    <Pressable onPress={handlecamera} className='bg-slate-100 border border-slate-200 h-16 w-16 flex items-center justify-center'>
                        <FontAwesome name='camera' size={20} />
                    </Pressable>
                    <Text className='text-xs tracking-widest text-center font-bold uppercase w-full'>Capture</Text>
                </View>
                <View className='flex gap-3'>
                    <Pressable onPress={handlegallery} className='bg-slate-100  h-16 w-16 border border-slate-200 flex items-center justify-center'>
                        <MaterialCommunityIcons name='view-gallery' size={20} />
                    </Pressable>
                    <Text className='text-xs tracking-widest text-center font-bold uppercase w-full'>Gallery</Text>
                </View>
                <View className='flex gap-3'>
                    <Pressable onPress={handledelete} className='bg-slate-100  h-16 w-16 border border-slate-200 flex items-center justify-center'>
                        <MaterialCommunityIcons name='delete' size={20} />
                    </Pressable>
                    <Text className='text-xs tracking-widest text-center font-bold uppercase w-full'>Delete</Text>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default ImageOption