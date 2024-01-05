import { StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { devide, wp } from "../helpers/functions";
import { decCheck } from "../helpers/numbersCheck";
import CustomInput from "../components/CustomInput";

const Divide = () => {
    const { colors } = useTheme();

    const mathText = [styles.mathText, { color: colors.text }];
    const varticleLine = [
        styles.varticleLine,
        { backgroundColor: colors.text },
    ];
    const hrLine = [styles.hrLine, { backgroundColor: colors.text }];

    const [text, onChangeText] = useState({ a: "", b: "" });
    const [vLine, setVline] = useState(0);
    const [divideAns, setDivideAns] = useState({
        spacingInfo: [0, 0],
        multipleRuselts: [],
        subResults: [],
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
    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor,
                flex: 1,
            }}>
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <CustomInput
                        onChangeText={e => {
                            onChangeText({ ...text, a: e });
                        }}
                        value={text.a}
                        placeholder="123456"
                        width={125}
                    />
                    <Text style={mathText}>÷</Text>
                    <CustomInput
                        onChangeText={e => {
                            onChangeText({ ...text, b: e });
                        }}
                        value={text.b}
                        placeholder="789"
                        width={125}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={calculatePress}
                        buttonColor={colors.secondary}
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            <ScrollView overScrollMode="never" style={{ marginBottom: 20 }}>
                <View style={styles.divideMath}>
                    <Text style={mathText}>{divideAns.numberB}</Text>
                    <View
                        style={
                            vLine ? varticleLine : { display: "none" }
                        }></View>
                    <View>
                        <Text style={mathText}>{divideAns.numberA}</Text>
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
                                            <Text style={mathText}>
                                                {tempString}
                                            </Text>
                                            <View style={hrLine}></View>
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
                                        <Text key={key} style={mathText}>
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
                            vLine ? varticleLine : { display: "none" }
                        }></View>
                    <Text style={mathText}>{divideAns.result}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Divide;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        flexDirection: "column",
        justifyContent: "center",
        width: wp("100%"),
        paddingHorizontal: 25,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: wp("100%") - 50,
    },
    mathText: {
        fontSize: 25,
        fontFamily: "RobotoMono_400Regular",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    divideMath: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 35,
        fontFamily: "RobotoMono_400Regular",
    },
    varticleLine: {
        width: 2,
        height: 30,
        marginHorizontal: 4,
    },
    hrLine: {
        height: 2,
        marginVertical: 2,
        marginTop: 7,
    },
});
