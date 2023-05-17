import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { checkLcmHcfNum, gcd, inputNumbers } from "../helpers/functions";
import { useTheme, Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";

const HCF = () => {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [ans, setAns] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [input, setInput] = useState("");
    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <CustomInput
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="10 20 30"
                        width={200}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            let numbers = checkLcmHcfNum(text);
                            if (numbers) {
                                let lcmAns = gcd(numbers);
                                setInput(inputNumbers(text));
                                setAns(lcmAns);
                                onChangeText("");
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
                    HCF of {input} is
                </Text>
                <Text
                    style={[
                        styles.textStyleOrange,
                        { color: colors.secondary },
                    ]}
                >
                    {ans}
                </Text>
            </View>
        </View>
    );
};

export default HCF;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        justifyContent: "center",
        alignContent: "center",
        width: wp("100%"),
        paddingHorizontal: 25,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
    textStyleOrange: {
        fontSize: 35,
        textAlign: "center",
    },
    ansDiv: {
        alignItems: "center",
        padding: 20,
    },
});
