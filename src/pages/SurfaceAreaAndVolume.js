import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { useTheme, Text, RadioButton, Menu, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import { areaAndVolume } from "../helpers/functions";

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
    const [answer, setAnswer] = useState({ area: "", volume: "" });
    const [greater, setGreater] = useState({ area: false, volume: false });

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const btns = [
        {
            label: "Cube",
            speacial: false,
            field: ["side"],
            value: 1,
        },
        {
            label: "Cuboid",
            speacial: false,
            field: ["length", "breath", "height"],
            value: 2,
        },
        {
            label: "Sphere",
            speacial: false,
            field: ["radious"],
            value: 3,
        },
        {
            label: "Hemisphere",
            speacial: true,
            field: ["radious"],
            value: 4,
        },
        {
            label: "Cylinder",
            speacial: true,
            field: ["radious", "height"],
            value: 5,
        },
        {
            label: "Cone",
            speacial: true,
            field: ["radious", "height"],
            value: 6,
        },
        {
            label: "Circle",
            speacial: false,
            field: ["radious"],
            value: 7,
        },
        {
            label: "Square",
            speacial: false,
            field: ["side"],
            value: 8,
        },
        {
            label: "Rectangle",
            speacial: false,
            field: ["length", "breath"],
            value: 9,
        },
        {
            label: "Triangle",
            speacial: false,
            field: ["s1", "s2", "s3"],
            value: 10,
        },
        {
            label: "Ellipse",
            speacial: false,
            field: ["major", "minor"],
            value: 11,
        },
    ];

    const calculate = () => {
        const ans = areaAndVolume({
            ...input,
            value: selected.value,
            isHollow: selected.isHollow,
        });
        setAnswer({ area: ans.area.ans, volume: ans.volume.ans });
        setGreater({ area: ans.area.isGreater, volume: ans.volume.isGreater });
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
                                setAnswer({ area: "", volume: "" });
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
            {answer.area && answer.area.toString().length > 0 && (
                <View style={styles.ans}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Area {greater.area ? "≈" : "="}{" "}
                    </Text>
                    <Text style={{ color: colors.secondary, fontSize: 30 }}>
                        {answer.area}
                    </Text>
                </View>
            )}
            {answer.volume && answer.volume.toString().length > 0 && (
                <View style={styles.ans}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Volume {greater.volume ? "≈" : "="}{" "}
                    </Text>
                    <Text style={{ color: colors.secondary, fontSize: 30 }}>
                        {answer.volume}
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
