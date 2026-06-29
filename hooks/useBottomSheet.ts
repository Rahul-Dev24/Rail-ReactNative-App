import { useCallback, useRef } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    PanResponderGestureState,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAG_THRESHOLD = 80;   // px dragged down before auto-close
const VELOCITY_THRESHOLD = 0.5; // fling velocity to auto-close

export function useBottomSheet(onClose: () => void) {
    const translateY = useRef(new Animated.Value(0)).current;

    const springOpen = useCallback(() => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
        }).start();
    }, [translateY]);

    const animateClose = useCallback(() => {
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 280,
            useNativeDriver: true,
        }).start(() => onClose());
    }, [translateY, onClose]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
            onPanResponderMove: (_, g: PanResponderGestureState) => {
                if (g.dy > 0) translateY.setValue(g.dy);
            },
            onPanResponderRelease: (_, g: PanResponderGestureState) => {
                const shouldClose =
                    g.dy > DRAG_THRESHOLD || g.vy > VELOCITY_THRESHOLD;
                if (shouldClose) {
                    animateClose();
                } else {
                    springOpen();
                }
            },
        })
    ).current;

    return { translateY, panResponder, animateClose, springOpen };
}