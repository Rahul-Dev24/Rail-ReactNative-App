import { TicketCard } from "@/components/Ticket";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
export default function Upcoming() {
    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={{
                paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex flex-row items-center justify-between p-4 px-6">
                <View></View>
                <Text
                    style={{
                        color: "#F2AC6D",
                        fontSize: 14,
                        fontWeight: "700",
                        fontFamily: "app-regular",
                    }}
                >
                    Upcoming (1)
                </Text>

                <SimpleLineIcons
                    name="refresh"
                    size={16}
                    color="#6B7280"
                />
            </View>
            <View className="w-full flex flex-col gap-4" >
                <TicketCard
                    ticketType="MONTHLY"
                    utsCode="XA74EDI00C"
                    bookingDate="Thu, 4 Jun 26"
                    sourceStation="GUMMIDIPUNDI"
                    destinationStation="GUINDY"
                    distance="63 km"
                    onBookAgain={() => console.log("Book Again")}
                    onViewDetails={() => { router.push("../view-ticket") }}
                />
                <TicketCard
                    ticketType="MONTHLY"
                    utsCode="XA74EDI00C"
                    bookingDate="Thu, 4 Jun 26"
                    sourceStation="GUMMIDIPUNDI"
                    destinationStation="GUINDY"
                    distance="63 km"
                    onBookAgain={() => console.log("Book Again")}
                    onViewDetails={() => console.log("View Details")}
                />
                <TicketCard
                    ticketType="MONTHLY"
                    utsCode="XA74EDI00C"
                    bookingDate="Thu, 4 Jun 26"
                    sourceStation="GUMMIDIPUNDI"
                    destinationStation="GUINDY"
                    distance="63 km"
                    onBookAgain={() => console.log("Book Again")}
                    onViewDetails={() => console.log("View Details")}
                />
                <TicketCard
                    ticketType="MONTHLY"
                    utsCode="XA74EDI00C"
                    bookingDate="Thu, 4 Jun 26"
                    sourceStation="GUMMIDIPUNDI"
                    destinationStation="GUINDY"
                    distance="63 km"
                    onBookAgain={() => console.log("Book Again")}
                    onViewDetails={() => console.log("View Details")}
                />

            </View>
        </ScrollView>
    )
}