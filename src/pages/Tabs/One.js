import { View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import calBtns from "../../helpers/calBtns";
import { lastChar, bracManage } from "../../helpers/functions";
import { useTheme, Menu, Text } from "react-native-paper";
import ThemeSwitch from "../../components/ThemeSwitch";
import Entypo from "react-native-vector-icons/Entypo";
import { wp, hp } from "../../helpers/functions";

const One = ({ navigation }) => {
    const { colors } = useTheme();
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
        color: colors.secondary + "80",
        radius: 32.5,
        borderless: true,
    };
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const styles = StyleSheet.create({
        main: {
            flex: 1,
        },
        inputContainer: {
            alignItems: "center",
        },
        calInput: {
            height: (2 * (hp("25%") - 25)) / 3,
            width: wp("100%"),
            paddingVertical: 10,
            paddingRight: 45,
            paddingLeft: 25,
            fontSize: 30,
            textAlign: "center",
            color: colors.text,
            backgroundColor: colors.calBg,
        },
        calInputAns: {
            height: (hp("25%") - 25) / 3,
            width: wp("100%"),
            padding: 10,
            paddingRight: 20,
            fontSize: 25,
            textAlign: "center",
            color: colors.calAns,
            backgroundColor: colors.calBg,
        },
        allBtns: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
            height: hp("75%") - 25,
            marginTop: hp("25%") - 25,
            backgroundColor: colors.numPadBg,
        },
        calBtn: {
            width: wp("17.5%"),
            alignItems: "center",
            height: hp("9.5%"),
            justifyContent: "center",
        },
        calText: {
            fontSize: 20,
            textAlign: "center",
            color: colors.text,
        },
        calTextOrange: {
            fontSize: 22,
            fontWeight: "600",
            textAlign: "center",
            color: colors.secondary,
        },
        calEqual: {
            width: hp("7.5%"),
            height: hp("7.5%"),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 55,
            backgroundColor: colors.secondary,
        },
        calEqualText: {
            color: colors.backgroundColor,
            fontSize: 22,
        },
        menu: {
            position: "absolute",
            top: 0,
            left: 7,
            zIndex: 999,
            height: 45,
            width: 45,
            justifyContent: "center",
        },
    });

    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor,
            }}>
            <View style={styles.main}>
                <ThemeSwitch colors={colors} />
                <View style={styles.menu}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Entypo
                                onPress={openMenu}
                                name="dots-three-vertical"
                                size={24}
                                color={colors.secondary}
                            />
                        }>
                        <Menu.Item
                            style={{
                                backgroundColor: colors.elevation.leve2,
                            }}
                            titleStyle={{ color: colors.text }}
                            onPress={() => {
                                navigation.navigate("About");
                                closeMenu();
                            }}
                            title="About"
                        />
                        <Menu.Item
                            style={{
                                backgroundColor: colors.elevation.leve2,
                            }}
                            titleStyle={{ color: colors.text }}
                            onPress={() => {
                                navigation.navigate("WhatsNew");
                                closeMenu();
                            }}
                            title="What's New ?"
                        />
                    </Menu>
                </View>
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
                            if (btn.text == "=") {
                                com = (
                                    <Pressable
                                        key={i}
                                        onPress={() => calBtnPress(btn)}
                                        style={styles.calBtn}
                                        android_ripple={androidRipple}>
                                        <View style={styles.calEqual}>
                                            <Text style={styles.calEqualText}>
                                                {btn.text}
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            } else if (btn.text == "deg") {
                                com = (
                                    <Pressable
                                        key={i}
                                        onPress={() => changeMode(btn)}
                                        style={styles.calBtn}
                                        android_ripple={androidRipple}
                                        android_disableSound={true}>
                                        <Text
                                            style={[
                                                styles.calTextOrange,
                                                { opacity: 0.5 },
                                            ]}>
                                            {mode}
                                        </Text>
                                    </Pressable>
                                );
                            } else {
                                com = (
                                    <Pressable
                                        key={i}
                                        onPress={() => calBtnPress(btn)}
                                        style={styles.calBtn}
                                        android_ripple={androidRipple}
                                        android_disableSound={true}>
                                        <Text
                                            style={
                                                btn.primaryColor
                                                    ? styles.calTextOrange
                                                    : styles.calText
                                            }>
                                            {btn.text}
                                        </Text>
                                    </Pressable>
                                );
                            }
                            btns.push(com);
                        }
                        return btns;
                    })()}
                </View>
            </View>
        </View>
    );
};

export default One;
