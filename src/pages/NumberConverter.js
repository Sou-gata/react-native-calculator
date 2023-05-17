import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import {
    binaryCheck,
    octalCheck,
    decCheck,
    hexCheck,
} from "../helpers/numbersCheck";
import {
    binaryToDecimal,
    binToOct,
    binToHex,
    octToBin,
    decimalToBinary,
    hexToBin,
    pointRemove,
} from "../helpers/functions";
import CustomInput from "../components/CustomInput";

const NumberConverter = () => {
    const { colors } = useTheme();
    const [bin, setBin] = useState("");
    const [oct, setOct] = useState("");
    const [dec, setDec] = useState("");
    const [hex, setHex] = useState("");

    const setEmpty = () => {
        setBin("");
        setOct("");
        setDec("");
        setHex("");
    };

    const binToOther = (event) => {
        setBin(event);
        let e = pointRemove(event);
        if (e != "") {
            let correct = binaryCheck(e);
            if (correct) {
                let o = binToOct(e);
                setOct(o);
                let d = binaryToDecimal(e);
                setDec(d);
                let h = binToHex(e);
                setHex(h);
            } else {
                let temp = event;
                setBin(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    const octToOther = (event) => {
        setOct(event);
        let e = pointRemove(event);
        if (e != "") {
            let correct = octalCheck(e);
            if (correct) {
                let b = parseFloat(octToBin(e));
                setBin(b);
                let d = binaryToDecimal(b);
                setDec(d);
                let h = binToHex(b);
                setHex(h);
            } else {
                let temp = event;
                setOct(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    const decToOther = (event) => {
        setDec(event);
        let e = pointRemove(event);
        if (e != "") {
            let correct = decCheck(e);
            if (correct) {
                let b = parseFloat(decimalToBinary(e));
                setBin(b);
                let o = binToOct(b);
                setOct(o);
                let h = binToHex(b);
                setHex(h);
            } else {
                let temp = event;
                setDec(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };

    const hexToOther = (event) => {
        setHex(event);
        let e = pointRemove(event);
        if (e != "") {
            let correct = hexCheck(e);
            if (correct) {
                let b = parseFloat(hexToBin(e));
                setBin(b);
                let d = binaryToDecimal(b);
                setDec(d);
                let o = binToOct(b);
                setOct(o);
            } else {
                let temp = event;
                setHex(temp.slice(0, -1));
            }
        } else {
            setEmpty();
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.convertorIndicator}>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Binary
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Octal
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Decimal
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 20 }}>
                            Hexadecimal
                        </Text>
                    </View>
                    <View
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}
                    >
                        <CustomInput
                            onChangeText={(e) => {
                                binToOther(e);
                            }}
                            value={bin.toString()}
                            placeholder="Binary"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                octToOther(e);
                            }}
                            value={oct.toString()}
                            placeholder="Octal"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                decToOther(e);
                            }}
                            value={dec.toString()}
                            placeholder="Decimal"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                hexToOther(e);
                            }}
                            value={hex.toString()}
                            placeholder="HexaDecimal"
                            keyboardType="default"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default NumberConverter;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        flexDirection: "column",
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
