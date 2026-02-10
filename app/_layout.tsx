import { useSession } from "@/context/AuthContext";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import "../lib/reanimatedConfig"; // Must be first - configures Reanimated
import "./globals.css";
import Providers from "./Providers";


SplashScreen.preventAutoHideAsync();


function InitialLayout() {

  const { session } = useSession();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}

    >
      <Stack.Protected guard={!!session?.user}>
        <Stack.Screen name="(tabs)" options={{
          animation: 'fade'
        }} />

        <Stack.Screen name='insightpage' />

        <Stack.Screen name='(forms)/applicationform' options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
          sheetAllowedDetents: [0.88],
          sheetCornerRadius: 35,
          sheetElevation: 50
        }} />

        <Stack.Screen name='(forms)/resumeform' options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
          sheetAllowedDetents: [0.7],
          sheetCornerRadius: 35,
          sheetElevation: 50,
        }} />
        <Stack.Screen name='(settings)/about' options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
          sheetAllowedDetents: [0.7],
          sheetCornerRadius: 35,
          sheetElevation: 50,
        }} />

        <Stack.Screen name='(status)/status' options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
          sheetAllowedDetents: [0.62],
          sheetCornerRadius: 35,
          sheetElevation: 50,
        }} />


      </Stack.Protected>

      <Stack.Protected guard={!session?.user}>
        <Stack.Screen name="index" />
      </Stack.Protected>

    </Stack>
  )
}



export default function RootLayout() {

  return (
    <Providers>
      <StatusBar style="light" backgroundColor="transparent" />
      <InitialLayout />
    </Providers>
  );
}
