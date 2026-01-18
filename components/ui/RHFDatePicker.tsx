import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from './colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';

const RHFDatePicker = ({ onChange, value, errors }: { onChange:  (...event: any[]) => void, value?: Date, errors: string | undefined }) => {
    const [isOpen, setisOpen] = useState<boolean>(false);

    const handleconfirm = (date: Date) => {
        onChange(date);
        setisOpen(false);
    }

    const closedatepicker = () => {
        setisOpen(false);
    }


    return (
        <View className='flex gap-3'>
            <Pressable style={{
                padding: 10,
                backgroundColor: colors.tailwind.stone[100],
                borderWidth: 1,
                borderRadius: 4,
                borderColor: colors.tailwind.stone[300],
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
                onPress={() => setisOpen(true)}
            >
                <Text className='text-stone-600 tracking-widest'>{value ? <>{value?.toLocaleDateString()}</> : <>Select Date</>}</Text>
                <MaterialCommunityIcons name='calendar' color={'black'} size={16} />
            </Pressable>
            <DateTimePicker
                isVisible={isOpen}
                onConfirm={handleconfirm}
                onCancel={closedatepicker}
                date={value || new Date()}
                onChange={() => {
                    console.log("changed")
                }}
                themeVariant='light'
                isDarkModeEnabled={false}
            />
            {errors && <Text className='text-red-500'>{errors}</Text>}
        </View>
    )
}

export default RHFDatePicker