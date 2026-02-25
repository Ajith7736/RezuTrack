import { colors } from '@/components/ui/colors'
import { useSession } from '@/context/AuthContext'
import { toast } from '@/lib/Toast/ToastUtility'
import { api } from '@/lib/Utils/FetchUtils'
import { Status } from '@/lib/generated/prisma'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { router, useLocalSearchParams } from 'expo-router'
import {
    BadgeCheck,
    Check,
    Clock,
    MailQuestion,
    Send,
    Users,
    XCircle
} from 'lucide-react-native'
import React, { ReactElement, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const status = () => {
    const { status, id }: { status: Status, id: string } = useLocalSearchParams();
    const [selectedstatus, setselectedstatus] = useState<Status>(status)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const queryClient = useQueryClient();
    const { session } = useSession()

    const dropdata: { name: Status, icon: ReactElement, description: string }[] = [
        { name: 'Applied', icon: <Send size={24} color={colors.tailwind.indigo[600]} />, description: 'Application submitted successfully' },
        { name: 'Pending', icon: <Clock size={24} color={colors.tailwind.amber[600]} />, description: 'Awaiting response from employer' },
        { name: 'Interviewing', icon: <Users size={24} color={colors.tailwind.purple[600]} />, description: 'Currently in the interview stages' },
        { name: 'No_Response', icon: <MailQuestion size={24} color={colors.tailwind.slate[600]} />, description: 'Haven\'t heard back after a while' },
        { name: 'Rejected', icon: <XCircle size={24} color={colors.tailwind.red[600]} />, description: 'Application was not successful' },
        { name: 'Offer', icon: <BadgeCheck size={24} color={colors.tailwind.emerald[600]} />, description: 'Received a job offer!' },
    ];

    const variants = {
        "Applied": {
            color: colors.tailwind.indigo[500],
            bg: colors.tailwind.indigo[100],
            border: colors.tailwind.indigo[500]
        },
        "Pending": {
            color: colors.tailwind.amber[500],
            bg: colors.tailwind.amber[100],
            border: colors.tailwind.amber[500]
        },
        "Interviewing": {
            color: colors.tailwind.purple[500],
            bg: colors.tailwind.purple[100],
            border: colors.tailwind.purple[500]
        },
        "No_Response": {
            color: colors.tailwind.slate[500],
            bg: colors.tailwind.slate[100],
            border: colors.tailwind.slate[500]
        },
        "Rejected": {
            color: colors.tailwind.red[500],
            bg: colors.tailwind.red[100],
            border: colors.tailwind.red[500]
        },
        "Offer": {
            color: colors.tailwind.emerald[500],
            bg: colors.tailwind.emerald[100],
            border: colors.tailwind.emerald[500]
        }
    }

    const handleselect = async (newStatus: Status) => {
        if (newStatus === selectedstatus) return;

        try {
            setIsLoading(true);
            setselectedstatus(newStatus);

            await api.put({ userId: session?.user.id, applicationId: id, Status: newStatus }, '/api/updatestatus')

            await queryClient.invalidateQueries({
                queryKey: ['applications']
            })

            await queryClient.invalidateQueries({
                queryKey: ['resumesuccess']
            })

            await queryClient.invalidateQueries({
                queryKey: ['RecentApplications']
            })

            toast.success('Status updated');
            setTimeout(() => {
                if (router.canGoBack()) {
                    router.back();
                } else {
                    router.push('/');
                }
            }, 500);

        } catch (err) {
            console.error(err)
            toast.error('Server Error');
            setselectedstatus(status);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView className='bg-slate-50 flex-1'>
            <View className="px-5 pt-5 pb-2">
                <Text className="text-3xl font-extrabold text-slate-900 tracking-tight">Update Status</Text>
                <Text className="text-sm text-slate-500 font-medium mt-2">Keep track of where you are in the hiring process.</Text>
            </View>

            <FlatList
                data={dropdata}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{
                    padding: 20,
                    gap: 16,
                }}
                renderItem={({ item }) => {
                    const isSelected = item.name === selectedstatus;
                    const variant = variants[item.name as Status];

                    return (
                        <TouchableOpacity
                            onPress={() => handleselect(item.name as Status)}
                            activeOpacity={0.7}
                            disabled={isLoading}
                            className={clsx(
                                'rounded-3xl p-4 flex-row items-center justify-between shadow-sm bg-white',
                            )}
                            style={{
                                borderWidth: isSelected ? 2 : 1,
                                borderColor: isSelected ? variant.color : colors.tailwind.slate[100],
                                ...(isSelected && {
                                    shadowColor: variant.color,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 3,
                                    elevation: 2
                                })
                            }}
                        >
                            <View className='flex-row items-center gap-4 flex-1'>
                                <View
                                    style={{ backgroundColor: variant.bg }}
                                    className='h-14 w-14 rounded-2xl flex justify-center items-center'
                                >
                                    {item.icon}
                                </View>
                                <View className="flex-1">
                                    <Text
                                        style={{ color: isSelected ? variant.color : colors.tailwind.slate[800] }}
                                        className={clsx('font-bold text-base')}
                                    >
                                        {item.name.replace('_', ' ')}
                                    </Text>
                                    <Text className="text-xs font-medium text-slate-400 mt-0.5">
                                        {item.description}
                                    </Text>
                                </View>
                            </View>

                            <View className="ml-3">
                                {isLoading && isSelected ? (
                                    <ActivityIndicator color={variant.color} />
                                ) : (
                                    <View
                                        className={clsx(
                                            'h-7 w-7 rounded-full flex justify-center items-center border-2',
                                        )}
                                        style={{
                                            backgroundColor: isSelected ? variant.color : 'transparent',
                                            borderColor: isSelected ? variant.color : colors.tailwind.slate[200]
                                        }}
                                    >
                                        {isSelected && <Check size={14} color={'white'} strokeWidth={3} />}
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default status