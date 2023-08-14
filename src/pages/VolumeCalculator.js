import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Text, RadioButton, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";

const VolumeCalculator = () => {
    const { colors } = useTheme();
    const emptyInputs = {
        side: "",
        length: "",
        breath: "",
        height: "",
        radious: "",
    };
    const [value, setValue] = useState(1);
    const [input, setInput] = useState(emptyInputs);
    const [ans, setAns] = useState("");
    const [greater, setGreater] = useState(false);
    const btns = ["Cube", "Cuboid", "Sphere", "Hemisphere", "Cylinder", "Cone"];

    const fixed = (number) => {
        let num = number.toFixed(4);
        num = parseFloat(num);
        let decimalPart = number.toString().split(".");
        if (decimalPart.length > 1) {
            if (decimalPart[1] > 4) setGreater(true);
        }
        return num;
    };

    const calculate = () => {
        if (value === 1) {
            let side = parseFloat(input.side);
            if (!isNaN(side)) {
                let volume = side * side * side;
                setAns(fixed(volume));
            }
        } else if (value === 2) {
            let l = parseFloat(input.length);
            let b = parseFloat(input.breath);
            let h = parseFloat(input.height);
            if (!isNaN(l) && !isNaN(b) && !isNaN(h)) {
                let volume = input.length * input.breath * input.height;
                setAns(fixed(volume));
            }
        } else if (value === 3) {
            let r = parseFloat(input.radious);
            if (!isNaN(r)) {
                let volume = (4 / 3) * Math.PI * r * r * r;
                setAns(fixed(volume));
            }
        } else if (value === 4) {
            let r = parseFloat(input.radious);
            if (!isNaN(r)) {
                let volume = (2 / 3) * Math.PI * r * r * r;
                setAns(fixed(volume));
            }
        } else if (value === 5) {
            let r = parseFloat(input.radious);
            let h = parseFloat(input.height);
            if (!isNaN(r) && !isNaN(h)) {
                let volume = Math.PI * r * r * h;
                setAns(fixed(volume));
            }
        } else if (value === 6) {
            let r = parseFloat(input.radious);
            let h = parseFloat(input.height);
            if (!isNaN(r) && !isNaN(h)) {
                let volume = (1 / 3) * Math.PI * r * r * h;
                setAns(fixed(volume));
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View>
                <RadioButton.Group
                    onValueChange={(val) => {
                        setValue(val);
                        setInput(emptyInputs);
                        setAns("");
                    }}
                    value={value}
                >
                    <View style={styles.radioBtnGroup}>
                        {btns.map((radio, index) => (
                            <RadioButton.Item
                                key={index}
                                label={radio}
                                value={index + 1}
                                labelStyle={{
                                    color: colors.secondary,
                                    fontSize: 13,
                                    textAlign: "left",
                                }}
                                uncheckedColor={colors.secondary}
                                color={colors.secondary}
                                position="leading"
                            />
                        ))}
                    </View>
                </RadioButton.Group>
            </View>
            <View>
                {value === 1 && (
                    <View style={styles.cube}>
                        <Text style={{ fontSize: 20, color: colors.text }}>
                            Side ={" "}
                        </Text>
                        <CustomInput
                            placeholder="a"
                            width={90}
                            value={input.side}
                            onChangeText={(e) => {
                                setInput({ ...input, side: e });
                            }}
                        />
                    </View>
                )}
                {value === 2 && (
                    <View style={styles.cuboid}>
                        <View style={styles.cube}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Length ={" "}
                            </Text>
                            <CustomInput
                                placeholder="L"
                                width={90}
                                value={input.length}
                                onChangeText={(e) => {
                                    setInput({ ...input, length: e });
                                }}
                            />
                        </View>
                        <View style={styles.cube}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Breath ={" "}
                            </Text>
                            <CustomInput
                                placeholder="B"
                                width={90}
                                value={input.breath}
                                onChangeText={(e) => {
                                    setInput({ ...input, breath: e });
                                }}
                            />
                        </View>
                        <View style={styles.cube}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Height ={" "}
                            </Text>
                            <CustomInput
                                placeholder="H"
                                width={90}
                                value={input.height}
                                onChangeText={(e) => {
                                    setInput({ ...input, height: e });
                                }}
                            />
                        </View>
                    </View>
                )}
                {(value === 3 || value == 4) && (
                    <View style={styles.cube}>
                        <Text style={{ fontSize: 20, color: colors.text }}>
                            Radious ={" "}
                        </Text>
                        <CustomInput
                            placeholder="r"
                            width={90}
                            value={input.radious}
                            onChangeText={(e) => {
                                setInput({ ...input, radious: e });
                            }}
                        />
                    </View>
                )}
                {(value === 5 || value == 6) && (
                    <View style={styles.cuboid}>
                        <View style={styles.cube}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Radious ={" "}
                            </Text>
                            <CustomInput
                                placeholder="r"
                                width={90}
                                value={input.radious}
                                onChangeText={(e) => {
                                    setInput({ ...input, radious: e });
                                }}
                            />
                        </View>
                        <View style={[styles.cube, { marginLeft: 15 }]}>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                Height ={" "}
                            </Text>
                            <CustomInput
                                placeholder="h"
                                width={90}
                                value={input.height}
                                onChangeText={(e) => {
                                    setInput({ ...input, height: e });
                                }}
                            />
                        </View>
                    </View>
                )}
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
            {ans.toString().length > 0 && (
                <View style={styles.ans}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Volume {greater ? "≈" : "="}{" "}
                    </Text>
                    <Text style={{ color: colors.secondary, fontSize: 30 }}>
                        {ans}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default VolumeCalculator;

const styles = StyleSheet.create({
    radioBtnGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20,
    },
    cube: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        justifyContent: "center",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    ans: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
});
