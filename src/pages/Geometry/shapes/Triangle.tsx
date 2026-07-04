import { View, ScrollView, Image } from "react-native";
import { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import Fraction from "../../../components/Fraction";
import { parseNumber } from "../../../helpers/functions";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../../types";

const Triangle = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [inputs, setInputs] = useState({
        A: "",
        B: "",
        C: "",
        a: 0,
        b: 0,
        c: 0,
    });
    const [ans, setAns] = useState<{
        area: number;
        s: number;
        perimeter: number;
        heightA: number;
        heightB: number;
        heightC: number;
    }>();
    const [isPossible, setIsPossible] = useState(true);
    const calculate = () => {
        if (inputs.A === "" || inputs.B === "" || inputs.C === "") return;
        const a = parseFloat(inputs.A);
        const b = parseFloat(inputs.B);
        const c = parseFloat(inputs.C);
        if (isNaN(a) || isNaN(b) || isNaN(c)) return;
        if (a + b > c && b + c > a && c + a > b) {
            setIsPossible(true);
            const s = (a + b + c) / 2;
            let tempS = parseNumber(s, 2);
            setInputs({ ...inputs, a, b, c });
            let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            area = parseNumber(area, 2);
            let perimeter = a + b + c;
            perimeter = parseNumber(perimeter, 2);
            let heightA = (2 * area) / a;
            heightA = parseNumber(heightA, 2);
            let heightB = (2 * area) / b;
            heightB = parseNumber(heightB, 2);
            let heightC = (2 * area) / c;
            heightC = parseNumber(heightC, 2);
            setAns({
                ...ans,
                s: tempS,
                area,
                perimeter,
                heightA,
                heightB,
                heightC,
            });
        } else {
            setIsPossible(false);
        }
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={require("../../../assets/shapes/triangle_main.png")}
                        className="w-[200px] h-[200px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <Text className="text-[18px] my-[10px]" style={{ color: colors.text }}>Sides</Text>
                    <View className="flex-row gap-[10px]">
                        {shapeDetails.field.map((field, index) => (
                            <CustomInput
                                key={index}
                                placeholder={"Enter " + field}
                                width={100}
                                value={inputs[field as keyof object]}
                                onChangeText={(text) => {
                                    setInputs({ ...inputs, [field]: text });
                                }}
                            />
                        ))}
                    </View>
                    <View className="items-center">
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor={"white"}
                            className="mt-[15px]"
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {!isPossible && (
                        <Text className="text-[18px] mt-[15px] text-center" style={{ color: colors.text }}>
                            Triangle is not possible
                        </Text>
                    )}
                    {isPossible && ans?.area && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "A + B + C",
                                    denominator: "2",
                                    text: "S",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `${inputs.a} + ${inputs.b} + ${inputs.c}`,
                                    denominator: "2",
                                    text: "S",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${
                                        inputs.a + inputs.b + inputs.c
                                    }`,
                                    denominator: "2",
                                    text: "S",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.s,
                                    text: "S",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                        </>
                    )}
                    {isPossible && ans?.area && (
                        <>
                            <View
                                className="mt-[25px] flex-row">
                                <Text className="text-[18px]" style={{ color: colors.text }}>Area = </Text>
                                <Text className="text-[20px] leading-[25px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t" style={{ color: colors.text, borderColor: colors.text }}>
                                    S (S - A) (S - B) (S - C)
                                </Text>
                            </View>

                            <View
                                className="mt-[10px] flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Area{" "}
                                </Text>
                                <Text className="text-[20px] leading-[25px]" style={{ color: colors.text }}>= √</Text>
                                <Text className="text-[18px] border-t" style={{ color: colors.text, borderColor: colors.text }}>
                                    {ans.s} ({ans.s} - {inputs.a}) ({ans.s} -{" "}
                                    {inputs.b}) ({ans.s} - {inputs.c})
                                </Text>
                            </View>
                            <View
                                className="mt-[10px] flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Area{" "}
                                </Text>
                                <Text className="text-[20px] leading-[25px]" style={{ color: colors.text }}>= √</Text>
                                <Text className="text-[18px] border-t" style={{ color: colors.text, borderColor: colors.text }}>
                                    {ans.s} × {ans.s - inputs.a} ×{" "}
                                    {ans.s - inputs.b} × {ans.s - inputs.c}
                                </Text>
                            </View>
                            <View
                                className="mt-[10px] flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Area{" "}
                                </Text>
                                <Text className="text-[20px] leading-[25px]" style={{ color: colors.text }}>= √</Text>
                                <Text className="text-[18px] border-t" style={{ color: colors.text, borderColor: colors.text }}>
                                    {parseNumber(
                                        ans.s *
                                            (ans.s - inputs.a) *
                                            (ans.s - inputs.b) *
                                            (ans.s - inputs.c),
                                        2
                                    )}
                                </Text>
                            </View>
                            <View
                                className="mt-[10px] flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Area{" "}
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{` = `}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{ans.area}</Text>
                            </View>

                            <View className="mt-[15px]">
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    Perimeter = A + B + C
                                </Text>
                                <View className="flex-row">
                                    <Text className="text-[18px] text-transparent">
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        {" "}
                                        = {inputs.a} + {inputs.b} + {inputs.c}
                                    </Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-[18px] text-transparent">
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        {" = "}
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        {ans.perimeter}
                                    </Text>
                                </View>
                            </View>
                            <Fraction
                                data={{
                                    numerator: "2 × Area",
                                    denominator: "A",
                                    text: "Height A",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${ans.area}`,
                                    denominator: inputs.a,
                                    text: "Height A",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: 2 * ans.area,
                                    denominator: inputs.a,
                                    text: "Height A",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.heightA,
                                    text: "Height A",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × Area",
                                    denominator: "B",
                                    text: "Height B",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${ans.area}`,
                                    denominator: inputs.b,
                                    text: "Height B",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: 2 * ans.area,
                                    denominator: inputs.b,
                                    text: "Height B",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.heightB,
                                    text: "Height B",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × Area",
                                    denominator: "C",
                                    text: "Height C",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${ans.area}`,
                                    denominator: inputs.c,
                                    text: "Height C",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: 2 * ans.area,
                                    denominator: inputs.c,
                                    text: "Height C",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.heightC,
                                    text: "Height C",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Triangle;
