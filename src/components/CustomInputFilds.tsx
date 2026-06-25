import { Pressable, View } from "react-native";
import React from "react";
import { useTheme, Text } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import CustomInput from "./CustomInput";
import { colorSchemeType, inputFildsProps } from "../../types";

const CustomInputFilds = ({
    inputs,
    setInputs,
    maxInput,
    maxLength = 8,
}: inputFildsProps) => {
    const { colors } = useTheme<colorSchemeType>();
    return (
        <View className="flex-row gap-2.5 justify-center items-center flex-wrap">
            {inputs.map((input, index) => (
                <View key={index} className="relative">
                    {index > 1 && (
                        <Pressable
                            className="p-[5px] justify-center items-center absolute top-[-14px] right-[-14px] z-[2]"
                            onPress={() => {
                                const newInputs = [...inputs].filter(
                                    (inp) => inp.id != input.id
                                );
                                setInputs(newInputs);
                            }}>
                            <View
                                className="rounded-[20px]"
                                style={{
                                    backgroundColor: colors.secondary,
                                }}>
                                <Entypo
                                    name="cross"
                                    size={18}
                                    color={colors.backgroundColor}
                                />
                            </View>
                        </Pressable>
                    )}
                    <CustomInput
                        placeholder={`a${index + 1}`}
                        width={70}
                        value={input.value}
                        autoFocus={index === inputs.length - 1}
                        onChangeText={(e: string) => {
                            const newInputs = [...inputs];
                            newInputs[index].value = e;
                            setInputs(newInputs);
                        }}
                        maxLength={maxLength}
                    />
                </View>
            ))}
            {inputs.length < maxInput &&
                inputs[inputs.length - 1].value !== "" && (
                    <Pressable
                        className="w-10 h-10 rounded-[7px] items-center justify-center"
                        style={{ backgroundColor: colors.secondary }}
                        onPress={() => {
                            const newInputs = [...inputs];
                            if (inputs.length < 12) {
                                newInputs.push({
                                    id: newInputs.length + 1,
                                    value: "",
                                });
                                setInputs(newInputs);
                            }
                        }}>
                        <Text className="text-[20px] text-white">+</Text>
                    </Pressable>
                )}
        </View>
    );
};

export default CustomInputFilds;
