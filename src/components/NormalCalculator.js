import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";
import calBtns from "../helpers/calBtns";

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
                try {
                    const ans = eval(evalStr);
                    const fixed = parseFloat(ans.toFixed(8)) + "";
                    setText(fixed);
                    setEvalStr(fixed);
                } catch (error) {
                    setText("Math Error");
                    setEvalStr("Math Error");
                }
            }
        }

        if (type != "clr" && type != "ere" && type != "eql") {
            if (type == "num") {
                setText(text + str);
                setEvalStr(evalStr + str);
                setSym(false);
            }
            if (type == "brac") {
                setText(text + str);
                setEvalStr(evalStr + str);
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
                {(() => {
                    let btns = [];
                    for (let i = 0; i < calBtns.length; i++) {
                        let btn = calBtns[i];
                        let com = (
                            <TouchableHighlight
                                key={i}
                                onPress={() => calBtnPress(btn.str, btn.type)}
                                style={styles.calBtn}
                                underlayColor="#ff7733a0"
                            >
                                <Text style={btn.txtStyle}>{btn.text}</Text>
                            </TouchableHighlight>
                        );
                        btns.push(com);
                    }
                    return btns;
                })()}
            </View>
        </View>
    );
};

export default NormalCalculator;
