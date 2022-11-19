import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { permutationCombination } from "../helpers/functions";
import { useSelector } from "react-redux";
import allStylesLight, { colorWhite } from "../allStylesLight";
import allStyleDark, { colorDark } from "../allStylesDark";
let styles = allStyleDark;
let color = colorDark;

const data = [
    {
        text: "Yes",
        value: 1,
    },
    {
        text: "No",
        value: 2,
    },
];

const Permutation = () => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    color = theme.mode == "dark" ? colorDark : colorWhite;
    const [inputs, setInputs] = useState({ n: "", r: "" });
    const [operation, setOperation] = useState({ order: 1, repeat: 1 });
    const [ans, setAns] = useState({
        nuFormula: undefined,
        deFormula: undefined,
        ans: undefined,
        valueNu: undefined,
        valueDe: undefined,
    });
    const changeValues = (e, str) => {
        let temp = { ...inputs, [str]: e };
        setInputs(temp);
    };
    return (
        <View style={styles.main}>
            <View style={styles.pcTop}>
                <View style={styles.flexRow}>
                    <Text style={styles.textStyle}>n =</Text>
                    <TextInput
                        style={styles.miniInput}
                        placeholder="n"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                        onChangeText={(e) => changeValues(e, "n")}
                        value={inputs.n}
                    />
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.textStyle}>r =</Text>
                    <TextInput
                        style={styles.miniInput}
                        placeholder="r"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                        onChangeText={(e) => changeValues(e, "r")}
                        value={inputs.r}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.textStyle}>Does the order matter?</Text>
                    <RadioButton
                        data={data}
                        onSelect={(value) => {
                            setOperation({ ...operation, order: value });
                        }}
                        selected={operation.order}
                        style={styles.pcRadio}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.textStyle}>Can the items repeat?</Text>
                    <RadioButton
                        data={data}
                        onSelect={(value) => {
                            setOperation({ ...operation, repeat: value });
                        }}
                        selected={operation.repeat}
                        style={styles.pcRadio}
                    />
                </View>
                <View style={styles.flexRow}>
                    <TouchableHighlight
                        style={styles.btn}
                        onPress={() => {
                            let ans = permutationCombination(inputs, operation);
                            setAns(ans);
                        }}
                    >
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableHighlight>
                </View>
            </View>
            {ans.ans && (
                <View>
                    <View style={styles.pcAnsRow}>
                        <Text style={styles.textStyle}>Formula = </Text>
                        <View>
                            <Text style={styles.textStyle}>
                                {ans.nuFormula}
                            </Text>
                            {ans.deFormula && <View style={styles.hr}></View>}
                            {ans.deFormula && (
                                <Text style={styles.textStyle}>
                                    {ans.deFormula}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.pcAnsRow}>
                        <Text style={[styles.textStyle, { opacity: 0 }]}>
                            Formula
                        </Text>
                        <Text style={styles.textStyle}> = </Text>
                        <View>
                            <Text style={styles.textStyle}>{ans.valueNu}</Text>
                            {ans.deFormula && <View style={styles.hr}></View>}
                            {ans.deFormula && (
                                <Text style={styles.textStyle}>
                                    {ans.valueDe}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={[styles.pcAnsRow, { marginTop: 25 }]}>
                        <Text style={styles.textStyle}>Answer = </Text>
                        <Text style={styles.textStyle}>{ans.ans}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Permutation;
