import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { factors } from "../helpers/functions";
import CustomInput from "../components/CustomInput";

const Factors = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
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
            <View style={styles.ansDiv} opacity={opacity}>
                <Text style={[styles.textStyle, { color: colors.text }]}>
                    Factors of {ans.number} are :
                </Text>
                <Text
                    style={[styles.textStyleAns, { color: colors.secondary }]}
                >
                    {ans.str}
                </Text>
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
