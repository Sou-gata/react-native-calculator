import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import allStylesLight, { colorWhite } from "../allStylesLight";
import allStyleDark, { colorDark } from "../allStylesDark";
let styles = allStyleDark;
let color = colorDark;

const WaightConverter = () => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    color = theme.mode == "dark" ? colorDark : colorWhite;
    const [kg, setKg] = useState("");
    const [gm, setGm] = useState("");
    const [lb, setLb] = useState("");
    const [ounce, setOunce] = useState("");

    return (
        <View style={styles.main}>
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        height: 300,
                    },
                ]}
            >
                <View
                    style={{
                        justifyContent: "space-around",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Killogram
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Gram
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Pound
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Ounce
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            setKg(e);
                            if (e != "") {
                                setGm(
                                    parseFloat(
                                        (parseFloat(e) * 1000).toFixed(4)
                                    )
                                );
                                setLb(
                                    parseFloat(
                                        (parseFloat(e) * 2.20462).toFixed(4)
                                    )
                                );
                                setOunce(
                                    parseFloat(
                                        (parseFloat(e) * 35.274).toFixed(4)
                                    )
                                );
                            } else if (e == "") {
                                setGm("");
                                setLb("");
                                setOunce("");
                            }
                        }}
                        value={kg.toString()}
                        placeholder="kg"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            setGm(e);
                            if (e != "") {
                                setKg(
                                    parseFloat(
                                        (parseFloat(e) * 0.001).toFixed(4)
                                    )
                                );
                                setLb(
                                    parseFloat(
                                        (parseFloat(e) / 453.6).toFixed(4)
                                    )
                                );
                                setOunce(
                                    parseFloat(
                                        (parseFloat(e) * 0.035274).toFixed(4)
                                    )
                                );
                            } else if (e == "") {
                                setKg("");
                                setLb("");
                                setOunce("");
                            }
                        }}
                        value={gm.toString()}
                        placeholder="gm"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                setKg(
                                    parseFloat(
                                        (parseFloat(e) / 2.20462).toFixed(4)
                                    )
                                );
                                setGm(
                                    parseFloat(
                                        (
                                            (parseFloat(e) * 1000) /
                                            2.20462
                                        ).toFixed(4)
                                    )
                                );
                                setOunce(
                                    parseFloat((parseFloat(e) * 16).toFixed(4))
                                );
                            } else if (e == "") {
                                setKg("");
                                setGm("");
                                setOunce("");
                            }
                            setLb(e);
                        }}
                        value={lb.toString()}
                        placeholder="lb"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                setKg(
                                    parseFloat(
                                        (parseFloat(e) / 35.274).toFixed(4)
                                    )
                                );
                                setGm(
                                    parseFloat(
                                        (
                                            (parseFloat(e) * 1000) /
                                            35.274
                                        ).toFixed(4)
                                    )
                                );
                                setLb(
                                    parseFloat((parseFloat(e) / 16).toFixed(4))
                                );
                            } else if (e == "") {
                                setKg("");
                                setGm("");
                                setLb("");
                            }
                            setOunce(e);
                        }}
                        value={ounce.toString()}
                        placeholder="ounce"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

export default WaightConverter;
