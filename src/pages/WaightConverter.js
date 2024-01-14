import { StyleSheet, ScrollView, View } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
const WaightConverter = () => {
    const { colors } = useTheme();
    const [kg, setKg] = useState("");
    const [gm, setGm] = useState("");
    const [lb, setLb] = useState("");
    const [ounce, setOunce] = useState("");

    const onChangeKg = (e) => {
        setKg(e);
        if (e != "") {
            setGm(parseFloat((parseFloat(e) * 1000).toFixed(4)));
            setLb(parseFloat((parseFloat(e) * 2.20462).toFixed(4)));
            setOunce(parseFloat((parseFloat(e) * 35.274).toFixed(4)));
        } else if (e == "") {
            setGm("");
            setLb("");
            setOunce("");
        }
    };
    const onChangeGm = (e) => {
        setGm(e);
        if (e != "") {
            setKg(parseFloat((parseFloat(e) * 0.001).toFixed(4)));
            setLb(parseFloat((parseFloat(e) / 453.6).toFixed(4)));
            setOunce(parseFloat((parseFloat(e) * 0.035274).toFixed(4)));
        } else if (e == "") {
            setKg("");
            setLb("");
            setOunce("");
        }
    };
    const onChangeLb = (e) => {
        setLb(e);
        if (e != "") {
            setKg(parseFloat((parseFloat(e) / 2.20462).toFixed(4)));
            setGm(parseFloat(((parseFloat(e) * 1000) / 2.20462).toFixed(4)));
            setOunce(parseFloat((parseFloat(e) * 16).toFixed(4)));
        } else if (e == "") {
            setKg("");
            setGm("");
            setOunce("");
        }
    };
    const onChangeOz = (e) => {
        setOunce(e);
        if (e != "") {
            setKg(parseFloat((parseFloat(e) / 35.274).toFixed(4)));
            setGm(parseFloat(((parseFloat(e) * 1000) / 35.274).toFixed(4)));
            setLb(parseFloat((parseFloat(e) / 16).toFixed(4)));
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

export default WaightConverter;

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
