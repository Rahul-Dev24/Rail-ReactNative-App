
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function TabLayout() {

    async function logout() {

        await AsyncStorage.removeItem("token");

        router.replace("/(auth)/login");

    }

    return (

        // <View>

        //     <Button title="Logout" onPress={logout} />

        // </View>

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    flex: 1,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    // header: () => <RailOneHeader />,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Home"
                            icon={
                                <Ionicons
                                    name={focused ? 'home' : 'home-outline'}
                                    size={22}
                                    color={focused ? C.active : C.inactive}
                                />
                            }
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="tickets"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="My Bookings"
                            icon={
                                <MaterialIcons
                                    name="confirmation-number"
                                    size={24}
                                    color={focused ? C.active : C.inactive}
                                />
                            }
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="you"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="You"
                            icon={
                                <Ionicons
                                    name={focused ? 'person' : 'person-outline'}
                                    size={22}
                                    color={focused ? C.active : C.inactive}
                                />
                            }
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Menu"
                            icon={
                                <Ionicons
                                    name="menu"
                                    size={22}
                                    color={focused ? C.active : C.inactive}
                                />
                            }
                        />
                    ),
                }}
            />
        </Tabs >

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
    icon,
    label,
}: {
    focused: boolean;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <View style={styles.tabItem}>
            {icon}

            <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={[
                    styles.tabLabel,
                    focused ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
            >
                {label}
            </Text>
        </View>
    );
}


// ─── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: C.blue,
        borderTopWidth: 0,
        height: Platform.OS === "ios" ? 84 : 78,
        paddingBottom: Platform.OS === "ios" ? 20 : 8,
        paddingTop: 10,
        elevation: 0,
    },

    tabItem: {
        flex: 1,
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    },

    tabLabel: {
        fontSize: 10.5,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 6,
        fontFamily: "app-regular"
    },

    tabLabelActive: {
        color: C.active,
    },

    tabLabelInactive: {
        color: C.inactive,
    },
});