import { View, Text, TouchableHighlight, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

import { gcd } from "../helpers/functions";
import ThemeSelector from "../helpers/ThemeSelector";

const FractionSimplify = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const [textNu, onChangeTextNu] = useState("");
    const [textDe, onChangeTextDe] = useState("");
    const [ans, setAns] = useState({
        oriNu: 1,
        oldDe: 1,
        nu: 1,
        de: 1,
        mix: 0,
        mixNu: 0,
        mixDe: 0,
    });
    const [opacity, setOpacity] = useState({ full: 0, mix: 0 });

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextNu}
                    value={textNu}
                    autoFocus={true}
                    placeholder="Numerator"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextDe}
                    value={textDe}
                    placeholder="Denominator"
                    placeholderTextColor={color.paceHolder}
                    keyboardType="numeric"
                />
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        let opc = { full: 0, mix: 0 };
                        setOpacity(opc);
                        const nu = parseInt(textNu);
                        const de = parseInt(textDe);
                        if (!isNaN(nu) && !isNaN(de)) {
                            const hcf = gcd([nu, de]);
                            const newNu = nu / hcf;
                            const newDe = de / hcf;
                            let an = {
                                oriNu: nu,
                                oldDe: de,
                                nu: newNu,
                                de: newDe,
                            };
                            setAns(an);
                            if (newNu > newDe) {
                                const mix = Math.floor(newNu / newDe);
                                const mixNu = newNu % newDe;
                                const mixDe = newDe;
                                opc = { ...opc, mix: 1 };
                                setOpacity(opc);
                                an = { ...an, mix, mixNu, mixDe };
                                setAns(an);
                            }
                            opc = { ...opc, full: 1 };
                            setOpacity(opc);
                            onChangeTextNu("");
                            onChangeTextDe("");
                        }
                    }}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableHighlight>
            </View>
            <View
                style={[styles.ansDiv, styles.flexRow]}
                opacity={opacity.full}
            >
                <View>
                    <Text style={styles.textStyle}>{ans.oriNu}</Text>
                    <View style={styles.hrLine}></View>
                    <Text style={styles.textStyle}>{ans.oldDe}</Text>
                </View>
                <Text style={styles.textStyle}> = </Text>
                <View>
                    <Text style={styles.textStyle}>{ans.nu}</Text>
                    <View style={styles.hrLine}></View>
                    <Text style={styles.textStyle}>{ans.de}</Text>
                </View>
                <Text
                    style={
                        opacity.mix == 0
                            ? [{ display: "none" }, styles.textStyle]
                            : [{ display: "flex" }, styles.textStyle]
                    }
                >
                    {" "}
                    ={" "}
                </Text>
                <View
                    style={
                        opacity.mix == 0
                            ? { display: "none" }
                            : {
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                              }
                    }
                >
                    <Text style={[styles.textStyle, { marginRight: 5 }]}>
                        {ans.mix}
                    </Text>
                    <View>
                        <Text style={styles.textStyle}>{ans.mixNu}</Text>
                        <View style={styles.hrLine}></View>
                        <Text style={styles.textStyle}>{ans.mixDe}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FractionSimplify;
