import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../types";
import { parseNumber } from "../../helpers/functions";

const Pentagon = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        S: "",
        s: 0,
    });
    const [ans, setAns] = useState<{
        area: number;
        perimeter: number;
    }>();
    const calculate = () => {
        if (input.S === "") return;
        const s = parseFloat(input.S);
        if (isNaN(s)) return;
        let area = (5 * s * s) / (4 * Math.tan((36 * Math.PI) / 180));
        let perimeter = 5 * s;
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        setAns({ area, perimeter });
        setInput((prev) => ({ ...prev, s: parseNumber(s, 2) }));
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[210px] h-[200px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <View className="mt-[25px] flex-row justify-center items-center gap-[10px]">
                        <Text className="text-[18px]" style={{ color: colors.text }}>Side</Text>
                        <CustomInput
                            placeholder="Side"
                            width={100}
                            value={input.S}
                            onChangeText={(e) => {
                                setInput((prev) => ({ ...prev, S: e }));
                            }}
                        />
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
                                    numerator: "5 × S²",
                                    denominator: "4 × tan(36°)",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                            <Fraction
                                data={{
                                    numerator: `5 × ${input.s}²`,
                                    denominator: "4 × tan(36°)",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `5 × ${input.s}²`,
                                    denominator: "4 × 0.73",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `5 × ${input.s ** 2}`,
                                    denominator: "2.91",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${parseFloat(
                                        (5 * input.s ** 2).toFixed(2)
                                    )}`,
                                    denominator: "2.91",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.area,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <View className="mt-[25px]">
                                <Fraction
                                    data={{
                                        numerator: "5 × S",
                                        text: "Perimeter",
                                    }}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                                <Fraction
                                    data={{
                                        numerator: `5 × ${input.s}`,
                                        text: "Perimeter",
                                    }}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: ans.perimeter,
                                        text: "Perimeter",
                                    }}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                    textVisible={false}
                                />
                            </View>
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Pentagon;
