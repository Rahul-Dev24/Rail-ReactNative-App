import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuTile =
    | {
        type: 'link';
        key: string;
        label: string;
        bg: string;
        icon: React.ReactNode;
        onPress?: () => void;
    }
    | {
        type: 'toggle';
        key: string;
        label: string;
        bg: string;
    };

export default function You() {
    const [biometricOn, setBiometricOn] = useState(true);
    const profileCompletion = 95;

    const menuItems: MenuTile[] = [
        {
            type: 'link',
            key: 'change-password',
            label: 'Change Password',
            bg: 'bg-sky-100',
            icon: (
                <MaterialCommunityIcons
                    name="shield-key-outline"
                    size={30}
                    color="#0EA5E9"
                />
            ),
        },
        {
            type: 'link',
            key: 'my-account',
            label: 'My Account',
            bg: 'bg-emerald-100',
            icon: (
                <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={30}
                    color="#16A34A"
                />
            ),
        },
        {
            type: 'toggle',
            key: 'biometric',
            label: 'Biometric',
            bg: 'bg-pink-50',
        },
        {
            type: 'link',
            key: 'transfer-ticket',
            label: 'Transfer Ticket',
            bg: 'bg-sky-100',
            icon: (
                <MaterialCommunityIcons
                    name="ticket-confirmation-outline"
                    size={30}
                    color="#0EA5E9"
                />
            ),
        },
        {
            type: 'link',
            key: 'my-transaction',
            label: 'My Transaction',
            bg: 'bg-orange-100',
            icon: (
                <MaterialCommunityIcons
                    name="receipt-text-outline"
                    size={30}
                    color="#F59E0B"
                />
            ),
        },
        {
            type: 'link',
            key: 'link-aadhar',
            label: 'Link Your Aadhar',
            bg: 'bg-stone-200',
            icon: (
                <MaterialCommunityIcons
                    name="card-account-details-star-outline"
                    size={30}
                    color="#78716C"
                />
            ),
        },
    ];

    return (
        <SafeAreaView >
            <View className="flex-1 bg-white">
                <LinearGradient colors={['#DFF6FB', '#FFFFFF']} className="pb-8">
                    {/* Back button */}
                    <View className="px-6 pt-6">
                        <TouchableOpacity onPress={() => { router.replace("/(tabs)/home") }}
                            className="w-12 h-12 rounded-full border border-sky-300 items-center justify-center"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="arrow-back" size={22} color="#0369A1" />
                        </TouchableOpacity>
                    </View>

                    {/* Avatar */}
                    <View className="items-center mt-3">
                        <View className="w-18 h-18 rounded-full bg-sky-400 items-center justify-center">
                            <Ionicons name="person" size={36} color="#BFDBFE" />
                        </View>

                        <Text className="text-xl font-bold text-slate-900 mt-4">
                            Rahul Singh
                        </Text>

                        <View className="flex-row items-center mt-2">
                            <TouchableOpacity className="flex-row items-center">
                                <Ionicons name="eye-outline" size={18} color="#2563EB" />
                                <Text className="text-blue-600 font-semibold text-base ml-1">
                                    View Details
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-slate-300 text-lg mx-3">|</Text>

                            <TouchableOpacity className="flex-row items-center">
                                <Ionicons name="pencil" size={16} color="#2563EB" />
                                <Text className="text-blue-600 font-semibold text-base ml-1">
                                    Edit Details
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Wallet card */}
                    <View className="mx-6 bg-white rounded-3xl px-5 py-4 flex-row items-center justify-between shadow-sm">
                        <View className="flex-row items-center">
                            <View className="w-11 h-11 rounded-xl bg-green-500 items-center justify-center mr-3">
                                <FontAwesome5 name="wallet" size={18} color="white" />
                            </View>
                            <View>
                                <Text className="text-slate-500 text-sm">R-Wallet</Text>
                                <Text className="text-emerald-700 text-xl font-bold">
                                    ₹ 11.70
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row items-center">
                            <TouchableOpacity className="mr-3">
                                <Ionicons name="refresh" size={22} color="#2563EB" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-blue-600 rounded-full px-6 py-2.5"
                                activeOpacity={0.8}
                            >
                                <Text className="text-white font-semibold text-base">Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                <ScrollView
                    className="flex-1 bg-white"
                    contentContainerStyle={{ paddingBottom: 32 }}
                >
                    {/* Profile completion */}
                    <View className="mx-6 mt-6 border border-sky-100 rounded-2xl px-5 py-4">
                        <Text className="text-slate-800 text-lg mb-3">
                            Profile Incomplete
                        </Text>
                        <View className="flex-row items-center">
                            <View className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden mr-3">
                                <View
                                    className="h-2 rounded-full bg-green-600"
                                    style={{ width: `${profileCompletion}%` }}
                                />
                            </View>
                            <Text className="text-slate-900 text-xl font-semibold">
                                {profileCompletion}%
                            </Text>
                        </View>
                    </View>

                    {/* Verify email banner */}
                    <TouchableOpacity
                        className="mx-6 mt-4 bg-red-50 rounded-2xl py-4 items-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-red-400 font-bold text-base">
                            Please Verify Your Email Id
                        </Text>
                    </TouchableOpacity>

                    {/* Menu grid */}
                    <View className="flex-row flex-wrap justify-between px-6 mt-6">
                        {menuItems.map((item) => {
                            if (item.type === 'toggle') {
                                return (
                                    <View
                                        key={item.key}
                                        className={`w-[31%] ${item.bg} rounded-2xl px-3 py-5 items-center mb-4`}
                                    >
                                        <View className="mb-3">
                                            <Switch
                                                value={biometricOn}
                                                onValueChange={setBiometricOn}
                                                trackColor={{ false: '#CBD5E1', true: '#2563EB' }}
                                                thumbColor="#FFFFFF"
                                            />
                                        </View>
                                        <Text className="text-slate-800 font-semibold text-base text-center">
                                            {item.label}
                                        </Text>
                                    </View>
                                );
                            }

                            return (
                                <TouchableOpacity
                                    key={item.key}
                                    className={`w-[31%] ${item.bg} rounded-2xl px-3 py-5 items-center mb-4`}
                                    activeOpacity={0.8}
                                    onPress={item.onPress}
                                >
                                    <View className="mb-3">{item.icon}</View>
                                    <Text className="text-slate-800 font-semibold text-base text-center">
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}