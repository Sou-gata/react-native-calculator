import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";
import calBtns from "../helpers/calBtns";
import { lastChar } from "../helpers/functions";

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
    Math.newasin = function (str) {
        return (Math.asin(str) * 180) / Math.PI;
    };
    Math.newacos = function (str) {
        return (Math.acos(str) * 180) / Math.PI;
    };
    Math.newatan = function (str) {
        return (Math.atan(str) * 180) / Math.PI;
    };
    Math.newlog = function (str) {
        return Math.log10(parseFloat(str));
    };
    Math.newln = function (str) {
        return Math.log(parseFloat(str));
    };
    Math.newsqrt = function (str) {
        return Math.sqrt(parseFloat(str));
    };
    Math.newcbrt = function (str) {
        return Math.cbrt(parseFloat(str));
    };
    const [text, setText] = useState("");
    const [evalStr, setEvalStr] = useState("");
    const [sym, setSym] = useState(false);
    const [point, setPoint] = useState(false);
    const [numArr, setNumArr] = useState([]);

    const calBtnPress = (btn) => {
        let str = btn.str;
        let type = btn.type;
        let txt = btn.text;

        if (type == "eql") {
            if (!sym && evalStr.length != 0) {
                try {
                    const ans = eval(evalStr);
                    const fixed = parseFloat(ans.toFixed(8)) + "";
                    setText(fixed);
                    setEvalStr(fixed);
                    setNumArr([
                        { evalLen: fixed.length, textLen: fixed.length },
                    ]);
                } catch (error) {
                    setText("Math Error");
                    setEvalStr("Math Error");
                }
            }
        }

        if (type != "clr" && type != "ere" && type != "eql") {
            setNumArr([...numArr, btn]);
            if (type == "num") {
                setText(text + txt);
                setEvalStr(evalStr + str);
                setSym(false);
            }
            if (type == "brac") {
                setText(text + txt);
                setEvalStr(evalStr + str);
            }
            if (type == "sym") {
                if (sym) {
                    let temp = text.slice(0, -1);
                    setText(temp + txt);
                    temp = evalStr.slice(0, -1);
                    setEvalStr(temp + str);
                } else {
                    setText(text + txt);
                    setEvalStr(evalStr + str);
                }
                setSym(true);
                setPoint(false);
            }
            if (type == "point") {
                setPoint(true);
                if (!point) {
                    setText(text + txt);
                    setEvalStr(evalStr + str);
                }
            }
            if (type == "tri") {
                setText(text + txt + "(");
                setSym(false);
                setEvalStr(evalStr + `Math.new${str}`);
            }
        }
        if (type == "clr") {
            setText("");
            setEvalStr("");
            setSym(false);
            setPoint(false);
            setNumArr([]);
        }
        if (type == "ere" && text.length != 0) {
            let lastBtn = numArr[numArr.length - 1];
            const temp = text.slice(0, -lastBtn.textLen);
            setText(temp);
            const tempTwo = evalStr.slice(0, -lastBtn.evalLen);
            setEvalStr(tempTwo);
            let tempArr = [...numArr];
            tempArr.splice(numArr.length - 1, 1);
            setNumArr(tempArr);

            let last = lastChar(tempTwo);
            if (last == "sym") setSym(true);
            else setSym(false);
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.calInput}
                    value={text}
                    editable={false}
                />
            </View>
            <View style={styles.allBtns}>
                {(() => {
                    let btns = [];
                    for (let i = 0; i < calBtns.length; i++) {
                        let btn = calBtns[i];
                        let com;
                        if (btn.text != "=")
                            com = (
                                <TouchableHighlight
                                    key={i}
                                    onPress={() => calBtnPress(btn)}
                                    style={styles.calBtn}
                                    underlayColor="#ff7733a0"
                                >
                                    <Text style={btn.txtStyle}>{btn.text}</Text>
                                </TouchableHighlight>
                            );
                        else
                            com = (
                                <TouchableHighlight
                                    key={i}
                                    onPress={() => calBtnPress(btn)}
                                    style={styles.calBtnEql}
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
