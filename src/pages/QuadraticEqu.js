import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { solveQuadraticEqu, solveQuadraticDec } from "../helpers/functions";

const QuadraticEqu = () => {
    const { colors } = useTheme();
    const [veriable, setVeriable] = useState({ a: "", b: "", c: "" });
    const [ans, setAns] = useState({
        inFraction: { rootOne: undefined, rootTwo: undefined },
        inDecimal: { rootOne: undefined, rootTwo: undefined },
    });
    const changeValues = (e, values) => {
        setVeriable({ ...veriable, [values]: e });
    };
    const getAns = () => {
        let inFraction = solveQuadraticEqu(veriable.a, veriable.b, veriable.c);
        let inDecimal = solveQuadraticDec(veriable.a, veriable.b, veriable.c);
        setAns({ inFraction, inDecimal });
    };

    const textStyle = [styles.textStyle, { color: colors.text }];

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={[styles.flexRow, { marginTop: 20 }]}>
                <CustomInput
                    onChangeText={(e) => changeValues(e, "a")}
                    value={veriable.a}
                    placeholder="a"
                    width={60}
                />
                <View style={styles.supContainer}>
                    <Text style={[styles.sup1st, { color: colors.text }]}>
                        X
                    </Text>
                    <Text style={[styles.supPow, { color: colors.text }]}>
                        2
                    </Text>
                    <Text style={[styles.sup1st, { color: colors.text }]}>
                        {" "}
                        +
                    </Text>
                </View>
                <CustomInput
                    placeholder="b"
                    onChangeText={(e) => changeValues(e, "b")}
                    value={veriable.b}
                    width={60}
                />
                <Text
                    style={[
                        styles.sup1st,
                        { marginHorizontal: 10, color: colors.text },
                    ]}
                >
                    X +
                </Text>
                <CustomInput
                    placeholder="c"
                    onChangeText={(e) => changeValues(e, "c")}
                    value={veriable.c}
                    width={60}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={getAns}
                    buttonColor={colors.secondary}
                    textColor={"white"}
                >
                    Calculate
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        setVeriable({ a: "", b: "", c: "" });
                        setAns({
                            inFraction: {
                                rootOne: undefined,
                                rootTwo: undefined,
                            },
                            inDecimal: {
                                rootOne: undefined,
                                rootTwo: undefined,
                            },
                        });
                    }}
                    buttonColor={colors.secondary}
                    textColor={"white"}
                >
                    Clear
                </Button>
            </View>
            <View style={{ marginTop: 35 }}>
                {(ans.inFraction.rootOne || ans.inFraction.rootOne == 0) && (
                    <View>
                        <Text style={textStyle}>
                            X = {ans.inFraction.rootOne}
                        </Text>
                        <Text style={textStyle}>and</Text>
                        <Text style={textStyle}>
                            X = {ans.inFraction.rootTwo}
                        </Text>
                    </View>
                )}
                {(ans.inDecimal.rootOne || ans.inDecimal.rootOne == 0) &&
                    ans.inDecimal.rootOne != ans.inFraction.rootOne &&
                    ans.inDecimal.rootTwo != ans.inFraction.rootTwo && (
                        <View>
                            <Text
                                style={[...textStyle, { marginVertical: 20 }]}
                            >
                                Or
                            </Text>
                            <Text style={textStyle}>
                                X = {ans.inDecimal.rootOne}
                            </Text>
                            <Text style={textStyle}>and</Text>
                            <Text style={textStyle}>
                                X = {ans.inDecimal.rootTwo}
                            </Text>
                        </View>
                    )}
            </View>
        </View>
    );
};

export default QuadraticEqu;

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    supContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginHorizontal: 10,
    },
    sup1st: {
        fontSize: 20,
        lineHeight: 30,
    },
    supPow: {
        fontSize: 12,
        lineHeight: 18,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 30,
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
});
