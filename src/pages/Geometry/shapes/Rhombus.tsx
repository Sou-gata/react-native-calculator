import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import Fraction from "../../../components/Fraction";
import { parseNumber } from "../../../helpers/functions";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../../types";

const Rhombus = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({ A: "", B: "", a: 0, b: 0 });
    const [ans, setAns] = useState<{
        area: number;
        perimeter: number;
        side: number;
    }>();
    const calculate = () => {
        if (input.A === "" || input.B === "") return;
        let a = parseFloat(input.A);
        let b = parseFloat(input.B);
        if (isNaN(a) || isNaN(b)) return;
        a = parseNumber(a, 2);
        b = parseNumber(b, 2);
        let area = (a * b) / 2;
        area = parseNumber(area, 2);
        let perimeter = 2 * Math.sqrt(a * a + b * b);
        perimeter = parseNumber(perimeter, 2);
        let side = perimeter / 4;
        side = parseNumber(side, 2);
        setInput((prev) => ({ ...prev, a, b }));
        setAns({ perimeter, area, side });
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[170px] h-[220px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <View className="flex-row justify-center items-center gap-[10px] mt-[25px]">
                        {shapeDetails.field.map((item, index) => (
                            <View key={index}>
                                <Text
                                    className="text-[18px] text-center"
                                    style={{ color: colors.secondary }}>
                                    {item}
                                </Text>
                                <CustomInput
                                    placeholder={item}
                                    value={input[item as keyof object]}
                                    onChangeText={(e) => {
                                        setInput((prev) => ({
                                            ...prev,
                                            [item]: e,
                                        }));
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                    <View className="items-center mb-[25px]">
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor="#fff"
                            className="mt-[15px]"
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {(ans?.area || ans?.area === 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "A × B",
                                    denominator: "2",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                            <Fraction
                                data={{
                                    numerator: `${input.a} × ${input.b}`,
                                    denominator: "2",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${input.a * input.b}`,
                                    denominator: "2",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${ans.area}`,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <View className="flex-row items-center mt-[25px]">
                                <Text className="text-[18px]" style={{ color: colors.text }}>Perimeter</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>2 ×</Text>
                                <Text
                                    className="text-[25px]"
                                    style={{
                                        color: colors.text,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    className="border-t-[1.5px]"
                                    style={{
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        A² + B²
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-[10px]">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>2 ×</Text>
                                <Text
                                    className="text-[25px]"
                                    style={{
                                        color: colors.text,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    className="border-t-[1.5px]"
                                    style={{
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        {input.a}² + {input.b}²
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-[10px]">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>2 ×</Text>
                                <Text
                                    className="text-[25px]"
                                    style={{
                                        color: colors.text,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    className="border-t-[1.5px]"
                                    style={{
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        {input.a ** 2} + {input.b ** 2}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-[10px]">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>2 ×</Text>
                                <Text
                                    className="text-[25px]"
                                    style={{
                                        color: colors.text,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    className="border-t-[1.5px]"
                                    style={{
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        {input.a ** 2 + input.b ** 2}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-[10px]">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>2 ×</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {" " +
                                        parseFloat(
                                            Math.sqrt(
                                                input.a ** 2 + input.b ** 2
                                            ).toFixed(2)
                                        )}
                                </Text>
                            </View>
                            <View className="flex-row items-center mt-[10px]">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {ans.perimeter}
                                </Text>
                            </View>
                            <Fraction
                                data={{
                                    numerator: "Perimeter",
                                    denominator: "4",
                                    text: "Side",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: ans.perimeter,
                                    denominator: "4",
                                    text: "Side",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.side,
                                    text: "Side",
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

export default Rhombus;
