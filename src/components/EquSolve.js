import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";
import { equSolve } from "../helpers/functions";

const EquSolve = () => {
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
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "a1")}
                    value={val.a1}
                />
                <Text style={styles.equText}>x +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="b1"
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "b1")}
                    value={val.b1}
                />
                <Text style={styles.equText}>y +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="c1"
                    placeholderTextColor={"#ffffff50"}
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
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "a2")}
                    value={val.a2}
                />
                <Text style={styles.equText}>x +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="b2"
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "b2")}
                    value={val.b2}
                />
                <Text style={styles.equText}>y +</Text>
                <TextInput
                    style={styles.miniInput}
                    placeholder="c2"
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                    onChangeText={(e) => changeValues(e, "c2")}
                    value={val.c2}
                />
                <Text style={styles.equText}>= 0</Text>
            </View>
            <View style={styles.flexRow}>
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
            </View>
            <View style={{ marginTop: 30 }}>
                {finalAns.noSolution && (
                    <Text style={styles.textStyle}>No Solution</Text>
                )}
                {finalAns.manySolution && (
                    <Text style={styles.textStyle}>Many Solution</Text>
                )}
                <View style={styles.flexRow}>
                    {finalAns.numeratorX && (
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
                    {finalAns.numeratorY && (
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
                {finalAns.x && (
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
