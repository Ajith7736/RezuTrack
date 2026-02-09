import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { colors } from './colors';

const RHFDatePicker = ({ onChange, value, error }: { error: boolean, onChange: (...event: any[]) => void, value: Date | null }) => {
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
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: colors.tailwind.slate[100],
                borderWidth: 1,
                borderRadius: 8,
                borderColor: error ? colors.tailwind.red[500] : colors.tailwind.slate[200],
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
                onPress={() => setisOpen(true)}
            >
                <Text className='text-slate-600 tracking-widest'>{value ? <>{value.toLocaleDateString()}</> : <>Select Date</>}</Text>
                <MaterialCommunityIcons name='calendar' color={colors.tailwind.slate[500]} size={16} />
            </Pressable>
            <DateTimePicker
                isVisible={isOpen}
                onConfirm={handleconfirm}
                onCancel={closedatepicker}
                date={value || new Date()}
                themeVariant='light'
                isDarkModeEnabled={false}
            />
        </View>
    )
}

export default RHFDatePicker