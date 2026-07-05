import "@/global.css";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    "app-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "app-semi-bold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "app-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  })

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;


  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        }
      }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(booking)" />
      </Stack>
    </>
  )
}
