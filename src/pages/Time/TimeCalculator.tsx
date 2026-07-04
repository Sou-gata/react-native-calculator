import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Feather from "react-native-vector-icons/Feather";
import { calculateTime, addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

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
        isNegative?: boolean;
    }>({
        day: undefined,
        hou: undefined,
        min: undefined,
        sec: undefined,
    });

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* First Duration Card */}
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
                    FIRST DURATION
                </Text>
                
                <View className="flex-row justify-between w-full">
                    {/* Days */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Days</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "d1")}
                            value={inputs.d1}
                            width="100%"
                        />
                    </View>
                    {/* Hours */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Hours</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "h1")}
                            value={inputs.h1}
                            width="100%"
                        />
                    </View>
                    {/* Minutes */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Mins</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "m1")}
                            value={inputs.m1}
                            width="100%"
                        />
                    </View>
                    {/* Seconds */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Secs</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "s1")}
                            value={inputs.s1}
                            width="100%"
                        />
                    </View>
                </View>
            </View>

            {/* Operation Segment Control */}
            <View
                className="p-1.5 rounded-2xl border mb-6 flex-row"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                }}
            >
                <TouchableOpacity
                    onPress={() => setOperation(1)}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center flex-row"
                    style={{
                        backgroundColor: operation === 1 ? colors.secondary : "transparent",
                    }}
                >
                    <Feather name="plus" size={16} color={operation === 1 ? "white" : colors.secondary} style={{ marginRight: 6 }} />
                    <Text
                        className="text-[15px] font-bold"
                        style={{ color: operation === 1 ? "white" : colors.text }}
                    >
                        Add
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setOperation(2)}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center flex-row"
                    style={{
                        backgroundColor: operation === 2 ? colors.secondary : "transparent",
                    }}
                >
                    <Feather name="minus" size={16} color={operation === 2 ? "white" : colors.secondary} style={{ marginRight: 6 }} />
                    <Text
                        className="text-[15px] font-bold"
                        style={{ color: operation === 2 ? "white" : colors.text }}
                    >
                        Subtract
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Second Duration Card */}
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
                    SECOND DURATION
                </Text>
                
                <View className="flex-row justify-between w-full">
                    {/* Days */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Days</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "d2")}
                            value={inputs.d2}
                            width="100%"
                        />
                    </View>
                    {/* Hours */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Hours</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "h2")}
                            value={inputs.h2}
                            width="100%"
                        />
                    </View>
                    {/* Minutes */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Mins</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "m2")}
                            value={inputs.m2}
                            width="100%"
                        />
                    </View>
                    {/* Seconds */}
                    <View className="items-center flex-1 mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>Secs</Text>
                        <CustomInput
                            placeholder="0"
                            onChangeText={(e) => changeValues(e, "s2")}
                            value={inputs.s2}
                            width="100%"
                        />
                    </View>
                </View>
            </View>

            {/* Calculate Button */}
            <View className="items-center mb-6">
                <Button
                    mode="contained"
                    onPress={() => {
                        let answer = calculateTime(inputs, operation);
                        setAns(answer);
                    }}
                    buttonColor={colors.secondary}
                    textColor="#fff"
                    style={{ borderRadius: 12, paddingVertical: 4, width: "100%" }}
                >
                    Calculate
                </Button>
            </View>

            {/* Result Card */}
            {ans.day !== undefined && (
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
                        RESULT DURATION
                    </Text>
                    
                    <View className="flex-row items-center justify-center">
                        {ans.isNegative && (
                            <Text
                                className="text-[32px] font-bold mr-2.5"
                                style={{ color: colors.secondary }}
                            >
                                -
                            </Text>
                        )}
                        
                        <View className="flex-row flex-1 justify-between items-center">
                            {/* Days */}
                            <View className="items-center flex-1">
                                <Text className="text-[28px] font-bold" style={{ color: colors.text }}>
                                    {ans.day}
                                </Text>
                                <Text
                                    className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "60") }}
                                >
                                    {ans.day === 1 ? "Day" : "Days"}
                                </Text>
                            </View>

                            <View style={{ width: 1, height: 30, backgroundColor: colors.divider + "30" }} />

                            {/* Hours */}
                            <View className="items-center flex-1">
                                <Text className="text-[28px] font-bold" style={{ color: colors.text }}>
                                    {ans.hou}
                                </Text>
                                <Text
                                    className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "60") }}
                                >
                                    {ans.hou === 1 ? "Hour" : "Hours"}
                                </Text>
                            </View>

                            <View style={{ width: 1, height: 30, backgroundColor: colors.divider + "30" }} />

                            {/* Minutes */}
                            <View className="items-center flex-1">
                                <Text className="text-[28px] font-bold" style={{ color: colors.text }}>
                                    {ans.min}
                                </Text>
                                <Text
                                    className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "60") }}
                                >
                                    {ans.min === 1 ? "Min" : "Mins"}
                                </Text>
                            </View>

                            <View style={{ width: 1, height: 30, backgroundColor: colors.divider + "30" }} />

                            {/* Seconds */}
                            <View className="items-center flex-1">
                                <Text className="text-[28px] font-bold" style={{ color: colors.text }}>
                                    {ans.sec}
                                </Text>
                                <Text
                                    className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "60") }}
                                >
                                    {ans.sec === 1 ? "Sec" : "Secs"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default TimeCalculator;
