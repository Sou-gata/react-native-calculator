import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import {
    checkLcmHcfNumber,
    gcd,
    factorizeHcf,
    hasDecimalInArr,
    decimalHcf,
    wp,
} from "../../helpers/functions";
import { useTheme, Button, Text, DataTable } from "react-native-paper";
import CustomInputFilds from "../../components/CustomInputFilds";
import Fraction from "../../components/Fraction";
import { colorSchemeType, inputsType } from "../../../types";

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

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View
                className="px-[25px] mt-[29px]"
                style={{ width: wp("100%") }}
            >
                <View style={{ alignItems: "center" }}>
                    <CustomInputFilds
                        inputs={inputs}
                        setInputs={setInputs}
                        maxInput={12}
                    />
                </View>
                <View className="items-center mt-[30px]">
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
                <View className="items-center p-5">
                    <Text
                        className="text-[35px] text-center"
                        style={{ color: colors.secondary }}
                    >
                        Can't calculate
                    </Text>
                </View>
            )}
            {Boolean(opacity.one) && (
                <View className="items-center p-5">
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        HCF of {input} is
                    </Text>
                    <Text
                        className="text-[35px] text-center"
                        style={{ color: colors.secondary }}
                    >
                        {ans}
                    </Text>
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
                                    <Text
                                        className="text-[22px] font-[RobotoMono_400Regular]"
                                        style={{ color: colors.text }}
                                    >
                                        {number} ={" "}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexShrink: 1,
                                    }}>
                                    <Text
                                        className="text-[22px]"
                                        style={{ color: colors.text }}
                                    >
                                        {details.factors[i].join(" × ")}
                                    </Text>
                                </View>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    <View>
                        <View className="flex-row px-5">
                            <View>
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    HCF ={" "}
                                </Text>
                            </View>
                            <View style={{ flexShrink: 1 }}>
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
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
