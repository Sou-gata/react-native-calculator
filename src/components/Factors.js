import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { factors } from "../helpers/functions";

import { useSelector } from "react-redux";
import allStylesLight, { colorWhite } from "../allStylesLight";
import allStyleDark, { colorDark } from "../allStylesDark";
let styles = allStyleDark;
let color = colorDark;
const Factors = () => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    color = theme.mode == "dark" ? colorDark : colorWhite;
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    autoFocus={true}
                    placeholder="123"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        let numbers = parseInt(text);
                        if (!isNaN(numbers)) {
                            onChangeText("");
                            let output = factors(text);
                            setAns(output);
                            setOpacity(1);
                        }
                    }}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ansDiv} opacity={opacity}>
                <Text style={styles.textStyle}>
                    Factors of {ans.number} are :
                </Text>
                <Text style={styles.textStyleOrange}>{ans.str}</Text>
            </View>
        </View>
    );
};

export default Factors;
