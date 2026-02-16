import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react-native'
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form'
import { colors } from '@/components/ui/colors'


const CompanyDropDown = <T extends FieldValues>({
    onChange,
    value,
    setValue,
    rhfid,
    rhfjobDescription,
    dropdata,
    placeholder,
    error
}: {
    onChange: Function,
    value: string,
    rhfjobDescription: Path<T>,
    setValue: UseFormSetValue<T>,
    dropdata: { id?: string, companyName: string, jobDescription: string }[] | null,
    placeholder: string,
    rhfid: Path<T>,
    error?: boolean
}) => {

    const [expanded, setexpanded] = useState(false);


    const handleoptionclick = (optionvalue: string, id?: string, jobDescription?: string) => {
        onChange(optionvalue);

        setValue(rhfid, id as any);

        setValue(rhfjobDescription, jobDescription as any);

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
                maxHeight: 300,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: 100,
                backgroundColor: colors.tailwind.slate[100],
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
                <ScrollView
                    persistentScrollbar
                    showsVerticalScrollIndicator
                >
                    {dropdata?.map((data, indx) => {
                        return <TouchableOpacity onPress={() => handleoptionclick(data.companyName, data.id, data.jobDescription)} key={data.id ?? indx} className='p-3 ' style={{
                            borderBottomWidth: indx === dropdata.length - 1 ? 0 : 1,
                            borderColor: colors.tailwind.slate[200]
                        }}>
                            <Text className='text-slate-600 tracking-widest'>{data.companyName}</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </View>
            }
        </View>
    )
}

export default CompanyDropDown;
