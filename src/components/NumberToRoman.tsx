import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { numaricToRoman } from "../helpers/functions";
import { useTheme, Button } from "react-native-paper";
import CustomInput from "./CustomInput";
import { colorSchemeType, numberToRomanType } from "../../types";

const NumberToRoman = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState<numberToRomanType[]>([]);
    const [number, setNumber] = useState("");
    const [opacity, setOpacity] = useState(false);
    let num = parseInt(number);
    let intNum = isNaN(num) ? "" : num + "";

    const styles = StyleSheet.create({
        container: {
            marginTop: 29,
            alignItems: "center",
            justifyContent: "center",
        },
        buttonContainer: {
            alignItems: "center",
            marginTop: 30,
        },
        flexRow: {
            flexDirection: "row",
            marginTop: 25,
        },
        textStyle: {
            fontSize: 25,
            textAlign: "center",
            color: colors.text,
        },
        romanText: {
            fontSize: 27,
            color: colors.secondary,
        },
        bigRoman: {
            fontSize: 27,
            borderTopWidth: 2,
            color: colors.secondary,
            borderColor: colors.secondary,
        },
    });

    return (
        <View>
            <View style={styles.container}>
                <CustomInput
                    placeholder="123"
                    onChangeText={onChangeText}
                    value={text}
                    maxLength={7}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            if (text != "") {
                                let tempans = numaricToRoman(parseInt(text));
                                if (tempans[0]) {
                                    if (tempans[0].val != "") {
                                        setAns(tempans);
                                        setNumber(text);
                                        setOpacity(true);
                                        onChangeText("");
                                    } else {
                                        setOpacity(false);
                                    }
                                } else {
                                    setOpacity(false);
                                }
                            }
                        }}
                        buttonColor={colors.secondary}
                        textColor="#fff">
                        Calculate
                    </Button>
                </View>
            </View>
            <View style={opacity ? styles.container : { display: "none" }}>
                <Text style={styles.textStyle}>{intNum}</Text>
                <Text style={styles.textStyle}> in roman is</Text>
                <View style={styles.flexRow}>
                    {ans.map((text, i) => (
                        <Text
                            key={i}
                            style={
                                text.special
                                    ? styles.bigRoman
                                    : styles.romanText
                            }>
                            {text.val}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default NumberToRoman;
