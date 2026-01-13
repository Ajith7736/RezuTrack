import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TemplateProvider from '@/context/TemplateContext'
import ContentProvider from '@/context/ContentContext'
import { UserDataProvider } from '@/context/UserDataContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaProvider>
            <TemplateProvider>
                <ContentProvider>
                    <UserDataProvider>
                        {children}
                    </UserDataProvider>
                </ContentProvider>
            </TemplateProvider>
        </SafeAreaProvider>
    )
}

export default Providers