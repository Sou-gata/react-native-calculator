import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { checkNumbers, devide } from "./functions";
import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
} from "@expo-google-fonts/roboto-mono";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";

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
                                setVline(1);
                                const abc = devide(numbers[0], numbers[1]);
                                setDivideAns(abc);
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divideMath}>
                    <Text style={styles.mathText}>{divideAns.numberB}</Text>
                    <View opacity={vLine} style={styles.varticleLine}></View>
                    <View>
                        <Text style={styles.mathText}>{divideAns.numberA}</Text>
                        {(() => {
                            let element = [];
                            if (divideAns.numberA) {
                                let tempString = "";
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
                                    element.push(
                                        <>
                                            <Text style={styles.mathText}>
                                                {tempString}
                                            </Text>
                                            <View style={styles.hrLine}></View>
                                        </>
                                    );
                                    tempString = "";
                                    let b = divideAns.spacingInfo[i][1];
                                    for (let j = 0; j < b; j++) {
                                        tempString += " ";
                                    }
                                    tempString += `${divideAns.subResults[i]}`;
                                    element.push(
                                        <Text style={styles.mathText}>
                                            {tempString}
                                        </Text>
                                    );
                                }
                                return element;
                            }
                        })()}
                    </View>
                    <View opacity={vLine} style={styles.varticleLine}></View>
                    <Text style={styles.mathText}>{divideAns.result}</Text>
                </View>
            </View>
        );
    }
};

export default Divide;

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
    text: {
        color: "#fff",
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

    text: {
        color: "#fff",
        fontSize: 20,
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
    varticleLine: {
        width: 2,
        height: 30,
        backgroundColor: "#fff",
        marginHorizontal: 4,
    },
    mathText: {
        fontSize: 25,
        color: "#fff",
        fontFamily: "RobotoMono_400Regular",
    },
    divideMath: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 35,
        fontFamily: "RobotoMono_400Regular",
    },
    hrLine: {
        flexGrow: 1,
        height: 2,
        backgroundColor: "#efefef81",
        marginVertical: 2,
    },
});
