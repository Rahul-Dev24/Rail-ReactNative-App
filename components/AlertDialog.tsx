import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    visible: boolean;
    title: string;
    message: string;
    primaryText?: string;
    secondaryText?: string;
    onPrimaryPress?: () => void;
    onSecondaryPress?: () => void;
}

export default function AlertDialog({
    visible,
    title,
    message,
    primaryText = "OK",
    secondaryText,
    onPrimaryPress,
    onSecondaryPress,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title} className="font-[app-bold]" >{title}</Text>

                    <Text style={styles.message} className="font-[app-regular]">
                        {message}
                    </Text>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={onPrimaryPress}
                    >
                        <Text style={styles.primaryText} className="font-[app-bold]">
                            {primaryText}
                        </Text>
                    </TouchableOpacity>

                    {secondaryText && (
                        <TouchableOpacity onPress={onSecondaryPress}>
                            <Text style={styles.secondaryText} className="font-[app-semi-bold]">
                                {secondaryText}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000066",
        justifyContent: "center",
        alignItems: "center",
        padding: 35,
    },

    container: {
        width: "100%",
        borderRadius: 28,
        backgroundColor: "#FFF",
        padding: 28,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
        color: "#000",
    },

    message: {
        fontSize: 16,
        color: "#364152",
        textAlign: "center",
        lineHeight: 25,
        marginBottom: 28,
    },

    primaryBtn: {
        height: 56,
        backgroundColor: "#0066FE",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },

    primaryText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
    },

    secondaryText: {
        marginTop: 22,
        textAlign: "center",
        fontSize: 16,
        color: "#6B7280",
        fontWeight: "600",
    },
});