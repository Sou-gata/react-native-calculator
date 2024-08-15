import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import SegmentedButtons from "../components/SegmentedButtons";
import CustomInput from "../components/CustomInput";
import { colorSchemeType } from "../../types";

const Gst = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [selected, setSelected] = useState(3);
    const [text, setText] = useState("");
    const [ans, setAns] = useState({
        cost: "",
        cs: "",
    });
    const data = [
        {
            label: "3%",
            value: 3,
        },
        {
            label: "5%",
            value: 5,
        },
        {
            label: "12%",
            value: 12,
        },
        {
            label: "18%",
            value: 18,
        },
        {
            label: "28%",
            value: 28,
        },
    ];

    useEffect(() => {
        if (text != "") {
            calGst(text, selected);
        }
    }, [selected]);

    const onChangeText = (e: string) => {
        setText(e);
        if (e != "") {
            calGst(e, selected);
        } else {
            setAns({ cost: "", cs: "" });
        }
    };
    const calGst = (price: string, percent: number) => {
        const tempPrice = parseFloat(price);
        const tempPercent = percent;
        let cost = tempPrice + (tempPrice * tempPercent) / 100;
        let cs = (cost - tempPrice) / 2;
        cs = parseFloat(cs.toFixed(2));
        cost = parseFloat(cost.toFixed(2));
        setAns({ cost: cost.toString(), cs: cs.toString() });
    };
    const stylestext = [styles.text, { color: colors.text }];

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={{ marginTop: 20 }}>
                <View style={styles.flexRow}>
                    <Text style={stylestext}>Original Price</Text>
                    <View style={{ marginLeft: 20 }}>
                        <CustomInput
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Price"
                            width={150}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 20,
                    }}>
                    <Text
                        style={[
                            styles.text,
                            { marginRight: 10, color: colors.text },
                        ]}>
                        GST
                    </Text>
                    <SegmentedButtons
                        data={data}
                        value={selected}
                        onChange={setSelected}
                    />
                </View>
                <View style={[styles.flexRow, { marginVertical: 20 }]}>
                    <Text style={[styles.text, { color: colors.text }]}>
                        Final Price
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { color: colors.secondary, fontSize: 35 },
                        ]}>
                        {"   "}
                        {ans.cost}
                    </Text>
                </View>
                <Text
                    style={[
                        styles.text,
                        { textAlign: "center", color: colors.text },
                    ]}>
                    SGST/CGST : {"  "}
                    {ans.cs}
                </Text>
            </View>
        </View>
    );
};

export default Gst;

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
    },
});
