import Switch from '@/components/inputs/Switch';
import RailOneLogo from '@/components/RailOneLogo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
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

// Baseline device used when the original spacing values (pt-18, mb-20, etc.)
// were designed against — a standard ~6.1" phone.
const BASELINE_WIDTH = 390;
const BASELINE_HEIGHT = 844;

export default function LoginMpinScreen() {
    const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
    const [enabled, setEnabled] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const { width, height } = useWindowDimensions();

    // Scale factor relative to baseline, clamped so tiny phones don't
    // shrink to nothing and tablets don't blow up the spacing absurdly.
    const heightScale = height / BASELINE_HEIGHT;
    const widthScale = width / BASELINE_WIDTH;
    const scaleFactor = Math.min(Math.max(heightScale, 0.78), 1.35);
    const hScaleFactor = Math.min(Math.max(widthScale, 0.8), 1.5);

    // scale() = vertical spacing/fonts, hscale() = horizontal spacing
    const scale = (size: number) => Math.round(size * scaleFactor);
    const hscale = (size: number) => Math.round(size * hScaleFactor);

    // Tailwind's spacing unit is 4px, so pt-18 = 72px, mt-18 = 72px,
    // mb-15 = 60px, mb-20 = 80px, etc. Reproducing those exact original
    // values here, just scaled to the current device.
    const spacing = {
        contentPaddingTop: scale(20),   // pt-18
        titleMarginTop: scale(65),      // mt-18
        titleMarginBottom: scale(32),   // mb-8
        welcomeMarginBottom: scale(28), // mb-8
        instructionMarginBottom: scale(16), // mb-4
        pinMarginBottom: scale(14),     // mb-6
        linksMarginBottom: scale(62),   // mb-20
        dividerMarginBottom: scale(56), // mb-15
        biometricRowMarginBottom: scale(40), // mb-10
        noteMarginBottom: scale(16),    // mb-4
        horizontalPadding: hscale(24),  // px-6
        pinGap: hscale(8),
    };

    const pinBoxSize = Math.min(Math.max(scale(50) * (hScaleFactor / scaleFactor > 1 ? 1 : hScaleFactor), 40), 64);

    const titleFontSize = scale(18);
    const welcomeFontSize = scale(15);
    const bodyFontSize = scale(13);
    const smallFontSize = scale(14);

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

    const handleLogin = () => {
        const mpin = pin.join('');
        if (mpin.length !== PIN_LENGTH) {
            console.warn('Enter all 6 digits of your mPIN');
            return;
        }
        console.log('Logging in with mPIN:', mpin);
        // TODO: wire up your auth logic here
    };

    const handleBiometric = (type: 'face' | 'fingerprint') => {
        console.log('Biometric login requested:', type);
        // TODO: wire up expo-local-authentication here
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
                            {/* Logo */}
                            <RailOneLogo />

                            {/* Title */}
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

                            {/* Welcome */}
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

                            {/* Instruction */}
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

                            {/* PIN inputs */}
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

                            {/* Links row */}
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

                            {/* Divider */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.dividerMarginBottom }}>
                                <View style={{ flex: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#cbd5e1' }} />
                                <Text style={{ marginHorizontal: 12, color: '#94a3b8', fontFamily: 'app-regular', fontSize: bodyFontSize, fontWeight: '600' }}>
                                    Enable biometric
                                </Text>
                                <View style={{ flex: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#cbd5e1' }} />
                            </View>

                            {/* Biometric row + Login button */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: spacing.biometricRowMarginBottom,
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => handleBiometric('face')}
                                        style={{ marginRight: hscale(24) }}
                                        accessibilityLabel="Login with Face ID"
                                    >
                                        <MaterialCommunityIcons name="face-recognition" size={scale(32)} color="gray" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleBiometric('fingerprint')}
                                        accessibilityLabel="Login with fingerprint"
                                    >
                                        <MaterialCommunityIcons name="fingerprint" size={scale(38)} color="#475569" />
                                    </TouchableOpacity>
                                </View>

                                <Switch value={enabled} onValueChange={setEnabled} />
                            </View>

                            <View style={{ marginBottom: spacing.noteMarginBottom }}>
                                <Text style={{ color: '#4b5563', fontSize: smallFontSize }}>
                                    By enabling biometric authentication you will be
                                </Text>
                                <Text style={{ color: '#4b5563', fontSize: smallFontSize }}>
                                    able to login through your device set biometric
                                </Text>
                            </View>

                            {/* Different user */}
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