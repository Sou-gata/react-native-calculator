import { View, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text, Button, RadioButton } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { permutationCombination } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const PermutationCombination = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [inputs, setInputs] = useState({ n: "", r: "" });
    const [operation, setOperation] = useState<{
        order: number;
        repeat: number;
    }>({ order: 1, repeat: 1 });
    const [ans, setAns] = useState({
        nuFormula: "",
        deFormula: "",
        ans: "",
        valueNu: "",
        valueDe: "",
    });
    const changeValues = (e: string, str: string) => {
        let temp = { ...inputs, [str]: e };
        setInputs(temp);
    };

    const setOrder = (val: number) =>
        setOperation({ ...operation, order: val });
    const setRepeat = (val: number) =>
        setOperation({ ...operation, repeat: val });

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="mt-2.5">
                <View className="flex-row items-center justify-center w-full mb-[15px]">
                    <Text
                        className="text-[25px] text-center mr-5"
                        style={{ color: colors.text }}
                    >
                        n =
                    </Text>
                    <CustomInput
                        placeholder="n"
                        onChangeText={(e) => changeValues(e, "n")}
                        value={inputs.n}
                    />
                </View>
                <View className="flex-row items-center justify-center w-full mb-[15px]">
                    <Text
                        className="text-[25px] text-center mr-5"
                        style={{ color: colors.text }}
                    >
                        r =
                    </Text>
                    <CustomInput
                        placeholder="r"
                        onChangeText={(e) => changeValues(e, "r")}
                        value={inputs.r}
                    />
                </View>
                <View className="items-center">
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        Does the order matter?
                    </Text>
                    <View className="flex-row w-full items-center justify-center">
                        <Pressable
                            className="flex-row items-center"
                            onPress={() => setOrder(1)}>
                            <RadioButton
                                value="1"
                                status={
                                    operation.order === 1
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setOrder(1)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                Yes
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-row items-center"
                            onPress={() => setOrder(2)}>
                            <RadioButton
                                value="2"
                                status={
                                    operation.order === 2
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setOrder(2)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                No
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View className="items-center">
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        Can the items repeat?
                    </Text>
                    <View className="flex-row w-full items-center justify-center">
                        <Pressable
                            className="flex-row items-center"
                            onPress={() => setRepeat(1)}>
                            <RadioButton
                                value="1"
                                status={
                                    operation.repeat === 1
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setRepeat(1)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                Yes
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-row items-center"
                            onPress={() => setRepeat(2)}>
                            <RadioButton
                                value="2"
                                status={
                                    operation.repeat === 2
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setRepeat(2)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                No
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View className="items-center mt-5">
                    <Button
                        mode="contained"
                        onPress={() => {
                            let ans = permutationCombination(
                                {
                                    n: parseInt(inputs.n),
                                    r: parseInt(inputs.r),
                                },
                                operation
                            );
                            if (ans.ans == "NaN" || ans.ans == "Infinity")
                                ans.ans = "Can't Calculate";
                            setAns(ans);
                        }}
                        buttonColor={colors.secondary}
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            {ans.ans && (
                <View>
                    <View className="flex-row justify-center items-center mt-[15px]">
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            Formula ={" "}
                        </Text>
                        <View>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                {ans.nuFormula}
                            </Text>
                            {ans.deFormula && (
                                <View
                                    className="h-[2px] mt-[5px]"
                                    style={{ backgroundColor: colors.text }}
                                />
                            )}
                            {ans.deFormula && (
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    {ans.deFormula}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center mt-[15px]">
                        <Text
                            className="text-[25px] text-center opacity-0"
                            style={{ color: colors.text }}
                        >
                            Formula ={" "}
                        </Text>
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            {" "}={" "}
                        </Text>
                        <View>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                {ans.valueNu}
                            </Text>
                            {ans.deFormula && (
                                <View
                                    className="h-[2px] mt-[5px]"
                                    style={{ backgroundColor: colors.text }}
                                />
                            )}
                            {ans.deFormula && (
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    {ans.valueDe}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center mt-[25px]">
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            Answer ={" "}
                        </Text>
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            {ans.ans}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default PermutationCombination;
