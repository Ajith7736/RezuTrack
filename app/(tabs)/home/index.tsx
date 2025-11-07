import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="h-screen-safe bg-light-white">
      <View className="bg-light-gray/60 h-[15rem] m-5 w-[10rem] rounded-md flex justify-center items-center border border-light-activeborder/30 border-dashed">
        <Ionicons name="add" size={18} color={"#838383"} />
        <Text className="text-light-activeborder text-sm">Create Resume</Text>
      </View>
    </SafeAreaView>
  );
}
