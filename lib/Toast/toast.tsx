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
        icon: ReactElement,
        backgroundColor: string
        borderColor: string
        textColor: string
    }> = {
        success: {
            icon: <Feather name="check-circle" size={18} color={colors.tailwind.emerald[500]} />,
            backgroundColor: colors.tailwind.emerald[100],
            borderColor: colors.tailwind.emerald[200],
            textColor: colors.tailwind.emerald[500]
        },
        error: {
            icon: <AntDesign name="close-circle" size={18} color={colors.tailwind.red[500]} />,
            backgroundColor: colors.tailwind.red[100],
            borderColor: colors.tailwind.red[200],
            textColor: colors.tailwind.red[500]
        },
        warning: {
            icon: <Feather name="alert-triangle" size={18} color={colors.tailwind.amber[500]} />,
            backgroundColor: colors.tailwind.amber[100],
            borderColor: colors.tailwind.amber[200],
            textColor: colors.tailwind.amber[500]
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
            <View className='flex flex-row gap-3' style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 6,
                boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                borderColor: Variant[type].borderColor,
                backgroundColor: Variant[type].backgroundColor
            }}>
                {Variant[type].icon}
                <Text style={{
                    color: Variant[type].textColor
                }} className='tracking-widest text-center'>{Toastmessage}</Text>
            </View>
        </Animated.View>
    )
}

export default ToastComponent;
