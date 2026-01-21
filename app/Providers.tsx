import ToastComponent from '@/components/ui/toast'
import ContentProvider from '@/context/ContentContext'
import TemplateProvider from '@/context/TemplateContext'
import ToastProvider from '@/context/ToastContext'
import { UserDataProvider } from '@/context/UserDataContext'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <TemplateProvider>
                    <ContentProvider>
                        <UserDataProvider>
                            <ToastProvider>
                                <BottomSheetModalProvider>
                                    {children}
                                    <ToastComponent />
                                </BottomSheetModalProvider>
                            </ToastProvider>
                        </UserDataProvider>
                    </ContentProvider>
                </TemplateProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView >
    )
}

export default Providers