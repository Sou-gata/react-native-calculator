import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import {
    checkLcmHcfNumber,
    gcd,
    factorizeHcf,
    hasDecimalInArr,
    decimalHcf,
    wp,
} from "../helpers/functions";
import { useTheme, Button, Text, DataTable } from "react-native-paper";
import CustomInputFilds from "../components/CustomInputFilds";
import Fraction from "../components/Fraction";
import { colorSchemeType, inputsType } from "../../types";

const HCF = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [inputs, setInputs] = useState<inputsType[]>([
        { id: 1, value: "" },
        { id: 2, value: "" },
    ]);
    const [ans, setAns] = useState(0);
    const [opacity, setOpacity] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
    });
    const [input, setInput] = useState<string>("");
    const [details, setDetails] = useState<{
        factors: number[][];
        hcf: number[];
        numbers: string[];
    }>({
        factors: [],
        hcf: [],
        numbers: [],
    });
    const [fraction, setFraction] = useState<{
        numinator: string;
        denominator: string;
        nuHcf: string;
    }>({
        numinator: "",
        denominator: "",
        nuHcf: "",
    });

    const calculate = () => {
        let numbers = checkLcmHcfNumber(inputs);
        if (numbers) {
            setInput(numbers.join(", "));
            if (!hasDecimalInArr(numbers)) {
                let hcfAns = gcd(numbers);
                setAns(hcfAns);
                let fact = factorizeHcf(numbers);
                setDetails(fact);
                setOpacity({
                    one: 1,
                    two: 0,
                    three: 1,
                    four: 0,
                });
            } else {
                let hcf = decimalHcf(numbers);
                setAns(hcf.hcf);
                setFraction({
                    numinator: hcf.numinator,
                    denominator: hcf.denominator.toString(),
                    nuHcf: hcf.nuHcf.toString(),
                });
                setOpacity({
                    one: 1,
                    two: 0,
                    three: 0,
                    four: 1,
                });
            }
        } else {
            setOpacity({
                one: 0,
                two: 1,
                three: 0,
                four: 0,
            });
        }
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 29,
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
            color: colors.text,
        },
        textStyleOrange: {
            fontSize: 35,
            textAlign: "center",
            color: colors.secondary,
        },
        ansDiv: {
            alignItems: "center",
            padding: 20,
        },
        hrLine: {
            height: 2,
            marginVertical: 5,
        },
        hcfNumber: {
            color: colors.text,
            fontSize: 22,
            fontFamily: "RobotoMono_400Regular",
        },
        factorLine: {
            color: colors.text,
            fontSize: 22,
        },
        ansLineContainer: {
            flexDirection: "row",
            paddingHorizontal: 20,
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
            {opacity.two === 1 && (
                <View style={styles.ansDiv}>
                    <Text style={styles.textStyleOrange}>Can't calculate</Text>
                </View>
            )}
            {Boolean(opacity.one) && (
                <View style={styles.ansDiv}>
                    <Text style={styles.textStyle}>HCF of {input} is</Text>
                    <Text style={styles.textStyleOrange}>{ans}</Text>
                </View>
            )}
            {Boolean(opacity.three) && (
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                    }}>
                    <DataTable>
                        {details.numbers.map((number, i) => (
                            <DataTable.Row
                                key={i}
                                style={{
                                    borderBottomWidth: 0,
                                }}>
                                <View style={{ flexShrink: 1 }}>
                                    <Text style={styles.hcfNumber}>
                                        {number} ={" "}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexShrink: 1,
                                    }}>
                                    <Text style={styles.factorLine}>
                                        {details.factors[i].join(" × ")}
                                    </Text>
                                </View>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    <View>
                        <View style={styles.ansLineContainer}>
                            <View>
                                <Text style={styles.textStyle}>HCF = </Text>
                            </View>
                            <View style={{ flexShrink: 1 }}>
                                <Text style={styles.textStyle}>
                                    {details.hcf.join(" × ")}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
            {Boolean(opacity.four) && (
                <View style={{ paddingHorizontal: 20 }}>
                    <Fraction
                        color={colors.text}
                        size={22}
                        bullet={false}
                        data={{
                            numerator: `HCF of (${fraction.numinator})`,
                            denominator: fraction.denominator,
                            text: "HCF",
                        }}
                    />
                    <Fraction
                        color={colors.text}
                        size={22}
                        bullet={false}
                        textVisible={false}
                        data={{
                            numerator: fraction.nuHcf,
                            denominator: fraction.denominator,
                            text: "HCF",
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default HCF;
