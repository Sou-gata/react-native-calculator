import { View, Pressable } from "react-native";
import { useState } from "react";
import btns from "../helpers/romanCalBtn";
import { romanToNumber, wp, hp } from "../helpers/functions";
import { useTheme, Text } from "react-native-paper";
import { colorSchemeType, romanCalBtnType } from "../../types";

const RomanToNumber = () => {
    const { colors } = useTheme<colorSchemeType>();
    const androidRipple = {
        color: colors.secondary,
        radius: 32.5,
        borderless: true,
    };
    const [btn, setBtn] = useState<romanCalBtnType[]>([]);
    const [ans, setAns] = useState("");
    const handleBtnPress = (button: romanCalBtnType) => {
        if (button.str != "equ") {
            let tempBtn = {
                str: button.str,
                text: button.text,
                special: button.special,
                len: button.len,
            };
            setBtn([...btn, tempBtn]);
            setAns("");
        } else {
            if (btn.length != 0) {
                let answer = romanToNumber(btn);
                if (answer) {
                    setAns(answer.toString());
                    setBtn([]);
                }
            }
        }
    };
    const erase = () => {
        let tempBtn = [...btn];
        tempBtn = tempBtn.slice(0, -1);
        setBtn(tempBtn);
        setAns("");
    };

    return (
        <View>
            <View
                className="h-[150px] items-center mt-2.5 border-t border-b"
                style={{
                    backgroundColor: colors.calBg,
                    borderColor: colors.secondary,
                }}
            >
                <View className="w-[75%] h-full items-center justify-center flex-row">
                    <View className="flex-row flex-wrap">
                        <Text
                            className="text-[27px]"
                            style={{ color: colors.secondary }}
                        >
                            {ans + ""}
                        </Text>
                        {btn.map((text, i) => (
                            <Text
                                key={i}
                                className={text.special ? "text-[27px] border-t-2" : "text-[27px]"}
                                style={{
                                    color: colors.secondary,
                                    borderColor: text.special ? colors.secondary : undefined,
                                }}
                            >
                                {text.text}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
            <View className="flex-row items-center justify-around">
                <Pressable
                    className="items-center justify-center"
                    style={{ height: hp("9.5%"), width: wp("40%") }}
                    onPress={() => {
                        erase();
                    }}
                    android_ripple={androidRipple}>
                    <Text
                        className="text-[20px] text-center"
                        style={{ color: colors.text }}
                    >
                        ⌫
                    </Text>
                </Pressable>
                <Pressable
                    className="items-center justify-center"
                    style={{ height: hp("9.5%"), width: wp("40%") }}
                    onPress={() => {
                        setBtn([]);
                        setAns("");
                    }}
                    android_ripple={androidRipple}>
                    <Text
                        className="text-[20px] text-center"
                        style={{ color: colors.text }}
                    >
                        Clear
                    </Text>
                </Pressable>
            </View>
            <View className="flex-row flex-wrap items-center px-5 h-[40%]">
                {btns.map((btn, i) => (
                    <Pressable
                        onPress={() => handleBtnPress(btn)}
                        className={
                            btn.text === "="
                                ? "justify-center items-center rounded-[55px]"
                                : "items-center justify-center"
                        }
                        style={
                            btn.text === "="
                                ? { width: hp("7.5%"), height: hp("7.5%"), backgroundColor: colors.secondary }
                                : { width: wp("17.5%"), height: hp("9.5%") }
                        }
                        android_ripple={androidRipple}
                        key={i}>
                        <Text
                            className={
                                btn.text == "="
                                    ? "text-2xl font-bold text-white text-center"
                                    : btn.special
                                    ? "border-t text-[20px] text-center"
                                    : "text-[20px] text-center"
                            }
                            style={
                                btn.text == "="
                                    ? undefined
                                    : btn.special
                                    ? { borderColor: colors.secondary, color: colors.secondary }
                                    : { color: colors.text }
                            }>
                            {btn.text}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default RomanToNumber;
