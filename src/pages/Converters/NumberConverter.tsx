import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import {
    binaryCheck,
    octalCheck,
    decCheck,
    hexCheck,
} from "../../helpers/numbersCheck";
import {
    binaryToDecimal,
    binToOct,
    binToHex,
    octToBin,
    decimalToBinary,
    hexToBin,
    pointRemove,
    addOpacity,
} from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const NumberConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [bin, setBin] = useState<string>("");
    const [oct, setOct] = useState<string>("");
    const [dec, setDec] = useState<string>("");
    const [hex, setHex] = useState<string>("");
    const [activeKey, setActiveKey] = useState<string>("dec");

    const setEmpty = () => {
        setBin("");
        setOct("");
        setDec("");
        setHex("");
    };

    const binToOther = (event: string) => {
        setBin(event);
        let e = Number(pointRemove(event));
        if (e.toString() !== "") {
            let correct = binaryCheck(e);
            if (correct) {
                let o = binToOct(e);
                setOct(o.toString());
                let d = binaryToDecimal(e);
                setDec(d.toString());
                let h = binToHex(e);
                setHex(h);
            } else {
                let temp = event;
                setBin(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    const octToOther = (event: string) => {
        setOct(event);
        let e = Number(pointRemove(event));
        if (e.toString() !== "") {
            let correct = octalCheck(e);
            if (correct) {
                let b = octToBin(e);
                setBin(b.toString());
                let d = binaryToDecimal(b);
                setDec(d.toString());
                let h = binToHex(b);
                setHex(h);
            } else {
                let temp = event;
                setOct(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    const decToOther = (event: string) => {
        setDec(event);
        let e = Number(pointRemove(event));
        if (e.toString() !== "") {
            let correct = decCheck(e);
            if (correct) {
                let b = decimalToBinary(e);
                setBin(b.toString());
                let o = binToOct(b);
                setOct(o.toString());
                let h = binToHex(b);
                setHex(h);
            } else {
                let temp = event;
                setDec(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    const hexToOther = (event: string) => {
        setHex(event);
        let e = pointRemove(event);
        if (e !== "") {
            let correct = hexCheck(e);
            if (correct) {
                let b = hexToBin(e.toString());
                setBin(b.toString());
                let d = binaryToDecimal(b);
                setDec(d.toString());
                let o = binToOct(b);
                setOct(o.toString());
            } else {
                let temp = event;
                setHex(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        {
                            key: "bin",
                            label: "Binary",
                            sub: "Bin (Base 2)",
                            val: bin,
                            ph: "Binary",
                            keyboardType: "decimal-pad" as const,
                            change: (e: string) => {
                                if (e === "") {
                                    setEmpty();
                                    return;
                                }
                                binToOther(e);
                            }
                        },
                        {
                            key: "oct",
                            label: "Octal",
                            sub: "Oct (Base 8)",
                            val: oct,
                            ph: "Octal",
                            keyboardType: "decimal-pad" as const,
                            change: (e: string) => {
                                if (e === "") {
                                    setEmpty();
                                    return;
                                }
                                octToOther(e);
                            }
                        },
                        {
                            key: "dec",
                            label: "Decimal",
                            sub: "Dec (Base 10)",
                            val: dec,
                            ph: "Decimal",
                            keyboardType: "decimal-pad" as const,
                            change: (e: string) => {
                                if (e === "") {
                                    setEmpty();
                                    return;
                                }
                                decToOther(e);
                            }
                        },
                        {
                            key: "hex",
                            label: "Hexadecimal",
                            sub: "Hex (Base 16)",
                            val: hex,
                            ph: "Hexadecimal",
                            keyboardType: "default" as const,
                            change: (e: string) => {
                                if (e === "") {
                                    setEmpty();
                                    return;
                                }
                                hexToOther(e);
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
                                            value={item.val.toString()}
                                            onChangeText={item.change}
                                            placeholder={item.ph}
                                            placeholderTextColor={colors.paceHolder}
                                            keyboardType={item.keyboardType}
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

export default NumberConverter;
