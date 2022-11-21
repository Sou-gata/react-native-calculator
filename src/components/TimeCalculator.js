import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState, useEffect } from "react";
import RadioButton from "./RadioButton";
import { calculateTime } from "../helpers/functions";
import ThemeSelector from "../helpers/ThemeSelector";

const TimeCalculator = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const data = [
        {
            text: "Add (+)",
            value: 1,
        },
        {
            text: "Subtract (-)",
            value: 2,
        },
    ];

    const [inputs, setInputs] = useState({
        d1: "",
        h1: "",
        m1: "",
        s1: "",
        d2: "",
        h2: "",
        m2: "",
        s2: "",
    });
    const [operation, setOperation] = useState(1);
    const changeValues = (e, position) => {
        setInputs({ ...inputs, [position]: e });
    };
    const [ans, setAns] = useState({
        day: undefined,
        hou: undefined,
        min: undefined,
        sec: undefined,
    });

    return (
        <View style={styles.main}>
            <View style={[styles.flexRow, { marginTop: 20 }]}>
                <View style={styles.timeHeadText}>
                    <Text style={styles.equText}>Days</Text>
                </View>
                <View style={styles.timeHeadText}>
                    <Text style={styles.equText}>Hours</Text>
                </View>
                <View style={styles.timeHeadText}>
                    <Text style={styles.equText}>Minutes</Text>
                </View>
                <View style={styles.timeHeadText}>
                    <Text style={styles.equText}>Seconds</Text>
                </View>
            </View>
            <View style={[styles.flexRow, { justifyContent: "space-around" }]}>
                <TextInput
                    style={styles.miniInput}
                    placeholder="day"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "d1")}
                    value={inputs.d1}
                />
                <TextInput
                    style={styles.miniInput}
                    placeholder="hour"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "h1")}
                    value={inputs.h1}
                />
                <TextInput
                    style={styles.miniInput}
                    placeholder="min"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "m1")}
                    value={inputs.m1}
                />
                <TextInput
                    style={styles.miniInput}
                    placeholder="sec"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "s1")}
                    value={inputs.s1}
                />
            </View>
            <RadioButton
                data={data}
                onSelect={(value) => {
                    setOperation(value);
                }}
                selected={operation}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginVertical: 10,
                }}
            />
            <View style={[styles.flexRow, { justifyContent: "space-around" }]}>
                <TextInput
                    style={styles.miniInput}
                    placeholder="day"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "d2")}
                    value={inputs.d2}
                />
                <TextInput
                    style={styles.miniInput}
                    placeholder="hour"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "h2")}
                    value={inputs.h2}
                />
                <TextInput
                    style={styles.miniInput}
                    placeholder="min"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "m2")}
                    value={inputs.m2}
                />
                <TextInput
                    style={styles.miniInput}
                    placeholder="sec"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "s2")}
                    value={inputs.s2}
                />
            </View>
            <View style={styles.flexRow}>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        let answer = calculateTime(inputs, operation);
                        setAns(answer);
                    }}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableHighlight>
            </View>
            {ans.day >= 0 && (
                <View style={[styles.flexRow, { marginTop: 30 }]}>
                    {ans.day > 0 && (
                        <Text style={styles.calTextOrange}>{ans.day}</Text>
                    )}
                    {ans.day > 0 && <Text style={styles.equText}> Days</Text>}
                    {ans.hou > 0 && (
                        <Text style={styles.calTextOrange}> {ans.hou}</Text>
                    )}
                    {ans.hou > 0 && <Text style={styles.equText}> Hours</Text>}
                    {ans.min > 0 && (
                        <Text style={styles.calTextOrange}> {ans.min}</Text>
                    )}
                    {ans.min > 0 && (
                        <Text style={styles.equText}> Minutes</Text>
                    )}
                    {ans.sec > 0 && (
                        <Text style={styles.calTextOrange}> {ans.sec}</Text>
                    )}
                    {ans.sec > 0 && (
                        <Text style={styles.equText}> Seconds</Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default TimeCalculator;
