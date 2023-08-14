import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text, RadioButton, Menu, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";

const SurfaceArea = () => {
    const { colors } = useTheme();
    const emptyInputs = {
        side: "",
        length: "",
        breath: "",
        height: "",
        radious: "",
        s1: "",
        s2: "",
        s3: "",
        major: "",
        minor: "",
    };
    const androidRipple = {
        color: colors.secondary + "80",
        radius: 150,
        borderless: false,
    };
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({
        label: "Cube",
        value: 1,
        speacial: false,
        field: ["side"],
    });
    const [isHollow, setIsHollow] = useState(0);
    const [input, setInput] = useState(emptyInputs);
    const [answer, setAnswer] = useState("");
    const [greater, setGreater] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const btns = [
        { label: "Cube", speacial: 0, field: ["side"] },
        { label: "Cuboid", speacial: 0, field: ["length", "breath", "height"] },
        { label: "Sphere", speacial: 0, field: ["radious"] },
        { label: "Hemisphere", speacial: 1, field: ["radious"] },
        { label: "Cylinder", speacial: 1, field: ["radious", "height"] },
        { label: "Cone", speacial: 1, field: ["radious", "height"] },
        { label: "Circle", speacial: 0, field: ["radious"] },
        { label: "Square", speacial: 0, field: ["side"] },
        { label: "Rectangle", speacial: 0, field: ["length", "breath"] },
        { label: "Triangle", speacial: 0, field: ["s1", "s2", "s3"] },
        { label: "Ellipse", speacial: 0, field: ["major", "minor"] },
    ];

    const fixed = (number) => {
        let num = number.toFixed(4);
        num = parseFloat(num);
        let decimalPart = number.toString().split(".");
        if (decimalPart.length > 1) {
            if (decimalPart[1] > 4) setGreater(true);
        }
        return num;
    };

    const checkTriangle = (s1, s2, s3) => {
        if (s1 + s2 > s3 && s2 + s3 > s1 && s3 + s1 > s2) return true;
        else return false;
    };

    const calculate = () => {
        if (selected.value === 1) {
            let side = parseFloat(input.side);
            if (!isNaN(side)) {
                let area = 6 * side * side;
                setAnswer(fixed(area));
            }
        } else if (selected.value === 2) {
            let l = parseFloat(input.length);
            let b = parseFloat(input.breath);
            let h = parseFloat(input.height);
            if (!isNaN(l) && !isNaN(b) && !isNaN(h)) {
                let area = 2 * (l * b + b * h + h * l);
                setAnswer(fixed(area));
            }
        } else if (selected.value === 3) {
            let r = parseFloat(input.radious);
            if (!isNaN(r)) {
                let area = 4 * Math.PI * r * r;
                setAnswer(fixed(area));
            }
        } else if (selected.value === 4) {
            let r = parseFloat(input.radious);
            if (!isNaN(r)) {
                let area;
                if (isHollow) {
                    area = 2 * Math.PI * r * r;
                } else {
                    area = 3 * Math.PI * r * r;
                }
                setAnswer(fixed(area));
            }
        } else if (selected.value === 5) {
            let r = parseFloat(input.radious);
            let h = parseFloat(input.height);
            if (!isNaN(r) && !isNaN(h)) {
                let area;
                if (isHollow) {
                    area = 2 * Math.PI * r * h;
                } else {
                    area = 2 * Math.PI * r * (h + r);
                }
                setAnswer(fixed(area));
            }
        } else if (selected.value === 6) {
            let r = parseFloat(input.radious);
            let h = parseFloat(input.height);
            if (!isNaN(r) && !isNaN(h)) {
                let area;
                if (isHollow) {
                    area = Math.PI * r * Math.sqrt(h * h + r * r);
                } else {
                    area = Math.PI * r * (r + Math.sqrt(h * h + r * r));
                }
                setAnswer(fixed(area));
            }
        } else if (selected.value === 7) {
            let r = parseFloat(input.radious);
            if (!isNaN(r)) {
                let area = Math.PI * r * r;
                setAnswer(fixed(area));
            }
        } else if (selected.value === 8) {
            let side = parseFloat(input.side);
            if (!isNaN(side)) {
                let area = side * side;
                setAnswer(fixed(area));
            }
        } else if (selected.value === 9) {
            let l = parseFloat(input.length);
            let b = parseFloat(input.breath);
            if (!isNaN(l) && !isNaN(b)) {
                let area = l * b;
                setAnswer(fixed(area));
            }
        } else if (selected.value === 10) {
            let s1 = parseFloat(input.s1);
            let s2 = parseFloat(input.s2);
            let s3 = parseFloat(input.s3);
            if (!isNaN(s1) && !isNaN(s2) && !isNaN(s3)) {
                if (checkTriangle(s1, s2, s3)) {
                    let s = (s1 + s2 + s3) / 2;
                    let asq = s * (s - s1) * (s - s2) * (s - s3);
                    let area = Math.sqrt(asq);
                    setAnswer(fixed(area));
                }
            }
        } else if (selected.value === 11) {
            let minor = parseFloat(input.minor);
            let major = parseFloat(input.major);
            if (!isNaN(minor) && !isNaN(major)) {
                let area = Math.PI * major * minor;
                setAnswer(fixed(area));
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.menu}>
                <Text style={{ color: colors.text, fontSize: 16 }}>
                    Shape{"   "}={"   "}
                </Text>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Pressable
                            style={[
                                styles.menuHandle,
                                { borderColor: colors.secondary },
                            ]}
                            onPress={openMenu}
                            android_ripple={androidRipple}
                        >
                            <View style={styles.openBtn}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colors.text,
                                        padding: 10,
                                        textAlign: "center",
                                    }}
                                >
                                    {selected.label}
                                </Text>
                                <AntDesign
                                    name="caretdown"
                                    size={14}
                                    color={colors.secondary + "f0"}
                                />
                            </View>
                        </Pressable>
                    }
                >
                    {btns.map((btn, i) => (
                        <Menu.Item
                            key={i}
                            onPress={() => {
                                closeMenu();
                                setSelected(btn);
                                setInput(emptyInputs);
                                setAnswer("");
                            }}
                            title={btn.label}
                            titleStyle={{ color: colors.text }}
                        />
                    ))}
                </Menu>
            </View>
            {selected.speacial && (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ fontSize: 16, color: colors.text }}>
                        Is hollow ?
                    </Text>
                    <RadioButton.Group
                        value={isHollow}
                        onValueChange={(val) => {
                            setIsHollow(val);
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <RadioButton.Item
                                label="Yes"
                                value={1}
                                labelStyle={{
                                    color: colors.secondary,
                                    fontSize: 13,
                                    textAlign: "left",
                                }}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                position="leading"
                            />
                            <RadioButton.Item
                                label="No"
                                value={0}
                                labelStyle={{
                                    color: colors.secondary,
                                    fontSize: 13,
                                    textAlign: "left",
                                }}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                position="leading"
                            />
                        </View>
                    </RadioButton.Group>
                </View>
            )}
            <View>
                {selected.field.map((field, i) => (
                    <View
                        key={i}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.text,
                                textTransform: "capitalize",
                            }}
                        >
                            {field} ={" "}
                        </Text>
                        <CustomInput
                            width={90}
                            value={input[field]}
                            onChangeText={(e) => {
                                setInput({ ...input, [field]: e });
                            }}
                            placeholder={field}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => calculate()}
                    buttonColor={colors.secondary}
                    textColor={"white"}
                >
                    Calculate
                </Button>
            </View>
            {answer.toString().length > 0 && (
                <View style={styles.ans}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Area {greater ? "≈" : "="}{" "}
                    </Text>
                    <Text style={{ color: colors.secondary, fontSize: 30 }}>
                        {answer}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default SurfaceArea;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    menu: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        flexDirection: "row",
    },
    menuHandle: {
        borderWidth: 1,
        width: 150,
        borderRadius: 7,
        paddingRight: 10,
        overflow: "hidden",
    },
    openBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ans: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
});
