import RHFInput from '@/components/ui/InputText'
import RHFDocumentPicker from '@/components/ui/RHFDocumentPicker'
import SubmitButton from '@/components/ui/SubmitButton'
import { useSession } from '@/context/AuthContext'
import { delay } from '@/lib/customdelay'
import { ResumeformInputs, Resumeformschema } from '@/lib/Schema/ResumeForm'
import { api } from '@/lib/Utils/FetchUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { router } from 'expo-router'
import { ArrowRight } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'


const ResumeForm = () => {
    const queryClient = useQueryClient();
    const { session } = useSession();
    const [dots, setdots] = useState("")


    const { control, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<ResumeformInputs>({
        resolver: zodResolver(Resumeformschema),
        defaultValues: {
            name: '',
            notes: '',
            resumeContent: ''
        }
    })


    const onSubmit = async (data: ResumeformInputs) => {
        try {
            await delay(1);

            await api.post({ data, userId: session?.user.id }, '/api/addresume');

            await queryClient.invalidateQueries({
                queryKey: ["Resumes"]
            })

            router.dismiss()

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            const interval = setInterval(() => {
                setdots(prev => {
                    if (prev === "...") {
                        return ""
                    }
                    return prev + "."
                })
            }, 100)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isSubmitting, dots])


    return (
        <View className='flex-1 flex justify-between bg-slate-50' style={{
            padding: 30
        }}>
            <View className='flex gap-3'>
                <View>
                    <Text className="text-2xl font-extrabold tracking-widest text-slate-700">New Version</Text>
                    <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
                        Target specific niche or role
                    </Text>
                </View>


                <Text className={clsx("text-[12px] mt-5  font-bold tracking-wider", errors.name ? 'text-red-500' : 'text-slate-500')}>
                    LABEL *
                </Text>
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { value, onChange }, formState: { errors } }) => {
                        return <RHFInput value={value} onChange={onChange} error={errors.name?.message ? true : false} placeholder='eg: Senoir Software Engineer' />
                    }}
                />
                <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
                    VERSION NOTES
                </Text>
                <Controller
                    control={control}
                    name='notes'
                    render={({ field: { value, onChange }, formState: { errors } }) => {
                        return <RHFInput textarea value={value} onChange={onChange} error={errors.notes?.message ? true : false} placeholder='Hightlights' />
                    }}
                />
                <Text className={clsx("text-[12px] font-bold tracking-wider", errors.resumeContent ? 'text-red-500' : 'text-slate-500')}>
                    RESUME *
                </Text>
                <Controller
                    control={control}
                    name='resumeContent'
                    render={({ field: { onChange }, formState: { errors } }) => {
                        return <RHFDocumentPicker onChange={onChange} errors={errors.resumeContent?.message} />
                    }}
                />
            </View>
            <SubmitButton onPress={handleSubmit(onSubmit)} className=' mt-10'>
                {isSubmitting ? <View className='flex flex-row items-center gap-1 justify-center'>
                    <Text className='text-white tracking-widest font-bold text-center'>Saving </Text>
                    <Text className='text-white w-4'>{dots}</Text>
                </View> : <View className='flex flex-row items-center justify-center'>
                    <Text className='text-white tracking-widest font-bold text-center '>Save Resume </Text>
                    <ArrowRight color={'white'} size={18} />
                </View>}
            </SubmitButton>
        </View>
    )
}

export default ResumeForm;
