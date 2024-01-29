import { View, ScrollView, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";

const Triangle = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [inputs, setInputs] = useState({
        A: "",
        B: "",
        C: "",
        a: 0,
        b: 0,
        c: 0,
    });
    const [ans, setAns] = useState({
        area: undefined,
        s: 0,
        perimeter: 0,
        heightA: 0,
        heightB: 0,
        heightC: 0,
    });
    const [isPossible, setIsPossible] = useState(true);
    const calculate = () => {
        if (inputs.A === "" || inputs.B === "" || inputs.C === "") return;
        const a = parseFloat(inputs.A);
        const b = parseFloat(inputs.B);
        const c = parseFloat(inputs.C);
        if (isNaN(a) || isNaN(b) || isNaN(c)) return;
        if (a + b > c && b + c > a && c + a > b) {
            setIsPossible(true);
            const s = (a + b + c) / 2;
            let tempS = s.toFixed(2);
            tempS = parseFloat(tempS);
            setInputs({ ...inputs, a, b, c });
            let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            area = area.toFixed(2);
            area = parseFloat(area);
            let perimeter = a + b + c;
            perimeter = perimeter.toFixed(2);
            perimeter = parseFloat(perimeter);
            let heightA = (2 * area) / a;
            heightA = heightA.toFixed(2);
            heightA = parseFloat(heightA);
            let heightB = (2 * area) / b;
            heightB = heightB.toFixed(2);
            heightB = parseFloat(heightB);
            let heightC = (2 * area) / c;
            heightC = heightC.toFixed(2);
            heightC = parseFloat(heightC);
            setAns({
                ...ans,
                s: tempS,
                area,
                perimeter,
                heightA,
                heightB,
                heightC,
            });
        } else {
            setIsPossible(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 200,
            height: 200,
            alignSelf: "center",
            tintColor: colors.text,
        },
        topText: {
            color: colors.text,
            fontSize: 18,
            marginVertical: 10,
        },
        transparentTextStyle: {
            fontSize: 18,
            color: "transparent",
        },
        textStyle: {
            fontSize: 18,
            color: colors.text,
        },
        secondaryText: {
            fontSize: 18,
            color: colors.secondary,
        },
        lineWithRoot: {
            color: colors.text,
            fontSize: 18,
            borderTopWidth: 1,
            borderColor: colors.text,
        },
        root: {
            color: colors.text,
            fontSize: 20,
            lineHeight: 25,
        },
        notPossible: {
            color: colors.text,
            fontSize: 18,
            marginTop: 15,
            textAlign: "center",
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
                        source={require("../../../assets/shapes/triangle_main.png")}
                        style={styles.image}
                    />
                    <Text style={styles.topText}>Sides</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        {shapeDetails.field.map((field, index) => (
                            <CustomInput
                                key={index}
                                label={field}
                                placeholder={"Enter " + field}
                                width={100}
                                value={inputs[field]}
                                onChangeText={(text) => {
                                    setInputs({ ...inputs, [field]: text });
                                }}
                            />
                        ))}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor={"white"}
                            style={{ marginTop: 15 }}
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {!isPossible && (
                        <Text style={styles.notPossible}>
                            Triangle is not possible
                        </Text>
                    )}
                    {isPossible && ans.area && (
                        <View style={{ marginTop: 15 }}>
                            <Fraction
                                data={{
                                    numerator: "A + B + C",
                                    denominator: "2",
                                    text: "S",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${inputs.a} + ${inputs.b} + ${inputs.c}`,
                                    denominator: "2",
                                    text: "S",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    S
                                </Text>
                                <Text style={styles.textStyle}>{` = `}</Text>
                                <Text style={styles.textStyle}>{ans.s}</Text>
                            </View>
                        </View>
                    )}
                    {isPossible && ans.area && (
                        <>
                            <View
                                style={{ marginTop: 25, flexDirection: "row" }}>
                                <Text style={styles.textStyle}>Area = </Text>
                                <Text style={styles.root}>√</Text>
                                <Text style={styles.lineWithRoot}>
                                    S (S - A) (S - B) (S - C)
                                </Text>
                            </View>
                            <View
                                style={{ marginTop: 15, flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    Area{" "}
                                </Text>
                                <Text style={styles.root}>= √</Text>
                                <Text style={styles.lineWithRoot}>
                                    {ans.s} ({ans.s} - {inputs.a}) ({ans.s} -{" "}
                                    {inputs.b}) ({ans.s} - {inputs.c})
                                </Text>
                            </View>
                            <View
                                style={{ marginTop: 15, flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    Area{" "}
                                </Text>
                                <Text style={styles.textStyle}>{` = `}</Text>
                                <Text style={styles.textStyle}>{ans.area}</Text>
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <Text style={styles.textStyle}>
                                    Perimeter = A + B + C
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.transparentTextStyle}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}>
                                        {" "}
                                        = {inputs.a} + {inputs.b} + {inputs.c}
                                    </Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.transparentTextStyle}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}>
                                        {" = "}
                                    </Text>
                                    <Text style={styles.textStyle}>
                                        {ans.perimeter}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Fraction
                                    data={{
                                        numerator: "2 × Area",
                                        denominator: "A",
                                        text: "Height A",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: `2 × ${ans.area}`,
                                        denominator: inputs.a,
                                        text: "Height A",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: ans.heightA,
                                        text: "Height A",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Fraction
                                    data={{
                                        numerator: "2 × Area",
                                        denominator: "B",
                                        text: "Height B",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: `2 × ${ans.area}`,
                                        denominator: inputs.b,
                                        text: "Height B",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: ans.heightB,
                                        text: "Height B",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Fraction
                                    data={{
                                        numerator: "2 × Area",
                                        denominator: "C",
                                        text: "Height C",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: `2 × ${ans.area}`,
                                        denominator: inputs.c,
                                        text: "Height C",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: ans.heightC,
                                        text: "Height C",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                            </View>
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Triangle;
