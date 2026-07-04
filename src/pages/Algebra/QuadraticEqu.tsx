import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput";
import { solveQuadraticEqu, solveQuadraticDec, addOpacity, addHistoryLog } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const QuadraticEqu = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [veriable, setVeriable] = useState({ a: "", b: "", c: "" });
    const [ans, setAns] = useState<{
        inFraction: { rootOne: string; rootTwo: string };
        inDecimal: { rootOne: string; rootTwo: string };
        discriminant: number | undefined;
        isLinear: boolean;
        hasRoots: boolean;
        rootType: "real_distinct" | "real_equal" | "complex" | "linear" | undefined;
    }>({
        inFraction: { rootOne: "", rootTwo: "" },
        inDecimal: { rootOne: "", rootTwo: "" },
        discriminant: undefined,
        isLinear: false,
        hasRoots: false,
        rootType: undefined,
    });

    const changeValues = (e: string, values: string) => {
        setVeriable({ ...veriable, [values]: e });
    };

    const getAns = () => {
        let a = parseFloat(veriable.a || "0");
        let b = parseFloat(veriable.b || "0");
        let c = parseFloat(veriable.c || "0");

        if (isNaN(a) && isNaN(b) && isNaN(c)) return;

        // Linear equation case: a = 0
        if (a === 0) {
            if (b !== 0) {
                const rootVal = (-c / b).toFixed(4).replace(/\.?0+$/, "");
                setAns({
                    inFraction: { rootOne: `-${c}/${b}`, rootTwo: `-${c}/${b}` },
                    inDecimal: { rootOne: rootVal, rootTwo: rootVal },
                    discriminant: undefined,
                    isLinear: true,
                    hasRoots: true,
                    rootType: "linear",
                });
                addHistoryLog(
                    "Quadratic Equation Solver",
                    `Linear eq: ${b}x + ${c} = 0`,
                    `x = ${rootVal}`
                );
            } else {
                const resultMsg = b === 0 && c === 0 ? "Infinite solutions" : "No solution";
                setAns({
                    inFraction: { rootOne: "", rootTwo: "" },
                    inDecimal: {
                        rootOne: resultMsg,
                        rootTwo: resultMsg,
                    },
                    discriminant: undefined,
                    isLinear: true,
                    hasRoots: true,
                    rootType: "linear",
                });
                addHistoryLog(
                    "Quadratic Equation Solver",
                    `Linear eq: ${b}x + ${c} = 0`,
                    resultMsg
                );
            }
            return;
        }

        // Quadratic equation case: a != 0
        let disc = b * b - 4 * a * c;
        let inFraction = solveQuadraticEqu(a, b, c);
        let inDecimal = solveQuadraticDec(a, b, c);

        let rootType: "real_distinct" | "real_equal" | "complex" = "real_distinct";
        if (disc < 0) {
            rootType = "complex";
        } else if (disc === 0) {
            rootType = "real_equal";
        }

        setAns({
            inFraction: inFraction || { rootOne: "", rootTwo: "" },
            inDecimal,
            discriminant: disc,
            isLinear: false,
            hasRoots: true,
            rootType,
        });

        addHistoryLog(
            "Quadratic Equation Solver",
            `Eq: ${a}x² + ${b}x + ${c} = 0`,
            `x1 = ${inDecimal.rootOne}, x2 = ${inDecimal.rootTwo} (Discriminant = ${disc})`
        );
    };

    const clearInputs = () => {
        setVeriable({ a: "", b: "", c: "" });
        setAns({
            inFraction: { rootOne: "", rootTwo: "" },
            inDecimal: { rootOne: "", rootTwo: "" },
            discriminant: undefined,
            isLinear: false,
            hasRoots: false,
            rootType: undefined,
        });
    };

    // Color definitions based on root type
    const getRootTypeDetails = () => {
        switch (ans.rootType) {
            case "real_distinct":
                return {
                    label: "Two Real & Distinct Roots",
                    color: "#10B981", // Emerald Green
                    icon: "checkmark-circle-outline",
                };
            case "real_equal":
                return {
                    label: "One Real Double Root",
                    color: "#3B82F6", // Blue
                    icon: "information-circle-outline",
                };
            case "complex":
                return {
                    label: "Two Complex Conjugate Roots",
                    color: "#8B5CF6", // Purple
                    icon: "alert-circle-outline",
                };
            case "linear":
                return {
                    label: "Linear Equation Solution",
                    color: colors.secondary,
                    icon: "trending-up-outline",
                };
            default:
                return {
                    label: "",
                    color: colors.text,
                    icon: "help-circle-outline",
                };
        }
    };

    const rootDetails = getRootTypeDetails();

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* Formula Header Card */}
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
                    QUADRATIC FORMULA
                </Text>
                
                <View className="flex-row items-center justify-center my-3">
                    <Text className="text-[28px] font-bold" style={{ color: colors.secondary }}>a</Text>
                    <View className="flex-row items-start">
                        <Text className="text-[28px] font-bold" style={{ color: colors.text }}>x</Text>
                        <Text className="text-[14px] font-bold mt-[-5px]" style={{ color: colors.text }}>2</Text>
                    </View>
                    <Text className="text-[28px] font-bold" style={{ color: colors.text }}> + bx + c = 0</Text>
                </View>

                <Text
                    className="text-[13px] text-center opacity-70 leading-5"
                    style={{ color: colors.text }}
                >
                    Enter coefficients of your quadratic equation to solve for x using the quadratic formula.
                </Text>
            </View>

            {/* Input fields card */}
            <View
                className="p-5 rounded-3xl border mb-5"
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
                    className="text-[12px] font-bold mb-4 tracking-[0.5px]"
                    style={{ color: addOpacity(colors.text, "60") }}
                >
                    ENTER COEFFICIENTS
                </Text>

                <View className="flex-row items-center justify-between w-full flex-wrap">
                    {/* Input a */}
                    <View className="items-center flex-1 min-w-[70px] mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>a</Text>
                        <CustomInput
                            onChangeText={(e) => changeValues(e, "a")}
                            value={veriable.a}
                            placeholder="e.g. 1"
                            width="100%"
                        />
                    </View>

                    <Text className="text-[16px] font-bold mt-5" style={{ color: addOpacity(colors.text, "50") }}>x² +</Text>

                    {/* Input b */}
                    <View className="items-center flex-1 min-w-[70px] mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>b</Text>
                        <CustomInput
                            onChangeText={(e) => changeValues(e, "b")}
                            value={veriable.b}
                            placeholder="e.g. -5"
                            width="100%"
                        />
                    </View>

                    <Text className="text-[16px] font-bold mt-5" style={{ color: addOpacity(colors.text, "50") }}>x +</Text>

                    {/* Input c */}
                    <View className="items-center flex-1 min-w-[70px] mx-1">
                        <Text className="text-[12px] mb-1.5 font-semibold" style={{ color: colors.text }}>c</Text>
                        <CustomInput
                            onChangeText={(e) => changeValues(e, "c")}
                            value={veriable.c}
                            placeholder="e.g. 6"
                            width="100%"
                        />
                    </View>

                    <Text className="text-[16px] font-bold mt-5" style={{ color: addOpacity(colors.text, "50") }}>= 0</Text>
                </View>
            </View>

            {/* Action buttons */}
            <View className="flex-row justify-between w-full mb-6 gap-x-4">
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center shadow-sm"
                    style={{ backgroundColor: colors.secondary }}
                    onPress={getAns}
                >
                    <Text className="text-white font-bold text-[15px]">Calculate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center border"
                    style={{
                        borderColor: addOpacity(colors.divider, "15"),
                        backgroundColor: colors.elevation.level2,
                    }}
                    onPress={clearInputs}
                >
                    <Text style={{ color: colors.text }} className="font-bold text-[15px]">Clear</Text>
                </TouchableOpacity>
            </View>

            {/* Results Section */}
            {ans.hasRoots && (
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

                    {/* Root status banner */}
                    <View
                        className="p-3.5 rounded-2xl border flex-row items-center mb-4"
                        style={{
                            backgroundColor: addOpacity(rootDetails.color, "08"),
                            borderColor: addOpacity(rootDetails.color, "30"),
                        }}
                    >
                        <Ionicons
                            name={rootDetails.icon}
                            size={18}
                            color={rootDetails.color}
                            style={{ marginRight: 8 }}
                        />
                        <Text
                            className="text-[13px] font-semibold flex-1"
                            style={{ color: colors.text }}
                        >
                            {rootDetails.label}
                        </Text>
                    </View>

                    {/* Discriminant Display */}
                    {ans.discriminant !== undefined && (
                        <View
                            className="p-3 rounded-2xl flex-row justify-between items-center mb-4 border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "06"),
                            }}
                        >
                            <Text
                                className="text-[12px] font-bold opacity-60"
                                style={{ color: colors.text }}
                            >
                                Discriminant (Δ)
                            </Text>
                            <Text
                                className="text-[15px] font-bold"
                                style={{ color: rootDetails.color }}
                            >
                                {ans.discriminant}
                            </Text>
                        </View>
                    )}

                    {/* Roots Cards */}
                    {ans.isLinear ? (
                        // Linear Equation Solution
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
                                ROOT (x)
                            </Text>
                            <Text
                                className="text-[22px] font-bold"
                                style={{ color: colors.text }}
                            >
                                {ans.inDecimal.rootOne}
                            </Text>
                            {ans.inFraction.rootOne && ans.inFraction.rootOne !== ans.inDecimal.rootOne && (
                                <Text
                                    className="text-[13px] mt-1.5 opacity-60"
                                    style={{ color: colors.text }}
                                >
                                    Exact: {ans.inFraction.rootOne}
                                </Text>
                            )}
                        </View>
                    ) : (
                        // Quadratic Roots
                        <View className="gap-y-3">
                            {/* Root 1 */}
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
                                    FIRST ROOT (x₁)
                                </Text>
                                <Text
                                    className="text-[22px] font-bold"
                                    style={{ color: colors.text }}
                                >
                                    {ans.inDecimal.rootOne}
                                </Text>
                                {ans.inFraction.rootOne && ans.inFraction.rootOne !== ans.inDecimal.rootOne && (
                                    <Text
                                        className="text-[13px] mt-1.5 opacity-60"
                                        style={{ color: colors.text }}
                                    >
                                        Exact: {ans.inFraction.rootOne}
                                    </Text>
                                )}
                            </View>

                            {/* Root 2 */}
                            {ans.rootType !== "real_equal" && (
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
                                        SECOND ROOT (x₂)
                                    </Text>
                                    <Text
                                        className="text-[22px] font-bold"
                                        style={{ color: colors.text }}
                                    >
                                        {ans.inDecimal.rootTwo}
                                    </Text>
                                    {ans.inFraction.rootTwo && ans.inFraction.rootTwo !== ans.inDecimal.rootTwo && (
                                        <Text
                                            className="text-[13px] mt-1.5 opacity-60"
                                            style={{ color: colors.text }}
                                        >
                                            Exact: {ans.inFraction.rootTwo}
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default QuadraticEqu;
