import ContentProvider from '@/context/ContentContext'
import TemplateProvider from '@/context/TemplateContext'
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
                            <BottomSheetModalProvider>
                                {children}
                            </BottomSheetModalProvider>
                        </UserDataProvider>
                    </ContentProvider>
                </TemplateProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

export default Providers