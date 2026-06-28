import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="lock" />
        </Stack>
    )
}

const styles = StyleSheet.create({})