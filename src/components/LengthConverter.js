import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "../allStyles";

const LengthConverter = () => {
    const [ans, setAns] = useState({
        met: "",
        klm: "",
        inc: "",
        fet: "",
        mil: "",
        nom: "",
    });
    const fixed = (val) => {
        let fxt = parseFloat(val.toFixed(5)) + "";
        return fxt;
    };
    const setOutAns = (met, klm, inc, fet, mil, nom) => {
        setAns({
            met,
            klm,
            inc,
            fet,
            mil,
            nom,
        });
    };
    const setEmpty = () => {
        setAns({
            met: "",
            klm: "",
            inc: "",
            fet: "",
            mil: "",
            nom: "",
        });
    };
    return (
        <View style={styles.main}>
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        height: 450,
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
                    <Text style={{ color: "#fff", fontSize: 17 }}>Meter</Text>
                    <Text style={{ color: "#fff", fontSize: 17 }}>
                        Kilometer
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 17 }}>Inch</Text>
                    <Text style={{ color: "#fff", fontSize: 17 }}>Feet</Text>
                    <Text style={{ color: "#fff", fontSize: 17 }}>Mile</Text>
                    <Text style={{ color: "#fff", fontSize: 17 }}>
                        Nautical Mile
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                const met = parseFloat(e);
                                if (!isNaN(met)) {
                                    const klm = fixed(met / 1000);
                                    const inc = fixed(met * 39.3701);
                                    const fet = fixed(met * 3.28084);
                                    const mil = fixed(met / 1609);
                                    const nom = fixed(met / 1852);
                                    setOutAns(e, klm, inc, fet, mil, nom);
                                }
                            } else setEmpty();
                        }}
                        value={ans.met}
                        placeholder="Meter"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                const klm = parseFloat(e);
                                if (!isNaN(klm)) {
                                    const met = fixed(klm * 1000);
                                    const inc = fixed(klm * 39370.1);
                                    const fet = fixed(klm * 3280.84);
                                    const mil = fixed(klm * 0.621371);
                                    const nom = fixed(klm * 0.539957);
                                    setOutAns(met, e, inc, fet, mil, nom);
                                }
                            } else setEmpty();
                        }}
                        value={ans.klm}
                        placeholder="Kilomeater"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                const inc = parseFloat(e);
                                if (!isNaN(inc)) {
                                    const met = fixed(inc * 0.0254);
                                    const klm = fixed(inc / 39370);
                                    const fet = fixed(inc / 12);
                                    const mil = fixed(inc / 63360);
                                    const nom = fixed(inc / 72910);
                                    setOutAns(met, klm, e, fet, mil, nom);
                                }
                            } else setEmpty();
                        }}
                        value={ans.inc}
                        placeholder="Inch"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                const fet = parseFloat(e);
                                if (!isNaN(fet)) {
                                    const met = fixed(fet * 0.3048);
                                    const klm = fixed(fet * 0.0003048);
                                    const inc = fixed(fet * 12);
                                    const mil = fixed(fet / 5280);
                                    const nom = fixed(fet / 6076);
                                    setOutAns(met, klm, inc, e, mil, nom);
                                }
                            } else setEmpty();
                        }}
                        value={ans.fet}
                        placeholder="Feet"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                const mil = parseFloat(e);
                                if (!isNaN(mil)) {
                                    const met = fixed(mil * 1609.34);
                                    const klm = fixed(mil * 1.60934);
                                    const inc = fixed(mil * 63360);
                                    const fet = fixed(mil * 5280);
                                    const nom = fixed(mil * 0.868976);
                                    setOutAns(met, klm, inc, fet, e, nom);
                                }
                            } else setEmpty();
                        }}
                        value={ans.mil}
                        placeholder="Mile"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e != "") {
                                const nom = parseFloat(e);
                                if (!isNaN(nom)) {
                                    const met = fixed(nom * 1852);
                                    const klm = fixed(nom * 1.852);
                                    const inc = fixed(nom * 72913.4);
                                    const fet = fixed(nom * 6076.12);
                                    const mil = fixed(nom * 1.15078);
                                    setOutAns(met, klm, inc, fet, mil, e);
                                }
                            } else setEmpty();
                        }}
                        value={ans.nom}
                        placeholder="Nautical Mile"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

export default LengthConverter;
