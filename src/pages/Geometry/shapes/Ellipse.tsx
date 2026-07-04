import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import Fraction from "../../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../../types";
import { parseNumber } from "../../../helpers/functions";

const Ellipse = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;

    const [input, setInput] = useState({
        A: "",
        B: "",
        a: 0,
        b: 0,
    });
    const [ans, setAns] = useState<{
        area: number;
        perimeter: number;
    }>();
    const calculate = () => {
        if (input.A === "" || input.B === "") return;
        const a = parseFloat(input.A);
        const b = parseFloat(input.B);
        if (isNaN(a) || isNaN(b)) return;
        let area = Math.PI * a * b;
        let perimeter = 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        setAns({ area, perimeter });
        setInput((prev) => ({
            ...prev,
            a: parseFloat(a.toFixed(2)),
            b: parseFloat(b.toFixed(2)),
        }));
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[250px] h-[165px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    <View className="mt-[25px] flex-row justify-center items-center gap-[10px]">
                        {shapeDetails.field.map((item, index) => (
                            <View key={index}>
                                <Text className="text-[18px] text-center" style={{ color: colors.secondary }}>{item}</Text>
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
                                    maxLength={8}
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
                    {(ans?.area || ans?.area == 0) && (
                        <>
                            <Fraction
                                data={{
                                    text: "Area",
                                    numerator: "π × A × B",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                className="mt-[25px]"
                            />
                            <Fraction
                                data={{
                                    text: "Area",
                                    numerator: `3.14 × ${input.a} × ${input.b}`,
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    text: "Area",
                                    numerator: `${ans?.area}`,
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View className="mt-[25px]">
                                <View className="flex-row items-center">
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View className="justify-center items-center flex-row">
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            className="h-[45px] w-[16px] -mt-[10px] ml-[2px]"
                                            style={{ tintColor: colors.text }}
                                        />
                                        <View>
                                            <Text className="text-[18px] text-center border-t-[1.5px] py-[2px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                (A² + B²)
                                            </Text>
                                            <Text
                                                className="text-[18px] text-center border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="mt-[10px]">
                                <View className="flex-row items-center">
                                    <Text className="text-[18px] text-transparent">
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View className="justify-center items-center flex-row">
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            className="h-[45px] w-[16px] -mt-[10px] ml-[2px]"
                                            style={{ tintColor: colors.text }}
                                        />
                                        <View>
                                            <Text className="text-[18px] text-center border-t-[1.5px] py-[2px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                ({input.a}² + {input.b}²)
                                            </Text>
                                            <Text
                                                className="text-[18px] text-center border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="mt-[10px]">
                                <View className="flex-row items-center">
                                    <Text className="text-[18px] text-transparent">
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View className="justify-center items-center flex-row">
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            className="h-[45px] w-[16px] -mt-[10px] ml-[2px]"
                                            style={{ tintColor: colors.text }}
                                        />
                                        <View>
                                            <Text className="text-[18px] text-center border-t-[1.5px] py-[2px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                (
                                                {parseFloat(
                                                    (input.a ** 2).toFixed(2)
                                                )}
                                                {" + "}
                                                {parseFloat(
                                                    (input.b ** 2).toFixed(2)
                                                )}
                                                )
                                            </Text>
                                            <Text
                                                className="text-[18px] text-center border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="mt-[10px]">
                                <View className="flex-row items-center">
                                    <Text className="text-[18px] text-transparent">
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View className="justify-center items-center flex-row">
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            className="h-[45px] w-[16px] -mt-[10px] ml-[2px]"
                                            style={{ tintColor: colors.text }}
                                        />
                                        <View>
                                            <Text className="text-[18px] text-center border-t-[1.5px] py-[2px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                {parseFloat(
                                                    (
                                                        input.a ** 2 +
                                                        input.b ** 2
                                                    ).toFixed(2)
                                                )}
                                            </Text>
                                            <Text
                                                className="text-[18px] text-center border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="mt-[10px]">
                                <View className="flex-row items-center">
                                    <Text className="text-[18px] text-transparent">
                                        Perimeter
                                    </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}> = </Text>
                                    <Text className="text-[18px]" style={{ color: colors.text }}>
                                        2 × π ×{" "}
                                    </Text>
                                    <Text
                                        className="text-[25px] -mt-[10px]" style={{ color: colors.text }}>
                                        √
                                    </Text>
                                    <View>
                                        <Text
                                            className="text-[18px] border-t-[1.5px]"
                                            style={{
                                                color: colors.text,
                                                borderTopColor: colors.text,
                                            }}>
                                            {parseFloat(
                                                (
                                                    (input.a ** 2 +
                                                        input.b ** 2) *
                                                    0.5
                                                ).toFixed(2)
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Fraction
                                size={18}
                                data={{
                                    text: "Perimeter",
                                    numerator: `2 × 3.14 × ${parseFloat(
                                        Math.sqrt(
                                            (input.a ** 2 + input.b ** 2) * 0.5
                                        ).toFixed(2)
                                    )}`,
                                }}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                size={18}
                                data={{
                                    text: "Perimeter",
                                    numerator: ans?.perimeter
                                        ? ans.perimeter.toString()
                                        : "",
                                }}
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

export default Ellipse;
