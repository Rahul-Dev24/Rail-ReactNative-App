import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    logoSize?: number;
};

export default function RailOneLogo({ logoSize = 30 }: Props) {
    return (
        <View style={styles.outerWrapper}>
            <View
                style={[
                    styles.logoContainer,
                    {
                        paddingHorizontal: logoSize * 0.25,
                        paddingVertical: logoSize * 0.12,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.letter,
                        styles.lightWeight,
                        { fontSize: logoSize },
                    ]}
                >
                    R
                </Text>

                <Text
                    style={[
                        styles.letter,
                        styles.lightWeight,
                        {
                            fontSize: logoSize,
                            marginLeft: -logoSize * 0.014,
                        },
                    ]}
                >
                    a
                </Text>

                {/* Custom "i" */}
                <View
                    style={[
                        styles.iContainer,
                        {
                            width: logoSize * 0.19,
                            height: logoSize * 0.72,
                            marginHorizontal: logoSize * 0.02,
                            marginBottom: logoSize * 0.03,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.orangeDot,
                            {
                                width: logoSize * 0.16,
                                height: logoSize * 0.16,
                                borderRadius: logoSize * 0.08,
                            },
                        ]}
                    />

                    <View
                        style={[
                            styles.iStem,
                            {
                                width: logoSize * 0.12,
                                height: logoSize * 0.47,
                                borderRadius: 1,
                            },
                        ]}
                    />
                </View>

                <Text
                    style={[
                        styles.letter,
                        styles.boldWeight,
                        {
                            fontSize: logoSize,
                            marginLeft: logoSize * 0.03,
                        },
                    ]}
                >
                    l
                </Text>

                <Text
                    style={[
                        styles.letter,
                        styles.boldWeight,
                        {
                            fontSize: logoSize,
                            marginLeft: -logoSize * 0.014,
                        },
                    ]}
                >
                    One
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerWrapper: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#F9FAFB",
    },

    logoContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        // backgroundColor: "#FFFFFF",
        borderRadius: 6,
    },

    letter: {
        color: "#333333",
        lineHeight: undefined,
        includeFontPadding: false, // Android
    },

    lightWeight: {
        fontWeight: "300",
    },

    boldWeight: {
        fontWeight: "700",
    },

    iContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        position: "relative",
    },

    orangeDot: {
        backgroundColor: "#F14D24",
        position: "absolute",
        top: -7,
    },

    iStem: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 6,
    },
});