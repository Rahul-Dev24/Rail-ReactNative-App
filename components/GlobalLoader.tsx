import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Animated, Easing, Modal, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export type GlobalLoaderRef = {
    show: (message?: string) => void;
    hide: () => void;
};

const GlobalLoader = forwardRef<GlobalLoaderRef>((_, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const spinValue = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
        show: (msg) => {
            setMessage(msg);
            setVisible(true);
        },
        hide: () => setVisible(false),
    }));

    useEffect(() => {
        if (!visible) return;

        spinValue.setValue(0);
        const loop = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1400,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        );
        loop.start();

        return () => loop.stop();
    }, [visible, spinValue]);

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Three overlapping arcs at different radii/widths/opacities, each
    // left slightly open (via strokeDasharray) with round caps — that
    // layering + the gaps is what reads as a hand-drawn ink brush circle
    // instead of a clean geometric ring.
    const SIZE = 72;
    const CENTER = SIZE / 2;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View className="flex-1 items-center justify-center bg-black/40">
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                        <Circle
                            cx={CENTER}
                            cy={CENTER}
                            r={28}
                            stroke="#2563EB"
                            strokeWidth={5}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="168 22"
                            opacity={1}
                            transform={`rotate(-15 ${CENTER} ${CENTER})`}
                        />
                        <Circle
                            cx={CENTER}
                            cy={CENTER}
                            r={26}
                            stroke="#2563EB"
                            strokeWidth={3.5}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="150 40"
                            opacity={0.55}
                            transform={`rotate(60 ${CENTER} ${CENTER})`}
                        />
                        <Circle
                            cx={CENTER}
                            cy={CENTER}
                            r={24}
                            stroke="#2563EB"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="130 60"
                            opacity={0.3}
                            transform={`rotate(150 ${CENTER} ${CENTER})`}
                        />
                    </Svg>
                </Animated.View>

                {!!message && (
                    <Text className="text-white text-base font-semibold mt-5">
                        {message}
                    </Text>
                )}
            </View>
        </Modal>
    );
});

GlobalLoader.displayName = 'GlobalLoader';

export default GlobalLoader;