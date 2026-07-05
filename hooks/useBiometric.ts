import * as LocalAuthentication from "expo-local-authentication";

export async function checkBiometric() {
    // Device has biometric hardware?
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
        return {
            supported: false,
            reason: "No biometric hardware",
        };
    }

    // User enrolled Fingerprint/Face?
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
        return {
            supported: false,
            reason: "No biometric enrolled",
        };
    }

    // Get supported biometric types
    const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    return {
        supported: true,
        faceId: types.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        ),
        fingerprint: types.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT
        ),
        iris: types.includes(
            LocalAuthentication.AuthenticationType.IRIS
        ),
    };
}

export async function authenticate() {
    return await LocalAuthentication.authenticateAsync({
        promptMessage: "Biometric authentication required!",
        promptSubtitle: "Verify identity",
        promptDescription:
            "Authenticate using biometrics",
        cancelLabel: "Cancel",
        fallbackLabel: "Use Device Passcode",
        disableDeviceFallback: false,
        requireConfirmation: false
    });
}