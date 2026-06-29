
import { Tabs } from "expo-router";

import { BottomSheet } from "@/components/BottomSheet";
import Images from "@/constant/image";
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

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                header: (e) => <HeaderComponent />,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    flex: 1,
                },
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

    const goBack = () => {
        router.replace("/(tabs)/home");
    }

    const [sheetOpen, setSheetOpen] = useState(false);


    return (
        <View className="w-full flex-row items-center pr-4 pl-2.5 py-4 justify-between text-white bg-[#0066fe]" >
            <View className="flex-row items-center gap-4">
                <FontAwesome6 onPress={goBack} className="p-2 border border-gray-300 rounded-full" name="arrow-left-long" size={13} color="white" />
                <Text style={{ fontFamily: "app-regular" }} className="text-white text-lg" >My Bookings</Text>
            </View>
            <FontAwesome6 onPress={() => setSheetOpen(true)} name="arrow-down-short-wide" size={20} color="white" />
            <BottomSheet
                visible={sheetOpen}
                onClose={() => setSheetOpen(false)}
                isClose={false}
                title="Sort & Filters"
                snapHeight="52%"
                applyLabel="Apply"
            >
                <View className="p-4" >
                    <Text>Sort By</Text>
                </View>
            </BottomSheet>
        </View>
    )
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
                    width: 30,
                    height: 30,
                    tintColor: focused ? focusColor : "#7E7E87",
                    resizeMode: "contain",
                }}
            />

            <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={{
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
        height: Platform.OS === "ios" ? 84 : 78,
        paddingBottom: Platform.OS === "ios" ? 20 : 8,
        paddingTop: 10,
        elevation: 0,
        borderTopWidth: 2,
        borderTopColor: '#000',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 8,
        overflow: 'hidden'
    },

    tabLabel: {
        fontSize: 10.5,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 6,
        fontFamily: "app-regular"
    },

    tabActive: {
        marginTop: 15,
        width: "auto",
        paddingHorizontal: 12,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        borderRadius: 10
    },

    tabInactive: {
        marginTop: 15,
        width: "auto",
        height: 60,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
    },
});