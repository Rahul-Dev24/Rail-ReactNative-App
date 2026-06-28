
import { RailOneHeader } from '@/components/RailOneHeader';
import HomeScreen from '@/pages/DashboardScreen';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Home() {
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.headerContainer}>
                <RailOneHeader />
            </View>
            <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContent} >
                <HomeScreen />
                <HomeScreen />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        position: 'relative'

    },
    scrollContent: {
        marginTop: 70,
        paddingHorizontal: 10,
        paddingTop: 14,
    },
    greetingContainer: {
        marginBottom: 20,
        // paddingTop: 100,
    },
    greetingText: {
        fontSize: 12,
        fontWeight: '300',
        // color: COLORS.textDark,
        letterSpacing: 0.2,
    },
})