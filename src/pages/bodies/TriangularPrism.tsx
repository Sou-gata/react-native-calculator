import { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { parseNumber } from "../../helpers/functions";
import { bodyType, colorSchemeType } from "../../../types";
import { RouteProp, useRoute } from "@react-navigation/native";

const TriangularPrism = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: bodyType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Side: "",
        Height: "",
        s: 0,
        h: 0,
    });
    const [ans, setAns] = useState<{
        volume: undefined | number;
        surfaceArea: number;
        lateralSurfaceArea: number;
    }>({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
    });
    const field = ["Side", "Height"];
    const calculate = () => {
        if (input.Side === "" || input.Height === "") return;
        const s = parseFloat(input.Side);
        const h = parseFloat(input.Height);
        if (isNaN(s) || isNaN(h)) return;
        let volume = (Math.sqrt(3) * s * s * h) / 4;
        let surfaceArea = 3 * s * h + (Math.sqrt(3) * s * s) / 2;
        let lateralSurfaceArea = 3 * s * h;
        volume = parseNumber(volume, 2);
        surfaceArea = parseNumber(surfaceArea, 2);
        lateralSurfaceArea = parseNumber(lateralSurfaceArea, 2);
        setAns({
            volume,
            surfaceArea,
            lateralSurfaceArea,
        });
        setInput((prev) => ({
            ...prev,
            s: parseNumber(s, 2),
            h: parseNumber(h, 2),
        }));
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[225px] h-[172px] self-center"
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
                            textColor={"white"}
                            className="mt-[15px]"
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {(ans.volume || ans.volume === 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "√3 × S² × H",
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `√3 × ${input.s}² × ${input.h}`,
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `√3 × ${parseNumber(
                                        input.s ** 2,
                                        2
                                    )} × ${input.h}`,
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: parseNumber(
                                        input.s ** 2 * input.h * Math.sqrt(3),
                                        2
                                    ),
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.volume ? ans.volume : "",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View className="flex-row mt-[25px] items-center">
                                <Fraction
                                    data={{
                                        numerator: "√3 × S²",
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                />
                                <Text
                                    className="text-[18px] mt-[9px]"
                                    style={{ color: colors.text }}>
                                    {" + 3 × S × H"}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Fraction
                                    data={{
                                        numerator: `√3 × ${input.s}²`,
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Text
                                    className="text-[18px] mt-[9px]"
                                    style={{ color: colors.text }}>
                                    {" + "}3 × {input.s} × {input.h}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Fraction
                                    data={{
                                        numerator: `√3 × ${parseNumber(
                                            input.s ** 2,
                                            2
                                        )}`,
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Text
                                    className="text-[18px] mt-[9px]"
                                    style={{ color: colors.text }}>
                                    {" + "}
                                    {parseNumber(3 * input.s * input.h, 2)}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Fraction
                                    data={{
                                        numerator: `${parseNumber(
                                            input.s ** 2 * Math.sqrt(3),
                                            2
                                        )}`,
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Text
                                    className="text-[18px] mt-[9px]"
                                    style={{ color: colors.text }}>
                                    {" + "}
                                    {parseNumber(3 * input.s * input.h, 2)}
                                </Text>
                            </View>
                            <Fraction
                                data={{
                                    numerator: `${parseNumber(
                                        (input.s ** 2 * Math.sqrt(3)) / 2,
                                        2
                                    )} + ${parseNumber(
                                        3 * input.s * input.h,
                                        2
                                    )}`,
                                    text: "SA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.surfaceArea,
                                    text: "SA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "3 × S × H",
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    numerator: `3 × ${input.s} × ${input.h}`,
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.lateralSurfaceArea,
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View className="mt-[25px]">
                                <Text
                                    className="text-[27px] mt-[-7px]"
                                    style={{ color: colors.secondary }}>
                                    Note :
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    SA = Surface Area
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    LSA = Lateral Surface Area
                                </Text>
                            </View>
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default TriangularPrism;
