import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState, useMemo } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { devide, wp } from "../helpers/functions";
import CustomInput from "../components/CustomInput";
import { colorSchemeType, divideReturnType } from "../../types";

const Divide = () => {
    const { colors } = useTheme<colorSchemeType>();

    const themeStyles = useMemo(
        () => ({
            mathText: [styles.mathText, { color: colors.text }],
            varticleLine: [
                styles.varticleLine,
                { backgroundColor: colors.text },
            ],
            hrLine: [styles.hrLine, { backgroundColor: colors.text }],
            errorText: [styles.errorText, { color: colors.error || "#ff3333" }],
        }),
        [colors]
    );

    const [text, onChangeText] = useState({ a: "", b: "" });
    const [divideAns, setDivideAns] = useState<divideReturnType>();
    const [error, setError] = useState<{ hasError: boolean; message: string }>({
        hasError: false,
        message: "",
    });

    const handleTextChange = (key: "a" | "b", val: string) => {
        onChangeText((prev) => ({ ...prev, [key]: val }));
        if (divideAns) setDivideAns(undefined);
        if (error.hasError) setError({ hasError: false, message: "" });
    };

    const calculatePress = () => {
        setError({ hasError: false, message: "" });

        if (!text.a || !text.b) {
            setError({ hasError: true, message: "Please fill in both fields" });
            setDivideAns(undefined);
            return;
        }

        const isPositiveIntA = /^\d+$/.test(text.a);
        const isPositiveIntB = /^\d+$/.test(text.b);

        if (!isPositiveIntA || !isPositiveIntB) {
            setError({
                hasError: true,
                message: "Please enter positive integers only",
            });
            setDivideAns(undefined);
            return;
        }

        const intA = parseInt(text.a, 10);
        const intB = parseInt(text.b, 10);

        if (intB === 0) {
            setError({ hasError: true, message: "Cannot divide by zero" });
            setDivideAns(undefined);
            return;
        }

        if (intA <= 0 || intB <= 0) {
            setError({
                hasError: true,
                message: "Please enter positive integers only",
            });
            setDivideAns(undefined);
            return;
        }

        if (intB > intA) {
            setError({
                hasError: true,
                message: "Dividend must be greater than or equal to divisor",
            });
            setDivideAns(undefined);
            return;
        }

        const abc = devide(intA, intB);
        if (abc) {
            setDivideAns(abc);
        } else {
            setError({
                hasError: true,
                message: "Failed to calculate long division steps",
            });
            setDivideAns(undefined);
        }
    };

    const handleReset = () => {
        onChangeText({ a: "", b: "" });
        setDivideAns(undefined);
        setError({ hasError: false, message: "" });
    };

    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor,
                flex: 1,
            }}>
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <CustomInput
                        onChangeText={(e) => handleTextChange("a", e)}
                        value={text.a}
                        placeholder="123456"
                        width={125}
                    />
                    <Text style={themeStyles.mathText}>÷</Text>
                    <CustomInput
                        onChangeText={(e) => handleTextChange("b", e)}
                        value={text.b}
                        placeholder="789"
                        width={125}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={calculatePress}
                        buttonColor={colors.secondary}
                        textColor="#fff"
                        style={styles.button}>
                        Calculate
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleReset}
                        textColor={colors.secondary}
                        style={[styles.button, { borderColor: colors.secondary }]}
                        labelStyle={{ color: colors.secondary }}>
                        Clear
                    </Button>
                </View>
            </View>

            {error.hasError && (
                <View style={styles.errorContainer}>
                    <Text style={themeStyles.errorText}>{error.message}</Text>
                </View>
            )}

            {divideAns && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20 }}>
                    <View style={styles.divideMath}>
                        <Text style={themeStyles.mathText}>
                            {divideAns.numberB}
                        </Text>
                        <View style={themeStyles.varticleLine} />
                        <View>
                            <Text style={themeStyles.mathText}>
                                {divideAns.numberA}
                            </Text>
                            {divideAns.spacingInfo.map((spacing, i) => {
                                const a = spacing[0];
                                const b = spacing[1];

                                const multipleStr =
                                    " ".repeat(a) +
                                    divideAns.multipleRuselts[i];
                                const subStr =
                                    " ".repeat(b) + divideAns.subResults[i];

                                return (
                                    <React.Fragment key={i}>
                                        <View>
                                            <Text style={themeStyles.mathText}>
                                                {multipleStr}
                                            </Text>
                                            <View style={themeStyles.hrLine} />
                                        </View>
                                        <Text style={themeStyles.mathText}>
                                            {subStr}
                                        </Text>
                                    </React.Fragment>
                                );
                            })}
                        </View>
                        <View style={themeStyles.varticleLine} />
                        <Text style={themeStyles.mathText}>
                            {divideAns.result}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default Divide;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        flexDirection: "column",
        justifyContent: "center",
        width: wp("100%"),
        paddingHorizontal: 25,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: wp("100%") - 50,
    },
    mathText: {
        fontSize: 25,
        fontFamily: "RobotoMono_400Regular",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    button: {
        marginHorizontal: 8,
        minWidth: 120,
    },
    divideMath: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 35,
        fontFamily: "RobotoMono_400Regular",
    },
    varticleLine: {
        width: 2,
        height: 30,
        marginHorizontal: 4,
    },
    hrLine: {
        height: 2,
        marginVertical: 2,
        marginTop: 7,
    },
    errorContainer: {
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 25,
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "RobotoMono_400Regular",
    },
});
