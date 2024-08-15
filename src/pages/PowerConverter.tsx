import { StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { colorSchemeType } from "../../types";
import { parseNumber } from "../helpers/functions";

const PowerConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [ans, setAns] = useState<{
        wat: string;
        kwat: string;
        hrsp: string;
        fpps: string;
        btu: string;
    }>({
        wat: "",
        kwat: "",
        hrsp: "",
        fpps: "",
        btu: "",
    });
    const setOutAns = (
        wat: string,
        kwat: string,
        hrsp: string,
        fpps: string,
        btu: string
    ) => {
        setAns({
            wat,
            kwat,
            hrsp,
            fpps,
            btu,
        });
    };
    const setEmpty = () => {
        setAns({
            wat: "",
            kwat: "",
            hrsp: "",
            fpps: "",
            btu: "",
        });
    };
    const fixed = (val: number): string => parseNumber(val).toString();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Watts
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Killowatts
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Horsepower
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Ft-lb/sec
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            BTUs/minute
                        </Text>
                    </View>
                    <View
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                        <CustomInput
                            onChangeText={(e: string) => {
                                if (e != "") {
                                    const wat = parseFloat(e);
                                    if (!isNaN(wat)) {
                                        const kwat = fixed(wat * 0.001);
                                        const hrsp = fixed(wat * 0.0013141);
                                        const fpps = fixed(wat * 0.737562149);
                                        const btu = fixed(wat * 0.056869);
                                        setOutAns(e, kwat, hrsp, fpps, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.wat}
                            placeholder="Watts"
                        />
                        <CustomInput
                            onChangeText={(e: string) => {
                                if (e != "") {
                                    const kwat = parseFloat(e);
                                    if (!isNaN(kwat)) {
                                        const wat = fixed(kwat * 1000);
                                        const hrsp = fixed(kwat * 1.3596216);
                                        const fpps = fixed(kwat * 737.562149);
                                        const btu = fixed(kwat * 56.86902);
                                        setOutAns(wat, e, hrsp, fpps, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.kwat}
                            placeholder="Kiloatts"
                        />
                        <CustomInput
                            onChangeText={(e: string) => {
                                if (e != "") {
                                    const hrsp = parseFloat(e);
                                    if (!isNaN(hrsp)) {
                                        const wat = fixed(hrsp * 745.699872);
                                        const kwat = fixed(Number(wat) * 0.001);
                                        const fpps = fixed(
                                            Number(kwat) * 737.562149
                                        );
                                        const btu = fixed(hrsp * 42.4072335);
                                        setOutAns(wat, kwat, e, fpps, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.hrsp}
                            placeholder="Horsepower"
                        />
                        <CustomInput
                            onChangeText={(e: string) => {
                                if (e != "") {
                                    const fpps = parseFloat(e);
                                    if (!isNaN(fpps)) {
                                        const wat = fixed(fpps * 1.355818);
                                        const kwat = fixed(Number(wat) * 0.001);
                                        const hrsp = fixed(
                                            Number(kwat) * 737.562149
                                        );
                                        const btu = fixed(fpps * 0.077104047);
                                        setOutAns(wat, kwat, hrsp, e, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.fpps}
                            placeholder="Ft-lb/sec"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                if (e != "") {
                                    const btu = parseFloat(e);
                                    if (!isNaN(btu)) {
                                        const wat = fixed(btu * 17.58426421);
                                        const kwat = fixed(Number(wat) * 0.001);
                                        const hrsp = fixed(
                                            Number(kwat) * 737.562149
                                        );
                                        const fpps = fixed(btu * 12.9694877);
                                        setOutAns(wat, kwat, hrsp, fpps, e);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.btu}
                            placeholder="BTUs/minute"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PowerConverter;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 370,
    },
    convertorIndicator: {
        justifyContent: "space-around",
        height: "100%",
        alignItems: "flex-end",
    },
});
