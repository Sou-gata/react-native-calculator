import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Button, useTheme } from "react-native-paper";
import CustomInput from "../components/CustomInput";

const TimeDifference = () => {
    const { colors } = useTheme();
    const blankAns = {
        hr: 0,
        min: 0,
        visible: false,
        startHr: "",
        startMin: "",
        endHr: "",
        endMin: "",
        start: "AM",
        end: "AM",
    };
    const [inputs, setInputs] = useState({
        startHr: "",
        startMin: "",
        endHr: "",
        endMin: "",
        start: "AM",
        end: "AM",
    });
    const [error, setError] = useState({
        hasError: false,
        message: "Invalid Time Format",
    });
    const [answer, setAnswer] = useState(blankAns);

    const changeMeridian = (position) => {
        setInputs((prev) => {
            let m = prev[position];
            if (m === "AM") m = "PM";
            else if (m == "PM") m = "24H";
            else if (m == "24H") m = "AM";
            return { ...prev, [position]: m };
        });
    };
    const onChangeText = (e, place) => {
        setInputs((prev) => {
            return { ...prev, [place]: e };
        });
    };
    const pad = (number) => {
        if (number < 10) return "0" + number;
        return number.toString();
    };
    const calculate = () => {
        let startHr = parseInt(inputs.startHr == "" ? 0 : inputs.startHr);
        let startMin = parseInt(inputs.startMin == "" ? 0 : inputs.startMin);
        let endHr = parseInt(inputs.endHr == "" ? 0 : inputs.endHr);
        let endMin = parseInt(inputs.endMin == "" ? 0 : inputs.endMin);
        if (
            isNaN(startHr) ||
            isNaN(startMin) ||
            isNaN(endHr) ||
            isNaN(endMin)
        ) {
            setError({ hasError: true, message: "Invalid Time" });
            setAnswer(blankAns);
            return;
        }
        if ((inputs.start === "AM" || inputs.start == "PM") && startHr > 12) {
            setError({ hasError: true, message: "Invalid Start Time" });
            setAnswer(blankAns);
            return;
        } else if ((inputs.end === "AM" || inputs.end == "PM") && endHr > 12) {
            setError({ hasError: true, message: "Invalid End Time" });
            setAnswer(blankAns);
            return;
        } else if (
            (inputs.start === "AM" || inputs.start == "PM") &&
            startHr < 1
        ) {
            setError({ hasError: true, message: "Invalid Start Time" });
            setAnswer(blankAns);
            return;
        } else if ((inputs.end === "AM" || inputs.end == "PM") && endHr < 1) {
            setError({ hasError: true, message: "Invalid End Time" });
            setAnswer(blankAns);
            return;
        } else if (startMin > 59 || startMin < 0) {
            setError({ hasError: true, message: "Invalid Start Time" });
            setAnswer(blankAns);
            return;
        } else if (endMin > 59 || endMin < 0) {
            setError({ hasError: true, message: "Invalid End Time" });
            setAnswer(blankAns);
            return;
        } else if (inputs.start === "24H" && (startHr > 23 || startHr < 0)) {
            setError({ hasError: true, message: "Invalid Start Time" });
            setAnswer(blankAns);
            return;
        } else if (inputs.end === "24H" && (endHr > 23 || endHr < 0)) {
            setError({ hasError: true, message: "Invalid End Time" });
            setAnswer(blankAns);
            return;
        } else {
            setError({ hasError: false, message: "" });
            setAnswer(blankAns);
        }

        if (inputs.start === "PM") startHr += 12;
        if (inputs.end === "PM") endHr += 12;
        if (startHr === 24) startHr = 0;
        if (endHr === 24) endHr = 0;
        let hrDiff = 0;
        let minDiff = 0;
        if (startHr <= endHr) {
            hrDiff = endHr - startHr;
        } else {
            hrDiff = 24 - startHr + endHr;
        }
        if (startMin > endMin) {
            hrDiff -= 1;
            endMin += 60;
        }
        minDiff = endMin - startMin;
        if (hrDiff < 0) hrDiff = 23;
        setAnswer({
            hr: hrDiff,
            min: minDiff,
            visible: true,
            startHr: pad(inputs.startHr),
            startMin: pad(inputs.startMin),
            endHr: pad(inputs.endHr),
            endMin: pad(inputs.endMin),
            start: inputs.start,
            end: inputs.end,
        });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        headingText: {
            fontSize: 16,
            color: colors.text,
        },
        headingTextTwo: {
            fontSize: 16,
            color: colors.divider,
        },
        row: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginVertical: 10,
        },
        center: {
            alignItems: "center",
        },
        formatToggle: {
            width: 80,
            height: 40,
            borderColor: colors.secondary,
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonContainer: {
            alignItems: "center",
            marginTop: 30,
        },
        errorMsg: {
            fontSize: 25,
            color: colors.text,
            textAlign: "center",
            marginTop: 30,
        },
        ansText: {
            fontSize: 25,
            color: colors.text,
            marginTop: 5,
            textAlign: "center",
        },
        ansContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
        },
        ansNumber: {
            fontSize: 50,
            color: colors.secondary,
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Start Time</Text>
            <View style={styles.row}>
                <View style={styles.center}>
                    <Text style={styles.headingTextTwo}>Hours</Text>
                    <CustomInput
                        width={80}
                        placeholder="Hr"
                        maxLength={2}
                        value={inputs.startHr}
                        onChangeText={(e) => onChangeText(e, "startHr")}
                    />
                </View>
                <View style={styles.center}>
                    <Text style={styles.headingTextTwo}>Minutes</Text>
                    <CustomInput
                        width={80}
                        placeholder="Min"
                        maxLength={2}
                        value={inputs.startMin}
                        onChangeText={(e) => onChangeText(e, "startMin")}
                    />
                </View>
                <View style={styles.center}>
                    <Text style={styles.headingTextTwo}>Format</Text>
                    <Pressable
                        onPress={() => changeMeridian("start")}
                        style={styles.formatToggle}>
                        <Text
                            style={{
                                color: colors.secondary,
                                fontSize: 17,
                            }}>
                            {inputs.start}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <Text style={[styles.headingText, { marginTop: 20 }]}>
                End Time
            </Text>
            <View style={styles.row}>
                <View style={styles.center}>
                    <Text style={styles.headingTextTwo}>Hours</Text>
                    <CustomInput
                        width={80}
                        placeholder="Hr"
                        maxLength={2}
                        value={inputs.endHr}
                        onChangeText={(e) => onChangeText(e, "endHr")}
                    />
                </View>
                <View style={styles.center}>
                    <Text style={styles.headingTextTwo}>Minutes</Text>
                    <CustomInput
                        width={80}
                        placeholder="Min"
                        maxLength={2}
                        value={inputs.endMin}
                        onChangeText={(e) => onChangeText(e, "endMin")}
                    />
                </View>
                <View style={styles.center}>
                    <Text style={styles.headingTextTwo}>Format</Text>
                    <Pressable
                        onPress={() => changeMeridian("end")}
                        style={styles.formatToggle}>
                        <Text
                            style={{
                                color: colors.secondary,
                                fontSize: 17,
                            }}>
                            {inputs.end}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={calculate}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Calculate
                </Button>
            </View>
            {error.hasError && (
                <View>
                    <Text style={styles.errorMsg}>{error.message}</Text>
                </View>
            )}
            {answer.visible && !error.hasError && (
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.ansText}>
                        Start {"  "}
                        {answer.startHr} : {answer.startMin}
                        {"  "}
                        {answer.start !== "24H" ? answer.start : ""}
                    </Text>
                    <Text style={styles.ansText}>
                        End {"    "}
                        {answer.endHr} : {answer.endMin}
                        {"  "}
                        {answer.end !== "24H" ? answer.end : ""}
                    </Text>
                    <Text
                        style={[
                            styles.ansText,
                            { marginTop: 30, textAlign: "center" },
                        ]}>
                        Difference
                    </Text>
                    <View style={styles.ansContainer}>
                        <Text style={styles.ansNumber}>{answer.hr}</Text>
                        <Text style={styles.ansText}>
                            {answer.hr != 1 ? "Hrs" : "Hr"}
                        </Text>
                        <Text style={styles.ansNumber}>{answer.min}</Text>
                        <Text style={styles.ansText}>
                            {answer.min != 1 ? "Mins" : "Min"}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default TimeDifference;
