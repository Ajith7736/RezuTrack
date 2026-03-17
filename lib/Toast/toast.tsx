import { useToast } from '@/context/ToastContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import React, { ReactElement, useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { colors } from '../../components/ui/colors';

const ToastComponent = () => {

    const { isvisible, setisvisible, Toastmessage, type } = useToast();

    useEffect(() => {
        if (isvisible) {
            setTimeout(() => {
                setisvisible(false);
            }, 1500);
        }
    }, [isvisible])

    const Variant: Record<string, {
        icon: ReactElement
    }> = {
        success: {
            icon: <Feather name="check-circle" size={18} color={colors.tailwind.stone[500]} />,
        },
        error: {
            icon: <AntDesign name="close-circle" size={18} color={colors.tailwind.stone[500]} />,
        },
        warning: {
            icon: <Feather name="alert-triangle" size={18} color={colors.tailwind.stone[500]} />,
        },
    }


    return (
        isvisible && <Animated.View entering={FadeInUp.duration(400)} exiting={FadeOut} className={'w-full'} style={{
            position: 'absolute',
            top: 80,
            zIndex: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <View className='flex flex-row gap-8' style={{
                padding: 8,
                borderWidth: 1,
                borderRadius: 6,
                boxShadow: "0 3px 6px rgba(0,0,0,0.02)",
                borderColor: colors.tailwind.stone[100],
                backgroundColor: 'white'
            }}>
                {Variant[type].icon}
                <Text lineBreakMode='tail' numberOfLines={1} style={{
                    color: colors.tailwind.stone[500],
                    width  : 160
                }} className='tracking-widest text-sm '>{Toastmessage}</Text>
            </View>
        </Animated.View>
    )
}

export default ToastComponent;
