import { View } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useTheme, Button, Text } from "react-native-paper";
import { colorSchemeType } from "../../types";

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
    const [hasAns, setHasAns] = useState({
        value: true,
        message: "",
        visble: false,
    });

    const handleChange = (e: string, place: string) => {
        setVal((prev) => {
            return { ...prev, [place]: e };
        });
    };
    const createMatrix = () => {
        const matrix = [
            [
                parseFloat(val.a1),
                parseFloat(val.b1),
                parseFloat(val.c1),
                parseFloat(val.d1),
            ],
            [
                parseFloat(val.a2),
                parseFloat(val.b2),
                parseFloat(val.c2),
                parseFloat(val.d2),
            ],
            [
                parseFloat(val.a3),
                parseFloat(val.b3),
                parseFloat(val.c3),
                parseFloat(val.d3),
            ],
        ];
        return matrix;
    };
    const determinantOfMatrix = (matrix: number[][]) => {
        let ans;
        ans =
            matrix[0][0] *
                (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) -
            matrix[0][1] *
                (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
            matrix[0][2] *
                (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
        return ans;
    };
    function findSolution() {
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

        if (D != 0) {
            let x = D1 / D;
            let y = D2 / D;
            let z = D3 / D;
            x = parseFloat(x.toFixed(4));
            y = parseFloat(y.toFixed(4));
            z = parseFloat(z.toFixed(4));
            setAns({ x, y, z });
            setHasAns({ value: true, message: "", visble: true });
        } else {
            if (D1 == 0 && D2 == 0 && D3 == 0) {
                setHasAns({
                    value: false,
                    message: "Infinite solutions",
                    visble: true,
                });
            } else if (D1 != 0 || D2 != 0 || D3 != 0) {
                setHasAns({
                    value: false,
                    message: "No solution",
                    visble: true,
                });
            }
        }
    }



    return (
        <View
            className="flex-1 p-5"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="flex-row items-center justify-center my-2.5">
                <CustomInput
                    placeholder="a1"
                    width={60}
                    value={val.a1}
                    onChangeText={(e) => handleChange(e, "a1")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    x +
                </Text>
                <CustomInput
                    placeholder="b1"
                    width={60}
                    value={val.b1}
                    onChangeText={(e) => handleChange(e, "b1")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    y +
                </Text>
                <CustomInput
                    placeholder="c1"
                    width={60}
                    value={val.c1}
                    onChangeText={(e) => handleChange(e, "c1")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    z =
                </Text>
                <CustomInput
                    placeholder="d1"
                    width={60}
                    value={val.d1}
                    onChangeText={(e) => handleChange(e, "d1")}
                />
            </View>
            <View className="flex-row items-center justify-center my-2.5">
                <CustomInput
                    placeholder="a2"
                    width={60}
                    value={val.a2}
                    onChangeText={(e) => handleChange(e, "a2")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    x +
                </Text>
                <CustomInput
                    placeholder="b2"
                    width={60}
                    value={val.b2}
                    onChangeText={(e) => handleChange(e, "b2")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    y +
                </Text>
                <CustomInput
                    placeholder="c2"
                    width={60}
                    value={val.c2}
                    onChangeText={(e) => handleChange(e, "c2")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    z =
                </Text>
                <CustomInput
                    placeholder="d2"
                    width={60}
                    value={val.d2}
                    onChangeText={(e) => handleChange(e, "d2")}
                />
            </View>
            <View className="flex-row items-center justify-center my-2.5">
                <CustomInput
                    placeholder="a3"
                    width={60}
                    value={val.a3}
                    onChangeText={(e) => handleChange(e, "a3")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    x +
                </Text>
                <CustomInput
                    placeholder="b3"
                    width={60}
                    value={val.b3}
                    onChangeText={(e) => handleChange(e, "b3")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    y +
                </Text>
                <CustomInput
                    placeholder="c3"
                    width={60}
                    value={val.c3}
                    onChangeText={(e) => handleChange(e, "c3")}
                />
                <Text
                    className="text-[18px] mx-[7px]"
                    style={{ color: colors.text }}
                >
                    z =
                </Text>
                <CustomInput
                    placeholder="d3"
                    width={60}
                    value={val.d3}
                    onChangeText={(e) => handleChange(e, "d3")}
                />
            </View>
            <View className="flex-row justify-evenly items-center mt-[30px]">
                <Button
                    mode="contained"
                    onPress={() => findSolution()}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Calculate
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        setVal(emptyVal);
                        setAns(emptyAns);
                        setHasAns({ value: true, message: "", visble: false });
                    }}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Clear
                </Button>
            </View>
            {hasAns.visble && Boolean(hasAns.message) && (
                <View style={{ marginTop: 20 }}>
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        {hasAns.message}
                    </Text>
                </View>
            )}
            {hasAns.visble && hasAns.value && (
                <View style={{ marginTop: 20 }}>
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        x = {ans.x}
                    </Text>
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        y = {ans.y}
                    </Text>
                    <Text
                        className="text-[25px] text-center"
                        style={{ color: colors.text }}
                    >
                        z = {ans.z}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default EquationWithThreeVeriables;
