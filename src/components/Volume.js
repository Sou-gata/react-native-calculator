import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import ThemeSelector from "../helpers/ThemeSelector";

const Volume = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
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
    const setAns = (cm, m, inc, foot, lit, gln, qnt) => {
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
            const cm = parseFloat(e);
            const m = fixed(cm * 0.000001);
            const inc = fixed(cm * 0.0610237);
            const foot = fixed(cm / 28320);
            const lit = fixed(cm * 0.001);
            const gln = fixed(cm * 0.000219969);
            const qnt = fixed(cm * 0.000879877);
            setAns(e, m, inc, foot, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeM = (e) => {
        setText({ ...text, m: e });
        if (e != "") {
            const m = parseFloat(e);
            const cm = fixed(m * 1000000);
            const inc = fixed(m * 61023.7);
            const foot = fixed(m * 35.3147);
            const lit = fixed(m * 1000);
            const gln = fixed(m * 219.969);
            const qnt = fixed(m * 879.877);
            setAns(cm, e, inc, foot, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeInch = (e) => {
        setText({ ...text, inc: e });
        if (e != "") {
            const inc = parseFloat(e);
            const cm = fixed(inc * 16.3871);
            const m = fixed(inc * 0.000016387);
            const foot = fixed(inc / 1728);
            const lit = fixed(inc * 0.0163871);
            const gln = fixed(inc * 0.00360465);
            const qnt = fixed(inc / 69.355);
            setAns(cm, m, e, foot, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeFoot = (e) => {
        setText({ ...text, foot: e });
        if (e != "") {
            const foot = parseFloat(e);
            const cm = fixed(foot * 28316.8);
            const m = fixed(foot * 0.0283168);
            const inc = fixed(foot * 1728);
            const lit = fixed(foot * 28.3168);
            const gln = fixed(foot * 6.22884);
            const qnt = fixed(foot * 24.9153);
            setAns(cm, m, inc, e, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeLit = (e) => {
        setText({ ...text, lit: e });
        if (e != "") {
            const lit = parseFloat(e);
            const cm = fixed(lit * 1000);
            const m = fixed(lit * 0.001);
            const inc = fixed(lit * 61.0237);
            const foot = fixed(lit * 0.0353147);
            const gln = fixed(lit / 4.546);
            const qnt = fixed(lit * 0.879877);
            setAns(cm, m, inc, foot, e, gln, qnt);
        } else setEmpty();
    };
    const onChangeGln = (e) => {
        setText({ ...text, gln: e });
        if (e != "") {
            const gln = parseFloat(e);
            const cm = fixed(gln * 4546.09);
            const m = fixed(gln * 0.00454609);
            const inc = fixed(gln * 277.419);
            const foot = fixed(gln * 0.160544);
            const lit = fixed(gln * 4.54609);
            const qnt = fixed(gln * 4);
            setAns(cm, m, inc, foot, lit, e, qnt);
        } else setEmpty();
    };
    const onChangeQnt = (e) => {
        setText({ ...text, qnt: e });
        if (e != "") {
            const qnt = parseFloat(e);
            const cm = fixed(qnt * 1136.52);
            const m = fixed(qnt * 0.00113652);
            const inc = fixed(qnt * 69.3549);
            const foot = fixed(qnt * 0.0401359);
            const lit = fixed(qnt * 1.13652);
            const gln = fixed(qnt * 0.25);
            setAns(cm, m, inc, foot, lit, gln, e);
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
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeM}
                        value={text.m}
                        placeholder="Meter³"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeInch}
                        value={text.inc}
                        placeholder="Inch³"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeFoot}
                        value={text.foot}
                        placeholder="Foot³"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeLit}
                        value={text.lit}
                        placeholder="Liter"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeGln}
                        value={text.gln}
                        placeholder="Imperial Gallon"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeQnt}
                        value={text.qnt}
                        placeholder="Imperial Quant"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Volume;
