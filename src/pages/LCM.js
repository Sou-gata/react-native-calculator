import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
    checkLcmHcfNum,
    lcm,
    inputNumbers,
    factorLcm,
    largeInArr,
    hasDecimalInArr,
    decimalLcm,
    wp,
} from "../helpers/functions";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";

const LCM = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState(0);
    const [opacity, setOpacity] = useState({ one: false, two: false });
    const [input, setInput] = useState("");
    const [details, setDetails] = useState({
        dividends: [],
        divisiors: [],
        factors: [],
    });
    const [gap, setGap] = useState("");
    const [decimal, setDecimal] = useState({
        numinator: "",
        denominator: "",
        nuLcm: "",
    });

    const textStyle = [styles.textStyle, { color: colors.text }];
    const textStyleTwo = [
        styles.textStyleTwo,
        { color: colors.text, borderColor: colors.text },
    ];
    const textStyleThree = [styles.textStyleThree, { color: colors.text }];

    const generateGap = array => {
        let space = "";
        if (largeInArr([...array])) {
            let large = largeInArr([...array]);
            large = large.toString().length;
            for (let i = 0; i < large; i++) {
                space += " ";
            }
            setGap(space);
        }
    };
    const calculate = () => {
        let numbers = checkLcmHcfNum(text);
        if (numbers) {
            setInput(inputNumbers(text));
            if (!hasDecimalInArr(numbers)) {
                let factorLCM = factorLcm(numbers);
                let lcmAns = lcm(numbers);
                setDetails(factorLCM);
                setAns(lcmAns);
                setOpacity({ one: true, two: true });
            } else {
                let LCM = decimalLcm(numbers);
                setAns(LCM.lcm);
                setDecimal({
                    numinator: LCM.numinator,
                    denominator: LCM.denominator,
                    nuLcm: LCM.nuLcm,
                });
                setOpacity({ one: true, three: true });
            }
            onChangeText("");
        } else {
            setOpacity({ four: true });
        }
    };
    useEffect(() => {
        generateGap(details.divisiors);
    }, [details]);

    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <CustomInput
                        onChangeText={onChangeText}
                        value={text}
                        autoFocus={true}
                        placeholder="10 20 30"
                        width={200}
                        onEndEditing={() => {
                            if (inputNumbers(text)) calculate();
                        }}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => calculate()}
                        buttonColor={colors.secondary}
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            <View
                style={[
                    styles.ansDiv,
                    { display: opacity.one ? "flex" : "none" },
                ]}>
                <Text style={textStyle}>LCM of {input} is</Text>
                <Text
                    style={[
                        styles.textStyleOrange,
                        { color: colors.secondary },
                    ]}>
                    {ans}
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 20,
                    alignItems: "center",
                    display: opacity.two ? "flex" : "none",
                    flex: 1,
                }}>
                <ScrollView>
                    <View
                        style={{
                            alignItems: "center",
                        }}>
                        <View>
                            {(() => {
                                let com = [];
                                for (
                                    let i = 0;
                                    i < details.dividends.length;
                                    i++
                                ) {
                                    const item = details.dividends[i];
                                    let ele;
                                    if (i < details.dividends.length - 1) {
                                        ele = (
                                            <View
                                                key={i}
                                                style={{
                                                    flexDirection: "row",
                                                }}>
                                                <Text style={textStyleThree}>
                                                    {details.divisiors[i]}
                                                </Text>
                                                <Text style={textStyleTwo}>
                                                    {item.toString()}
                                                </Text>
                                            </View>
                                        );
                                    } else {
                                        ele = (
                                            <View
                                                key={i}
                                                style={{
                                                    flexDirection: "row",
                                                }}>
                                                <Text style={textStyleThree}>
                                                    {gap}
                                                </Text>
                                                <Text style={textStyleThree}>
                                                    {item.toString()}
                                                </Text>
                                            </View>
                                        );
                                    }
                                    com.push(ele);
                                }
                                return com;
                            })()}
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View>
                            <Text style={textStyle}>LCM = </Text>
                        </View>
                        <View style={{ width: wp("100%") - 130 }}>
                            {(() => {
                                let element = "";
                                for (
                                    let i = 0;
                                    i < details.factors.length;
                                    i++
                                ) {
                                    let single = details.factors[i];
                                    if (i < details.factors.length - 1) {
                                        element += single + " × ";
                                    } else {
                                        element += single;
                                    }
                                }
                                return (
                                    <Text
                                        style={[
                                            textStyle,
                                            { textAlign: "left" },
                                        ]}>
                                        {element}
                                    </Text>
                                );
                            })()}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    alignItems: "center",
                    padding: 20,
                    display: opacity.three ? "flex" : "none",
                }}>
                <View>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            textAlign: "center",
                        }}>
                        HCF of ({decimal.numinator})
                    </Text>
                    <View
                        style={[
                            styles.hrLine,
                            { backgroundColor: colors.text },
                        ]}
                    />
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            textAlign: "center",
                        }}>
                        {decimal.denominator}
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            textAlign: "center",
                        }}>
                        {decimal.nuLcm}
                    </Text>
                    <View
                        style={[
                            styles.hrLine,
                            { backgroundColor: colors.text },
                        ]}
                    />
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            textAlign: "center",
                        }}>
                        {decimal.denominator}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    padding: 25,
                    display: opacity.four ? "flex" : "none",
                }}>
                <Text
                    style={{
                        fontSize: 35,
                        textAlign: "center",
                        color: colors.secondary,
                    }}>
                    Can't calculate
                </Text>
            </View>
        </View>
    );
};

export default LCM;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        flexDirection: "column",
        justifyContent: "center",
        width: wp("100%"),
        paddingHorizontal: 25,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
    textStyleOrange: {
        fontSize: 35,
        textAlign: "center",
    },
    ansDiv: {
        alignItems: "center",
        padding: 20,
    },
    textStyleTwo: {
        fontSize: 25,
        padding: 5,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 5,
        fontFamily: "RobotoMono_400Regular",
    },
    textStyleThree: {
        fontSize: 25,
        padding: 5,
        fontFamily: "RobotoMono_400Regular",
    },
    hrLine: {
        height: 2,
        marginVertical: 5,
    },
});
