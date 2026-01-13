import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, TextInput } from 'react-native';
import { colors } from './colors';

export default function InputText({ placeholder, onChange, value, errors }: { placeholder: string, errors: string | undefined, onChange?: () => void, value?: string }) {

    return (
        <>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={"#a8a29e"}
                className='px-3 py-3 border border-light-activeborder/20 dark:border-dark-inputborder rounded-md bg-stone-100' />
            {errors && <Text className='text-red-500'>{errors}</Text>}
        </>
    )
}




