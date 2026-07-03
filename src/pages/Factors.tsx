import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { factors, factorize, wp } from "../helpers/functions";
import CustomInput from "../components/CustomInput";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { decIntCheck } from "../helpers/numbersCheck";
import { colorSchemeType } from "../../types";

const Factors = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, setText] = useState("");
    const [ans, setAns] = useState<{
        str: string;
        number: number;
    }>();
    const [opacity, setOpacity] = useState(0);
    const [factor, setFactor] = useState<number[]>([]);
    const [prime, setPrime] = useState({
        prime: false,
        nextPrime: 0,
    });

    const isPrime = (number: number) => {
        if (number >= 2) {
            let isPrime = true;
            for (let i = 2; i < number / 2; i++) {
                if (number % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            return isPrime;
        } else {
            return false;
        }
    };

    const onChangeText = (e: string) => {
        if (e != "") {
            let isCorrect = decIntCheck(parseInt(e));
            if (isCorrect) {
                setText(e);
                let number = parseInt(e);
                let prime = true;
                if (number < 2) prime = false;
                else prime = isPrime(number);
                let nextPrime: number;
                let i = number + 1;
                while (!isPrime(i)) i++;
                nextPrime = i;
                setPrime({ prime, nextPrime });

                let output = factors(parseInt(e));
                setAns(output);
                let fact = factorize(parseInt(e));
                setFactor(fact);
                setOpacity(1);
            } else {
                setText((prev) => prev);
            }
        } else {
            setText(e);
            setOpacity(0);
        }
    };

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View
                className="flex-col justify-center px-[25px] items-center mt-[29px]"
                style={{ width: wp("100%") }}
            >
                <CustomInput
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="123"
                    width={200}
                    maxLength={8}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="my-5"
            >
                <View
                    className="items-center px-5"
                    style={{ display: opacity ? "flex" : "none" }}
                >
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        Factors of {ans?.number} are :
                    </Text>
                    <Text
                        className="text-[35px] text-center"
                        style={{ color: colors.secondary }}
                    >
                        {ans?.str}
                    </Text>
                </View>
                <View
                    className="flex-row p-5"
                    style={{ display: opacity ? "flex" : "none" }}
                >
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {ans?.number} ={" "}
                    </Text>
                    <Text
                        className="text-[25px] text-center flex-shrink"
                        style={{ color: colors.text }}
                    >
                        {factor.join(" × ")}
                    </Text>
                </View>
                <View style={{ display: opacity ? "flex" : "none" }}>
                    <View className="flex-row gap-5 items-center p-5">
                        {prime.prime ? (
                            <MaterialIcons
                                name="check-circle"
                                size={30}
                                color={colors.secondary}
                            />
                        ) : (
                            <Entypo
                                name="circle-with-cross"
                                size={30}
                                color={colors.secondary}
                            />
                        )}
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            {prime.prime
                                ? "Prime number"
                                : "Not a prime number"}
                        </Text>
                    </View>
                    <Text
                        className="text-[25px] ml-5"
                        style={{ color: colors.text }}
                    >
                        Next Prime : {prime.nextPrime}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Factors;
