import { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import Fraction from "../../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../../types";

const SFormula = ({ numerator, h }: { numerator: string; h: string }) => {
    const { colors } = useTheme<colorSchemeType>();
    return (
        <View>
            <View className="flex-row items-center">
                <Text className="text-[18px]" style={{ color: colors.text }}>S</Text>
                <Text className="text-[18px]" style={{ color: colors.text }}>
                    {" = "}
                </Text>
                <View
                    className="h-[55px] items-center justify-center w-[25px]">
                    <Image
                        source={require("../../../../assets/shapes/root.png")}
                        className="h-[115px] w-[50px] -mt-[10px]"
                        style={{
                            tintColor: colors.text,
                            transform: [{ scale: 0.35 }],
                        }}
                    />
                </View>

                <View
                    className="-ml-[3px] flex-row items-center border-t-[1.5px]"
                    style={{
                        borderTopColor: colors.text,
                    }}>
                    <View>
                        <Text
                            className="text-[18px] border-b pb-[3px]"
                            style={{
                                color: colors.text,
                                borderBottomColor: colors.text,
                            }}>
                            {numerator}
                        </Text>
                        <Text
                            className="text-[18px] text-center"
                            style={{
                                color: colors.text,
                            }}>
                            4
                        </Text>
                    </View>
                    <Text
                        className="text-[18px] mx-[5px]"
                        style={{
                            color: colors.text,
                        }}>
                        +
                    </Text>
                    <Text
                        className="text-[18px]"
                        style={{
                            color: colors.text,
                        }}>
                        {h}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const Trapezoid = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        A: "",
        B: "",
        H: "",
        a: 0,
        b: 0,
        h: 0,
    });
    const [ans, setAns] = useState<{
        area: number;
        perimeter: number;
        s: number;
    }>();
    const calculate = () => {
        if (input.A === "" && input.B === "" && input.H === "") return;
        const a = parseFloat(parseFloat(input.A).toFixed(2));
        const b = parseFloat(parseFloat(input.B).toFixed(2));
        const h = parseFloat(parseFloat(input.H).toFixed(2));
        if (isNaN(a) || isNaN(b) || isNaN(h)) return;
        setInput({ ...input, a, b, h });
        const area = parseFloat((((a + b) * h) / 2).toFixed(2));
        let s = Math.sqrt(((b - a) / 2) ** 2 + h ** 2);
        s = parseFloat(s.toFixed(2));
        const perimeter = parseFloat((2 * s + a + b).toFixed(2));
        setAns({ area, perimeter, s });
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[260px] h-[200px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <View className="flex-row justify-center items-center gap-[10px]">
                        <Text className="text-[18px] my-[10px] w-[100px] text-center" style={{ color: colors.secondary }}>A</Text>
                        <Text className="text-[18px] my-[10px] w-[100px] text-center" style={{ color: colors.secondary }}>B</Text>
                        <Text className="text-[18px] my-[10px] w-[100px] text-center" style={{ color: colors.secondary }}>H</Text>
                    </View>
                    <View className="flex-row justify-center items-center gap-[10px]">
                        {shapeDetails.field.map((item, index) => {
                            return (
                                <CustomInput
                                    key={index}
                                    width={100}
                                    placeholder={item}
                                    value={input[item as keyof object]}
                                    onChangeText={(e) => {
                                        setInput((prev) => ({
                                            ...prev,
                                            [item]: e,
                                        }));
                                    }}
                                />
                            );
                        })}
                    </View>
                    <View className="items-center">
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor="#fff"
                            className="mt-[15px]"
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {(ans?.area || ans?.area == 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "( A + B ) × H",
                                    denominator: "2",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `( ${input.a} + ${input.b} ) × ${input.h}`,
                                    denominator: "2",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${input.a + input.b} × ${
                                        input.h
                                    }`,
                                    denominator: "2",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${ans.area}`,
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View className="mt-[25px]">
                                <SFormula numerator={"(B - A)²"} h="H²" />
                                <SFormula
                                    numerator={`(${input.b} - ${input.a})²`}
                                    h={input.h + "²"}
                                />
                                <SFormula
                                    numerator={`${input.b - input.a}²`}
                                    h={input.h + "²"}
                                />
                                <SFormula
                                    numerator={`${(input.b - input.a) ** 2}`}
                                    h={(input.h ** 2).toString()}
                                />
                                <View className="flex-row">
                                    <Text
                                        className="text-[18px] text-transparent">
                                        S
                                    </Text>
                                    <Text
                                        className="text-[18px]"
                                        style={{
                                            color: colors.text,
                                        }}>
                                        {" = "}
                                    </Text>
                                    <Text
                                        className="text-[25px] -mt-[5px]"
                                        style={{
                                            color: colors.text,
                                        }}>
                                        √
                                    </Text>
                                    <Text
                                        className="text-[18px] border-t-[1.5px]"
                                        style={{
                                            color: colors.text,
                                            borderTopColor: colors.text,
                                        }}>
                                        {parseFloat(
                                            (
                                                (input.b - input.a) ** 2 /
                                                4
                                            ).toFixed(2)
                                        )}{" "}
                                        + {input.h ** 2}
                                    </Text>
                                </View>
                                <Fraction
                                    data={{ text: "S", numerator: ans.s }}
                                    textVisible={false}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                            </View>
                            <Fraction
                                data={{
                                    numerator: "2S + A + B",
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${ans.s} + ${input.a} + ${input.b}`,
                                    text: "Perimeter",
                                }}
                                textVisible={false}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                            <Fraction
                                data={{
                                    numerator: `${2 * ans.s} + ${input.a} + ${
                                        input.b
                                    }`,
                                    text: "Perimeter",
                                }}
                                textVisible={false}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                            <Fraction
                                data={{
                                    numerator: `${ans.perimeter}`,
                                    text: "Perimeter",
                                }}
                                textVisible={false}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Trapezoid;
