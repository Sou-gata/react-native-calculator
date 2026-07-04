import { ScrollView, View, Text } from "react-native";
import React, { useState } from "react";
import { useTheme, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { colorSchemeType } from "../../../types";
import { addOpacity, addHistoryLog } from "../../helpers/functions";

const EMICalculator = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [inputes, setInputes] = useState({ p: "", r: "", t: "" });
    const [ans, setAns] = useState({ emi: "", i: "", a: "" });

    const calculate = () => {
        const p = parseFloat(inputes.p);
        const R = parseFloat(inputes.r);
        const t = parseFloat(inputes.t);
        if (!isNaN(p) && !isNaN(R) && !isNaN(t) && p > 0 && R > 0 && t > 0) {
            const r = R / (12 * 100);
            const n = t * 12;
            const emiMain = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const emi = emiMain.toFixed(2);
            const totalA = parseFloat((emiMain * n).toFixed(2));
            const totalI = parseFloat((totalA - p).toFixed(2));
            const emiStr = parseFloat(emi).toFixed(2);
            const iStr = totalI.toFixed(2);
            const aStr = totalA.toFixed(2);
            setAns({
                emi: emiStr,
                i: iStr,
                a: aStr
            });
            addHistoryLog(
                "EMI Calculator",
                `Principal: ₹${p}, Rate: ${R}%, Tenure: ${t} years`,
                `EMI: ₹${emiStr}/mo, Total Int: ₹${iStr}, Total Pay: ₹${aStr}`
            );
        } else {
            setAns({ emi: "", i: "", a: "" });
        }
    };

    // Calculate percentages for repayment break-up bar
    const pVal = parseFloat(inputes.p) || 0;
    const aVal = parseFloat(ans.a) || 0;
    
    const principalPercent = aVal > 0 ? Math.round((pVal / aVal) * 100) : 0;
    const interestPercent = aVal > 0 ? 100 - principalPercent : 0;

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 20 }}
        >
            {/* Input Card */}
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
                <View className="mb-4 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        LOAN AMOUNT / PRINCIPAL (₹)
                    </Text>
                    <CustomInput
                        placeholder="0.00"
                        value={inputes.p}
                        width="100%"
                        onChangeText={(e) => setInputes((prev) => ({ ...prev, p: e }))}
                    />
                </View>

                <View className="mb-4 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        RATE OF INTEREST (% P.A.)
                    </Text>
                    <CustomInput
                        placeholder="0.0"
                        value={inputes.r}
                        width="100%"
                        onChangeText={(e) => setInputes((prev) => ({ ...prev, r: e }))}
                    />
                </View>

                <View className="w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        LOAN TENURE (YEARS)
                    </Text>
                    <CustomInput
                        placeholder="0"
                        value={inputes.t}
                        width="100%"
                        onChangeText={(e) => setInputes((prev) => ({ ...prev, t: e }))}
                    />
                </View>

                <View className="items-center mt-6 w-full">
                    <Button
                        mode="contained"
                        onPress={calculate}
                        buttonColor={colors.secondary}
                        textColor="white"
                        className="w-full h-11 justify-center rounded-2xl"
                        labelStyle={{ fontSize: 15, fontWeight: "bold" }}
                    >
                        Calculate EMI
                    </Button>
                </View>
            </View>

            {/* Results Dashboard Card */}
            {ans.emi ? (
                <View
                    className="p-6 rounded-3xl border mb-6"
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
                        className="text-center text-[12px] font-bold tracking-[0.8px] mb-2"
                        style={{ color: addOpacity(colors.text, "60") }}
                    >
                        MONTHLY EMI
                    </Text>

                    <Text
                        className="text-center text-[36px] font-extrabold my-2"
                        style={{ color: colors.secondary }}
                    >
                        ₹ {ans.emi}
                    </Text>

                    <View
                        className="h-[1px] w-full my-4"
                        style={{ backgroundColor: addOpacity(colors.divider, "10") }}
                    />

                    {/* EMI Grid Details */}
                    <View className="flex-row justify-between mb-5">
                        <View className="flex-1 items-center border-r" style={{ borderColor: addOpacity(colors.divider, "10") }}>
                            <Text className="text-[11px] font-bold tracking-[0.5px] mb-1.5" style={{ color: addOpacity(colors.text, "50") }}>
                                TOTAL INTEREST
                            </Text>
                            <Text className="text-[16px] font-bold" style={{ color: colors.text }}>
                                ₹ {ans.i}
                            </Text>
                        </View>

                        <View className="flex-1 items-center">
                            <Text className="text-[11px] font-bold tracking-[0.5px] mb-1.5" style={{ color: addOpacity(colors.text, "50") }}>
                                TOTAL REPAYMENT
                            </Text>
                            <Text className="text-[16px] font-bold" style={{ color: colors.text }}>
                                ₹ {ans.a}
                            </Text>
                        </View>
                    </View>

                    {/* Breakdown Meter */}
                    <View className="mt-2">
                        <Text className="text-[12px] font-bold tracking-[0.5px] mb-2" style={{ color: addOpacity(colors.text, "60") }}>
                            BREAK-UP OF TOTAL PAYMENT
                        </Text>
                        
                        {/* Horizontal Bar Chart */}
                        <View
                            className="flex-row h-3.5 w-full rounded-full overflow-hidden"
                            style={{ backgroundColor: addOpacity(colors.divider, "10") }}
                        >
                            <View
                                style={{
                                    width: `${principalPercent}%`,
                                    backgroundColor: colors.primary || "#3f51b5",
                                }}
                            />
                            <View
                                style={{
                                    width: `${interestPercent}%`,
                                    backgroundColor: colors.secondary || "#f50057",
                                }}
                            />
                        </View>

                        {/* Chart Legend */}
                        <View className="flex-row justify-between mt-3 px-1">
                            <View className="flex-row items-center">
                                <View
                                    className="w-3.5 h-3.5 rounded-full mr-2"
                                    style={{ backgroundColor: colors.primary || "#3f51b5" }}
                                />
                                <Text className="text-[12px] font-semibold" style={{ color: addOpacity(colors.text, "70") }}>
                                    Principal: {principalPercent}%
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <View
                                    className="w-3.5 h-3.5 rounded-full mr-2"
                                    style={{ backgroundColor: colors.secondary || "#f50057" }}
                                />
                                <Text className="text-[12px] font-semibold" style={{ color: addOpacity(colors.text, "70") }}>
                                    Interest: {interestPercent}%
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ) : null}
        </ScrollView>
    );
};

export default EMICalculator;
