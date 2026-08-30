import { TicketCard } from "@/components/Ticket";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

const BRAND_ORANGE = "#800080";

// Replace with your real ticket-fetching call.
async function fetchUpcomingTickets(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1200));
}

export default function Upcoming() {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchUpcomingTickets();
            // setTickets(freshData) here once you're wired to real data
        } catch (err) {
            console.warn("Failed to refresh tickets:", err);
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={{
                paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[BRAND_ORANGE]}      // Android spinner color
                    tintColor={BRAND_ORANGE}     // iOS spinner color
                    title="Refreshing…"          // iOS-only pull label
                    titleColor="#6B7280"
                />
            }
        >
            <View className="flex flex-row items-center justify-between p-4 px-6">
                <View />
                <Text
                    style={{
                        color: '#F2AC6D',
                        fontSize: 14,
                        fontWeight: "700",
                        fontFamily: "app-regular",
                    }}
                >
                    Upcoming (1)
                </Text>
                <TouchableOpacity
                    onPress={handleRefresh}
                    disabled={refreshing}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <SimpleLineIcons
                        name="refresh"
                        size={16}
                        color={refreshing ? "#D1D5DB" : "#6B7280"}
                    />
                </TouchableOpacity>
            </View>
            <View className="w-full flex flex-col gap-4" >
                <TicketCard
                    ticketType="MONTHLY"
                    utsCode="XA74EDI00C"
                    sourceStation="GUMMIDIPUNDI"
                    destinationStation="GUINDY"
                    distance="63 km"
                    onBookAgain={() => console.log("Book Again")}
                    onViewDetails={() => {
                        router.push("../../view-ticket");
                    }}
                />
            </View>
        </ScrollView>
    );
}