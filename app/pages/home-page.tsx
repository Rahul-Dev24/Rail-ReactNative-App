

import { RailOneHeader } from '@/components/RailOneHeader';
import { color } from '@/constant/data';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

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
            <Text style={[styles.tabLabel, focused ? styles.tabLabelActive : styles.tabLabelInactive]}>
                {label}
            </Text>
        </View>
    );
}

const HomePage = () => {

    return (
        <Tabs
            screenOptions={{
                header: () => <RailOneHeader />,           // custom topbar
                headerStyle: styles.headerWrapper,                // custom topbar
                headerTransparent: true,
                tabBarStyle: styles.tabBar,                // custom tabbar
                tabBarShowLabel: false,                    // hide default labels
            }}
        >
            <Tabs.Screen
                name="(tabs)/index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Home"
                            icon={
                                <Ionicons
                                    name={focused ? 'home' : 'home-outline'}
                                    size={24}
                                    color={focused ? color.active : color.inactive}
                                />
                            }
                        />
                    ),
                }}
            />

        </Tabs >
    )

}

export default HomePage;


// ─── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({

    headerWrapper: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },

    tabBar: {
        backgroundColor: color.blue,
        borderTopWidth: 0,
        height: Platform.OS === 'ios' ? 84 : 64,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        elevation: 0,
    },

    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingTop: 8,
    },

    tabLabel: {
        fontSize: 11,
        fontWeight: '500',
    },

    tabLabelActive: {
        color: color.active,
    },

    tabLabelInactive: {
        color: color.inactive,
    },
});