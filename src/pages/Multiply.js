import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { multiple, wp } from "../helpers/functions";
import { decCheck } from "../helpers/numbersCheck";
import CustomInput from "../components/CustomInput";

const Multiply = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState({ a: "", b: "" });
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    const calculatePress = () => {
        let validateA = decCheck(text.a);
        let validateB = decCheck(text.b);
        let numbers;
        if (validateA && validateB) {
            numbers = [text.a, text.b];
            onChangeText({ a: "", b: "" });
            let output = multiple(numbers[0], numbers[1]);
            setAns(output);
            setOpacity(1);
        }
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
                        onChangeText={e => {
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
                        onChangeText={e => {
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
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            <ScrollView overScrollMode="never" style={{ marginBottom: 20 }}>
                <View
                    style={
                        opacity ? { alignItems: "center" } : { display: "none" }
                    }>
                    <View style={{ padding: 20 }}>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text
                                style={[
                                    styles.mathText,
                                    { color: colors.text },
                                ]}>
                                {ans.numberA}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                            <Text
                                style={[
                                    styles.mathText,
                                    { color: colors.text },
                                ]}>
                                x
                            </Text>
                            <Text
                                style={[
                                    styles.mathText,
                                    { color: colors.text },
                                ]}>
                                {ans.numberB}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.hrLine,
                                { backgroundColor: colors.text },
                            ]}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            {(() => {
                                let element = [];
                                if (ans.results) {
                                    let key = 1;
                                    for (
                                        let i = 0;
                                        i < ans.results.length;
                                        i++
                                    ) {
                                        let innerText = "";
                                        let space = "";
                                        for (
                                            let j = 0;
                                            j < ans.results.length - i - 1;
                                            j++
                                        ) {
                                            space += " ";
                                        }
                                        innerText += `${space}${ans.results[i]}`;
                                        key++;
                                        element.push(
                                            <Text
                                                key={key}
                                                style={[
                                                    styles.mathText,
                                                    {
                                                        color: colors.text,
                                                    },
                                                ]}>
                                                {innerText}
                                            </Text>
                                        );
                                    }
                                }
                                return element;
                            })()}
                        </View>
                        <View
                            style={[
                                styles.hrLine,
                                { backgroundColor: colors.text },
                            ]}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text
                                style={[
                                    styles.mathText,
                                    { color: colors.text },
                                ]}>
                                {ans.ans}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Multiply;

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
        alignItems: "center",
        marginTop: 30,
    },
    hrLine: {
        height: 2,
        marginVertical: 2,
        marginTop: 7,
    },
});
