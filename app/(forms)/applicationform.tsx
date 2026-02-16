import RHFInput from '@/components/ui/InputText'
import RHFDatePicker from '@/components/ui/RHFDatePicker'
import RHFDropDown from '@/components/ui/RHFDropDown'
import SubmitButton from '@/components/ui/SubmitButton'
import { useSession } from '@/context/AuthContext'
import { delay } from '@/lib/customdelay'
import { ApplicationInputs, ApplicationSchema } from '@/lib/Schema/ApplicationForm'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { ArrowRight } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

const ApplicationForm = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const [dots, setdots] = useState("")
  const [resumedata, setresumedata] = useState<{
    name: string,
    id: string
  }[] | null>(null)

  const { control, handleSubmit, formState: { isSubmitting }, setValue, watch } = useForm<ApplicationInputs>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      companyName: "",
      date: undefined,
      jobDescription: '',
      link: '',
      resumeId: '',
      resumeUsed: '',
      roleTitle: '',
      status: undefined
    }
  })

  useEffect(() => {
    fetchresumenames()
  }, [])


  const fetchresumenames = async () => {
    const { data, error } = await supabase.from('Resume').select('id,name').eq('userId', session?.user.id as string)

    if (error) {
      console.error(error);
      return
    }

    setresumedata(data)
  }

  const Status = [
    { name: 'Applied' },
    { name: 'Pending' },
    { name: 'Interviewing' },
    { name: 'No_Response' },
    { name: 'Rejected' },
    { name: 'Offer' },
  ]


  const onSubmit = async (data: ApplicationInputs) => {
    await delay(1);
    const { error } = await supabase.from('Application').upsert({
      companyName: data.companyName,
      Date: data.date?.toISOString() || "",
      jobDescription: data.jobDescription || "",
      Link: data.link || "",
      resumeId: data.resumeId,
      resumeUsed: data.resumeUsed,
      roleTitle: data.roleTitle,
      Status: data.status,
      userId: session?.user.id as string
    })

    if (error) {
      console.error(error.message);
      toast.error(error.message);
    }

    await queryClient.invalidateQueries({
      queryKey: ['RecentApplications']
    })

    await queryClient.invalidateQueries({
      queryKey: ['applications']
    })

    router.dismiss();
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
      }, 50)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isSubmitting, dots])


  return (
    <View style={{ padding: 30 }} className='flex-1 bg-slate-50'>
      <KeyboardAvoidingView behavior='height' style={{
        flex: 1
      }} keyboardVerticalOffset={100}>
        <ScrollView>
          <View>
            <Text className="text-2xl font-extrabold tracking-widest text-slate-700">New Log</Text>
            <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
              Log your latest application
            </Text>
          </View>

          <View className='mt-10 flex  gap-3'>
            <Text className="text-[12px] text-slate-500 font-bold tracking-wider">
              JOB DETAILS *
            </Text>
            <Controller
              control={control}
              name='companyName'
              render={({ field: { value, onChange }, formState: { errors } }) => {
                return <RHFInput value={value} onChange={onChange} error={errors.companyName?.message ? true : false} placeholder='Company Name' />
              }}
            />
            <Controller
              control={control}
              name='roleTitle'
              render={({ field: { value, onChange }, formState: { errors } }) => {
                return <RHFInput value={value} onChange={onChange} error={errors.roleTitle?.message ? true : false} placeholder='Role Title' />
              }}
            />
            <Text className="text-[12px] mt-5 text-slate-500 font-bold tracking-wider">
              RESUME USED *
            </Text>
            <Controller
              control={control}
              name='resumeUsed'
              render={({ field: { value, onChange }, formState: { errors } }) => {
                return <RHFDropDown setValueField='resumeId' placeholder='Select Resume' error={errors.resumeUsed?.message ? true : false} dropdata={resumedata} onChange={onChange} value={value} setValue={setValue} />
              }}
            />
            <View className='flex flex-row items-center w-full gap-3'>
              <View className='flex gap-2' style={{
                width: '45%'
              }}>
                <Text className="text-[12px] mt-5 text-slate-500 font-bold tracking-wider">
                  DATE *
                </Text>
                <Controller
                  control={control}
                  name='date'
                  render={({ field: { value, onChange }, formState: { errors } }) => {
                    return <RHFDatePicker value={value} onChange={onChange} error={errors.date?.message ? true : false} />
                  }}
                />
              </View>
              <View className='flex gap-2' style={{
                width: '50%'
              }}>
                <Text className="text-[12px] mt-5 text-slate-500 font-bold tracking-wider">
                  STATUS *
                </Text>
                <Controller
                  control={control}
                  name='status'
                  render={({ field: { value, onChange }, formState: { errors } }) => {
                    return <RHFDropDown placeholder='Select Status' value={value} error={errors.status?.message ? true : false} onChange={onChange} dropdata={Status} />
                  }}
                />
              </View>

            </View>


            <Text className="text-[12px] mt-2 text-slate-500 font-bold tracking-wider">
              JOB DESC (optional)
            </Text>
            <Controller
              control={control}
              name='jobDescription'
              render={({ field: { value, onChange }, formState: { errors } }) => {
                return <RHFInput textarea value={value} onChange={onChange} placeholder='Job Description' />
              }}
            />

            <Text className="text-[12px] mt-2 text-slate-500 font-bold tracking-wider">
              LINK
            </Text>
            <Controller
              control={control}
              name='link'
              render={({ field: { value, onChange }, formState: { errors } }) => {
                return <RHFInput value={value} onChange={onChange} placeholder='Paste link here' />
              }}
            />
          </View>
          <SubmitButton onPress={handleSubmit(onSubmit)} className=' mt-10'>
            {isSubmitting ? <View className='flex flex-row items-center gap-1 justify-center'>
              <Text className='text-white tracking-widest font-bold text-center'>Saving </Text>
              <Text className='text-white w-4'>{dots}</Text>
              {/* <ActivityIndicator size={'small'} color={'white'} /> */}
            </View> : <View className='flex flex-row items-center justify-center'>
              <Text className='text-white tracking-widest font-bold text-center '>Save Application </Text>
              <ArrowRight color={'white'} size={18} />
            </View>}
          </SubmitButton>

        </ScrollView>
      </KeyboardAvoidingView>
    </View >
  )
}

export default ApplicationForm
