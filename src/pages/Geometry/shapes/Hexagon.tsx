import { useState } from "react";
import { View, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import Fraction from "../../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { parseNumber } from "../../../helpers/functions";
import { colorSchemeType, shapeType } from "../../../../types";

const Hexagon = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        S: "",
        s: 0,
    });
    const [ans, setAns] = useState<{ area: number; perimeter: number }>();
    const calculate = () => {
        if (input.S === "") return;
        const s = parseFloat(input.S);
        if (isNaN(s)) return;
        let area = (3 * s * s * Math.sqrt(3)) / 2;
        let perimeter = 6 * s;
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        setAns({ area, perimeter });
        setInput((prev) => ({ ...prev, s: parseNumber(s, 2) }));
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <Image source={shapeDetails.mainImage} className="w-[230px] h-[200px] self-center" style={{ tintColor: colors.text }} />
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
                    textColor={"white"}
                    className="mt-[15px]"
                    onPress={() => calculate()}>
                    Calculate
                </Button>
            </View>
            {(ans?.area || ans?.area === 0) && (
                <>
                    <Fraction
                        data={{
                            numerator: "3 × sin(60°) × S²",
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                    />
                    <Fraction
                        data={{
                            numerator: `3  × 0.87 × ${input.s}²`,
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                        textVisible={false}
                    />
                    <Fraction
                        data={{
                            numerator: `2.6 × ${input.s}²`,
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                        textVisible={false}
                    />
                    <Fraction
                        data={{
                            numerator: `2.6 × ${parseFloat(
                                (input.s ** 2).toFixed(2)
                            )}`,
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                        textVisible={false}
                    />
                    <Fraction
                        data={{
                            numerator: ans.area.toString(),
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
                                numerator: "6 × S",
                                text: "Perimeter",
                            }}
                            bullet={false}
                            size={18}
                            color={colors.text}
                        />
                        <Fraction
                            data={{
                                numerator: `6 × ${input.s}`,
                                text: "Perimeter",
                            }}
                            bullet={false}
                            size={18}
                            color={colors.text}
                            textVisible={false}
                        />
                        <Fraction
                            data={{
                                numerator: ans.perimeter.toString(),
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
        </View>
    );
};

export default Hexagon;
