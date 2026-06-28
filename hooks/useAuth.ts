import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUser() {
    const token = await AsyncStorage.getItem("token");

    return {
        isLoggedIn: !!token,
    };
}