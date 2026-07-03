import { View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { gcd, wp } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const Proportion = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [textNu, onChangeTextNu] = useState("");
    const [textDe, onChangeTextDe] = useState("");
    const [ans, setAns] = useState<{
        oriNu: number;
        oldDe: number;
        nu: number;
        de: number;
        mix: number;
        mixNu: number;
        mixDe: number;
    }>({
        oriNu: 1,
        oldDe: 1,
        nu: 1,
        de: 1,
        mix: 0,
        mixNu: 0,
        mixDe: 0,
    });
    const [opacity, setOpacity] = useState({ full: 0, mix: 0 });

    const calculate = () => {
        let opc = { full: 0, mix: 0 };
        setOpacity(opc);
        const nu = parseInt(textNu);
        const de = parseInt(textDe);
        if (!isNaN(nu) && !isNaN(de)) {
            const hcf = gcd([nu, de]);
            const newNu = nu / hcf;
            const newDe = de / hcf;
            let an = {
                oriNu: nu,
                oldDe: de,
                nu: newNu,
                de: newDe,
                mix: 0,
                mixNu: 0,
                mixDe: 0,
            };
            setAns(an);
            if (newNu > newDe) {
                const mix = Math.floor(newNu / newDe);
                const mixNu = newNu % newDe;
                const mixDe = newDe;
                opc = { ...opc, mix: 1 };
                setOpacity(opc);
                let fullAns = { ...an, mix, mixNu, mixDe };
                setAns(fullAns);
            }
            opc = { ...opc, full: 1 };
            setOpacity(opc);
            onChangeTextNu("");
            onChangeTextDe("");
        }
    };

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View
                className="flex-col justify-center px-[25px] items-center mt-[29px]"
                style={{ width: wp("100%") }}
            >
                <CustomInput
                    onChangeText={onChangeTextNu}
                    value={textNu}
                    placeholder="Numerator"
                    width={150}
                />
                <View className="mt-2.5">
                    <CustomInput
                        onChangeText={onChangeTextDe}
                        value={textDe}
                        placeholder="Denominator"
                        width={150}
                    />
                </View>
                <View className="items-center mt-[30px]">
                    <Button
                        mode="contained"
                        onPress={calculate}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <View
                className={opacity.full ? "p-5 flex-row items-center justify-center w-full" : "hidden"}
            >
                <View>
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {ans.oriNu}
                    </Text>
                    <View
                        className="h-[2px] my-[2px] mt-[7px]"
                        style={{ backgroundColor: colors.text }}
                    />
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {ans.oldDe}
                    </Text>
                </View>
                {ans.oldDe != ans.de && ans.oriNu != ans.nu && (
                    <>
                        <Text
                            className="text-[25px] text-center"
                            style={{ color: colors.text }}
                        >
                            {" "}={" "}
                        </Text>
                        <View>
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                {ans.nu}
                            </Text>
                            <View
                                className="h-[2px] my-[2px] mt-[7px]"
                                style={{ backgroundColor: colors.text }}
                            />
                            <Text
                                className="text-[25px] text-center"
                                style={{ color: colors.text }}
                            >
                                {ans.de}
                            </Text>
                        </View>
                    </>
                )}
                {opacity.mix != 0 && (
                    <View className="flex-row items-center">
                        <Text
                            className="text-[25px] text-center mr-[5px]"
                            style={{ color: colors.text }}
                        >
                            {" = "}
                            {ans?.mix}
                        </Text>
                        {ans.mixNu != 0 && (
                            <View>
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    {ans.mixNu}
                                </Text>
                                <View
                                    className="h-[2px] my-[2px] mt-[7px]"
                                    style={{ backgroundColor: colors.text }}
                                />
                                <Text
                                    className="text-[25px] text-center"
                                    style={{ color: colors.text }}
                                >
                                    {ans.mixDe}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default Proportion;
