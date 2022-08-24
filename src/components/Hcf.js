import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

import { checkLcmHcfNum, gcd, inputNumbers } from "../functions";
import styles from "../allStyles";

const Hcf = () => {
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [input, setInput] = useState("");
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    autoFocus={true}
                    placeholder="10 20 30"
                    placeholderTextColor={"#ffffff50"}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        let numbers = checkLcmHcfNum(text);
                        if (numbers) {
                            let lcmAns = gcd(numbers);
                            setInput(inputNumbers(text));
                            setAns(lcmAns);
                            onChangeText("");
                            setOpacity(1);
                        }
                    }}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ansDiv} opacity={opacity}>
                <Text style={styles.textStyle}>HCF of {input} is</Text>
                <Text style={styles.textStyle}>{ans}</Text>
            </View>
        </View>
    );
};

export default Hcf;
