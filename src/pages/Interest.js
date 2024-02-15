import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useState } from "react";
import { Button, Menu, useTheme } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomInput from "../components/CustomInput";
import { Fraction } from "./UsefulFormulas";
import { parseNumber } from "../helpers/functions";

const CompoundInterest = ({
    size,
    color,
    textVisible,
    data = {},
    style = {},
}) => {
    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginTop: 5,
                },
                style,
            ]}>
            {textVisible ? (
                <Text style={{ fontSize: size, color }}>{data.text}</Text>
            ) : (
                <Text style={{ fontSize: size, color: "transparent" }}>
                    {data.text}
                </Text>
            )}
            <Text style={{ fontSize: size, color }}>{" = "}</Text>
            <Text style={{ fontSize: size, color }}>{data.firstPart} × </Text>
            {Boolean(data.secondPart.denominator) && (
                <Image
                    source={require("../../assets/open.png")}
                    style={{
                        height: 50,
                        width: 9,
                        marginRight: 3,
                        tintColor: color,
                    }}
                />
            )}
            {!Boolean(data.secondPart.denominator) &&
                (Boolean(data.secondPart.numerator) ||
                    data.secondPart.numerator == 0) && (
                    <Text style={{ fontSize: size, color }}>(</Text>
                )}
            <Text style={{ fontSize: size, color }}>
                {data.secondPart.firstPart}
            </Text>
            {(Boolean(data.secondPart.numerator) ||
                data.secondPart.numerator == 0) && (
                <Text style={{ fontSize: size, color }}> + </Text>
            )}
            {(Boolean(data.secondPart.numerator) ||
                data.secondPart.numerator == 0) && (
                <View>
                    <Text
                        style={{ fontSize: size, color, textAlign: "center" }}>
                        {data.secondPart.numerator || "0"}
                    </Text>
                    {Boolean(data.secondPart.denominator) && (
                        <>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: color,
                                    marginVertical: 2,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: size,
                                    color,
                                    textAlign: "center",
                                }}>
                                {data.secondPart.denominator}
                            </Text>
                        </>
                    )}
                </View>
            )}
            {Boolean(data.secondPart.denominator) &&
                Boolean(data.secondPart.numerator) && (
                    <Image
                        source={require("../../assets/close.png")}
                        style={{
                            height: 50,
                            width: 9,
                            marginLeft: 3,
                            tintColor: color,
                        }}
                    />
                )}
            {!Boolean(data.secondPart.denominator) &&
                (Boolean(data.secondPart.numerator) ||
                    data.secondPart.numerator == 0) && (
                    <Text style={{ fontSize: size, color }}>)</Text>
                )}
            <View>
                <Text style={{ fontSize: size - 5, color }}>
                    {" " + data.power}
                </Text>
                {Boolean(data.secondPart.denominator) ? (
                    <>
                        <Text style={{ fontSize: size / 2, color }}></Text>
                        <Text style={{ fontSize: size / 2, color }}></Text>
                        <Text style={{ fontSize: size / 2, color }}></Text>
                    </>
                ) : (
                    <Text style={{ fontSize: size / 2, color }}></Text>
                )}
            </View>
        </View>
    );
};

const Interest = () => {
    const { colors } = useTheme();

    const androidRipple = {
        color: colors.secondary + "80",
        radius: 150,
        borderless: false,
    };
    const [visible, setVisible] = useState({ 1: false, 2: false });
    const options = [
        { label: "Simple Interest", value: "SI" },
        { label: "Compound Interest", value: "CI" },
    ];
    const [selected, setSelected] = useState(options[0]);
    const types = [
        { label: "Annually", n: 1 },
        { label: "Half Yearly", n: 2 },
        { label: "Quarterly", n: 4 },
        { label: "Monthly", n: 12 },
        { label: "Weekly", n: 52 },
        { label: "Daily", n: 365 },
    ];
    const [compounded, setCompounded] = useState(types[0]);
    const openMenu = (menu) => {
        setVisible((prev) => ({ ...prev, [menu]: true }));
    };
    const [input, setInput] = useState({
        P: "",
        R: "",
        T: "",
        p: 0,
        r: 0,
        t: 0,
    });
    const [ans, setAns] = useState({});
    const closeMenu = () => setVisible({ 1: false, 2: false });

    const Calculate = () => {
        if (input.P === "" || input.R === "" || input.T === "") return;
        const p = parseFloat(input.P);
        const r = parseFloat(input.R);
        const t = parseFloat(input.T);
        if (isNaN(p) || isNaN(r) || isNaN(t)) return;
        if (selected.value === "SI") {
            let si = (p * r * t) / 100;
            si = parseNumber(si, 2);
            setAns({ si });
        } else {
            let ci;
            if (compounded.label === "Annually") {
                ci = p * Math.pow(1 + r / 100, t);
            } else if (compounded.label === "Half Yearly") {
                ci = p * Math.pow(1 + r / 200, 2 * t);
            } else if (compounded.label === "Quarterly") {
                ci = p * Math.pow(1 + r / 400, 4 * t);
            } else if (compounded.label === "Monthly") {
                ci = p * Math.pow(1 + r / 1200, 12 * t);
            } else if (compounded.label === "Weekly") {
                ci = p * Math.pow(1 + r / 5200, 52 * t);
            } else if (compounded.label === "Daily") {
                ci = p * Math.pow(1 + r / 36500, 365 * t);
            }
            ci = parseNumber(ci, 2);
            setAns({ ci, n: compounded.n });
        }
        setInput((prev) => ({ ...prev, p, r, t }));
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.backgroundColor,
        },
        menuHandle: {
            borderWidth: 1,
            width: 180,
            borderRadius: 7,
            paddingRight: 10,
            overflow: "hidden",
            borderColor: colors.secondary,
        },
        openBtn: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        flexRow: {
            flexDirection: "row",
            alignItems: "center",
        },
        selectedText: {
            fontSize: 16,
            color: colors.text,
            padding: 10,
            textAlign: "center",
        },
        inputContainer: {
            marginTop: 15,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
        },
        buttonContainer: {
            alignItems: "center",
            marginVertical: 25,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <Text style={{ color: colors.text, fontSize: 18 }}>
                    Interest type{"  "}:{"  "}
                </Text>
                <Menu
                    visible={visible[1]}
                    onDismiss={() => closeMenu()}
                    anchor={
                        <Pressable
                            style={styles.menuHandle}
                            onPress={() => openMenu("1")}
                            android_ripple={androidRipple}>
                            <View style={styles.openBtn}>
                                <Text style={styles.selectedText}>
                                    {selected.label}
                                </Text>
                                <AntDesign
                                    name="caretdown"
                                    size={14}
                                    color={colors.secondary + "f0"}
                                />
                            </View>
                        </Pressable>
                    }>
                    {options.map((item, index) => (
                        <Menu.Item
                            key={index}
                            onPress={() => {
                                setSelected(item);
                                closeMenu();
                            }}
                            title={item.label}
                            titleStyle={{ color: colors.text }}
                        />
                    ))}
                </Menu>
            </View>
            <View style={styles.inputContainer}>
                <View style={{ justifyContent: "space-between", height: 150 }}>
                    <Text style={{ color: colors.text, fontSize: 18 }}>
                        Principal
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 18 }}>
                        Rate %
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 18 }}>
                        Time (Years)
                    </Text>
                </View>
                <View style={{ justifyContent: "space-between", height: 170 }}>
                    <CustomInput
                        placeholder="Principal"
                        value={input.P}
                        onChangeText={(e) => {
                            setInput((prev) => {
                                return { ...prev, P: e };
                            });
                        }}
                        maxLength={8}
                    />
                    <CustomInput
                        placeholder="Rate %"
                        value={input.R}
                        onChangeText={(e) => {
                            setInput((prev) => {
                                return { ...prev, R: e };
                            });
                        }}
                        maxLength={5}
                    />
                    <CustomInput
                        placeholder="Time"
                        value={input.T}
                        onChangeText={(e) => {
                            setInput((prev) => {
                                return { ...prev, T: e };
                            });
                        }}
                        maxLength={5}
                    />
                </View>
            </View>
            {selected.value === "CI" && (
                <View style={[styles.flexRow, { marginTop: 15 }]}>
                    <Text style={{ color: colors.text, fontSize: 18 }}>
                        Compounded{"   "}
                    </Text>
                    <Menu
                        visible={visible[2]}
                        onDismiss={closeMenu}
                        anchor={
                            <Pressable
                                style={styles.menuHandle}
                                onPress={() => openMenu("2")}
                                android_ripple={androidRipple}>
                                <View style={styles.openBtn}>
                                    <Text style={styles.selectedText}>
                                        {compounded.label}
                                    </Text>
                                    <AntDesign
                                        name="caretdown"
                                        size={14}
                                        color={colors.secondary + "f0"}
                                    />
                                </View>
                            </Pressable>
                        }>
                        {types.map((item, index) => (
                            <Menu.Item
                                key={item.label}
                                onPress={() => {
                                    setCompounded(item);
                                    closeMenu();
                                }}
                                title={item.label}
                                titleStyle={{ color: colors.text }}
                            />
                        ))}
                    </Menu>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={Calculate}
                    buttonColor={colors.secondary}
                    textColor="#fff">
                    Calculate
                </Button>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {selected.value === "SI" && ans.si && (
                    <>
                        <Fraction
                            color={colors.text}
                            size={16}
                            bullet={false}
                            data={{
                                text: "SI",
                                numerator: "P × R × T",
                                denominator: "100",
                            }}
                        />
                        <Fraction
                            color={colors.text}
                            size={16}
                            bullet={false}
                            data={{
                                text: "SI",
                                numerator: `${input.p} × ${input.r} × ${input.t}`,
                                denominator: "100",
                            }}
                            textVisible={false}
                        />
                        <Fraction
                            color={colors.text}
                            size={16}
                            bullet={false}
                            data={{
                                text: "SI",
                                numerator: `${input.p * input.r * input.t}`,
                                denominator: "100",
                            }}
                            textVisible={false}
                        />
                        <Fraction
                            color={colors.text}
                            size={16}
                            bullet={false}
                            data={{
                                text: "SI",
                                numerator: ans.si ? ans.si : "0",
                            }}
                            textVisible={false}
                        />
                    </>
                )}
                {selected.value === "CI" && ans.ci && (
                    <>
                        <Fraction
                            color={colors.text}
                            size={18}
                            bullet={false}
                            data={{
                                text: "N",
                                numerator: ans.n,
                            }}
                            style={{ marginVertical: 20 }}
                        />
                        <CompoundInterest
                            size={18}
                            color={colors.text}
                            textVisible={true}
                            data={{
                                text: "A",
                                firstPart: "P",
                                secondPart: {
                                    firstPart: "1",
                                    numerator: "R",
                                    denominator: ans.n == 1 ? "100" : "100 × N",
                                },
                                power: ans.n == 1 ? "T" : `N × T`,
                                prinsipal: "P",
                            }}
                        />
                        <CompoundInterest
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            data={{
                                text: "A",
                                firstPart: input.p,
                                secondPart: {
                                    firstPart: "1",
                                    numerator: input.r,
                                    denominator:
                                        ans.n == 1 ? "" : `100 × ${ans.n}`,
                                },
                                power:
                                    ans.n == 1 ? "T" : `${ans.n} × ${input.t}`,
                                prinsipal: input.p,
                            }}
                        />
                        <CompoundInterest
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            data={{
                                text: "A",
                                firstPart: input.p,
                                secondPart: {
                                    firstPart: "1",
                                    numerator: input.r,
                                    denominator:
                                        ans.n == 1
                                            ? ""
                                            : parseNumber(100 * ans.n),
                                },
                                power: parseNumber(ans.n * input.t, 2),
                                prinsipal: input.p,
                            }}
                        />
                        <CompoundInterest
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            data={{
                                text: "A",
                                firstPart: input.p,
                                secondPart: {
                                    firstPart: "1",
                                    numerator: parseNumber(
                                        input.r / (100 * ans.n)
                                    ),
                                },
                                power: parseNumber(ans.n * input.t, 2),
                                prinsipal: input.p,
                            }}
                        />
                        <CompoundInterest
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            data={{
                                text: "A",
                                firstPart: input.p,
                                secondPart: {
                                    firstPart: parseNumber(
                                        1 + input.r / (100 * ans.n)
                                    ),
                                },
                                power: parseNumber(ans.n * input.t, 2),
                                prinsipal: input.p,
                            }}
                        />
                        <Fraction
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            bullet={false}
                            data={{
                                text: "A",
                                numerator:
                                    `${input.p} × ` +
                                    parseNumber(
                                        Math.pow(
                                            1 + input.r / (100 * ans.n),
                                            ans.n * input.t
                                        )
                                    ),
                            }}
                        />
                        <Fraction
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            bullet={false}
                            data={{
                                text: "A",
                                numerator: ans.ci,
                            }}
                        />
                        <Fraction
                            size={18}
                            color={colors.text}
                            // textVisible={false}
                            bullet={false}
                            data={{
                                text: "CI",
                                numerator: `A - P`,
                            }}
                            style={{ marginTop: 20 }}
                        />
                        <Fraction
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            bullet={false}
                            data={{
                                text: "CI",
                                numerator: `${ans.ci} - ${input.p}`,
                            }}
                        />
                        <Fraction
                            size={18}
                            color={colors.text}
                            textVisible={false}
                            bullet={false}
                            data={{
                                text: "CI",
                                numerator: parseNumber(ans.ci - input.p),
                            }}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default Interest;
