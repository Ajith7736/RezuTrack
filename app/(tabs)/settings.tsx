import { Themeprops } from "@/types/types";
import { useColorScheme } from "nativewind";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {

  const { colorScheme, setColorScheme } = useColorScheme();

  const Themes: Themeprops[] = ["light", "dark", "system"]


  return (
    <SafeAreaView className='flex-1 bg-light-white dark:bg-dark-black'>
      <Text className='m-5 text-lg font-semibold dark:text-dark-white text-light-black '>Theme</Text>
      <View className='mx-5 border border-light-activeborder/20 rounded-md'>
        {Themes.map((theme) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              key={theme}
              className={`bg-light-gray/20 dark:bg-dark-gray flex flex-row justify-between items-center border border-light-activeborder/20 border-x-0 ${theme === "light" ? "border-b-0 border-t-0" : "border-b-0"}  px-5 py-6  justify-center`}
              onPress={() => {setColorScheme(theme)
              }}
            >
              <Text className={` ${colorScheme === theme ? 'text-light-black dark:text-dark-white' : 'text-light-activeborder'} capitalize`}>
                {theme}
              </Text>
              <View className={`h-[2rem] w-[2rem]  ${colorScheme === theme ? 'bg-light-white' : 'bg-light-gray'} border border-light-activeborder/50 rounded-full flex justify-center items-center`}>
                {colorScheme === theme && <View className={`h-[1.4rem] w-[1.4rem] bg-light-black/90  border-2 border-white rounded-full `}>
                </View>}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mode: {
    padding: 20
  }
})

export default Settings