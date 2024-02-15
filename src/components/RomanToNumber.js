import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import btns from "../helpers/romanCalBtn";
import { romanToNumber, wp, hp } from "../helpers/functions";
import { useTheme, Text } from "react-native-paper";

const RomanToNumber = () => {
    const { colors } = useTheme();
    const androidRipple = {
        color: colors.secondary,
        radius: 32.5,
        borderless: true,
    };
    const [btn, setBtn] = useState([]);
    const [ans, setAns] = useState("");
    const handleBtnPress = (button) => {
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
            if (btn != []) {
                let answer = romanToNumber(btn);
                if (answer) {
                    setAns(answer);
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

    const styles = StyleSheet.create({
        displayContainer: {
            height: 150,
            alignItems: "center",
            marginTop: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            backgroundColor: colors.calBg,
            borderColor: colors.secondary,
        },
        display: {
            width: "75%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
        },
        romanText: {
            fontSize: 27,
            color: colors.secondary,
        },
        bigRoman: {
            fontSize: 27,
            borderTopWidth: 2,
            color: colors.secondary,
            borderColor: colors.secondary,
        },
        ereseRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
        ereBtns: {
            alignItems: "center",
            justifyContent: "center",
            height: hp("9.5%"),
            width: wp("40%"),
        },
        calText: {
            fontSize: 20,
            textAlign: "center",
            color: colors.text,
        },
        allBtns: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
            height: hp("75%") - 25,
        },
        calBtn: {
            width: wp("17.5%"),
            alignItems: "center",
            height: hp("9.5%"),
            justifyContent: "center",
        },
        romanCalText: {
            borderTopWidth: 1,
            fontSize: 20,
            textAlign: "center",
            borderColor: colors.secondary,
            color: colors.secondary,
        },
        calEqual: {
            width: hp("7.5%"),
            height: hp("7.5%"),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 55,
            backgroundColor: colors.secondary,
        },
        calEqualText: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
        },
    });

    return (
        <View>
            <View style={styles.displayContainer}>
                <View style={styles.display}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={styles.romanText}>{ans + ""}</Text>
                        {btn.map((text, i) => (
                            <Text
                                key={i}
                                style={
                                    text.special
                                        ? styles.bigRoman
                                        : styles.romanText
                                }>
                                {text.text}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.ereseRow}>
                <Pressable
                    style={styles.ereBtns}
                    onPress={() => {
                        erase();
                    }}
                    android_ripple={androidRipple}>
                    <Text style={styles.calText}>⌫</Text>
                </Pressable>
                <Pressable
                    style={styles.ereBtns}
                    onPress={() => {
                        setBtn([]);
                        setAns("");
                    }}
                    android_ripple={androidRipple}>
                    <Text style={styles.calText}>Clear</Text>
                </Pressable>
            </View>
            <View style={[styles.allBtns, { height: "40%" }]}>
                {btns.map((btn, i) => (
                    <Pressable
                        onPress={() => handleBtnPress(btn)}
                        style={
                            btn.text === "=" ? styles.calEqual : styles.calBtn
                        }
                        android_ripple={androidRipple}
                        key={i}>
                        <Text
                            style={
                                btn.text == "="
                                    ? styles.calEqualText
                                    : btn.special
                                      ? styles.romanCalText
                                      : styles.calText
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
