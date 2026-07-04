import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { multiple, wp } from "../../helpers/functions";
import { decCheck } from "../../helpers/numbersCheck";
import CustomInput from "../../components/CustomInput";
import { colorSchemeType } from "../../../types";

const Multiply = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, onChangeText] = useState({ a: "", b: "" });
    const [ans, setAns] = useState<{
        results: string[];
        ans: number;
        numberA: number;
        numberB: number;
    }>();
    const [opacity, setOpacity] = useState(0);
    const calculatePress = () => {
        let numbers = [parseInt(text.a), parseInt(text.b)];
        let validateA = decCheck(numbers[0]);
        let validateB = decCheck(numbers[1]);
        if (validateA && validateB) {
            onChangeText({ a: "", b: "" });
            let output = multiple(numbers[0], numbers[1]);
            setAns(output);
            setOpacity(1);
        }
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
                        onChangeText={(e) => {
                            onChangeText({ ...text, a: e });
                        }}
                        value={text.a}
                        placeholder="123"
                        width={125}
                    />
                    <Text
                        className="text-[25px] font-[RobotoMono_400Regular]"
                        style={{ color: colors.text }}
                    >
                        ×
                    </Text>
                    <CustomInput
                        onChangeText={(e) => {
                            onChangeText({ ...text, b: e });
                        }}
                        value={text.b}
                        placeholder="456"
                        width={125}
                    />
                </View>
                <View className="items-center mt-[30px]">
                    <Button
                        mode="contained"
                        onPress={calculatePress}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mb-5"
                contentContainerStyle={
                    opacity ? { alignItems: "center" } : { display: "none" }
                }>
                <View className="p-5">
                    <View className="items-end">
                        <Text
                            className="text-[25px] font-[RobotoMono_400Regular]"
                            style={{ color: colors.text }}
                        >
                            {ans?.numberA}
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text
                            className="text-[25px] font-[RobotoMono_400Regular]"
                            style={{ color: colors.text }}
                        >
                            x
                        </Text>
                        <Text
                            className="text-[25px] font-[RobotoMono_400Regular]"
                            style={{ color: colors.text }}
                        >
                            {ans?.numberB}
                        </Text>
                    </View>
                    <View
                        className="h-[2px] my-[2px] mt-[7px]"
                        style={{ backgroundColor: colors.text }}
                    />
                    <View className="items-end">
                        {ans?.results?.map((item, i) => {
                            let space = "";
                            for (
                                let j = 0;
                                j < ans.results.length - i - 1;
                                j++
                            ) {
                                space += " ";
                            }
                            return (
                                <Text
                                    key={i}
                                    className="text-[25px] font-[RobotoMono_400Regular]"
                                    style={{ color: colors.text }}
                                >
                                    {space}
                                    {item}
                                </Text>
                            );
                        })}
                    </View>
                    <View
                        className="h-[2px] my-[2px] mt-[7px]"
                        style={{ backgroundColor: colors.text }}
                    />
                    <View className="items-end">
                        <Text
                            className="text-[25px] font-[RobotoMono_400Regular]"
                            style={{ color: colors.text }}
                        >
                            {ans?.ans}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Multiply;
