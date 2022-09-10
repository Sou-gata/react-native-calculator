import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";

const Area = () => {
    const [text, setText] = useState({
        cm: "",
        m: "",
        inc: "",
        foot: "",
        yard: "",
        acre: "",
        mile: "",
    });

    const fixed = (val) => {
        let fxt = parseFloat(val.toFixed(5)) + "";
        return fxt;
    };

    const setValues = (cm, m, inc, foot, yard, acre, mile) => {
        setText({ cm, m, inc, foot, yard, acre, mile });
    };
    const setEmpty = () => {
        setText({
            cm: "",
            m: "",
            inc: "",
            foot: "",
            yard: "",
            acre: "",
            mile: "",
        });
    };

    const onChangeCm = (e) => {
        setText({ ...text, cm: e });
        if (e != "") {
            const cm = parseFloat(e);
            const m = fixed(cm * 0.0001);
            const inc = fixed(cm * 0.155);
            const foot = fixed(cm / 929);
            const yard = fixed(cm / 8361);
            const acre = fixed(cm * 0.000000024711);
            const mile = fixed(cm * 0.00000000003861);
            setValues(e, m, inc, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeM = (e) => {
        setText({ ...text, m: e });
        if (e != "") {
            const m = parseFloat(e);
            const cm = fixed(m * 10000);
            const inc = fixed(m * 1550);
            const foot = fixed(m * 10.7639);
            const yard = fixed(m * 19599);
            const acre = fixed(m * 0.000247105);
            const mile = fixed(m * 0.0000003861);
            setValues(cm, e, inc, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeInch = (e) => {
        setText({ ...text, inc: e });
        if (e != "") {
            const inc = parseFloat(e);
            const cm = fixed(inc * 6.4516);
            const m = fixed(inc * 0.00064516);
            const foot = fixed(inc * 0.00694444);
            const yard = fixed(inc * 0.000771605);
            const acre = fixed(inc * 0.00000015942);
            const mile = fixed(inc * 0.0000000002491);
            setValues(cm, m, e, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeFoot = (e) => {
        setText({ ...text, foot: e });
        if (e != "") {
            const foot = parseFloat(e);
            const cm = fixed(foot * 929.03);
            const m = fixed(foot * 0.092903);
            const inc = fixed(foot * 144);
            const yard = fixed(foot / 9);
            const acre = fixed(foot / 43560);
            const mile = fixed(foot * 0.00000003587);
            setValues(cm, m, inc, e, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeYard = (e) => {
        setText({ ...text, yard: e });
        if (e != "") {
            const yard = parseFloat(e);
            const cm = fixed(yard * 8361.27);
            const m = fixed(yard * 0.836127);
            const inc = fixed(yard * 1296);
            const foot = fixed(yard * 9);
            const acre = fixed(yard / 4840);
            const mile = fixed(yard * 0.000003098);
            setValues(cm, m, inc, foot, e, acre, mile);
        } else setEmpty();
    };
    const onChangeAcre = (e) => {
        setText({ ...text, acre: e });
        if (e != "") {
            const acre = parseFloat(e);
            const cm = fixed(acre * 40470000);
            const m = fixed(acre * 4046.86);
            const inc = fixed(acre * 6273000);
            const foot = fixed(acre * 43560);
            const yard = fixed(acre * 4840);
            const mile = fixed(acre / 640);
            setValues(cm, m, inc, foot, yard, e, mile);
        } else setEmpty();
    };
    const onChangeMile = (e) => {
        setText({ ...text, mile: e });
        if (e != "") {
            const mile = parseFloat(e);
            const cm = fixed(mile * 25900000000);
            const m = fixed(mile * 2590000);
            const inc = fixed(mile * 4014000000);
            const foot = fixed(mile * 27880000);
            const yard = fixed(mile * 3098000);
            const acre = fixed(mile * 640);
            setValues(cm, m, inc, foot, yard, acre, e);
        } else setEmpty();
    };

    return (
        <View style={styles.main}>
            <View style={styles.ageRow}>
                <View style={styles.areaClmContainer}>
                    <Text style={styles.inputLeftText}>cm²</Text>
                    <Text style={styles.inputLeftText}>m²</Text>
                    <Text style={styles.inputLeftText}>inch²</Text>
                    <Text style={styles.inputLeftText}>foot²</Text>
                    <Text style={styles.inputLeftText}>yard²</Text>
                    <Text style={styles.inputLeftText}>Acre</Text>
                    <Text style={styles.inputLeftText}>mile²</Text>
                </View>
                <View style={styles.areaClmContainer}>
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeCm}
                        value={text.cm}
                        placeholder="Centimeter²"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeM}
                        value={text.m}
                        placeholder="Meter²"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeInch}
                        value={text.inc}
                        placeholder="Inch²"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeFoot}
                        value={text.foot}
                        placeholder="Foot²"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeYard}
                        value={text.yard}
                        placeholder="Yard²"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeAcre}
                        value={text.acre}
                        placeholder="Acre"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeMile}
                        value={text.mile}
                        placeholder="Mile²"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

export default Area;
