import { colors } from '@/components/ui/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

const ResumeButton = ({ onPress }: { onPress: () => void }) => {

    return (
        <Pressable className=' p-5 border border-stone-200 w-[60px] flex justify-center items-center absolute bottom-10 right-5 rounded-md' style={[{
            zIndex: 15,
            backgroundColor: colors.tailwind.stone[50],

        }, styles.shadow]} onPress={onPress}>
            <MaterialCommunityIcons name="file-search-outline" size={24} color={"#44403c"} />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    shadow: {
        boxShadow: "0 3px 2px rgb(0,0,0,0.05)"
    }
})

export default ResumeButton