import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Feather from "react-native-vector-icons/Feather";
import { colorSchemeType } from "../../../types";
import { addOpacity } from "../../helpers/functions";

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
        message: "",
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

    const pad = (num: number) => {
        return String(num).padStart(2, "0");
    };

    const calculate = () => {
        let startHr = parseInt(inputs.startHr === "" ? "0" : inputs.startHr);
        let startMin = parseInt(inputs.startMin === "" ? "0" : inputs.startMin);
        let endHr = parseInt(inputs.endHr === "" ? "0" : inputs.endHr);
        let endMin = parseInt(inputs.endMin === "" ? "0" : inputs.endMin);

        if (
            isNaN(startHr) ||
            isNaN(startMin) ||
            isNaN(endHr) ||
            isNaN(endMin)
        ) {
            setError({ hasError: true, message: "Please enter valid numbers" });
            setAnswer(blankAns);
            return;
        }

        const isStart12 = inputs.start === "AM" || inputs.start === "PM";
        const isEnd12 = inputs.end === "AM" || inputs.end === "PM";

        if (isStart12 && (startHr < 1 || startHr > 12)) {
            setError({ hasError: true, message: "Start hour must be between 1 and 12 for AM/PM" });
            setAnswer(blankAns);
            return;
        }
        if (inputs.start === "24H" && (startHr < 0 || startHr > 23)) {
            setError({ hasError: true, message: "Start hour must be between 0 and 23 for 24H" });
            setAnswer(blankAns);
            return;
        }
        if (startMin < 0 || startMin > 59) {
            setError({ hasError: true, message: "Start minutes must be between 0 and 59" });
            setAnswer(blankAns);
            return;
        }

        if (isEnd12 && (endHr < 1 || endHr > 12)) {
            setError({ hasError: true, message: "End hour must be between 1 and 12 for AM/PM" });
            setAnswer(blankAns);
            return;
        }
        if (inputs.end === "24H" && (endHr < 0 || endHr > 23)) {
            setError({ hasError: true, message: "End hour must be between 0 and 23 for 24H" });
            setAnswer(blankAns);
            return;
        }
        if (endMin < 0 || endMin > 59) {
            setError({ hasError: true, message: "End minutes must be between 0 and 59" });
            setAnswer(blankAns);
            return;
        }

        setError({ hasError: false, message: "" });

        // Convert times to 24H formats for calculation
        let start24 = startHr;
        if (isStart12) {
            if (inputs.start === "AM" && startHr === 12) start24 = 0;
            else if (inputs.start === "PM" && startHr !== 12) start24 = startHr + 12;
        }

        let end24 = endHr;
        if (isEnd12) {
            if (inputs.end === "AM" && endHr === 12) end24 = 0;
            else if (inputs.end === "PM" && endHr !== 12) end24 = endHr + 12;
        }

        let startTotal = start24 * 60 + startMin;
        let endTotal = end24 * 60 + endMin;
        
        let diff = endTotal - startTotal;
        if (diff < 0) {
            diff += 1440; // Add 24 hours in minutes if crossing midnight
        }

        let hrDiff = Math.floor(diff / 60);
        let minDiff = diff % 60;

        setAnswer({
            hr: hrDiff,
            min: minDiff,
            visible: true,
            startHr: pad(startHr),
            startMin: pad(startMin),
            endHr: pad(endHr),
            endMin: pad(endMin),
            start: inputs.start,
            end: inputs.end,
        });
    };

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* Start Time Card */}
            <View
                className="p-5 rounded-3xl border mb-6"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                <Text
                    className="text-[13px] font-bold mb-4 tracking-[0.5px]"
                    style={{ color: addOpacity(colors.text, "70") }}
                >
                    START TIME
                </Text>
                
                <View className="flex-row justify-between w-full items-end">
                    {/* Hours */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Hours</Text>
                        <CustomInput
                            width="100%"
                            placeholder="Hr"
                            maxLength={2}
                            value={inputs.startHr}
                            onChangeText={(e) => onChangeText(e, "startHr")}
                        />
                    </View>
                    
                    {/* Minutes */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Minutes</Text>
                        <CustomInput
                            width="100%"
                            placeholder="Min"
                            maxLength={2}
                            value={inputs.startMin}
                            onChangeText={(e) => onChangeText(e, "startMin")}
                        />
                    </View>
                    
                    {/* Format */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Format</Text>
                        <TouchableOpacity
                            onPress={() => changeMeridian("start")}
                            className="w-full h-10 border rounded-[7px] justify-center items-center"
                            style={{
                                borderColor: colors.secondary,
                                backgroundColor: colors.backgroundColor,
                            }}
                        >
                            <Text
                                className="font-bold"
                                style={{
                                    color: colors.secondary,
                                    fontSize: 14,
                                }}
                            >
                                {inputs.start}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* End Time Card */}
            <View
                className="p-5 rounded-3xl border mb-6"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                <Text
                    className="text-[13px] font-bold mb-4 tracking-[0.5px]"
                    style={{ color: addOpacity(colors.text, "70") }}
                >
                    END TIME
                </Text>
                
                <View className="flex-row justify-between w-full items-end">
                    {/* Hours */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Hours</Text>
                        <CustomInput
                            width="100%"
                            placeholder="Hr"
                            maxLength={2}
                            value={inputs.endHr}
                            onChangeText={(e) => onChangeText(e, "endHr")}
                        />
                    </View>
                    
                    {/* Minutes */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Minutes</Text>
                        <CustomInput
                            width="100%"
                            placeholder="Min"
                            maxLength={2}
                            value={inputs.endMin}
                            onChangeText={(e) => onChangeText(e, "endMin")}
                        />
                    </View>
                    
                    {/* Format */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Format</Text>
                        <TouchableOpacity
                            onPress={() => changeMeridian("end")}
                            className="w-full h-10 border rounded-[7px] justify-center items-center"
                            style={{
                                borderColor: colors.secondary,
                                backgroundColor: colors.backgroundColor,
                            }}
                        >
                            <Text
                                className="font-bold"
                                style={{
                                    color: colors.secondary,
                                    fontSize: 14,
                                }}
                            >
                                {inputs.end}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Calculate Button */}
            <View className="items-center mb-6">
                <Button
                    mode="contained"
                    onPress={calculate}
                    buttonColor={colors.secondary}
                    textColor="#fff"
                    style={{ borderRadius: 12, paddingVertical: 4, width: "100%" }}
                >
                    Calculate Difference
                </Button>
            </View>

            {/* Error Message */}
            {error.hasError && (
                <View
                    className="p-4 rounded-2xl border mb-6 items-center flex-row justify-center"
                    style={{
                        backgroundColor: "#FF525210",
                        borderColor: "#FF525230",
                    }}
                >
                    <Feather name="alert-circle" size={18} color="#FF5252" style={{ marginRight: 8 }} />
                    <Text
                        className="text-[14px] font-semibold text-center"
                        style={{ color: "#FF5252" }}
                    >
                        {error.message}
                    </Text>
                </View>
            )}

            {/* Result Card */}
            {answer.visible && !error.hasError && (
                <View
                    className="p-6 rounded-3xl border mb-6 items-center"
                    style={{
                        backgroundColor: colors.elevation.level2,
                        borderColor: colors.secondary + "30",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 8,
                        elevation: 2,
                    }}
                >
                    <Text
                        className="text-[13px] font-bold mb-5 tracking-[1px]"
                        style={{ color: colors.secondary }}
                    >
                        TIME DIFFERENCE
                    </Text>
                    
                    {/* Time Summary Row */}
                    <View className="flex-row justify-around w-full mb-5 items-center">
                        <View className="items-center">
                            <Text className="text-[11px] font-bold uppercase tracking-[0.5px]" style={{ color: addOpacity(colors.text, "50") }}>
                                Start Time
                            </Text>
                            <Text className="text-[16px] font-semibold mt-1" style={{ color: colors.text }}>
                                {answer.startHr}:{answer.startMin} {answer.start !== "24H" ? answer.start : ""}
                            </Text>
                        </View>
                        
                        <Feather name="arrow-right" size={18} color={colors.secondary} />
                        
                        <View className="items-center">
                            <Text className="text-[11px] font-bold uppercase tracking-[0.5px]" style={{ color: addOpacity(colors.text, "50") }}>
                                End Time
                            </Text>
                            <Text className="text-[16px] font-semibold mt-1" style={{ color: colors.text }}>
                                {answer.endHr}:{answer.endMin} {answer.end !== "24H" ? answer.end : ""}
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: 1, width: "100%", backgroundColor: colors.divider + "20", marginBottom: 20 }} />

                    {/* Difference output */}
                    <View className="flex-row items-center justify-center">
                        <View className="items-center flex-1">
                            <Text
                                className="text-[36px] font-bold"
                                style={{ color: colors.text }}
                            >
                                {answer.hr}
                            </Text>
                            <Text
                                className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "60") }}
                            >
                                {answer.hr === 1 ? "Hour" : "Hours"}
                            </Text>
                        </View>
                        
                        <View style={{ width: 1, height: 40, backgroundColor: colors.divider + "30" }} />
                        
                        <View className="items-center flex-1">
                            <Text
                                className="text-[36px] font-bold"
                                style={{ color: colors.text }}
                            >
                                {answer.min}
                            </Text>
                            <Text
                                className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "60") }}
                            >
                                {answer.min === 1 ? "Minute" : "Minutes"}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default TimeDifference;
