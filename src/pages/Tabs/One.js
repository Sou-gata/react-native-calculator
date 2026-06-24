import {
    View,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import calBtns from "../../helpers/calBtns";
import { bracManage } from "../../helpers/functions";
import { useTheme, Menu, Text } from "react-native-paper";
import ThemeSwitch from "../../components/ThemeSwitch";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { wp, hp } from "../../helpers/functions";

const One = ({ navigation }) => {
    const { colors } = useTheme();
    const [text, setText] = useState("");
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [ans, setAns] = useState("");
    const [mode, setMode] = useState("deg");
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const storedHistory = await AsyncStorage.getItem(
                    "calc_history",
                );
                if (storedHistory) {
                    setHistory(JSON.parse(storedHistory));
                }
            } catch (e) {
                console.error("Failed to load history", e);
            }
        };
        loadHistory();
    }, []);

    const saveHistory = async newHistory => {
        try {
            await AsyncStorage.setItem(
                "calc_history",
                JSON.stringify(newHistory),
            );
        } catch (e) {
            console.error("Failed to save history", e);
        }
    };

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

    const textToEvalStr = input => {
        let s = input;
        s = s.replace(/\be\b/g, "Math.E");
        s = s.replace(/π/g, "Math.PI");

        s = s.replace(/sin⁻¹\(/g, "Math.newasin(");
        s = s.replace(/cos⁻¹\(/g, "Math.newacos(");
        s = s.replace(/tan⁻¹\(/g, "Math.newatan(");
        s = s.replace(/sin\(/g, "Math.newsin(");
        s = s.replace(/cos\(/g, "Math.newcos(");
        s = s.replace(/tan\(/g, "Math.newtan(");
        s = s.replace(/log\(/g, "Math.newlog(");
        s = s.replace(/ln\(/g, "Math.newln(");
        s = s.replace(/√\(/g, "Math.newsqrt(");
        s = s.replace(/∛\(/g, "Math.newcbrt(");

        s = s.replace(/×/g, "*");
        s = s.replace(/÷/g, "/");
        s = s.replace(/\^/g, "**");

        return s;
    };

    const calAns = () => {
        if (text !== "" && text !== "Math Error") {
            try {
                const evalStr = textToEvalStr(text);
                const tempAns = eval(bracManage(evalStr));
                if ((tempAns || tempAns === 0) && isFinite(tempAns)) {
                    const fixed = parseFloat(tempAns.toFixed(8)) + "";
                    setAns(fixed);
                    if (fixed === text) {
                        setAns("");
                    }
                } else {
                    setAns("");
                }
            } catch (error) {
                setAns("");
            }
        } else {
            setAns("");
        }
    };

    const changeMode = () => {
        if (mode == "deg") setMode("rad");
        else if (mode == "rad") setMode("deg");
    };

    useEffect(calAns, [text, mode]);

    const isSymChar = char => ["+", "-", "×", "÷", "^", "%"].includes(char);

    const insertText = insertedText => {
        const start = selection.start;
        const end = selection.end;
        const newText =
            text.substring(0, start) + insertedText + text.substring(end);
        setText(newText);
        const newCursorPos = start + insertedText.length;
        setSelection({ start: newCursorPos, end: newCursorPos });
    };

    const insertSymbol = symText => {
        const start = selection.start;
        const end = selection.end;
        const before = text.substring(0, start);
        const after = text.substring(end);

        const lastChar = before.charAt(before.length - 1);
        if (start === end && isSymChar(lastChar)) {
            const newText = before.slice(0, -1) + symText + after;
            setText(newText);
            setSelection({ start, end: start });
        } else {
            const newText = before + symText + after;
            setText(newText);
            setSelection({
                start: start + symText.length,
                end: start + symText.length,
            });
        }
    };

    const canAddDecimal = () => {
        const start = selection.start;
        const before = text.substring(0, start);
        let lastSeparatorIdx = -1;
        for (let i = before.length - 1; i >= 0; i--) {
            const char = before.charAt(i);
            if ((char < "0" || char > "9") && char !== ".") {
                lastSeparatorIdx = i;
                break;
            }
        }
        const currentNumStr = before.substring(lastSeparatorIdx + 1);
        return !currentNumStr.includes(".");
    };

    const deleteText = () => {
        const start = selection.start;
        const end = selection.end;
        if (start !== end) {
            const newText = text.substring(0, start) + text.substring(end);
            setText(newText);
            setSelection({ start, end: start });
        } else if (start > 0) {
            const before = text.substring(0, start);
            const after = text.substring(start);
            let deleteLen = 1;
            const functions = [
                "sin(",
                "cos(",
                "tan(",
                "sin⁻¹(",
                "cos⁻¹(",
                "tan⁻¹(",
                "log(",
                "ln(",
                "√(",
                "∛(",
            ];
            for (const func of functions) {
                if (before.endsWith(func)) {
                    deleteLen = func.length;
                    break;
                }
            }
            const newText =
                before.substring(0, before.length - deleteLen) + after;
            setText(newText);
            const newCursorPos = start - deleteLen;
            setSelection({ start: newCursorPos, end: newCursorPos });
        }
    };

    const calBtnPress = btn => {
        let type = btn.type;
        let txt = btn.text;

        if (text === "Math Error") {
            setText("");
            setSelection({ start: 0, end: 0 });
            setAns("");
            if (type === "ere" || type === "clr") {
                return;
            }
        }

        if (type === "clr") {
            setText("");
            setSelection({ start: 0, end: 0 });
            setAns("");
            return;
        }

        if (type === "ere") {
            deleteText();
            return;
        }

        if (type === "eql") {
            if (text.length !== 0) {
                try {
                    const evalStr = textToEvalStr(text);
                    const tempAns = eval(bracManage(evalStr));

                    if ((tempAns || tempAns === 0) && isFinite(tempAns)) {
                        const fixed = parseFloat(tempAns.toFixed(8)) + "";

                        const newEntry = { equation: text, result: fixed };
                        setHistory(prev => {
                            const updated = [newEntry, ...prev.slice(0, 9)];
                            saveHistory(updated);
                            return updated;
                        });

                        setText(fixed);
                        setSelection({
                            start: fixed.length,
                            end: fixed.length,
                        });
                    } else {
                        setText("Math Error");
                        setSelection({ start: 0, end: 0 });
                    }
                } catch (error) {
                    setText("Math Error");
                    setSelection({ start: 0, end: 0 });
                }
            }
            return;
        }

        if (type === "num" || type === "brac") {
            insertText(txt);
        } else if (type === "sym") {
            insertSymbol(txt);
        } else if (type === "point") {
            if (canAddDecimal()) {
                insertText(txt);
            }
        } else if (type === "tri") {
            insertText(txt + "(");
        }

        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    };

    const androidRipple = {
        color: colors.secondary + "80",
        radius: 32.5,
        borderless: true,
    };
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
            marginTop: 0,
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
        historyButton: {
            position: "absolute",
            zIndex: 99,
            right: 52,
            top: 10,
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
        },
        historyContainer: {
            padding: 20,
            height: hp("75%") - 25,
            marginTop: 0,
            backgroundColor: colors.numPadBg,
        },
        historyHeader: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.secondary,
            marginBottom: 10,
        },
        emptyHistory: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        emptyHistoryText: {
            color: colors.text + "80",
            fontSize: 16,
        },
        historyItem: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.text + "20",
            paddingVertical: 12,
        },
        historyEquationPress: {
            alignSelf: "flex-start",
            paddingVertical: 2,
        },
        historyEquationText: {
            fontSize: 16,
            color: colors.text,
            textAlign: "left",
        },
        historyResultPress: {
            alignSelf: "flex-end",
            paddingVertical: 2,
        },
        historyResultText: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.secondary,
            textAlign: "right",
        },
        historyFooter: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 10,
        },
        historyFooterBtn: {
            flex: 1,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
        },
        historyFooterBtnText: {
            fontSize: 16,
            fontWeight: "600",
        },
    });

    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor,
                flex: 1,
            }}
        >
            <View style={styles.main}>
                <ThemeSwitch colors={colors} />
                <View style={styles.historyButton}>
                    <Pressable onPress={() => setShowHistory(!showHistory)}>
                        <MaterialIcons
                            name="history"
                            size={24}
                            color={colors.secondary}
                        />
                    </Pressable>
                </View>
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
                        }
                    >
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
                        ref={inputRef}
                        style={styles.calInput}
                        value={text}
                        editable={true}
                        showSoftInputOnFocus={false}
                        multiline={true}
                        numberOfLines={2}
                        selection={selection}
                        onSelectionChange={e =>
                            setSelection(e.nativeEvent.selection)
                        }
                    />
                    <TextInput
                        style={styles.calInputAns}
                        value={ans}
                        editable={false}
                    />
                </View>
                {showHistory ? (
                    <View style={styles.historyContainer}>
                        <Text style={styles.historyHeader}>
                            Calculation History
                        </Text>
                        {history.length === 0 ? (
                            <View style={styles.emptyHistory}>
                                <Text style={styles.emptyHistoryText}>
                                    No history yet
                                </Text>
                            </View>
                        ) : (
                            <ScrollView
                                style={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
                                {history.map((item, index) => (
                                    <View
                                        key={index}
                                        style={styles.historyItem}
                                    >
                                        <Pressable
                                            style={styles.historyEquationPress}
                                            onPress={() => {
                                                insertText(item.equation);
                                                setShowHistory(false);
                                            }}
                                        >
                                            <Text
                                                style={
                                                    styles.historyEquationText
                                                }
                                            >
                                                {item.equation}
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={styles.historyResultPress}
                                            onPress={() => {
                                                insertText(item.result);
                                                setShowHistory(false);
                                            }}
                                        >
                                            <Text
                                                style={styles.historyResultText}
                                            >
                                                = {item.result}
                                            </Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                        <View style={styles.historyFooter}>
                            <Pressable
                                style={[
                                    styles.historyFooterBtn,
                                    {
                                        backgroundColor:
                                            colors.secondary + "20",
                                    },
                                ]}
                                onPress={() => {
                                    setHistory([]);
                                    saveHistory([]);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.historyFooterBtnText,
                                        { color: colors.secondary },
                                    ]}
                                >
                                    Clear
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.historyFooterBtn,
                                    { backgroundColor: colors.secondary },
                                ]}
                                onPress={() => setShowHistory(false)}
                            >
                                <Text
                                    style={[
                                        styles.historyFooterBtnText,
                                        { color: colors.backgroundColor },
                                    ]}
                                >
                                    Keyboard
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
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
                                            android_ripple={androidRipple}
                                        >
                                            <View style={styles.calEqual}>
                                                <Text
                                                    style={styles.calEqualText}
                                                >
                                                    {btn.text}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    );
                                } else if (btn.text == "deg") {
                                    com = (
                                        <Pressable
                                            key={i}
                                            onPress={() => changeMode()}
                                            style={styles.calBtn}
                                            android_ripple={androidRipple}
                                            android_disableSound={true}
                                        >
                                            <Text
                                                style={[
                                                    styles.calTextOrange,
                                                    { opacity: 0.5 },
                                                ]}
                                            >
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
                                            android_disableSound={true}
                                        >
                                            <Text
                                                style={
                                                    btn.primaryColor
                                                        ? styles.calTextOrange
                                                        : styles.calText
                                                }
                                            >
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
                )}
            </View>
        </View>
    );
};

export default One;
