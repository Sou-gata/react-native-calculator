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
import { colorSchemeType } from "../../types";

const NumberConverter = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [bin, setBin] = useState<string>("");
    const [oct, setOct] = useState<string>("");
    const [dec, setDec] = useState<string>("");
    const [hex, setHex] = useState<string>("");

    const setEmpty = () => {
        setBin("");
        setOct("");
        setDec("");
        setHex("");
    };

    const binToOther = (event: string) => {
        setBin(event);
        let e = Number(pointRemove(event));
        if (e.toString() != "") {
            let correct = binaryCheck(e);
            if (correct) {
                let o = binToOct(e);
                setOct(o.toString());
                let d = binaryToDecimal(e);
                setDec(d.toString());
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

    const octToOther = (event: string) => {
        setOct(event);
        let e = Number(pointRemove(event));
        if (e.toString() != "") {
            let correct = octalCheck(e);
            if (correct) {
                let b = octToBin(e);
                setBin(b.toString());
                let d = binaryToDecimal(b);
                setDec(d.toString());
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

    const decToOther = (event: string) => {
        setDec(event);
        let e = Number(pointRemove(event));
        if (e.toString() != "") {
            let correct = decCheck(e);
            if (correct) {
                let b = decimalToBinary(e);
                setBin(b.toString());
                let o = binToOct(b);
                setOct(o.toString());
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

    const hexToOther = (event: string) => {
        setHex(event);
        let e = pointRemove(event);
        if (e != "") {
            let correct = hexCheck(e);
            if (correct) {
                let b = hexToBin(e.toString());
                setBin(b.toString());
                let d = binaryToDecimal(b);
                setDec(d.toString());
                let o = binToOct(b);
                setOct(o.toString());
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
                        style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                        <CustomInput
                            onChangeText={(e) => {
                                if (e == "") {
                                    setEmpty();
                                    return;
                                }
                                binToOther(e);
                            }}
                            value={bin}
                            placeholder="Binary"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                if (e == "") {
                                    setEmpty();
                                    return;
                                }
                                octToOther(e);
                            }}
                            value={oct}
                            placeholder="Octal"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                if (e == "") {
                                    setEmpty();
                                    return;
                                }
                                decToOther(e);
                            }}
                            value={dec.toString()}
                            placeholder="Decimal"
                        />
                        <CustomInput
                            onChangeText={(e) => {
                                if (e == "") {
                                    setEmpty();
                                    return;
                                }
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
