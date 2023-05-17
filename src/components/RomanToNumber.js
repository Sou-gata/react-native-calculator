import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import btns from "../helpers/romanCalBtn";
import { romanToNumber } from "../helpers/functions";
import { useTheme, Text } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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

    const displayContainer = [
        styles.displayContainer,
        { backgroundColor: colors.calBg, borderColor: colors.secondary },
    ];
    const calText = [styles.calText, { color: colors.text }];

    return (
        <View>
            <View style={displayContainer}>
                <View style={styles.display}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text
                            style={[
                                styles.romanText,
                                { color: colors.secondary },
                            ]}
                        >
                            {ans + ""}
                        </Text>
                        {(() => {
                            let components = [];
                            for (let i = 0; i < btn.length; i++) {
                                let com;
                                if (btn[i].special) {
                                    com = (
                                        <Text
                                            key={i}
                                            style={[
                                                styles.bigRoman,
                                                {
                                                    color: colors.secondary,
                                                    borderColor:
                                                        colors.secondary,
                                                },
                                            ]}
                                        >
                                            {btn[i].text}
                                        </Text>
                                    );
                                } else {
                                    com = (
                                        <Text
                                            key={i}
                                            style={[
                                                styles.romanText,
                                                { color: colors.secondary },
                                            ]}
                                        >
                                            {btn[i].text}
                                        </Text>
                                    );
                                }
                                components.push(com);
                            }
                            return components;
                        })()}
                    </View>
                </View>
            </View>
            <View style={styles.ereseRow}>
                <Pressable
                    style={styles.ereBtns}
                    onPress={() => {
                        erase();
                    }}
                    android_ripple={androidRipple}
                >
                    <Text style={calText}>⌫</Text>
                </Pressable>
                <Pressable
                    style={styles.ereBtns}
                    onPress={() => {
                        setBtn([]);
                        setAns("");
                    }}
                    android_ripple={androidRipple}
                >
                    <Text style={calText}>Clear</Text>
                </Pressable>
            </View>
            <View style={[styles.allBtns, { height: "40%" }]}>
                {(() => {
                    let components = [];
                    for (let i = 0; i < btns.length; i++) {
                        let btn = btns[i];
                        let com;
                        if (btn.text != "=") {
                            com = (
                                <Pressable
                                    onPress={() => handleBtnPress(btn)}
                                    style={styles.calBtn}
                                    android_ripple={androidRipple}
                                    key={i}
                                >
                                    <Text
                                        style={
                                            btn.special
                                                ? [
                                                      styles.romanCalText,
                                                      {
                                                          borderColor:
                                                              colors.secondary,
                                                          color: colors.secondary,
                                                      },
                                                  ]
                                                : calText
                                        }
                                    >
                                        {btn.text}
                                    </Text>
                                </Pressable>
                            );
                        } else {
                            com = (
                                <Pressable
                                    onPress={() => handleBtnPress(btn)}
                                    style={[
                                        styles.calEqual,
                                        { backgroundColor: colors.secondary },
                                    ]}
                                    android_ripple={androidRipple}
                                    key={i}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: "bold",
                                            color: colors.text,
                                            textAlign: "center",
                                        }}
                                    >
                                        {btn.text}
                                    </Text>
                                </Pressable>
                            );
                        }
                        components.push(com);
                    }
                    return components;
                })()}
            </View>
        </View>
    );
};

export default RomanToNumber;

const styles = StyleSheet.create({
    displayContainer: {
        height: 150,
        alignItems: "center",
        marginTop: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
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
    },
    bigRoman: {
        fontSize: 27,
        borderTopWidth: 2,
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
    },
    calEqual: {
        width: hp("7.5%"),
        height: hp("7.5%"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 55,
    },
});
