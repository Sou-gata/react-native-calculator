import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";

const EMICalculator = () => {
    const { colors } = useTheme();
    const [inputes, setInputes] = useState({ p: "", r: "", t: "" });
    const [ans, setAns] = useState({ emi: "", i: "", a: "" });

    const calculate = () => {
        const p = parseFloat(inputes.p);
        const R = parseFloat(inputes.r);
        const t = parseFloat(inputes.t);
        if (!isNaN(p) && !isNaN(R) && !isNaN(t)) {
            const r = R / (12 * 100);
            const n = t * 12;
            let emiMain =
                (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            let emi = emiMain.toFixed(2);
            emi = parseFloat(emi);
            const totalA = parseFloat((emiMain * n).toFixed(2));
            const totalI = parseFloat((totalA - p).toFixed(2));
            setAns({ emi, i: totalI, a: totalA });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={{ padding: 20 }}>
                <View style={styles.inputes}>
                    <View
                        style={{
                            justifyContent: "space-around",
                            height: 200,
                        }}>
                        <Text style={{ fontSize: 16, color: colors.text }}>
                            Principal ={" "}
                        </Text>
                        <Text style={{ fontSize: 16, color: colors.text }}>
                            Rate of interest ={" "}
                        </Text>
                        <Text style={{ fontSize: 16, color: colors.text }}>
                            Total time (in Years) ={" "}
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: "space-around",
                            height: 200,
                        }}>
                        <CustomInput
                            width={150}
                            placeholder="p"
                            value={inputes.p}
                            onChangeText={(e) => {
                                setInputes((prev) => ({ ...prev, p: e }));
                            }}
                        />
                        <CustomInput
                            width={150}
                            placeholder="r"
                            value={inputes.r}
                            onChangeText={(e) => {
                                setInputes((prev) => ({ ...prev, r: e }));
                            }}
                        />
                        <CustomInput
                            width={150}
                            placeholder="t"
                            value={inputes.t}
                            onChangeText={(e) => {
                                setInputes((prev) => ({ ...prev, t: e }));
                            }}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => calculate()}
                        buttonColor={colors.secondary}
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
                {ans.emi && (
                    <View
                        style={{
                            marginTop: 30,
                            alignItems: "center",
                            gap: 15,
                        }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Monthly EMI ={" "}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: colors.secondary,
                                }}>
                                ₹ {ans.emi}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Total interest ={" "}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: colors.secondary,
                                }}>
                                ₹ {ans.i}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Total amount ={" "}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: colors.secondary,
                                }}>
                                ₹ {ans.a}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

export default EMICalculator;

const styles = StyleSheet.create({
    inputes: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
});
