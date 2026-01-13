import { Stack } from "expo-router";
import "./globals.css";
import Providers from "./Providers";


export default function RootLayout() {
  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Providers>
  );
}
