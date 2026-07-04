import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { devide, wp } from "../../helpers/functions";
import CustomInput from "../../components/CustomInput";
import { colorSchemeType, divideReturnType } from "../../../types";

const Divide = () => {
    const { colors } = useTheme<colorSchemeType>();

    const [text, onChangeText] = useState({ a: "", b: "" });
    const [divideAns, setDivideAns] = useState<divideReturnType>();
    const [error, setError] = useState<{ hasError: boolean; message: string }>({
        hasError: false,
        message: "",
    });

    const handleTextChange = (key: "a" | "b", val: string) => {
        onChangeText((prev) => ({ ...prev, [key]: val }));
        if (divideAns) setDivideAns(undefined);
        if (error.hasError) setError({ hasError: false, message: "" });
    };

    const calculatePress = () => {
        setError({ hasError: false, message: "" });

        if (!text.a || !text.b) {
            setError({ hasError: true, message: "Please fill in both fields" });
            setDivideAns(undefined);
            return;
        }

        const isPositiveIntA = /^\d+$/.test(text.a);
        const isPositiveIntB = /^\d+$/.test(text.b);

        if (!isPositiveIntA || !isPositiveIntB) {
            setError({
                hasError: true,
                message: "Please enter positive integers only",
            });
            setDivideAns(undefined);
            return;
        }

        const intA = parseInt(text.a, 10);
        const intB = parseInt(text.b, 10);

        if (intB === 0) {
            setError({ hasError: true, message: "Cannot divide by zero" });
            setDivideAns(undefined);
            return;
        }

        if (intA <= 0 || intB <= 0) {
            setError({
                hasError: true,
                message: "Please enter positive integers only",
            });
            setDivideAns(undefined);
            return;
        }

        if (intB > intA) {
            setError({
                hasError: true,
                message: "Dividend must be greater than or equal to divisor",
            });
            setDivideAns(undefined);
            return;
        }

        const abc = devide(intA, intB);
        if (abc) {
            setDivideAns(abc);
        } else {
            setError({
                hasError: true,
                message: "Failed to calculate long division steps",
            });
            setDivideAns(undefined);
        }
    };

    const handleReset = () => {
        onChangeText({ a: "", b: "" });
        setDivideAns(undefined);
        setError({ hasError: false, message: "" });
    };

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View
                className="flex-col justify-center px-[25px] mt-[29px]"
                style={{ width: wp("100%") }}
            >
                <View
                    className="flex-row items-center justify-around"
                    style={{ width: wp("100%") - 50 }}
                >
                    <CustomInput
                        onChangeText={(e) => handleTextChange("a", e)}
                        value={text.a}
                        placeholder="123456"
                        width={125}
                    />
                    <Text
                        className="text-[25px] font-[RobotoMono_400Regular]"
                        style={{ color: colors.text }}
                    >
                        ÷
                    </Text>
                    <CustomInput
                        onChangeText={(e) => handleTextChange("b", e)}
                        value={text.b}
                        placeholder="789"
                        width={125}
                    />
                </View>
                <View className="flex-row justify-center items-center mt-[30px]">
                    <Button
                        mode="contained"
                        onPress={calculatePress}
                        buttonColor={colors.secondary}
                        textColor="#fff"
                        className="mx-2 min-w-[120px]"
                    >
                        Calculate
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleReset}
                        textColor={colors.secondary}
                        className="mx-2 min-w-[120px]"
                        style={{ borderColor: colors.secondary }}
                        labelStyle={{ color: colors.secondary }}
                    >
                        Clear
                    </Button>
                </View>
            </View>

            {error.hasError && (
                <View className="items-center mt-5 px-[25px]">
                    <Text
                        className="text-[16px] text-center font-[RobotoMono_400Regular]"
                        style={{ color: colors.error || "#ff3333" }}
                    >
                        {error.message}
                    </Text>
                </View>
            )}

            {divideAns && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="mb-5"
                >
                    <View className="flex-row justify-center mt-[35px]">
                        <Text
                            className="text-[25px] font-[RobotoMono_400Regular]"
                            style={{ color: colors.text }}
                        >
                            {divideAns.numberB}
                        </Text>
                        <View
                            className="w-[2px] h-[30px] mx-1"
                            style={{ backgroundColor: colors.text }}
                        />
                        <View>
                            <Text
                                className="text-[25px] font-[RobotoMono_400Regular]"
                                style={{ color: colors.text }}
                            >
                                {divideAns.numberA}
                            </Text>
                            {divideAns.spacingInfo.map((spacing, i) => {
                                const a = spacing[0];
                                const b = spacing[1];

                                const multipleStr =
                                    " ".repeat(a) +
                                    divideAns.multipleRuselts[i];
                                const subStr =
                                    " ".repeat(b) + divideAns.subResults[i];

                                return (
                                    <React.Fragment key={i}>
                                        <View>
                                            <Text
                                                className="text-[25px] font-[RobotoMono_400Regular]"
                                                style={{ color: colors.text }}
                                            >
                                                {multipleStr}
                                            </Text>
                                            <View
                                                className="h-[2px] my-[2px] mt-[7px]"
                                                style={{ backgroundColor: colors.text }}
                                            />
                                        </View>
                                        <Text
                                            className="text-[25px] font-[RobotoMono_400Regular]"
                                            style={{ color: colors.text }}
                                        >
                                            {subStr}
                                        </Text>
                                    </React.Fragment>
                                );
                            })}
                        </View>
                        <View
                            className="w-[2px] h-[30px] mx-1"
                            style={{ backgroundColor: colors.text }}
                        />
                        <Text
                            className="text-[25px] font-[RobotoMono_400Regular]"
                            style={{ color: colors.text }}
                        >
                            {divideAns.result}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default Divide;
