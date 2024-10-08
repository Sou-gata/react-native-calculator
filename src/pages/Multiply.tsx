import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { multiple, wp } from "../helpers/functions";
import { decCheck } from "../helpers/numbersCheck";
import CustomInput from "../components/CustomInput";
import { colorSchemeType } from "../../types";

const Multiply = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, onChangeText] = useState({ a: "", b: "" });
    const [ans, setAns] = useState<{
        results: string[];
        ans: number;
        numberA: number;
        numberB: number;
    }>();
    const [opacity, setOpacity] = useState(0);
    const calculatePress = () => {
        let numbers = [parseInt(text.a), parseInt(text.b)];
        let validateA = decCheck(numbers[0]);
        let validateB = decCheck(numbers[1]);
        if (validateA && validateB) {
            onChangeText({ a: "", b: "" });
            let output = multiple(numbers[0], numbers[1]);
            setAns(output);
            setOpacity(1);
        }
    };

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
            color: colors.text,
        },
        buttonContainer: {
            alignItems: "center",
            marginTop: 30,
        },
        hrLine: {
            height: 2,
            marginVertical: 2,
            marginTop: 7,
            backgroundColor: colors.text,
        },
    });

    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor,
                flex: 1,
            }}>
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <CustomInput
                        onChangeText={(e) => {
                            onChangeText({ ...text, a: e });
                        }}
                        value={text.a}
                        placeholder="123"
                        width={125}
                    />
                    <Text style={[styles.mathText, { color: colors.text }]}>
                        ×
                    </Text>
                    <CustomInput
                        onChangeText={(e) => {
                            onChangeText({ ...text, b: e });
                        }}
                        value={text.b}
                        placeholder="456"
                        width={125}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={calculatePress}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 20 }}
                contentContainerStyle={
                    opacity ? { alignItems: "center" } : { display: "none" }
                }>
                <View style={{ padding: 20 }}>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.mathText}>{ans?.numberA}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                        <Text style={styles.mathText}>x</Text>
                        <Text style={styles.mathText}>{ans?.numberB}</Text>
                    </View>
                    <View style={styles.hrLine} />
                    <View style={{ alignItems: "flex-end" }}>
                        {ans?.results?.map((item, i) => {
                            let space = "";
                            for (
                                let j = 0;
                                j < ans.results.length - i - 1;
                                j++
                            ) {
                                space += " ";
                            }
                            return (
                                <Text key={i} style={styles.mathText}>
                                    {space}
                                    {item}
                                </Text>
                            );
                        })}
                    </View>
                    <View style={styles.hrLine} />
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.mathText}>{ans?.ans}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Multiply;
