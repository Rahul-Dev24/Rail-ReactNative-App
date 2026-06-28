import { router } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Lock() {

    function unlock() {
        console.log("click");

        router.replace("/(tabs)/home");

    }

    return (

        <SafeAreaView>

            <Button title="Unlock" onPress={unlock} />

        </SafeAreaView>

    );

}