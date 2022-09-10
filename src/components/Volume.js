import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";

const Volume = () => {
    const [text, setText] = useState({
        cm: "",
        m: "",
        inc: "",
        foot: "",
        lit: "",
        gln: "",
        qnt: "",
    });

    const setEmpty = () => {
        setText({
            cm: "",
            m: "",
            inc: "",
            foot: "",
            lit: "",
            gln: "",
            qnt: "",
        });
    };
    const setAns = (cm, m, inc, foot, gln, qnt) => {
        setText({
            cm,
            m,
            inc,
            foot,
            lit,
            gln,
            qnt,
        });
    };

    const fixed = (val) => {
        let fxt = parseFloat(val.toFixed(5)) + "";
        return fxt;
    };

    const onChangeCm = (e) => {
        setText({ ...text, cm: e });
        if (e != "") {
        } else setEmpty();
    };
    const onChangeM = (e) => {
        setText({ ...text, m: e });
        if (e != "") {
        } else setEmpty();
    };
    const onChangeInch = (e) => {
        setText({ ...text, inc: e });
        if (e != "") {
        } else setEmpty();
    };
    const onChangeFoot = (e) => {
        setText({ ...text, foot: e });
        if (e != "") {
        } else setEmpty();
    };
    const onChangeLit = (e) => {
        setText({ ...text, lit: e });
        if (e != "") {
        } else setEmpty();
    };
    const onChangeGln = (e) => {
        setText({ ...text, gln: e });
        if (e != "") {
        } else setEmpty();
    };
    const onChangeQnt = (e) => {
        setText({ ...text, qnt: e });
        if (e != "") {
        } else setEmpty();
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.ageRow}>
                <View style={styles.areaClmContainer}>
                    <Text style={styles.inputLeftText}>cm³</Text>
                    <Text style={styles.inputLeftText}>m³</Text>
                    <Text style={styles.inputLeftText}>inch³</Text>
                    <Text style={styles.inputLeftText}>feet³</Text>
                    <Text style={styles.inputLeftText}>Liter</Text>
                    <Text style={styles.inputLeftText}>Imp Gallon</Text>
                    <Text style={styles.inputLeftText}>Imp Quant</Text>
                </View>
                <View style={styles.areaClmContainer}>
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeCm}
                        value={text.cm}
                        placeholder="Centimeter³"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeM}
                        value={text.m}
                        placeholder="Meter³"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeInch}
                        value={text.inc}
                        placeholder="Inch³"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeFoot}
                        value={text.foot}
                        placeholder="Foot³"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeLit}
                        value={text.lit}
                        placeholder="Liter"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeGln}
                        value={text.gln}
                        placeholder="Imperial Gallon"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeQnt}
                        value={text.qnt}
                        placeholder="Imperial Quant"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Volume;
