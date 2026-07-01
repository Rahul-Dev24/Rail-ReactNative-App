import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

interface AppSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;

    disabled?: boolean;

    width?: number;
    height?: number;
    thumbSize?: number;

    activeColor?: string;
    inactiveColor?: string;

    thumbColor?: string;

    duration?: number;
}

export default function Switch({
    value,
    onValueChange,
    disabled = false,

    width = 54,
    height = 30,
    thumbSize = 24,

    activeColor = "#22C55E",
    inactiveColor = "#D1D5DB",

    thumbColor = "#FFFFFF",

    duration = 200,
}: AppSwitchProps) {
    const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 1 : 0,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [value]);

    const maxTranslate = width - thumbSize - 4;

    return (
        <Pressable
            disabled={disabled}
            onPress={() => onValueChange(!value)}
        >
            <View
                style={[
                    styles.track,
                    {
                        width,
                        height,
                        borderRadius: height / 2,
                        backgroundColor: value
                            ? activeColor
                            : inactiveColor,
                        opacity: disabled ? 0.6 : 1,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.thumb,
                        {
                            width: thumbSize,
                            height: thumbSize,
                            borderRadius: thumbSize / 2,
                            backgroundColor: thumbColor,
                            transform: [
                                {
                                    translateX: translateX.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [2, maxTranslate],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    track: {
        justifyContent: "center",
    },

    thumb: {
        position: "absolute",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
});