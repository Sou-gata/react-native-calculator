import { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import CustomInput from "../../../components/CustomInput";
import Fraction from "../../../components/Fraction";
import { parseNumber } from "../../../helpers/functions";
import { bodyType, colorSchemeType } from "../../../../types";

const Cone = () => {
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
        lateralSurfaceArea: number;
        slantHeight: number;
    }>({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
        slantHeight: 0,
    });
    const field = ["Radious", "Height"];
    const calculate = () => {
        if (input.Radious === "" || input.Height === "") return;
        const r = Math.abs(parseFloat(input.Radious));
        const h = Math.abs(parseFloat(input.Height));
        if (isNaN(r) || isNaN(h)) return;
        const volume = (1 / 3) * Math.PI * r * r * h;
        const surfaceArea = Math.PI * r * (r + Math.sqrt(r * r + h * h));
        const lateralSurfaceArea = Math.PI * r * Math.sqrt(r * r + h * h);
        const slantHeight = Math.sqrt(r * r + h * h);
        setAns({
            volume: parseNumber(volume, 2),
            surfaceArea: parseNumber(surfaceArea, 2),
            lateralSurfaceArea: parseNumber(lateralSurfaceArea, 2),
            slantHeight: parseNumber(slantHeight, 2),
        });
        setInput((prev) => ({ ...prev, r, h }));
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[220px] h-[200px] self-center"
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
                                    numerator: "π × R² × H",
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
                                    numerator: `π × ${input.r}² × ${input.h}`,
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
                                    numerator: `3.14 × ${parseNumber(
                                        input.r ** 2,
                                        2
                                    )} × ${input.h}`,
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
                                        Math.PI * input.r ** 2 * input.h,
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
                            <View className="mt-[25px] flex-row items-center">
                                <Text className="text-[18px]" style={{ color: colors.text }}>L = </Text>
                                <Text className="text-[28px] mt-[-8px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    R² + H²
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-[18px] text-transparent">
                                    L
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                <Text className="text-[28px] mt-[-8px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    {input.r}² + {input.h}²
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-[18px] text-transparent">
                                    L
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                <Text className="text-[28px] mt-[-8px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    {parseNumber(input.r ** 2, 2)}
                                    {" + "}
                                    {parseNumber(input.h ** 2, 2)}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-[18px] text-transparent">
                                    L
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                <Text className="text-[28px] mt-[-8px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    {parseNumber(
                                        input.r ** 2 + input.h ** 2,
                                        2
                                    )}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-[18px] text-transparent">
                                    L
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {ans.slantHeight}
                                </Text>
                            </View>
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: "π × R × (R + L)",
                                }}
                                className="mt-[25px]"
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `π × ${input.r} × (${input.r} + ${ans.slantHeight})`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `3.14 × ${input.r} × ${
                                        input.r + ans.slantHeight
                                    }`,
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
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `π × R × L`,
                                }}
                                className="mt-[25px]"
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `π × ${input.r} × ${ans.slantHeight}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `3.14 × ${parseNumber(
                                        input.r * ans.slantHeight,
                                        2
                                    )}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: ans.lateralSurfaceArea,
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
                                    L = Slant Height
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

export default Cone;
