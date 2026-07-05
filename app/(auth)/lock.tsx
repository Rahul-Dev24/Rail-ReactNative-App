import Switch from '@/components/inputs/Switch';
import RailOneLogo from '@/components/RailOneLogo';
import { authenticate, checkBiometric } from '@/hooks/useBiometric';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PIN_LENGTH = 6;
const BIOMETRIC_PREF_KEY = 'railone_biometric_enabled';

const BASELINE_WIDTH = 390;
const BASELINE_HEIGHT = 844;

type BiometricStatus = {
    supported: boolean;
    reason?: string;
    faceId?: boolean;
    fingerprint?: boolean;
    iris?: boolean;
};

export default function LoginMpinScreen() {
    const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
    const [enabled, setEnabled] = useState(false);
    const [bioStatus, setBioStatus] = useState<BiometricStatus | null>(null);
    const [bioError, setBioError] = useState<string | null>(null);
    const [checkingBio, setCheckingBio] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const hasAutoPrompted = useRef(false);

    const { width, height } = useWindowDimensions();
    const heightScale = height / BASELINE_HEIGHT;
    const widthScale = width / BASELINE_WIDTH;
    const scaleFactor = Math.min(Math.max(heightScale, 0.78), 1.35);
    const hScaleFactor = Math.min(Math.max(widthScale, 0.8), 1.5);
    const scale = (size: number) => Math.round(size * scaleFactor);
    const hscale = (size: number) => Math.round(size * hScaleFactor);

    const spacing = {
        contentPaddingTop: scale(20),
        titleMarginTop: scale(65),
        titleMarginBottom: scale(32),
        welcomeMarginBottom: scale(28),
        instructionMarginBottom: scale(16),
        pinMarginBottom: scale(14),
        linksMarginBottom: scale(62),
        dividerMarginBottom: scale(56),
        biometricRowMarginBottom: scale(40),
        noteMarginBottom: scale(16),
        horizontalPadding: hscale(24),
        pinGap: hscale(8),
    };

    const pinBoxSize = Math.min(Math.max(scale(50) * (hScaleFactor / scaleFactor > 1 ? 1 : hScaleFactor), 40), 64);

    const titleFontSize = scale(18);
    const welcomeFontSize = scale(15);
    const bodyFontSize = scale(13);
    const smallFontSize = scale(14);

    // ── Biometric setup ──────────────────────────────────────────────
    // Runs once on mount: checks hardware/enrollment, loads the user's
    // saved preference, and — if they'd previously opted in — auto-fires
    // the native prompt so it appears as the app opens.
    useEffect(() => {
        let isMounted = true;

        (async () => {
            const status = await checkBiometric();
            if (!isMounted) return;
            setBioStatus(status);

            const savedPref = await AsyncStorage.getItem(BIOMETRIC_PREF_KEY);
            const userOptedIn = savedPref === 'true';
            if (!isMounted) return;
            setEnabled(userOptedIn);

            if (userOptedIn && status.supported && !hasAutoPrompted.current) {
                hasAutoPrompted.current = true;
                // Small delay so the screen has actually painted before
                // the native biometric sheet covers it — feels less jarring
                // than a prompt firing mid-transition.
                setTimeout(() => {
                    if (isMounted) runBiometricAuth();
                }, 400);
            }
        })();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const runBiometricAuth = async () => {
        setBioError(null);
        setCheckingBio(true);
        try {
            const result = await authenticate();
            if (result.success) {
                router.replace('/(tabs)/home');
            } else if (result.error && result.error !== 'user_cancel' && result.error !== 'system_cancel') {
                setBioError('Biometric authentication failed. Please use your mPIN.');
            }
            // user_cancel / system_cancel: stay silent, they'll just type the PIN
        } finally {
            setCheckingBio(false);
        }
    };

    // Toggle handler — verifies biometrics actually work before persisting
    // "on", so you never save a broken enabled state.
    const handleToggleBiometric = async (value: boolean) => {
        if (!value) {
            setEnabled(false);
            await AsyncStorage.setItem(BIOMETRIC_PREF_KEY, 'false');
            return;
        }

        if (!bioStatus?.supported) {
            setBioError(
                bioStatus?.reason === 'No biometric enrolled'
                    ? 'No fingerprint or face is set up on this device yet. Add one in your device settings first.'
                    : 'This device does not support biometric authentication.',
            );
            return;
        }

        const result = await authenticate();
        if (result.success) {
            setEnabled(true);
            setBioError(null);
            await AsyncStorage.setItem(BIOMETRIC_PREF_KEY, 'true');
        } else {
            setBioError('Could not verify your biometric. Toggle stayed off.');
        }
    };

    const handleChange = (text: string, index: number) => {
        const digit = text.replace(/[^0-9]/g, '').slice(-1);
        const newPin = [...pin];
        newPin[index] = digit;
        setPin(newPin);

        if (digit && index < PIN_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (digit && index === PIN_LENGTH - 1) {
            Keyboard.dismiss();
            const checkPin = newPin?.join('');

            if (checkPin === '111111') {
                setTimeout(() => {
                    router.replace('/(tabs)/home');
                }, 2000);
            } else if (newPin.length === 6) {
                setPin(Array(PIN_LENGTH).fill(''));
            }
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number,
    ) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (pin[index]) {
                const newPin = [...pin];
                newPin[index] = '';
                setPin(newPin);
                return;
            }
            if (index > 0) {
                const newPin = [...pin];
                newPin[index - 1] = '';
                setPin(newPin);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Manual tap on the face/fingerprint icons — same underlying call;
    // expo-local-authentication doesn't let you force "only face" or
    // "only fingerprint" specifically, the OS decides which UI to show
    // based on what's enrolled. Both icons trigger the same authenticate().
    const handleBiometric = (_type: 'face' | 'fingerprint') => {
        if (!bioStatus?.supported) {
            setBioError('Biometric authentication is not available on this device.');
            return;
        }
        runBiometricAuth();
    };

    return (
        <LinearGradient colors={['#DFF6FB', '#EAF8FC', '#FFFFFF']} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: spacing.horizontalPadding,
                                paddingTop: spacing.contentPaddingTop,
                            }}
                        >
                            <RailOneLogo />

                            <Text
                                style={{
                                    fontFamily: 'app-regular',
                                    fontSize: titleFontSize,
                                    fontWeight: 'bold',
                                    color: '#293446',
                                    textAlign: 'center',
                                    marginTop: spacing.titleMarginTop,
                                    marginBottom: spacing.titleMarginBottom,
                                }}
                            >
                                Login using mPIN
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'app-regular',
                                    fontSize: welcomeFontSize,
                                    color: '#64748b',
                                    textAlign: 'center',
                                    marginBottom: spacing.welcomeMarginBottom,
                                }}
                            >
                                Welcome Rahul Singh!
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'app-regular',
                                    fontSize: bodyFontSize,
                                    color: '#64748b',
                                    textAlign: 'center',
                                    marginBottom: spacing.instructionMarginBottom,
                                }}
                            >
                                Enter mPIN below
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: spacing.pinMarginBottom,
                                }}
                            >
                                {pin.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        value={digit}
                                        ref={(ref) => {
                                            inputRefs.current[index] = ref;
                                        }}
                                        onChangeText={(text) => handleChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        contextMenuHidden={true}
                                        selectTextOnFocus={true}
                                        style={{
                                            width: pinBoxSize,
                                            height: pinBoxSize,
                                            borderWidth: 1,
                                            borderColor: '#a7bfdd',
                                            borderRadius: 12,
                                            textAlign: 'center',
                                            fontSize: pinBoxSize * 0.44,
                                            backgroundColor: '#FFF',
                                        }}
                                    />
                                ))}
                            </View>

                            {/* Inline biometric error/status — no Alert popups */}
                            {bioError && (
                                <Text
                                    style={{
                                        color: '#DC2626',
                                        fontSize: smallFontSize,
                                        textAlign: 'center',
                                        marginBottom: spacing.instructionMarginBottom,
                                    }}
                                >
                                    {bioError}
                                </Text>
                            )}
                            {checkingBio && (
                                <Text
                                    style={{
                                        color: '#64748b',
                                        fontSize: smallFontSize,
                                        textAlign: 'center',
                                        marginBottom: spacing.instructionMarginBottom,
                                    }}
                                >
                                    Verifying biometric…
                                </Text>
                            )}

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: spacing.linksMarginBottom,
                                }}
                            >
                                <TouchableOpacity>
                                    <Text style={{ fontSize: bodyFontSize, fontWeight: 'bold', fontFamily: 'app-regular', color: '#1e1b4b' }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: bodyFontSize, fontWeight: 'bold', fontFamily: 'app-regular', color: '#1e1b4b' }}>
                                        Reset mPIN?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.dividerMarginBottom }}>
                                <View style={{ flex: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#cbd5e1' }} />
                                <Text style={{ marginHorizontal: 12, color: '#94a3b8', fontFamily: 'app-regular', fontSize: bodyFontSize, fontWeight: '600' }}>
                                    Enable biometric
                                </Text>
                                <View style={{ flex: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#cbd5e1' }} />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: spacing.biometricRowMarginBottom,
                                    opacity: bioStatus?.supported ? 1 : 0.4,
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => handleBiometric('face')}
                                        disabled={!bioStatus?.supported}
                                        style={{ marginRight: hscale(24) }}
                                        accessibilityLabel="Login with Face ID"
                                    >
                                        <MaterialCommunityIcons name="face-recognition" size={scale(32)} color="gray" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleBiometric('fingerprint')}
                                        disabled={!bioStatus?.supported}
                                        accessibilityLabel="Login with fingerprint"
                                    >
                                        <MaterialCommunityIcons name="fingerprint" size={scale(38)} color="#475569" />
                                    </TouchableOpacity>
                                </View>

                                <Switch value={enabled} onValueChange={handleToggleBiometric} />
                            </View>

                            <View style={{ marginBottom: spacing.noteMarginBottom }}>
                                <Text style={{ color: '#4b5563', fontSize: smallFontSize }}>
                                    By enabling biometric authentication you will be
                                </Text>
                                <Text style={{ color: '#4b5563', fontSize: smallFontSize }}>
                                    able to login through your device set biometric
                                </Text>
                            </View>

                            <TouchableOpacity style={{ alignItems: 'center', paddingBottom: scale(16) }}>
                                <Text style={{ fontSize: welcomeFontSize, fontWeight: '800', color: '#1e1b4b' }}>
                                    Different User?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}