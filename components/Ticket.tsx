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
        <View className='flex flex-row w-full' >
            <View className='w-[4%] bg-white z-50' />

            {/* Wrapper holds the shadow layer + the actual card as two separate views */}
            <View style={styles.cardWrapper}>

                {/* Android shadow only — no children, so nothing to clip */}
                <View style={styles.cardShadow} />

                <View style={styles.card}>

                    {/* ── Top Section ── */}
                    <View style={styles.topSection}>

                        <View style={styles.row}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Unreserved</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.utsLabel}>UTS: </Text>
                                <Text style={styles.utsValue}>{utsCode}</Text>
                            </View>
                        </View>

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

                        <View className='-mt-1 -mb-3' style={styles.row}>
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
                        <View style={[styles.notch, styles.notchLeft]} />
                        <View style={styles.dashedLine} />
                        <View style={[styles.notch, styles.notchRight]} />
                    </View>

                    {/* ── Bottom Section: Actions ── */}
                    <View className='-mt-4' style={styles.bottomSection}>
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
            </View>

            <View className='w-[4%] bg-white z-50' />
        </View>
    );
};

const styles = StyleSheet.create({
    /* Wrapper positions the shadow layer behind the real card */
    cardWrapper: {
        width: '92%',
        position: 'relative',
    },

    /* Android shadow-only layer. No children = nothing for Android to clip. */
    cardShadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
        backgroundColor: BACKGROUND,
        elevation: 3,
    },

    card: {
        width: '100%',
        backgroundColor: BACKGROUND,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        // iOS shadow (Android ignores these, so no conflict with cardShadow above)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        overflow: 'visible', // now actually respected on Android since no elevation here
    },

    topSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 14,
        gap: 14,
    },

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
        backgroundColor: '#fff',
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
    dashedLine: {
        flex: 1,
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderColor: BORDER_COLOR,
        marginHorizontal: NOTCH_SIZE / 2,
    },

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
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
        fontFamily: 'app-regular',
    },
    verticalSep: {
        width: 1.5,
        height: 24,
        backgroundColor: '#dadada',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#E9DAEF',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    badgeText: {
        color: '#7B4FA0',
        fontSize: 11,
        fontWeight: '500',
        // letterSpacing: 0.8,
        textTransform: 'uppercase',
        fontFamily: 'app-regular',
    },
    utsLabel: {
        color: 'gray',
        fontSize: 11,
        fontWeight: '900',
        fontFamily: 'app-regular',
    },
    utsValue: {
        color: '#1a1a1a',
        fontSize: 12,
        fontWeight: '900',
        fontFamily: 'app-semi-bold',
    },
    fieldLabel: {
        color: '#a5a2a2d4',
        fontSize: 11,
        fontWeight: '700',
        marginBottom: 3,
        fontFamily: 'app-regular',
    },
    fieldValue: {
        color: '#1a1a1ae8',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        fontFamily: 'app-regular',
    },
    stationText: {
        color: '#424141d8',
        fontSize: 12,
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