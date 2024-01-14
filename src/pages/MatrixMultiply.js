import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { matrixMultiply } from "../helpers/functions";

const MatrixMultiply = () => {
    const { colors } = useTheme();
    const emptyInput = {
        oneRow: "",
        twoRow: "",
        oneCol: "",
        twoCol: "",
    };
    const emptyMatrix = {
        one: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" },
        two: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" },
    };
    const [input, setInput] = useState(emptyInput);
    const [matrix, setMatrix] = useState(emptyMatrix);
    const [ans, setAns] = useState([[], [], [], [], [], []]);
    const [errInput, setErrInput] = useState(false);
    const [hide, setHide] = useState({ input: false, matrix: true });
    const change = (e, field) => {
        setInput((prev) => {
            return { ...prev, [field]: e };
        });
    };
    const createMatrix = () => {
        const oneRow = parseInt(input.oneRow);
        const oneCol = parseInt(input.oneCol);
        const twoRow = parseInt(input.twoRow);
        const twoCol = parseInt(input.twoCol);
        if (
            oneCol != twoRow ||
            oneCol > 6 ||
            twoCol > 6 ||
            oneRow > 6 ||
            twoRow > 6
        ) {
            setErrInput(true);
        } else {
            setHide({ input: true, matrix: false });
        }
    };
    const handleChange = (e, matrix, row) => {
        setMatrix((prev) => {
            return { ...prev, [matrix]: { ...prev[matrix], [row]: e } };
        });
    };
    const calculate = () => {
        const returnData = matrixMultiply(matrix, input);
        // setMatrix({ one: returnData.matrixOne, two: returnData.matrixTwo });
        setAns(returnData.newMatrix);
        setHide({ input: true, matrix: false });
    };
    const goBack = () => {
        setInput(emptyInput);
        setMatrix(emptyMatrix);
        setHide({ input: false, matrix: true });
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            {!hide.input && (
                <>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Matrix One
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                columnGap: 30,
                                marginTop: 15,
                            }}>
                            <CustomInput
                                onChangeText={(e) => change(e, "oneRow")}
                                value={input.oneRow}
                                placeholder="Row"
                                width={120}
                            />
                            <CustomInput
                                onChangeText={(e) => change(e, "oneCol")}
                                value={input.oneCol}
                                placeholder="Column"
                                width={120}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Matrix Two
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                columnGap: 30,
                                marginTop: 15,
                            }}>
                            <CustomInput
                                onChangeText={(e) => change(e, "twoRow")}
                                value={input.twoRow}
                                placeholder="Row"
                                width={120}
                            />
                            <CustomInput
                                onChangeText={(e) => change(e, "twoCol")}
                                value={input.twoCol}
                                placeholder="Column"
                                width={120}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={createMatrix}
                            buttonColor={colors.secondary}
                            textColor={"white"}>
                            Create
                        </Button>
                    </View>
                    {errInput && (
                        <Text
                            style={{
                                color: colors.secondary,
                                marginTop: 30,
                                textAlign: "center",
                                fontSize: 25,
                            }}>
                            Can't multiply.
                        </Text>
                    )}
                </>
            )}
            {!hide.matrix && (
                <View style={{ padding: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <View>
                            <Text
                                style={{
                                    color: colors.text,
                                    textAlign: "center",
                                    fontSize: 20,
                                }}>
                                Matrix One
                            </Text>
                            {(() => {
                                const rows = [];
                                for (let i = 0; i < input.oneRow; i++) {
                                    let placeholder = "";
                                    for (let j = 1; j <= input.oneCol; j++) {
                                        placeholder += j;
                                        if (j != input.oneCol)
                                            placeholder += " ";
                                    }
                                    let row = (
                                        <CustomInput
                                            key={i}
                                            width={125}
                                            placeholder={placeholder}
                                            value={matrix["one"][i + 1 + ""]}
                                            onChangeText={(e) =>
                                                handleChange(e, "one", i + 1)
                                            }
                                        />
                                    );
                                    rows.push(row);
                                }
                                return rows;
                            })()}
                        </View>
                        <Text style={{ color: colors.text, fontSize: 25 }}>
                            x
                        </Text>
                        <View>
                            <Text
                                style={{
                                    color: colors.text,
                                    textAlign: "center",
                                    fontSize: 20,
                                }}>
                                Matrix Two
                            </Text>
                            {(() => {
                                const rows = [];
                                for (let i = 0; i < input.twoRow; i++) {
                                    let placeholder = "";
                                    for (let j = 1; j <= input.twoCol; j++) {
                                        placeholder += j;
                                        if (j != input.twoCol)
                                            placeholder += " ";
                                    }
                                    let row = (
                                        <CustomInput
                                            key={i}
                                            width={125}
                                            placeholder={placeholder}
                                            value={matrix["two"][i + 1 + ""]}
                                            onChangeText={(e) =>
                                                handleChange(e, "two", i + 1)
                                            }
                                        />
                                    );
                                    rows.push(row);
                                }
                                return rows;
                            })()}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={calculate}
                            buttonColor={colors.secondary}
                            textColor={"white"}>
                            Calculate
                        </Button>
                        <Button
                            mode="contained"
                            onPress={goBack}
                            buttonColor={colors.secondary}
                            textColor={"white"}>
                            Go Back
                        </Button>
                    </View>

                    {ans[0].length !== 0 && (
                        <View style={{ alignItems: "center", marginTop: 30 }}>
                            <View>
                                <MatrixBorder colors={colors} />
                                <View
                                    style={{
                                        borderColor: colors.text,
                                        borderLeftWidth: 1,
                                        borderRightWidth: 1,
                                        padding: 5,
                                        flexDirection: "row",
                                        gap: 15,
                                    }}>
                                    {ans.map((col, i) => {
                                        return (
                                            <View key={i + 999}>
                                                {(() => {
                                                    let data = [];
                                                    for (
                                                        let j = 0;
                                                        j < col.length;
                                                        j++
                                                    ) {
                                                        data.push(
                                                            <Text
                                                                key={j + 100}
                                                                style={{
                                                                    fontSize: 20,
                                                                    color: colors.text,
                                                                    textAlign:
                                                                        "center",
                                                                }}>
                                                                {col[j]}
                                                            </Text>
                                                        );
                                                    }
                                                    return data;
                                                })()}
                                            </View>
                                        );
                                    })}
                                </View>
                                <MatrixBorder colors={colors} />
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const MatrixBorder = ({ colors }) => {
    return (
        <View
            style={{
                justifyContent: "space-between",
                flexDirection: "row",
            }}>
            <View
                style={{
                    height: 1,
                    backgroundColor: colors.text,
                    width: 20,
                }}
            />
            <View
                style={{
                    height: 1,
                    backgroundColor: colors.text,
                    width: 20,
                }}
            />
        </View>
    );
};

export default MatrixMultiply;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});
