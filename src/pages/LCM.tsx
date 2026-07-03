import { View, ScrollView } from "react-native";
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

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View
                className="flex-col justify-center px-[25px] mt-[29px]"
                style={{ width: wp("100%") }}
            >
                <View className="items-center">
                    <CustomInputFilds
                        inputs={inputs}
                        setInputs={setInputs}
                        maxInput={12}
                        maxLength={4}
                    />
                </View>
                <View className="items-center mt-[30px]">
                    <Button
                        mode="contained"
                        onPress={() => calculate()}
                        buttonColor={colors.secondary}
                        textColor="#fff"
                    >
                        Calculate
                    </Button>
                </View>
            </View>
            <View
                className="items-center p-5"
                style={{ display: opacity.one ? "flex" : "none" }}
            >
                <Text
                    className="text-[25px] text-center"
                    style={{ color: colors.text }}
                >
                    LCM of {input} is
                </Text>
                <Text
                    className="text-[35px] text-center"
                    style={{ color: colors.secondary }}
                >
                    {ans}
                </Text>
            </View>
            <View
                className="px-5 items-center flex-1"
                style={{ display: opacity.two ? "flex" : "none" }}
            >
                <ScrollView>
                    <View className="items-center">
                        <View>
                            {details.dividends.map((item, i) => (
                                <View
                                    key={i}
                                    className="flex-row"
                                >
                                    <Text
                                        className="text-[25px] p-[5px] font-[RobotoMono_400Regular]"
                                        style={{ color: colors.text }}
                                    >
                                        {i < details.dividends.length - 1
                                            ? details.divisiors[i]
                                            : gap}
                                    </Text>
                                    <Text
                                        className={
                                            i < details.dividends.length - 1
                                                ? "text-[25px] p-[5px] border-l-2 border-b-2 rounded-bl-[5px] font-[RobotoMono_400Regular]"
                                                : "text-[25px] p-[5px] font-[RobotoMono_400Regular]"
                                        }
                                        style={{
                                            color: colors.text,
                                            borderColor: colors.text,
                                        }}
                                    >
                                        {item.toString()}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View className="flex-row mt-5">
                        <View>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                LCM ={" "}
                            </Text>
                        </View>
                        <View style={{ width: wp("100%") - 130 }}>
                            <Text
                                className="text-[25px] text-left"
                                style={{ color: colors.text }}
                            >
                                {details.factors.join(" × ")}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row mt-[5px]">
                        <View>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: "#00000000" }}
                            >
                                LCM
                            </Text>
                        </View>
                        <View>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >{` = ${ans}`}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                className="items-center p-5"
                style={{ display: opacity.three ? "flex" : "none" }}
            >
                <View>
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        HCF of ({decimal.numinator})
                    </Text>
                    <View
                        className="h-[2px] my-[5px]"
                        style={{ backgroundColor: colors.text }}
                    />
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {decimal.denominator}
                    </Text>
                </View>
                <View className="mt-5">
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {decimal.nuLcm}
                    </Text>
                    <View
                        className="h-[2px] my-[5px]"
                        style={{ backgroundColor: colors.text }}
                    />
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {decimal.denominator}
                    </Text>
                </View>
            </View>
            <View
                className="p-[25px]"
                style={{ display: opacity.four ? "flex" : "none" }}
            >
                <Text
                    className="text-[35px] text-center"
                    style={{ color: colors.secondary }}
                >
                    Can't calculate
                </Text>
            </View>
        </View>
    );
};

export default LCM;
