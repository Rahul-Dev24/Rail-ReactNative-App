import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, TextStyle, View } from 'react-native';

type AnimatedTimerTextProps = {
    minutes: number;
    seconds: number;
};

const DROP_DISTANCE = -28;
const DURATION = 720;
// Decelerating curve — starts fast, eases into place, no overshoot.
const SMOOTH_EASING = Easing.out(Easing.cubic);

export function AnimatedTimerText({ minutes, seconds }: AnimatedTimerTextProps) {
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    const minutesTranslateY = useRef(new Animated.Value(0)).current;
    const minutesOpacity = useRef(new Animated.Value(1)).current;
    const secondsTranslateY = useRef(new Animated.Value(0)).current;
    const secondsOpacity = useRef(new Animated.Value(1)).current;

    const prevMinutes = useRef(mm);
    const prevSeconds = useRef(ss);

    const dropIn = (translateY: Animated.Value, opacity: Animated.Value) => {
        translateY.setValue(DROP_DISTANCE);
        opacity.setValue(0);

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: DURATION,
                easing: SMOOTH_EASING,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: DURATION,
                easing: SMOOTH_EASING,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        const minutesChanged = prevMinutes.current !== mm;
        const secondsChanged = prevSeconds.current !== ss;

        if (minutesChanged) {
            dropIn(minutesTranslateY, minutesOpacity);
            dropIn(secondsTranslateY, secondsOpacity);
        } else if (secondsChanged) {
            dropIn(secondsTranslateY, secondsOpacity);
        }

        prevMinutes.current = mm;
        prevSeconds.current = ss;
    }, [mm, ss]);

    const digitStyle: TextStyle = {
        fontFamily: 'app-bold',
        fontSize: 48,
        fontWeight: '800',
        color: 'red',
        textAlign: 'center',
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={{ overflow: 'hidden' }}>
                <Animated.Text
                    style={[
                        digitStyle,
                        {
                            transform: [{ translateY: minutesTranslateY }],
                            opacity: minutesOpacity,
                        },
                    ]}
                >
                    {mm}
                </Animated.Text>
            </View>

            <Text style={digitStyle}>:</Text>

            <View style={{ overflow: 'hidden' }}>
                <Animated.Text
                    style={[
                        digitStyle,
                        {
                            transform: [{ translateY: secondsTranslateY }],
                            opacity: secondsOpacity,
                        },
                    ]}
                >
                    {ss}
                </Animated.Text>
            </View>
        </View>
    );
}