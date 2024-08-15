import { StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { parseNumber } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const MassConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [kg, setKg] = useState<string>("");
    const [gm, setGm] = useState<string>("");
    const [lb, setLb] = useState<string>("");
    const [ounce, setOunce] = useState<string>("");

    const onChangeKg = (e: string) => {
        setKg(e);
        if (e != "") {
            setGm(parseNumber(parseFloat(e) * 1000).toString());
            setLb(parseNumber(parseFloat(e) * 2.20462).toString());
            setOunce(parseNumber(parseFloat(e) * 35.274).toString());
        } else if (e == "") {
            setGm("");
            setLb("");
            setOunce("");
        }
    };
    const onChangeGm = (e: string) => {
        setGm(e);
        if (e != "") {
            setKg(parseNumber(parseFloat(e) * 0.001).toString());
            setLb(parseNumber(parseFloat(e) / 453.6).toString());
            setOunce(parseNumber(parseFloat(e) * 0.035274).toString());
        } else if (e == "") {
            setKg("");
            setLb("");
            setOunce("");
        }
    };
    const onChangeLb = (e: string) => {
        setLb(e);
        if (e != "") {
            setKg(parseNumber(parseFloat(e) / 2.20462).toString());
            setGm(parseNumber((parseFloat(e) * 1000) / 2.20462).toString());
            setOunce(parseNumber(parseFloat(e) * 16).toString());
        } else if (e == "") {
            setKg("");
            setGm("");
            setOunce("");
        }
    };
    const onChangeOz = (e: string) => {
        setOunce(e);
        if (e != "") {
            setKg(parseNumber(parseFloat(e) / 35.274).toString());
            setGm(parseNumber((parseFloat(e) * 1000) / 35.274).toString());
            setLb(parseNumber(parseFloat(e) / 16).toString());
        } else if (e == "") {
            setKg("");
            setGm("");
            setLb("");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Killogram
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Gram
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Pound
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Ounce
                        </Text>
                    </View>
                    <View
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                        <CustomInput
                            value={kg.toString()}
                            placeholder="kg"
                            onChangeText={(e) => onChangeKg(e)}
                        />
                        <CustomInput
                            value={gm.toString()}
                            placeholder="g"
                            onChangeText={(e) => onChangeGm(e)}
                        />
                        <CustomInput
                            value={lb.toString()}
                            placeholder="lb"
                            onChangeText={(e) => onChangeLb(e)}
                        />
                        <CustomInput
                            value={ounce.toString()}
                            placeholder="oz"
                            onChangeText={(e) => onChangeOz(e)}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default MassConverter;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 300,
    },
    convertorIndicator: {
        justifyContent: "space-around",
        height: "100%",
        alignItems: "flex-end",
    },
});
