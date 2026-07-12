import {
    Feather,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type MenuRow = {
    key: string;
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
};

type SidebarDrawerProps = {
    visible: boolean;
    onClose: () => void;
    userName?: string;
    walletBalance?: string;
    appVersion?: string;
    onAddMoney?: () => void;
};

export default function SidebarDrawer({
    visible,
    onClose,
    userName = 'Rahul Singh',
    walletBalance = '9.80',
    appVersion = 'V-2.1.60-229',
    onAddMoney,
}: SidebarDrawerProps) {
    const menuRows: MenuRow[] = [
        {
            key: 'show-hide-services',
            label: 'Show/Hide Services',
            icon: (
                <MaterialCommunityIcons
                    name="ticket-confirmation-outline"
                    size={24}
                    color="#6366F1"
                />
            ),
        },
        {
            key: 'faqs',
            label: 'FAQs',
            icon: (
                <Ionicons name="chatbox-ellipses-outline" size={24} color="#6366F1" />
            ),
        },
        {
            key: 'help-support',
            label: 'Help & Support',
            icon: (
                <MaterialCommunityIcons name="face-agent" size={24} color="#6366F1" />
            ),
        },
        {
            key: 'about',
            label: 'About',
            icon: <Ionicons name="information-circle" size={24} color="#6366F1" />,
        },
        {
            key: 'rate-us',
            label: 'Rate Us',
            icon: <FontAwesome5 name="thumbs-up" size={22} color="#6366F1" />,
        },
        {
            key: 'share',
            label: 'Share',
            icon: <Feather name="share-2" size={22} color="#6366F1" />,
        },
        {
            key: 'log-out',
            label: 'Log Out',
            icon: (
                <MaterialCommunityIcons name="logout" size={24} color="#6366F1" />
            ),
        },
    ];

    return (
        <>
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                onRequestClose={onClose}
            >
                <View className="flex-1 flex-row bg-[#0000004D]">
                    {/* Dimmed backdrop — tap to close */}
                    <Pressable className="flex-[0.22] bg-[#0000004D]" onPress={onClose} />

                    {/* Sidebar panel */}
                    <View className="flex-[0.78] bg-white rounded-3xl">
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{ paddingBottom: 24 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Profile block */}
                            <View className="bg-indigo-50 items-center pt-16 pb-8 px-6 rounded-b-4xl">
                                <View className="w-24 h-24 rounded-full bg-sky-400 items-center justify-center mb-4">
                                    <Ionicons name="person" size={48} color="#BFDBFE" />
                                </View>
                                <Text className="text-2xl font-bold text-slate-900">
                                    {userName}
                                </Text>
                            </View>

                            {/* Wallet card */}
                            <View className=" mt-4 mb-4 mx-1">
                                <View className="bg-indigo-50 rounded-full px-4 py-3 flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <View className="w-8 h-8 rounded-lg bg-indigo-200 items-center justify-center mr-3">
                                            <FontAwesome5 name="wallet" size={20} color="#4338CA" />
                                        </View>
                                        <View>
                                            <Text className="text-slate-500 text-[12px] font-[app-semi-bold]">
                                                R-Wallet
                                            </Text>
                                            <Text className="text-slate-900 text-xl font-[app-bold] font-bold">
                                                ₹ {walletBalance}
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={onAddMoney}
                                        className="bg-blue-600 rounded-full px-6 py-3.5"
                                        activeOpacity={0.8}
                                    >
                                        <Text className="text-white font-semibold text-[12px]">
                                            Add Money
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Menu list */}
                            <View className="px-6">
                                {menuRows.map((row) => (
                                    <TouchableOpacity
                                        key={row.key}
                                        onPress={row.onPress}
                                        activeOpacity={0.6}
                                        className="flex-row items-center py-4"
                                    >
                                        <View className="w-7 items-center mr-4">{row.icon}</View>
                                        <Text className="text-lg text-slate-800">{row.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Version */}
                            <Text className="text-center text-slate-400 text-sm mt-6">
                                {appVersion}
                            </Text>
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </>

    );
}