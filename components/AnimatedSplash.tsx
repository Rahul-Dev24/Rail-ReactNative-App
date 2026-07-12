import { useStatusBar } from '@/hooks/useStatusBar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

SplashScreen.preventAutoHideAsync().catch(() => { });

const LIGHT_BG = '#ffffff';
const IMAGE_WIDTH = 250;

type Props = {
    appReady: boolean;
    children: React.ReactNode;
};

export default function AnimatedSplash({ appReady, children }: Props) {
    useStatusBar({ style: 'dark' })
    const backgroundColor = LIGHT_BG;

    const [showOverlay, setShowOverlay] = useState(true);
    const [imageReady, setImageReady] = useState(false);
    const scale = useRef(new Animated.Value(1)).current;
    const overlayOpacity = useRef(new Animated.Value(1)).current;
    const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

    // Only hide the NATIVE splash once our overlay's image has actually
    // painted — this is the fix. Previously this fired on the next JS
    // frame regardless of whether the image was ready, leaving a blank
    // gap between "native splash gone" and "our icon visible."
    useEffect(() => {
        if (!imageReady) return;

        const frame = requestAnimationFrame(() => {
            SplashScreen.hideAsync().catch(() => { });
        });

        pulseLoop.current = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.12,
                    duration: 650,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0.92,
                    duration: 650,
                    useNativeDriver: true,
                }),
            ]),
        );
        pulseLoop.current.start();

        return () => {
            cancelAnimationFrame(frame);
            pulseLoop.current?.stop();
        };
    }, [imageReady]);

    useEffect(() => {
        if (!appReady || !imageReady) return;

        pulseLoop.current?.stop();

        Animated.sequence([
            Animated.spring(scale, {
                toValue: 1.15,
                friction: 3,
                tension: 120,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 4,
                tension: 120,
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 280,
                delay: 120,
                useNativeDriver: true,
            }),
        ]).start(() => setShowOverlay(false));
    }, [appReady, imageReady]);

    return (
        <View style={{ flex: 1 }}>
            {children}

            {showOverlay && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        styles.overlay,
                        { backgroundColor, opacity: overlayOpacity },
                    ]}
                >
                    <Animated.Image
                        source={require('@/assets/images/splash-icon.png')}
                        resizeMode="contain"
                        onLoadEnd={() => setImageReady(true)}
                        style={{
                            width: IMAGE_WIDTH,
                            height: IMAGE_WIDTH,
                            transform: [{ scale }],
                        }}
                    />
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
});