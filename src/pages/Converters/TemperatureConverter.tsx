import { ScrollView, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import {
    celToFar,
    celToKal,
    celToRan,
    farToCel,
    farToKal,
    farToRan,
    kalToCal,
    kalToFar,
    kalToRan,
    ranToCel,
    ranToFar,
    ranToKal,
    addOpacity,
} from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const TemperatureConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [cel, setCel] = useState<string>("");
    const [kal, setKal] = useState<string>("");
    const [far, setFar] = useState<string>("");
    const [ran, setRan] = useState<string>("");
    const [activeKey, setActiveKey] = useState<string>("cel");

    const setAns = (
        setFun: React.Dispatch<React.SetStateAction<string>>,
        value: number
    ) => {
        let val = isNaN(value) ? "" : value.toString();
        setFun(val);
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4 pt-6" keyboardShouldPersistTaps="handled">
                <View className="flex-col pb-6">
                    {[
                        {
                            key: "cel",
                            label: "Celsius",
                            sub: "°C",
                            val: cel,
                            ph: "Celsius",
                            change: (e: string) => {
                                setCel(e);
                                if (e !== "") {
                                    let c = parseFloat(e);
                                    if (isNaN(c)) return;
                                    setAns(setFar, celToFar(c));
                                    setAns(setKal, celToKal(c));
                                    setAns(setRan, celToRan(c));
                                } else if (e === "") {
                                    setFar("");
                                    setKal("");
                                    setRan("");
                                }
                            }
                        },
                        {
                            key: "far",
                            label: "Fahrenheit",
                            sub: "°F",
                            val: far,
                            ph: "Fahrenheit",
                            change: (e: string) => {
                                setFar(e);
                                if (e !== "") {
                                    let f = parseFloat(e);
                                    if (isNaN(f)) return;
                                    setAns(setCel, farToCel(f));
                                    setAns(setKal, farToKal(f));
                                    setAns(setRan, farToRan(f));
                                } else if (e === "") {
                                    setCel("");
                                    setKal("");
                                    setRan("");
                                }
                            }
                        },
                        {
                            key: "kal",
                            label: "Kelvin",
                            sub: "K",
                            val: kal,
                            ph: "Kelvin",
                            change: (e: string) => {
                                setKal(e);
                                if (e !== "") {
                                    let k = parseFloat(e);
                                    if (isNaN(k)) return;
                                    setAns(setCel, kalToCal(k));
                                    setAns(setFar, kalToFar(k));
                                    setAns(setRan, kalToRan(k));
                                } else if (e === "") {
                                    setCel("");
                                    setFar("");
                                    setRan("");
                                }
                            }
                        },
                        {
                            key: "ran",
                            label: "Rankine",
                            sub: "°R",
                            val: ran,
                            ph: "Rankine",
                            change: (e: string) => {
                                setRan(e);
                                if (e !== "") {
                                    let r = parseFloat(e);
                                    if (isNaN(r)) return;
                                    setAns(setCel, ranToCel(r));
                                    setAns(setFar, ranToFar(r));
                                    setAns(setKal, ranToKal(r));
                                } else if (e === "") {
                                    setCel("");
                                    setFar("");
                                    setKal("");
                                }
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

export default TemperatureConverter;
