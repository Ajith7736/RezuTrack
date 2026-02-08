import { colors } from '@/components/ui/colors'
import {  Briefcase,  Heart, Shield, Star } from 'lucide-react-native'
import React from 'react'
import {  ScrollView, Text,  View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AboutApp = () => {

    const features = [
        {
            icon: <Briefcase size={24} color={colors.tailwind.indigo[500]} />,
            title: "Application Tracking",
            description: "Keep track of every job application, interview status, and follow-up deadline in one place."
        },
        {
            icon: <Star size={24} color={colors.tailwind.indigo[500]} />,
            title: "Career Organization",
            description: "Manage your entire job search journey with intuitive tools designed for success."
        }
    ]

    return (
        <SafeAreaView className="h-full bg-slate-50">

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                {/* Header Section */}
                <View className="items-center mb-10 mt-4">
                    <View className="w-24 h-24 bg-indigo-100 rounded-3xl items-center justify-center mb-6 shadow-sm border border-indigo-200">
                        <Briefcase size={48} color={colors.tailwind.indigo[600]} />
                    </View>
                    <Text className="text-3xl font-extrabold text-slate-800 tracking-tight text-center mb-2">
                        Rezu<Text className="text-indigo-600">Track</Text>
                    </Text>
                    <Text className="text-slate-500 text-center font-medium tracking-wide">
                        Version 1.0.0
                    </Text>
                </View>

                {/* Mission Statement */}
                <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <Text className="text-slate-700 leading-7 italic text-base font-medium text-center">
                        Our mission is to empower job seekers with the tools they need to land their dream jobs. We believe that building a great resume and managing applications should be simple, efficient, and stress-free.
                    </Text>
                </View>

                {/* Features List */}
                <View className="gap-4 mb-10">
                    <Text className="text-lg font-bold text-slate-800 mb-2 ml-1">Key Features</Text>
                    {features.map((feature, index) => (
                        <View key={index} className="bg-white p-5 rounded-xl border border-slate-100 flex-row gap-4 items-start">
                            <View className="w-12 h-12 bg-indigo-50 rounded-full items-center justify-center shrink-0">
                                {feature.icon}
                            </View>
                            <View className="flex-1">
                                <Text className="text-base font-bold text-slate-800 mb-1">{feature.title}</Text>
                                <Text className="text-slate-500 leading-5 text-sm">{feature.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Footer Section */}
                <View className="items-center gap-6 mb-8">
                    <View className="flex-row items-center gap-2">
                        <Text className="text-slate-400 text-xs tracking-widest font-medium">Made with</Text>
                        <Heart size={16} color={colors.tailwind.rose[500]} fill={colors.tailwind.rose[500]} />
                        <Text className="text-slate-400 text-xs tracking-widest font-medium">for Job Seekers</Text>
                    </View>

                    <Text className="text-slate-300 text-xs text-center px-10">
                        © 2026 Resume Builder App. All rights reserved.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutApp