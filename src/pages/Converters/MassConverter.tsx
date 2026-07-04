import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { parseNumber, addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const MassConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [kg, setKg] = useState<string>("");
    const [gm, setGm] = useState<string>("");
    const [lb, setLb] = useState<string>("");
    const [ounce, setOunce] = useState<string>("");
    const [activeKey, setActiveKey] = useState<string>("kg");

    const onChangeKg = (e: string) => {
        setKg(e);
        if (e !== "") {
            setGm(parseNumber(parseFloat(e) * 1000).toString());
            setLb(parseNumber(parseFloat(e) * 2.20462).toString());
            setOunce(parseNumber(parseFloat(e) * 35.274).toString());
        } else if (e === "") {
            setGm("");
            setLb("");
            setOunce("");
        }
    };
    const onChangeGm = (e: string) => {
        setGm(e);
        if (e !== "") {
            setKg(parseNumber(parseFloat(e) * 0.001).toString());
            setLb(parseNumber(parseFloat(e) / 453.6).toString());
            setOunce(parseNumber(parseFloat(e) * 0.035274).toString());
        } else if (e === "") {
            setKg("");
            setLb("");
            setOunce("");
        }
    };
    const onChangeLb = (e: string) => {
        setLb(e);
        if (e !== "") {
            setKg(parseNumber(parseFloat(e) / 2.20462).toString());
            setGm(parseNumber((parseFloat(e) * 1000) / 2.20462).toString());
            setOunce(parseNumber(parseFloat(e) * 16).toString());
        } else if (e === "") {
            setKg("");
            setGm("");
            setOunce("");
        }
    };
    const onChangeOz = (e: string) => {
        setOunce(e);
        if (e !== "") {
            setKg(parseNumber(parseFloat(e) / 35.274).toString());
            setGm(parseNumber((parseFloat(e) * 1000) / 35.274).toString());
            setLb(parseNumber(parseFloat(e) / 16).toString());
        } else if (e === "") {
            setKg("");
            setGm("");
            setOunce("");
        }
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        { key: "kg", label: "Kilogram", sub: "kg", val: kg, ph: "Kilogram", change: onChangeKg },
                        { key: "gm", label: "Gram", sub: "g", val: gm, ph: "Gram", change: onChangeGm },
                        { key: "lb", label: "Pound", sub: "lb", val: lb, ph: "Pound", change: onChangeLb },
                        { key: "ounce", label: "Ounce", sub: "oz", val: ounce, ph: "Ounce", change: onChangeOz },
                    ].map((item, idx) => {
                        const isActive = activeKey === item.key;
                        return (
                            <Pressable
                                key={idx}
                                onPress={() => setActiveKey(item.key)}
                                className="flex-row items-center justify-between p-3.5 mb-3 rounded-2xl border"
                                style={{
                                    backgroundColor: isActive ? addOpacity(colors.secondary, "08") : colors.elevation.level2,
                                    borderColor: isActive ? colors.secondary : addOpacity(colors.divider, "20"),
                                    borderWidth: isActive ? 1.5 : 1,
                                }}
                            >
                                <View className="pr-2 justify-center">
                                    <Text
                                        className="text-[16px] font-semibold"
                                        style={{ color: colors.text }}
                                    >
                                        {item.label}
                                    </Text>
                                    <Text
                                        className="text-[12px] opacity-60 mt-0.5"
                                        style={{ color: colors.text }}
                                    >
                                        {item.sub}
                                    </Text>
                                </View>
                                <View className="flex-1 justify-center">
                                    {isActive ? (
                                        <TextInput
                                            className="text-right text-[18px] font-bold p-0 py-1 flex-1"
                                            style={{ color: colors.text }}
                                            value={item.val.toString()}
                                            onChangeText={item.change}
                                            placeholder={item.ph}
                                            placeholderTextColor={colors.paceHolder}
                                            keyboardType="decimal-pad"
                                            autoFocus={true}
                                            selectTextOnFocus={true}
                                        />
                                    ) : (
                                        <Text
                                            className="text-right text-[18px] font-semibold py-1 flex-1"
                                            style={{ color: item.val ? colors.text : colors.paceHolder }}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.val.toString() || item.ph}
                                        </Text>
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default MassConverter;
