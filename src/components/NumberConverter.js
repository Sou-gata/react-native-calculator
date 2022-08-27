import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

import styles from "../allStyles";
import { binaryCheck, octalCheck, decCheck, hexCheck } from "../numbersCheck";
import {
    binaryToDecimal,
    binToOct,
    binToHex,
    octToBin,
    decimalToBinary,
    hexToBin,
    pointRemove,
} from "../functions";

const NumberConverter = () => {
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
                    <Text style={{ color: "#fff", fontSize: 20 }}>Binary</Text>
                    <Text style={{ color: "#fff", fontSize: 20 }}>Octal</Text>
                    <Text style={{ color: "#fff", fontSize: 20 }}>Decimal</Text>
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                        Hexadecimal
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            binToOther(e);
                        }}
                        value={bin.toString()}
                        placeholder="Binary"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            octToOther(e);
                        }}
                        value={oct.toString()}
                        placeholder="Octal"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            decToOther(e);
                        }}
                        value={dec.toString()}
                        placeholder="Decimal"
                        placeholderTextColor={"#ffffff50"}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            hexToOther(e);
                        }}
                        value={hex.toString()}
                        placeholder="HexaDecimal"
                        placeholderTextColor={"#ffffff50"}
                    />
                </View>
            </View>
        </View>
    );
};

export default NumberConverter;
