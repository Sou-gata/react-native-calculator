import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { parseNumber } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const Area = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, setText] = useState({
        cm: "",
        m: "",
        inc: "",
        foot: "",
        yard: "",
        acre: "",
        mile: "",
    });

    const setValues = (
        cm: string,
        m: string,
        inc: string,
        foot: string,
        yard: string,
        acre: string,
        mile: string
    ) => {
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

    const onChangeCm = (e: string) => {
        setText({ ...text, cm: e });
        if (e != "") {
            const cm = parseFloat(e);
            if (isNaN(cm)) return;
            const m = parseNumber(cm * 0.0001) + "";
            const inc = parseNumber(cm * 0.155) + "";
            const foot = parseNumber(cm / 929) + "";
            const yard = parseNumber(cm / 8361) + "";
            const acre = parseNumber(cm * 0.000000024711) + "";
            const mile = parseNumber(cm * 0.00000000003861) + "";
            setValues(e, m, inc, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeM = (e: string) => {
        setText({ ...text, m: e });
        if (e != "") {
            const m = parseFloat(e);
            const cm = parseNumber(m * 10000) + "";
            const inc = parseNumber(m * 1550) + "";
            const foot = parseNumber(m * 10.7639) + "";
            const yard = parseNumber(m * 19599) + "";
            const acre = parseNumber(m * 0.000247105) + "";
            const mile = parseNumber(m * 0.0000003861) + "";
            setValues(cm, e, inc, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeInch = (e: string) => {
        setText({ ...text, inc: e });
        if (e != "") {
            const inc = parseFloat(e);
            const cm = parseNumber(inc * 6.4516) + "";
            const m = parseNumber(inc * 0.00064516) + "";
            const foot = parseNumber(inc * 0.00694444) + "";
            const yard = parseNumber(inc * 0.000771605) + "";
            const acre = parseNumber(inc * 0.00000015942) + "";
            const mile = parseNumber(inc * 0.0000000002491) + "";
            setValues(cm, m, e, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeFoot = (e: string) => {
        setText({ ...text, foot: e });
        if (e != "") {
            const foot = parseFloat(e);
            const cm = parseNumber(foot * 929.03) + "";
            const m = parseNumber(foot * 0.092903) + "";
            const inc = parseNumber(foot * 144) + "";
            const yard = parseNumber(foot / 9) + "";
            const acre = parseNumber(foot / 43560) + "";
            const mile = parseNumber(foot * 0.00000003587) + "";
            setValues(cm, m, inc, e, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeYard = (e: string) => {
        setText({ ...text, yard: e });
        if (e != "") {
            const yard = parseFloat(e);
            const cm = parseNumber(yard * 8361.27) + "";
            const m = parseNumber(yard * 0.836127) + "";
            const inc = parseNumber(yard * 1296) + "";
            const foot = parseNumber(yard * 9) + "";
            const acre = parseNumber(yard / 4840) + "";
            const mile = parseNumber(yard * 0.000003098) + "";
            setValues(cm, m, inc, foot, e, acre, mile);
        } else setEmpty();
    };
    const onChangeAcre = (e: string) => {
        setText({ ...text, acre: e });
        if (e != "") {
            const acre = parseFloat(e);
            const cm = parseNumber(acre * 40470000) + "";
            const m = parseNumber(acre * 4046.86) + "";
            const inc = parseNumber(acre * 6273000) + "";
            const foot = parseNumber(acre * 43560) + "";
            const yard = parseNumber(acre * 4840) + "";
            const mile = parseNumber(acre / 640) + "";
            setValues(cm, m, inc, foot, yard, e, mile);
        } else setEmpty();
    };
    const onChangeMile = (e: string) => {
        setText({ ...text, mile: e });
        if (e != "") {
            const mile = parseFloat(e);
            const cm = parseNumber(mile * 25900000000) + "";
            const m = parseNumber(mile * 2590000) + "";
            const inc = parseNumber(mile * 4014000000) + "";
            const foot = parseNumber(mile * 27880000) + "";
            const yard = parseNumber(mile * 3098000) + "";
            const acre = parseNumber(mile * 640) + "";
            setValues(cm, m, inc, foot, yard, acre, e);
        } else setEmpty();
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            cm²
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            m²
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            inch²
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            foot²
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            yard²
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Acre
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            mile²
                        </Text>
                    </View>
                    <View
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                        <CustomInput
                            onChangeText={onChangeCm}
                            value={text.cm}
                            placeholder="Centimeter²"
                            width={180}
                        />
                        <CustomInput
                            onChangeText={onChangeM}
                            value={text.m}
                            placeholder="Meter²"
                            width={180}
                        />
                        <CustomInput
                            onChangeText={onChangeInch}
                            value={text.inc}
                            placeholder="Inch²"
                            width={180}
                        />
                        <CustomInput
                            onChangeText={onChangeFoot}
                            value={text.foot}
                            placeholder="Foot²"
                            width={180}
                        />
                        <CustomInput
                            onChangeText={onChangeYard}
                            value={text.yard}
                            placeholder="Yard²"
                            width={180}
                        />
                        <CustomInput
                            onChangeText={onChangeAcre}
                            value={text.acre}
                            placeholder="Acre"
                            width={180}
                        />
                        <CustomInput
                            onChangeText={onChangeMile}
                            value={text.mile}
                            placeholder="Mile²"
                            width={180}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Area;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 450,
    },
    convertorIndicator: {
        justifyContent: "space-around",
        height: "100%",
        alignItems: "flex-end",
    },
});
