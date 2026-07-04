import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput";
import { addOpacity, addHistoryLog } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

type VectorState = {
    x: string;
    y: string;
    z: string;
};

const VectorCalculator = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [mode, setMode] = useState<"2D" | "3D">("2D");

    const [vecA, setVecA] = useState<VectorState>({ x: "", y: "", z: "" });
    const [vecB, setVecB] = useState<VectorState>({ x: "", y: "", z: "" });

    const [results, setResults] = useState<{
        hasCalculated: boolean;
        magA: number;
        magB: number;
        dot: number;
        cross: { x: number; y: number; z: number };
        angleDeg: number | string;
        angleRad: number | string;
        sum: { x: number; y: number; z: number };
        diff: { x: number; y: number; z: number };
        unitA: { x: number; y: number; z: number } | null;
        unitB: { x: number; y: number; z: number } | null;
    }>({
        hasCalculated: false,
        magA: 0,
        magB: 0,
        dot: 0,
        cross: { x: 0, y: 0, z: 0 },
        angleDeg: 0,
        angleRad: 0,
        sum: { x: 0, y: 0, z: 0 },
        diff: { x: 0, y: 0, z: 0 },
        unitA: null,
        unitB: null,
    });

    const formatNumber = (num: number, decimals: number = 4): number => {
        return parseFloat(num.toFixed(decimals));
    };

    const handleCalculate = () => {
        const ax = parseFloat(vecA.x || "0");
        const ay = parseFloat(vecA.y || "0");
        const az = mode === "3D" ? parseFloat(vecA.z || "0") : 0;

        const bx = parseFloat(vecB.x || "0");
        const by = parseFloat(vecB.y || "0");
        const bz = mode === "3D" ? parseFloat(vecB.z || "0") : 0;

        if (
            vecA.x === "" &&
            vecA.y === "" &&
            vecA.z === "" &&
            vecB.x === "" &&
            vecB.y === "" &&
            vecB.z === ""
        ) {
            return;
        }

        const magAVal = Math.sqrt(ax * ax + ay * ay + az * az);
        const magBVal = Math.sqrt(bx * bx + by * by + bz * bz);

        const dotVal = ax * bx + ay * by + az * bz;

        const crossVal = {
            x: ay * bz - az * by,
            y: az * bx - ax * bz,
            z: ax * by - ay * bx,
        };

        const sumVal = { x: ax + bx, y: ay + by, z: az + bz };
        const diffVal = { x: ax - bx, y: ay - by, z: az - bz };

        let angleDegVal: number | string = "Undefined";
        let angleRadVal: number | string = "Undefined";

        if (magAVal > 0 && magBVal > 0) {
            let cosTheta = dotVal / (magAVal * magBVal);
            cosTheta = Math.max(-1, Math.min(1, cosTheta));
            const rad = Math.acos(cosTheta);
            const deg = (rad * 180) / Math.PI;

            angleRadVal = formatNumber(rad);
            angleDegVal = formatNumber(deg);
        }

        const unitAVal =
            magAVal > 0
                ? { x: ax / magAVal, y: ay / magAVal, z: az / magAVal }
                : null;
        const unitBVal =
            magBVal > 0
                ? { x: bx / magBVal, y: by / magBVal, z: bz / magBVal }
                : null;

        setResults({
            hasCalculated: true,
            magA: formatNumber(magAVal),
            magB: formatNumber(magBVal),
            dot: formatNumber(dotVal),
            cross: {
                x: formatNumber(crossVal.x),
                y: formatNumber(crossVal.y),
                z: formatNumber(crossVal.z),
            },
            angleDeg: angleDegVal,
            angleRad: angleRadVal,
            sum: {
                x: formatNumber(sumVal.x),
                y: formatNumber(sumVal.y),
                z: formatNumber(sumVal.z),
            },
            diff: {
                x: formatNumber(diffVal.x),
                y: formatNumber(diffVal.y),
                z: formatNumber(diffVal.z),
            },
            unitA: unitAVal
                ? {
                      x: formatNumber(unitAVal.x),
                      y: formatNumber(unitAVal.y),
                      z: formatNumber(unitAVal.z),
                  }
                : null,
            unitB: unitBVal
                ? {
                      x: formatNumber(unitBVal.x),
                      y: formatNumber(unitBVal.y),
                      z: formatNumber(unitBVal.z),
                  }
                : null,
        });

        const resA = mode === "2D" ? `u = (${ax}, ${ay})` : `u = (${ax}, ${ay}, ${az})`;
        const resB = mode === "2D" ? `v = (${bx}, ${by})` : `v = (${bx}, ${by}, ${bz})`;
        const crossProductStr = mode === "2D" ? `${formatNumber(crossVal.z)}k` : `(${formatNumber(crossVal.x)}, ${formatNumber(crossVal.y)}, ${formatNumber(crossVal.z)})`;
        addHistoryLog(
            "Vector Calculator",
            `${resA}, ${resB}`,
            `u·v = ${formatNumber(dotVal)}, u×v = ${crossProductStr}, angle = ${angleDegVal}°`
        );
    };

    const handleClear = () => {
        setVecA({ x: "", y: "", z: "" });
        setVecB({ x: "", y: "", z: "" });
        setResults({
            hasCalculated: false,
            magA: 0,
            magB: 0,
            dot: 0,
            cross: { x: 0, y: 0, z: 0 },
            angleDeg: 0,
            angleRad: 0,
            sum: { x: 0, y: 0, z: 0 },
            diff: { x: 0, y: 0, z: 0 },
            unitA: null,
            unitB: null,
        });
    };

    const renderVectorString = (
        v: { x: number; y: number; z: number } | null,
        isUnit: boolean = false
    ): string => {
        if (!v) return "Zero vector (magnitude = 0)";
        const sym = isUnit ? "^" : "";
        if (mode === "2D") {
            return `${v.x}i${sym} + ${v.y}j${sym}`;
        }
        return `${v.x}i${sym} + ${v.y}j${sym} + ${v.z}k${sym}`;
    };

    const renderVectorCoords = (v: { x: number; y: number; z: number } | null): string => {
        if (!v) return "(0, 0)";
        if (mode === "2D") {
            return `(${v.x}, ${v.y})`;
        }
        return `(${v.x}, ${v.y}, ${v.z})`;
    };

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* Mode Switcher */}
            <View
                className="p-1.5 rounded-2xl border mb-5 flex-row"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setMode("2D");
                        handleClear();
                    }}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center"
                    style={{
                        backgroundColor: mode === "2D" ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[14px] font-bold"
                        style={{ color: mode === "2D" ? "white" : colors.text }}
                    >
                        2D Vector
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setMode("3D");
                        handleClear();
                    }}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center"
                    style={{
                        backgroundColor: mode === "3D" ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[14px] font-bold"
                        style={{ color: mode === "3D" ? "white" : colors.text }}
                    >
                        3D Vector
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Vector Inputs Card */}
            <View
                className="p-5 rounded-3xl border mb-5"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                    borderLeftWidth: 4,
                    borderLeftColor: colors.secondary,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                {/* Vector A Input Row */}
                <View className="mb-4">
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="arrow-forward-outline" size={14} color={colors.secondary} style={{ marginRight: 6 }} />
                        <Text
                            className="text-[12px] font-bold tracking-[0.5px]"
                            style={{ color: colors.secondary }}
                        >
                            VECTOR A (u)
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[60px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>x (i)</Text>
                            <CustomInput
                                placeholder="Ax"
                                onChangeText={(e) => setVecA({ ...vecA, x: e })}
                                value={vecA.x}
                                width="100%"
                            />
                        </View>
                        
                        <View className="items-center justify-center h-10 mt-[16px] mx-1">
                            <Text className="text-[16px] font-bold opacity-40" style={{ color: colors.text }}>+</Text>
                        </View>

                        <View className="items-center flex-1 min-w-[60px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>y (j)</Text>
                            <CustomInput
                                placeholder="Ay"
                                onChangeText={(e) => setVecA({ ...vecA, y: e })}
                                value={vecA.y}
                                width="100%"
                            />
                        </View>

                        {mode === "3D" && (
                            <>
                                <View className="items-center justify-center h-10 mt-[16px] mx-1">
                                    <Text className="text-[16px] font-bold opacity-40" style={{ color: colors.text }}>+</Text>
                                </View>
                                <View className="items-center flex-1 min-w-[60px] mx-0.5">
                                    <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>z (k)</Text>
                                    <CustomInput
                                        placeholder="Az"
                                        onChangeText={(e) => setVecA({ ...vecA, z: e })}
                                        value={vecA.z}
                                        width="100%"
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>

                {/* Divider Line */}
                <View
                    className="h-[1px] my-3 opacity-15"
                    style={{ backgroundColor: colors.text }}
                />

                {/* Vector B Input Row */}
                <View>
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="arrow-forward-outline" size={14} color={colors.secondary} style={{ marginRight: 6 }} />
                        <Text
                            className="text-[12px] font-bold mb-2 tracking-[0.5px]"
                            style={{ color: colors.secondary }}
                        >
                            VECTOR B (v)
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[60px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>x (i)</Text>
                            <CustomInput
                                placeholder="Bx"
                                onChangeText={(e) => setVecB({ ...vecB, x: e })}
                                value={vecB.x}
                                width="100%"
                            />
                        </View>
                        
                        <View className="items-center justify-center h-10 mt-[16px] mx-1">
                            <Text className="text-[16px] font-bold opacity-40" style={{ color: colors.text }}>+</Text>
                        </View>

                        <View className="items-center flex-1 min-w-[60px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>y (j)</Text>
                            <CustomInput
                                placeholder="By"
                                onChangeText={(e) => setVecB({ ...vecB, y: e })}
                                value={vecB.y}
                                width="100%"
                            />
                        </View>

                        {mode === "3D" && (
                            <>
                                <View className="items-center justify-center h-10 mt-[16px] mx-1">
                                    <Text className="text-[16px] font-bold opacity-40" style={{ color: colors.text }}>+</Text>
                                </View>
                                <View className="items-center flex-1 min-w-[60px] mx-0.5">
                                    <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>z (k)</Text>
                                    <CustomInput
                                        placeholder="Bz"
                                        onChangeText={(e) => setVecB({ ...vecB, z: e })}
                                        value={vecB.z}
                                        width="100%"
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </View>

            {/* Actions */}
            <View className="flex-row justify-between w-full mb-6 gap-x-4">
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center shadow-sm"
                    style={{ backgroundColor: colors.secondary }}
                    onPress={handleCalculate}
                >
                    <Text className="text-white font-bold text-[15px]">Calculate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center border"
                    style={{
                        borderColor: addOpacity(colors.divider, "15"),
                        backgroundColor: colors.elevation.level2,
                    }}
                    onPress={handleClear}
                >
                    <Text style={{ color: colors.text }} className="font-bold text-[15px]">Clear</Text>
                </TouchableOpacity>
            </View>

            {/* Calculations Dashboard */}
            {results.hasCalculated && (
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
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="analytics-outline" size={16} color={colors.secondary} style={{ marginRight: 6 }} />
                        <Text
                            className="text-[12px] font-bold tracking-[1px]"
                            style={{ color: colors.secondary }}
                        >
                            VECTOR PROPERTIES & OPERATIONS
                        </Text>
                    </View>

                    {/* Magnitudes and Unit Vectors */}
                    <View className="gap-y-3">
                        {/* Vector A Magnitudes */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <View className="flex-row items-center mb-1">
                                <Ionicons name="resize-outline" size={13} color={colors.secondary} style={{ marginRight: 5 }} />
                                <Text
                                    className="text-[11px] font-bold tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    MAGNITUDE & UNIT VECTOR A (u)
                                </Text>
                            </View>
                            <Text
                                className="text-[20px] font-bold"
                                style={{ color: colors.text }}
                            >
                                |u| = {results.magA}
                            </Text>
                            <View className="flex-row flex-wrap mt-2 pt-2 border-t border-dashed" style={{ borderColor: addOpacity(colors.divider, "10") }}>
                                <Text
                                    className="text-[12px] font-semibold flex-1 min-w-[140px]"
                                    style={{ color: colors.secondary }}
                                >
                                    û = {renderVectorString(results.unitA, true)}
                                </Text>
                                <Text
                                    className="text-[11px] opacity-60 text-right min-w-[80px]"
                                    style={{ color: colors.text }}
                                >
                                    {renderVectorCoords(results.unitA)}
                                </Text>
                            </View>
                        </View>

                        {/* Vector B Magnitudes */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <View className="flex-row items-center mb-1">
                                <Ionicons name="resize-outline" size={13} color={colors.secondary} style={{ marginRight: 5 }} />
                                <Text
                                    className="text-[11px] font-bold tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    MAGNITUDE & UNIT VECTOR B (v)
                                </Text>
                            </View>
                            <Text
                                className="text-[20px] font-bold"
                                style={{ color: colors.text }}
                            >
                                |v| = {results.magB}
                            </Text>
                            <View className="flex-row flex-wrap mt-2 pt-2 border-t border-dashed" style={{ borderColor: addOpacity(colors.divider, "10") }}>
                                <Text
                                    className="text-[12px] font-semibold flex-1 min-w-[140px]"
                                    style={{ color: colors.secondary }}
                                >
                                    v̂ = {renderVectorString(results.unitB, true)}
                                </Text>
                                <Text
                                    className="text-[11px] opacity-60 text-right min-w-[80px]"
                                    style={{ color: colors.text }}
                                >
                                    {renderVectorCoords(results.unitB)}
                                </Text>
                            </View>
                        </View>

                        {/* Products Card */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="calculator-outline" size={13} color={colors.secondary} style={{ marginRight: 5 }} />
                                <Text
                                    className="text-[11px] font-bold tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    PRODUCTS (DOT & CROSS)
                                </Text>
                            </View>
                            {/* Dot Product */}
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-[14px] font-semibold" style={{ color: colors.text }}>
                                    Dot Product (u · v)
                                </Text>
                                <Text className="text-[18px] font-bold" style={{ color: colors.secondary }}>
                                    {results.dot}
                                </Text>
                            </View>

                            <View className="h-[1px] my-1 opacity-10" style={{ backgroundColor: colors.text }} />

                            {/* Cross Product */}
                            <View className="mt-2">
                                <Text className="text-[14px] font-semibold mb-1" style={{ color: colors.text }}>
                                    Cross Product (u × v)
                                </Text>
                                <Text className="text-[16px] font-bold" style={{ color: colors.secondary }}>
                                    {mode === "3D"
                                        ? renderVectorString(results.cross)
                                        : `${results.cross.z}k̂`}
                                </Text>
                                <Text className="text-[11px] opacity-60 mt-0.5" style={{ color: colors.text }}>
                                    Coords: {renderVectorCoords(results.cross)}
                                </Text>
                            </View>
                        </View>

                        {/* Vector Addition & Subtraction */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="swap-horizontal-outline" size={13} color={colors.secondary} style={{ marginRight: 5 }} />
                                <Text
                                    className="text-[11px] font-bold tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    ADDITION & SUBTRACTION
                                </Text>
                            </View>
                            <View className="mb-2">
                                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>
                                    Addition (u + v)
                                </Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.secondary }}>
                                    {renderVectorString(results.sum)}
                                </Text>
                                <Text className="text-[11px] opacity-65" style={{ color: colors.text }}>
                                    Coords: {renderVectorCoords(results.sum)}
                                </Text>
                            </View>

                            <View className="h-[1px] my-1 opacity-10" style={{ backgroundColor: colors.text }} />

                            <View className="mt-2">
                                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>
                                    Subtraction (u - v)
                                </Text>
                                <Text className="text-[15px] font-bold" style={{ color: colors.secondary }}>
                                    {renderVectorString(results.diff)}
                                </Text>
                                <Text className="text-[11px] opacity-65" style={{ color: colors.text }}>
                                    Coords: {renderVectorCoords(results.diff)}
                                </Text>
                            </View>
                        </View>

                        {/* Angle Card */}
                        <View
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="compass-outline" size={13} color={colors.secondary} style={{ marginRight: 5 }} />
                                <Text
                                    className="text-[11px] font-bold tracking-[0.5px]"
                                    style={{ color: addOpacity(colors.text, "50") }}
                                >
                                    ANGLE BETWEEN VECTORS
                                </Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="text-[18px] font-bold" style={{ color: colors.text }}>
                                        {results.angleDeg}
                                        {typeof results.angleDeg === "number" ? "°" : ""}
                                    </Text>
                                    <Text className="text-[12px] opacity-60 mt-0.5" style={{ color: colors.text }}>
                                        Degrees
                                    </Text>
                                </View>
                                <View className="items-end">
                                    <Text className="text-[18px] font-bold" style={{ color: colors.text }}>
                                        {results.angleRad}
                                        {typeof results.angleRad === "number" ? " rad" : ""}
                                    </Text>
                                    <Text className="text-[12px] opacity-60 mt-0.5" style={{ color: colors.text }}>
                                        Radians
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default VectorCalculator;
