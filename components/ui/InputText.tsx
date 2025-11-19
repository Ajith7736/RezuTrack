import { useColorScheme } from 'nativewind';
import React from 'react';
import { TextInput } from 'react-native';
import { colors } from './colors';

export default function InputText({ placeholder , onChange , value }: { placeholder: string , onChange? : () => void , value? : string}) {

    const { colorScheme } = useColorScheme();

    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={colorScheme === "dark" ? colors.dark.activeBorder : colors.light.textGray}
            className='px-3 py-3 border border-light-activeborder/20 dark:border-dark-inputborder rounded-md bg-light-inputfield text-black dark:text-white dark:bg-dark-inputfield' />
    )
}




