import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput";
import { gcd } from "../helpers/functions";

const FractionSimplify = () => {
    const { colors } = useTheme();
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

    const textStyle = [styles.textStyle, { color: colors.text }];

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
    };

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
                        textColor={"white"}
                    >
                        Calculate
                    </Button>
                </View>
            </View>
            <View style={opacity.full ? styles.ansDiv : { display: "none" }}>
                <View>
                    <Text style={textStyle}>{ans.oriNu}</Text>
                    <View
                        style={[
                            styles.hrLine,
                            {
                                backgroundColor: colors.text,
                            },
                        ]}
                    ></View>
                    <Text style={textStyle}>{ans.oldDe}</Text>
                </View>
                <Text style={textStyle}> = </Text>
                <View>
                    <Text style={textStyle}>{ans.nu}</Text>
                    <View
                        style={[
                            styles.hrLine,
                            {
                                backgroundColor: colors.text,
                            },
                        ]}
                    ></View>
                    <Text style={textStyle}>{ans.de}</Text>
                </View>
                <Text
                    style={
                        opacity.mix == 0
                            ? [{ display: "none" }, textStyle]
                            : [{ display: "flex" }, textStyle]
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
                    <Text style={[textStyle, { marginRight: 5 }]}>
                        {ans.mix}
                    </Text>
                    <View>
                        <Text style={textStyle}>{ans.mixNu}</Text>
                        <View
                            style={[
                                styles.hrLine,
                                {
                                    backgroundColor: colors.text,
                                },
                            ]}
                        ></View>
                        <Text style={textStyle}>{ans.mixDe}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FractionSimplify;

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
        alignItems: "center",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
    hrLine: {
        height: 2,
        marginVertical: 2,
        marginTop: 7,
    },
});
