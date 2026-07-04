import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fraction from "../../components/Fraction";
import { equSolve, addOpacity } from "../../helpers/functions";
import { colorSchemeType, equnAnsType } from "../../../types";

const EquSolve = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [val, setVal] = useState({
        a1: "",
        a2: "",
        b1: "",
        b2: "",
        c1: "",
        c2: "",
    });
    const [finalAns, setFinalAns] = useState<equnAnsType>({
        numeratorX: 0,
        denominatorX: 0,
        numeratorY: 0,
        denominatorY: 0,
        x: 0,
        y: 0,
        noSolution: false,
        manySolution: false,
        normalSolution: false,
    });

    const changeValues = (e: string, place: string) =>
        setVal({ ...val, [place]: e });

    const handleCalculate = () => {
        const a1 = parseFloat(val.a1 || "0");
        const a2 = parseFloat(val.a2 || "0");
        const b1 = parseFloat(val.b1 || "0");
        const b2 = parseFloat(val.b2 || "0");
        const c1 = parseFloat(val.c1 || "0");
        const c2 = parseFloat(val.c2 || "0");

        // Prevent calculating if all fields are empty/zero
        if (
            val.a1 === "" &&
            val.a2 === "" &&
            val.b1 === "" &&
            val.b2 === "" &&
            val.c1 === "" &&
            val.c2 === ""
        ) {
            return;
        }

        // Reset previous solutions to prevent state pollution
        setFinalAns({
            numeratorX: 0,
            denominatorX: 0,
            numeratorY: 0,
            denominatorY: 0,
            x: 0,
            y: 0,
            noSolution: false,
            manySolution: false,
            normalSolution: false,
        });

        equSolve(a1, a2, b1, b2, c1, c2, setFinalAns);
    };

    const handleClear = () => {
        setVal({
            a1: "",
            a2: "",
            b1: "",
            b2: "",
            c1: "",
            c2: "",
        });
        setFinalAns({
            numeratorX: 0,
            denominatorX: 0,
            numeratorY: 0,
            denominatorY: 0,
            x: 0,
            y: 0,
            noSolution: false,
            manySolution: false,
            normalSolution: false,
        });
    };

    // Solution Status Details
    const getSolutionDetails = () => {
        if (finalAns.noSolution) {
            return {
                label: "No Solution",
                color: "#EF4444", // Red
                icon: "close-circle-outline",
                desc: "The lines are parallel and never intersect.",
            };
        } else if (finalAns.manySolution) {
            return {
                label: "Infinite Solutions",
                color: "#3B82F6", // Blue
                icon: "repeat-outline",
                desc: "The equations represent the same line.",
            };
        } else if (finalAns.normalSolution) {
            return {
                label: "Unique Solution Found",
                color: "#10B981", // Green
                icon: "checkmark-circle-outline",
                desc: "The lines intersect at a single coordinate.",
            };
        }
        return null;
    };

    const solutionDetails = getSolutionDetails();

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* System Description Card */}
            <View
                className="p-5 rounded-3xl border mb-5 items-center"
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
                    className="text-[12px] font-bold mb-2 tracking-[1px]"
                    style={{ color: addOpacity(colors.text, "50") }}
                >
                    SYSTEM OF 2 LINEAR EQUATIONS
                </Text>

                <View className="flex-row items-center justify-center my-3">
                    <View
                        className="pl-3.5 py-1.5 justify-center"
                        style={{
                            borderLeftWidth: 3,
                            borderLeftColor: colors.secondary,
                        }}
                    >
                        <Text
                            className="text-[18px] font-bold tracking-[0.5px]"
                            style={{ color: colors.text }}
                        >
                            a₁x + b₁y + c₁ = 0
                        </Text>
                        <Text
                            className="text-[18px] font-bold tracking-[0.5px] mt-1"
                            style={{ color: colors.text }}
                        >
                            a₂x + b₂y + c₂ = 0
                        </Text>
                    </View>
                </View>

                <Text
                    className="text-[13px] text-center opacity-70 leading-5"
                    style={{ color: colors.text }}
                >
                    Enter the coefficients for both equations to find the intersection point (x, y).
                </Text>
            </View>

            {/* Inputs System Card */}
            <View
                className="p-5 rounded-3xl border mb-5"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                    borderLeftWidth: 4,
                    borderLeftColor: colors.secondary,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                {/* Equation 1 Row */}
                <View className="mb-4">
                    <Text
                        className="text-[11px] font-bold mb-2 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "50") }}
                    >
                        EQUATION 1
                    </Text>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[55px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>a₁</Text>
                            <CustomInput
                                placeholder="a1"
                                onChangeText={(e) => changeValues(e, "a1")}
                                value={val.a1}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[14px] font-bold mt-4" style={{ color: colors.text }}>x +</Text>

                        <View className="items-center flex-1 min-w-[55px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>b₁</Text>
                            <CustomInput
                                placeholder="b1"
                                onChangeText={(e) => changeValues(e, "b1")}
                                value={val.b1}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[14px] font-bold mt-4" style={{ color: colors.text }}>y +</Text>

                        <View className="items-center flex-1 min-w-[55px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>c₁</Text>
                            <CustomInput
                                placeholder="c1"
                                onChangeText={(e) => changeValues(e, "c1")}
                                value={val.c1}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[14px] font-bold mt-4" style={{ color: colors.text }}>= 0</Text>
                    </View>
                </View>

                {/* Divider Line */}
                <View
                    className="h-[1px] my-3 opacity-15"
                    style={{ backgroundColor: colors.text }}
                />

                {/* Equation 2 Row */}
                <View>
                    <Text
                        className="text-[11px] font-bold mb-2 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "50") }}
                    >
                        EQUATION 2
                    </Text>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[55px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>a₂</Text>
                            <CustomInput
                                placeholder="a2"
                                onChangeText={(e) => changeValues(e, "a2")}
                                value={val.a2}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[14px] font-bold mt-4" style={{ color: colors.text }}>x +</Text>

                        <View className="items-center flex-1 min-w-[55px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>b₂</Text>
                            <CustomInput
                                placeholder="b2"
                                onChangeText={(e) => changeValues(e, "b2")}
                                value={val.b2}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[14px] font-bold mt-4" style={{ color: colors.text }}>y +</Text>

                        <View className="items-center flex-1 min-w-[55px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>c₂</Text>
                            <CustomInput
                                placeholder="c2"
                                onChangeText={(e) => changeValues(e, "c2")}
                                value={val.c2}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[14px] font-bold mt-4" style={{ color: colors.text }}>= 0</Text>
                    </View>
                </View>
            </View>

            {/* Actions */}
            <View className="flex-row justify-between w-full mb-6 gap-x-4">
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center shadow-sm"
                    style={{ backgroundColor: colors.secondary }}
                    onPress={handleCalculate}
                >
                    <Text className="text-white font-bold text-[15px]">Calculate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center border"
                    style={{
                        borderColor: addOpacity(colors.divider, "15"),
                        backgroundColor: colors.elevation.level2,
                    }}
                    onPress={handleClear}
                >
                    <Text style={{ color: colors.text }} className="font-bold text-[15px]">Clear</Text>
                </TouchableOpacity>
            </View>

            {/* Results Display */}
            {solutionDetails && (
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
                        className="text-[12px] font-bold mb-4 tracking-[1px]"
                        style={{ color: colors.secondary }}
                    >
                        CALCULATED SOLUTIONS
                    </Text>

                    {/* Status Alert Banner */}
                    <View
                        className="p-3.5 rounded-2xl border flex-row items-start mb-4"
                        style={{
                            backgroundColor: addOpacity(solutionDetails.color, "08"),
                            borderColor: addOpacity(solutionDetails.color, "30"),
                        }}
                    >
                        <Ionicons
                            name={solutionDetails.icon}
                            size={18}
                            color={solutionDetails.color}
                            style={{ marginRight: 8, marginTop: 1 }}
                        />
                        <View className="flex-1">
                            <Text
                                className="text-[13px] font-semibold"
                                style={{ color: colors.text }}
                            >
                                {solutionDetails.label}
                            </Text>
                            <Text
                                className="text-[11px] opacity-75 mt-0.5"
                                style={{ color: colors.text }}
                            >
                                {solutionDetails.desc}
                            </Text>
                        </View>
                    </View>

                    {/* Solutions list */}
                    {finalAns.normalSolution && (
                        <View className="gap-y-3">
                            {/* Variable x */}
                            <View
                                className="p-4 rounded-2xl border"
                                style={{
                                    backgroundColor: colors.backgroundColor,
                                    borderColor: addOpacity(colors.divider, "08"),
                                }}
                            >
                                <Text
                                    className="text-[11px] font-bold mb-1 tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    VALUE OF x
                                </Text>
                                <View className="flex-row items-center flex-wrap">
                                    <Text
                                        className="text-[22px] font-bold mr-4"
                                        style={{ color: colors.text }}
                                    >
                                        {finalAns.x}
                                    </Text>
                                    {Boolean(finalAns.denominatorX) && (
                                        <Fraction
                                            bullet={false}
                                            data={{
                                                text: "Exact",
                                                numerator: finalAns.numeratorX,
                                                denominator: finalAns.denominatorX,
                                            }}
                                            color={colors.secondary}
                                            size={14}
                                            style={{ marginTop: 2 }}
                                        />
                                    )}
                                </View>
                            </View>

                            {/* Variable y */}
                            <View
                                className="p-4 rounded-2xl border"
                                style={{
                                    backgroundColor: colors.backgroundColor,
                                    borderColor: addOpacity(colors.divider, "08"),
                                }}
                            >
                                <Text
                                    className="text-[11px] font-bold mb-1 tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    VALUE OF y
                                </Text>
                                <View className="flex-row items-center flex-wrap">
                                    <Text
                                        className="text-[22px] font-bold mr-4"
                                        style={{ color: colors.text }}
                                    >
                                        {finalAns.y}
                                    </Text>
                                    {Boolean(finalAns.denominatorY) && (
                                        <Fraction
                                            bullet={false}
                                            data={{
                                                text: "Exact",
                                                numerator: finalAns.numeratorY,
                                                denominator: finalAns.denominatorY,
                                            }}
                                            color={colors.secondary}
                                            size={14}
                                            style={{ marginTop: 2 }}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default EquSolve;
