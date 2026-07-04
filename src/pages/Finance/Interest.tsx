import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { parseNumber, addOpacity, addHistoryLog } from "../../helpers/functions";
import { colorSchemeType, compoundInterestDataType } from "../../../types";

const CompoundInterest = ({
    size,
    color,
    textVisible,
    data,
    style = {},
}: {
    size: number;
    color: string;
    textVisible: boolean;
    data: compoundInterestDataType;
    style?: object;
}) => {
    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginTop: 5,
                },
                style,
            ]}>
            {textVisible ? (
                <Text style={{ fontSize: size, color }}>{data.text}</Text>
            ) : (
                <Text style={{ fontSize: size, color: "transparent" }}>
                    {data.text}
                </Text>
            )}
            <Text style={{ fontSize: size, color }}>{" = "}</Text>
            <Text style={{ fontSize: size, color }}>{data.firstPart} × </Text>
            {Boolean(data.secondPart?.denominator) && (
                <Image
                    source={require("../../../assets/open.png")}
                    style={{
                        height: 50,
                        width: 9,
                        marginRight: 3,
                        tintColor: color,
                    }}
                />
            )}
            {!Boolean(data.secondPart?.denominator) &&
                (Boolean(data.secondPart?.numerator) ||
                    parseFloat(data.secondPart?.numerator || "") == 0) && (
                    <Text style={{ fontSize: size, color }}>(</Text>
                )}
            <Text style={{ fontSize: size, color }}>
                {data.secondPart?.firstPart}
            </Text>
            {(Boolean(data.secondPart?.numerator) ||
                parseFloat(data.secondPart?.numerator || "") == 0) && (
                <Text style={{ fontSize: size, color }}> + </Text>
            )}
            {(Boolean(data.secondPart?.numerator) ||
                parseFloat(data.secondPart?.numerator || "") == 0) && (
                <View>
                    <Text
                        style={{ fontSize: size, color, textAlign: "center" }}>
                        {data.secondPart?.numerator || "0"}
                    </Text>
                    {Boolean(data.secondPart?.denominator) && (
                        <>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: color,
                                    marginVertical: 2,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: size,
                                    color,
                                    textAlign: "center",
                                }}>
                                {data.secondPart?.denominator}
                            </Text>
                        </>
                    )}
                </View>
            )}
            {Boolean(data.secondPart?.denominator) &&
                Boolean(data.secondPart?.numerator) && (
                    <Image
                        source={require("../../../assets/close.png")}
                        style={{
                            height: 50,
                            width: 9,
                            marginLeft: 3,
                            tintColor: color,
                        }}
                    />
                )}
            {!Boolean(data.secondPart?.denominator) &&
                (Boolean(data.secondPart?.numerator) ||
                    parseFloat(data.secondPart?.numerator || "") == 0) && (
                    <Text style={{ fontSize: size, color }}>)</Text>
                )}
            <View>
                <Text style={{ fontSize: size - 5, color }}>
                    {" " + data.power}
                </Text>
                {Boolean(data.secondPart?.denominator) ? (
                    <>
                        <Text style={{ fontSize: size / 2, color }}></Text>
                        <Text style={{ fontSize: size / 2, color }}></Text>
                        <Text style={{ fontSize: size / 2, color }}></Text>
                    </>
                ) : (
                    <Text style={{ fontSize: size / 2, color }}></Text>
                )}
            </View>
        </View>
    );
};

const Interest = () => {
    const { colors } = useTheme<colorSchemeType>();

    const options = [
        { label: "Simple Interest", value: "SI" },
        { label: "Compound Interest", value: "CI" },
    ];
    const [selected, setSelected] = useState(options[0]);

    const types = [
        { label: "Annually", n: 1 },
        { label: "Half Yearly", n: 2 },
        { label: "Quarterly", n: 4 },
        { label: "Monthly", n: 12 },
        { label: "Weekly", n: 52 },
        { label: "Daily", n: 365 },
    ];
    const [compounded, setCompounded] = useState(types[0]);

    const [input, setInput] = useState({
        P: "",
        R: "",
        T: "",
        p: 0,
        r: 0,
        t: 0,
    });
    
    const [ans, setAns] = useState<{
        si?: number;
        ci?: number;
        n?: number;
    }>();

    const Calculate = () => {
        if (input.P === "" || input.R === "" || input.T === "") return;
        const p = parseFloat(input.P);
        const r = parseFloat(input.R);
        const t = parseFloat(input.T);
        if (isNaN(p) || isNaN(r) || isNaN(t)) return;
        if (selected.value === "SI") {
            let si = (p * r * t) / 100;
            si = parseNumber(si, 2);
            setAns({ si });
            addHistoryLog(
                "Simple Interest",
                `Principal: ₹${p}, Rate: ${r}%, Time: ${t} years`,
                `Interest: ₹${si}, Total: ₹${parseNumber(p + si, 2)}`
            );
        } else {
            let ci;
            if (compounded.label === "Annually") {
                ci = p * Math.pow(1 + r / 100, t);
            } else if (compounded.label === "Half Yearly") {
                ci = p * Math.pow(1 + r / 200, 2 * t);
            } else if (compounded.label === "Quarterly") {
                ci = p * Math.pow(1 + r / 400, 4 * t);
            } else if (compounded.label === "Monthly") {
                ci = p * Math.pow(1 + r / 1200, 12 * t);
            } else if (compounded.label === "Weekly") {
                ci = p * Math.pow(1 + r / 5200, 52 * t);
            } else if (compounded.label === "Daily") {
                ci = p * Math.pow(1 + r / 36500, 365 * t);
            } else {
                ci = 0;
            }
            ci = parseNumber(ci, 2);
            setAns({ ci, n: compounded.n });
            addHistoryLog(
                "Compound Interest",
                `Principal: ₹${p}, Rate: ${r}%, Time: ${t} years (${compounded.label})`,
                `Interest: ₹${parseNumber(ci - p, 2)}, Total: ₹${ci}`
            );
        }
        setInput((prev) => ({ ...prev, p, r, t }));
    };

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 20 }}
        >
            {/* Interest Type Selector Toggle */}
            <View
                className="flex-row rounded-2xl p-1 mb-6 border"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                }}
            >
                {options.map((opt) => {
                    const isSelected = selected.value === opt.value;
                    return (
                        <Pressable
                            key={opt.value}
                            onPress={() => {
                                setSelected(opt);
                                setAns(undefined); // Reset results on toggle
                            }}
                            className="flex-1 py-3 rounded-xl items-center justify-center"
                            style={{
                                backgroundColor: isSelected ? colors.secondary : "transparent",
                            }}
                        >
                            <Text
                                className="text-[13px] font-bold"
                                style={{
                                    color: isSelected ? "#ffffff" : addOpacity(colors.text, "70"),
                                }}
                            >
                                {opt.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {selected.value === "CI" && (
                <View className="mb-6">
                    <Text
                        className="text-[13px] font-bold mb-3 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        COMPOUNDING FREQUENCY
                    </Text>
                    <View className="flex-row flex-wrap justify-between gap-y-2.5">
                        {types.map((t) => {
                            const isSelected = compounded.label === t.label;
                            return (
                                <Pressable
                                    key={t.label}
                                    onPress={() => {
                                        setCompounded(t);
                                        setAns(undefined); // Reset results on change
                                    }}
                                    className="py-2.5 rounded-2xl items-center justify-center border"
                                    style={{
                                        width: "31%",
                                        backgroundColor: isSelected ? colors.secondary : colors.elevation.level2,
                                        borderColor: isSelected ? colors.secondary : addOpacity(colors.divider, "10"),
                                    }}
                                >
                                    <Text
                                        className="text-[11.5px] font-bold text-center"
                                        style={{
                                            color: isSelected ? "#ffffff" : colors.text,
                                        }}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                    >
                                        {t.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            )}

            {/* Inputs Card */}
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
                <View className="mb-4 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        PRINCIPAL AMOUNT (₹)
                    </Text>
                    <CustomInput
                        placeholder="0.00"
                        value={input.P}
                        width="100%"
                        onChangeText={(e) => setInput((prev) => ({ ...prev, P: e }))}
                        maxLength={8}
                    />
                </View>

                <View className="mb-4 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        INTEREST RATE (% P.A.)
                    </Text>
                    <CustomInput
                        placeholder="0.0"
                        value={input.R}
                        width="100%"
                        onChangeText={(e) => setInput((prev) => ({ ...prev, R: e }))}
                        maxLength={5}
                    />
                </View>

                <View className="w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        TIME PERIOD (YEARS)
                    </Text>
                    <CustomInput
                        placeholder="0"
                        value={input.T}
                        width="100%"
                        onChangeText={(e) => setInput((prev) => ({ ...prev, T: e }))}
                        maxLength={5}
                    />
                </View>

                <View className="items-center mt-6 w-full">
                    <Button
                        mode="contained"
                        onPress={Calculate}
                        buttonColor={colors.secondary}
                        textColor="white"
                        className="w-full h-11 justify-center rounded-2xl"
                        labelStyle={{ fontSize: 15, fontWeight: "bold" }}
                    >
                        Calculate Interest
                    </Button>
                </View>
            </View>

            {/* Results & Math Notebook Card */}
            {ans && (
                <View
                    className="p-6 rounded-3xl border mb-6"
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
                    {/* Summary Header */}
                    <View className="items-center mb-6">
                        <Text
                            className="text-center text-[12px] font-bold tracking-[0.8px] mb-2"
                            style={{ color: addOpacity(colors.text, "60") }}
                        >
                            {selected.value === "SI" ? "TOTAL INTEREST EARNED" : "TOTAL COMPOUND INTEREST"}
                        </Text>
                        <Text
                            className="text-center text-[36px] font-extrabold"
                            style={{ color: colors.secondary }}
                        >
                            ₹ {selected.value === "SI" ? ans.si : parseNumber((ans.ci || 0) - input.p)}
                        </Text>
                        <Text
                            className="text-center text-[13px] font-semibold mt-2.5"
                            style={{ color: addOpacity(colors.text, "60") }}
                        >
                            Maturity Amount: ₹ {selected.value === "SI" ? parseNumber(input.p + (ans.si || 0)) : ans.ci}
                        </Text>
                    </View>

                    <View
                        className="h-[1px] w-full mb-5"
                        style={{ backgroundColor: addOpacity(colors.divider, "10") }}
                    />

                    {/* Step-by-Step Breakdown */}
                    <Text
                        className="text-[13px] font-bold mb-4 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        STEP-BY-STEP SOLUTION
                    </Text>

                    <View className="gap-y-4">
                        {selected.value === "SI" && ans.si && (
                            <>
                                <Fraction
                                    color={colors.text}
                                    size={15}
                                    bullet={false}
                                    data={{
                                        text: "Simple Interest (SI)",
                                        numerator: "P × R × T",
                                        denominator: "100",
                                    }}
                                />
                                <Fraction
                                    color={colors.text}
                                    size={15}
                                    bullet={false}
                                    data={{
                                        text: "SI",
                                        numerator: `${input.p} × ${input.r} × ${input.t}`,
                                        denominator: "100",
                                    }}
                                    textVisible={false}
                                />
                                <Fraction
                                    color={colors.text}
                                    size={15}
                                    bullet={false}
                                    data={{
                                        text: "SI",
                                        numerator: `${input.p * input.r * input.t}`,
                                        denominator: "100",
                                    }}
                                    textVisible={false}
                                />
                                <Fraction
                                    color={colors.text}
                                    size={15}
                                    bullet={false}
                                    data={{
                                        text: "SI",
                                        numerator: ans.si ? ans.si : "0",
                                    }}
                                    textVisible={false}
                                />
                            </>
                        )}
                        {selected.value === "CI" && ans.ci && (
                            <>
                                <Fraction
                                    color={colors.text}
                                    size={15}
                                    bullet={false}
                                    data={{
                                        text: "N (Compounding Intervals)",
                                        numerator: ans.n || 0,
                                    }}
                                />
                                <CompoundInterest
                                    size={15}
                                    color={colors.text}
                                    textVisible={true}
                                    data={{
                                        text: "Maturity Amount (A)",
                                        firstPart: "P",
                                        secondPart: {
                                            firstPart: "1",
                                            numerator: "R",
                                            denominator: ans.n == 1 ? "100" : "100 × N",
                                        },
                                        power: ans.n == 1 ? "T" : `N × T`,
                                        prinsipal: "P",
                                    }}
                                />
                                <CompoundInterest
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    data={{
                                        text: "A",
                                        firstPart: input.p.toString(),
                                        secondPart: {
                                            firstPart: "1",
                                            numerator: input.r.toString(),
                                            denominator:
                                                ans.n == 1 ? "" : `100 × ${ans.n}`,
                                        },
                                        power:
                                            ans.n == 1 ? "T" : `${ans.n} × ${input.t}`,
                                        prinsipal: input.p.toString(),
                                    }}
                                />
                                <CompoundInterest
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    data={{
                                        text: "A",
                                        firstPart: input.p.toString(),
                                        secondPart: {
                                            firstPart: "1",
                                            numerator: input.r.toString(),
                                            denominator:
                                                ans.n == 1
                                                    ? ""
                                                    : parseNumber(
                                                          100 * (ans?.n || 0)
                                                      ).toString(),
                                        },
                                        power: parseNumber(
                                            (ans?.n || 0) * input.t,
                                            2
                                        ).toString(),
                                        prinsipal: input.p.toString(),
                                    }}
                                />
                                <CompoundInterest
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    data={{
                                        text: "A",
                                        firstPart: input.p.toString(),
                                        secondPart: {
                                            firstPart: "1",
                                            numerator: parseNumber(
                                                input.r / (100 * (ans.n || 0))
                                            ).toString(),
                                        },
                                        power: parseNumber(
                                            (ans.n || 0) * input.t,
                                            2
                                        ).toString(),
                                        prinsipal: input.p.toString(),
                                    }}
                                />
                                <CompoundInterest
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    data={{
                                        text: "A",
                                        firstPart: input.p.toString(),
                                        secondPart: {
                                            firstPart: parseNumber(
                                                1 + input.r / (100 * (ans.n || 0))
                                            ).toString(),
                                        },
                                        power: parseNumber(
                                            (ans.n || 0) * input.t,
                                            2
                                        ).toString(),
                                        prinsipal: input.p.toString(),
                                    }}
                                />
                                <Fraction
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    bullet={false}
                                    data={{
                                        text: "A",
                                        numerator:
                                            `${input.p} × ` +
                                            parseNumber(
                                                Math.pow(
                                                    1 + input.r / (100 * (ans.n || 0)),
                                                    (ans.n || 0) * input.t
                                                )
                                            ),
                                    }}
                                />
                                <Fraction
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    bullet={false}
                                    data={{
                                        text: "A",
                                        numerator: ans.ci,
                                    }}
                                />
                                <Fraction
                                    size={15}
                                    color={colors.text}
                                    bullet={false}
                                    data={{
                                        text: "Compound Interest (CI)",
                                        numerator: `A - P`,
                                    }}
                                />
                                <Fraction
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    bullet={false}
                                    data={{
                                        text: "CI",
                                        numerator: `${ans.ci} - ${input.p}`,
                                    }}
                                />
                                <Fraction
                                    size={15}
                                    color={colors.text}
                                    textVisible={false}
                                    bullet={false}
                                    data={{
                                        text: "CI",
                                        numerator: parseNumber(ans.ci - input.p),
                                    }}
                                />
                            </>
                        )}
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default Interest;
