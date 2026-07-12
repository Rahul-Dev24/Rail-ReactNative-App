import { color } from '@/constant/data';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#152A56';
const BG_LAVENDER = '#F8F3FB';
const GREEN = '#15803D';
const RED = '#DC2626';
const BORDER_GRAY = '#E5E7EB';
const DASH_GRAY = '#D8D8DC';

export default function MakePaymentScreen() {
    const source = 'GDY';
    const destination = 'PON';
    const amount = 30;
    const walletBalance = 9.8;
    const hasSufficientBalance = walletBalance >= amount;

    return (
        <View className="flex-1" style={{ backgroundColor: BG_LAVENDER }}>
            {/* ── Header ── */}
            <SafeAreaView style={{ backgroundColor: color.blue }}>
                <View className="px-6 pt-4 pb-8 flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.replace("../un-reserved-booking/secondPage")}
                        className="w-10 h-10 rounded-full border border-white items-center justify-center mr-4"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text className="text-white text-xl font-[app-semi-bold]">Make Payment</Text>
                </View>

                {/* ── Route + amount card — overlaps header/body boundary ── */}
                <View className="px-5">
                    <View
                        className="bg-white rounded-2xl px-5 py-2.5 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            <Text className="text-[14px] font-[app-bold]" style={{ color: NAVY }}>
                                {source}
                            </Text>
                            <Ionicons name="arrow-forward" size={16} color="#94A3B8" style={{ marginHorizontal: 10 }} />
                            <Text className="text-[14px] font-[app-bold]" style={{ color: NAVY }}>
                                {destination}
                            </Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} className="items-end">
                            <Text className="text-lg font-[app-semi-bold]" style={{ color: NAVY }}>
                                Pay ₹ {amount}
                            </Text>
                            <View className="flex-row items-center mt-0.5">
                                <Text className="text-slate-600 text-sm mr-1 font-[app-regular]">Review</Text>
                                <Ionicons name="chevron-down" size={14} color="#475569" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>



            {/* ── Payment methods ── */}
            <View className="px-5 mt-6">
                <View
                    className="rounded-2xl border overflow-hidden"
                    style={{ borderColor: BORDER_GRAY }}
                >
                    {/* R-Wallet row */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between px-5 py-5"
                    >
                        <View className="flex-row items-center">
                            {/* Placeholder badge — swap for your org's actual emblem asset */}
                            <View
                                className="w-9 h-9 rounded-full items-center justify-center mr-4"
                                style={{ backgroundColor: '#1D4ED8' }}
                            >
                                <MaterialCommunityIcons name="shield-star" size={18} color="#FFFFFF" />
                            </View>
                            <View>
                                <Text className="text-slate-500 text-base">R-Wallet</Text>
                                <Text className="text-lg font-extrabold mt-0.5" style={{ color: GREEN }}>
                                    ₹ {walletBalance.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        <View className="items-end">
                            {!hasSufficientBalance && (
                                <Text className="font-extrabold text-sm" style={{ color: RED }}>
                                    Insufficient Balance
                                </Text>
                            )}
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text className="font-bold text-sm mt-0.5" style={{ color: color.blue }}>
                                    + Add Money
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <View className="border-t border-dashed" style={{ borderColor: DASH_GRAY }} />

                    {/* UPI row */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between px-5 py-5"
                    >
                        <View className="flex-row items-center">
                            {/* Placeholder mark — swap for NPCI's official UPI logo asset */}
                            <MaterialCommunityIcons
                                name="qrcode-scan"
                                size={22}
                                color="#374151"
                                style={{ marginRight: 14 }}
                            />
                            <Text
                                className="text-lg font-extrabold tracking-wide"
                                style={{ color: '#374151' }}
                            >
                                UPI
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#374151" />
                    </TouchableOpacity>

                    <View className="border-t border-dashed" style={{ borderColor: DASH_GRAY }} />

                    {/* Other payment methods row */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between px-5 py-5"
                    >
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons
                                name="credit-card-outline"
                                size={22}
                                color="#374151"
                                style={{ marginRight: 14 }}
                            />
                            <Text className="text-slate-800 font-bold text-base">
                                Other Payment Methods
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}