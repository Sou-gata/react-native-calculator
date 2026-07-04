import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput";
import { addOpacity, addHistoryLog } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

type MatrixState = {
    a11: string; a12: string; a13: string;
    a21: string; a22: string; a23: string;
    a31: string; a32: string; a33: string;
};

const MatrixOperations = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [size, setSize] = useState<2 | 3>(2);

    const emptyMatrix = {
        a11: "", a12: "", a13: "",
        a21: "", a22: "", a23: "",
        a31: "", a32: "", a33: "",
    };

    const [val, setVal] = useState<MatrixState>(emptyMatrix);

    const [results, setResults] = useState<{
        hasCalculated: boolean;
        det: number;
        transpose: number[][];
        adjoint: number[][];
        inverse: number[][] | null;
        isSingular: boolean;
    }>({
        hasCalculated: false,
        det: 0,
        transpose: [],
        adjoint: [],
        inverse: null,
        isSingular: false,
    });

    const formatNumber = (num: number, decimals: number = 4): number => {
        return parseFloat(num.toFixed(decimals));
    };

    const safeParse = (v: string) => {
        const p = parseFloat(v);
        return isNaN(p) ? 0 : p;
    };

    const handleCalculate = () => {
        // Safe parsing of inputs
        const a11 = safeParse(val.a11);
        const a12 = safeParse(val.a12);
        const a13 = size === 3 ? safeParse(val.a13) : 0;

        const a21 = safeParse(val.a21);
        const a22 = safeParse(val.a22);
        const a23 = size === 3 ? safeParse(val.a23) : 0;

        const a31 = size === 3 ? safeParse(val.a31) : 0;
        const a32 = size === 3 ? safeParse(val.a32) : 0;
        const a33 = size === 3 ? safeParse(val.a33) : 0;

        // Prevent calculating if matrix is completely empty
        if (Object.values(val).every((v) => v === "")) {
            return;
        }

        let det = 0;
        let transpose: number[][] = [];
        let adjoint: number[][] = [];
        let inverse: number[][] | null = null;
        let isSingular = false;

        if (size === 2) {
            // 2x2 Matrix Calculations
            det = a11 * a22 - a12 * a21;

            transpose = [
                [a11, a21],
                [a12, a22],
            ];

            adjoint = [
                [a22, -a12],
                [-a21, a11],
            ];

            if (det !== 0) {
                inverse = [
                    [adjoint[0][0] / det, adjoint[0][1] / det],
                    [adjoint[1][0] / det, adjoint[1][1] / det],
                ];
            } else {
                isSingular = true;
            }
        } else {
            // 3x3 Matrix Calculations
            det =
                a11 * (a22 * a33 - a23 * a32) -
                a12 * (a21 * a33 - a23 * a31) +
                a13 * (a21 * a32 - a22 * a31);

            transpose = [
                [a11, a21, a31],
                [a12, a22, a32],
                [a13, a23, a33],
            ];

            // Cofactor components transpose (Adjoint)
            const c11 = a22 * a33 - a23 * a32;
            const c12 = -(a21 * a33 - a23 * a31);
            const c13 = a21 * a32 - a22 * a31;

            const c21 = -(a12 * a33 - a13 * a32);
            const c22 = a11 * a33 - a13 * a31;
            const c23 = -(a11 * a32 - a12 * a31);

            const c31 = a12 * a23 - a13 * a22;
            const c32 = -(a11 * a23 - a13 * a21);
            const c33 = a11 * a22 - a12 * a21;

            adjoint = [
                [c11, c21, c31],
                [c12, c22, c32],
                [c13, c23, c33],
            ];

            if (det !== 0) {
                inverse = [
                    [adjoint[0][0] / det, adjoint[0][1] / det, adjoint[0][2] / det],
                    [adjoint[1][0] / det, adjoint[1][1] / det, adjoint[1][2] / det],
                    [adjoint[2][0] / det, adjoint[2][1] / det, adjoint[2][2] / det],
                ];
            } else {
                isSingular = true;
            }
        }

        // Round results
        det = formatNumber(det);
        transpose = transpose.map((row) => row.map((val) => formatNumber(val)));
        adjoint = adjoint.map((row) => row.map((val) => formatNumber(val)));
        if (inverse) {
            inverse = inverse.map((row) => row.map((val) => formatNumber(val)));
        }

        setResults({
            hasCalculated: true,
            det,
            transpose,
            adjoint,
            inverse,
            isSingular,
        });

        const matrixStr = size === 2
            ? `A = [[${val.a11 || 0}, ${val.a12 || 0}], [${val.a21 || 0}, ${val.a22 || 0}]]`
            : `A = [[${val.a11 || 0}, ${val.a12 || 0}, ${val.a13 || 0}], [${val.a21 || 0}, ${val.a22 || 0}, ${val.a23 || 0}], [${val.a31 || 0}, ${val.a32 || 0}, ${val.a33 || 0}]]`;

        addHistoryLog(
            "Matrix Operations",
            `${size}x${size} Matrix, ${matrixStr}`,
            `det(A) = ${det}, Inverse: ${isSingular ? "Undefined (Singular)" : "Exists"}`
        );
    };

    const handleClear = () => {
        setVal(emptyMatrix);
        setResults({
            hasCalculated: false,
            det: 0,
            transpose: [],
            adjoint: [],
            inverse: null,
            isSingular: false,
        });
    };

    // Matrix Bracket UI Renderer
    const renderMatrixGrid = (matrixData: number[][]) => {
        const height = size === 2 ? 80 : 120;
        return (
            <View className="flex-row justify-center items-center my-3">
                {/* Left bracket */}
                <View
                    className="w-2.5 border-l-2 border-t-2 border-b-2 border-secondary rounded-l-md"
                    style={{ height }}
                />

                {/* Rows container */}
                <View className="justify-center mx-3 gap-y-2">
                    {matrixData.map((row, rIdx) => (
                        <View key={rIdx} className="flex-row gap-x-4 justify-center">
                            {row.map((element, cIdx) => (
                                <Text
                                    key={cIdx}
                                    className="text-[15px] font-bold text-center min-w-[55px]"
                                    style={{ color: colors.text }}
                                >
                                    {element}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Right bracket */}
                <View
                    className="w-2.5 border-r-2 border-t-2 border-b-2 border-secondary rounded-r-md"
                    style={{ height }}
                />
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
            {/* Mode Switching Tabs */}
            <View
                className="p-1.5 rounded-2xl border mb-5 flex-row"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setSize(2);
                        handleClear();
                    }}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center"
                    style={{
                        backgroundColor: size === 2 ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[14px] font-bold"
                        style={{ color: size === 2 ? "white" : colors.text }}
                    >
                        2x2 Matrix
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setSize(3);
                        handleClear();
                    }}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center"
                    style={{
                        backgroundColor: size === 3 ? colors.secondary : "transparent",
                    }}
                >
                    <Text
                        className="text-[14px] font-bold"
                        style={{ color: size === 3 ? "white" : colors.text }}
                    >
                        3x3 Matrix
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Inputs Matrix brackets */}
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
                <View className="flex-row items-center mb-1">
                    <Ionicons name="grid-outline" size={14} color={colors.secondary} style={{ marginRight: 6 }} />
                    <Text
                        className="text-[12px] font-bold tracking-[0.5px]"
                        style={{ color: colors.secondary }}
                    >
                        INPUT MATRIX A
                    </Text>
                </View>

                {/* Matrix Bracket Wrapper */}
                <View className="flex-row justify-center items-center my-3">
                    {/* Left bracket */}
                    <View
                        className="w-2.5 border-l-2 border-t-2 border-b-2 border-secondary rounded-l-md"
                        style={{ height: size === 2 ? 100 : 150 }}
                    />

                    {/* Inputs Grid */}
                    <View className="justify-center mx-3 gap-y-3">
                        {/* Row 1 */}
                        <View className="flex-row gap-x-2">
                            <CustomInput
                                placeholder="a11"
                                onChangeText={(e) => setVal({ ...val, a11: e })}
                                value={val.a11}
                                width={size === 2 ? 70 : 60}
                            />
                            <CustomInput
                                placeholder="a12"
                                onChangeText={(e) => setVal({ ...val, a12: e })}
                                value={val.a12}
                                width={size === 2 ? 70 : 60}
                            />
                            {size === 3 && (
                                <CustomInput
                                    placeholder="a13"
                                    onChangeText={(e) => setVal({ ...val, a13: e })}
                                    value={val.a13}
                                    width={60}
                                />
                            )}
                        </View>

                        {/* Row 2 */}
                        <View className="flex-row gap-x-2">
                            <CustomInput
                                placeholder="a21"
                                onChangeText={(e) => setVal({ ...val, a21: e })}
                                value={val.a21}
                                width={size === 2 ? 70 : 60}
                            />
                            <CustomInput
                                placeholder="a22"
                                onChangeText={(e) => setVal({ ...val, a22: e })}
                                value={val.a22}
                                width={size === 2 ? 70 : 60}
                            />
                            {size === 3 && (
                                <CustomInput
                                    placeholder="a23"
                                    onChangeText={(e) => setVal({ ...val, a23: e })}
                                    value={val.a23}
                                    width={60}
                                />
                            )}
                        </View>

                        {/* Row 3 */}
                        {size === 3 && (
                            <View className="flex-row gap-x-2">
                                <CustomInput
                                    placeholder="a31"
                                    onChangeText={(e) => setVal({ ...val, a31: e })}
                                    value={val.a31}
                                    width={60}
                                />
                                <CustomInput
                                    placeholder="a32"
                                    onChangeText={(e) => setVal({ ...val, a32: e })}
                                    value={val.a32}
                                    width={60}
                                />
                                <CustomInput
                                    placeholder="a33"
                                    onChangeText={(e) => setVal({ ...val, a33: e })}
                                    value={val.a33}
                                    width={60}
                                />
                            </View>
                        )}
                    </View>

                    {/* Right bracket */}
                    <View
                        className="w-2.5 border-r-2 border-t-2 border-b-2 border-secondary rounded-r-md"
                        style={{ height: size === 2 ? 100 : 150 }}
                    />
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
                            MATRIX PROPERTIES & RESULTS
                        </Text>
                    </View>

                    {/* Determinant */}
                    <View
                        className="p-4 rounded-2xl border mb-3"
                        style={{
                            backgroundColor: colors.backgroundColor,
                            borderColor: addOpacity(colors.divider, "08"),
                        }}
                    >
                        <Text
                            className="text-[11px] font-bold mb-1 tracking-[0.5px]"
                            style={{ color: addOpacity(colors.text, "50") }}
                        >
                            DETERMINANT (det A)
                        </Text>
                        <Text
                            className="text-[20px] font-bold"
                            style={{ color: colors.text }}
                        >
                            {results.det}
                        </Text>

                        {results.isSingular && (
                            <View
                                className="p-3 rounded-2xl border flex-row items-center mt-3"
                                style={{
                                    backgroundColor: addOpacity("#EF4444", "08"),
                                    borderColor: addOpacity("#EF4444", "25"),
                                }}
                            >
                                <Ionicons
                                    name="alert-circle-outline"
                                    size={16}
                                    color="#EF4444"
                                    style={{ marginRight: 6 }}
                                />
                                <Text
                                    className="text-[12px] font-semibold flex-1"
                                    style={{ color: colors.text }}
                                >
                                    Singular Matrix: Inverse is undefined
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Inverse Matrix */}
                    {!results.isSingular && results.inverse && (
                        <View
                            className="p-4 rounded-2xl border mb-3"
                            style={{
                                backgroundColor: colors.backgroundColor,
                                borderColor: addOpacity(colors.divider, "08"),
                            }}
                        >
                            <Text
                                className="text-[11px] font-bold mb-1 tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "50") }}
                            >
                                INVERSE MATRIX (A⁻¹)
                            </Text>
                            {renderMatrixGrid(results.inverse)}
                        </View>
                    )}

                    {/* Adjoint Matrix */}
                    <View
                        className="p-4 rounded-2xl border mb-3"
                        style={{
                            backgroundColor: colors.backgroundColor,
                            borderColor: addOpacity(colors.divider, "08"),
                        }}
                    >
                        <Text
                            className="text-[11px] font-bold mb-1 tracking-[0.5px]"
                            style={{ color: addOpacity(colors.text, "50") }}
                        >
                            ADJOINT MATRIX (adj A)
                        </Text>
                        {renderMatrixGrid(results.adjoint)}
                    </View>

                    {/* Transpose Matrix */}
                    <View
                        className="p-4 rounded-2xl border"
                        style={{
                            backgroundColor: colors.backgroundColor,
                            borderColor: addOpacity(colors.divider, "08"),
                        }}
                    >
                        <Text
                            className="text-[11px] font-bold mb-1 tracking-[0.5px]"
                            style={{ color: addOpacity(colors.text, "50") }}
                        >
                            TRANSPOSE MATRIX (Aᵀ)
                        </Text>
                        {renderMatrixGrid(results.transpose)}
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default MatrixOperations;
