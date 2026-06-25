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

    return (
        <View
            style={{
                backgroundColor: colors.backgroundColor,
                flex: 1,
            }}
        >
            <View className="flex-1">
                <ThemeSwitch colors={colors} />
                <View className="absolute z-[99] right-[52px] top-2.5 w-6 h-6 justify-center items-center">
                    <Pressable onPress={() => setShowHistory(!showHistory)}>
                        <MaterialIcons
                            name="history"
                            size={24}
                            color={colors.secondary}
                        />
                    </Pressable>
                </View>
                <View className="absolute top-0 left-[7px] z-[999] h-[45px] w-[45px] justify-center">
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
                <View className="items-center">
                    <TextInput
                        ref={inputRef}
                        className="py-2.5 pr-[45px] pl-[25px] text-3xl text-center"
                        style={{
                            height: (2 * (hp("32%") - 25)) / 3,
                            width: wp("100%"),
                            color: colors.text,
                            backgroundColor: colors.calBg,
                        }}
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
                        className="p-2.5 pr-5 text-2xl text-center"
                        style={{
                            height: (hp("32%") - 25) / 3,
                            width: wp("100%"),
                            color: colors.calAns,
                            backgroundColor: colors.calBg,
                        }}
                        value={ans}
                        editable={false}
                    />
                </View>
                {showHistory ? (
                    <View
                        className="p-5 mt-0"
                        style={{
                            height: hp("68%") - 25,
                            backgroundColor: colors.numPadBg,
                        }}
                    >
                        <Text
                            className="text-lg font-bold mb-2.5"
                            style={{ color: colors.secondary }}
                        >
                            Calculation History
                        </Text>
                        {history.length === 0 ? (
                            <View className="flex-1 justify-center items-center">
                                <Text
                                    className="text-base"
                                    style={{ color: colors.text + "80" }}
                                >
                                    No history yet
                                </Text>
                            </View>
                        ) : (
                            <ScrollView
                                className="flex-1"
                                showsVerticalScrollIndicator={false}
                            >
                                {history.map((item, index) => (
                                    <View
                                        key={index}
                                        className="border-b py-3"
                                        style={{
                                            borderBottomColor: colors.text + "20",
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    >
                                        <Pressable
                                            className="self-start py-0.5"
                                            onPress={() => {
                                                insertText(item.equation);
                                                setShowHistory(false);
                                            }}
                                        >
                                            <Text
                                                className="text-base text-left"
                                                style={{ color: colors.text }}
                                            >
                                                {item.equation}
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            className="self-end py-0.5"
                                            onPress={() => {
                                                insertText(item.result);
                                                setShowHistory(false);
                                            }}
                                        >
                                            <Text
                                                className="text-lg font-semibold text-right"
                                                style={{ color: colors.secondary }}
                                            >
                                                = {item.result}
                                            </Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                        <View className="flex-row justify-between mt-2.5 gap-2.5">
                            <Pressable
                                className="flex-1 h-11 justify-center items-center rounded-lg"
                                style={{
                                    backgroundColor: colors.secondary + "20",
                                }}
                                onPress={() => {
                                    setHistory([]);
                                    saveHistory([]);
                                }}
                            >
                                <Text
                                    className="text-base font-semibold"
                                    style={{ color: colors.secondary }}
                                >
                                    Clear
                                </Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 h-11 justify-center items-center rounded-lg"
                                style={{ backgroundColor: colors.secondary }}
                                onPress={() => setShowHistory(false)}
                            >
                                <Text
                                    className="text-base font-semibold"
                                    style={{ color: colors.backgroundColor }}
                                >
                                    Keyboard
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View
                        className="flex-row flex-wrap items-center px-5 mt-0"
                        style={{
                            height: hp("68%") - 25,
                            backgroundColor: colors.numPadBg,
                        }}
                    >
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
                                            className="items-center justify-center"
                                            style={{
                                                width: wp("17.5%"),
                                                height: hp("8.2%"),
                                            }}
                                            android_ripple={androidRipple}
                                        >
                                            <View
                                                className="justify-center items-center rounded-[55px]"
                                                style={{
                                                    width: hp("6.5%"),
                                                    height: hp("6.5%"),
                                                    backgroundColor: colors.secondary,
                                                }}
                                            >
                                                <Text
                                                    className="text-[22px]"
                                                    style={{ color: colors.backgroundColor }}
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
                                            className="items-center justify-center"
                                            style={{
                                                width: wp("17.5%"),
                                                height: hp("8.2%"),
                                            }}
                                            android_ripple={androidRipple}
                                            android_disableSound={true}
                                        >
                                            <Text
                                                className="text-[22px] font-semibold text-center opacity-50"
                                                style={{ color: colors.secondary }}
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
                                            className="items-center justify-center"
                                            style={{
                                                width: wp("17.5%"),
                                                height: hp("8.2%"),
                                            }}
                                            android_ripple={androidRipple}
                                            android_disableSound={true}
                                        >
                                            <Text
                                                className={
                                                    btn.primaryColor
                                                        ? "text-[22px] font-semibold text-center"
                                                        : "text-[20px] text-center"
                                                }
                                                style={{
                                                    color: btn.primaryColor
                                                        ? colors.secondary
                                                        : colors.text,
                                                }}
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
