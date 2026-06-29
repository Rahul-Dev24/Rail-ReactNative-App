import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TicketCardProps {
    ticketType?: string;
    utsCode?: string;
    bookingDate?: string;
    sourceStation?: string;
    destinationStation?: string;
    distance?: string;
    onBookAgain?: () => void;
    onViewDetails?: () => void;
}

const NOTCH_SIZE = 25;
const BORDER_COLOR = '#F2AC6D';
const BACKGROUND = '#F6F6F6';


export const TicketCard: React.FC<TicketCardProps> = ({
    ticketType = 'MONTHLY',
    utsCode = 'XA74EDI00C',
    bookingDate = 'Thu, 4 Jun 26',
    sourceStation = 'GUMMIDIPUNDI',
    destinationStation = 'GUINDY',
    distance = '63 km',
    onBookAgain,
    onViewDetails,
}) => {
    return (
        <View className='flex flex-row w-full'>
            <View className='w-[4%] bg-white z-50'></View>
            <View style={styles.card}>

                {/* ── Top Section ── */}
                <View style={styles.topSection}>

                    {/* Row 1: Badge + UTS Code */}
                    <View style={styles.row}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Unreserved</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.utsLabel}>UTS: </Text>
                            <Text style={styles.utsValue}>{utsCode}</Text>
                        </View>
                    </View>

                    {/* Row 2: Ticket Type + Booking Date */}
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.fieldLabel}>Ticket Type</Text>
                            <Text style={styles.fieldValue}>{ticketType}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.fieldLabel}>Booking Date</Text>
                            <Text style={styles.fieldValue}>{bookingDate}</Text>
                        </View>
                    </View>

                    {/* Row 3: Source — distance — Destination */}
                    <View style={styles.row}>
                        <Text style={styles.stationText} numberOfLines={1}>
                            {sourceStation}
                        </Text>
                        <Text style={styles.distanceText}>— {distance} —</Text>
                        <Text
                            style={[styles.stationText, { textAlign: 'right' }]}
                            numberOfLines={1}
                        >
                            {destinationStation}
                        </Text>
                    </View>

                </View>

                {/* ── Divider Row (notches + dashes) ── */}
                <View style={styles.dividerRow}>
                    {/* Left notch — sits outside the card border */}
                    <View style={[styles.notch, styles.notchLeft]} />

                    {/* Dashed line */}
                    {/* <DashedLine /> */}
                    <View className='w-full border-t border-dashed border-[#F2AC6D]' />

                    {/* Right notch */}
                    <View style={[styles.notch, styles.notchRight]} />
                </View>

                {/* ── Bottom Section: Actions ── */}
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={onBookAgain}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.actionText}>Book Again</Text>
                    </TouchableOpacity>

                    <View style={styles.verticalSep} />

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={onViewDetails}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.actionText}>View Details</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View className='w-[4%] bg-white z-50'></View>
        </View>
    );
};

/** Pure RN dashed line — no SVG */
const DashedLine: React.FC = () => {
    const DASH_W = 5;
    const GAP = 4;
    const NUM_DASHES = 58; // adjust to fill width

    return (
        <View style={styles.dashedLineContainer}>
            {Array.from({ length: NUM_DASHES }).map((_, i) => (
                <View
                    key={i}
                    style={{
                        width: DASH_W,
                        height: 1.5,
                        backgroundColor: BORDER_COLOR,
                        marginRight: GAP,
                    }}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '92%',
        backgroundColor: BACKGROUND,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
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
        backgroundColor: '#F5F5F5', // match your screen/parent background
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

