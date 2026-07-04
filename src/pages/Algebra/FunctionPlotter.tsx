import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput";
import { addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const CANVAS_SIZE = 280;
const X_MIN = -10;
const X_MAX = 10;
const Y_MIN = -10;
const Y_MAX = 10;

const FunctionPlotter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [fnType, setFnType] = useState<"linear" | "quadratic" | "cubic" | "trig">("quadratic");

    // Coefficients state
    const [coeff, setCoeff] = useState({
        a: 1,      // Quadratic/Cubic/Trig amplitude
        b: 0,      // Quadratic/Cubic x coefficient (or Trig frequency, defaults to 1 for trig)
        c: 0,      // Trig phase or constant in quadratic/cubic
        d: 0,      // Constant offset
        m: 1,      // Linear slope
        c_lin: 0,  // Linear intercept
    });

    const handleCoeffChange = (key: string, valStr: string) => {
        const parsed = parseFloat(valStr);
        setCoeff((prev) => ({
            ...prev,
            [key]: isNaN(parsed) ? 0 : parsed,
        }));
    };

    const adjustCoeff = (key: string, amount: number) => {
        setCoeff((prev) => {
            const current = prev[key as keyof typeof coeff];
            const newVal = parseFloat((current + amount).toFixed(1));
            return {
                ...prev,
                [key]: newVal,
            };
        });
    };

    // Coordinate mapping functions
    const toScreenX = (x: number) => {
        return ((x - X_MIN) / (X_MAX - X_MIN)) * CANVAS_SIZE;
    };

    const toScreenY = (y: number) => {
        return (1 - (y - Y_MIN) / (Y_MAX - Y_MIN)) * CANVAS_SIZE;
    };

    // Generate graph curve coordinates
    const points: { x: number; y: number }[] = [];
    const steps = 180;
    for (let i = 0; i <= steps; i++) {
        const x = X_MIN + (i / steps) * (X_MAX - X_MIN);
        let y = 0;

        if (fnType === "linear") {
            y = coeff.m * x + coeff.c_lin;
        } else if (fnType === "quadratic") {
            y = coeff.a * x * x + coeff.b * x + coeff.c;
        } else if (fnType === "cubic") {
            y = coeff.a * Math.pow(x, 3) + coeff.b * x * x + coeff.c * x + coeff.d;
        } else if (fnType === "trig") {
            // Treat b as frequency (defaults to 1 if it is 0 to avoid straight line)
            const freq = coeff.b === 0 ? 1 : coeff.b;
            y = coeff.a * Math.sin(freq * x + coeff.c) + coeff.d;
        }

        // Clip slightly outside grid bounds to make edges render smoothly
        if (y >= Y_MIN - 2 && y <= Y_MAX + 2) {
            points.push({ x, y });
        }
    }

    // Equation preview formatter
    const getEquationString = (): string => {
        const formatSign = (val: number, isFirst: boolean = false): string => {
            if (val === 0) return "";
            if (val > 0) return isFirst ? `${val}` : `+ ${val}`;
            return isFirst ? `-${Math.abs(val)}` : `- ${Math.abs(val)}`;
        };

        if (fnType === "linear") {
            const slopeStr = coeff.m === 1 ? "x" : coeff.m === -1 ? "-x" : coeff.m === 0 ? "" : `${coeff.m}x`;
            const interceptStr = formatSign(coeff.c_lin);
            if (!slopeStr && !interceptStr) return "y = 0";
            return `y = ${slopeStr} ${interceptStr}`.trim();
        } else if (fnType === "quadratic") {
            const aStr = coeff.a === 1 ? "x²" : coeff.a === -1 ? "-x²" : coeff.a === 0 ? "" : `${coeff.a}x²`;
            const bStr = coeff.b === 1 ? "+ x" : coeff.b === -1 ? "- x" : coeff.b === 0 ? "" : `${formatSign(coeff.b)}x`;
            const cStr = formatSign(coeff.c);
            if (!aStr && !bStr && !cStr) return "y = 0";
            return `y = ${aStr} ${bStr} ${cStr}`.replace(/\s+/g, " ").trim();
        } else if (fnType === "cubic") {
            const aStr = coeff.a === 1 ? "x³" : coeff.a === -1 ? "-x³" : coeff.a === 0 ? "" : `${coeff.a}x³`;
            const bStr = coeff.b === 1 ? "+ x²" : coeff.b === -1 ? "- x²" : coeff.b === 0 ? "" : `${formatSign(coeff.b)}x²`;
            const cStr = coeff.c === 1 ? "+ x" : coeff.c === -1 ? "- x" : coeff.c === 0 ? "" : `${formatSign(coeff.c)}x`;
            const dStr = formatSign(coeff.d);
            if (!aStr && !bStr && !cStr && !dStr) return "y = 0";
            return `y = ${aStr} ${bStr} ${cStr} ${dStr}`.replace(/\s+/g, " ").trim();
        } else {
            const ampStr = coeff.a === 1 ? "" : coeff.a === -1 ? "-" : `${coeff.a} `;
            const freq = coeff.b === 0 ? 1 : coeff.b;
            const freqStr = freq === 1 ? "x" : freq === -1 ? "-x" : `${freq}x`;
            const phaseStr = formatSign(coeff.c);
            const offsetStr = formatSign(coeff.d);
            return `y = ${ampStr}sin(${freqStr} ${phaseStr}) ${offsetStr}`.replace(/\(\s+/g, "(").replace(/\s+/g, " ").trim();
        }
    };

    const handleReset = () => {
        setCoeff({
            a: 1,
            b: 0,
            c: 0,
            d: 0,
            m: 1,
            c_lin: 0,
        });
    };

    // Helper component for coefficient stepper
    const CoefficientControl = ({
        label,
        stateKey,
        value,
    }: {
        label: string;
        stateKey: string;
        value: number;
    }) => {
        return (
            <View
                className="flex-row items-center justify-between p-3 rounded-2xl mb-2.5 border"
                style={{
                    backgroundColor: colors.backgroundColor,
                    borderColor: addOpacity(colors.divider, "06"),
                }}
            >
                <Text className="text-[13px] font-bold" style={{ color: colors.text }}>
                    {label}
                </Text>

                <View className="flex-row items-center gap-x-2">
                    {/* Decrement Button */}
                    <TouchableOpacity
                        onPress={() => adjustCoeff(stateKey, -0.5)}
                        className="w-8 h-8 rounded-lg items-center justify-center border"
                        style={{
                            borderColor: addOpacity(colors.divider, "15"),
                            backgroundColor: colors.elevation.level1,
                        }}
                    >
                        <Ionicons name="remove" size={16} color={colors.text} />
                    </TouchableOpacity>

                    {/* Input Field */}
                    <CustomInput
                        placeholder="0"
                        onChangeText={(text) => handleCoeffChange(stateKey, text)}
                        value={value.toString()}
                        width={60}
                        style={{ height: 32, textAlign: "center" }}
                    />

                    {/* Increment Button */}
                    <TouchableOpacity
                        onPress={() => adjustCoeff(stateKey, 0.5)}
                        className="w-8 h-8 rounded-lg items-center justify-center border"
                        style={{
                            borderColor: addOpacity(colors.divider, "15"),
                            backgroundColor: colors.elevation.level1,
                        }}
                    >
                        <Ionicons name="add" size={16} color={colors.text} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* Function Type Selector */}
            <View
                className="p-1.5 rounded-2xl border mb-5 flex-row flex-wrap"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                }}
            >
                {/* Linear */}
                <TouchableOpacity
                    onPress={() => setFnType("linear")}
                    className="flex-1 min-w-[60px] py-2 rounded-xl items-center justify-center mx-0.5"
                    style={{
                        backgroundColor: fnType === "linear" ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[12px] font-bold"
                        style={{ color: fnType === "linear" ? "white" : colors.text }}
                    >
                        Linear
                    </Text>
                </TouchableOpacity>

                {/* Quadratic */}
                <TouchableOpacity
                    onPress={() => setFnType("quadratic")}
                    className="flex-1 min-w-[60px] py-2 rounded-xl items-center justify-center mx-0.5"
                    style={{
                        backgroundColor: fnType === "quadratic" ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[12px] font-bold"
                        style={{ color: fnType === "quadratic" ? "white" : colors.text }}
                    >
                        Quadratic
                    </Text>
                </TouchableOpacity>

                {/* Cubic */}
                <TouchableOpacity
                    onPress={() => setFnType("cubic")}
                    className="flex-1 min-w-[60px] py-2 rounded-xl items-center justify-center mx-0.5"
                    style={{
                        backgroundColor: fnType === "cubic" ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[12px] font-bold"
                        style={{ color: fnType === "cubic" ? "white" : colors.text }}
                    >
                        Cubic
                    </Text>
                </TouchableOpacity>

                {/* Trig */}
                <TouchableOpacity
                    onPress={() => setFnType("trig")}
                    className="flex-1 min-w-[60px] py-2 rounded-xl items-center justify-center mx-0.5"
                    style={{
                        backgroundColor: fnType === "trig" ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[12px] font-bold"
                        style={{ color: fnType === "trig" ? "white" : colors.text }}
                    >
                        Trig
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Canvas Plot Container */}
            <View
                className="p-5 rounded-3xl border mb-5 items-center"
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
                {/* Mathematical Equation Display */}
                <Text
                    className="text-[18px] font-bold mb-4 tracking-[0.5px] text-center"
                    style={{ color: colors.secondary }}
                >
                    {getEquationString()}
                </Text>

                {/* Graph Grid Plot Area */}
                <View
                    className="border rounded-2xl relative overflow-hidden"
                    style={{
                        width: CANVAS_SIZE,
                        height: CANVAS_SIZE,
                        backgroundColor: colors.backgroundColor,
                        borderColor: addOpacity(colors.divider, "15"),
                    }}
                >
                    {/* Horizontal X-Axis line */}
                    <View
                        className="absolute w-full h-[1.5px]"
                        style={{
                            top: toScreenY(0),
                            backgroundColor: addOpacity(colors.text, "35"),
                        }}
                    />

                    {/* Vertical Y-Axis line */}
                    <View
                        className="absolute h-full w-[1.5px]"
                        style={{
                            left: toScreenX(0),
                            backgroundColor: addOpacity(colors.text, "35"),
                        }}
                    />

                    {/* Grid Ticks & Faint Lines */}
                    {[-8, -6, -4, -2, 2, 4, 6, 8].map((tick) => (
                        <React.Fragment key={tick}>
                            {/* Vertical Grid Line */}
                            <View
                                className="absolute h-full w-[0.5px] opacity-10"
                                style={{
                                    left: toScreenX(tick),
                                    backgroundColor: colors.text,
                                }}
                            />
                            {/* Horizontal Grid Line */}
                            <View
                                className="absolute w-full h-[0.5px] opacity-10"
                                style={{
                                    top: toScreenY(tick),
                                    backgroundColor: colors.text,
                                }}
                            />
                            {/* X Tick Labels */}
                            <Text
                                className="absolute text-[8px] opacity-40 font-bold"
                                style={{
                                    left: toScreenX(tick) - 4,
                                    top: toScreenY(0) + 4,
                                    color: colors.text,
                                }}
                            >
                                {tick}
                            </Text>
                            {/* Y Tick Labels */}
                            <Text
                                className="absolute text-[8px] opacity-40 font-bold"
                                style={{
                                    left: toScreenX(0) + 5,
                                    top: toScreenY(tick) - 5,
                                    color: colors.text,
                                }}
                            >
                                {tick}
                            </Text>
                        </React.Fragment>
                    ))}

                    {/* Origin Dot */}
                    <View
                        className="absolute w-1.5 h-1.5 rounded-full bg-red-400"
                        style={{
                            left: toScreenX(0) - 3,
                            top: toScreenY(0) - 3,
                        }}
                    />

                    {/* Graph Plot points */}
                    {points.map((pt, idx) => (
                        <View
                            key={idx}
                            className="absolute w-[3px] h-[3px] rounded-full"
                            style={{
                                left: toScreenX(pt.x) - 1.5,
                                top: toScreenY(pt.y) - 1.5,
                                backgroundColor: colors.secondary,
                            }}
                        />
                    ))}
                </View>
            </View>

            {/* Stepper Controls Card */}
            <View
                className="p-5 rounded-3xl border mb-5"
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
                <View className="mb-4">
                    <View className="flex-row items-center mb-1">
                        <Ionicons name="options-outline" size={16} color={colors.secondary} style={{ marginRight: 6 }} />
                        <Text
                            className="text-[12px] font-bold tracking-[0.5px]"
                            style={{ color: colors.secondary }}
                        >
                            ADJUST COEFFICIENTS
                        </Text>
                    </View>
                    <Text
                        className="text-[11px] font-semibold opacity-60"
                        style={{ color: colors.text }}
                    >
                        {fnType === "linear" && "Standard Form: y = mx + c  (m = slope, c = intercept)"}
                        {fnType === "quadratic" && "Standard Form: y = ax² + bx + c"}
                        {fnType === "cubic" && "Standard Form: y = ax³ + bx² + cx + d"}
                        {fnType === "trig" && "Standard Form: y = a·sin(bx + c) + d  (a = amplitude, b = frequency)"}
                    </Text>
                </View>

                {/* Render corresponding controls based on function type */}
                {fnType === "linear" && (
                    <>
                        <CoefficientControl label="Slope (m)" stateKey="m" value={coeff.m} />
                        <CoefficientControl label="Intercept (c)" stateKey="c_lin" value={coeff.c_lin} />
                    </>
                )}

                {fnType === "quadratic" && (
                    <>
                        <CoefficientControl label="Quadratic Coeff. (a)" stateKey="a" value={coeff.a} />
                        <CoefficientControl label="Linear Coeff. (b)" stateKey="b" value={coeff.b} />
                        <CoefficientControl label="Constant (c)" stateKey="c" value={coeff.c} />
                    </>
                )}

                {fnType === "cubic" && (
                    <>
                        <CoefficientControl label="Cubic Coeff. (a)" stateKey="a" value={coeff.a} />
                        <CoefficientControl label="Quadratic Coeff. (b)" stateKey="b" value={coeff.b} />
                        <CoefficientControl label="Linear Coeff. (c)" stateKey="c" value={coeff.c} />
                        <CoefficientControl label="Constant (d)" stateKey="d" value={coeff.d} />
                    </>
                )}

                {fnType === "trig" && (
                    <>
                        <CoefficientControl label="Amplitude (a)" stateKey="a" value={coeff.a} />
                        <CoefficientControl label="Frequency (b)" stateKey="b" value={coeff.b} />
                        <CoefficientControl label="Phase Shift (c)" stateKey="c" value={coeff.c} />
                        <CoefficientControl label="Vertical Offset (d)" stateKey="d" value={coeff.d} />
                    </>
                )}

                {/* Reset button */}
                <TouchableOpacity
                    onPress={handleReset}
                    className="py-2.5 rounded-xl items-center justify-center border mt-3 flex-row"
                    style={{
                        borderColor: addOpacity(colors.divider, "15"),
                        backgroundColor: colors.backgroundColor,
                    }}
                >
                    <Ionicons name="refresh" size={14} color={colors.text} style={{ marginRight: 6 }} />
                    <Text className="text-[12px] font-bold" style={{ color: colors.text }}>
                        Reset Coefficients
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default FunctionPlotter;
