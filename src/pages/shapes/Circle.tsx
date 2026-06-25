import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { parseNumber } from "../../helpers/functions";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../types";

const Circle = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        R: "",
        r: 0,
    });
    const [ans, setAns] = useState({
        area: 0,
        perimeter: 0,
        diameter: 0,
    });
    const [isVisible, setIsVisible] = useState(false);
    const calculate = () => {
        if (input.R === "") return;
        const r = parseFloat(input.R);
        if (isNaN(r)) return;
        let area = Math.PI * r * r;
        let perimeter = 2 * Math.PI * r;
        let diameter = 2 * r;
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        diameter = parseNumber(diameter, 2);
        setAns({ area, perimeter, diameter });
        setInput((prev) => ({ ...prev, r: parseNumber(r) }));
        setIsVisible(true);
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[180px] h-[180px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <View className="mt-[25px] flex-row justify-center items-center gap-[10px]">
                        <Text className="text-[18px]" style={{ color: colors.text }}>Radious</Text>
                        <CustomInput
                            placeholder="R"
                            width={100}
                            value={input.R}
                            onChangeText={(e) => {
                                setInput((prev) => ({ ...prev, R: e }));
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
                    {isVisible && (
                        <>
                            <Fraction
                                data={{ numerator: "π × R²", text: "Area" }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                            />
                            <Fraction
                                data={{
                                    numerator: `π × ${input.r}²`,
                                    text: "Area",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${Math.PI.toFixed(2)} × ${
                                        input.r ** 2
                                    }`,
                                    text: "Area",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.area.toString(),
                                    text: "Area",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × π × R",
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${Math.PI.toFixed(2)} × ${
                                        input.r
                                    }`,
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.perimeter.toString(),
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × R",
                                    text: "Diameter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × " + input.r,
                                    text: "Diameter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.diameter.toString(),
                                    text: "Diameter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Circle;

