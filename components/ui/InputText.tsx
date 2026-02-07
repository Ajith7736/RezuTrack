import clsx from 'clsx';
import React, { useState } from 'react';
import { StyleProp, TextInput, TextInputProps } from 'react-native';
import { colors } from './colors';



export default function RHFInput({ placeholder, textarea = false, onChange, value, className, shadow = false, focusstyle = true, error, ...props }: TextInputProps & { placeholder?: string, onChange?: () => void, value?: string, textarea?: boolean, className?: string, shadow?: boolean, focusstyle?: boolean, error?: boolean }) {
    const [focused, setFocused] = useState(false)
    return (

        <TextInput
            multiline={textarea ? true : false}
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={colors.tailwind.slate[300]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[textarea ? {
                paddingVertical: 10,
                color: colors.tailwind.slate[700],
                borderWidth: 1,
                borderColor: !error ? focused && focusstyle ? colors.tailwind.slate[400] : colors.tailwind.slate[200] : colors.tailwind.red[500],
                boxShadow: shadow ? "0px 3px 10px rgba(0,0,0,0.06)" : '',
                textAlignVertical: 'top',
                height: "32%"
            } : {
                paddingHorizontal: 8,
                paddingVertical: 10,
                color: colors.tailwind.slate[700],
                borderWidth: 1,
                borderColor: !error ? focused && focusstyle ? colors.tailwind.slate[400] : colors.tailwind.slate[200] : colors.tailwind.red[500],
                boxShadow: shadow ? "0px 3px 10px rgba(0,0,0,0.06)" : ''
            }]}
            {...props}
            className={clsx(' placeholder:font-medium tracking-widest rounded-lg bg-slate-100', className)}
        />
    )
}




