import { View, Text, TouchableHighlight, TextInput } from "react-native";
import React, { useState } from "react";

import styles from "./allStyles";
import { gcd } from "./functions";

const FractionSimplify = () => {
    const [textNu, onChangeTextNu] = useState("");
    const [textDe, onChangeTextDe] = useState("");
    const [ans, setAns] = useState({ oriNu: 1, oldDe: 1, nu: 1, de: 1 });
    const [opacity, setOpacity] = useState(0);

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextNu}
                    value={textNu}
                    autoFocus={true}
                    placeholder="Numerator"
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextDe}
                    value={textDe}
                    placeholder="Denominator"
                    placeholderTextColor={"#ffffff50"}
                    keyboardType="numeric"
                />
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        let nu = parseInt(textNu);
                        let de = parseInt(textDe);
                        if (!isNaN(nu) && !isNaN(de)) {
                            let hcf = gcd([nu, de]);
                            let newNu = nu / hcf;
                            let newDe = de / hcf;
                            setAns({
                                oriNu: nu,
                                oldDe: de,
                                nu: newNu,
                                de: newDe,
                            });
                            setOpacity(1);
                            onChangeTextNu("");
                            onChangeTextDe("");
                        }
                    }}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </TouchableHighlight>
            </View>
            <View style={[styles.ansDiv, styles.flexRow]} opacity={opacity}>
                <View>
                    <Text style={[styles.textStyle, styles.simplify]}>
                        {ans.oriNu}
                    </Text>
                    <View style={styles.hrLine}></View>
                    <Text style={[styles.textStyle, styles.simplify]}>
                        {ans.oldDe}
                    </Text>
                </View>
                <Text style={styles.textStyle}> = </Text>
                <View>
                    <Text style={[styles.textStyle, styles.simplify]}>
                        {ans.nu}
                    </Text>
                    <View style={styles.hrLine}></View>
                    <Text style={[styles.textStyle, styles.simplify]}>
                        {ans.de}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default FractionSimplify;
