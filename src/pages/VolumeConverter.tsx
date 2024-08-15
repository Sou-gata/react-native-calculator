import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { parseNumber } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const Volume = () => {
    const { colors } = useTheme<colorSchemeType>();
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
    const setAns = (
        cm: string,
        m: string,
        inc: string,
        foot: string,
        lit: string,
        gln: string,
        qnt: string
    ) => {
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

    const fixed = (val: number): string => parseNumber(val).toString();

    const onChangeCm = (e: string) => {
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
    const onChangeM = (e: string) => {
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
    const onChangeInch = (e: string) => {
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
    const onChangeFoot = (e: string) => {
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
    const onChangeLit = (e: string) => {
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
    const onChangeGln = (e: string) => {
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
    const onChangeQnt = (e: string) => {
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
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            cm³
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            m³
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            inch³
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            feet³
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Liter
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Imp Gallon
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Imp Quant
                        </Text>
                    </View>
                    <View
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                        <CustomInput
                            onChangeText={onChangeCm}
                            value={text.cm}
                            placeholder="Centimeter³"
                        />
                        <CustomInput
                            onChangeText={onChangeM}
                            value={text.m}
                            placeholder="Meter³"
                        />
                        <CustomInput
                            onChangeText={onChangeInch}
                            value={text.inc}
                            placeholder="Inch³"
                        />
                        <CustomInput
                            onChangeText={onChangeFoot}
                            value={text.foot}
                            placeholder="Foot³"
                        />
                        <CustomInput
                            onChangeText={onChangeLit}
                            value={text.lit}
                            placeholder="Liter"
                        />
                        <CustomInput
                            onChangeText={onChangeGln}
                            value={text.gln}
                            placeholder="Imperial Gallon"
                        />
                        <CustomInput
                            onChangeText={onChangeQnt}
                            value={text.qnt}
                            placeholder="Imperial Quant"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Volume;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 480,
    },
    convertorIndicator: {
        justifyContent: "space-around",
        height: "100%",
        alignItems: "flex-end",
    },
});
