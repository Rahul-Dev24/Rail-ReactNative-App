import AnimatedSplash from "@/components/AnimatedSplash";
import GlobalLoader from "@/components/GlobalLoader";
import "@/global.css";
import { loaderRef } from "@/hooks/loader";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    "app-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "app-semi-bold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "app-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  })

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // if (loaded || error) SplashScreen.hideAsync();
    if (loaded || error) {
      setAppReady(true);
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;


  return (
    <>
      <GlobalLoader ref={loaderRef} />
      <AnimatedSplash appReady={appReady}>
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
          <Stack.Screen name="un-reserved-booking" />
          <Stack.Screen name="view-ticket" />
        </Stack>
      </AnimatedSplash>

    </>
  )
}
