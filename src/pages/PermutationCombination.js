import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text, Button, RadioButton } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { permutationCombination } from "../helpers/functions";

const PermutationCombination = () => {
    const { colors } = useTheme();
    const [inputs, setInputs] = useState({ n: "", r: "" });
    const [operation, setOperation] = useState({ order: 1, repeat: 1 });
    const [ans, setAns] = useState({
        nuFormula: undefined,
        deFormula: undefined,
        ans: undefined,
        valueNu: undefined,
        valueDe: undefined,
    });
    const changeValues = (e, str) => {
        let temp = { ...inputs, [str]: e };
        setInputs(temp);
    };

    const setOrder = (val) => setOperation({ ...operation, order: val });
    const setRepeat = (val) => setOperation({ ...operation, repeat: val });

    const textStyle = [styles.textStyle, { color: colors.text }];

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={{ marginTop: 10 }}>
                <View style={styles.flexRow}>
                    <Text style={[...textStyle, { marginRight: 20 }]}>n =</Text>
                    <CustomInput
                        placeholder="n"
                        onChangeText={(e) => changeValues(e, "n")}
                        value={inputs.n}
                    />
                </View>
                <View style={styles.flexRow}>
                    <Text style={[...textStyle, { marginRight: 20 }]}>r =</Text>
                    <CustomInput
                        placeholder="r"
                        onChangeText={(e) => changeValues(e, "r")}
                        value={inputs.r}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={textStyle}>Does the order matter?</Text>
                    <View style={styles.radioGroup}>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setOrder(1)}>
                            <RadioButton
                                value={1}
                                status={
                                    operation.order === 1
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setOrder(1)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                Yes
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setOrder(2)}>
                            <RadioButton
                                value={2}
                                status={
                                    operation.order === 2
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setOrder(2)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                No
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={textStyle}>Can the items repeat?</Text>
                    <View style={styles.radioGroup}>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setRepeat(1)}>
                            <RadioButton
                                value={1}
                                status={
                                    operation.repeat === 1
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setRepeat(1)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                Yes
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setRepeat(2)}>
                            <RadioButton
                                value={2}
                                status={
                                    operation.repeat === 2
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setRepeat(2)}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                No
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            let ans = permutationCombination(inputs, operation);
                            if (ans.ans == "NaN" || ans.ans == "Infinity")
                                ans.ans = "Can't Calculate";
                            setAns(ans);
                        }}
                        buttonColor={colors.secondary}
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            {ans.ans && (
                <View>
                    <View style={styles.pcAnsRow}>
                        <Text style={textStyle}>Formula = </Text>
                        <View>
                            <Text style={textStyle}>{ans.nuFormula}</Text>
                            {ans.deFormula && (
                                <View
                                    style={[
                                        styles.hr,
                                        { backgroundColor: colors.text },
                                    ]}></View>
                            )}
                            {ans.deFormula && (
                                <Text style={textStyle}>{ans.deFormula}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.pcAnsRow}>
                        <Text style={[...textStyle, { opacity: 0 }]}>
                            Formula ={" "}
                        </Text>
                        <Text style={textStyle}> = </Text>
                        <View>
                            <Text style={textStyle}>{ans.valueNu}</Text>
                            {ans.deFormula && (
                                <View
                                    style={[
                                        styles.hr,
                                        { backgroundColor: colors.text },
                                    ]}></View>
                            )}
                            {ans.deFormula && (
                                <Text style={textStyle}>{ans.valueDe}</Text>
                            )}
                        </View>
                    </View>
                    <View style={[styles.pcAnsRow, { marginTop: 25 }]}>
                        <Text style={textStyle}>Answer = </Text>
                        <Text style={textStyle}>{ans.ans}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default PermutationCombination;

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 15,
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
    radioGroup: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    pcAnsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    hr: {
        height: 2,
        marginTop: 5,
    },
});
