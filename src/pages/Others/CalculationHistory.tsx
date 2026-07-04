import { View, ScrollView, TouchableOpacity, Share } from "react-native";
import { useState, useEffect } from "react";
import { useTheme, Text, Snackbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import { addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

type HistoryItem = {
    id: string;
    toolName: string;
    detail: string;
    result: string;
    timestamp: number;
};

const CalculationHistory = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const loadHistory = async () => {
        try {
            const data = await AsyncStorage.getItem("advanced_calc_history");
            if (data) {
                setHistory(JSON.parse(data));
            } else {
                setHistory([]);
            }
        } catch (e) {
            console.error("Failed to load calculation history", e);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const handleCopy = (text: string) => {
        Clipboard.setString(text);
        setSnackbarMsg("Copied to clipboard!");
        setSnackbarVisible(true);
    };

    const handleDeleteItem = async (id: string) => {
        try {
            const updated = history.filter((item) => item.id !== id);
            setHistory(updated);
            await AsyncStorage.setItem("advanced_calc_history", JSON.stringify(updated));
            setSnackbarMsg("History item deleted");
            setSnackbarVisible(true);
        } catch (e) {
            console.error("Failed to delete history item", e);
        }
    };

    const handleClearAll = async () => {
        try {
            setHistory([]);
            await AsyncStorage.removeItem("advanced_calc_history");
            setSnackbarMsg("All calculation history cleared");
            setSnackbarVisible(true);
        } catch (e) {
            console.error("Failed to clear history log", e);
        }
    };

    const handleShare = async (item: HistoryItem) => {
        try {
            await Share.share({
                message: `[${item.toolName}]\nCalculation Details: ${item.detail}\nResult: ${item.result}`,
            });
        } catch (e) {
            console.error("Failed to share", e);
        }
    };

    const formatDate = (timestamp: number) => {
        const d = new Date(timestamp);
        return d.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Info & Clear All Action */}
                {history.length > 0 && (
                    <View className="flex-row items-center justify-between mb-5">
                        <Text
                            className="text-[13px] font-bold tracking-[0.5px]"
                            style={{ color: addOpacity(colors.text, "50") }}
                        >
                            LAST 15 ADVANCED CALCULATIONS
                        </Text>
                        <TouchableOpacity
                            onPress={handleClearAll}
                            className="flex-row items-center px-3 py-1.5 rounded-xl border"
                            style={{
                                borderColor: addOpacity("#EF4444", "20"),
                                backgroundColor: addOpacity("#EF4444", "05"),
                            }}
                        >
                            <Ionicons name="trash-outline" size={14} color="#EF4444" style={{ marginRight: 4 }} />
                            <Text className="text-[11px] font-bold" style={{ color: "#EF4444" }}>
                                Clear All
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* History list */}
                {history.length > 0 ? (
                    history.map((item) => (
                        <View
                            key={item.id}
                            className="p-4 rounded-3xl border mb-4"
                            style={{
                                backgroundColor: colors.elevation.level2,
                                borderColor: addOpacity(colors.divider, "10"),
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.04,
                                shadowRadius: 6,
                                elevation: 2,
                            }}
                        >
                            {/* Card Header: Tool Name & Date */}
                            <View className="flex-row items-center justify-between pb-3 border-b border-dashed mb-3" style={{ borderColor: addOpacity(colors.divider, "08") }}>
                                <View className="flex-row items-center flex-1 mr-2">
                                    <View
                                        className="w-7 h-7 rounded-lg items-center justify-center mr-2"
                                        style={{ backgroundColor: addOpacity(colors.secondary, "10") }}
                                    >
                                        <Ionicons name="calculator-outline" size={14} color={colors.secondary} />
                                    </View>
                                    <Text className="text-[13px] font-bold flex-1" style={{ color: colors.text }} numberOfLines={1}>
                                        {item.toolName}
                                    </Text>
                                </View>
                                <Text className="text-[11px] font-semibold opacity-40" style={{ color: colors.text }}>
                                    {formatDate(item.timestamp)}
                                </Text>
                            </View>

                            {/* Details (Inputs) */}
                            <View className="mb-2">
                                <Text
                                    className="text-[10px] font-bold mb-1 tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "40") }}
                                >
                                    CALCULATION DETAIL
                                </Text>
                                <Text className="text-[13px] leading-5" style={{ color: colors.text }}>
                                    {item.detail}
                                </Text>
                            </View>

                            {/* Result */}
                            <View className="p-3 rounded-2xl mb-3" style={{ backgroundColor: addOpacity(colors.secondary, "05") }}>
                                <Text
                                    className="text-[10px] font-bold mb-1 tracking-[0.5px]"
                                    style={{ color: colors.secondary }}
                                >
                                    RESULT
                                </Text>
                                <Text className="text-[14px] font-bold" style={{ color: colors.text }}>
                                    {item.result}
                                </Text>
                            </View>

                            {/* Actions Bar */}
                            <View className="flex-row items-center justify-end gap-x-2">
                                <TouchableOpacity
                                    onPress={() => handleShare(item)}
                                    className="w-9 h-9 rounded-xl items-center justify-center border"
                                    style={{
                                        borderColor: addOpacity(colors.divider, "08"),
                                        backgroundColor: colors.backgroundColor,
                                    }}
                                >
                                    <Ionicons name="share-social-outline" size={16} color={colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleCopy(item.result)}
                                    className="w-9 h-9 rounded-xl items-center justify-center border"
                                    style={{
                                        borderColor: addOpacity(colors.divider, "08"),
                                        backgroundColor: colors.backgroundColor,
                                    }}
                                >
                                    <Ionicons name="copy-outline" size={16} color={colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDeleteItem(item.id)}
                                    className="w-9 h-9 rounded-xl items-center justify-center border"
                                    style={{
                                        borderColor: addOpacity("#EF4444", "15"),
                                        backgroundColor: colors.backgroundColor,
                                    }}
                                >
                                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View className="items-center justify-center py-[100px] px-5">
                        <Ionicons
                            name="receipt-outline"
                            size={56}
                            color={colors.secondary}
                            style={{ opacity: 0.35, marginBottom: 15 }}
                        />
                        <Text
                            className="text-[16px] font-bold mb-1 text-center"
                            style={{ color: colors.text }}
                        >
                            No Calculations Yet
                        </Text>
                        <Text
                            className="text-[12px] opacity-60 text-center leading-5"
                            style={{ color: colors.text }}
                        >
                            Perform calculations in advanced tools (e.g. BMI, EMI, Quadratic Solver) to see them logged here.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
                style={{ backgroundColor: colors.elevation.level2 }}
            >
                <Text style={{ color: colors.text, fontWeight: "bold" }}>{snackbarMsg}</Text>
            </Snackbar>
        </View>
    );
};

export default CalculationHistory;
