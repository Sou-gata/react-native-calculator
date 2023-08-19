import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { factors, factorize, wp } from "../helpers/functions";
import CustomInput from "../components/CustomInput";

const Factors = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    const [factor, setFactor] = useState([]);
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.container}>
                <CustomInput
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="123"
                    width={200}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            let numbers = parseInt(text);
                            if (!isNaN(numbers)) {
                                onChangeText("");
                                let output = factors(text);
                                setAns(output);
                                output = factorize(text);
                                setFactor(output);
                                setOpacity(1);
                            }
                        }}
                        buttonColor={colors.secondary}
                        textColor={"white"}
                    >
                        Calculate
                    </Button>
                </View>
            </View>
            <View
                style={[styles.ansDiv, { display: opacity ? "flex" : "none" }]}
            >
                <Text style={[styles.textStyle, { color: colors.text }]}>
                    Factors of {ans.number} are :
                </Text>
                <Text
                    style={[styles.textStyleAns, { color: colors.secondary }]}
                >
                    {ans.str}
                </Text>
            </View>
            <View
                style={{
                    display: opacity ? "flex" : "none",
                    flexDirection: "row",
                    padding: 20,
                }}
            >
                <Text style={[styles.textStyle, { color: colors.text }]}>
                    {ans.number} ={" "}
                </Text>
                {(() => {
                    let com = "";
                    for (let i = 0; i < factor.length; i++) {
                        if (i < factor.length - 1) {
                            com += factor[i] + " × ";
                        } else {
                            com += factor[i];
                        }
                    }
                    return (
                        <Text
                            style={[
                                styles.textStyle,
                                { color: colors.text, flexShrink: 1 },
                            ]}
                        >
                            {com}
                        </Text>
                    );
                })()}
            </View>
        </View>
    );
};

export default Factors;

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
    },
    textStyleAns: {
        fontSize: 35,
        textAlign: "center",
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
});
