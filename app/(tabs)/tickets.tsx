import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export default function tickets() {
    useEffect(() => {
        router.replace("/(booking)/upcoming");
    }, []);

    return null;
}

const styles = StyleSheet.create({})