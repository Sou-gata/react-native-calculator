import { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { parseNumber } from "../../helpers/functions";
import { bodyType, colorSchemeType } from "../../../types";
import { RouteProp, useRoute } from "@react-navigation/native";

const Sphere = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: bodyType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Radious: "",
        Height: "",
        r: 0,
        h: 0,
    });
    const [ans, setAns] = useState<{
        volume: undefined | number;
        surfaceArea: number;
    }>({
        volume: undefined,
        surfaceArea: 0,
    });
    const field = ["Radious"];
    const calculate = () => {
        if (input.Radious === "") return;
        const r = Math.abs(parseFloat(input.Radious));
        if (isNaN(r)) return;
        const volume = (4 / 3) * Math.PI * r * r * r;
        const surfaceArea = 4 * Math.PI * r * r;
        setAns({
            volume: parseNumber(volume, 2),
            surfaceArea: parseNumber(surfaceArea, 2),
        });
        setInput((prev) => ({ ...prev, r }));
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[205px] h-[200px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <View className="flex-row justify-center items-center gap-[10px] mt-[25px]">
                        {field.map((item, index) => (
                            <View key={index}>
                                <Text className="text-[18px] text-center my-[5px]" style={{ color: colors.secondary }}>{item}</Text>
                                <CustomInput
                                    placeholder={item}
                                    value={input[item as keyof object]}
                                    onChangeText={(e) => {
                                        setInput((prev) => ({
                                            ...prev,
                                            [item]: e,
                                        }));
                                    }}
                                    width={100}
                                />
                            </View>
                        ))}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor="#fff"
                            className="mt-[15px]"
                            onPress={() => calculate()}>
                            {" "}
                            Calculate
                        </Button>
                    </View>
                    {(ans.volume || ans.volume === 0) && (
                        <>
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: "4 × π × R³",
                                    denominator: "3",
                                }}
                                className="mt-[25px]"
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `4 × π × ${input.r}³`,
                                    denominator: "3",
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `4 × 3.14 × ${parseNumber(
                                        input.r ** 2 * input.r,
                                        2
                                    )}`,
                                    denominator: "3",
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `${parseNumber(
                                        4 * Math.PI * input.r ** 2 * input.r,
                                        2
                                    )}`,
                                    denominator: "3",
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: ans.volume,
                                }}
                                textVisible={false}
                            />

                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: "4 × π × R²",
                                }}
                                className="mt-[25px]"
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `4 × π × ${input.r}²`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `4 × 3.14 × ${input.r ** 2}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: ans.surfaceArea,
                                }}
                                textVisible={false}
                            />
                            <View className="mt-[25px]">
                                <Text
                                    className="text-[28px] mt-[-8px]"
                                    style={{ color: colors.secondary }}>
                                    Note :
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    SA = Surface Area
                                </Text>
                            </View>
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Sphere;
