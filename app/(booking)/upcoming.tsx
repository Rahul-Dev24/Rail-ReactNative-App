import { TicketCard } from "@/components/Ticket";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Upcoming() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                <View className="relative items-center justify-center py-4">
                    <Text
                        style={{
                            color: "#F2AC6D",
                            fontSize: 12,
                            fontWeight: "700",
                            letterSpacing: 1.5,
                            fontFamily: "app-regular",
                        }}
                    >
                        Upcoming (1)
                    </Text>

                    <SimpleLineIcons
                        name="refresh"
                        size={18}
                        color="#6B7280"
                        style={{
                            position: "absolute",
                            right: 23,
                            top: "50%",
                            marginTop: -9,
                        }}
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
        </SafeAreaView>
    )
}