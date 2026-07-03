import { View } from "react-native";
import { useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { solveQuadraticEqu, solveQuadraticDec } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const QuadraticEqu = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [veriable, setVeriable] = useState({ a: "", b: "", c: "" });
    const [ans, setAns] = useState({
        inFraction: { rootOne: "", rootTwo: "" },
        inDecimal: { rootOne: "", rootTwo: "" },
    });
    const changeValues = (e: string, values: string) => {
        setVeriable({ ...veriable, [values]: e });
    };
    const getAns = () => {
        let a = parseFloat(veriable.a || "0");
        let b = parseFloat(veriable.b || "0");
        let c = parseFloat(veriable.c || "0");
        if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
            let inFraction = solveQuadraticEqu(a, b, c);
            let inDecimal = solveQuadraticDec(a, b, c);
            if (inFraction) {
                setAns({ inFraction, inDecimal });
            } else {
                setAns({ inFraction: { rootOne: "", rootTwo: "" }, inDecimal });
            }
        }
    };

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="flex-row items-center justify-center w-full mt-5">
                <CustomInput
                    onChangeText={(e) => changeValues(e, "a")}
                    value={veriable.a}
                    placeholder="a"
                    width={60}
                />
                <View className="flex-row items-start mx-[10px]">
                    <Text
                        className="text-[20px] leading-[30px]"
                        style={{ color: colors.text }}
                    >
                        X
                    </Text>
                    <Text
                        className="text-[12px] leading-[18px]"
                        style={{ color: colors.text }}
                    >
                        2
                    </Text>
                    <Text
                        className="text-[20px] leading-[30px]"
                        style={{ color: colors.text }}
                    >
                        {" "}
                        +
                    </Text>
                </View>
                <CustomInput
                    placeholder="b"
                    onChangeText={(e) => changeValues(e, "b")}
                    value={veriable.b}
                    width={60}
                />
                <Text
                    className="text-[20px] leading-[30px] mx-[10px]"
                    style={{ color: colors.text }}
                >
                    X +
                </Text>
                <CustomInput
                    placeholder="c"
                    onChangeText={(e) => changeValues(e, "c")}
                    value={veriable.c}
                    width={60}
                />
            </View>
            <View className="flex-row justify-evenly items-center mt-[30px]">
                <Button
                    mode="contained"
                    onPress={getAns}
                    buttonColor={colors.secondary}
                    textColor={"white"}>
                    Calculate
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        setVeriable({ a: "", b: "", c: "" });
                        setAns({
                            inFraction: {
                                rootOne: "",
                                rootTwo: "",
                            },
                            inDecimal: {
                                rootOne: "",
                                rootTwo: "",
                            },
                        });
                    }}
                    buttonColor={colors.secondary}
                    textColor={"white"}>
                    Clear
                </Button>
            </View>
            <View className="mt-[35px]">
                {(ans.inFraction.rootOne || ans.inFraction.rootOne == "0") && (
                    <View>
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            X = {ans.inFraction.rootOne}
                        </Text>
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            and
                        </Text>
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            X = {ans.inFraction.rootTwo}
                        </Text>
                    </View>
                )}
                {(ans.inDecimal.rootOne || ans.inDecimal.rootOne == "0") &&
                    ans.inDecimal.rootOne != ans.inFraction.rootOne &&
                    ans.inDecimal.rootTwo != ans.inFraction.rootTwo && (
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
                                X = {ans.inDecimal.rootOne}
                            </Text>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                and
                            </Text>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                X = {ans.inDecimal.rootTwo}
                            </Text>
                        </View>
                    )}
            </View>
        </View>
    );
};

export default QuadraticEqu;
