import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { solveQuadraticEqu, solveQuadraticDec } from "../helpers/functions";
import ThemeSelector from "../helpers/ThemeSelector";

const QuadraticEqu = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
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
    return (
        <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.flexRow, { marginTop: 20 }]}>
                    <TextInput
                        style={[styles.miniInput, { marginHorizontal: 7 }]}
                        placeholder="a"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                        onChangeText={(e) => changeValues(e, "a")}
                        value={veriable.a}
                    />
                    <View style={styles.supContainer}>
                        <Text style={styles.sup1st}>X</Text>
                        <Text style={styles.supPow}>2</Text>
                        <Text style={styles.sup1st}> +</Text>
                    </View>
                    <TextInput
                        style={[styles.miniInput, { marginHorizontal: 7 }]}
                        placeholder="b"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                        onChangeText={(e) => changeValues(e, "b")}
                        value={veriable.b}
                    />
                    <Text style={styles.sup1st}>X +</Text>
                    <TextInput
                        style={[styles.miniInput, { marginHorizontal: 7 }]}
                        placeholder="c"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                        onChangeText={(e) => changeValues(e, "c")}
                        value={veriable.c}
                    />
                    <Text style={styles.sup1st}>= 0</Text>
                </View>
                <View
                    style={[styles.flexRow, { justifyContent: "space-evenly" }]}
                >
                    <TouchableHighlight
                        style={styles.btn}
                        onPress={() => getAns()}
                    >
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.btn}
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
                    >
                        <Text style={styles.btnText}>Clear</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ marginTop: 35 }}>
                    {(ans.inFraction.rootOne ||
                        ans.inFraction.rootOne == 0) && (
                        <View>
                            <Text style={styles.textStyle}>
                                X = {ans.inFraction.rootOne}
                            </Text>
                            <Text style={styles.textStyle}>and</Text>
                            <Text style={styles.textStyle}>
                                X = {ans.inFraction.rootTwo}
                            </Text>
                        </View>
                    )}
                    {(ans.inDecimal.rootOne || ans.inDecimal.rootOne == 0) &&
                        ans.inDecimal.rootOne != ans.inFraction.rootOne &&
                        ans.inDecimal.rootTwo != ans.inFraction.rootTwo && (
                            <View>
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { marginVertical: 20 },
                                    ]}
                                >
                                    Or
                                </Text>
                                <Text style={styles.textStyle}>
                                    X = {ans.inDecimal.rootOne}
                                </Text>
                                <Text style={styles.textStyle}>and</Text>
                                <Text style={styles.textStyle}>
                                    X = {ans.inDecimal.rootTwo}
                                </Text>
                            </View>
                        )}
                </View>
            </ScrollView>
        </View>
    );
};

export default QuadraticEqu;
