import { View, Image } from "react-native";
import { useState } from "react";
import { Text, useTheme, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../types";
import { parseNumber } from "../../helpers/functions";

const Square = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Side: "",
        side: 0,
    });
    const [ans, setAns] = useState({
        area: 0,
        perimeter: 0,
        diagonal: 0,
    });
    const calculate = () => {
        if (input.Side !== "") {
            let side = parseFloat(input.Side);
            setInput({
                ...input,
                side: parseNumber(side, 2),
            });
            setAns({
                area: parseNumber(side * side, 2),
                perimeter: parseNumber(4 * side, 2),
                diagonal: (parseNumber(Math.sqrt(2) * side), 2),
            });
        } else return;
    };
    return (
        <View className="flex-1 p-[20px]" style={{ backgroundColor: colors.backgroundColor }}>
            <Image source={shapeDetails.mainImage} className="w-[200px] h-[220px] self-center" style={{ tintColor: colors.text }} />
            <View className="flex-row justify-center items-center gap-[10px] mt-[25px]">
                <Text className="text-[20px]" style={{ color: colors.text }}>Side</Text>
                <CustomInput
                    placeholder="Side"
                    value={input.Side}
                    onChangeText={(e) => {
                        setInput({ ...input, Side: e });
                    }}
                />
            </View>
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
            {ans.area !== 0 && (
                <>
                    <View className="mt-[20px] flex-row">
                        <Text className="text-[20px]" style={{ color: colors.text }}>Area = Side × Side</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[20px] text-transparent">Area</Text>
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            {` = ${input.side} × ${input.side}`}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[20px] text-transparent">Area</Text>
                        <Text className="text-[20px]" style={{ color: colors.text }}>{` = ${ans.area}`}</Text>
                    </View>
                    <View className="mt-[20px] flex-row">
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            Perimeter = 4 × Side
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[20px] text-transparent">
                            Perimeter
                        </Text>
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            {` = 4 × ${input.side}`}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[20px] text-transparent">
                            Perimeter
                        </Text>
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            {` = ${ans.perimeter}`}
                        </Text>
                    </View>
                    <View className="mt-[20px] flex-row">
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            Diagonal = √2 × Side
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[20px] text-transparent">
                            Perimeter
                        </Text>
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            {` = ${Math.sqrt(2).toFixed(2)} × ${input.side}`}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[20px] text-transparent">
                            Perimeter
                        </Text>
                        <Text className="text-[20px]" style={{ color: colors.text }}>
                            {` = ${ans.diagonal}`}
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default Square;
