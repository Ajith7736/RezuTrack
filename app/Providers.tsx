import { AuthProvider } from '@/context/AuthContext'
import ToastProvider from '@/context/ToastContext'
import ToastComponent from '@/lib/Toast/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'



const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2
        }
    }
});


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaProvider >
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ToastProvider>
                        {children}
                        <ToastComponent />
                    </ToastProvider>
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}

export default Providers