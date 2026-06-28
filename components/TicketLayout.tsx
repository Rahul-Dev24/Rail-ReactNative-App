import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function TicketLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.ticketWrapper}>
                <LinearGradient
                    colors={['#3B49A6', '#7156CE', '#AA6EE2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.ticketCard}
                >
                    {/* Top Notch */}
                    <View style={styles.topCutout} />

                    {/* Date Section */}
                    <View style={styles.dateSection}>
                        <Text style={styles.dateText}>Thu, 4 Jun 26</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Station Section */}
                    <View style={styles.stationSection}>
                        <Text style={styles.stationText}>GUMMIDIPUNDI</Text>
                        <Text style={styles.stationText}>GUINDY</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Footer Section */}
                    <View style={styles.footerSection}>
                        <Text style={styles.statusText}>Unreserved</Text>

                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.7}
                                onPress={() => console.log('Book Again')}
                            >
                                <Text style={styles.buttonText}>Book Again</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.7}
                                onPress={() => console.log('View Details')}
                            >
                                <Text style={styles.buttonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom Notch */}
                    <View style={styles.bottomCutout} />
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    ticketWrapper: {
        width: '100%',
        maxWidth: 460,
        borderRadius: 23,
        overflow: 'hidden',
        // Shadow for iOS
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 12 },
        // shadowOpacity: 0.18,
        // shadowRadius: 20,
        // Shadow for Android
        // elevation: 12,
    },
    ticketCard: {
        paddingVertical: 28,
        paddingHorizontal: 20,
        borderRadius: 28,
        position: 'relative',
        overflow: 'visible',
    },
    topCutout: {
        position: 'absolute',
        top: -14,
        right: 80,
        width: 22,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        zIndex: 10,
    },
    bottomCutout: {
        position: 'absolute',
        bottom: -14,
        right: 80,
        width: 22,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        zIndex: 10,
    },
    dateSection: {
        marginBottom: 16,
        marginTop: 4,
    },
    dateText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#dadada',
        opacity: 0.95,
        letterSpacing: 0.4,
        fontFamily: 'app-regular'
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        width: '100%',
    },
    stationSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    stationText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#dadada',
        opacity: 0.9,
        letterSpacing: 0.8,
    },
    footerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        flexWrap: 'wrap',
        gap: 10,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#B0FF83',
        letterSpacing: 0.2,
        fontFamily: 'app-semi-bold'
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    button: {
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.55)',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        paddingVertical: 2,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'app-regular'
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },
});