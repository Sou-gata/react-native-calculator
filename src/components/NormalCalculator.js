import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";

const NormalCalculator = () => {
    Math.toRadian = function (degrees) {
        return (degrees * Math.PI) / 180;
    };
    Math.newsin = function (str) {
        return Math.sin(Math.toRadian(str));
    };
    Math.newcos = function (str) {
        return Math.cos(Math.toRadian(str));
    };
    Math.newtan = function (str) {
        return Math.tan(Math.toRadian(str));
    };
    const [text, setText] = useState("");
    const [evalStr, setEvalStr] = useState("");
    const [sym, setSym] = useState(false);

    const calBtnPress = (str, type) => {
        if (type == "eql") {
            if (!sym && evalStr.length != 0) {
                const ans = eval(evalStr);
                const fixed = parseFloat(ans.toFixed(8)) + "";
                setText(fixed);
                setEvalStr(fixed);
            }
        }

        if (type != "clr" && type != "ere" && type != "eql") {
            if (type == "num") {
                setText(text + str);
                setEvalStr(evalStr + str);
                setSym(false);
            }
            if (type == "sym") setSym(true);
            if (!sym) {
                setText(text + str);
                setEvalStr(evalStr + str);
            }
            if (type == "tri") {
                setText(text + str);
                setSym(false);
                setEvalStr(evalStr + `Math.new${str}`);
            }
        }
        if (type == "clr") {
            setText("");
            setEvalStr("");
        }
        if (type == "ere" && text.length != 0) {
            const temp = text.slice(0, -1);
            setText(temp);
            const tempTwo = evalStr.slice(0, -1);
            setEvalStr(tempTwo);
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.calInput}
                    value={text}
                    disabled={true}
                />
            </View>
            <View style={styles.allBtns}>
                <View style={styles.row}>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("7", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>7</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("8", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>8</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("9", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>9</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress("+", "sym")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>+</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("4", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>4</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("5", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>5</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("6", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>6</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress("-", "sym")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>-</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("1", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>1</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("2", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>2</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("3", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>3</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress("*", "sym")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>*</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight
                        onPress={() => calBtnPress(".", "sym")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>.</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e6573"
                        onPress={() => calBtnPress("0", "num")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>0</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress("/", "sym")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>/</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#7c5e8a"
                        onPress={() => calBtnPress("=", "eql")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>=</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress("(", "bracOpn")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>(</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress(")", "bracCls")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>)</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#734e4e"
                        onPress={() => calBtnPress("", "ere")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>⌫</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#6f734e"
                        onPress={() => calBtnPress("%", "sym")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>%</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight
                        underlayColor="#4e7355"
                        onPress={() => calBtnPress("sin(", "tri")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>sin</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e7355"
                        onPress={() => calBtnPress("cos(", "tri")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>cos</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#4e7355"
                        onPress={() => calBtnPress("tan(", "tri")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>tan</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#734e4e"
                        onPress={() => calBtnPress("", "clr")}
                        style={styles.calBtn}
                    >
                        <Text style={styles.calText}>C</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default NormalCalculator;
