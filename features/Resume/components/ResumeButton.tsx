import { colors } from '@/components/ui/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Pressable } from 'react-native'

const ResumeButton = ({ showresume, setshowresume }: { showresume: boolean, setshowresume: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { colorScheme } = useColorScheme();

    return (
        <Pressable className='dark:bg-dark-inputfield bg-light-inputfield p-5 border border-light-activeborder/20 transition-all w-[60px] flex justify-center items-center absolute bottom-10 right-5 z-10 ease-in-out duration-300 rounded-md' onPress={() => setshowresume(!showresume)}>
            <MaterialCommunityIcons name="file-search-outline" size={24} color={colorScheme === "light" ? colors.light.black : colors.dark.white} />
        </Pressable>
    )
}

export default ResumeButton