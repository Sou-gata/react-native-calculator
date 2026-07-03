import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Button, useTheme } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { colorSchemeType } from "../../types";

const TimeDifference = () => {
    const { colors } = useTheme<colorSchemeType>();
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

    const changeMeridian = (position: string) => {
        setInputs((prev) => {
            let m: string = prev[position as keyof object];
            if (m === "AM") m = "PM";
            else if (m == "PM") m = "24H";
            else if (m == "24H") m = "AM";
            return { ...prev, [position]: m };
        });
    };
    const onChangeText = (e: string, place: string) => {
        setInputs((prev) => {
            return { ...prev, [place]: e };
        });
    };
    const pad = (number: number) => {
        if (number < 10) return "0" + number;
        return number.toString();
    };
    const calculate = () => {
        let startHr = parseInt(inputs.startHr == "" ? "0" : inputs.startHr);
        let startMin = parseInt(inputs.startMin == "" ? "0" : inputs.startMin);
        let endHr = parseInt(inputs.endHr == "" ? "0" : inputs.endHr);
        let endMin = parseInt(inputs.endMin == "" ? "0" : inputs.endMin);
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
            startHr: pad(parseFloat(inputs.startHr)),
            startMin: pad(parseFloat(inputs.startMin)),
            endHr: pad(parseFloat(inputs.endHr)),
            endMin: pad(parseFloat(inputs.endMin)),
            start: inputs.start,
            end: inputs.end,
        });
    };

    return (
        <View
            className="flex-1 p-5"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <Text
                className="text-[16px]"
                style={{ color: colors.text }}
            >
                Start Time
            </Text>
            <View className="flex-row justify-center gap-5 my-2.5">
                <View className="items-center">
                    <Text
                        className="text-[16px]"
                        style={{ color: colors.divider }}
                    >
                        Hours
                    </Text>
                    <CustomInput
                        width={80}
                        placeholder="Hr"
                        maxLength={2}
                        value={inputs.startHr}
                        onChangeText={(e) => onChangeText(e, "startHr")}
                    />
                </View>
                <View className="items-center">
                    <Text
                        className="text-[16px]"
                        style={{ color: colors.divider }}
                    >
                        Minutes
                    </Text>
                    <CustomInput
                        width={80}
                        placeholder="Min"
                        maxLength={2}
                        value={inputs.startMin}
                        onChangeText={(e) => onChangeText(e, "startMin")}
                    />
                </View>
                <View className="items-center">
                    <Text
                        className="text-[16px]"
                        style={{ color: colors.divider }}
                    >
                        Format
                    </Text>
                    <Pressable
                        onPress={() => changeMeridian("start")}
                        className="w-[80px] h-[40px] border rounded-[5px] justify-center items-center"
                        style={{ borderColor: colors.secondary }}
                    >
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
            <Text
                className="text-[16px] mt-5"
                style={{ color: colors.text }}
            >
                End Time
            </Text>
            <View className="flex-row justify-center gap-5 my-2.5">
                <View className="items-center">
                    <Text
                        className="text-[16px]"
                        style={{ color: colors.divider }}
                    >
                        Hours
                    </Text>
                    <CustomInput
                        width={80}
                        placeholder="Hr"
                        maxLength={2}
                        value={inputs.endHr}
                        onChangeText={(e) => onChangeText(e, "endHr")}
                    />
                </View>
                <View className="items-center">
                    <Text
                        className="text-[16px]"
                        style={{ color: colors.divider }}
                    >
                        Minutes
                    </Text>
                    <CustomInput
                        width={80}
                        placeholder="Min"
                        maxLength={2}
                        value={inputs.endMin}
                        onChangeText={(e) => onChangeText(e, "endMin")}
                    />
                </View>
                <View className="items-center">
                    <Text
                        className="text-[16px]"
                        style={{ color: colors.divider }}
                    >
                        Format
                    </Text>
                    <Pressable
                        onPress={() => changeMeridian("end")}
                        className="w-[80px] h-[40px] border rounded-[5px] justify-center items-center"
                        style={{ borderColor: colors.secondary }}
                    >
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
            <View className="items-center mt-[30px]">
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
                    <Text
                        className="text-[25px] text-center mt-[30px]"
                        style={{ color: colors.text }}
                    >
                        {error.message}
                    </Text>
                </View>
            )}
            {answer.visible && !error.hasError && (
                <View className="mt-[30px]">
                    <Text
                        className="text-[25px] mt-[5px] text-center"
                        style={{ color: colors.text }}
                    >
                        Start {"  "}
                        {answer.startHr} : {answer.startMin}
                        {"  "}
                        {answer.start !== "24H" ? answer.start : ""}
                    </Text>
                    <Text
                        className="text-[25px] mt-[5px] text-center"
                        style={{ color: colors.text }}
                    >
                        End {"    "}
                        {answer.endHr} : {answer.endMin}
                        {"  "}
                        {answer.end !== "24H" ? answer.end : ""}
                    </Text>
                    <Text
                        className="text-[25px] mt-[30px] text-center"
                        style={{ color: colors.text }}
                    >
                        Difference
                    </Text>
                    <View className="flex-row items-center gap-2.5 justify-center">
                        <Text
                            className="text-[50px]"
                            style={{ color: colors.secondary }}
                        >
                            {answer.hr}
                        </Text>
                        <Text
                            className="text-[25px] mt-[5px] text-center"
                            style={{ color: colors.text }}
                        >
                            {answer.hr != 1 ? "Hrs" : "Hr"}
                        </Text>
                        <Text
                            className="text-[50px]"
                            style={{ color: colors.secondary }}
                        >
                            {answer.min}
                        </Text>
                        <Text
                            className="text-[25px] mt-[5px] text-center"
                            style={{ color: colors.text }}
                        >
                            {answer.min != 1 ? "Mins" : "Min"}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default TimeDifference;
