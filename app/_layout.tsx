import "@/global.css";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    "app-regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "app-semi-bold": require("../assets/fonts/Roboto-SemiBold.ttf"),
    "app-bold": require("../assets/fonts/Roboto-Bold.ttf"),
  })

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;


  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF" // Android only
      />
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        }
      }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
