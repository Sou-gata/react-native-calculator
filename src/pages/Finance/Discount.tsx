import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { colorSchemeType } from "../../../types";
import { addOpacity, addHistoryLog } from "../../helpers/functions";

const Discount = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [inputs, setInputs] = useState({
        price: "",
        discount: "",
    });
    const [ans, setAns] = useState({ cost: 0, discount: 0 });
    const [opacity, setOpacity] = useState(0);

    const calculate = (e: string, type: string) => {
        const nextInputs = { ...inputs, [type]: e };
        setInputs(nextInputs);

        const priceStr = nextInputs.price;
        const discountStr = nextInputs.discount;

        if (priceStr !== "" && discountStr !== "") {
            const price = parseFloat(priceStr);
            const discount = parseFloat(discountStr);
            if (!isNaN(price) && !isNaN(discount)) {
                const totalDis = (price * discount) / 100;
                const cost = price - totalDis;
                setAns({
                    cost: parseFloat(cost.toFixed(2)),
                    discount: parseFloat(totalDis.toFixed(2)),
                });
                setOpacity(1);
                addHistoryLog(
                    "Discount Calculator",
                    `Original: ₹${price}, Discount: ${discount}%`,
                    `Final Cost: ₹${cost.toFixed(2)}, Savings: ₹${totalDis.toFixed(2)}`
                );
                return;
            }
        }
        setAns({ cost: 0, discount: 0 });
        setOpacity(0);
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
                <View className="mb-5 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        ORIGINAL PRICE (₹)
                    </Text>
                    <CustomInput
                        onChangeText={(e) => calculate(e, "price")}
                        value={inputs.price}
                        placeholder="0.00"
                        width="100%"
                    />
                </View>

                <View className="w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        DISCOUNT RATE (%)
                    </Text>
                    <CustomInput
                        onChangeText={(e) => calculate(e, "discount")}
                        value={inputs.discount}
                        placeholder="0"
                        width="100%"
                    />
                </View>
            </View>

            {/* Savings Summary Card */}
            {Boolean(opacity) && (
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
                        FINAL PRICE (TO PAY)
                    </Text>
                    
                    <Text
                        className="text-center text-[36px] font-extrabold my-3"
                        style={{ color: colors.secondary }}
                    >
                        ₹ {ans.cost}
                    </Text>

                    <View
                        className="h-[1px] w-full my-4"
                        style={{ backgroundColor: addOpacity(colors.divider, "10") }}
                    />

                    <View className="flex-row items-center justify-between px-2">
                        <Text
                            className="text-[14px] font-semibold"
                            style={{ color: addOpacity(colors.text, "60") }}
                        >
                            You Save
                        </Text>
                        <View
                            className="px-3.5 py-1.5 rounded-full"
                            style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                        >
                            <Text
                                className="text-[14px] font-bold"
                                style={{ color: "#10b981" }}
                            >
                                ₹ {ans.discount} ({inputs.discount}%)
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default Discount;
