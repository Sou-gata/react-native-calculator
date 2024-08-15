import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../types";
import { parseNumber } from "../../helpers/functions";

const Ellipse = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;

    const [input, setInput] = useState({
        A: "",
        B: "",
        a: 0,
        b: 0,
    });
    const [ans, setAns] = useState<{
        area: number;
        perimeter: number;
    }>();
    const calculate = () => {
        if (input.A === "" || input.B === "") return;
        const a = parseFloat(input.A);
        const b = parseFloat(input.B);
        if (isNaN(a) || isNaN(b)) return;
        let area = Math.PI * a * b;
        let perimeter = 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        setAns({ area, perimeter });
        setInput((prev) => ({
            ...prev,
            a: parseFloat(a.toFixed(2)),
            b: parseFloat(b.toFixed(2)),
        }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 250,
            height: 165,
            alignSelf: "center",
            tintColor: colors.text,
        },
        topText: {
            fontSize: 18,
            textAlign: "center",
            color: colors.secondary,
        },
        textStyle: {
            fontSize: 18,
            color: colors.text,
        },
        transparentText: {
            fontSize: 18,
            color: "transparent",
        },
        inputContainer: {
            marginTop: 25,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
        },
        btnContainer: {
            alignItems: "center",
            marginBottom: 25,
        },
        flexRow: {
            flexDirection: "row",
        },
        flexCenter: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
        },
        flexRowCenter: {
            flexDirection: "row",
            alignItems: "center",
        },
        rootoverStyle: {
            height: 45,
            width: 16,
            tintColor: colors.text,
            marginTop: -10,
            marginLeft: 2,
        },
        numeratorStyle: {
            fontSize: 18,
            color: colors.text,
            textAlign: "center",
            borderTopColor: colors.text,
            borderTopWidth: 1.5,
            paddingVertical: 2,
        },
        denominatorStyle: {
            fontSize: 18,
            color: colors.text,
            textAlign: "center",
            borderTopColor: colors.text,
            borderTopWidth: 1.5,
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
                                <Text style={styles.topText}>{item}</Text>
                                <CustomInput
                                    placeholder={item}
                                    value={input[item as keyof object]}
                                    onChangeText={(e) => {
                                        setInput((prev) => ({
                                            ...prev,
                                            [item]: e,
                                        }));
                                    }}
                                    width={100}
                                    maxLength={8}
                                />
                            </View>
                        ))}
                    </View>
                    <View style={styles.btnContainer}>
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor="#fff"
                            style={{ marginTop: 15 }}
                            onPress={() => calculate()}>
                            Calculate
                        </Button>
                    </View>
                    {(ans?.area || ans?.area == 0) && (
                        <>
                            <Fraction
                                data={{
                                    text: "Area",
                                    numerator: "π × A × B",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    text: "Area",
                                    numerator: `3.14 × ${input.a} × ${input.b}`,
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    text: "Area",
                                    numerator: `${ans?.area}`,
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View style={{ marginTop: 25 }}>
                                <View style={styles.flexRowCenter}>
                                    <Text style={styles.textStyle}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}> = </Text>
                                    <Text style={styles.textStyle}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View style={styles.flexCenter}>
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            style={styles.rootoverStyle}
                                        />
                                        <View>
                                            <Text style={styles.numeratorStyle}>
                                                (A² + B²)
                                            </Text>
                                            <Text
                                                style={styles.denominatorStyle}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.flexRowCenter}>
                                    <Text style={styles.transparentText}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}> = </Text>
                                    <Text style={styles.textStyle}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View style={styles.flexCenter}>
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            style={styles.rootoverStyle}
                                        />
                                        <View>
                                            <Text style={styles.numeratorStyle}>
                                                ({input.a}² + {input.b}²)
                                            </Text>
                                            <Text
                                                style={styles.denominatorStyle}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.flexRowCenter}>
                                    <Text style={styles.transparentText}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}> = </Text>
                                    <Text style={styles.textStyle}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View style={styles.flexCenter}>
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            style={styles.rootoverStyle}
                                        />
                                        <View>
                                            <Text style={styles.numeratorStyle}>
                                                (
                                                {parseFloat(
                                                    (input.a ** 2).toFixed(2)
                                                )}
                                                {" + "}
                                                {parseFloat(
                                                    (input.b ** 2).toFixed(2)
                                                )}
                                                )
                                            </Text>
                                            <Text
                                                style={styles.denominatorStyle}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.flexRowCenter}>
                                    <Text style={styles.transparentText}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}> = </Text>
                                    <Text style={styles.textStyle}>
                                        2 × π ×{" "}
                                    </Text>
                                    <View style={styles.flexCenter}>
                                        <Image
                                            source={require("../../../assets/shapes/root.png")}
                                            style={styles.rootoverStyle}
                                        />
                                        <View>
                                            <Text style={styles.numeratorStyle}>
                                                {parseFloat(
                                                    (
                                                        input.a ** 2 +
                                                        input.b ** 2
                                                    ).toFixed(2)
                                                )}
                                            </Text>
                                            <Text
                                                style={styles.denominatorStyle}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.flexRowCenter}>
                                    <Text style={styles.transparentText}>
                                        Perimeter
                                    </Text>
                                    <Text style={styles.textStyle}> = </Text>
                                    <Text style={styles.textStyle}>
                                        2 × π ×{" "}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { fontSize: 25, marginTop: -10 },
                                        ]}>
                                        √
                                    </Text>
                                    <View>
                                        <Text
                                            style={[
                                                styles.textStyle,
                                                {
                                                    borderTopWidth: 1.5,
                                                    borderTopColor: colors.text,
                                                },
                                            ]}>
                                            {parseFloat(
                                                (
                                                    (input.a ** 2 +
                                                        input.b ** 2) *
                                                    0.5
                                                ).toFixed(2)
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Fraction
                                size={18}
                                data={{
                                    text: "Perimeter",
                                    numerator: `2 × 3.14 × ${parseFloat(
                                        Math.sqrt(
                                            (input.a ** 2 + input.b ** 2) * 0.5
                                        ).toFixed(2)
                                    )}`,
                                }}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                size={18}
                                data={{
                                    text: "Perimeter",
                                    numerator: ans?.perimeter
                                        ? ans.perimeter.toString()
                                        : "",
                                }}
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

export default Ellipse;
