import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { parseNumber, addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const Volume = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, setText] = useState({
        cm: "",
        m: "",
        inc: "",
        foot: "",
        lit: "",
        gln: "",
        qnt: "",
    });
    const [activeKey, setActiveKey] = useState<string>("lit");

    const setEmpty = () => {
        setText({
            cm: "",
            m: "",
            inc: "",
            foot: "",
            lit: "",
            gln: "",
            qnt: "",
        });
    };
    const setAns = (
        cm: string,
        m: string,
        inc: string,
        foot: string,
        lit: string,
        gln: string,
        qnt: string
    ) => {
        setText({
            cm,
            m,
            inc,
            foot,
            lit,
            gln,
            qnt,
        });
    };

    const fixed = (val: number): string => parseNumber(val).toString();

    const onChangeCm = (e: string) => {
        setText({ ...text, cm: e });
        if (e !== "") {
            const cm = parseFloat(e);
            const m = fixed(cm * 0.000001);
            const inc = fixed(cm * 0.0610237);
            const foot = fixed(cm / 28320);
            const lit = fixed(cm * 0.001);
            const gln = fixed(cm * 0.000219969);
            const qnt = fixed(cm * 0.000879877);
            setAns(e, m, inc, foot, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeM = (e: string) => {
        setText({ ...text, m: e });
        if (e !== "") {
            const m = parseFloat(e);
            const cm = fixed(m * 1000000);
            const inc = fixed(m * 61023.7);
            const foot = fixed(m * 35.3147);
            const lit = fixed(m * 1000);
            const gln = fixed(m * 219.969);
            const qnt = fixed(m * 879.877);
            setAns(cm, e, inc, foot, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeInch = (e: string) => {
        setText({ ...text, inc: e });
        if (e !== "") {
            const inc = parseFloat(e);
            const cm = fixed(inc * 16.3871);
            const m = fixed(inc * 0.000016387);
            const foot = fixed(inc / 1728);
            const lit = fixed(inc * 0.0163871);
            const gln = fixed(inc * 0.00360465);
            const qnt = fixed(inc / 69.355);
            setAns(cm, m, e, foot, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeFoot = (e: string) => {
        setText({ ...text, foot: e });
        if (e !== "") {
            const foot = parseFloat(e);
            const cm = fixed(foot * 28316.8);
            const m = fixed(foot * 0.0283168);
            const inc = fixed(foot * 1728);
            const lit = fixed(foot * 28.3168);
            const gln = fixed(foot * 6.22884);
            const qnt = fixed(foot * 24.9153);
            setAns(cm, m, inc, e, lit, gln, qnt);
        } else setEmpty();
    };
    const onChangeLit = (e: string) => {
        setText({ ...text, lit: e });
        if (e !== "") {
            const lit = parseFloat(e);
            const cm = fixed(lit * 1000);
            const m = fixed(lit * 0.001);
            const inc = fixed(lit * 61.0237);
            const foot = fixed(lit * 0.0353147);
            const gln = fixed(lit / 4.546);
            const qnt = fixed(lit * 0.879877);
            setAns(cm, m, inc, foot, e, gln, qnt);
        } else setEmpty();
    };
    const onChangeGln = (e: string) => {
        setText({ ...text, gln: e });
        if (e !== "") {
            const gln = parseFloat(e);
            const cm = fixed(gln * 4546.09);
            const m = fixed(gln * 0.00454609);
            const inc = fixed(gln * 277.419);
            const foot = fixed(gln * 0.160544);
            const lit = fixed(gln * 4.54609);
            const qnt = fixed(gln * 4);
            setAns(cm, m, inc, foot, lit, e, qnt);
        } else setEmpty();
    };
    const onChangeQnt = (e: string) => {
        setText({ ...text, qnt: e });
        if (e !== "") {
            const qnt = parseFloat(e);
            const cm = fixed(qnt * 1136.52);
            const m = fixed(qnt * 0.00113652);
            const inc = fixed(qnt * 69.3549);
            const foot = fixed(qnt * 0.0401359);
            const lit = fixed(qnt * 1.13652);
            const gln = fixed(qnt * 0.25);
            setAns(cm, m, inc, foot, lit, gln, e);
        } else setEmpty();
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        { key: "cm", label: "Cubic Centimeter", sub: "cm³", val: text.cm, ph: "Cubic Centimeter", change: onChangeCm },
                        { key: "m", label: "Cubic Meter", sub: "m³", val: text.m, ph: "Cubic Meter", change: onChangeM },
                        { key: "inc", label: "Cubic Inch", sub: "in³", val: text.inc, ph: "Cubic Inch", change: onChangeInch },
                        { key: "foot", label: "Cubic Foot", sub: "ft³", val: text.foot, ph: "Cubic Foot", change: onChangeFoot },
                        { key: "lit", label: "Liter", sub: "L", val: text.lit, ph: "Liter", change: onChangeLit },
                        { key: "gln", label: "Imperial Gallon", sub: "gal", val: text.gln, ph: "Imperial Gallon", change: onChangeGln },
                        { key: "qnt", label: "Imperial Quart", sub: "qt", val: text.qnt, ph: "Imperial Quart", change: onChangeQnt },
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

export default Volume;
