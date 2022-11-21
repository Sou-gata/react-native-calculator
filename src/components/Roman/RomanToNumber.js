import { View, Text, Pressable } from "react-native";
import btns from "../../helpers/romanCalBtn";
import { romanToNumber } from "../../helpers/functions";
import React, { useEffect, useState } from "react";
import ThemeSelector from "../../helpers/ThemeSelector";

const RomanToNumber = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const androidRipple = {
        color: color.primary,
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

    return (
        <View style={styles.main}>
            <View style={styles.displayContainer}>
                <View style={styles.display}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={styles.romanText}>{ans + ""}</Text>
                        {(() => {
                            let components = [];
                            for (let i = 0; i < btn.length; i++) {
                                let com;
                                if (btn[i].special) {
                                    com = (
                                        <Text key={i} style={styles.bigRoman}>
                                            {btn[i].text}
                                        </Text>
                                    );
                                } else {
                                    com = (
                                        <Text key={i} style={styles.romanText}>
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
                    <Text style={styles.calText}>⌫</Text>
                </Pressable>
                <Pressable
                    style={styles.ereBtns}
                    onPress={() => {
                        setBtn([]);
                        setAns("");
                    }}
                    android_ripple={androidRipple}
                >
                    <Text style={styles.calText}>Clear</Text>
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
                                    style={btn.btnStyle}
                                    android_ripple={androidRipple}
                                    key={i}
                                >
                                    <Text
                                        style={
                                            btn.special
                                                ? styles.romanCalText
                                                : styles.calText
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
                                    style={styles.calEqual}
                                    android_ripple={androidRipple}
                                    key={i}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: "bold",
                                            color: color.btnTxt,
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
