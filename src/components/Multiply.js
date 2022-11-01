import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState } from "react";

import { multiple } from "../helpers/functions";
import { decCheck } from "../helpers/numbersCheck";
import styles from "../allStyles";

import {
    useFonts,
    RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";

const Multiply = () => {
    const [text, onChangeText] = useState({ a: "", b: "" });
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
    });
    const calculatePress = () => {
        let validateA = decCheck(text.a);
        let validateB = decCheck(text.b);
        let numbers;
        if (validateA && validateB) {
            numbers = [text.a, text.b];
            onChangeText({ a: "", b: "" });
            let output = multiple(numbers[0], numbers[1]);
            setAns(output);
            setOpacity(1);
        }
    };
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <View style={styles.flexRow}>
                        <TextInput
                            style={[styles.input, { width: 125 }]}
                            onChangeText={(e) => {
                                onChangeText({ ...text, a: e });
                            }}
                            value={text.a}
                            autoFocus={true}
                            placeholder="123"
                            placeholderTextColor={"#ffffff50"}
                            keyboardType="numeric"
                        />
                        <Text style={styles.mathText}>×</Text>
                        <TextInput
                            style={[styles.input, { width: 125 }]}
                            onChangeText={(e) => {
                                onChangeText({ ...text, b: e });
                            }}
                            value={text.b}
                            placeholder="456"
                            placeholderTextColor={"#ffffff50"}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={calculatePress}
                    >
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView overScrollMode="never" style={{ marginBottom: 20 }}>
                    <View opacity={opacity} style={styles.math}>
                        <View style={styles.mathContainer}>
                            <Text style={styles.mathText}>
                                {"  "}
                                {ans.numberA}
                            </Text>
                            <Text style={styles.mathText}>x {ans.numberB}</Text>
                            <View style={styles.hrLine}></View>
                            {(() => {
                                let element = [];

                                if (ans.results) {
                                    let key = 1;
                                    for (
                                        let i = 0;
                                        i < ans.results.length;
                                        i++
                                    ) {
                                        let innerText = "";
                                        let space = "";
                                        for (
                                            let j = 0;
                                            j < ans.results.length - i - 1;
                                            j++
                                        ) {
                                            space += " ";
                                        }
                                        innerText += `${space}${ans.results[i]}`;
                                        key++;
                                        element.push(
                                            <Text
                                                key={key}
                                                style={styles.mathText}
                                            >
                                                {innerText}
                                            </Text>
                                        );
                                    }
                                }
                                return element;
                            })()}
                            <View style={styles.hrLine}></View>
                            <Text style={styles.mathText}>{ans.ans}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default Multiply;
