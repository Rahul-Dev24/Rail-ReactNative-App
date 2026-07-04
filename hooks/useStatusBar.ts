import { useFocusEffect } from 'expo-router';
import { setStatusBarHidden, setStatusBarStyle } from 'expo-status-bar';
import { useCallback } from 'react';

type StatusBarConfig = {
    style?: 'light' | 'dark' | 'auto';
    hidden?: boolean;
    animated?: boolean;
};

export function useStatusBar({
    style = 'dark',
    hidden = false,
    animated = true,
}: StatusBarConfig) {
    useFocusEffect(
        useCallback(() => {
            setStatusBarStyle(style, animated);
            setStatusBarHidden(hidden, animated ? 'fade' : 'none');
        }, [style, hidden, animated]),
    );
}