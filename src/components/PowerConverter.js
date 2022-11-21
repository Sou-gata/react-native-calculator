import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ThemeSelector from "../helpers/ThemeSelector";

const PowerConverter = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const [ans, setAns] = useState({
        wat: "",
        kwat: "",
        hrsp: "",
        fpps: "",
        btu: "",
    });
    const setOutAns = (wat, kwat, hrsp, fpps, btu) => {
        setAns({
            wat,
            kwat,
            hrsp,
            fpps,
            btu,
        });
    };
    const setEmpty = () => {
        setAns({
            wat: "",
            kwat: "",
            hrsp: "",
            fpps: "",
            btu: "",
        });
    };
    const fixed = (val) => {
        let fxt = parseFloat(val.toFixed(5)) + "";
        return fxt;
    };
    return (
        <View style={styles.main}>
            <ScrollView>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                            height: 370,
                        },
                    ]}
                >
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: color.white, fontSize: 17 }}>
                            Watts
                        </Text>
                        <Text style={{ color: color.white, fontSize: 17 }}>
                            Kilwatts
                        </Text>
                        <Text style={{ color: color.white, fontSize: 17 }}>
                            Horsepower
                        </Text>
                        <Text style={{ color: color.white, fontSize: 17 }}>
                            Ft-lb/sec
                        </Text>
                        <Text style={{ color: color.white, fontSize: 17 }}>
                            BTUs/minute
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                if (e != "") {
                                    const wat = parseFloat(e);
                                    if (!isNaN(wat)) {
                                        const kwat = fixed(wat * 0.001);
                                        const hrsp = fixed(wat * 0.0013141);
                                        const fpps = fixed(wat * 0.737562149);
                                        const btu = fixed(wat * 0.056869);
                                        setOutAns(e, kwat, hrsp, fpps, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.wat}
                            placeholder="Watts"
                            placeholderTextColor={color.paceHolder}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                if (e != "") {
                                    const kwat = parseFloat(e);
                                    if (!isNaN(kwat)) {
                                        const wat = fixed(kwat * 1000);
                                        const hrsp = fixed(kwat * 1.3596216);
                                        const fpps = fixed(kwat * 737.562149);
                                        const btu = fixed(kwat * 56.86902);
                                        setOutAns(wat, e, hrsp, fpps, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.kwat}
                            placeholder="Kiloatts"
                            placeholderTextColor={color.paceHolder}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                if (e != "") {
                                    const hrsp = parseFloat(e);
                                    if (!isNaN(hrsp)) {
                                        const wat = fixed(hrsp * 745.699872);
                                        const kwat = fixed(wat * 0.001);
                                        const fpps = fixed(kwat * 737.562149);
                                        const btu = fixed(hrsp * 42.4072335);
                                        setOutAns(wat, kwat, e, fpps, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.hrsp}
                            placeholder="Horsepower"
                            placeholderTextColor={color.paceHolder}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                if (e != "") {
                                    const fpps = parseFloat(e);
                                    if (!isNaN(fpps)) {
                                        const wat = fixed(fpps * 1.355818);
                                        const kwat = fixed(wat * 0.001);
                                        const hrsp = fixed(kwat * 737.562149);
                                        const btu = fixed(fpps * 0.077104047);
                                        setOutAns(wat, kwat, hrsp, e, btu);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.fpps}
                            placeholder="Ft-lb/sec"
                            placeholderTextColor={color.paceHolder}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                if (e != "") {
                                    const btu = parseFloat(e);
                                    if (!isNaN(btu)) {
                                        const wat = fixed(btu * 17.58426421);
                                        const kwat = fixed(wat * 0.001);
                                        const hrsp = fixed(kwat * 737.562149);
                                        const fpps = fixed(btu * 12.9694877);
                                        setOutAns(wat, kwat, hrsp, fpps, e);
                                    }
                                } else setEmpty();
                            }}
                            value={ans.btu}
                            placeholder="BTUs/minute"
                            placeholderTextColor={color.paceHolder}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PowerConverter;
