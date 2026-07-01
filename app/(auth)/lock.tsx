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
    View,
} from 'react-native';

const PIN_LENGTH = 6;

export default function LoginMpinScreen() {
    const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
    const [enabled, setEnabled] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        // Only allow single digits
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
                    router.replace("/(tabs)/home");
                }, 2000);
            }
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number,
    ) => {
        // Only move focus back when the current box is already empty.
        // Do NOT clear the previous box's digit here — that happens on the
        // user's *next* backspace press (handled by onChangeText), not this one.
        if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleLogin = () => {
        const mpin = pin.join('');
        if (mpin.length !== PIN_LENGTH) {
            // In production, surface this inline rather than as an alert
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
        <LinearGradient
            colors={['#DFF6FB', '#EAF8FC', '#FFFFFF']}
            className="flex-1"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 px-6 pt-16">
                        {/* Logo */}
                        <RailOneLogo />

                        {/* Title */}
                        <Text className="text-3xl font-extrabold text-slate-800 text-center mb-6">
                            Login using mPIN
                        </Text>

                        {/* Welcome */}
                        <Text className="text-lg text-slate-500 text-center mb-8">
                            Welcome Rahul Singh!
                        </Text>

                        {/* Instruction */}
                        <Text className="text-base text-slate-500 text-center mb-4">
                            Enter mPIN below
                        </Text>

                        {/* PIN inputs */}
                        <View className="flex-row justify-between mb-6">
                            {pin.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { inputRefs.current[index] = ref }}
                                    value={digit}
                                    onChangeText={(text) => handleChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    secureTextEntry
                                    className="w-[15%] h-16 bg-white border border-sky-200 rounded-xl text-center text-2xl text-slate-800"
                                    style={{ elevation: 1 }}
                                />
                            ))}
                        </View>

                        {/* Links row */}
                        <View className="flex-row justify-between mb-10">
                            <TouchableOpacity>
                                <Text className="text-base font-bold text-indigo-950">
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text className="text-base font-bold text-indigo-950">
                                    Reset mPIN?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Divider */}
                        <View className="flex-row items-center mb-10">
                            <View className="flex-1 border-t border-dashed border-slate-400" />
                            <Text className="mx-3 text-slate-500 text-base font-semibold">
                                Enable biometric
                            </Text>
                            <View className="flex-1 border-t border-dashed border-slate-400" />
                        </View>

                        {/* Biometric row + Login button */}
                        <View className="flex-row items-center justify-between mb-10">
                            <View className="flex-row">
                                <TouchableOpacity
                                    onPress={() => handleBiometric('face')}
                                    className="mr-6"
                                    accessibilityLabel="Login with Face ID"
                                >
                                    <MaterialCommunityIcons
                                        name="face-recognition"
                                        size={36}
                                        color="#475569"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleBiometric('fingerprint')}
                                    accessibilityLabel="Login with fingerprint"
                                >
                                    <MaterialCommunityIcons
                                        name="fingerprint"
                                        size={36}
                                        color="#475569"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Switch value={enabled} onValueChange={setEnabled} />

                        </View>
                        <View className='flex items-start justify-center mb-4'>
                            <Text className="text-gray-600 text-[14px]">By enabling biometric authentication you will be</Text>
                            <Text className="text-gray-600 text-[14px]">able to login through your device set biometric</Text>
                        </View>
                        {/* Different user */}
                        <TouchableOpacity className="items-center">
                            <Text className="text-lg font-extrabold text-indigo-950">
                                Different User?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}