import { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../../types";
import { parseNumber } from "../../../helpers/functions";

const Rectangle = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Length: "",
        Breadth: "",
        l: 0,
        b: 0,
    });
    const [ans, setAns] = useState({
        perimeter: 0,
        area: 0,
        diagonal: 0,
    });

    const calculate = () => {
        if (input.Length != "" && input.Breadth != "") {
            let l = parseFloat(input.Length);
            let b = parseFloat(input.Breadth);
            if (isNaN(l) || isNaN(b)) return;
            l = parseNumber(l, 2);
            b = parseNumber(b, 2);
            setInput({ ...input, l, b });
            setAns({
                perimeter: parseNumber(2 * (l + b), 2),
                area: parseNumber(l * b, 2),
                diagonal: parseNumber(Math.sqrt(l * l + b * b), 2),
            });
        } else return;
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        className="w-[230px] h-[150px] self-center"
                        style={{ tintColor: colors.text }}
                    />
                    {shapeDetails.field.map((item, index) => (
                        <View className="flex-row justify-center items-center gap-[10px] mt-[25px]" key={index}>
                            <Text className="text-[18px]" style={{ color: colors.text }}>{item}</Text>
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
                    {ans.area != 0 && ans.perimeter != 0 && (
                        <View className="mt-[25px]">
                            <Text className="text-[18px]" style={{ color: colors.text }}>
                                Area = Length × Breadth
                            </Text>
                            <View className="flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Area
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {` =  ${input.l} × ${input.b}`}
                                </Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Area
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {" = " + ans.area}
                                </Text>
                            </View>
                            <Text className="text-[18px] mt-[25px]" style={{ color: colors.text }}>
                                Perimeter = 2 × (Length + Breadth)
                            </Text>
                            <View className="flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {` = 2 × (${input.l} + ${input.b})`}
                                </Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {` = 2 × ${input.l + input.b}`}
                                </Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Perimeter
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {" = " + ans.perimeter}
                                </Text>
                            </View>
                            <View className="flex-row mt-[25px]">
                                <Text className="text-[18px]" style={{ color: colors.text }}>Diagonal</Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[22px] -mt-[5px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    Length² + Breadth²
                                </Text>
                            </View>
                            <View className="flex-row mt-[5px]">
                                <Text className="text-[18px] text-transparent">
                                    Diagonal
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[22px] -mt-[5px]" style={{ color: colors.text }}>√</Text>

                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    {`${input.l}² + ${input.b}²`}
                                </Text>
                            </View>
                            <View className="flex-row mt-[5px]">
                                <Text className="text-[18px] text-transparent">
                                    Diagonal
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[22px] -mt-[5px]" style={{ color: colors.text }}>√</Text>

                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    {`${input.l ** 2} + ${input.b ** 2}`}
                                </Text>
                            </View>
                            <View className="flex-row mt-[5px]">
                                <Text className="text-[18px] text-transparent">
                                    Diagonal
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>{" = "}</Text>
                                <Text className="text-[22px] -mt-[5px]" style={{ color: colors.text }}>√</Text>
                                <Text className="text-[18px] border-t-[1.5px]" style={{ color: colors.text, borderTopColor: colors.text }}>
                                    {` ${
                                        input.l * input.l + input.b * input.b
                                    }`}
                                </Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-[18px] text-transparent">
                                    Diagonal
                                </Text>
                                <Text className="text-[18px]" style={{ color: colors.text }}>
                                    {" = " + ans.diagonal}
                                </Text>
                            </View>
                        </View>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Rectangle;
