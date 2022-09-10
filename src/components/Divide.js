import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { checkNumbers, devide } from "../helpers/functions";
import {
    useFonts,
    RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
} from "react-native";

import styles from "../allStyles";

const Divide = () => {
    const [text, onChangeText] = useState("");
    const [vLine, setVline] = useState(0);
    const [divideAns, setDivideAns] = useState({
        spacingInfo: [0, 0],
        multipleRuselts: [],
        subResults: [],
    });
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.main}>
                <View style={[styles.container, { marginBottom: 20 }]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        autoFocus={true}
                        placeholder="123456 789"
                        placeholderTextColor={"#ffffff50"}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            let numbers = checkNumbers(text);
                            if (numbers) {
                                onChangeText("");
                                setVline(1);
                                const abc = devide(numbers[0], numbers[1]);
                                setDivideAns(abc);
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView overScrollMode="never" style={{ marginBottom: 20 }}>
                    <View style={styles.divideMath}>
                        <Text style={styles.mathText}>{divideAns.numberB}</Text>
                        <View
                            opacity={vLine}
                            style={styles.varticleLine}
                        ></View>
                        <View>
                            <Text style={styles.mathText}>
                                {divideAns.numberA}
                            </Text>
                            {(() => {
                                let element = [];
                                if (divideAns.numberA) {
                                    let tempString = "";
                                    let key = 0;
                                    for (
                                        let i = 0;
                                        i < divideAns.spacingInfo.length;
                                        i++
                                    ) {
                                        let a = divideAns.spacingInfo[i][0];
                                        tempString = "";
                                        for (let j = 0; j < a; j++) {
                                            tempString += " ";
                                        }
                                        tempString += `${divideAns.multipleRuselts[i]}`;
                                        key++;
                                        element.push(
                                            <View key={key}>
                                                <Text style={styles.mathText}>
                                                    {tempString}
                                                </Text>
                                                <View
                                                    style={styles.hrLine}
                                                ></View>
                                            </View>
                                        );
                                        tempString = "";
                                        let b = divideAns.spacingInfo[i][1];
                                        for (let j = 0; j < b; j++) {
                                            tempString += " ";
                                        }
                                        tempString += `${divideAns.subResults[i]}`;
                                        key++;
                                        element.push(
                                            <Text
                                                key={key}
                                                style={styles.mathText}
                                            >
                                                {tempString}
                                            </Text>
                                        );
                                    }
                                    return element;
                                }
                            })()}
                        </View>
                        <View
                            opacity={vLine}
                            style={styles.varticleLine}
                        ></View>
                        <Text style={styles.mathText}>{divideAns.result}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default Divide;
