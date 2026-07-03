import { Pressable, View } from "react-native";
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

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="justify-center content-center w-full">
                <View className="flex-row items-center justify-center mt-5">
                    <View
                        className="items-center justify-center"
                        style={{ width: (wp("100%") - 10) / 4 }}
                    >
                        <Text
                            className="text-[18px]"
                            style={{ color: colors.text }}
                        >
                            Days
                        </Text>
                    </View>
                    <View
                        className="items-center justify-center"
                        style={{ width: (wp("100%") - 10) / 4 }}
                    >
                        <Text
                            className="text-[18px]"
                            style={{ color: colors.text }}
                        >
                            Hours
                        </Text>
                    </View>
                    <View
                        className="items-center justify-center"
                        style={{ width: (wp("100%") - 10) / 4 }}
                    >
                        <Text
                            className="text-[18px]"
                            style={{ color: colors.text }}
                        >
                            Minutes
                        </Text>
                    </View>
                    <View
                        className="items-center justify-center"
                        style={{ width: (wp("100%") - 10) / 4 }}
                    >
                        <Text
                            className="text-[18px]"
                            style={{ color: colors.text }}
                        >
                            Seconds
                        </Text>
                    </View>
                </View>
                <View className="flex-row justify-evenly mt-[10px]">
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
                <View className="flex-row w-full items-center justify-center mt-[5px]">
                    <View className="rounded-full overflow-hidden">
                        <Pressable
                            className="flex-row items-center p-[10px]"
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
                            <Text
                                className="text-[20px]"
                                style={{ color: colors.text }}
                            >
                                Add (+)
                            </Text>
                        </Pressable>
                    </View>
                    <View className="rounded-full overflow-hidden">
                        <Pressable
                            className="flex-row items-center p-[10px]"
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
                            <Text
                                className="text-[20px]"
                                style={{ color: colors.text }}
                            >
                                Subtract (-)
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View className="flex-row justify-evenly mt-[10px]">
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
                <View className="items-center mt-[20px]">
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
                    <View className="flex-row items-center justify-center mt-[30px]">
                        {ans.day && ans.day > 0 && (
                            <Text
                                className="text-[35px] text-center"
                                style={{ color: colors.secondary }}
                            >
                                {ans.day}
                            </Text>
                        )}
                        {ans.day && ans.day > 0 && (
                            <Text
                                className="text-[18px]"
                                style={{ color: colors.text }}
                            >
                                {" "}D
                            </Text>
                        )}
                        {ans.hou && ans.hou > 0 && (
                            <Text
                                className="text-[35px] text-center"
                                style={{ color: colors.secondary }}
                            >
                                {" "}{ans.hou}
                            </Text>
                        )}
                        {ans.hou && ans.hou > 0 && (
                            <Text
                                className="text-[18px]"
                                style={{ color: colors.text }}
                            >
                                {" "}H
                            </Text>
                        )}
                        {ans.min && ans.min > 0 && (
                            <Text
                                className="text-[35px] text-center"
                                style={{ color: colors.secondary }}
                            >
                                {" "}{ans.min}
                            </Text>
                        )}
                        {ans.min && ans.min > 0 && (
                            <Text
                                className="text-[18px]"
                                style={{ color: colors.text }}
                            >
                                {" "}M
                            </Text>
                        )}
                        {ans.sec && ans.sec > 0 && (
                            <Text
                                className="text-[35px] text-center"
                                style={{ color: colors.secondary }}
                            >
                                {" "}{ans.sec}
                            </Text>
                        )}
                        {ans.sec && ans.sec > 0 && (
                            <Text
                                className="text-[18px]"
                                style={{ color: colors.text }}
                            >
                                {" "}S
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default TimeCalculator;
