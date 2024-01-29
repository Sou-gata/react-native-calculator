import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";

const SFormula = ({ numerator, h, colors }) => {
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: 18 }}>S</Text>
                <Text style={{ color: colors.text, fontSize: 18 }}>
                    {" = "}
                </Text>
                <View
                    style={{
                        height: 55,
                        alignItems: "center",
                        justifyContent: "center",
                        width: 25,
                    }}>
                    <Image
                        source={require("../../../assets/shapes/root.png")}
                        style={{
                            height: 115,
                            width: 50,
                            tintColor: colors.text,
                            transform: [{ scale: 0.35 }],
                            marginTop: -10,
                        }}
                    />
                </View>

                <View
                    style={{
                        borderTopColor: colors.text,
                        borderTopWidth: 1.5,
                        marginLeft: -3,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <View>
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 18,
                                borderBottomColor: colors.text,
                                borderBottomWidth: 1,
                                paddingBottom: 3,
                            }}>
                            {numerator}
                        </Text>
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 18,
                                textAlign: "center",
                            }}>
                            4
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 18,
                            marginHorizontal: 5,
                        }}>
                        +
                    </Text>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 18,
                        }}>
                        {h}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const Trapezoid = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({
        A: "",
        B: "",
        H: "",
        a: 0,
        b: 0,
        h: 0,
    });
    const [ans, setAns] = useState({ area: undefined, perimeter: 0, s: 0 });
    const calculate = () => {
        if (input.A === "" && input.B === "" && input.H === "") return;
        const a = parseFloat(parseFloat(input.A).toFixed(2));
        const b = parseFloat(parseFloat(input.B).toFixed(2));
        const h = parseFloat(parseFloat(input.H).toFixed(2));
        if (isNaN(a) || isNaN(b) || isNaN(h)) return;
        setInput({ ...input, a, b, h });
        const area = parseFloat((((a + b) * h) / 2).toFixed(2));
        let s = Math.sqrt(((b - a) / 2) ** 2 + h ** 2);
        s = parseFloat(s.toFixed(2));
        const perimeter = parseFloat((2 * s + a + b).toFixed(2));
        setAns({ area, perimeter, s });
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 260,
            height: 200,
            alignSelf: "center",
            tintColor: colors.text,
        },
        topText: {
            color: colors.secondary,
            fontSize: 18,
            marginVertical: 10,
            width: 100,
            textAlign: "center",
        },
        inputField: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
        },
        flexRow: {
            flexDirection: "row",
        },
    });
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Image
                        source={shapeDetails.mainImage}
                        style={styles.image}
                    />
                    <View style={styles.inputField}>
                        <Text style={styles.topText}>A</Text>
                        <Text style={styles.topText}>B</Text>
                        <Text style={styles.topText}>H</Text>
                    </View>
                    <View style={styles.inputField}>
                        {shapeDetails.field.map((item, index) => {
                            return (
                                <CustomInput
                                    key={index}
                                    width={100}
                                    placeholder={item}
                                    value={input[item]}
                                    onChangeText={(e) => {
                                        setInput((prev) => ({
                                            ...prev,
                                            [item]: e,
                                        }));
                                    }}
                                />
                            );
                        })}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor="#fff"
                            style={{ marginTop: 15 }}
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {ans.area && (
                        <>
                            <View style={{ marginTop: 25 }}>
                                <Fraction
                                    data={{
                                        numerator: "( A + B ) × H",
                                        denominator: "2",
                                        text: "Area",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: `( ${input.a} + ${input.b} ) × ${input.h}`,
                                        denominator: "2",
                                        text: "Area",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: `${input.a + input.b} × ${
                                            input.h
                                        }`,
                                        denominator: "2",
                                        text: "Area",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: `${ans.area}`,
                                        text: "Area",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                            </View>
                            <View style={{ marginTop: 25, gap: 10 }}>
                                <SFormula
                                    numerator={"(B - A)²"}
                                    h={"H²"}
                                    colors={colors}
                                />
                                <SFormula
                                    numerator={`(${input.b} - ${input.a})²`}
                                    h={input.h + "²"}
                                    colors={colors}
                                />
                                <SFormula
                                    numerator={`(${input.b - input.a})²`}
                                    h={input.h + "²"}
                                    colors={colors}
                                />
                                <SFormula
                                    numerator={`${(input.b - input.a) ** 2}`}
                                    h={input.h ** 2}
                                    colors={colors}
                                />
                                <View style={styles.flexRow}>
                                    <Text
                                        style={{
                                            color: "transparent",
                                            fontSize: 18,
                                        }}>
                                        S
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: 18,
                                        }}>
                                        {" = "}
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: 25,
                                            marginTop: -5,
                                        }}>
                                        √
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: 18,
                                            borderTopWidth: 1.5,
                                            borderTopColor: colors.text,
                                        }}>
                                        {parseFloat(
                                            (
                                                (input.b - input.a) ** 2 /
                                                4
                                            ).toFixed(2)
                                        )}{" "}
                                        + {input.h ** 2}
                                    </Text>
                                </View>
                                <Fraction
                                    data={{ text: "S", numerator: ans.s }}
                                    textVisible={false}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Fraction
                                    data={{
                                        numerator: "2S + A + B",
                                        text: "Perimeter",
                                    }}
                                    // textVisible={false}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                                <Fraction
                                    data={{
                                        numerator: `2 × ${ans.s} + ${input.a} + ${input.b}`,
                                        text: "Perimeter",
                                    }}
                                    textVisible={false}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                                <Fraction
                                    data={{
                                        numerator: `${2 * ans.s} + ${
                                            input.a
                                        } + ${input.b}`,
                                        text: "Perimeter",
                                    }}
                                    textVisible={false}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                                <Fraction
                                    data={{
                                        numerator: `${ans.perimeter}`,
                                        text: "Perimeter",
                                    }}
                                    textVisible={false}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                            </View>
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Trapezoid;

const styles = StyleSheet.create({});
