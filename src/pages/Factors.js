import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { factors, factorize, wp } from "../helpers/functions";
import CustomInput from "../components/CustomInput";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { decIntCheck } from "../helpers/numbersCheck";

const Factors = () => {
    const { colors } = useTheme();
    const [text, setText] = useState("");
    const [ans, setAns] = useState({});
    const [opacity, setOpacity] = useState(0);
    const [factor, setFactor] = useState([]);
    const [prime, setPrime] = useState({
        prime: false,
        nextPrime: "",
    });

    const isPrime = (number) => {
        if (number >= 2) {
            let isPrime = true;
            for (let i = 2; i < number / 2; i++) {
                if (number % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            return isPrime;
        } else {
            return false;
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
        ansDiv: {
            alignItems: "center",
            paddingHorizontal: 20,
        },
        textStyleAns: {
            fontSize: 35,
            textAlign: "center",
            color: colors.secondary,
        },
        textStyle: {
            fontSize: 25,
            textAlign: "center",
            color: colors.text,
        },
        primeContainer: {
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            padding: 20,
        },
    });

    const onChangeText = (e) => {
        if (e != "") {
            let isCorrect = decIntCheck(e);
            if (isCorrect) {
                setText(e);
                let number = parseInt(e);
                let prime = true;
                if (number < 2) prime = false;
                else prime = isPrime(number);
                let nextPrime = "";
                let i = number + 1;
                while (!isPrime(i)) i++;
                nextPrime = i;
                setPrime({ prime, nextPrime });

                let output = factors(e);
                setAns(output);
                output = factorize(e);
                setFactor(output);
                setOpacity(1);
            } else {
                setText((prev) => prev);
            }
        } else {
            setText(e);
            setOpacity(0);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.container}>
                <CustomInput
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="123"
                    width={200}
                    maxLength={8}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginVertical: 20 }}>
                <View
                    style={[
                        styles.ansDiv,
                        { display: opacity ? "flex" : "none" },
                    ]}>
                    <Text style={[styles.textStyle, {}]}>
                        Factors of {ans.number} are :
                    </Text>
                    <Text style={styles.textStyleAns}>{ans.str}</Text>
                </View>
                <View
                    style={{
                        display: opacity ? "flex" : "none",
                        flexDirection: "row",
                        padding: 20,
                    }}>
                    <Text style={styles.textStyle}>{ans.number} = </Text>
                    <Text style={[styles.textStyle, { flexShrink: 1 }]}>
                        {factor.join(" × ")}
                    </Text>
                </View>
                <View style={{ display: opacity ? "flex" : "none" }}>
                    <View style={styles.primeContainer}>
                        {prime.prime ? (
                            <MaterialIcons
                                name="check-circle"
                                size={30}
                                color={colors.secondary}
                            />
                        ) : (
                            <Entypo
                                name="circle-with-cross"
                                size={30}
                                color={colors.secondary}
                            />
                        )}
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 25,
                                textAlign: "center",
                            }}>
                            {prime.prime
                                ? "Prime number"
                                : "Not a prime number"}
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 25,
                            marginLeft: 20,
                        }}>
                        Next Prime : {prime.nextPrime}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Factors;
