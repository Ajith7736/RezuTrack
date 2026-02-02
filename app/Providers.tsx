import { AuthProvider } from '@/context/AuthContext'
import ContentProvider from '@/context/ContentContext'
import { ResumeContentProvider } from '@/context/ResumeContentContext'
import TemplateProvider from '@/context/TemplateContext'
import ToastProvider from '@/context/ToastContext'
import ToastComponent from '@/lib/Toast/toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'



const queryClient = new QueryClient();


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <TemplateProvider>
                            <ContentProvider>
                                <ResumeContentProvider>
                                    <ToastProvider>
                                        <BottomSheetModalProvider>
                                            {children}
                                            <ToastComponent />
                                        </BottomSheetModalProvider>
                                    </ToastProvider>
                                </ResumeContentProvider>
                            </ContentProvider>
                        </TemplateProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView >
    )
}

export default Providers