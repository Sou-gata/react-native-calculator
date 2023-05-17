import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
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

const TemperatureConverter = () => {
    const { colors } = useTheme();
    const [cel, setCel] = useState("");
    const [kal, setKal] = useState("");
    const [far, setFar] = useState("");
    const [ran, setRan] = useState("");

    const setAns = (setFun, value) => {
        let val = isNaN(value) ? "" : value;
        setFun(val);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.container}>
                <View style={styles.convertorIndicator}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Celsius
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Fahrenheit
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Kelvin
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Rankine
                    </Text>
                </View>
                <View style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                    <CustomInput
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
                    />
                    <CustomInput
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
                    />
                    <CustomInput
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
                    />
                    <CustomInput
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
                    />
                </View>
            </View>
        </View>
    );
};

export default TemperatureConverter;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 300,
    },
    convertorIndicator: {
        justifyContent: "space-around",
        height: "100%",
        alignItems: "flex-end",
    },
});
