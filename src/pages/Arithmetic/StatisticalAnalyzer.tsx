import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput";
import { addOpacity, addHistoryLog } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const StatisticalAnalyzer = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [rawInput, setRawInput] = useState("");
    const [parsedNumbers, setParsedNumbers] = useState<number[]>([]);

    const [results, setResults] = useState<{
        hasCalculated: boolean;
        count: number;
        sum: number;
        mean: number;
        median: number;
        mode: string;
        min: number;
        max: number;
        range: number;
        popVar: number;
        samVar: number | string;
        popSD: number;
        samSD: number | string;
    }>({
        hasCalculated: false,
        count: 0,
        sum: 0,
        mean: 0,
        median: 0,
        mode: "",
        min: 0,
        max: 0,
        range: 0,
        popVar: 0,
        samVar: 0,
        popSD: 0,
        samSD: 0,
    });

    // Parse input in real-time to show preview badges
    useEffect(() => {
        if (!rawInput.trim()) {
            setParsedNumbers([]);
            return;
        }

        const numbers = rawInput
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .map((item) => parseFloat(item))
            .filter((num) => !isNaN(num));

        setParsedNumbers(numbers);
    }, [rawInput]);

    const formatNumber = (num: number, decimals: number = 4): number => {
        return parseFloat(num.toFixed(decimals));
    };

    const handleCalculate = () => {
        if (parsedNumbers.length === 0) return;

        const nums = [...parsedNumbers];
        const n = nums.length;

        // Sum
        const sumVal = nums.reduce((a, b) => a + b, 0);

        // Mean
        const meanVal = sumVal / n;

        // Median
        const sorted = [...nums].sort((a, b) => a - b);
        let medianVal = 0;
        if (n % 2 !== 0) {
            medianVal = sorted[Math.floor(n / 2)];
        } else {
            medianVal = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
        }

        // Mode
        const freqMap: Record<number, number> = {};
        let maxFreq = 0;
        nums.forEach((num) => {
            freqMap[num] = (freqMap[num] || 0) + 1;
            if (freqMap[num] > maxFreq) {
                maxFreq = freqMap[num];
            }
        });

        let modeVal = "";
        if (maxFreq === 1) {
            modeVal = "No mode (all values occur once)";
        } else {
            const modes: number[] = [];
            Object.keys(freqMap).forEach((key) => {
                const numKey = parseFloat(key);
                if (freqMap[numKey] === maxFreq) {
                    modes.push(numKey);
                }
            });
            modeVal = modes.join(", ") + ` (Freq: ${maxFreq})`;
        }

        // Min & Max
        const minVal = Math.min(...nums);
        const maxVal = Math.max(...nums);

        // Range
        const rangeVal = maxVal - minVal;

        // Variance
        const sqDiffSum = nums.reduce((acc, x) => acc + Math.pow(x - meanVal, 2), 0);
        const popVarVal = sqDiffSum / n;
        const samVarVal = n > 1 ? sqDiffSum / (n - 1) : "Undefined (requires N > 1)";

        // Standard Deviation
        const popSDVal = Math.sqrt(popVarVal);
        const samSDVal = n > 1 ? Math.sqrt(sqDiffSum / (n - 1)) : "Undefined (requires N > 1)";

        setResults({
            hasCalculated: true,
            count: n,
            sum: formatNumber(sumVal),
            mean: formatNumber(meanVal),
            median: formatNumber(medianVal),
            mode: modeVal,
            min: formatNumber(minVal),
            max: formatNumber(maxVal),
            range: formatNumber(rangeVal),
            popVar: formatNumber(popVarVal),
            samVar: typeof samVarVal === "number" ? formatNumber(samVarVal) : samVarVal,
            popSD: formatNumber(popSDVal),
            samSD: typeof samSDVal === "number" ? formatNumber(samSDVal) : samSDVal,
        });

        addHistoryLog(
            "Statistical Analyzer",
            `Dataset (N=${n}): [${nums.join(", ")}]`,
            `Mean: ${formatNumber(meanVal)}, Median: ${formatNumber(medianVal)}, Pop SD: ${formatNumber(popSDVal)}`
        );
    };

    const handleClear = () => {
        setRawInput("");
        setParsedNumbers([]);
        setResults({
            hasCalculated: false,
            count: 0,
            sum: 0,
            mean: 0,
            median: 0,
            mode: "",
            min: 0,
            max: 0,
            range: 0,
            popVar: 0,
            samVar: 0,
            popSD: 0,
            samSD: 0,
        });
    };

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* Description Card */}
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
                    DESCRIPTIVE STATISTICS
                </Text>
                
                <Ionicons name="stats-chart-outline" size={32} color={colors.secondary} style={{ marginVertical: 10 }} />

                <Text
                    className="text-[13px] text-center opacity-70 leading-5"
                    style={{ color: colors.text }}
                >
                    Type a list of numbers separated by commas to calculate mean, median, mode, variance, and standard deviation.
                </Text>
            </View>

            {/* Inputs Card */}
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
                    className="text-[12px] font-bold mb-3 tracking-[0.5px]"
                    style={{ color: colors.secondary }}
                >
                    DATASET VALUES
                </Text>

                <CustomInput
                    placeholder="e.g. 10, 15, 20, 25, 25, 30"
                    onChangeText={setRawInput}
                    value={rawInput}
                    keyboardType="default"
                    width="100%"
                />

                {/* Parsed Numbers Preview */}
                {parsedNumbers.length > 0 && (
                    <View className="mt-4 pt-3 border-t border-dashed" style={{ borderColor: addOpacity(colors.divider, "10") }}>
                        <Text
                            className="text-[11px] font-bold mb-2 tracking-[0.5px]"
                            style={{ color: addOpacity(colors.text, "50") }}
                        >
                            PARSED DATA ({parsedNumbers.length} items)
                        </Text>
                        <View className="flex-row flex-wrap gap-1.5">
                            {parsedNumbers.map((num, idx) => (
                                <View
                                    key={idx}
                                    className="px-2.5 py-1 rounded-xl"
                                    style={{ backgroundColor: addOpacity(colors.secondary, "10") }}
                                >
                                    <Text
                                        className="text-[11px] font-bold"
                                        style={{ color: colors.secondary }}
                                    >
                                        {num}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </View>

            {/* Action buttons */}
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

            {/* Calculations Dashboard */}
            {results.hasCalculated && (
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
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="analytics-outline" size={16} color={colors.secondary} style={{ marginRight: 6 }} />
                        <Text
                            className="text-[12px] font-bold tracking-[1px]"
                            style={{ color: colors.secondary }}
                        >
                            DESCRIPTIVE STATISTICS SUMMARY
                        </Text>
                    </View>

                    {/* Properties List */}
                    <View className="gap-y-3">
                        {/* Mean, Median, Mode */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <Text
                                className="text-[11px] font-bold mb-3 tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "50") }}
                            >
                                CENTRAL TENDENCY
                            </Text>
                            
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Mean (Average)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.mean}</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Median (Middle)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.median}</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[13px] mr-2" style={{ color: colors.text }}>Mode (Most Freq.)</Text>
                                <Text className="text-[13px] font-bold flex-1 text-right" numberOfLines={1} style={{ color: colors.secondary }}>
                                    {results.mode}
                                </Text>
                            </View>
                        </View>

                        {/* Variance and SD */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <Text
                                className="text-[11px] font-bold mb-3 tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "50") }}
                            >
                                DISPERSION (SPREAD)
                            </Text>

                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Population Variance (σ²)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.popVar}</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-2.5">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Sample Variance (s²)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.samVar}</Text>
                            </View>
                            
                            <View className="h-[1px] my-1 opacity-10" style={{ backgroundColor: colors.text }} />

                            <View className="flex-row justify-between items-center mt-2.5 mb-2">
                                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>Population SD (σ)</Text>
                                <Text className="text-[16px] font-bold" style={{ color: colors.secondary }}>{results.popSD}</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>Sample SD (s)</Text>
                                <Text className="text-[16px] font-bold" style={{ color: colors.secondary }}>{results.samSD}</Text>
                            </View>
                        </View>

                        {/* Range, Min, Max, Count */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <Text
                                className="text-[11px] font-bold mb-3 tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "50") }}
                            >
                                DATASET SUMMARY
                            </Text>

                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Total Count (N)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.count}</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Sum Total</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.sum}</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Minimum Value (Min)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.min}</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-[13px]" style={{ color: colors.text }}>Maximum Value (Max)</Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.text }}>{results.max}</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>Range (Max - Min)</Text>
                                <Text className="text-[16px] font-bold" style={{ color: colors.secondary }}>{results.range}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default StatisticalAnalyzer;
