import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { numaricToRoman } from "../helpers/functions";
import { useTheme, Button } from "react-native-paper";
import CustomInput from "./CustomInput";

const NumberToRoman = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState([]);
    const [number, setNumber] = useState("");
    const [opacity, setOpacity] = useState(false);
    let intNum = parseInt(number);
    intNum = isNaN(intNum) ? "" : intNum + "";
    const textStyle = [styles.textStyle, { color: colors.text }];
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
                                let tempans = numaricToRoman(text);
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
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
            </View>
            <View style={opacity ? styles.container : { display: "none" }}>
                <Text style={textStyle}>{intNum}</Text>
                <Text style={textStyle}> in roman is</Text>
                <View style={styles.flexRow}>
                    {(() => {
                        let components = [];
                        for (let i = 0; i < ans.length; i++) {
                            let com = (
                                <Text
                                    key={i}
                                    style={
                                        ans[i].special
                                            ? [
                                                  styles.bigRoman,
                                                  {
                                                      color: colors.secondary,
                                                      borderColor:
                                                          colors.secondary,
                                                  },
                                              ]
                                            : [
                                                  styles.romanText,
                                                  { color: colors.secondary },
                                              ]
                                    }>
                                    {ans[i].val}
                                </Text>
                            );
                            components.push(com);
                        }
                        return components;
                    })()}
                </View>
            </View>
        </View>
    );
};

export default NumberToRoman;

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
    },
    romanText: {
        fontSize: 27,
    },
    bigRoman: {
        fontSize: 27,
        borderTopWidth: 2,
    },
});
