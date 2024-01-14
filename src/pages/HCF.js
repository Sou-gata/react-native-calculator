import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import {
    checkLcmHcfNumber,
    gcd,
    inputToText,
    factorizeHcf,
    hasDecimalInArr,
    decimalHcf,
    wp,
} from "../helpers/functions";
import { useTheme, Button, Text, DataTable } from "react-native-paper";
import CustomInputFilds from "../components/CustomInputFilds";

const HCF = () => {
    const { colors } = useTheme();
    const [inputs, setInputs] = useState([
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
    const [input, setInput] = useState("");
    const [details, setDetails] = useState({
        factors: [],
        hcf: [],
        numbers: [],
    });
    const [fraction, setFraction] = useState({
        numinator: undefined,
        denominator: undefined,
        nuHcf: undefined,
    });

    const arrayToString = (array) => {
        let element = "";
        for (let j = 0; j < array.length; j++) {
            if (j < array.length - 1) {
                element += array[j] + " × ";
            } else {
                element += array[j];
            }
        }
        return element;
    };
    const calculate = () => {
        let numbers = checkLcmHcfNumber(inputs);
        if (numbers) {
            setInput(inputToText(inputs));
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
                    denominator: hcf.denominator,
                    nuHcf: hcf.nuHcf,
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
    const textStyle = {
        color: colors.text,
        fontSize: 22,
        marginTop: 20,
    };
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
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            <View
                style={[
                    styles.ansDiv,
                    { display: opacity.two == 1 ? "flex" : "none" },
                ]}>
                <Text
                    style={[
                        styles.textStyleOrange,
                        { color: colors.secondary },
                    ]}>
                    Can't calculate
                </Text>
            </View>
            <View
                style={[
                    styles.ansDiv,
                    { display: opacity.one ? "flex" : "none" },
                ]}>
                <Text style={[styles.textStyle, { color: colors.text }]}>
                    HCF of {input} is
                </Text>
                <Text
                    style={[
                        styles.textStyleOrange,
                        { color: colors.secondary },
                    ]}>
                    {ans}
                </Text>
            </View>
            <ScrollView
                style={{
                    display: opacity.three == 1 ? "flex" : "none",
                }}>
                <View
                    style={{
                        paddingHorizontal: 10,
                    }}>
                    <DataTable>
                        {(() => {
                            let com = [];
                            for (let i = 0; i < details.numbers.length; i++) {
                                const num = details.numbers[i];
                                const fact = arrayToString(details.factors[i]);
                                com.push(
                                    <DataTable.Row
                                        key={i}
                                        style={{
                                            borderBottomWidth: 0,
                                            marginVertical: 2.5,
                                        }}>
                                        <View style={{ flexShrink: 1 }}>
                                            <Text
                                                style={{
                                                    color: colors.text,
                                                    fontSize: 22,
                                                    fontFamily:
                                                        "RobotoMono_400Regular",
                                                }}>
                                                {num} ={" "}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexShrink: 1,
                                            }}>
                                            <Text
                                                style={{
                                                    color: colors.text,
                                                    fontSize: 22,
                                                }}>
                                                {fact}
                                            </Text>
                                        </View>
                                    </DataTable.Row>
                                );
                            }
                            return com;
                        })()}
                    </DataTable>
                    <View>
                        {(() => {
                            let com = "";
                            for (let i = 0; i < details.hcf.length; i++) {
                                if (i < details.hcf.length - 1) {
                                    com += details.hcf[i] + " × ";
                                } else {
                                    com += details.hcf[i];
                                }
                            }
                            return (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        paddingHorizontal: 20,
                                    }}>
                                    <View>
                                        <Text style={textStyle}>HCF = </Text>
                                    </View>
                                    <View style={{ flexShrink: 1 }}>
                                        <Text style={textStyle}>{com}</Text>
                                    </View>
                                </View>
                            );
                        })()}
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    padding: 20,
                    display: opacity.four === 0 ? "none" : "flex",
                    alignItems: "center",
                }}>
                <View>
                    <Text style={textStyle}>HCF of ({fraction.numinator})</Text>
                    <View
                        style={[
                            styles.hrLine,
                            { backgroundColor: colors.text },
                        ]}
                    />
                    <Text style={textStyle}>{fraction.denominator}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={textStyle}>{fraction.nuHcf}</Text>
                    <View
                        style={[
                            styles.hrLine,
                            { backgroundColor: colors.text },
                        ]}
                    />
                    <Text style={textStyle}>{fraction.denominator}</Text>
                </View>
            </View>
        </View>
    );
};

export default HCF;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        justifyContent: "center",
        alignContent: "center",
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
    hrLine: {
        height: 2,
        marginVertical: 5,
    },
});
