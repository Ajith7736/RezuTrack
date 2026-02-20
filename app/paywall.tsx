import { colors } from '@/components/ui/colors'
import { useSession } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/Toast/ToastUtility'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Check, Crown, Rocket, Star, X } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Purchases, { PurchasesOfferings } from 'react-native-purchases'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const Paywall = () => {
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('pro')
    const [offerings, setofferings] = useState<PurchasesOfferings>()
    const { session } = useSession()
    const [isPurchasing, setisPurchasing] = useState(false)

    useEffect(() => {
        const fetchofferings = async () => {
            try {
                const offerings = await Purchases.getOfferings();

                setofferings(offerings)

            } catch (err) {
                console.error('Error while fetching offerings:', err);
            }
        }

        fetchofferings();

    }, [])


    const handlepurchase = async () => {
        const packageToPurchase = offerings?.current?.monthly;

        if (!packageToPurchase) {
            return
        }

        try {

            setisPurchasing(true)

            const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);

            if (typeof customerInfo.entitlements.active['Pro'] !== "undefined") {

                toast.success('Purchase Successfull')

                await new Promise(resolve => setTimeout(resolve, 2000));

                await supabase.auth.refreshSession();

                router.dismiss();
            }

        } catch (e: any) {
            if (!e.userCancelled) {
                toast.error(e.message || "Something went wrong with the purchase")
                console.error("Purchase Error : ", e.message);
            }
        } finally {
            setisPurchasing(false);
        }

    }

    const features = [
        { id: 1, text: 'Unlimited Resume Version Submission', free: false, pro: true },
        { id: 3, text: 'Priority Support', free: false, pro: true },
        { id: 4, text: 'Unlimited Application Submission', free: false, pro: true },
    ]

    return (
        <SafeAreaView className='flex-1 bg-slate-50'>
            <View className='flex-1 relative px-2'>
                <ScrollView
                    className='flex-1'
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 5 }}
                >
                    <Animated.View entering={FadeIn} className='items-center mb-8 mt-2'>
                        <View className='w-20 h-20 bg-indigo-100/50 rounded-3xl items-center justify-center mb-6 border border-indigo-100 shadow-sm'>
                            <Crown size={40} color={colors.tailwind.indigo[600]} />
                        </View>
                        <Text className='text-3xl font-extrabold text-slate-900 text-center mb-3 leading-tight'>
                            Unlock Pro Access
                        </Text>
                        <Text className='text-slate-600 text-center text-base px-2 leading-relaxed'>
                            Supercharge your career with AI-powered tools and premium features.
                        </Text>
                    </Animated.View>


                    <Animated.View entering={FadeIn.duration(700)}>
                        <Pressable
                            onPress={() => setSelectedPlan('pro')}
                            className={`mb-6 rounded-[28px] overflow-hidden relative border-2 ${selectedPlan === 'pro' ? 'border-indigo-600' : 'border-transparent'} shadow-sm`}
                        >
                            <LinearGradient
                                colors={[colors.tailwind.indigo[500], colors.tailwind.indigo[600]]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className='p-6'
                            >
                                <View className='absolute top-0 right-0 bg-slate-50 px-3 py-1 ' style={{
                                    borderStartEndRadius: 15
                                }}>
                                    <Text className='text-[10px] font-bold text-slate-700 uppercase tracking-widest'>Best Value</Text>
                                </View>

                                <View className='flex-row items-center justify-between mb-4 mt-2'>
                                    <View>
                                        <View className='flex-row items-center gap-2 mb-1'>
                                            <Text className='text-2xl font-bold text-white tracking-wide'>{offerings?.current?.monthly?.product.title}</Text>
                                        </View>
                                    </View>
                                    <View className=' flex flex-row items-end gap-2'>
                                        <Text className='text-3xl font-bold text-white'>{offerings?.current?.monthly?.product.pricePerMonthString}</Text>
                                        <Text className='text-xs tracking-widest text-white'>/ MONTH</Text>
                                    </View>
                                </View>

                                {selectedPlan === 'pro' && (
                                    <View className='mt-2 bg-white/20 p-3 rounded-xl border border-white/10'>
                                        <View className='flex flex-row items-center justify-center gap-2'>
                                            <Rocket size={15} color={'white'} />
                                            <Text className='text-indigo-50 tracking-widest text-xs text-center font-bold '>MOST POPULAR CHOICE</Text>
                                        </View>
                                    </View>
                                )}
                            </LinearGradient>
                        </Pressable>
                    </Animated.View>

                    {/* Free Plan Card */}
                    <Animated.View entering={FadeInDown.delay(300).springify()}>
                        <Pressable
                            onPress={() => setSelectedPlan('free')}
                            className={`mb-8 p-5 rounded-3xl border-2 ${selectedPlan === 'free' ? 'border-slate-400 bg-white' : 'border-slate-200 bg-slate-50'} relative overflow-hidden`}
                        >
                            <View className='flex-row items-center justify-between'>
                                <View>
                                    <Text className='text-lg font-bold text-slate-800'>Free Tier</Text>
                                    <Text className='text-slate-500 text-sm'>Basic access</Text>
                                </View>
                                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedPlan === 'free' ? 'border-slate-600' : 'border-slate-300'}`}>
                                    {selectedPlan === 'free' && <View className='w-3 h-3 rounded-full bg-slate-600' />}
                                </View>
                            </View>
                        </Pressable>
                    </Animated.View>

                    {/* Features List */}
                    <View className='bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6'>
                        <Text className='text-base font-bold text-slate-900 mb-6 uppercase tracking-wider'>Feature Comparison</Text>
                        <View className='gap-5'>
                            {features.map((feature) => (
                                <View key={feature.id} className='flex-row items-center justify-between'>
                                    <View className='flex-row items-center gap-3 flex-1 w-full'>
                                        <View className={`p-1.5 rounded-md ${feature.pro ? 'bg-indigo-50' : 'bg-slate-50'}`}>
                                            {feature.pro && !feature.free ? (
                                                <Star size={14} color={colors.tailwind.indigo[500]} fill={colors.tailwind.indigo[500]} />
                                            ) : (
                                                <View className='w-3.5 h-3.5 bg-slate-300 rounded-full opacity-50' />
                                            )}
                                        </View>
                                        <Text className='text-slate-700 font-medium text-xs flex-1 w-[30%] '>{feature.text}</Text>
                                    </View>

                                    <View className='flex-row items-center gap-3'>
                                        {feature.free ? (
                                            <Check size={12} color={colors.tailwind.slate[600]} />
                                        ) : (
                                            <View className='w-[18px] items-center'><X size={12} color={colors.tailwind.slate[300]} /></View>
                                        )}
                                        <View className='w-[1px] h-4 bg-slate-200' />
                                        <Check size={12} color={colors.tailwind.green[500]} />
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View className='flex-row justify-end mt-6 '>
                            <Text className='text-[8px] font-bold  text-center text-slate-400 uppercase'>Free</Text>
                            <Text className='text-[10px] font-bold w-[2px] text-center mx-2 text-slate-200'>|</Text>
                            <Text className='text-[8px] font-bold  text-center text-indigo-600 uppercase'>Pro</Text>
                        </View>
                    </View>
                </ScrollView>

                <View className='p-5'>
                    {!isPurchasing ? <TouchableOpacity onPress={() => {
                        if (selectedPlan === 'free') {
                            router.dismiss()
                        } else {
                            handlepurchase();
                        }
                    }} style={{
                        backgroundColor: selectedPlan === 'pro' ? colors.tailwind.indigo[500] : colors.tailwind.slate[900]
                    }} activeOpacity={0.8} className={`w-full  p-5 flex flex-row gap-2 items-center justify-center rounded-[28px]`}>
                        {selectedPlan === 'pro' && <Crown size={17} color={'white'} />}
                        <Text className='text-white tracking-widest'>
                            {selectedPlan === 'pro' ? 'Unlock Pro Access' : 'Continue with Free Plan'}
                        </Text>
                    </TouchableOpacity> : <View className={`w-full bg-indigo-500  p-5 flex flex-row gap-2 items-center justify-center rounded-[28px]`}>
                        <ActivityIndicator color={'white'} />
                        <Text className='text-white tracking-widest'>
                            Purchasing
                        </Text>
                    </View>}
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Paywall