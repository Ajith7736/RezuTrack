import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from './colors'
import { ChevronDown } from 'lucide-react-native'
import { UseFormSetValue } from 'react-hook-form'
import { ApplicationInputs } from '@/lib/Schema/ApplicationForm'

const RHFDropDown = ({ onChange, value, setValue, dropdata, placeholder, error }: { onChange: Function, value: string, setValue?: UseFormSetValue<ApplicationInputs>, dropdata: { id?: string, name: string }[] | null, placeholder: string, error?: boolean }) => {
    const [expanded, setexpanded] = useState(false);


    const handleoptionclick = (optionvalue: string, id?: string) => {
        onChange(optionvalue);
        if (id && setValue) {
            setValue('resumeId', id as string);
        }
        setexpanded(false);
    }

    const handleselect = () => {
        onChange(undefined)
        setexpanded(false);
    }

    return (
        <View className='relative'>
            <Pressable onPress={() => setexpanded(!expanded)} style={{
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: colors.tailwind.slate[100],
                borderWidth: 1,
                borderRadius: 8,
                borderColor: error ? colors.tailwind.red[500] : colors.tailwind.slate[200]
            }} >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: value ? colors.tailwind.slate[600] : colors.tailwind.slate[300]
                    }}>{value ? value : <>{placeholder}</>}</Text>
                    <ChevronDown size={16} color={colors.tailwind.slate[600]} />
                </View>
            </Pressable>
            {expanded && <View style={{
                width: '100%',
                height: 'auto',
                position: 'absolute',
                zIndex: 100,
                backgroundColor: colors.tailwind.slate[50],
                borderWidth: 1,
                borderColor: colors.tailwind.slate[200],
                borderRadius: 10
            }} >
                <TouchableOpacity className='p-3' style={{
                    borderBottomWidth: 1,
                    borderColor: colors.tailwind.slate[200]
                }} onPress={handleselect}>
                    <Text className='text-slate-600 tracking-widest'>Select</Text>
                </TouchableOpacity>
                {dropdata?.map((data, indx) => {
                    return <TouchableOpacity onPress={() => handleoptionclick(data.name, data.id)} key={data.id ?? indx} className='p-3 ' style={{
                        borderBottomWidth: indx === dropdata.length - 1 ? 0 : 1,
                        borderColor: colors.tailwind.slate[200]

                    }}>
                        <Text className='text-slate-600 tracking-widest'>{data.name}</Text>
                    </TouchableOpacity>
                })}
            </View>}
        </View>
    )
}

export default RHFDropDown
