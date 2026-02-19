import { colors } from '@/components/ui/colors'
import RHFDropDown from '@/components/ui/RHFDropDown'
import TitleBackButton from '@/components/ui/TitleBackButton'
import { useSession } from '@/context/AuthContext'
import CompanyDropDown from '@/features/JobMatch/CompanyDropDown'
import { MatchInputs, MatchSchema } from '@/lib/Database/Schema/MatchSchema'
import { ScoreProps } from '@/lib/Database/Schema/ScoreSchema'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { api } from '@/lib/Utils/FetchUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Sparkles } from 'lucide-react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import Animated, { FadeIn } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'



const JobMatchPage = () => {
    const { session } = useSession()
    const queryClient = useQueryClient();
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<{ score: number; missing: string[]; emphasize: string[] } | null>(null)

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<MatchInputs>({
        resolver: zodResolver(MatchSchema),
        defaultValues: {
            resumeId: '',
            resumeName: '',
            jobDescription: '',
            applicationId: '',
            companyName: ''
        }
    })

    const { data: Scoredata, isFetching } = useQuery({
        queryKey: ["Score"],
        queryFn: async () => {
            const { data, error } = await supabase.from('Score').select('*').eq("userId", session?.user.id as string).single()

            if (error) {
                throw new Error('Db Error')
            }

            return data.Scoredata as ScoreProps || {};
        }
    })

    const { data, isLoading: isLoadingResumes } = useQuery({
        queryKey: ['resumes'],
        queryFn: async () => {

            const [applications, resumes] = await Promise.all([getApplications(), getResumes()])

            return { applications, resumes }
        },
        enabled: !!session?.user
    })

    const getApplications = async () => {
        const { data, error } = await supabase.from('Application').select('companyName,id,jobDescription').eq('userId', session?.user.id as string)

        if (error) {
            console.error('Error fetching Applications:', error)
            return []
        }

        return data;
    }

    const getResumes = async () => {

        const { data, error } = await supabase
            .from('Resume')
            .select('id, name')
            .eq('userId', session?.user.id as string)

        if (error) {
            console.error('Error fetching resumes:', error)
            return []
        }
        return data;
    }

    const onSubmit = async (data: MatchInputs) => {
        try {
            setAnalyzing(true)
            setResult(null)

            const res = await api.post({ userId: session?.user.id, applicationId: data.applicationId }, '/api/getscore');

            if (res.success) {
                await queryClient.invalidateQueries({
                    queryKey: ["Score"]
                })
            }


        } catch (err) {
            console.error(err);
            toast.error('Server Error')
        } finally {
            setAnalyzing(false);
        }
    }





    return (
        <SafeAreaView className='flex-1 bg-slate-50'>
            <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 20 }}>
                <View className='p-5'>
                    <TitleBackButton title='Job Match Analysis' />

                    <View className='mt-6'>
                        <Text className='text-slate-500 mb-6 text-sm'>
                            Improve your chances by tailoring your resume to the job description.
                        </Text>

                        <View className='gap-4'>


                            <View>
                                <Text className='text-slate-700 font-semibold mb-2 ml-1'>Application</Text>
                                {isLoadingResumes ? (
                                    <ActivityIndicator color={colors.tailwind.indigo[500]} />
                                ) : (<Controller
                                    control={control}
                                    name="companyName"
                                    render={({ field: { onChange, value } }) => (
                                        <CompanyDropDown
                                            dropdata={data?.applications ?? []}
                                            onChange={onChange}
                                            rhfid='applicationId'
                                            rhfjobDescription='jobDescription'
                                            placeholder='Select Application'
                                            setValue={setValue}
                                            value={value}
                                            error={!!errors.applicationId?.message || !!errors.companyName?.message || !!errors.jobDescription?.message}
                                        />
                                    )}
                                />)}

                                {(errors.applicationId || errors.companyName || errors.jobDescription) && (
                                    <Text className='text-red-500 text-xs ml-1 mt-1'>
                                        {errors.applicationId?.message || errors.companyName?.message || errors.jobDescription?.message}
                                    </Text>
                                )}

                            </View>

                            {/* Resume Selection */}
                            <View>
                                <Text className='text-slate-700 font-semibold mb-2 ml-1'>Select Resume</Text>
                                {isLoadingResumes ? (
                                    <ActivityIndicator color={colors.tailwind.indigo[500]} />
                                ) : (
                                    <Controller
                                        control={control}
                                        name="resumeName"
                                        render={({ field: { onChange, value } }) => (
                                            <RHFDropDown
                                                value={value}
                                                onChange={onChange}
                                                setValueField='resumeId'
                                                setValue={setValue}
                                                dropdata={data?.resumes ?? []}
                                                placeholder="Select a resume to compare"
                                                error={!!errors.resumeId}
                                            />
                                        )}
                                    />
                                )}

                                {(errors.resumeId || errors.resumeName) && (
                                    <Text className='text-red-500 text-xs ml-1 mt-1'>
                                        {errors.resumeId?.message || errors.resumeName?.message}
                                    </Text>
                                )}
                            </View>

                            <Pressable
                                onPress={() => session?.user.app_metadata.subscription === "Pro" ? handleSubmit(onSubmit)() : router.push('/paywall')}
                                disabled={analyzing || isLoadingResumes}
                                className={`mt-4 p-4 rounded-xl flex-row h-14 justify-center items-center gap-2`}
                                style={{ backgroundColor: colors.tailwind.indigo[500] }}
                            >
                                {analyzing || isFetching ? (
                                    <>
                                        <ActivityIndicator color="white" />
                                    </>
                                ) : (
                                    <>
                                        <Text className='text-white font-semibold text-lg tracking-widest'>Analyze Match</Text>
                                    </>
                                )}
                            </Pressable>
                        </View>
                    </View>

                    {Scoredata && (
                        <Animated.View entering={FadeIn} className='mt-10'>
                            <View className='bg-white rounded-3xl p-6 border border-slate-100 shadow-sm'>
                                <Text className='text-center text-slate-800 tracking-widest text-xl font-bold mb-6'>Match Score Analysis</Text>

                                <View className='items-center relative justify-center mb-8'>
                                    <PieChart
                                        donut
                                        innerRadius={80}
                                        radius={100}
                                        data={[
                                            { value: Scoredata.score, color: colors.tailwind.indigo[500], focused: true },
                                            { value: 100 - Scoredata.score, color: colors.tailwind.slate[200] }
                                        ]}
                                        centerLabelComponent={() => (
                                            <View className='items-center justify-center'>
                                                <Text className='text-2xl font-bold tracking-widest text-indigo-500'>
                                                    {Scoredata.score}%
                                                </Text>
                                                <Text className='text-slate-500 font-medium tracking-widest text-xs'>
                                                    Match Score
                                                </Text>
                                            </View>
                                        )}
                                    />
                                </View>

                                <View className='gap-6'>

                                    <View className=' p-4 rounded-xl border border-slate-200'>
                                        <View className='flex-row items-center gap-2 mb-3'>
                                            <Text className='font-semibold text-red-700 tracking-widest'>Missing Skills</Text>
                                        </View>
                                        <View className='gap-2 pl-2'>
                                            {Scoredata.missing.map((item, idx) => (
                                                <View key={idx} className='flex-row items-start gap-2'>
                                                    <View className='w-1.5 h-1.5 rounded-full bg-slate-900 mt-2' />
                                                    <Text className='text-slate-800 flex-1 tracking-wider'>{item}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>

                                    <View className=' p-4 rounded-xl border border-slate-200'>
                                        <View className='flex-row items-center gap-2 mb-3'>
                                            <Text className='font-semibold text-green-700 tracking-widest'>Matching Strengths</Text>
                                        </View>
                                        <View className='gap-2 pl-2'>
                                            {Scoredata.emphasize.map((item, idx) => (
                                                <View key={idx} className='flex-row items-start gap-2'>
                                                    <View className='w-1.5 h-1.5 rounded-full bg-slate-900 mt-2' />
                                                    <Text className='text-slate-800 flex-1 tracking-wider'>{item}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default JobMatchPage
