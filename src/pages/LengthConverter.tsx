import { StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { parseNumber } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const LengthConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [ans, setAns] = useState({
        met: "",
        klm: "",
        inc: "",
        fet: "",
        mil: "",
        nom: "",
    });
    const setOutAns = (
        met: string,
        klm: string,
        inc: string,
        fet: string,
        mil: string,
        nom: string
    ) => {
        setAns({
            met,
            klm,
            inc,
            fet,
            mil,
            nom,
        });
    };
    const setEmpty = () => {
        setAns({
            met: "",
            klm: "",
            inc: "",
            fet: "",
            mil: "",
            nom: "",
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Meter
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Kilometer
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Inch
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Feet
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Mile
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Nautical Mile
                        </Text>
                    </View>
                    <View
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                        <CustomInput
                            placeholder="Meater"
                            value={ans.met}
                            onChangeText={(e) => {
                                if (e != "") {
                                    const met = parseFloat(e);
                                    if (!isNaN(met)) {
                                        const klm =
                                            parseNumber(met / 1000) + "";
                                        const inc =
                                            parseNumber(met * 39.3701) + "";
                                        const fet =
                                            parseNumber(met * 3.28084) + "";
                                        const mil =
                                            parseNumber(met / 1609) + "";
                                        const nom =
                                            parseNumber(met / 1852) + "";
                                        setOutAns(e, klm, inc, fet, mil, nom);
                                    }
                                } else setEmpty();
                            }}
                        />
                        <CustomInput
                            value={ans.klm}
                            placeholder="Kilomeater"
                            onChangeText={(e) => {
                                console.log(e);
                                if (e != "") {
                                    const klm = parseFloat(e);
                                    if (!isNaN(klm)) {
                                        const met =
                                            parseNumber(klm * 1000) + "";
                                        const inc =
                                            parseNumber(klm * 39370.1) + "";
                                        const fet =
                                            parseNumber(klm * 3280.84) + "";
                                        const mil =
                                            parseNumber(klm * 0.621371) + "";
                                        const nom =
                                            parseNumber(klm * 0.539957) + "";
                                        setOutAns(met, e, inc, fet, mil, nom);
                                    }
                                } else setEmpty();
                            }}
                        />
                        <CustomInput
                            value={ans.inc}
                            placeholder="Inch"
                            onChangeText={(e) => {
                                if (e != "") {
                                    const inc = parseFloat(e);
                                    if (!isNaN(inc)) {
                                        const met =
                                            parseNumber(inc * 0.0254) + "";
                                        const klm =
                                            parseNumber(inc / 39370) + "";
                                        const fet = parseNumber(inc / 12) + "";
                                        const mil =
                                            parseNumber(inc / 63360) + "";
                                        const nom =
                                            parseNumber(inc / 72910) + "";
                                        setOutAns(met, klm, e, fet, mil, nom);
                                    }
                                } else setEmpty();
                            }}
                        />
                        <CustomInput
                            value={ans.fet}
                            placeholder="Feet"
                            onChangeText={(e) => {
                                if (e != "") {
                                    const fet = parseFloat(e);
                                    if (!isNaN(fet)) {
                                        const met =
                                            parseNumber(fet * 0.3048) + "";
                                        const klm =
                                            parseNumber(fet * 0.0003048) + "";
                                        const inc = parseNumber(fet * 12) + "";
                                        const mil =
                                            parseNumber(fet / 5280) + "";
                                        const nom =
                                            parseNumber(fet / 6076) + "";
                                        setOutAns(met, klm, inc, e, mil, nom);
                                    }
                                } else setEmpty();
                            }}
                        />
                        <CustomInput
                            value={ans.mil}
                            placeholder="Mile"
                            onChangeText={(e) => {
                                if (e != "") {
                                    const mil = parseFloat(e);
                                    if (!isNaN(mil)) {
                                        const met =
                                            parseNumber(mil * 1609.34) + "";
                                        const klm =
                                            parseNumber(mil * 1.60934) + "";
                                        const inc =
                                            parseNumber(mil * 63360) + "";
                                        const fet =
                                            parseNumber(mil * 5280) + "";
                                        const nom =
                                            parseNumber(mil * 0.868976) + "";
                                        setOutAns(met, klm, inc, fet, e, nom);
                                    }
                                } else setEmpty();
                            }}
                        />
                        <CustomInput
                            value={ans.nom}
                            placeholder="Nautical Mile"
                            onChangeText={(e) => {
                                if (e != "") {
                                    const nom = parseFloat(e);
                                    if (!isNaN(nom)) {
                                        const met =
                                            parseNumber(nom * 1852) + "";
                                        const klm =
                                            parseNumber(nom * 1.852) + "";
                                        const inc =
                                            parseNumber(nom * 72913.4) + "";
                                        const fet =
                                            parseNumber(nom * 6076.12) + "";
                                        const mil =
                                            parseNumber(nom * 1.15078) + "";
                                        setOutAns(met, klm, inc, fet, mil, e);
                                    }
                                } else setEmpty();
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LengthConverter;

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
