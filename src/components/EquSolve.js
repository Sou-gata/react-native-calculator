import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";

import { equSolve } from "../helpers/functions";
import { useSelector } from "react-redux";
import allStylesLight, { colorWhite } from "../allStylesLight";
import allStyleDark, { colorDark } from "../allStylesDark";
let styles = allStyleDark;
let color = colorDark;

const EquSolve = () => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    color = theme.mode == "dark" ? colorDark : colorWhite;
    const [val, setVal] = useState({
        a1: "",
        a2: "",
        b1: "",
        b2: "",
        c1: "",
        c2: "",
    });
    const [finalAns, setFinalAns] = useState({
        numeratorX: undefined,
        denominatorX: undefined,
        numeratorY: undefined,
        denominatorY: undefined,
        x: undefined,
        y: undefined,
        noSolution: undefined,
        manySolution: undefined,
    });
    const changeValues = (e, place) => setVal({ ...val, [place]: e });

    return (
        <View style={styles.main}>
            <View style={styles.flexRow}>
                <TextInput
                    style={styles.miniInput}
                    placeholder="a1"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "a1")}
                    value={val.a1}
                />
                <Text style={styles.equText}>x +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="b1"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "b1")}
                    value={val.b1}
                />
                <Text style={styles.equText}>y +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="c1"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "c1")}
                    value={val.c1}
                />
                <Text style={styles.equText}>= 0</Text>
            </View>
            <View style={styles.flexRow}>
                <TextInput
                    style={styles.miniInput}
                    placeholder="a2"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "a2")}
                    value={val.a2}
                />
                <Text style={styles.equText}>x +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="b2"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "b2")}
                    value={val.b2}
                />
                <Text style={styles.equText}>y +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="c2"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "c2")}
                    value={val.c2}
                />
                <Text style={styles.equText}>= 0</Text>
            </View>
            <View style={[styles.flexRow, { justifyContent: "space-evenly" }]}>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        equSolve(
                            val.a1,
                            val.a2,
                            val.b1,
                            val.b2,
                            val.c1,
                            val.c2,
                            setFinalAns
                        );
                    }}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        setVal({
                            a1: "",
                            a2: "",
                            b1: "",
                            b2: "",
                            c1: "",
                            c2: "",
                        });
                        setFinalAns({
                            numeratorX: undefined,
                            denominatorX: undefined,
                            numeratorY: undefined,
                            denominatorY: undefined,
                            x: undefined,
                            y: undefined,
                            noSolution: undefined,
                            manySolution: undefined,
                        });
                    }}
                >
                    <Text style={styles.btnText}>Clear</Text>
                </TouchableHighlight>
            </View>
            <View style={{ marginTop: 30 }}>
                {finalAns.noSolution && (
                    <Text style={styles.textStyle}>No Solution</Text>
                )}
                {finalAns.manySolution && (
                    <Text style={styles.textStyle}>Many Solution</Text>
                )}
                <View style={styles.flexRow}>
                    {(finalAns.numeratorX || finalAns.numeratorX == 0) && (
                        <Text style={styles.textStyle}>
                            x = {finalAns.numeratorX}
                        </Text>
                    )}
                    {finalAns.denominatorX && (
                        <Text style={styles.textStyle}>
                            /{finalAns.denominatorX}
                        </Text>
                    )}
                </View>
                <View style={styles.flexRow}>
                    {(finalAns.numeratorY || finalAns.numeratorY == 0) && (
                        <Text style={styles.textStyle}>
                            y = {finalAns.numeratorY}
                        </Text>
                    )}
                    {finalAns.denominatorY && (
                        <Text style={styles.textStyle}>
                            /{finalAns.denominatorY}
                        </Text>
                    )}
                </View>
                {(finalAns.x || finalAns.x == 0) && (
                    <View>
                        <Text
                            style={[styles.textStyle, { marginVertical: 20 }]}
                        >
                            Or
                        </Text>
                        <Text style={styles.textStyle}>x = {finalAns.x}</Text>
                        <Text style={styles.textStyle}>y = {finalAns.y}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default EquSolve;
