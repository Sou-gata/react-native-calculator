import { Text, View } from "react-native";
import { useState } from "react";
import { numaricToRoman } from "../helpers/functions";
import { useTheme, Button } from "react-native-paper";
import CustomInput from "./CustomInput";
import { colorSchemeType, numberToRomanType } from "../../types";

const NumberToRoman = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState<numberToRomanType[]>([]);
    const [number, setNumber] = useState("");
    const [opacity, setOpacity] = useState(false);
    let num = parseInt(number);
    let intNum = isNaN(num) ? "" : num + "";

    return (
        <View>
            <View className="mt-[29px] items-center justify-center">
                <CustomInput
                    placeholder="123"
                    onChangeText={onChangeText}
                    value={text}
                    maxLength={7}
                />
                <View className="items-center mt-[30px]">
                    <Button
                        mode="contained"
                        onPress={() => {
                            if (text != "") {
                                let tempans = numaricToRoman(parseInt(text));
                                if (tempans[0]) {
                                    if (tempans[0].val != "") {
                                        setAns(tempans);
                                        setNumber(text);
                                        setOpacity(true);
                                        onChangeText("");
                                    } else {
                                        setOpacity(false);
                                    }
                                } else {
                                    setOpacity(false);
                                }
                            }
                        }}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <View className={opacity ? "mt-[29px] items-center justify-center" : "hidden"}>
                <Text
                    className="text-[25px] text-center"
                    style={{ color: colors.text }}
                >
                    {intNum}
                </Text>
                <Text
                    className="text-[25px] text-center"
                    style={{ color: colors.text }}
                >
                    {" "}in roman is
                </Text>
                <View className="flex-row mt-[25px]">
                    {ans.map((text, i) => (
                        <Text
                            key={i}
                            className={text.special ? "text-[27px] border-t-2" : "text-[27px]"}
                            style={{
                                color: colors.secondary,
                                borderColor: text.special ? colors.secondary : undefined,
                            }}
                        >
                            {text.val}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default NumberToRoman;
