import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {

    async function login() {

        await AsyncStorage.setItem("token", "12345");

        router.replace("/(auth)/lock");

    }

    return (

        <SafeAreaView>

            <Button title="Login" onPress={login} />

        </SafeAreaView>

    );

}