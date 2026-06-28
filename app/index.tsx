import { router } from "expo-router";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import { getUser } from "../hooks/useAuth";



SplashScreen.preventAutoHideAsync();

export default function Index() {

  useEffect(() => {

    startApp();

  }, []);

  async function startApp() {

    try {

      // Fake loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      const user = await getUser();

      if (user.isLoggedIn) {

        router.replace("/(auth)/lock");

      } else {

        router.replace("/(auth)/login");

      }

    } finally {

      await SplashScreen.hideAsync();

    }

  }

  return null;
}