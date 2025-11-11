import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="h-screen-safe bg-light-white dark:bg-dark-black">
      <Pressable className="bg-light-gray/60 dark:bg-dark-gray h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border border-light-activeborder/30 border-dashed"
      onPress={() => router.push("/(tabs)/home/templates")}
      >
        <Ionicons name="add" size={17} color={colorScheme === "light" ? "#838383" : "#ffffff"} />
        <Text className="text-light-activeborder dark:text-dark-white text-sm">Create Resume</Text>
      </Pressable>
    </SafeAreaView>
  );
}
