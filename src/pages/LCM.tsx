import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
    checkLcmHcfNumber,
    lcm,
    factorLcm,
    largeInArr,
    hasDecimalInArr,
    decimalLcm,
    wp,
} from "../helpers/functions";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInputFilds from "../components/CustomInputFilds";
import { colorSchemeType, inputsType } from "../../types";

const LCM = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [ans, setAns] = useState(0);
    const [opacity, setOpacity] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
    });
    const [input, setInput] = useState<string>("");
    const [inputs, setInputs] = useState<inputsType[]>([
        { id: 1, value: "" },
        { id: 2, value: "" },
    ]);
    const [details, setDetails] = useState<{
        divisiors: number[];
        dividends: number[][];
        factors: (string | number)[];
    }>({
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

    const generateGap = (array: number[]) => {
        let space = "";
        if (largeInArr(array)) {
            let large = largeInArr(array);
            large = large.toString().length;
            for (let i = 0; i < large; i++) {
                space += " ";
            }
            setGap(space);
        }
    };
    const calculate = () => {
        let numbers = checkLcmHcfNumber(inputs);
        if (numbers) {
            let inputNums: number[] = [];
            for (let i = 0; i < inputs.length; i++) {
                inputNums[i] = parseFloat(inputs[i].value);
            }
            setInput(inputNums.join(", "));
            if (!hasDecimalInArr(numbers)) {
                let factorLCM = factorLcm(numbers);
                let lcmAns = lcm(numbers);
                setDetails(factorLCM);
                setAns(lcmAns);
                setOpacity({ one: true, two: true, three: false, four: false });
            } else {
                let LCM = decimalLcm(numbers);
                setAns(LCM.lcm);
                setDecimal({
                    numinator: LCM.numinator,
                    denominator: LCM.denominator.toString(),
                    nuLcm: LCM.nuLcm.toString(),
                });
                setOpacity({ one: true, three: true, two: false, four: false });
            }
        } else {
            setOpacity({ four: true, one: false, two: false, three: false });
        }
    };
    useEffect(() => {
        generateGap(details.divisiors);
    }, [details]);

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
        textStyle: { fontSize: 25, textAlign: "center", color: colors.text },
        ansTextStyle: { fontSize: 25, textAlign: "left", color: colors.text },
        textStyleOrange: {
            fontSize: 35,
            textAlign: "center",
            color: colors.secondary,
        },
        ansDiv: {
            alignItems: "center",
            padding: 20,
            display: opacity.one ? "flex" : "none",
        },
        textStyleTwo: {
            fontSize: 25,
            padding: 5,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderBottomLeftRadius: 5,
            fontFamily: "RobotoMono_400Regular",
            color: colors.text,
            borderColor: colors.text,
        },
        textStyleThree: {
            fontSize: 25,
            padding: 5,
            fontFamily: "RobotoMono_400Regular",
            color: colors.text,
        },
        hrLine: {
            height: 2,
            marginVertical: 5,
            backgroundColor: colors.text,
        },
        viewTwo: {
            paddingHorizontal: 20,
            alignItems: "center",
            display: opacity.two ? "flex" : "none",
            flex: 1,
        },
        viewThree: {
            alignItems: "center",
            padding: 20,
            display: opacity.three ? "flex" : "none",
        },
        viewFour: {
            padding: 25,
            display: opacity.four ? "flex" : "none",
        },
        error: {
            fontSize: 35,
            textAlign: "center",
            color: colors.secondary,
        },
    });

    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <CustomInputFilds
                        inputs={inputs}
                        setInputs={setInputs}
                        maxInput={12}
                        maxLength={4}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => calculate()}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <View style={styles.ansDiv}>
                <Text style={styles.textStyle}>LCM of {input} is</Text>
                <Text style={styles.textStyleOrange}>{ans}</Text>
            </View>
            <View style={styles.viewTwo}>
                <ScrollView>
                    <View
                        style={{
                            alignItems: "center",
                        }}>
                        <View>
                            {details.dividends.map((item, i) => (
                                <View
                                    key={i}
                                    style={{
                                        flexDirection: "row",
                                    }}>
                                    <Text style={styles.textStyleThree}>
                                        {i < details.dividends.length - 1
                                            ? details.divisiors[i]
                                            : gap}
                                    </Text>
                                    <Text
                                        style={
                                            i < details.dividends.length - 1
                                                ? styles.textStyleTwo
                                                : styles.textStyleThree
                                        }>
                                        {item.toString()}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View>
                            <Text style={styles.textStyle}>LCM = </Text>
                        </View>
                        <View style={{ width: wp("100%") - 130 }}>
                            <Text style={styles.ansTextStyle}>
                                {details.factors.join(" × ")}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <View>
                            <Text
                                style={[
                                    styles.textStyle,
                                    { color: "transparent" },
                                ]}>
                                LCM
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{` = ${ans}`}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.viewThree}>
                <View>
                    <Text style={styles.textStyle}>
                        HCF of ({decimal.numinator})
                    </Text>
                    <View style={styles.hrLine} />
                    <Text style={styles.textStyle}>{decimal.denominator}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.textStyle}>{decimal.nuLcm}</Text>
                    <View style={styles.hrLine} />
                    <Text style={styles.textStyle}>{decimal.denominator}</Text>
                </View>
            </View>
            <View style={styles.viewFour}>
                <Text style={styles.error}>Can't calculate</Text>
            </View>
        </View>
    );
};

export default LCM;
