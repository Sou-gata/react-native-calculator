import { View, Text, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

import styles from "./allStyles";
import { temConvert } from "./functions";

const TemperatureConverter = () => {
    const data = ["°C", "°F", "K", "°R"];

    const [text, onChangeText] = useState("");
    const [index, setIndex] = useState({
        from: 0,
        to: 1,
    });
    const [ans, setAns] = useState("");
    const [opacity, setOpacity] = useState(0);

    return (
        <View style={styles.main}>
            <View style={styles.align}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    autoFocus={true}
                    placeholder="123"
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                />
                <View
                    style={[styles.flexRow, { justifyContent: "space-around" }]}
                >
                    <Text style={{ fontSize: 20, color: "#fff" }}>From</Text>
                    <Text style={{ fontSize: 20, color: "#fff" }}>To</Text>
                </View>
                <View
                    style={[
                        styles.flexRow,
                        { justifyContent: "space-around", marginTop: 20 },
                    ]}
                >
                    <View style={styles.list}>
                        <SelectDropdown
                            data={data}
                            onSelect={(selectedItem, ind) => {
                                setIndex({ ...index, from: ind });
                            }}
                            defaultValue="°C"
                            dropdownStyle={styles.dropDownStyle}
                            buttonStyle={styles.dropBtn}
                            buttonTextStyle={{ fontSize: 20 }}
                            rowTextStyle={{ fontSize: 20 }}
                        />
                    </View>
                    <View style={styles.list}>
                        <SelectDropdown
                            data={data}
                            onSelect={(selectedItem, ind) => {
                                setIndex({ ...index, to: ind });
                            }}
                            defaultValue="°F"
                            dropdownStyle={styles.dropDownStyle}
                            buttonStyle={styles.dropBtn}
                            buttonTextStyle={{ fontSize: 20 }}
                            rowTextStyle={{ fontSize: 20 }}
                        />
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        if (!isNaN(parseFloat(text))) {
                            let ans = temConvert(index, text);
                            setAns(ans);
                            setOpacity(1);
                        }
                    }}
                >
                    <Text style={styles.btnText}>Convert</Text>
                </TouchableHighlight>
            </View>
            <View opacity={opacity} style={[styles.flexRow, { marginTop: 30 }]}>
                <Text style={styles.textStyle}>{ans}</Text>
            </View>
        </View>
    );
};

export default TemperatureConverter;
