import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import React, { useState } from "react";

import { checkLcmHcfNum, gcd, inputNumbers } from "./functions";

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

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#333",
    },
    container: {
        marginTop: 29,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 50,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 20,
        borderRadius: 50,
        color: "#fff",
        borderColor: "#efefef81",
        textAlign: "center",
    },
    btn: {
        marginTop: 25,
        width: 100,
        height: 33,
        borderColor: "#efefef81",
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 33,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
    },
    textStyle: {
        fontSize: 25,
        color: "#fff",
    },
    ansDiv: {
        alignItems: "center",
        padding: 20,
    },
});
