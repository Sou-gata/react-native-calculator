import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

import styles from "../allStyles";
import calBtns from "../helpers/calBtns";
import { lastChar, bracManage } from "../helpers/functions";
import PopupMenu from "./PopupMenu";

const NormalCalculator = () => {
    const [text, setText] = useState("");
    const [evalStr, setEvalStr] = useState("");
    const [sym, setSym] = useState(false);
    const [point, setPoint] = useState(false);
    const [numArr, setNumArr] = useState([]);
    const [ans, setAns] = useState("");
    const [mode, setMode] = useState("deg");

    Math.toRadian = function (degrees) {
        return (degrees * Math.PI) / 180;
    };
    Math.newsin = function (str) {
        if (mode == "deg") return Math.sin(Math.toRadian(str));
        else return Math.sin(str);
    };
    Math.newcos = function (str) {
        if (mode == "deg") return Math.cos(Math.toRadian(str));
        else return Math.cos(str);
    };
    Math.newtan = function (str) {
        if (mode == "deg") return Math.tan(Math.toRadian(str));
        else return Math.tan(str);
    };
    Math.newasin = function (str) {
        if (mode == "deg") return (Math.asin(str) * 180) / Math.PI;
        else return Math.asin(str);
    };
    Math.newacos = function (str) {
        if (mode == "deg") return (Math.acos(str) * 180) / Math.PI;
        else return Math.acos(str);
    };
    Math.newatan = function (str) {
        if (mode == "deg") return (Math.atan(str) * 180) / Math.PI;
        else return Math.atan(str);
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

    const calAns = () => {
        if (evalStr != "") {
            try {
                const tempAns = eval(bracManage(evalStr));
                if (tempAns || tempAns == 0) {
                    const fixed = parseFloat(tempAns.toFixed(8)) + "";
                    setAns(fixed);
                }
                if (tempAns == evalStr) {
                    setAns("");
                }
            } catch (error) {}
        }
    };

    const changeMode = () => {
        if (mode == "deg") setMode("rad");
        else if (mode == "rad") setMode("deg");
    };

    useEffect(calAns, [evalStr, mode]);

    const calBtnPress = (btn) => {
        let str = btn.str;
        let type = btn.type;
        let txt = btn.text;

        if (type == "eql") {
            if (!sym && evalStr.length != 0) {
                try {
                    const tempAns = eval(bracManage(evalStr));
                    if (tempAns || tempAns == 0) {
                        const fixed = parseFloat(tempAns.toFixed(8)) + "";
                        setText(fixed);
                        setEvalStr(fixed);
                        setNumArr([
                            { evalLen: fixed.length, textLen: fixed.length },
                        ]);
                    }
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
            setAns("");
        }
        if (type == "ere" && text.length != 0) {
            let lastBtn = numArr[numArr.length - 1];
            if (lastBtn.type == "point") setPoint(false);
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
    const androidRipple = {
        color: "#f73",
        radius: 32.5,
        borderless: true,
    };

    return (
        <MenuProvider>
            <View style={styles.menuDots}>
                <PopupMenu />
            </View>
            <View style={styles.main}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.calInput}
                        value={text}
                        editable={false}
                        multiline={true}
                        numberOfLines={2}
                    />
                    <TextInput
                        style={styles.calInputAns}
                        value={ans}
                        editable={false}
                    />
                </View>
                <View style={styles.allBtns}>
                    {(() => {
                        let btns = [];
                        for (let i = 0; i < calBtns.length; i++) {
                            let btn = calBtns[i];
                            let com;
                            if (btn.text == "=")
                                com = (
                                    <Pressable
                                        key={i}
                                        onPress={() => calBtnPress(btn)}
                                        style={styles.calBtnEql}
                                        android_ripple={androidRipple}
                                    >
                                        <View style={styles.calEqual}>
                                            <Text style={btn.txtStyle}>
                                                {btn.text}
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            else if (btn.text == "deg") {
                                com = (
                                    <Pressable
                                        key={i}
                                        onPress={() => changeMode(btn)}
                                        style={styles.calBtn}
                                        android_ripple={androidRipple}
                                        android_disableSound={true}
                                    >
                                        <Text style={btn.txtStyle}>{mode}</Text>
                                    </Pressable>
                                );
                            } else
                                com = (
                                    <Pressable
                                        key={i}
                                        onPress={() => calBtnPress(btn)}
                                        style={styles.calBtn}
                                        android_ripple={androidRipple}
                                        android_disableSound={true}
                                    >
                                        <Text style={btn.txtStyle}>
                                            {btn.text}
                                        </Text>
                                    </Pressable>
                                );
                            btns.push(com);
                        }
                        return btns;
                    })()}
                </View>
            </View>
        </MenuProvider>
    );
};

export default NormalCalculator;
