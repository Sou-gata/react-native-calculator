import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

import {
    celToFar,
    celToKal,
    celToRan,
    farToCel,
    farToKal,
    farToRan,
    kalToCal,
    kalToFar,
    kalToRan,
    ranToCel,
    ranToFar,
    ranToKal,
} from "../helpers/functions";
import ThemeSelector from "../helpers/ThemeSelector";

const TemperatureConverter = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const [cel, setCel] = useState("");
    const [kal, setKal] = useState("");
    const [far, setFar] = useState("");
    const [ran, setRan] = useState("");

    const setAns = (setFun, value) => {
        let val = isNaN(value) ? "" : value;
        setFun(val);
    };

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
                        Celsius
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Fahrenheit
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Kelvin
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Rankine
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            setCel(e);
                            if (e != "") {
                                let c = parseFloat(e);
                                setAns(setFar, celToFar(c));
                                setAns(setKal, celToKal(c));
                                setAns(setRan, celToRan(c));
                            } else if (e == "") {
                                setFar("");
                                setKal("");
                                setRan("");
                            }
                        }}
                        value={cel.toString()}
                        placeholder="Celsius"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            setFar(e);
                            if (e != "") {
                                let f = parseFloat(e);
                                setAns(setCel, farToCel(f));
                                setAns(setKal, farToKal(f));
                                setAns(setRan, farToRan(f));
                            } else if (e == "") {
                                setCel("");
                                setKal("");
                                setRan("");
                            }
                        }}
                        value={far.toString()}
                        placeholder="Fahrenheit"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            setKal(e);
                            if (e != "") {
                                let k = parseFloat(e);
                                setAns(setCel, kalToCal(k));
                                setAns(setFar, kalToFar(k));
                                setAns(setRan, kalToRan(k));
                            } else if (e == "") {
                                setCel("");
                                setFar("");
                                setRan("");
                            }
                        }}
                        value={kal.toString()}
                        placeholder="Kelvin"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            setRan(e);
                            if (e != "") {
                                let r = parseFloat(e);
                                setAns(setCel, ranToCel(r));
                                setAns(setFar, ranToFar(r));
                                setAns(setKal, ranToKal(r));
                            } else if (e == "") {
                                setCel("");
                                setFar("");
                                setKal("");
                            }
                        }}
                        value={ran.toString()}
                        placeholder="Rankine"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

export default TemperatureConverter;
