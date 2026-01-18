import React from 'react';
import { Text, TextInput } from 'react-native';


export default function RHFInput({ placeholder, onChange, value, errors }: { placeholder: string, errors: string | undefined, onChange?: () => void, value?: string }) {

    return (
        <>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={"#a8a29e"}
                className='px-3 py-3 border  border-stone-400/40 placeholder:font-medium tracking-widest rounded-md bg-stone-50' />
            {errors && <Text className='text-red-500'>{errors}</Text>}
        </>
    )
}




