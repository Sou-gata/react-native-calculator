import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { numaricToRoman } from "../../helpers/functions";
import ThemeSelector from "../../helpers/ThemeSelector";

const NumberToRoman = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState([]);
    const [number, setNumber] = useState("");
    const [opacity, setOpacity] = useState(false);
    let intNum = parseInt(number);
    intNum = isNaN(intNum) ? "" : intNum + "";
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="123"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    maxLength={7}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        if (text != "") {
                            let tempans = numaricToRoman(text);
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
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableOpacity>
            </View>
            <View style={opacity ? styles.container : { display: "none" }}>
                <Text style={styles.textStyle}>{intNum}</Text>
                <Text style={styles.textStyle}> in roman is</Text>
                <View style={styles.romanAnsContainer}>
                    {(() => {
                        let components = [];
                        for (let i = 0; i < ans.length; i++) {
                            let com = (
                                <Text
                                    key={i}
                                    style={
                                        ans[i].special
                                            ? styles.bigRoman
                                            : styles.romanText
                                    }
                                >
                                    {ans[i].val}
                                </Text>
                            );
                            components.push(com);
                        }
                        return components;
                    })()}
                </View>
            </View>
        </View>
    );
};

export default NumberToRoman;
