import 'react-native-gesture-handler';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import "../lib/reanimatedConfig"; // Must be first - configures Reanimated
import "./globals.css";
import Providers from "./Providers";


// Disable Reanimated strict mode warnings
if (__DEV__) {
  LogBox.ignoreLogs([
    '[Reanimated] Reading from `value`',
  ]);
}


export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="light" backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom"
        }}
      />
    </Providers>
  );
}
