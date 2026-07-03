import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { colorSchemeType } from "../../types";
import { parseNumber, addOpacity } from "../helpers/functions";

const PowerConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [ans, setAns] = useState<{
        wat: string;
        kwat: string;
        hrsp: string;
        fpps: string;
        btu: string;
    }>({
        wat: "",
        kwat: "",
        hrsp: "",
        fpps: "",
        btu: "",
    });
    const [activeKey, setActiveKey] = useState<string>("wat");
    const setOutAns = (
        wat: string,
        kwat: string,
        hrsp: string,
        fpps: string,
        btu: string
    ) => {
        setAns({
            wat,
            kwat,
            hrsp,
            fpps,
            btu,
        });
    };
    const setEmpty = () => {
        setAns({
            wat: "",
            kwat: "",
            hrsp: "",
            fpps: "",
            btu: "",
        });
    };
    const fixed = (val: number): string => parseNumber(val).toString();

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        {
                            key: "wat",
                            label: "Watt",
                            sub: "W",
                            val: ans.wat,
                            ph: "Watt",
                            change: (e: string) => {
                                if (e !== "") {
                                    const wat = parseFloat(e);
                                    if (!isNaN(wat)) {
                                        const kwat = fixed(wat * 0.001);
                                        const hrsp = fixed(wat * 0.0013141);
                                        const fpps = fixed(wat * 0.737562149);
                                        const btu = fixed(wat * 0.056869);
                                        setOutAns(e, kwat, hrsp, fpps, btu);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "kwat",
                            label: "Kilowatt",
                            sub: "kW",
                            val: ans.kwat,
                            ph: "Kilowatt",
                            change: (e: string) => {
                                if (e !== "") {
                                    const kwat = parseFloat(e);
                                    if (!isNaN(kwat)) {
                                        const wat = fixed(kwat * 1000);
                                        const hrsp = fixed(kwat * 1.3596216);
                                        const fpps = fixed(kwat * 737.562149);
                                        const btu = fixed(kwat * 56.86902);
                                        setOutAns(wat, e, hrsp, fpps, btu);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "hrsp",
                            label: "Horsepower",
                            sub: "hp",
                            val: ans.hrsp,
                            ph: "Horsepower",
                            change: (e: string) => {
                                if (e !== "") {
                                    const hrsp = parseFloat(e);
                                    if (!isNaN(hrsp)) {
                                        const wat = fixed(hrsp * 745.699872);
                                        const kwat = fixed(Number(wat) * 0.001);
                                        const fpps = fixed(
                                            Number(kwat) * 737.562149
                                        );
                                        const btu = fixed(hrsp * 42.4072335);
                                        setOutAns(wat, kwat, e, fpps, btu);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "fpps",
                            label: "Foot-pound/second",
                            sub: "ft-lb/s",
                            val: ans.fpps,
                            ph: "Foot-pound/second",
                            change: (e: string) => {
                                if (e !== "") {
                                    const fpps = parseFloat(e);
                                    if (!isNaN(fpps)) {
                                        const wat = fixed(fpps * 1.355818);
                                        const kwat = fixed(Number(wat) * 0.001);
                                        const hrsp = fixed(
                                            Number(kwat) * 737.562149
                                        );
                                        const btu = fixed(fpps * 0.077104047);
                                        setOutAns(wat, kwat, hrsp, e, btu);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "btu",
                            label: "BTUs/minute",
                            sub: "BTU/min",
                            val: ans.btu,
                            ph: "BTUs/minute",
                            change: (e: string) => {
                                if (e !== "") {
                                    const btu = parseFloat(e);
                                    if (!isNaN(btu)) {
                                        const wat = fixed(btu * 17.58426421);
                                        const kwat = fixed(Number(wat) * 0.001);
                                        const hrsp = fixed(
                                            Number(kwat) * 737.562149
                                        );
                                        const fpps = fixed(btu * 12.9694877);
                                        setOutAns(wat, kwat, hrsp, fpps, e);
                                    }
                                } else setEmpty();
                            }
                        },
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
                                            value={item.val}
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
                                            {item.val || item.ph}
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

export default PowerConverter;
