import { View, TouchableOpacity, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

import ThemeSelector from "../helpers/ThemeSelector";

const Gst = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const btns = [
        {
            text: "3%",
            selectStyle: [styles.gstBtnSelected, styles.leftGstBtn],
            style: [styles.gstBtn, styles.leftGstBtn],
            value: 3,
        },
        {
            text: "5%",
            selectStyle: styles.gstBtnSelected,
            style: styles.gstBtn,
            value: 5,
        },
        {
            text: "12%",
            selectStyle: styles.gstBtnSelected,
            style: styles.gstBtn,
            value: 12,
        },
        {
            text: "18%",
            selectStyle: styles.gstBtnSelected,
            style: styles.gstBtn,
            value: 18,
        },
        {
            text: "28%",
            selectStyle: [styles.gstBtnSelected, styles.rightGstBtn],
            style: [styles.gstBtn, styles.rightGstBtn],
            value: 28,
        },
    ];

    const [selected, setSelected] = useState(3);
    const [text, setText] = useState("");
    const [ans, setAns] = useState({
        cost: "",
        cs: "",
    });

    const onPressBtn = (index) => {
        setSelected(index);
        if (text != "") {
            calGst(text, index);
        }
    };
    const onChangeText = (e) => {
        setText(e);
        if (e != "") {
            calGst(e, selected);
        } else {
            setAns({ cost: "", cs: "" });
        }
    };

    const calGst = (price, percent) => {
        const tempPrice = parseFloat(price);
        const tempPercent = parseFloat(percent);
        let cost = tempPrice + (tempPrice * tempPercent) / 100;
        let cs = (cost - tempPrice) / 2;
        cs = parseFloat(cs.toFixed(2));
        cost = parseFloat(cost.toFixed(2));
        setAns({ cost, cs });
    };

    return (
        <View style={styles.main}>
            <View style={{ height: 300, justifyContent: "space-around" }}>
                <View style={styles.ageRow}>
                    <Text style={styles.text}>Original Price</Text>
                    <TextInput
                        style={[styles.input, { marginVertical: 0 }]}
                        onChangeText={onChangeText}
                        value={text}
                        autoFocus={true}
                        placeholder="100"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.ageRow}>
                    <Text style={[styles.text, { marginRight: 50 }]}>GST</Text>
                    {(() => {
                        let allBtns = [];
                        for (let i = 0; i < btns.length; i++) {
                            let btn = btns[i];
                            let component = (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        onPressBtn(btn.value);
                                    }}
                                    style={
                                        selected == btn.value
                                            ? btn.selectStyle
                                            : btn.style
                                    }
                                >
                                    <Text
                                        style={
                                            selected == btn.value
                                                ? styles.gstTextSelected
                                                : styles.gstText
                                        }
                                    >
                                        {btn.text}
                                    </Text>
                                </TouchableOpacity>
                            );
                            allBtns.push(component);
                        }
                        return allBtns;
                    })()}
                </View>
                <View style={styles.ageRow}>
                    <Text style={[styles.text, styles.ageRow]}>
                        Final Price
                    </Text>
                    <Text style={[styles.textStyleOrange, { height: 45 }]}>
                        {"   "}
                        {ans.cost}
                    </Text>
                </View>
                <Text style={[styles.text, { textAlign: "center" }]}>
                    SGST/CGST : {"  "}
                    {ans.cs}
                </Text>
            </View>
        </View>
    );
};

export default Gst;
