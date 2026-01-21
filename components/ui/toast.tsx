import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { FadeOut, FadeInUp } from "react-native-reanimated";
import { colors } from './colors';
import { useToast } from '@/context/ToastContext';

const ToastComponent = () => {

    const { isvisible, setisvisible, Toastmessage, success } = useToast();


    useEffect(() => {
        if (isvisible) {
            setTimeout(() => {
                setisvisible(false);
            }, 1500);
        }
    }, [isvisible])


    return (
        isvisible && <Animated.View entering={FadeInUp.duration(400)} exiting={FadeOut} style={{
            position: 'absolute',
            top: 80,
            left: '14%',
            backgroundColor: success ? colors.tailwind.emerald[200] : colors.tailwind.red[300],
            padding: 10,
            width: 300,
            borderWidth: 1,
            borderColor: success ? colors.tailwind.emerald[600] : colors.tailwind.red[600],
            zIndex: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            borderRadius: 6,
            boxShadow: "0 3px 10px rgba(0,0,0,0.06)"
        }}>
            <MaterialCommunityIcons name={success ? 'check' : 'close'} color={success ? colors.tailwind.emerald[600] : colors.tailwind.red[600]} size={17} />
            <Text style={{
                color: success ? colors.tailwind.emerald[600] : colors.tailwind.red[600]
            }} className=' tracking-widest text-center'>{Toastmessage} som</Text>
        </Animated.View>
    )
}

export default ToastComponent;
