import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
    checkLcmHcfNum,
    gcd,
    inputNumbers,
    factorizeHcf,
    hasDecimalInArr,
    decimalHcf,
} from "../helpers/functions";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";

const HCF = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
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
    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <CustomInput
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="10 20 30"
                        width={200}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            let numbers = checkLcmHcfNum(text);
                            if (numbers) {
                                setInput(inputNumbers(text));
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
                                onChangeText("");
                            } else {
                                setOpacity({
                                    one: 0,
                                    two: 1,
                                    three: 0,
                                    four: 0,
                                });
                            }
                        }}
                        buttonColor={colors.secondary}
                        textColor={"white"}
                    >
                        Calculate
                    </Button>
                </View>
            </View>
            <View
                style={[
                    styles.ansDiv,
                    { display: opacity.two == 1 ? "flex" : "none" },
                ]}
            >
                <Text
                    style={[
                        styles.textStyleOrange,
                        { color: colors.secondary },
                    ]}
                >
                    Can't calculate
                </Text>
            </View>
            <View
                style={[
                    styles.ansDiv,
                    { display: opacity.one ? "flex" : "none" },
                ]}
            >
                <Text style={[styles.textStyle, { color: colors.text }]}>
                    HCF of {input} is
                </Text>
                <Text
                    style={[
                        styles.textStyleOrange,
                        { color: colors.secondary },
                    ]}
                >
                    {ans}
                </Text>
            </View>
            <ScrollView
                style={{
                    display: opacity.three == 1 ? "flex" : "none",
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "space-between" }}>
                            {(() => {
                                let com = [];
                                for (
                                    let i = 0;
                                    i < details.numbers.length;
                                    i++
                                ) {
                                    const element = details.numbers[i];
                                    com.push(
                                        <Text
                                            key={i}
                                            style={{
                                                color: colors.text,
                                                fontSize: 25,
                                            }}
                                        >
                                            {element} ={" "}
                                        </Text>
                                    );
                                }
                                return com;
                            })()}
                        </View>
                        <View style={{ justifyContent: "space-between" }}>
                            {(() => {
                                let com = [];
                                for (
                                    let i = 0;
                                    i < details.factors?.length;
                                    i++
                                ) {
                                    let single = details.factors[i];
                                    let element = "";
                                    for (let j = 0; j < single.length; j++) {
                                        if (j < single.length - 1) {
                                            element += single[j] + " × ";
                                        } else {
                                            element += single[j];
                                        }
                                    }
                                    com.push(
                                        <Text
                                            style={{
                                                color: colors.text,
                                                fontSize: 25,
                                            }}
                                            key={i}
                                        >
                                            {element}
                                        </Text>
                                    );
                                }
                                return com;
                            })()}
                        </View>
                    </View>
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
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: 25,
                                    marginTop: 20,
                                }}
                            >
                                HCF = {com} = {ans}
                            </Text>
                        );
                    })()}
                </View>
            </ScrollView>
            <View
                style={{
                    padding: 20,
                    display: opacity.four === 0 ? "none" : "flex",
                    alignItems: "center",
                }}
            >
                <View>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            textAlign: "center",
                        }}
                    >
                        HCF of ({fraction.numinator})
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
                        }}
                    >
                        {fraction.denominator}
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            textAlign: "center",
                        }}
                    >
                        {fraction.nuHcf}
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
                        }}
                    >
                        {fraction.denominator}
                    </Text>
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
