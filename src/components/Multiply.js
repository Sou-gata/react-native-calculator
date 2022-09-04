import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";

import { checkNumbers, multiple } from "../helpers/functions";
import styles from "../allStyles";

import {
    useFonts,
    RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";

const Multiply = () => {
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        autoFocus={true}
                        placeholder="123 456"
                        placeholderTextColor={"#ffffff50"}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            let numbers = checkNumbers(text);
                            if (numbers) {
                                onChangeText("");
                                let output = multiple(numbers[0], numbers[1]);
                                setAns(output);
                                setOpacity(1);
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
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
                                for (let i = 0; i < ans.results.length; i++) {
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
                                        <Text key={key} style={styles.mathText}>
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
            </View>
        );
    }
};

export default Multiply;
