import {
    View,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Clipboard from "@react-native-clipboard/clipboard";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import calBtns from "../../helpers/calBtns";
import { bracManage, fact } from "../../helpers/functions";
import { useTheme, Menu, Text, Snackbar } from "react-native-paper";
import ThemeSwitch from "../../components/ThemeSwitch";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { wp, hp } from "../../helpers/functions";
import { colorSchemeType, calBtnsType } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";

declare global {
    interface Math {
        toRadian(degrees: any): number;
        fact(n: any): number;
        newsin(str: any): number;
        newcos(str: any): number;
        newtan(str: any): number;
        newasin(str: any): number;
        newacos(str: any): number;
        newatan(str: any): number;
        newlog(str: any): number;
        newln(str: any): number;
        newsqrt(str: any): number;
        newcbrt(str: any): number;
    }
}

const basicBtns: calBtnsType[] = [
    { text: "C", type: "clr", primaryColor: true, str: "" },
    { text: "⌫", type: "ere", primaryColor: true, str: "" },
    { text: "%", type: "sym", primaryColor: true, str: "" },
    { text: "÷", type: "sym", primaryColor: true, str: "" },
    
    { text: "7", type: "num", str: "7" },
    { text: "8", type: "num", str: "8" },
    { text: "9", type: "num", str: "9" },
    { text: "×", type: "sym", primaryColor: true, str: "*" },
    
    { text: "4", type: "num", str: "4" },
    { text: "5", type: "num", str: "5" },
    { text: "6", type: "num", str: "6" },
    { text: "-", type: "sym", primaryColor: true, str: "-" },
    
    { text: "1", type: "num", str: "1" },
    { text: "2", type: "num", str: "2" },
    { text: "3", type: "num", str: "3" },
    { text: "+", type: "sym", primaryColor: true, str: "+" },
    
    { text: "( )", type: "brac", primaryColor: true, str: "" },
    { text: "0", type: "num", str: "0" },
    { text: ".", type: "point", str: "." },
    { text: "=", type: "eql", primaryColor: false, str: "" },
];

interface OneProps {
    navigation: StackNavigationProp<any, any>;
}

const One = ({ navigation }: OneProps) => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, setText] = useState<string>("");
    const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
    const [ans, setAns] = useState<string>("");
    const [mode, setMode] = useState<string>("deg");
    const [history, setHistory] = useState<{ equation: string; result: string }[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [isScientific, setIsScientific] = useState<boolean>(false);
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const inputRef = useRef<TextInput>(null);
    const toggleScientificMode = () => {
        setIsScientific(prev => {
            const next = !prev;
            AsyncStorage.setItem("calc_is_scientific", JSON.stringify(next)).catch(e =>
                console.error("Failed to save scientific mode", e)
            );
            return next;
        });
    };

    useEffect(() => {
        const loadSavedSettings = async () => {
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

            try {
                const storedAngleMode = await AsyncStorage.getItem("calc_angle_mode");
                if (storedAngleMode === "deg" || storedAngleMode === "rad") {
                    setMode(storedAngleMode);
                }
            } catch (e) {
                console.error("Failed to load angle mode", e);
            }

            try {
                const storedIsScientific = await AsyncStorage.getItem("calc_is_scientific");
                if (storedIsScientific !== null) {
                    setIsScientific(JSON.parse(storedIsScientific));
                }
            } catch (e) {
                console.error("Failed to load scientific mode", e);
            }
        };
        loadSavedSettings();
    }, []);

    const saveHistory = async (newHistory: { equation: string; result: string }[]) => {
        try {
            await AsyncStorage.setItem(
                "calc_history",
                JSON.stringify(newHistory),
            );
        } catch (e) {
            console.error("Failed to save history", e);
        }
    };

    Math.toRadian = function (degrees: any) {
        return (degrees * Math.PI) / 180;
    };
    Math.fact = fact;
    Math.newsin = function (str: any) {
        if (mode == "deg") return Math.sin(Math.toRadian(str));
        else return Math.sin(str);
    };
    Math.newcos = function (str: any) {
        if (mode == "deg") return Math.cos(Math.toRadian(str));
        else return Math.cos(str);
    };
    Math.newtan = function (str: any) {
        if (mode == "deg") return Math.tan(Math.toRadian(str));
        else return Math.tan(str);
    };
    Math.newasin = function (str: any) {
        if (mode == "deg") return (Math.asin(str) * 180) / Math.PI;
        else return Math.asin(str);
    };
    Math.newacos = function (str: any) {
        if (mode == "deg") return (Math.acos(str) * 180) / Math.PI;
        else return Math.acos(str);
    };
    Math.newatan = function (str: any) {
        if (mode == "deg") return (Math.atan(str) * 180) / Math.PI;
        else return Math.atan(str);
    };
    Math.newlog = function (str: any) {
        return Math.log10(parseFloat(str));
    };
    Math.newln = function (str: any) {
        return Math.log(parseFloat(str));
    };
    Math.newsqrt = function (str: any) {
        return Math.sqrt(parseFloat(str));
    };
    Math.newcbrt = function (str: any) {
        return Math.cbrt(parseFloat(str));
    };

    const replaceFactorial = (s: string): string => {
        let idx = s.indexOf('!');
        while (idx !== -1) {
            let pos = idx - 1;
            if (pos < 0) {
                s = s.substring(0, idx) + s.substring(idx + 1);
                idx = s.indexOf('!');
                continue;
            }
            
            let char = s.charAt(pos);
            if (char === ')') {
                let depth = 1;
                pos--;
                while (pos >= 0 && depth > 0) {
                    if (s.charAt(pos) === ')') depth++;
                    else if (s.charAt(pos) === '(') depth--;
                    pos--;
                }
                while (pos >= 0 && !["+", "-", "×", "÷", "^", "%", "(", ")", " "].includes(s.charAt(pos))) {
                    pos--;
                }
                const term = s.substring(pos + 1, idx);
                s = s.substring(0, pos + 1) + "Math.fact(" + term + ")" + s.substring(idx + 1);
            } else {
                while (pos >= 0 && !["+", "-", "×", "÷", "^", "%", "(", ")", " "].includes(s.charAt(pos))) {
                    pos--;
                }
                const term = s.substring(pos + 1, idx);
                s = s.substring(0, pos + 1) + "Math.fact(" + term + ")" + s.substring(idx + 1);
            }
            idx = s.indexOf('!');
        }
        return s;
    };

    const textToEvalStr = (input: string): string => {
        let s = input;
        s = replaceFactorial(s);
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
            } catch {
                setAns("");
            }
        } else {
            setAns("");
        }
    };

    const changeMode = () => {
        const nextMode = mode === "deg" ? "rad" : "deg";
        setMode(nextMode);
        AsyncStorage.setItem("calc_angle_mode", nextMode).catch(e =>
            console.error("Failed to save angle mode", e)
        );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(calAns, [text, mode]);

    const isSymChar = (char: string) => ["+", "-", "×", "÷", "^", "%"].includes(char);

    const insertText = (insertedText: string) => {
        const start = selection.start;
        const end = selection.end;
        const newText =
            text.substring(0, start) + insertedText + text.substring(end);
        setText(newText);
        const newCursorPos = start + insertedText.length;
        setSelection({ start: newCursorPos, end: newCursorPos });
    };

    const insertSymbol = (symText: string) => {
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

    const calBtnPress = (btn: calBtnsType) => {
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
                } catch {
                    setText("Math Error");
                    setSelection({ start: 0, end: 0 });
                }
            }
            return;
        }

        if (type === "brac" && txt === "( )") {
            const start = selection.start;
            const before = text.substring(0, start);
            const lastChar = before.charAt(before.length - 1);
            
            const openCountAtCursor = (before.match(/\(/g) || []).length;
            const closeCountAtCursor = (before.match(/\)/g) || []).length;
            const unmatchedCount = openCountAtCursor - closeCountAtCursor;
            
            const isLastCharOperand = 
                (lastChar >= "0" && lastChar <= "9") || 
                [")", "%", "π", "e", "!", "."].includes(lastChar);
                
            if (unmatchedCount > 0 && isLastCharOperand) {
                insertText(")");
            } else {
                insertText("(");
            }
        } else if (type === "num" || type === "brac") {
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

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    // Calculate unmatched parenthesis
    const openCount = (text || "").match(/\(/g) || [];
    const closeCount = (text || "").match(/\)/g) || [];
    const unmatchedBrackets = openCount.length - closeCount.length;

    const isDark = colors.backgroundColor === "#24292b";
    const keyboardBg = isDark ? colors.numPadBg : "#f1f5f9";

    // Premium dynamic button styling
    const getBtnStyle = (btn: calBtnsType) => {
        let bgColor = "transparent";
        let textColor = colors.text;

        if (btn.text === "=") {
            bgColor = colors.secondary;
            textColor = "#ffffff";
        } else if (btn.type === "num" || btn.text === ".") {
            bgColor = isDark ? "#2e3437" : "#ffffff";
            textColor = colors.text;
        } else if (btn.type === "clr" || btn.type === "ere" || btn.type === "brac") {
            bgColor = isDark ? "#1d2325" : "#cbd5e1";
            textColor = colors.secondary;
        } else if (btn.type === "sym") {
            bgColor = isDark ? "#1d2325" : "#e0e7ff";
            textColor = isDark ? "#818cf8" : "#4f46e5";
        } else if (btn.type === "tri" || btn.text === "!") {
            bgColor = isDark ? "#161b1c" : "#e2e8f0";
            textColor = isDark ? "#a5b4fc" : "#4f46e5";
        }

        return { bgColor, textColor };
    };

    // Calculate dimensions
    const keyboardAreaHeight = hp("60%");
    const utilityBarHeight = 44;
    const keypadHeight = keyboardAreaHeight - utilityBarHeight;

    const basicBtnHeight = (keypadHeight - 32) / 5;
    const sciBtnHeight = (keypadHeight - 40) / 7;

    const renderKeypad = (btnsList: calBtnsType[], rowSize: number, btnHeight: number) => {
        const rows = [];
        for (let i = 0; i < btnsList.length; i += rowSize) {
            rows.push(btnsList.slice(i, i + rowSize));
        }

        return rows.map((row, rowIndex) => (
            <View
                key={`row-${rowIndex}`}
                className="flex-row justify-between w-full"
            >
                {row.map((btn, btnIndex) => {
                    const { bgColor, textColor } = getBtnStyle(btn);
                    const btnWidth = rowSize === 5 ? wp("17%") : wp("21.5%");

                    return (
                        <Pressable
                            key={`btn-${rowIndex}-${btnIndex}`}
                            onPress={() => {
                                if (btn.text === "!") {
                                    calBtnPress({ ...btn, type: "num" });
                                } else {
                                    calBtnPress(btn);
                                }
                            }}
                            className="items-center justify-center rounded-2xl"
                            style={{
                                width: btnWidth,
                                height: btnHeight,
                                backgroundColor: bgColor,
                                elevation: 2,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                            }}
                            android_ripple={{
                                color: textColor + "25",
                                borderless: false,
                            }}
                        >
                            <Text
                                className={
                                    (rowSize === 5 ? "text-[16px]" : "text-[22px]") + 
                                    (btn.type === "num" ? " font-normal" : " font-bold")
                                }
                                style={{
                                    color: textColor,
                                }}
                            >
                                {btn.text}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        ));
    };

    return (
        <View
            className="flex-1"
            style={{
                backgroundColor: colors.backgroundColor,
            }}
        >
            <View className="flex-1">
                <ThemeSwitch />
                <View className="absolute z-[99] right-[52px] top-2.5 w-7 h-6 justify-center items-center">
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
                                backgroundColor: colors.elevation.level2,
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
                                backgroundColor: colors.elevation.level2,
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
                
                {/* Display Screen */}
                <View 
                    className="flex-1 justify-between py-2.5 w-full"
                    style={{ 
                        backgroundColor: colors.calBg,
                    }}
                >
                    {/* Expression input */}
                    <TextInput
                        ref={inputRef}
                        className="flex-[2] w-full text-right pr-[60px] pl-[20px] pt-2.5 text-[32px]"
                        style={{
                            color: colors.text,
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
                    
                    {/* Answer output */}
                    <Pressable
                        className="flex-1 w-full"
                        onPress={() => {
                            if (ans) {
                                try {
                                    if (Clipboard && Clipboard.setString) {
                                        Clipboard.setString(ans);
                                        setSnackbarMessage(`Copied "${ans}" to clipboard!`);
                                    } else {
                                        setSnackbarMessage(`Result: ${ans}`);
                                    }
                                    setSnackbarVisible(true);
                                } catch {}
                            }
                        }}
                    >
                        <TextInput
                            pointerEvents="none"
                            className="flex-1 w-full text-right px-6 text-2xl"
                            style={{
                                color: colors.calAns,
                            }}
                            value={ans}
                            editable={false}
                        />
                    </Pressable>

                    {unmatchedBrackets > 0 && (
                        <View
                            className="absolute bottom-2 left-4 px-2 py-0.5 rounded-[10px]"
                            style={{
                                backgroundColor: colors.secondary + "20",
                            }}
                        >
                            <Text 
                                className="text-[11px] font-bold"
                                style={{ color: colors.secondary }}
                            >
                                {`(${unmatchedBrackets}`}
                            </Text>
                        </View>
                    )}
                </View>

                {showHistory ? (
                    <View
                        className="p-5 mt-0"
                        style={{
                            height: keyboardAreaHeight,
                            backgroundColor: keyboardBg,
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
                                            borderBottomWidth: 0.5,
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
                        style={{
                            height: keyboardAreaHeight,
                            backgroundColor: keyboardBg,
                        }}
                    >
                        {/* Keyboard Utility Bar */}
                        <View
                            className="flex-row items-center justify-between border-t w-full"
                            style={{
                                height: utilityBarHeight,
                                paddingHorizontal: wp("4%"),
                                borderTopWidth: 0.5,
                                borderColor: isDark ? colors.divider + "20" : "#cbd5e1",
                                backgroundColor: keyboardBg,
                            }}
                        >
                            <View className="flex-row gap-2.5">
                                <Pressable
                                    onPress={changeMode}
                                    className="px-3 py-1 rounded-[15px] justify-center items-center"
                                    style={{
                                        backgroundColor: isDark ? colors.secondary + "25" : "#ffe4e6",
                                    }}
                                >
                                    <Text
                                        className="text-[12px] font-bold uppercase"
                                        style={{
                                            color: isDark ? colors.secondary : "#e11d48",
                                        }}
                                    >
                                        {mode}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={toggleScientificMode}
                                    className="px-3 py-1 rounded-[15px] justify-center items-center"
                                    style={{
                                        backgroundColor: isDark ? "#6366f125" : "#e0e7ff",
                                    }}
                                >
                                    <Text
                                        className="text-[12px] font-bold"
                                        style={{
                                            color: isDark ? "#a5b4fc" : "#4f46e5",
                                        }}
                                    >
                                        {isScientific ? "123" : "fx"}
                                    </Text>
                                </Pressable>
                            </View>

                            {/* Right Controls: Cursor movements & Copy */}
                            <View 
                                className="flex-row items-center"
                                style={{ gap: wp("4%") }}
                            >
                                <Pressable
                                    onPress={() => {
                                        const newPos = Math.max(0, selection.start - 1);
                                        setSelection({ start: newPos, end: newPos });
                                        setTimeout(() => inputRef.current?.focus(), 50);
                                    }}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                    })}
                                    className="p-1.5"
                                >
                                    <MaterialIcons
                                        name="chevron-left"
                                        size={22}
                                        color={colors.text}
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() => {
                                        const newPos = Math.min(text.length, selection.start + 1);
                                        setSelection({ start: newPos, end: newPos });
                                        setTimeout(() => inputRef.current?.focus(), 50);
                                    }}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                    })}
                                    className="p-1.5"
                                >
                                    <MaterialIcons
                                        name="chevron-right"
                                        size={22}
                                        color={colors.text}
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() => {
                                        const valToCopy = ans ? ans : text;
                                        if (valToCopy) {
                                            try {
                                                if (Clipboard && Clipboard.setString) {
                                                    Clipboard.setString(valToCopy);
                                                    setSnackbarMessage(`Copied "${valToCopy}" to clipboard!`);
                                                } else {
                                                    setSnackbarMessage(`Result: ${valToCopy}`);
                                                }
                                                setSnackbarVisible(true);
                                            } catch {
                                                setSnackbarMessage("Copy not supported");
                                                setSnackbarVisible(true);
                                            }
                                        }
                                    }}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                    })}
                                    className="p-1.5"
                                >
                                    <MaterialIcons
                                        name="content-copy"
                                        size={20}
                                        color={colors.secondary}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        {/* Keyboard Button Grid */}
                        <View
                            className="mt-0"
                            style={{
                                height: keypadHeight,
                                backgroundColor: keyboardBg,
                                position: "relative",
                            }}
                        >
                            {!isScientific ? (
                                <Animated.View
                                    key="basic-keypad"
                                    entering={FadeIn.duration(200)}
                                    exiting={FadeOut.duration(200)}
                                    className="justify-between px-4 py-2 w-full h-full absolute"
                                    style={{ left: 0, top: 0, right: 0, bottom: 0 }}
                                >
                                    {renderKeypad(basicBtns, 4, basicBtnHeight)}
                                </Animated.View>
                            ) : (
                                <Animated.View
                                    key="scientific-keypad"
                                    entering={FadeIn.duration(200)}
                                    exiting={FadeOut.duration(200)}
                                    className="justify-between px-4 py-2 w-full h-full absolute"
                                    style={{ left: 0, top: 0, right: 0, bottom: 0 }}
                                >
                                    {renderKeypad(calBtns, 5, sciBtnHeight)}
                                </Animated.View>
                            )}
                        </View>
                    </View>
                )}
            </View>

            {/* Notification Toast */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
                style={{
                    backgroundColor: colors.elevation.level2 || "#323232",
                    borderRadius: 8,
                }}
                action={{
                    label: "OK",
                    onPress: () => setSnackbarVisible(false),
                    textColor: colors.primary,
                }}
            >
                <Text 
                    className="text-[14px]"
                    style={{ color: colors.text }}
                >
                    {snackbarMessage}
                </Text>
            </Snackbar>
        </View>
    );
};

export default One;
