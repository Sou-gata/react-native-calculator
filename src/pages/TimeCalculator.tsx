import { Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Button, Text, RadioButton } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { calculateTime, wp } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const TimeCalculator = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [inputs, setInputs] = useState({
        d1: "",
        h1: "",
        m1: "",
        s1: "",
        d2: "",
        h2: "",
        m2: "",
        s2: "",
    });
    const [operation, setOperation] = useState(1);
    const changeValues = (e: string, position: string) => {
        setInputs({ ...inputs, [position]: e });
    };
    const [ans, setAns] = useState<{
        day: undefined | number;
        hou: undefined | number;
        min: undefined | number;
        sec: undefined | number;
    }>({
        day: undefined,
        hou: undefined,
        min: undefined,
        sec: undefined,
    });

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
        },
        flexRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        inputHeader: { fontSize: 18, color: colors.text },
        timeHeadText: {
            width: (wp("100%") - 10) / 4,
            alignItems: "center",
            justifyContent: "center",
        },
        inputRow: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
        },
        radioGroup: {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
        },
        radioItem: {
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
        },
        radioText: {
            fontSize: 20,
            color: colors.text,
        },
        pressable: {
            borderRadius: 50,
            overflow: "hidden",
        },
        buttonContainer: {
            alignItems: "center",
            marginTop: 20,
        },
        textHighlight: {
            fontSize: 35,
            textAlign: "center",
            color: colors.secondary,
        },
        ansText: {
            fontSize: 18,
            color: colors.text,
        },
    });

    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.flexRow, { marginTop: 20 }]}>
                    <View style={styles.timeHeadText}>
                        <Text style={styles.inputHeader}>Days</Text>
                    </View>
                    <View style={styles.timeHeadText}>
                        <Text style={styles.inputHeader}>Hours</Text>
                    </View>
                    <View style={styles.timeHeadText}>
                        <Text style={styles.inputHeader}>Minutes</Text>
                    </View>
                    <View style={styles.timeHeadText}>
                        <Text style={styles.inputHeader}>Seconds</Text>
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <CustomInput
                        placeholder="day"
                        onChangeText={(e) => changeValues(e, "d1")}
                        value={inputs.d1}
                        width={65}
                    />
                    <CustomInput
                        placeholder="hour"
                        onChangeText={(e) => changeValues(e, "h1")}
                        value={inputs.h1}
                        width={65}
                    />
                    <CustomInput
                        placeholder="min"
                        onChangeText={(e) => changeValues(e, "m1")}
                        value={inputs.m1}
                        width={65}
                    />
                    <CustomInput
                        placeholder="sec"
                        onChangeText={(e) => changeValues(e, "s1")}
                        value={inputs.s1}
                        width={65}
                    />
                </View>
                <View style={styles.radioGroup}>
                    <View style={styles.pressable}>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setOperation(1)}
                            android_ripple={{
                                color: colors.secondary + "80",
                                radius: 100,
                            }}>
                            <RadioButton
                                value="1"
                                status={
                                    operation == 1 ? "checked" : "unchecked"
                                }
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                onPress={() => setOperation(1)}
                            />
                            <Text style={styles.radioText}>Add (+)</Text>
                        </Pressable>
                    </View>
                    <View style={styles.pressable}>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setOperation(2)}
                            android_ripple={{
                                color: colors.secondary + "80",
                                radius: 100,
                            }}>
                            <RadioButton
                                value="2"
                                status={
                                    operation == 2 ? "checked" : "unchecked"
                                }
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                onPress={() => setOperation(2)}
                            />
                            <Text style={styles.radioText}>Subtract (-)</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <CustomInput
                        placeholder="day"
                        onChangeText={(e) => changeValues(e, "d2")}
                        value={inputs.d2}
                        width={65}
                    />
                    <CustomInput
                        placeholder="hour"
                        onChangeText={(e) => changeValues(e, "h2")}
                        value={inputs.h2}
                        width={65}
                    />
                    <CustomInput
                        placeholder="min"
                        onChangeText={(e) => changeValues(e, "m2")}
                        value={inputs.m2}
                        width={65}
                    />
                    <CustomInput
                        placeholder="sec"
                        onChangeText={(e) => changeValues(e, "s2")}
                        value={inputs.s2}
                        width={65}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            let answer = calculateTime(inputs, operation);
                            setAns(answer);
                        }}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
                {ans.day && ans.day >= 0 && (
                    <View style={[styles.flexRow, { marginTop: 30 }]}>
                        {ans.day && ans.day > 0 && (
                            <Text style={styles.textHighlight}>{ans.day}</Text>
                        )}
                        {ans.day && ans.day > 0 && (
                            <Text style={styles.ansText}> D</Text>
                        )}
                        {ans.hou && ans.hou > 0 && (
                            <Text style={styles.textHighlight}> {ans.hou}</Text>
                        )}
                        {ans.hou && ans.hou > 0 && (
                            <Text style={styles.ansText}> H</Text>
                        )}
                        {ans.min && ans.min > 0 && (
                            <Text style={styles.textHighlight}> {ans.min}</Text>
                        )}
                        {ans.min && ans.min > 0 && (
                            <Text style={styles.ansText}> M</Text>
                        )}
                        {ans.sec && ans.sec > 0 && (
                            <Text style={styles.textHighlight}> {ans.sec}</Text>
                        )}
                        {ans.sec && ans.sec > 0 && (
                            <Text style={styles.ansText}> S</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default TimeCalculator;
