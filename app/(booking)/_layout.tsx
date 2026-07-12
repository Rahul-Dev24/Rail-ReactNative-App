
import { Tabs } from "expo-router";

import { BottomSheet } from "@/components/BottomSheet";
import { StatusBarBackground } from "@/components/StatusBarBackground";
import Images from "@/constant/image";
import { useStatusBar } from "@/hooks/useStatusBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                header: () => <HeaderComponent />,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="upcoming"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Upcoming"
                            focusColor="#EBBF94"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="completed"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Completed"
                            focusColor="green"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cancelled"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Cancelled"
                            focusColor="red"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="all"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="All"
                            focusColor="blue"
                        />
                    ),
                }}
            />
        </Tabs >
    );

}


function HeaderComponent() {
    const [sheetOpen, setSheetOpen] = useState(false);
    useStatusBar({ style: 'light' });

    const goBack = () => {
        router.push("/(tabs)/home");
    };

    return (
        <SafeAreaView>
            <StatusBarBackground color="#0066fe" />
            <View
                className="w-full flex-row items-center justify-between bg-[#0066fe] -mb-7 px-4 py-5"
            >
                <View className="flex-row items-center gap-4">
                    <FontAwesome6
                        onPress={goBack}
                        name="arrow-left-long"
                        size={13}
                        color="white"
                        style={{
                            padding: 8,
                            borderWidth: 1,
                            borderColor: "#D1D5DB",
                            borderRadius: 999,
                        }}
                    />

                    <Text
                        className="text-white text-lg font-[app-bold]"
                    >
                        My Bookings
                    </Text>
                </View>

                <FontAwesome6
                    onPress={() => setSheetOpen(true)}
                    name="arrow-down-short-wide"
                    size={20}
                    color="white"
                />

                <BottomSheet
                    visible={sheetOpen}
                    onClose={() => setSheetOpen(false)}
                    isClose={false}
                    title="Sort & Filters"
                    snapHeight="52%"
                    applyLabel="Apply"
                >
                    <View className="p-4">
                        <Text>Sort By</Text>
                    </View>
                </BottomSheet>
            </View>
        </SafeAreaView>
    );
}



// ─── Colors (from your screenshot) ───────────────────────────
const C = {
    blue: '#0066fe',        // tab bar blue
    white: '#FFFFFF',
    inactive: '#A0B0E0',    // inactive tab icon/label
    active: '#FFFFFF',      // active tab icon/label
    headerBg: '#FFFFFF',
    headerBorder: '#F0F0F0',
    text: '#0A1931',
};

// ─── Custom Tab Bar Icon ──────────────────────────────────────
function TabIcon({
    focused,
    label,
    focusColor
}: {
    focused: boolean;
    label: string;
    focusColor: string;
}) {
    return (
        <View
            style={[
                focused
                    ? styles.tabActive
                    : styles.tabInactive,
            ]}>
            <Image
                source={Images.ticket}
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? focusColor : "#7E7E87",
                    resizeMode: "contain",
                }}
            />

            <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={{
                    ...styles.tabLabel,
                    color: focused ? focusColor : "#7E7E87",
                }}
            >
                {label}
            </Text>
        </View>
    );
}


// ─── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#E3F5FF',
        height: Platform.OS === "ios" ? 84 : 86,
        paddingBottom: Platform.OS === "ios" ? 20 : 15,
        paddingTop: 10,
        elevation: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 8,
        overflow: 'hidden'
    },

    tabLabel: {
        fontSize: 10.5,
        fontWeight: "600",
        textAlign: "center",
        fontFamily: "app-regular"
    },

    tabActive: {
        marginTop: 15,
        width: 90,
        paddingHorizontal: 12,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        borderRadius: 10
    },

    tabInactive: {
        marginTop: 15,
        width: 90,
        height: 60,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
    },
});