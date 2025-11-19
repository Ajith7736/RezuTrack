import TemplateProvider from "@/context/TemplateContext";
import { Stack } from "expo-router";
import "./globals.css";


export default function RootLayout() {
  return (
    <TemplateProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </TemplateProvider>
  );
}
