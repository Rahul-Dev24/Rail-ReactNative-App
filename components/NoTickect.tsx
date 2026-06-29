import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text, View } from "react-native";

export function NoTickect() {
    return (
        <View className="flex-1 justify-center items-center">
            <FontAwesome6 name="ticket" size={80} color="#bfbfbf" />
            <Text style={{ fontFamily: "app-regular" }} className="text-gray-500" >No Ticket Found. Swipe down to refresh.</Text>
        </View>
    )
}