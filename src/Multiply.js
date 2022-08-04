import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";

import { checkNumbers, multiple } from "./functions";

import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
} from "@expo-google-fonts/roboto-mono";

const Multiply = () => {
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
        RobotoMono_500Medium,
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
                        <Text style={styles.mathText}>X {ans.numberB}</Text>
                        <View style={styles.hrLine}></View>
                        {(() => {
                            let element = [];
                            if (ans.results)
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
                                    element.push(
                                        <Text style={styles.mathText}>
                                            {innerText}
                                        </Text>
                                    );
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
    hrLine: {
        height: 2,
        backgroundColor: "#efefef81",
        marginVertical: 2,
    },
    math: {
        alignItems: "center",
    },
    mathText: {
        fontSize: 25,
        color: "#fff",
        fontFamily: "RobotoMono_400Regular",
    },
    mathContainer: {
        padding: 20,
    },
});
