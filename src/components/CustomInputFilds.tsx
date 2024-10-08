import { Pressable, StyleSheet, View } from "react-native";
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
        <View style={styles.inputContainer}>
            {inputs.map((input, index) => (
                <View key={index} style={{ position: "relative" }}>
                    {index > 1 && (
                        <Pressable
                            style={styles.cross}
                            onPress={() => {
                                const newInputs = [...inputs].filter(
                                    (inp) => inp.id != input.id
                                );
                                setInputs(newInputs);
                            }}>
                            <View
                                style={{
                                    backgroundColor: colors.secondary,
                                    borderRadius: 20,
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
                        style={[
                            { backgroundColor: colors.secondary },
                            styles.addInput,
                        ]}
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
                        <Text style={{ fontSize: 20, color: "white" }}>+</Text>
                    </Pressable>
                )}
        </View>
    );
};

export default CustomInputFilds;

const styles = StyleSheet.create({
    addInput: {
        width: 40,
        height: 40,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    cross: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: -14,
        right: -14,
        fontSize: 18,
        zIndex: 2,
    },
});
