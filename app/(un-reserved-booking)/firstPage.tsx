import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
        <View className="flex-1 bg-slate-50">
            {/* Header */}
            <View className="flex-row items-center justify-center pt-14 pb-5 px-6 bg-white relative">
                <Text className="text-2xl font-extrabold text-indigo-950">
                    Unreserved E-Ticket
                </Text>
                <TouchableOpacity
                    className="absolute right-6 top-14 w-11 h-11 rounded-full border border-sky-200 items-center justify-center"
                    activeOpacity={0.7}
                >
                    <Ionicons name="close" size={20} color="#0EA5E9" />
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
                            className={`flex-1 py-3 rounded-xl items-center ${ticketType === 'normal' ? 'bg-white' : 'bg-transparent'
                                }`}
                            activeOpacity={0.8}
                        >
                            <Text
                                className={`text-lg font-bold ${ticketType === 'normal' ? 'text-blue-600' : 'text-slate-500'
                                    }`}
                            >
                                Normal
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTicketType('season')}
                            className={`flex-1 py-3 rounded-xl items-center ${ticketType === 'season' ? 'bg-white' : 'bg-transparent'
                                }`}
                            activeOpacity={0.8}
                        >
                            <Text
                                className={`text-lg font-bold ${ticketType === 'season' ? 'text-blue-600' : 'text-slate-800'
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
                            className={`flex-1 flex-row items-center justify-center rounded-full py-4 mr-3 ${stationMode === 'outside'
                                    ? 'bg-blue-600'
                                    : 'bg-white border border-slate-200'
                                }`}
                        >
                            <Text
                                className={`text-lg font-bold mr-2 ${stationMode === 'outside' ? 'text-white' : 'text-slate-400'
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
                            className={`flex-1 flex-row items-center justify-center rounded-full py-4 ${stationMode === 'at-station'
                                    ? 'bg-blue-600'
                                    : 'bg-white border border-slate-200'
                                }`}
                        >
                            <Text
                                className={`text-lg font-bold mr-2 ${stationMode === 'at-station'
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
                        <Text className="text-sky-500 text-xl font-semibold mb-3">
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

                        <Text className="text-sky-500 text-xl font-semibold mt-6 mb-3">
                            To
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center"
                        >
                            <MaterialCommunityIcons
                                name="train-variant"
                                size={22}
                                color="#94A3B8"
                            />
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
                            className="absolute right-0 top-9.5 w-14 h-14 rounded-full bg-sky-100 items-center justify-center"
                        >
                            <Ionicons name="swap-vertical" size={24} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                    {/* CTA buttons */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="bg-blue-600 rounded-full py-4 items-center mt-8"
                    >
                        <Text className="text-white text-xl font-bold">
                            Proceed To Book
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="border-2 border-blue-600 rounded-full py-4 items-center mt-4"
                    >
                        <Text className="text-blue-600 text-xl font-semibold">
                            Check Upcoming Trains
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Searches */}
                <View className="px-5 mt-8">
                    <Text className="text-xl font-extrabold text-indigo-950 mb-4">
                        Recent Searches
                    </Text>

                    <View className="flex-row justify-between">
                        {recentSearches.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleRecentSearchPress(item)}
                                activeOpacity={0.8}
                                className="w-[48%] bg-sky-100 rounded-2xl px-3 py-5 items-center"
                            >
                                <Text className="text-slate-700 text-base font-semibold text-center">
                                    {item.from}, {item.fromCode}
                                </Text>
                                <MaterialCommunityIcons
                                    name="swap-horizontal"
                                    size={22}
                                    color="#3B82F6"
                                    style={{
                                        marginVertical: 8,
                                        transform: [{ rotate: '90deg' }],
                                    }}
                                />
                                <Text className="text-slate-700 text-base font-semibold text-center">
                                    {item.to}, {item.toCode}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}