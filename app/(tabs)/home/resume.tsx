import ResumePreview from "@/features/Resume/components/ResumePreview";
import { colors } from "@/ui/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Resume = () => {
    const [showresume, setshowresume] = useState<boolean>(false)
    const { colorScheme } = useColorScheme()


   

    return (
        <SafeAreaView className='h-screen-safe  relative bg-light-gray dark:bg-dark-black'>
            <Text className='p-5 text-black dark:text-white font-bold text-lg'>Resume Information</Text>
            <Pressable className=' dark:bg-dark-inputfield bg-light-activeborder/10 p-5 border border-light-activeborder/20 transition-all w-[60px] flex justify-center items-center absolute z-20 bottom-10 left-5 ease-in-out duration-300 rounded-md' onPress={() => setshowresume(!showresume)}>
                <MaterialCommunityIcons name="file-search-outline" size={24} color={colorScheme === "light" ? colors.light.black : colors.dark.white} />
            </Pressable>
            <TextInput placeholder='enter your name' className='px-3 m-5 border border-light-activeborder/20 dark:border-dark-inputborder rounded-md bg-light-inputfield  dark:bg-dark-inputfield placeholder:text-light-activeborder'></TextInput>
            {showresume && <>
                <ResumePreview />
            </>}

        </SafeAreaView>
    )
}

export default Resume;