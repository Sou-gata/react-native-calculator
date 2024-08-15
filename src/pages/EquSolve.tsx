import { StyleSheet, View } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useTheme, Button, Text } from "react-native-paper";
import { equSolve } from "../helpers/functions";
import { colorSchemeType, equnAnsType } from "../../types";

const EquSolve = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [val, setVal] = useState({
        a1: "",
        a2: "",
        b1: "",
        b2: "",
        c1: "",
        c2: "",
    });
    const [finalAns, setFinalAns] = useState<equnAnsType>({
        numeratorX: 0,
        denominatorX: 0,
        numeratorY: 0,
        denominatorY: 0,
        x: 0,
        y: 0,
        noSolution: false,
        manySolution: false,
        normalSolution: false,
    });
    const changeValues = (e: string, place: string) =>
        setVal({ ...val, [place]: e });

    const textStyle = [styles.textStyle, { color: colors.text }];

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.flexRow}>
                <CustomInput
                    placeholder="a1"
                    onChangeText={(e) => changeValues(e, "a1")}
                    value={val.a1}
                    width={60}
                />
                <Text
                    style={{
                        fontSize: 18,
                        color: colors.text,
                        marginHorizontal: 10,
                    }}>
                    x +
                </Text>
                <CustomInput
                    placeholder="b1"
                    onChangeText={(e) => changeValues(e, "b1")}
                    value={val.b1}
                    width={60}
                />
                <Text
                    style={{
                        fontSize: 18,
                        color: colors.text,
                        marginHorizontal: 10,
                    }}>
                    y +
                </Text>
                <CustomInput
                    placeholder="c1"
                    onChangeText={(e) => changeValues(e, "c1")}
                    value={val.c1}
                    width={60}
                />
            </View>
            <View style={styles.flexRow}>
                <CustomInput
                    placeholder="a2"
                    onChangeText={(e) => changeValues(e, "a2")}
                    value={val.a2}
                    width={60}
                />
                <Text
                    style={{
                        fontSize: 18,
                        color: colors.text,
                        marginHorizontal: 10,
                    }}>
                    x +
                </Text>
                <CustomInput
                    placeholder="b2"
                    onChangeText={(e) => changeValues(e, "b2")}
                    value={val.b2}
                    width={60}
                />
                <Text
                    style={{
                        fontSize: 18,
                        color: colors.text,
                        marginHorizontal: 10,
                    }}>
                    y +
                </Text>
                <CustomInput
                    placeholder="c2"
                    onChangeText={(e) => changeValues(e, "c2")}
                    value={val.c2}
                    width={60}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => {
                        const a1 = parseFloat(val.a1);
                        const a2 = parseFloat(val.a2);
                        const b1 = parseFloat(val.b1);
                        const b2 = parseFloat(val.b2);
                        const c1 = parseFloat(val.c1);
                        const c2 = parseFloat(val.c2);
                        if (isNaN(a1) || isNaN(a2) || isNaN(c1) || isNaN(c2))
                            return;
                        equSolve(a1, a2, b1, b2, c1, c2, setFinalAns);
                    }}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Calculate
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        setVal({
                            a1: "",
                            a2: "",
                            b1: "",
                            b2: "",
                            c1: "",
                            c2: "",
                        });
                        setFinalAns({
                            numeratorX: 0,
                            denominatorX: 0,
                            numeratorY: 0,
                            denominatorY: 0,
                            x: 0,
                            y: 0,
                            noSolution: false,
                            manySolution: false,
                            normalSolution: false,
                        });
                    }}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Clear
                </Button>
            </View>
            <View style={{ marginTop: 30 }}>
                {finalAns.noSolution && (
                    <Text style={textStyle}>No Solution</Text>
                )}
                {finalAns.manySolution && (
                    <Text style={textStyle}>Many Solution</Text>
                )}
                {finalAns.normalSolution && (
                    <>
                        <View style={styles.flexRow2}>
                            {(finalAns.numeratorX ||
                                finalAns.numeratorX == 0) && (
                                <Text style={textStyle}>
                                    x = {finalAns.numeratorX}
                                </Text>
                            )}
                            {Boolean(finalAns.denominatorX) && (
                                <Text style={textStyle}>
                                    /{finalAns.denominatorX}
                                </Text>
                            )}
                        </View>
                        <View style={styles.flexRow2}>
                            {(finalAns.numeratorY ||
                                finalAns.numeratorY == 0) && (
                                <Text style={textStyle}>
                                    y = {finalAns.numeratorY}
                                </Text>
                            )}
                            {Boolean(finalAns.denominatorY) && (
                                <Text style={textStyle}>
                                    /{finalAns.denominatorY}
                                </Text>
                            )}
                        </View>
                        {(finalAns.x || finalAns.x == 0) && (
                            <View>
                                <Text
                                    style={[
                                        ...textStyle,
                                        { marginVertical: 20 },
                                    ]}>
                                    Or
                                </Text>
                                <Text style={textStyle}>x = {finalAns.x}</Text>
                                <Text style={textStyle}>y = {finalAns.y}</Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

export default EquSolve;

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 15,
    },
    flexRow2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
