import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const NOTCH_SIZE = 25;
const BORDER_COLOR = '#F2AC6D';
const BACKGROUND = '#F6F6F6';
const TOTAL_TIME = 5 * 60; // 5 minutes

export default function Index() {
    const [sheetOpen, setSheetOpen] = useState(false);

    const goBack = () => {
        router.replace("/(booking)/upcoming");
    }


    return (
        <SafeAreaView>
            <View className="w-full flex-row items-center pr-4 pl-2.5 py-4 justify-between text-white bg-[#0066fe]" >
                <View className="flex-row items-center gap-5">
                    <FontAwesome6 onPress={goBack} className="p-2 border border-gray-300 rounded-full" name="arrow-left-long" size={18} color="white" />
                    <View className="flex-col items-start gap-1">
                        <Text style={{ fontFamily: "app-regular" }} className="text-white text-lg" >Booking Details</Text>
                        <Text style={{ fontFamily: "app-regular" }} className="text-white text-md" >8778495962</Text>
                    </View>
                </View>
                <MaterialCommunityIcons onPress={() => setSheetOpen(true)} name="invoice-text" size={24} color="white" />
            </View>
            <ScrollView
                // className="flex-1"
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    backgroundColor: "gray",
                    paddingBottom: 20,
                }}
            >
                <View className="p-4 bg-white" >
                    <Text style={{ fontFamily: "app-regular" }} className="text-gray-500 text-md" >Thank You Rahul Singh, Happy Journey</Text>
                </View>



                <View className='flex flex-row w-full mt-5'>
                    <View className='w-[4%] bg-gray-500 z-50'></View>
                    <View style={styles.card}>

                        <TimerSection />

                        {/* ── Top Section ── */}
                        <View style={styles.topSection}>

                            {/* Row 1: Badge + UTS Code */}

                            <View style={styles.row}>
                                <Text style={styles.utsValue}>Season Ticket</Text>
                                <Text style={styles.utsLabel}>XA74EDI00C </Text>
                            </View>

                            {/* Row 3: Source — distance — Destination */}
                            <View style={styles.row}>
                                <Text style={styles.stationText} numberOfLines={1}>
                                    Gummidipundi
                                </Text>
                                <Text style={styles.distanceText}>— 63 km —</Text>
                                <Text
                                    style={[styles.stationText, { textAlign: 'right' }]}
                                    numberOfLines={1}
                                >
                                    Guindy
                                </Text>
                            </View>

                            {/* Row 2: Ticket Type + Booking Date */}
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.fieldLabel}>Via</Text>
                                    <Text style={styles.fieldValue}>MSB</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.fieldLabel}>Booking Date</Text>
                                    <Text style={styles.fieldValue}>03/06/2023</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.fieldLabel}>Valid From</Text>
                                    <Text style={styles.fieldValue}>19/05/2023</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.fieldLabel}>*Valid Till</Text>
                                    <Text style={styles.fieldValue}>03/06/2023</Text>
                                </View>
                            </View>

                            <View className="flex-row items-start gap-1 -mb-2">
                                <Text style={styles.utsLabel}>MONTHLY</Text>
                                <Text style={styles.utsLabel}>|</Text>
                                <Text style={styles.utsLabel}>ORDINARY</Text>
                                <Text style={styles.utsLabel}>|</Text>
                                <Text style={styles.utsLabel}>SECOND</Text>
                                <Text style={styles.utsLabel}>|</Text>
                                <Text style={styles.utsLabel}>
                                    <MaterialCommunityIcons name="currency-rupee" className="me-1" size={10} color="black" />
                                    270.00
                                </Text>
                            </View>
                        </View>

                        {/* ── Divider Row (notches + dashes) ── */}
                        <View style={styles.dividerRow}>
                            {/* Left notch — sits outside the card border */}
                            <View style={[styles.notch, styles.notchLeft]} />

                            {/* Dashed line */}
                            <View className='w-full border-t border-dashed border-[#F2AC6D]' />

                            {/* Right notch */}
                            <View style={[styles.notch, styles.notchRight]} />
                        </View>



                        {/* ── Bottom Section: Actions ── */}
                        <View style={styles.topSection} className="-mt-2">
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.fieldLabel}>Name</Text>
                                    <Text style={styles.fieldValue}>Rahul Singh</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.fieldLabel}>Age</Text>
                                    <Text style={styles.fieldValue}>24 years</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.fieldLabel}>ID Type</Text>
                                    <Text style={styles.fieldValue}>Student Icard</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.fieldLabel}>ID Number</Text>
                                    <Text style={styles.fieldValue}>215MCA0061</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View className='w-[4%] bg-gray-500 z-50'></View>
                </View>
                <View className="m-3 flex items-center justify-center p-2 bg-red-200 rounded-2xl">
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">Note: This ticket is non refundable. Ticket is stored</Text>
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">locally on the device. Please do not change your</Text>
                    <Text className="text-[red] font-[app-regular] text-sm">handset or perform fectory reset</Text>
                </View>
                <View className="m-3 flex items-center justify-center p-2 bg-red-200 rounded-2xl">
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">Note: This ticket is non refundable. Ticket is stored</Text>
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">locally on the device. Please do not change your</Text>
                    <Text className="text-[red] font-[app-regular] text-sm">handset or perform fectory reset</Text>
                </View>
                <View className="m-3 flex items-center justify-center p-2 bg-red-200 rounded-2xl">
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">Note: This ticket is non refundable. Ticket is stored</Text>
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">locally on the device. Please do not change your</Text>
                    <Text className="text-[red] font-[app-regular] text-sm">handset or perform fectory reset</Text>
                </View>
                <View className="m-3 flex items-center justify-center p-2 bg-red-200 rounded-2xl">
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">Note: This ticket is non refundable. Ticket is stored</Text>
                    <Text className="text-[red] font-[app-regular] text-sm -mb-0.5">locally on the device. Please do not change your</Text>
                    <Text className="text-[red] font-[app-regular] text-sm">handset or perform fectory reset</Text>
                </View>
                <View className="flex items-start justify-center p-4 mb-10 bg-white" >
                    <Text className="font-[app-regular] font-bold mb-2">Do you know?</Text>
                    <Text className="font-[app-regular] text-[gray]">IR recover only 57% of cost of travel on an</Text>
                    <Text className="font-[app-regular] text-[gray] mb-2">averge</Text>
                    <Text className="font-[app-regular] text-[gray]">This ticket is booked on a personal user ID</Text>
                    <Text className="font-[app-regular] text-[gray]">it's sale/purchase is an offence u/s 143 of the</Text>
                    <Text className="font-[app-regular] text-[gray] mb-2">Railways Act, 1989</Text>
                    <Text className="font-[app-regular] text-[gray]">For enquiry and integrated railway helpline</Text>
                    <Text className="font-[app-regular] text-[gray]">please dial 139</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


function TimerSection() {

    const [secondsLeft, setSecondsLeft] = useState<number>(TOTAL_TIME);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        }
                        setIsRunning(false);
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        if (secondsLeft === 0) {
            router.replace("/(booking)/upcoming");
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const progress = (TOTAL_TIME - secondsLeft) / TOTAL_TIME;





    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: 170,
                    backgroundColor: "#3F3F46",
                    overflow: "hidden",
                }}
            >
                {/* Left Vertical Text */}
                <View
                    style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            transform: [{ rotate: "-90deg" }],
                            width: 170,
                            alignItems: "center",
                            borderBottomWidth: 1,
                            borderBottomColor: "#fff",
                            borderStyle: "dashed",
                            paddingBottom: 6
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: "600",
                                fontFamily: "app-regular",
                                textAlign: "center",
                            }}
                        >
                            INDIAN RAILWAYS
                        </Text>
                    </View>
                </View>

                {/* Center Content */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text className="text-lg font-[app-regular] text-center text-[#fff]">
                        Dynamic Preview will closed in
                    </Text>

                    <Text className="text-2xl font-[app-bold] font-extrabold text-center text-[red]">
                        {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}
                    </Text>

                    <Text className="text-md font-[app-regular] text-center text-[gray]">
                        Ticket Booking Date & Time
                    </Text>
                    <Text className="text-2xl font-[app-regular] text-center text-[#898922]">
                        04 Jun 2023, 10:00
                    </Text>
                    <Text className="text-md font-[app-regular] text-center text-[#fff]">
                        R21156
                    </Text>
                    <Text className="text-md font-[app-regular] text-center text-[#fff]">
                        Ticket is Non-Transferable
                    </Text>
                </View>

                {/* Right Vertical Text */}
                <View
                    style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            transform: [{ rotate: "-90deg" }],
                            width: 170,
                            alignItems: "center",
                            borderTopWidth: 1,
                            borderTopColor: "#fff",
                            borderStyle: "dashed",
                            paddingTop: 6
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: "600",
                                fontFamily: "app-regular",
                                textAlign: "center",
                            }}
                        >
                            भारतीय रेल
                        </Text>
                    </View>
                </View>
            </View>
            {/* Progress Bar */}
            <View className="w-full h-1 overflow-hidden bg-gray-600">
                <View
                    className="h-full bg-[#0066FE] rounded-full"
                    style={{
                        width: `${progress * 100}%`,
                    }}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    card: {
        width: '92%',
        backgroundColor: BACKGROUND,
        borderRadius: 16,
        borderBottomWidth: 14,
        borderTopWidth: 14,
        borderColor: 'red',

        // Drop shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'visible', // required so notches render outside bounds
    },

    /* ── Top section ── */
    topSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 14,
        gap: 14,
    },

    /* ── Divider ── */
    dividerRow: {
        height: NOTCH_SIZE,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    notch: {
        width: NOTCH_SIZE,
        height: NOTCH_SIZE,
        borderRadius: NOTCH_SIZE / 2,
        backgroundColor: 'gray', // match your screen/parent background
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        position: 'absolute',
        zIndex: 2,
    },
    notchLeft: {
        left: -(NOTCH_SIZE / 2),
    },
    notchRight: {
        right: -(NOTCH_SIZE / 2),
    },
    dashedLineContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: NOTCH_SIZE / 2,
        overflow: 'hidden',
    },

    /* ── Bottom section ── */
    bottomSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        fontFamily: 'app-regular',
    },
    actionText: {
        color: '#1E60D4',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.2,
        fontFamily: 'app-regular',
    },
    verticalSep: {
        width: 1.5,
        height: 24,
        backgroundColor: '#dadada',
    },

    /* ── Shared row / text styles ── */
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#E9DAEF',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    badgeText: {
        color: '#7B4FA0',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        fontFamily: 'app-regular',
    },
    utsLabel: {
        color: '#A8A7AD',
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'app-regular',
    },
    utsValue: {
        color: '#1a1a1a',
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'app-regular',
    },
    fieldLabel: {
        color: '#A8A7AD',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 3,
        fontFamily: 'app-regular',
    },
    fieldValue: {
        color: '#1a1a1a',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'app-regular',
    },
    stationText: {
        color: '#1a1a1a',
        fontSize: 13,
        fontWeight: '700',
        flex: 1,
        fontFamily: 'app-regular',
    },
    distanceText: {
        color: '#A8A7AD',
        fontSize: 11,
        fontWeight: '600',
        marginHorizontal: 4,
        fontFamily: 'app-regular',
    },
});

