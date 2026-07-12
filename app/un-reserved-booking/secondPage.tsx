import { StatusBarBackground } from '@/components/StatusBarBackground';
import { useStatusBar } from '@/hooks/useStatusBar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BRAND_BLUE = '#1657F0';
const NAVY = '#152A56';
const BORDER_GRAY = '#CBD5E1';
const TEXT_GRAY = '#6B7280';
const CARD_BORDER = '#CDEAE3';

// ── Reusable pill / segmented option ─────────────────────────────────
type PillProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
    withChevron?: boolean;
};


// ── Screen ────────────────────────────────────────────────────────────
export default function UnreservedJourneyScreen() {
    useStatusBar({ style: 'light' });
    const [trainType, setTrainType] = useState<'ORDINARY' | 'MAIL/EXP' | 'OTHERS'>('ORDINARY');
    const [ticketType, setTicketType] = useState<'JOURNEY' | 'RETURN'>('JOURNEY');
    const [travelClass, setTravelClass] = useState<'SECOND' | 'FIRST'>('SECOND');
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [concession, setConcession] = useState(false);

    const fare = 15;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#dadada2d' }}>
            <StatusBarBackground color="#0066fe" />
            {/* ── Header ── */}
            <View className="px-6  py-4 flex-row items-center bg-[#0066fe]">
                <TouchableOpacity
                    onPress={() => router.push("/un-reserved-booking/firstPage")}
                    className="w-10 h-10 rounded-full border border-white items-center justify-center mr-5"
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
                </TouchableOpacity>

                <View>
                    <Text className="text-white text-xl font-[app-semi-bold]">
                        Unreserved Journey
                    </Text>
                    <Text className="text-blue-100 font-[app-regular] text-[12px] mt-0.5">E-Ticket</Text>
                </View>
            </View>

            {/* ── Route row ── */}
            <View className="flex-row items-center justify-between bg-blue-50 px-6 py-4">
                <View>
                    <Text
                        className="text-[14px] font-[app-bold]"
                        style={{ color: NAVY, letterSpacing: 0.5 }}
                    >
                        GUINDY
                    </Text>
                    <Text className="text-slate-500 font-[app-regular] text-sm mt-0.5">GDY</Text>
                </View>

                <Ionicons name="arrow-forward" size={20} color="#94A3B8" />

                <View>
                    <Text
                        className="text-[14px] font-[app-bold] text-right"
                        style={{ color: NAVY, letterSpacing: 0.3 }}
                    >
                        PONNERI
                    </Text>
                    <Text className="text-slate-500 text-sm font-[app-regular] mt-0.5 text-right">PON</Text>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-6 pt-3">
                    {/* Train Type */}
                    <Text className="text-slate-700 text-base font-[app-regular] mb-3">Train Type</Text>
                    <View className="flex-row mb-6">
                        <Pill
                            label="ORDINARY"
                            selected={trainType === 'ORDINARY'}
                            onPress={() => setTrainType('ORDINARY')}
                        />
                        <Pill
                            label="MAIL/EXP"
                            selected={trainType === 'MAIL/EXP'}
                            onPress={() => setTrainType('MAIL/EXP')}
                        />
                        <Pill
                            label="OTHERS"
                            selected={trainType === 'OTHERS'}
                            onPress={() => setTrainType('OTHERS')}
                            withChevron
                        />
                    </View>

                    {/* Ticket Type */}
                    <Text className="text-slate-700 font-[app-regular] text-base mb-3">Ticket Type</Text>
                    <View className="flex-row mb-4">
                        <Pill
                            label="JOURNEY"
                            selected={ticketType === 'JOURNEY'}
                            onPress={() => setTicketType('JOURNEY')}
                        />
                        <Pill
                            label="RETURN"
                            selected={ticketType === 'RETURN'}
                            onPress={() => setTicketType('RETURN')}
                        />
                    </View>

                    {/* Adult / Child counters */}
                    <Counter
                        label="Adult"
                        value={adultCount}
                        min={1}
                        onDecrease={() => setAdultCount((c) => Math.max(1, c - 1))}
                        onIncrease={() => setAdultCount((c) => c + 1)}
                    />
                    <Counter
                        label="Child"
                        value={childCount}
                        min={0}
                        onDecrease={() => setChildCount((c) => Math.max(0, c - 1))}
                        onIncrease={() => setChildCount((c) => c + 1)}
                    />

                    <Text className="text-slate-400 font-[app-regular] text-xs mb-4">
                        Aged between 5 and 12 years on the day of Travel
                    </Text>

                    {/* Class */}
                    <Text className="text-slate-700 font-[app-regular] text-base mb-3">Class</Text>
                    <View className="flex-row mb-6">
                        <Pill
                            label="SECOND"
                            selected={travelClass === 'SECOND'}
                            onPress={() => setTravelClass('SECOND')}
                        />
                        <Pill
                            label="FIRST"
                            selected={travelClass === 'FIRST'}
                            onPress={() => setTravelClass('FIRST')}
                        />
                    </View>

                    {/* Concession */}
                    <TouchableOpacity
                        onPress={() => setConcession((v) => !v)}
                        activeOpacity={0.7}
                        className="flex-row items-center"
                    >
                        <View
                            className="w-5 h-5 rounded-full border-2 mr-3 items-center justify-center"
                            style={{ borderColor: concession ? BRAND_BLUE : '#94A3B8' }}
                        >
                            {concession && (
                                <View
                                    className="rounded-full"
                                    style={{ width: 10, height: 10, backgroundColor: BRAND_BLUE }}
                                />
                            )}
                        </View>
                        <Text className="text-slate-600 font-[app-regular] text-base">Avail Concession</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Fare bar ── */}
                <View className="flex-row items-center justify-between bg-blue-50 px-6 py-5 mt-4">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={26} color={NAVY} />
                        <Text
                            className="text-lg font-[app-bold] ml-3"
                            style={{ color: NAVY }}
                        >
                            Fare
                        </Text>
                    </View>

                    <View className="items-center">
                        <Text
                            className="text-lg font-[app-semi-bold]"
                            style={{ color: NAVY }}
                        >
                            ₹ {fare}
                        </Text>
                        <TouchableOpacity
                            className="border border-slate-300 rounded-full px-3 py-1 mt-1"
                            activeOpacity={0.7}
                        >
                            <Text className="text-slate-500 font-[app-regular] text-xs">Fare Breakup</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Book Now button ── */}
                <View className="px-6 mt-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="rounded-full py-4 items-center"
                        style={{ backgroundColor: BRAND_BLUE }}
                    >
                        <Text className="text-white text-lg font-bold">Book Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


function Pill({ label, selected, onPress, withChevron }: PillProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className={`flex-row items-center justify-center rounded-full px-5 py-3 mr-3 border ${selected ? 'border-transparent' : 'border-slate-300'
                }`}
            style={{ backgroundColor: selected ? BRAND_BLUE : 'transparent' }}
        >
            <Text
                className={`text-sm font-[app-semi-bold] tracking-wide ${selected ? 'text-white' : 'text-slate-500'
                    }`}
            >
                {label}
            </Text>
            {withChevron && (
                <Ionicons
                    name="chevron-down"
                    size={16}
                    color={selected ? '#FFFFFF' : TEXT_GRAY}
                    style={{ marginLeft: 6 }}
                />
            )}
        </TouchableOpacity>
    );
}

// ── Adult / Child counter row ────────────────────────────────────────
type CounterProps = {
    label: string;
    value: number;
    onDecrease: () => void;
    onIncrease: () => void;
    min?: number;
};

function Counter({ label, value, onDecrease, onIncrease, min = 0 }: CounterProps) {
    return (
        <View
            className="flex-row items-center justify-between rounded-2xl px-5 py-5 mb-2 border"
            style={{ borderColor: CARD_BORDER }}
        >
            <Text className="text-slate-500 font-[app-semi-bold] text-base">{label}</Text>

            <View className="flex-row items-center">
                <TouchableOpacity
                    onPress={onDecrease}
                    disabled={value <= min}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <MaterialCommunityIcons
                        name="minus"
                        size={22}
                        color={value <= min ? BORDER_GRAY : BRAND_BLUE}
                    />
                </TouchableOpacity>

                <View
                    className="rounded-full items-center justify-center mx-4"
                    style={{ backgroundColor: BRAND_BLUE, width: 30, height: 30 }}
                >
                    <Text className="text-white font-[app-semi-bold] text-sm">{value}</Text>
                </View>

                <TouchableOpacity
                    onPress={onIncrease}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <MaterialCommunityIcons name="plus" size={22} color={BRAND_BLUE} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
