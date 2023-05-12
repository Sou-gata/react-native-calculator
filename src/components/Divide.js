import React, { useState, useEffect } from "react";
import { devide } from "../helpers/functions";
import { decCheck } from "../helpers/numbersCheck";
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

import ThemeSelector from "../helpers/ThemeSelector";
const Divide = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const [text, onChangeText] = useState({ a: "", b: "" });
    const [vLine, setVline] = useState(0);
    const [divideAns, setDivideAns] = useState({
        spacingInfo: [0, 0],
        multipleRuselts: [],
        subResults: [],
    });
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
    });
    const calculatePress = () => {
        let validateA = decCheck(text.a);
        let validateB = decCheck(text.b);
        let numbers;
        if (validateA && validateB) {
            if (parseFloat(text.a) > parseFloat(text.b)) {
                numbers = [text.a, text.b];
                onChangeText({ a: "", b: "" });
                setVline(1);
                const abc = devide(numbers[0], numbers[1]);
                setDivideAns(abc);
            }
        }
    };
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={styles.main}>
                <View style={[styles.container, { marginBottom: 20 }]}>
                    <View style={styles.flexRow}>
                        <TextInput
                            style={[styles.input, { width: 125 }]}
                            onChangeText={(e) => {
                                onChangeText({ ...text, a: e });
                            }}
                            value={text.a}
                            autoFocus={true}
                            placeholder="123456"
                            placeholderTextColor={color.paceHolder}
                            keyboardType="numeric"
                        />
                        <Text style={styles.mathText}>÷</Text>
                        <TextInput
                            style={[styles.input, { width: 125 }]}
                            onChangeText={(e) => {
                                onChangeText({ ...text, b: e });
                            }}
                            value={text.b}
                            placeholder="789"
                            placeholderTextColor={color.paceHolder}
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
                    <View style={styles.divideMath}>
                        <Text style={styles.mathText}>{divideAns.numberB}</Text>
                        <View
                            style={
                                vLine
                                    ? styles.varticleLine
                                    : { display: "none" }
                            }
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
                            style={
                                vLine
                                    ? styles.varticleLine
                                    : { display: "none" }
                            }
                        ></View>
                        <Text style={styles.mathText}>{divideAns.result}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default Divide;
