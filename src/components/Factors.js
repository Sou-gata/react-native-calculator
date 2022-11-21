import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { factors } from "../helpers/functions";

import ThemeSelector from "../helpers/ThemeSelector";
const Factors = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
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
