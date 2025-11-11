import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {

  return <View className={'h-screen-safe bg-light-white dark:bg-dark-black'}>
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="templates" options={{ title: "Template" }} />
      <Stack.Screen name="resume" options={{ title: "Resume" }} />
    </Stack>
  </View>
}
