import { useSession } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import "./globals.css";
import Providers from "./Providers";



function InitialLayout() {

  const { session } = useSession();

  if (Platform.OS == 'web') {
    return null
  }

  useEffect(() => {
    if (Platform.OS === 'web' || !Purchases) return;

    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: '' });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: 'test_WGyIThBWgffFQSBorrUBKITKHPL' });
    }
  }, [])

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

        <Stack.Screen name='paywall' options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
          sheetAllowedDetents: [0.95],
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
