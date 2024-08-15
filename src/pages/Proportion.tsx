import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { gcd, wp } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const Proportion = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [textNu, onChangeTextNu] = useState("");
    const [textDe, onChangeTextDe] = useState("");
    const [ans, setAns] = useState<{
        oriNu: number;
        oldDe: number;
        nu: number;
        de: number;
        mix: number;
        mixNu: number;
        mixDe: number;
    }>({
        oriNu: 1,
        oldDe: 1,
        nu: 1,
        de: 1,
        mix: 0,
        mixNu: 0,
        mixDe: 0,
    });
    const [opacity, setOpacity] = useState({ full: 0, mix: 0 });

    const calculate = () => {
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
                mix: 0,
                mixNu: 0,
                mixDe: 0,
            };
            setAns(an);
            if (newNu > newDe) {
                const mix = Math.floor(newNu / newDe);
                const mixNu = newNu % newDe;
                const mixDe = newDe;
                opc = { ...opc, mix: 1 };
                setOpacity(opc);
                let fullAns = { ...an, mix, mixNu, mixDe };
                setAns(fullAns);
            }
            opc = { ...opc, full: 1 };
            setOpacity(opc);
            onChangeTextNu("");
            onChangeTextDe("");
        }
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 29,
            flexDirection: "column",
            justifyContent: "center",
            width: wp("100%"),
            paddingHorizontal: 25,
            alignItems: "center",
        },
        buttonContainer: {
            alignItems: "center",
            marginTop: 30,
        },
        ansDiv: {
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        textStyle: {
            fontSize: 25,
            textAlign: "center",
            color: colors.text,
        },
        hrLine: {
            height: 2,
            marginVertical: 2,
            marginTop: 7,
            backgroundColor: colors.text,
        },
        mixContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
    });

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.container}>
                <CustomInput
                    onChangeText={onChangeTextNu}
                    value={textNu}
                    placeholder="Numerator"
                    width={150}
                />
                <View style={{ marginTop: 10 }}>
                    <CustomInput
                        onChangeText={onChangeTextDe}
                        value={textDe}
                        placeholder="Denominator"
                        width={150}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={calculate}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <View style={opacity.full ? styles.ansDiv : { display: "none" }}>
                <View>
                    <Text style={styles.textStyle}>{ans.oriNu}</Text>
                    <View style={styles.hrLine}></View>
                    <Text style={styles.textStyle}>{ans.oldDe}</Text>
                </View>
                {ans.oldDe != ans.de && ans.oriNu != ans.nu && (
                    <>
                        <Text style={styles.textStyle}> = </Text>
                        <View>
                            <Text style={styles.textStyle}>{ans.nu}</Text>
                            <View style={styles.hrLine} />
                            <Text style={styles.textStyle}>{ans.de}</Text>
                        </View>
                    </>
                )}
                {opacity.mix != 0 && (
                    <View style={styles.mixContainer}>
                        <Text style={[styles.textStyle, { marginRight: 5 }]}>
                            {" = "}
                            {ans?.mix}
                        </Text>
                        {ans.mixNu != 0 && (
                            <View>
                                <Text style={styles.textStyle}>
                                    {ans.mixNu}
                                </Text>
                                <View style={styles.hrLine} />
                                <Text style={styles.textStyle}>
                                    {ans.mixDe}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default Proportion;
