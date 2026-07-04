import { ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import SegmentedButtons from "../../components/SegmentedButtons";
import CustomInput from "../../components/CustomInput";
import { colorSchemeType } from "../../../types";
import { addOpacity, addHistoryLog } from "../../helpers/functions";

const Gst = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [selected, setSelected] = useState(3);
    const [text, setText] = useState("");
    const [ans, setAns] = useState({
        cost: "",
        cs: "",
        taxAmount: "",
    });

    const data = [
        { label: "3%", value: 3 },
        { label: "5%", value: 5 },
        { label: "12%", value: 12 },
        { label: "18%", value: 18 },
        { label: "28%", value: 28 },
    ];

    useEffect(() => {
        if (text !== "") {
            calGst(text, selected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const onChangeText = (e: string) => {
        setText(e);
        if (e !== "") {
            calGst(e, selected);
        } else {
            setAns({ cost: "", cs: "", taxAmount: "" });
        }
    };

    const calGst = (price: string, percent: number) => {
        const tempPrice = parseFloat(price);
        if (isNaN(tempPrice)) {
            setAns({ cost: "", cs: "", taxAmount: "" });
            return;
        }
        const tax = (tempPrice * percent) / 100;
        const cost = tempPrice + tax;
        const cs = tax / 2;
        const costStr = cost.toFixed(2);
        const taxStr = tax.toFixed(2);
        setAns({
            cost: costStr,
            cs: cs.toFixed(2),
            taxAmount: taxStr,
        });
        addHistoryLog(
            "GST Calculator",
            `Original: ₹${tempPrice}, Tax Rate: ${percent}%`,
            `Total Cost: ₹${costStr}, Tax Amount: ₹${taxStr}`
        );
    };

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
                <Text
                    className="text-[13px] font-bold mb-3 tracking-[0.5px]"
                    style={{ color: addOpacity(colors.text, "70") }}
                >
                    ORIGINAL PRICE (₹)
                </Text>
                
                <View className="mb-6 w-full">
                    <CustomInput
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="0.00"
                        width="100%"
                    />
                </View>

                <Text
                    className="text-[13px] font-bold mb-3 tracking-[0.5px]"
                    style={{ color: addOpacity(colors.text, "70") }}
                >
                    SELECT GST RATE
                </Text>
                
                <View className="items-center w-full">
                    <SegmentedButtons
                        data={data}
                        value={selected}
                        onChange={setSelected}
                    />
                </View>
            </View>

            {/* Results Display */}
            <View
                className="p-6 rounded-3xl border"
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
                    className="text-center text-[12px] font-bold tracking-[0.8px]"
                    style={{ color: addOpacity(colors.text, "60") }}
                >
                    FINAL PRICE (INCLUSIVE OF GST)
                </Text>
                
                <Text
                    className="text-center text-[36px] font-extrabold my-3"
                    style={{ color: colors.secondary }}
                >
                    ₹ {ans.cost || "0.00"}
                </Text>

                <View
                    className="h-[1px] w-full my-4"
                    style={{ backgroundColor: addOpacity(colors.divider, "10") }}
                />

                {/* GST Split Grid */}
                <View className="flex-row justify-between mb-4">
                    <View className="flex-1 items-center border-r" style={{ borderColor: addOpacity(colors.divider, "10") }}>
                        <Text className="text-[11px] font-bold tracking-[0.5px] mb-1" style={{ color: addOpacity(colors.text, "50") }}>
                            CGST ({(selected / 2).toFixed(1)}%)
                        </Text>
                        <Text className="text-[16px] font-bold" style={{ color: colors.text }}>
                            ₹ {ans.cs || "0.00"}
                        </Text>
                    </View>

                    <View className="flex-1 items-center">
                        <Text className="text-[11px] font-bold tracking-[0.5px] mb-1" style={{ color: addOpacity(colors.text, "50") }}>
                            SGST ({(selected / 2).toFixed(1)}%)
                        </Text>
                        <Text className="text-[16px] font-bold" style={{ color: colors.text }}>
                            ₹ {ans.cs || "0.00"}
                        </Text>
                    </View>
                </View>

                <View
                    className="h-[1px] w-full my-2"
                    style={{ backgroundColor: addOpacity(colors.divider, "05") }}
                />

                <View className="flex-row justify-between items-center px-2 mt-2">
                    <Text className="text-[13px] font-semibold" style={{ color: addOpacity(colors.text, "60") }}>
                        Total Tax Amount
                    </Text>
                    <Text className="text-[16px] font-bold" style={{ color: colors.text }}>
                        ₹ {ans.taxAmount || "0.00"}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Gst;
