import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomSheet } from '../hooks/useBottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BottomSheetProps {
    visible: boolean;
    onClose?: () => void;
    isClose?: boolean;
    title?: string;

    /** Static height OR max fraction of screen (0–1). Default: 0.5 */
    snapHeight?: number | `${number}%`;

    /** Show the drag handle. Default: true */
    showHandle?: boolean;

    /** Tapping the backdrop closes the sheet. Default: true */
    closeOnBackdrop?: boolean;

    /** Primary CTA label */
    applyLabel?: string;

    /** Called when the primary CTA is tapped */
    onSubmit?: () => void;

    /** Disable the primary CTA */
    applyDisabled?: boolean;

    /** Slot in any custom content */
    children?: ReactNode;
}

function resolveHeight(snapHeight: BottomSheetProps['snapHeight']): number {
    if (!snapHeight) return SCREEN_HEIGHT * 0.5;
    if (typeof snapHeight === 'number') return snapHeight;
    const pct = parseFloat(snapHeight) / 100;
    return SCREEN_HEIGHT * Math.min(Math.max(pct, 0.1), 0.95);
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    onClose = () => { },
    isClose = true,
    title,
    snapHeight,
    showHandle = true,
    closeOnBackdrop = true,
    applyLabel = 'Apply',
    onSubmit,
    applyDisabled = false,
    children,
}) => {
    const insets = useSafeAreaInsets();
    const sheetHeight = resolveHeight(snapHeight);
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    const { translateY, panResponder, animateClose, springOpen } =
        useBottomSheet(onClose);

    // Entrance animation whenever visible flips to true
    useEffect(() => {
        if (visible) {
            translateY.setValue(sheetHeight);
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 4,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 240,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleClose = useCallback(() => {
        Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
        animateClose();
    }, [animateClose, backdropOpacity]);

    const handleApply = useCallback(() => {
        onSubmit?.();
        handleClose();
    }, [onSubmit, handleClose]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={handleClose}   // Android back button
        >
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Backdrop */}
                <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                    <Pressable
                        style={styles.flex}
                        onPress={closeOnBackdrop ? handleClose : undefined}
                        accessibilityLabel="Close sheet"
                    />
                </Animated.View>

                {/* Sheet */}
                <Animated.View
                    style={[
                        styles.sheet,
                        {
                            height: sheetHeight,
                            paddingBottom: insets.bottom || 16,
                            transform: [{ translateY }],
                        },
                    ]}
                >
                    {/* Drag handle area — captures pan gestures */}
                    <View {...panResponder.panHandlers} style={styles.handleArea}>
                        {showHandle && <View style={styles.handle} />}
                    </View>

                    {/* Title */}
                    {title ? (
                        <View style={styles.titleRow}>
                            <Text style={styles.titleText}>{title}</Text>
                            <TouchableOpacity
                                onPress={handleClose}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                accessibilityLabel="Close"
                                accessibilityRole="button"
                            >
                                {isClose ? <Text style={styles.closeIcon}>✕</Text> : undefined}
                            </TouchableOpacity>
                        </View>
                    ) : null}

                    {/* Scrollable content */}
                    <ScrollView
                        style={styles.flex}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>

                    {/* Primary CTA */}
                    {onSubmit ? (
                        <View style={styles.applyWrapper}>
                            <TouchableOpacity
                                style={[
                                    styles.applyButton,
                                    applyDisabled && styles.applyDisabled,
                                ]}
                                onPress={handleApply}
                                disabled={applyDisabled}
                                activeOpacity={0.85}
                                accessibilityRole="button"
                                accessibilityLabel={applyLabel}
                                accessibilityState={{ disabled: applyDisabled }}
                            >
                                <Text style={styles.applyText}>{applyLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1 },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 16,
    },
    handleArea: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    handle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D1D1D6',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 14,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },
    closeIcon: {
        fontSize: 20,
        color: '#888',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 8,
    },
    applyWrapper: {
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    applyButton: {
        backgroundColor: '#1A56DB',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
    },
    applyDisabled: {
        backgroundColor: '#A0B4E8',
    },
    applyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});