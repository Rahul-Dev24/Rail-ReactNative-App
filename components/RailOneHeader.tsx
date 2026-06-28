
import { color } from '@/constant/data';
import Images from '@/constant/image';
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
                        <Image source={Images.langIcon} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} />
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
                    <Image source={Images.notification} style={{ width: 44, height: 44 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        // backgroundColor: 'transparent',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: "100%",
        backgroundColor: '#fff',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        zIndex: 999
    },

    header: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        height: 70,
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
        marginTop: 3,
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