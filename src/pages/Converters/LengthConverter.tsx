import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { parseNumber, addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const LengthConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [ans, setAns] = useState({
        met: "",
        klm: "",
        inc: "",
        fet: "",
        mil: "",
        nom: "",
    });
    const [activeKey, setActiveKey] = useState<string>("met");
    const setOutAns = (
        met: string,
        klm: string,
        inc: string,
        fet: string,
        mil: string,
        nom: string
    ) => {
        setAns({
            met,
            klm,
            inc,
            fet,
            mil,
            nom,
        });
    };
    const setEmpty = () => {
        setAns({
            met: "",
            klm: "",
            inc: "",
            fet: "",
            mil: "",
            nom: "",
        });
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        {
                            key: "met",
                            label: "Meter",
                            sub: "m",
                            val: ans.met,
                            ph: "Meter",
                            change: (e: string) => {
                                if (e !== "") {
                                    const met = parseFloat(e);
                                    if (!isNaN(met)) {
                                        const klm = parseNumber(met / 1000) + "";
                                        const inc = parseNumber(met * 39.3701) + "";
                                        const fet = parseNumber(met * 3.28084) + "";
                                        const mil = parseNumber(met / 1609) + "";
                                        const nom = parseNumber(met / 1852) + "";
                                        setOutAns(e, klm, inc, fet, mil, nom);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "klm",
                            label: "Kilometer",
                            sub: "km",
                            val: ans.klm,
                            ph: "Kilometer",
                            change: (e: string) => {
                                if (e !== "") {
                                    const klm = parseFloat(e);
                                    if (!isNaN(klm)) {
                                        const met = parseNumber(klm * 1000) + "";
                                        const inc = parseNumber(klm * 39370.1) + "";
                                        const fet = parseNumber(klm * 3280.84) + "";
                                        const mil = parseNumber(klm * 0.621371) + "";
                                        const nom = parseNumber(klm * 0.539957) + "";
                                        setOutAns(met, e, inc, fet, mil, nom);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "inc",
                            label: "Inch",
                            sub: "in",
                            val: ans.inc,
                            ph: "Inch",
                            change: (e: string) => {
                                if (e !== "") {
                                    const inc = parseFloat(e);
                                    if (!isNaN(inc)) {
                                        const met = parseNumber(inc * 0.0254) + "";
                                        const klm = parseNumber(inc / 39370) + "";
                                        const fet = parseNumber(inc / 12) + "";
                                        const mil = parseNumber(inc / 63360) + "";
                                        const nom = parseNumber(inc / 72910) + "";
                                        setOutAns(met, klm, e, fet, mil, nom);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "fet",
                            label: "Feet",
                            sub: "ft",
                            val: ans.fet,
                            ph: "Feet",
                            change: (e: string) => {
                                if (e !== "") {
                                    const fet = parseFloat(e);
                                    if (!isNaN(fet)) {
                                        const met = parseNumber(fet * 0.3048) + "";
                                        const klm = parseNumber(fet * 0.0003048) + "";
                                        const inc = parseNumber(fet * 12) + "";
                                        const mil = parseNumber(fet / 5280) + "";
                                        const nom = parseNumber(fet / 6076) + "";
                                        setOutAns(met, klm, inc, e, mil, nom);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "mil",
                            label: "Mile",
                            sub: "mi",
                            val: ans.mil,
                            ph: "Mile",
                            change: (e: string) => {
                                if (e !== "") {
                                    const mil = parseFloat(e);
                                    if (!isNaN(mil)) {
                                        const met = parseNumber(mil * 1609.34) + "";
                                        const klm = parseNumber(mil * 1.60934) + "";
                                        const inc = parseNumber(mil * 63360) + "";
                                        const fet = parseNumber(mil * 5280) + "";
                                        const nom = parseNumber(mil * 0.868976) + "";
                                        setOutAns(met, klm, inc, fet, e, nom);
                                    }
                                } else setEmpty();
                            }
                        },
                        {
                            key: "nom",
                            label: "Nautical Mile",
                            sub: "NM",
                            val: ans.nom,
                            ph: "Nautical Mile",
                            change: (e: string) => {
                                if (e !== "") {
                                    const nom = parseFloat(e);
                                    if (!isNaN(nom)) {
                                        const met = parseNumber(nom * 1852) + "";
                                        const klm = parseNumber(nom * 1.852) + "";
                                        const inc = parseNumber(nom * 72913.4) + "";
                                        const fet = parseNumber(nom * 6076.12) + "";
                                        const mil = parseNumber(nom * 1.15078) + "";
                                        setOutAns(met, klm, inc, fet, mil, e);
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

export default LengthConverter;
