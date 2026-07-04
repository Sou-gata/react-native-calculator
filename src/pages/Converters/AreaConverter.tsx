import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { parseNumber, addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const Area = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, setText] = useState({
        cm: "",
        m: "",
        inc: "",
        foot: "",
        yard: "",
        acre: "",
        mile: "",
    });
    const [activeKey, setActiveKey] = useState<string>("cm");

    const setValues = (
        cm: string,
        m: string,
        inc: string,
        foot: string,
        yard: string,
        acre: string,
        mile: string
    ) => {
        setText({ cm, m, inc, foot, yard, acre, mile });
    };
    const setEmpty = () => {
        setText({
            cm: "",
            m: "",
            inc: "",
            foot: "",
            yard: "",
            acre: "",
            mile: "",
        });
    };

    const onChangeCm = (e: string) => {
        setText({ ...text, cm: e });
        if (e !== "") {
            const cm = parseFloat(e);
            if (isNaN(cm)) return;
            const m = parseNumber(cm * 0.0001) + "";
            const inc = parseNumber(cm * 0.155) + "";
            const foot = parseNumber(cm / 929) + "";
            const yard = parseNumber(cm / 8361) + "";
            const acre = parseNumber(cm * 0.000000024711) + "";
            const mile = parseNumber(cm * 0.00000000003861) + "";
            setValues(e, m, inc, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeM = (e: string) => {
        setText({ ...text, m: e });
        if (e !== "") {
            const m = parseFloat(e);
            const cm = parseNumber(m * 10000) + "";
            const inc = parseNumber(m * 1550) + "";
            const foot = parseNumber(m * 10.7639) + "";
            const yard = parseNumber(m * 19599) + "";
            const acre = parseNumber(m * 0.000247105) + "";
            const mile = parseNumber(m * 0.0000003861) + "";
            setValues(cm, e, inc, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeInch = (e: string) => {
        setText({ ...text, inc: e });
        if (e !== "") {
            const inc = parseFloat(e);
            const cm = parseNumber(inc * 6.4516) + "";
            const m = parseNumber(inc * 0.00064516) + "";
            const foot = parseNumber(inc * 0.00694444) + "";
            const yard = parseNumber(inc * 0.000771605) + "";
            const acre = parseNumber(inc * 0.00000015942) + "";
            const mile = parseNumber(inc * 0.0000000002491) + "";
            setValues(cm, m, e, foot, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeFoot = (e: string) => {
        setText({ ...text, foot: e });
        if (e !== "") {
            const foot = parseFloat(e);
            const cm = parseNumber(foot * 929.03) + "";
            const m = parseNumber(foot * 0.092903) + "";
            const inc = parseNumber(foot * 144) + "";
            const yard = parseNumber(foot / 9) + "";
            const acre = parseNumber(foot / 43560) + "";
            const mile = parseNumber(foot * 0.00000003587) + "";
            setValues(cm, m, inc, e, yard, acre, mile);
        } else setEmpty();
    };
    const onChangeYard = (e: string) => {
        setText({ ...text, yard: e });
        if (e !== "") {
            const yard = parseFloat(e);
            const cm = parseNumber(yard * 8361.27) + "";
            const m = parseNumber(yard * 0.836127) + "";
            const inc = parseNumber(yard * 1296) + "";
            const foot = parseNumber(yard * 9) + "";
            const acre = parseNumber(yard / 4840) + "";
            const mile = parseNumber(yard * 0.000003098) + "";
            setValues(cm, m, inc, foot, e, acre, mile);
        } else setEmpty();
    };
    const onChangeAcre = (e: string) => {
        setText({ ...text, acre: e });
        if (e !== "") {
            const acre = parseFloat(e);
            const cm = parseNumber(acre * 40470000) + "";
            const m = parseNumber(acre * 4046.86) + "";
            const inc = parseNumber(acre * 6273000) + "";
            const foot = parseNumber(acre * 43560) + "";
            const yard = parseNumber(acre * 4840) + "";
            const mile = parseNumber(acre / 640) + "";
            setValues(cm, m, inc, foot, yard, e, mile);
        } else setEmpty();
    };
    const onChangeMile = (e: string) => {
        setText({ ...text, mile: e });
        if (e !== "") {
            const mile = parseFloat(e);
            const cm = parseNumber(mile * 25900000000) + "";
            const m = parseNumber(mile * 2590000) + "";
            const inc = parseNumber(mile * 4014000000) + "";
            const foot = parseNumber(mile * 27880000) + "";
            const yard = parseNumber(mile * 3098000) + "";
            const acre = parseNumber(mile * 640) + "";
            setValues(cm, m, inc, foot, yard, acre, e);
        } else setEmpty();
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        { key: "cm", label: "Centimeter²", sub: "cm²", val: text.cm, change: onChangeCm, ph: "Centimeter²" },
                        { key: "m", label: "Meter²", sub: "m²", val: text.m, change: onChangeM, ph: "Meter²" },
                        { key: "inc", label: "Inch²", sub: "in²", val: text.inc, change: onChangeInch, ph: "Inch²" },
                        { key: "foot", label: "Foot²", sub: "ft²", val: text.foot, change: onChangeFoot, ph: "Foot²" },
                        { key: "yard", label: "Yard²", sub: "yd²", val: text.yard, change: onChangeYard, ph: "Yard²" },
                        { key: "acre", label: "Acre", sub: "ac", val: text.acre, change: onChangeAcre, ph: "Acre" },
                        { key: "mile", label: "Mile²", sub: "mi²", val: text.mile, change: onChangeMile, ph: "Mile²" },
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

export default Area;
