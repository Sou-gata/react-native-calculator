import { Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Button, Text, RadioButton } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput";
import { calculateTime } from "../helpers/functions";

const TimeCalculator = () => {
    const { colors } = useTheme();
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
    const changeValues = (e, position) => {
        setInputs({ ...inputs, [position]: e });
    };
    const [ans, setAns] = useState({
        day: undefined,
        hou: undefined,
        min: undefined,
        sec: undefined,
    });
    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.flexRow, { marginTop: 20 }]}>
                    <View style={styles.timeHeadText}>
                        <Text style={{ fontSize: 18, color: colors.text }}>
                            Days
                        </Text>
                    </View>
                    <View style={styles.timeHeadText}>
                        <Text style={{ fontSize: 18, color: colors.text }}>
                            Hours
                        </Text>
                    </View>
                    <View style={styles.timeHeadText}>
                        <Text style={{ fontSize: 18, color: colors.text }}>
                            Minutes
                        </Text>
                    </View>
                    <View style={styles.timeHeadText}>
                        <Text style={{ fontSize: 18, color: colors.text }}>
                            Seconds
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                    }}
                >
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
                            }}
                        >
                            <RadioButton
                                value={1}
                                status={
                                    operation == 1 ? "checked" : "unchecked"
                                }
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                onPress={() => setOperation(1)}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                Add (+)
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.pressable}>
                        <Pressable
                            style={styles.radioItem}
                            onPress={() => setOperation(2)}
                            android_ripple={{
                                color: colors.secondary + "80",
                                radius: 100,
                            }}
                        >
                            <RadioButton
                                value={2}
                                status={
                                    operation == 2 ? "checked" : "unchecked"
                                }
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                onPress={() => setOperation(2)}
                            />
                            <Text style={{ color: colors.text, fontSize: 20 }}>
                                Subtract (-)
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}
                >
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
                        textColor={"white"}
                    >
                        Calculate
                    </Button>
                </View>
                {ans.day >= 0 && (
                    <View style={[styles.flexRow, { marginTop: 30 }]}>
                        {ans.day > 0 && (
                            <Text
                                style={[
                                    styles.textHighlight,
                                    { color: colors.secondary },
                                ]}
                            >
                                {ans.day}
                            </Text>
                        )}
                        {ans.day > 0 && (
                            <Text
                                style={[styles.ansText, { color: colors.text }]}
                            >
                                {" "}
                                D
                            </Text>
                        )}
                        {ans.hou > 0 && (
                            <Text
                                style={[
                                    styles.textHighlight,
                                    { color: colors.secondary },
                                ]}
                            >
                                {" "}
                                {ans.hou}
                            </Text>
                        )}
                        {ans.hou > 0 && (
                            <Text
                                style={[styles.ansText, { color: colors.text }]}
                            >
                                {" "}
                                H
                            </Text>
                        )}
                        {ans.min > 0 && (
                            <Text
                                style={[
                                    styles.textHighlight,
                                    { color: colors.secondary },
                                ]}
                            >
                                {" "}
                                {ans.min}
                            </Text>
                        )}
                        {ans.min > 0 && (
                            <Text
                                style={[styles.ansText, { color: colors.text }]}
                            >
                                {" "}
                                M
                            </Text>
                        )}
                        {ans.sec > 0 && (
                            <Text
                                style={[
                                    styles.textHighlight,
                                    { color: colors.secondary },
                                ]}
                            >
                                {" "}
                                {ans.sec}
                            </Text>
                        )}
                        {ans.sec > 0 && (
                            <Text
                                style={[styles.ansText, { color: colors.text }]}
                            >
                                {" "}
                                S
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default TimeCalculator;

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
    timeHeadText: {
        width: (wp("100%") - 10) / 4,
        alignItems: "center",
        justifyContent: "center",
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
    },
    ansText: {
        fontSize: 18,
    },
});
