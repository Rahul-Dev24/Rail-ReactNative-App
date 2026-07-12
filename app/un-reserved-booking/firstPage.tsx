import { StatusBarBackground } from '@/components/StatusBarBackground';
import { useStatusBar } from '@/hooks/useStatusBar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TicketType = 'normal' | 'season';
type StationMode = 'outside' | 'at-station';

type RecentSearch = {
    id: string;
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
};

export default function UnreservedETicketScreen() {
    useStatusBar({ style: 'dark' });
    const [ticketType, setTicketType] = useState<TicketType>('normal');
    const [stationMode, setStationMode] = useState<StationMode>('outside');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const recentSearches: RecentSearch[] = [
        {
            id: '1',
            from: 'GUMMIDIPUNDI',
            fromCode: 'GPD',
            to: 'WIMCO NAGAR',
            toCode: 'WCN',
        },
        {
            id: '2',
            from: 'GUMMIDIPUNDI',
            fromCode: 'GPD',
            to: 'PONNERI',
            toCode: 'PON',
        },
        {
            id: '3',
            from: 'GUMMIDIPUNDI',
            fromCode: 'GPD',
            to: 'PONNERI',
            toCode: 'PON',
        },
    ];

    const handleSwap = () => {
        setSource(destination);
        setDestination(source);
    };

    const handleRecentSearchPress = (item: RecentSearch) => {
        setSource(`${item.from}, ${item.fromCode}`);
        setDestination(`${item.to}, ${item.toCode}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#dadada2d' }}>
            <StatusBarBackground color="#fff" />
            {/* Header */}
            <View className="flex-row items-center justify-center p-6 bg-white relative">
                <Text className="text-xl font-[app-bold]  text-indigo-950">
                    Unreserved E-Ticket
                </Text>
                <TouchableOpacity
                    onPress={() => router.push("/(tabs)/home")}
                    className="absolute right-3 top-4 w-10 h-10 rounded-full border border-sky-200 items-center justify-center"
                    activeOpacity={0.7}
                >
                    <Ionicons name="close" size={18} color="#0EA5E9" />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Booking card */}
                <View className="bg-white mx-4 mt-5 rounded-3xl px-5 pt-5 pb-6 shadow-sm">
                    {/* Normal / Season toggle */}
                    <View className="flex-row bg-slate-200 rounded-2xl p-1 mb-5">
                        <TouchableOpacity
                            onPress={() => setTicketType('normal')}
                            className={`flex-1 py-2 rounded-xl items-center justify-center ${ticketType === 'normal' ? 'bg-white' : 'bg-transparent'
                                }`}
                            activeOpacity={0.8}
                        >
                            <Text
                                className={`text-[14px] font-[app-semi-bold] ${ticketType === 'normal' ? 'text-blue-600' : 'text-slate-500'
                                    }`}
                            >
                                Normal
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTicketType('season')}
                            className={`flex-1 py-2 rounded-xl items-center ${ticketType === 'season' ? 'bg-white' : 'bg-transparent'
                                }`}
                            activeOpacity={0.8}
                        >
                            <Text
                                className={`text-lg font-[app-semi-bold] ${ticketType === 'season' ? 'text-blue-600' : 'text-slate-800'
                                    }`}
                            >
                                Season
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Outside Station / At Station */}
                    <View className="flex-row mb-6">
                        <TouchableOpacity
                            onPress={() => setStationMode('outside')}
                            activeOpacity={0.85}
                            className={`flex-1 flex-row items-center justify-center rounded-full py-3 mr-3 ${stationMode === 'outside'
                                ? 'bg-blue-600'
                                : 'bg-white border border-slate-200'
                                }`}
                        >
                            <Text
                                className={`text-[12px] font-[app-semi-bold] mr-2 ${stationMode === 'outside' ? 'text-white' : 'text-slate-400'
                                    }`}
                            >
                                Outside Station
                            </Text>
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color={stationMode === 'outside' ? '#FFFFFF' : '#94A3B8'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setStationMode('at-station')}
                            activeOpacity={0.85}
                            className={`flex-1 flex-row items-center justify-center rounded-full py-3 ${stationMode === 'at-station'
                                ? 'bg-blue-600'
                                : 'bg-white border border-slate-200'
                                }`}
                        >
                            <Text
                                className={`text-[12px] font-[app-semi-bold] mr-2 ${stationMode === 'at-station'
                                    ? 'text-white'
                                    : 'text-slate-400'
                                    }`}
                            >
                                At Station
                            </Text>
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color={stationMode === 'at-station' ? '#FFFFFF' : '#94A3B8'}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* From / To */}
                    <View className="relative">
                        <Text className="text-sky-500 text-lg font-[app-semi-bold] mb-3">
                            From
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center pb-4 border-b border-slate-200"
                        >
                            <MaterialCommunityIcons name="train" size={22} color="#94A3B8" />
                            <Text
                                className={`ml-3 text-lg ${source ? 'text-slate-800' : 'text-slate-400'
                                    }`}
                            >
                                {source || 'Source'}
                            </Text>
                        </TouchableOpacity>

                        <Text className="text-sky-500 text-lg font-[app-semi-bold] mt-6 mb-3">
                            To
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center"
                        >
                            <MaterialCommunityIcons name="train" size={22} color="#94A3B8" />
                            <Text
                                className={`ml-3 text-lg ${destination ? 'text-slate-800' : 'text-slate-400'
                                    }`}
                            >
                                {destination || 'Destination'}
                            </Text>
                        </TouchableOpacity>

                        {/* Swap button */}
                        <TouchableOpacity
                            onPress={handleSwap}
                            activeOpacity={0.8}
                            className="absolute right-0 top-14 w-14 h-14 rounded-full bg-sky-100 items-center justify-center"
                        >
                            <Ionicons name="swap-vertical" size={20} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                    {/* CTA buttons */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="bg-blue-600 rounded-full py-3 items-center mt-8"
                        onPress={() => router.push("/un-reserved-booking/secondPage")}
                    >
                        <Text className="text-white text-lg font-[app-semi-bold]">
                            Proceed To Book
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="border-2 border-blue-600 rounded-full py-3 items-center mt-4"
                    >
                        <Text className="text-blue-600 text-lg font-[app-semi-bold]">
                            Check Upcoming Trains
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Searches */}
                <View className="px-5 mt-8">
                    <Text className="text-lg font-[app-bold] text-indigo-950 mb-4">
                        Recent Searches
                    </Text>

                    <FlatList
                        horizontal
                        data={recentSearches}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 2,
                            paddingVertical: 1,
                        }}
                        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleRecentSearchPress(item)}
                                activeOpacity={0.8}
                                className="w-50 bg-sky-100 rounded-2xl px-4 py-5 items-center justify-center"
                            >
                                <Text
                                    numberOfLines={1}
                                    className="text-slate-700 text-[12px] font-[app-semi-bold]"
                                >
                                    {item.from}, {item.fromCode}
                                </Text>

                                <MaterialCommunityIcons
                                    name="swap-horizontal"
                                    size={22}
                                    color="#3B82F6"
                                    style={{
                                        marginVertical: 10,
                                        transform: [{ rotate: "90deg" }],
                                    }}
                                />

                                <Text
                                    numberOfLines={1}
                                    className="text-slate-700 text-[12px] font-[app-semi-bold]"
                                >
                                    {item.to}, {item.toCode}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}