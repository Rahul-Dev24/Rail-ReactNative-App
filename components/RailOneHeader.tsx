
import { color } from '@/constant/data';
import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import RailOneLogo from './RailOneLogo';


export function RailOneHeader() {
    return (
        <View style={styles.headerWrapper}>
            <View style={styles.header}>
                {/* Left */}
                <TouchableOpacity style={styles.langBtn}>
                    <View style={styles.langIconWrapper}>
                        <svg
                            viewBox="0 0 100 100"
                            style={styles.langIconSvg}
                        >
                            {/* English Letter 'A' (Top-Left) */}
                            <text
                                x="32"
                                y="45"
                                fontSize="28"
                                fontWeight="900"
                                fill="#1A47C8"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                            >
                                A
                            </text>

                            {/* Hindi Letter 'अ' (Bottom-Right) */}
                            <text
                                x="68"
                                y="79"
                                fontSize="28"
                                fontWeight="900"
                                fill="#1A47C8"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                            >
                                अ
                            </text>

                            {/* Top-Right Translation Curve */}
                            <path
                                d="M 58 24 A 10 10 0 0 1 70 36"
                                fill="none"
                                stroke="#1A47C8"
                                strokeWidth="5.5"
                                strokeLinecap="round"
                            />

                            {/* Bottom-Left Translation Curve */}
                            <path
                                d="M 42 76 A 10 10 0 0 1 30 64"
                                fill="none"
                                stroke="#1A47C8"
                                strokeWidth="5.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </View>
                </TouchableOpacity>

                {/* Center */}
                <View style={styles.logoContainer}>
                    <RailOneLogo />
                </View>

                {/* Right */}
                <TouchableOpacity style={styles.bellBtn}>
                    {/* <Ionicons
            name="notifications-outline"
            size={22}
            color={C.text}
          /> */}
                    <Image source={require('../assets/images/notification.gif')} style={{ width: 44, height: 44 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },

    header: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 54 : 10,
        paddingBottom: 10,
    },

    headerContainer: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box' as const,
    },
    /* --- Language Selector Styling --- */
    langIconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box' as const,

        width: 45,
        height: 45,
        borderRadius: '50%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dadada',
        fontWeight: 900,
    },
    langIconSvg: {
        width: '80%',
        height: '80%',
    },

    langBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    langText: {
        fontSize: 13,
        fontWeight: '700',
        color: color.blue,
    },

    langTextHindi: {
        fontSize: 13,
        fontWeight: '700',
        color: '#E53935',
    },

    logoContainer: {
        alignItems: 'center',
    },

    logoText: {
        fontSize: 26,
        letterSpacing: 0.5,
    },

    logoRail: {
        fontWeight: '400',
        color: color.text,
    },

    logoOne: {
        fontWeight: '700',
        color: color.text,
    },

    bellBtn: {
        width: 46,
        height: 46,
        borderRadius: '50%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dadada',
        overflow: 'hidden',
        // backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    }
})