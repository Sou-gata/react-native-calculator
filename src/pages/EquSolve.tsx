import { View } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useTheme, Button, Text } from "react-native-paper";
import { equSolve } from "../helpers/functions";
import { colorSchemeType, equnAnsType } from "../../types";

const EquSolve = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [val, setVal] = useState({
        a1: "",
        a2: "",
        b1: "",
        b2: "",
        c1: "",
        c2: "",
    });
    const [finalAns, setFinalAns] = useState<equnAnsType>({
        numeratorX: 0,
        denominatorX: 0,
        numeratorY: 0,
        denominatorY: 0,
        x: 0,
        y: 0,
        noSolution: false,
        manySolution: false,
        normalSolution: false,
    });
    const changeValues = (e: string, place: string) =>
        setVal({ ...val, [place]: e });

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="flex-row items-center justify-center w-full mt-[15px]">
                <CustomInput
                    placeholder="a1"
                    onChangeText={(e) => changeValues(e, "a1")}
                    value={val.a1}
                    width={60}
                />
                <Text
                    className="mx-[10px]"
                    style={{
                        fontSize: 18,
                        color: colors.text,
                    }}>
                    x +
                </Text>
                <CustomInput
                    placeholder="b1"
                    onChangeText={(e) => changeValues(e, "b1")}
                    value={val.b1}
                    width={60}
                />
                <Text
                    className="mx-[10px]"
                    style={{
                        fontSize: 18,
                        color: colors.text,
                    }}>
                    y +
                </Text>
                <CustomInput
                    placeholder="c1"
                    onChangeText={(e) => changeValues(e, "c1")}
                    value={val.c1}
                    width={60}
                />
            </View>
            <View className="flex-row items-center justify-center w-full mt-[15px]">
                <CustomInput
                    placeholder="a2"
                    onChangeText={(e) => changeValues(e, "a2")}
                    value={val.a2}
                    width={60}
                />
                <Text
                    className="mx-[10px]"
                    style={{
                        fontSize: 18,
                        color: colors.text,
                    }}>
                    x +
                </Text>
                <CustomInput
                    placeholder="b2"
                    onChangeText={(e) => changeValues(e, "b2")}
                    value={val.b2}
                    width={60}
                />
                <Text
                    className="mx-[10px]"
                    style={{
                        fontSize: 18,
                        color: colors.text,
                    }}>
                    y +
                </Text>
                <CustomInput
                    placeholder="c2"
                    onChangeText={(e) => changeValues(e, "c2")}
                    value={val.c2}
                    width={60}
                />
            </View>
            <View className="flex-row justify-evenly items-center mt-[30px]">
                <Button
                    mode="contained"
                    onPress={() => {
                        const a1 = parseFloat(val.a1);
                        const a2 = parseFloat(val.a2);
                        const b1 = parseFloat(val.b1);
                        const b2 = parseFloat(val.b2);
                        const c1 = parseFloat(val.c1);
                        const c2 = parseFloat(val.c2);
                        if (isNaN(a1) || isNaN(a2) || isNaN(c1) || isNaN(c2))
                            return;
                        equSolve(a1, a2, b1, b2, c1, c2, setFinalAns);
                    }}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Calculate
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        setVal({
                            a1: "",
                            a2: "",
                            b1: "",
                            b2: "",
                            c1: "",
                            c2: "",
                        });
                        setFinalAns({
                            numeratorX: 0,
                            denominatorX: 0,
                            numeratorY: 0,
                            denominatorY: 0,
                            x: 0,
                            y: 0,
                            noSolution: false,
                            manySolution: false,
                            normalSolution: false,
                        });
                    }}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Clear
                </Button>
            </View>
            <View style={{ marginTop: 30 }}>
                {finalAns.noSolution && (
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        No Solution
                    </Text>
                )}
                {finalAns.manySolution && (
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        Many Solution
                    </Text>
                )}
                {finalAns.normalSolution && (
                    <>
                        <View className="flex-row items-center justify-center w-full">
                            {(finalAns.numeratorX ||
                                finalAns.numeratorX == 0) && (
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    x = {finalAns.numeratorX}
                                </Text>
                            )}
                            {Boolean(finalAns.denominatorX) && (
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    /{finalAns.denominatorX}
                                </Text>
                            )}
                        </View>
                        <View className="flex-row items-center justify-center w-full">
                            {(finalAns.numeratorY ||
                                finalAns.numeratorY == 0) && (
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    y = {finalAns.numeratorY}
                                </Text>
                            )}
                            {Boolean(finalAns.denominatorY) && (
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    /{finalAns.denominatorY}
                                </Text>
                            )}
                        </View>
                        {(finalAns.x || finalAns.x == 0) && (
                            <View>
                                <Text
                                    className="text-[25px] text-center my-5"
                                    style={{ color: colors.text }}
                                >
                                    Or
                                </Text>
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    x = {finalAns.x}
                                </Text>
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    y = {finalAns.y}
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

export default EquSolve;
