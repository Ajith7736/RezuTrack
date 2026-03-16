import { colors } from '@/components/ui/colors'
import { Shield, Lock, Eye, FileText, Mail, Info, Server, UserCheck } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PrivacyPolicy = () => {
    const lastUpdated = "March 15, 2026"

    const sections = [
        {
            icon: <Info size={22} color={colors.tailwind.indigo[500]} />,
            title: "Introduction",
            content: "Welcome to RezuTrack. We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you use our mobile application."
        },
        {
            icon: <Lock size={22} color={colors.tailwind.indigo[500]} />,
            title: "Information We Collect",
            content: "• Account Data: Name, email, and profile picture via Google Sign-In.\n• Application Logs: Company names, roles, application dates, and statuses.\n• Documents: Resumes you upload or link within the app.\n• Usage Data: Information on how you interact with our features to help us improve."
        },
        {
            icon: <Shield size={22} color={colors.tailwind.indigo[500]} />,
            title: "Permissions",
            content: "RezuTrack may request access to:\n• Storage: To upload/download resumes.\n• Camera/Photos: To select resume files.\n• Network: To sync data with our secure servers."
        },
        {
            icon: <Server size={22} color={colors.tailwind.indigo[500]} />,
            title: "Data Storage & Security",
            content: "Your data is securely stored using industry-standard encryption through Supabase and Vercel. We implement strict security protocols to prevent unauthorized access or data breaches."
        },
        {
            icon: <UserCheck size={22} color={colors.tailwind.indigo[500]} />,
            title: "Your Rights",
            content: "You have the right to access, update, or delete your data at any time. You can manage your information directly within the app settings or by contacting our support team."
        },
        // {
        //     icon: <Mail size={22} color={colors.tailwind.indigo[500]} />,
        //     title: "Contact Us",
        //     content: "If you have any questions or concerns about this Privacy Policy, please reach out to us at:\n\nsupport@rezutrack.com"
        // }
    ]

    return (
        <SafeAreaView className="h-full bg-slate-50">
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                {/* Header Section */}
                <View className="items-center mb-10 mt-4">
                    <View className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-6 shadow-sm border border-indigo-200">
                        <Shield size={40} color={colors.tailwind.indigo[600]} />
                    </View>
                    <Text className="text-3xl font-extrabold text-slate-800 tracking-tight text-center mb-2">
                        Privacy <Text className="text-indigo-600">Policy</Text>
                    </Text>
                    <Text className="text-slate-400 text-center font-medium tracking-wide text-xs">
                        Last Updated: {lastUpdated}
                    </Text>
                </View>

                {/* Introductory Text */}
                <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <Text className="text-slate-600 leading-6 text-sm font-medium">
                        At RezuTrack, we believe your data belongs to you. This policy outlines our commitment to transparency and security in handling your professional information.
                    </Text>
                </View>

                {/* Policy Sections */}
                <View className="gap-6 mb-10">
                    {sections.map((section, index) => (
                        <View key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <View className="flex-row items-center gap-3 mb-3">
                                <View className="w-10 h-10 bg-indigo-50 rounded-xl items-center justify-center">
                                    {section.icon}
                                </View>
                                <Text className="text-lg font-bold text-slate-800">{section.title}</Text>
                            </View>
                            <Text className="text-slate-500 leading-6 text-[14px]">
                                {section.content}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Footer Section */}
                <View className="items-center gap-4 mb-8">
                    <View className="flex-row items-center gap-2">
                        <Lock size={14} color={colors.tailwind.slate[400]} />
                        <Text className="text-slate-400 text-xs tracking-widest font-medium uppercase">Secure & Private</Text>
                    </View>
                    <Text className="text-slate-300 text-xs text-center px-10">
                        © 2026 RezuTrack. All rights reserved.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicy