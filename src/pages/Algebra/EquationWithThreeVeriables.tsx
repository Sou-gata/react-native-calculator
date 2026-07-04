import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addOpacity } from "../../helpers/functions";
import { colorSchemeType } from "../../../types";

const EquationWithThreeVeriables = () => {
    const { colors } = useTheme<colorSchemeType>();

    const emptyVal = {
        a1: "",
        a2: "",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
        d1: "",
        d2: "",
        d3: "",
    };

    const emptyAns = {
        x: 0,
        y: 0,
        z: 0,
    };

    const [val, setVal] = useState(emptyVal);
    const [ans, setAns] = useState(emptyAns);
    const [hasAns, setHasAns] = useState<{
        value: boolean;
        message: string;
        visible: boolean;
        statusType: "success" | "warning" | "info" | undefined;
    }>({
        value: true,
        message: "",
        visible: false,
        statusType: undefined,
    });

    const handleChange = (e: string, place: string) => {
        setVal((prev) => {
            return { ...prev, [place]: e };
        });
    };

    const safeParse = (value: string) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const createMatrix = () => {
        const matrix = [
            [
                safeParse(val.a1),
                safeParse(val.b1),
                safeParse(val.c1),
                safeParse(val.d1),
            ],
            [
                safeParse(val.a2),
                safeParse(val.b2),
                safeParse(val.c2),
                safeParse(val.d2),
            ],
            [
                safeParse(val.a3),
                safeParse(val.b3),
                safeParse(val.c3),
                safeParse(val.d3),
            ],
        ];
        return matrix;
    };

    const determinantOfMatrix = (matrix: number[][]) => {
        return (
            matrix[0][0] *
                (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) -
            matrix[0][1] *
                (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
            matrix[0][2] *
                (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
        );
    };

    function findSolution() {
        // Check if all fields are empty
        if (Object.values(val).every((v) => v === "")) {
            return;
        }

        // Reset state before computing to prevent UI flash/errors
        setAns(emptyAns);
        setHasAns({ value: true, message: "", visible: false, statusType: undefined });

        let coeff = createMatrix();
        let d = [
            [coeff[0][0], coeff[0][1], coeff[0][2]],
            [coeff[1][0], coeff[1][1], coeff[1][2]],
            [coeff[2][0], coeff[2][1], coeff[2][2]],
        ];
        let d1 = [
            [coeff[0][3], coeff[0][1], coeff[0][2]],
            [coeff[1][3], coeff[1][1], coeff[1][2]],
            [coeff[2][3], coeff[2][1], coeff[2][2]],
        ];
        let d2 = [
            [coeff[0][0], coeff[0][3], coeff[0][2]],
            [coeff[1][0], coeff[1][3], coeff[1][2]],
            [coeff[2][0], coeff[2][3], coeff[2][2]],
        ];
        let d3 = [
            [coeff[0][0], coeff[0][1], coeff[0][3]],
            [coeff[1][0], coeff[1][1], coeff[1][3]],
            [coeff[2][0], coeff[2][1], coeff[2][3]],
        ];

        let D = determinantOfMatrix(d);
        let D1 = determinantOfMatrix(d1);
        let D2 = determinantOfMatrix(d2);
        let D3 = determinantOfMatrix(d3);

        if (D !== 0) {
            let x = D1 / D;
            let y = D2 / D;
            let z = D3 / D;
            x = parseFloat(x.toFixed(4));
            y = parseFloat(y.toFixed(4));
            z = parseFloat(z.toFixed(4));
            setAns({ x, y, z });
            setHasAns({
                value: true,
                message: "Unique Solution Found",
                visible: true,
                statusType: "success",
            });
        } else {
            if (D1 === 0 && D2 === 0 && D3 === 0) {
                setHasAns({
                    value: false,
                    message: "Infinite solutions",
                    visible: true,
                    statusType: "info",
                });
            } else {
                setHasAns({
                    value: false,
                    message: "No solution",
                    visible: true,
                    statusType: "warning",
                });
            }
        }
    }

    const handleClear = () => {
        setVal(emptyVal);
        setAns(emptyAns);
        setHasAns({ value: true, message: "", visible: false, statusType: undefined });
    };

    // Solution Status Styling
    const getStatusStyle = () => {
        switch (hasAns.statusType) {
            case "success":
                return {
                    color: "#10B981", // Green
                    icon: "checkmark-circle-outline",
                    desc: "The three planes intersect at a single point.",
                };
            case "warning":
                return {
                    color: "#EF4444", // Red
                    icon: "close-circle-outline",
                    desc: "The system is inconsistent; planes do not share a common point.",
                };
            case "info":
                return {
                    color: "#3B82F6", // Blue
                    icon: "repeat-outline",
                    desc: "The system is dependent; planes intersect along a line or coincide.",
                };
            default:
                return null;
        }
    };

    const statusStyle = getStatusStyle();

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* System Description Card */}
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
                <Text
                    className="text-[12px] font-bold mb-2 tracking-[1px]"
                    style={{ color: addOpacity(colors.text, "50") }}
                >
                    SYSTEM OF 3 LINEAR EQUATIONS
                </Text>

                <View className="flex-row items-center justify-center my-3">
                    <View
                        className="pl-3.5 py-1.5 justify-center"
                        style={{
                            borderLeftWidth: 3,
                            borderLeftColor: colors.secondary,
                        }}
                    >
                        <Text
                            className="text-[17px] font-bold tracking-[0.5px]"
                            style={{ color: colors.text }}
                        >
                            a₁x + b₁y + c₁z = d₁
                        </Text>
                        <Text
                            className="text-[17px] font-bold tracking-[0.5px] mt-0.5"
                            style={{ color: colors.text }}
                        >
                            a₂x + b₂y + c₂z = d₂
                        </Text>
                        <Text
                            className="text-[17px] font-bold tracking-[0.5px] mt-0.5"
                            style={{ color: colors.text }}
                        >
                            a₃x + b₃y + c₃z = d₃
                        </Text>
                    </View>
                </View>

                <Text
                    className="text-[13px] text-center opacity-70 leading-5"
                    style={{ color: colors.text }}
                >
                    Enter coefficients for a system of 3 linear equations to find coordinate solutions (x, y, z).
                </Text>
            </View>

            {/* Inputs Matrix Card */}
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
                {/* Equation 1 */}
                <View className="mb-4">
                    <Text
                        className="text-[11px] font-bold mb-2 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "50") }}
                    >
                        EQUATION 1
                    </Text>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>a₁</Text>
                            <CustomInput
                                placeholder="a1"
                                onChangeText={(e) => handleChange(e, "a1")}
                                value={val.a1}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>x+</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>b₁</Text>
                            <CustomInput
                                placeholder="b1"
                                onChangeText={(e) => handleChange(e, "b1")}
                                value={val.b1}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>y+</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>c₁</Text>
                            <CustomInput
                                placeholder="c1"
                                onChangeText={(e) => handleChange(e, "c1")}
                                value={val.c1}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>z=</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>d₁</Text>
                            <CustomInput
                                placeholder="d1"
                                onChangeText={(e) => handleChange(e, "d1")}
                                value={val.d1}
                                width="100%"
                            />
                        </View>
                    </View>
                </View>

                {/* Divider Line */}
                <View
                    className="h-[1px] my-3 opacity-15"
                    style={{ backgroundColor: colors.text }}
                />

                {/* Equation 2 */}
                <View className="mb-4">
                    <Text
                        className="text-[11px] font-bold mb-2 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "50") }}
                    >
                        EQUATION 2
                    </Text>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>a₂</Text>
                            <CustomInput
                                placeholder="a2"
                                onChangeText={(e) => handleChange(e, "a2")}
                                value={val.a2}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>x+</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>b₂</Text>
                            <CustomInput
                                placeholder="b2"
                                onChangeText={(e) => handleChange(e, "b2")}
                                value={val.b2}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>y+</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>c₂</Text>
                            <CustomInput
                                placeholder="c2"
                                onChangeText={(e) => handleChange(e, "c2")}
                                value={val.c2}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>z=</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>d₂</Text>
                            <CustomInput
                                placeholder="d2"
                                onChangeText={(e) => handleChange(e, "d2")}
                                value={val.d2}
                                width="100%"
                            />
                        </View>
                    </View>
                </View>

                {/* Divider Line */}
                <View
                    className="h-[1px] my-3 opacity-15"
                    style={{ backgroundColor: colors.text }}
                />

                {/* Equation 3 */}
                <View>
                    <Text
                        className="text-[11px] font-bold mb-2 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "50") }}
                    >
                        EQUATION 3
                    </Text>
                    <View className="flex-row items-center justify-between w-full flex-wrap">
                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>a₃</Text>
                            <CustomInput
                                placeholder="a3"
                                onChangeText={(e) => handleChange(e, "a3")}
                                value={val.a3}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>x+</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>b₃</Text>
                            <CustomInput
                                placeholder="b3"
                                onChangeText={(e) => handleChange(e, "b3")}
                                value={val.b3}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>y+</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>c₃</Text>
                            <CustomInput
                                placeholder="c3"
                                onChangeText={(e) => handleChange(e, "c3")}
                                value={val.c3}
                                width="100%"
                            />
                        </View>
                        <Text className="text-[13px] font-bold mt-4" style={{ color: colors.text }}>z=</Text>

                        <View className="items-center flex-1 min-w-[50px] mx-0.5">
                            <Text className="text-[10px] mb-1 font-semibold" style={{ color: colors.text }}>d₃</Text>
                            <CustomInput
                                placeholder="d3"
                                onChangeText={(e) => handleChange(e, "d3")}
                                value={val.d3}
                                width="100%"
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Action buttons */}
            <View className="flex-row justify-between w-full mb-6 gap-x-4">
                <TouchableOpacity
                    className="flex-1 py-3.5 rounded-2xl items-center justify-center shadow-sm"
                    style={{ backgroundColor: colors.secondary }}
                    onPress={() => findSolution()}
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

            {/* Results Output */}
            {hasAns.visible && statusStyle && (
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
                    <Text
                        className="text-[12px] font-bold mb-4 tracking-[1px]"
                        style={{ color: colors.secondary }}
                    >
                        CALCULATED SOLUTIONS
                    </Text>

                    {/* Status Alert Banner */}
                    <View
                        className="p-3.5 rounded-2xl border flex-row items-start mb-4"
                        style={{
                            backgroundColor: addOpacity(statusStyle.color, "08"),
                            borderColor: addOpacity(statusStyle.color, "30"),
                        }}
                    >
                        <Ionicons
                            name={statusStyle.icon}
                            size={18}
                            color={statusStyle.color}
                            style={{ marginRight: 8, marginTop: 1 }}
                        />
                        <View className="flex-1">
                            <Text
                                className="text-[13px] font-semibold"
                                style={{ color: colors.text }}
                            >
                                {hasAns.message}
                            </Text>
                            <Text
                                className="text-[11px] opacity-75 mt-0.5"
                                style={{ color: colors.text }}
                            >
                                {statusStyle.desc}
                            </Text>
                        </View>
                    </View>

                    {/* Solutions variables */}
                    {hasAns.value && (
                        <View className="gap-y-3">
                            {/* Variable x */}
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
                                    VALUE OF x
                                </Text>
                                <Text
                                    className="text-[22px] font-bold"
                                    style={{ color: colors.text }}
                                >
                                    {ans.x}
                                </Text>
                            </View>

                            {/* Variable y */}
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
                                    VALUE OF y
                                </Text>
                                <Text
                                    className="text-[22px] font-bold"
                                    style={{ color: colors.text }}
                                >
                                    {ans.y}
                                </Text>
                            </View>

                            {/* Variable z */}
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
                                    VALUE OF z
                                </Text>
                                <Text
                                    className="text-[22px] font-bold"
                                    style={{ color: colors.text }}
                                >
                                    {ans.z}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default EquationWithThreeVeriables;
