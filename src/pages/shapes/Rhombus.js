import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";
import { parseNumber } from "../../helpers/functions";

const Rhombus = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({ A: "", B: "", a: 0, b: 0 });
    const [ans, setAns] = useState({ area: undefined, perimeter: 0, side: 0 });
    const calculate = () => {
        if (input.A === "" || input.B === "") return;
        let a = parseFloat(input.A);
        let b = parseFloat(input.B);
        if (isNaN(a) || isNaN(b)) return;
        a = parseNumber(a, 2);
        b = parseNumber(b, 2);
        let area = (a * b) / 2;
        area = parseNumber(area, 2);
        let perimeter = 2 * Math.sqrt(a * a + b * b);
        perimeter = parseNumber(perimeter, 2);
        let side = perimeter / 4;
        side = parseNumber(side, 2);
        setInput((prev) => ({ ...prev, a, b }));
        setAns({ perimeter, area, side });
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 170,
            height: 220,
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
        inputContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: 25,
        },
        flexRow: {
            flexDirection: "row",
            alignItems: "center",
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
                    <View style={styles.inputContainer}>
                        {shapeDetails.field.map((item, index) => (
                            <View key={index}>
                                <Text
                                    style={[
                                        styles.textStyle,
                                        {
                                            textAlign: "center",
                                            color: colors.secondary,
                                        },
                                    ]}>
                                    {item}
                                </Text>
                                <CustomInput
                                    placeholder={item}
                                    value={input[item]}
                                    onChangeText={(e) => {
                                        setInput((prev) => ({
                                            ...prev,
                                            [item]: e,
                                        }));
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                    <View style={{ alignItems: "center", marginBottom: 25 }}>
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor="#fff"
                            style={{ marginTop: 15 }}
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {(ans.area || ans.area === 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "A × B",
                                    denominator: 2,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                            <Fraction
                                data={{
                                    numerator: `${input.a} × ${input.b}`,
                                    denominator: 2,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${input.a * input.b}`,
                                    denominator: 2,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${ans.area}`,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <View style={[styles.flexRow, { marginTop: 25 }]}>
                                <Text style={styles.textStyle}>Perimeter</Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>2 ×</Text>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: 25,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    style={{
                                        borderTopWidth: 1.5,
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text style={styles.textStyle}>
                                        A² + B²
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flexRow, { marginTop: 10 }]}>
                                <Text style={styles.transparentTextStyle}>
                                    Perimeter
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>2 ×</Text>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: 25,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    style={{
                                        borderTopWidth: 1.5,
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text style={styles.textStyle}>
                                        {input.a}² + {input.b}²
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flexRow, { marginTop: 10 }]}>
                                <Text style={styles.transparentTextStyle}>
                                    Perimeter
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>2 ×</Text>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: 25,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    style={{
                                        borderTopWidth: 1.5,
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text style={styles.textStyle}>
                                        {input.a ** 2} + {input.b ** 2}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flexRow, { marginTop: 10 }]}>
                                <Text style={styles.transparentTextStyle}>
                                    Perimeter
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>2 ×</Text>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: 25,
                                    }}>
                                    {" √"}
                                </Text>
                                <View
                                    style={{
                                        borderTopWidth: 1.5,
                                        borderTopColor: colors.text,
                                    }}>
                                    <Text style={styles.textStyle}>
                                        {input.a ** 2 + input.b ** 2}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flexRow, { marginTop: 10 }]}>
                                <Text style={styles.transparentTextStyle}>
                                    Perimeter
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>2 ×</Text>
                                <Text style={styles.textStyle}>
                                    {" " +
                                        parseFloat(
                                            Math.sqrt(
                                                input.a ** 2 + input.b ** 2
                                            ).toFixed(2)
                                        )}
                                </Text>
                            </View>
                            <View style={[styles.flexRow, { marginTop: 10 }]}>
                                <Text style={styles.transparentTextStyle}>
                                    Perimeter
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>
                                    {ans.perimeter}
                                </Text>
                            </View>
                            <Fraction
                                data={{
                                    numerator: "Perimeter",
                                    denominator: "4",
                                    text: "Side",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.perimeter,
                                    denominator: "4",
                                    text: "Side",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.side,
                                    text: "Side",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Rhombus;
