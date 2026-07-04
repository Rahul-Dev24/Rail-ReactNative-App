import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    color: string;
};

export function StatusBarBackground({ color }: Props) {
    const insets = useSafeAreaInsets();

    return (
        <View
            pointerEvents="none"
            style={[
                styles.bar,
                { height: insets.top, backgroundColor: color },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
});