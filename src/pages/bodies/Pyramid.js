import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";
import { parseNumber } from "../../helpers/functions";

const SA = ({ text, data, color, textVisible = false, size, style = {} }) => {
    const [rapped, setRapped] = useState(false);
    const ref = useRef();
    useEffect(() => {
        setRapped(false);
    }, [data]);
    return (
        <View
            style={{
                flexDirection: rapped ? "column" : "row",
                flexWrap: "wrap",
                marginTop: 5,
                ...style,
            }}
            ref={ref}
            onLayout={(e) => {
                if (e.nativeEvent.layout.height > 44) {
                    setRapped(true);
                } else {
                    setRapped(false);
                }
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                    style={{
                        color: textVisible ? color : "transparent",
                        fontSize: size,
                    }}>
                    {text}
                </Text>
                <Text style={{ color, fontSize: size }}>{" = "}</Text>
                {Boolean(data.first) && (
                    <Text style={{ color, fontSize: size }}>
                        {data.first} +{" "}
                    </Text>
                )}
                <Text style={{ color, fontSize: size }}>
                    {data.secondBeforeRoot}
                    {" × "}
                </Text>
                <Image
                    source={require("../../../assets/shapes/root.png")}
                    style={{
                        tintColor: color,
                        height: data.secondInsideRoot.denominator
                            ? size + 20
                            : size + 5,
                        width: data.secondInsideRoot.denominator
                            ? size
                            : size - 5,
                        marginTop: data.secondInsideRoot.denominator ? -9 : -1,
                    }}
                />
                <View
                    style={{
                        borderTopWidth: 1.5,
                        borderColor: color,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <View>
                        <Text
                            style={{
                                color,
                                fontSize: size,
                                textAlign: "center",
                            }}>
                            {data.secondInsideRoot.numerator}
                        </Text>
                        {Boolean(data.secondInsideRoot.denominator) && (
                            <Text
                                style={{
                                    color,
                                    fontSize: size,
                                    borderTopWidth: 1.5,
                                    borderColor: color,
                                    textAlign: "center",
                                }}>
                                {data.secondInsideRoot.denominator}
                            </Text>
                        )}
                    </View>
                    {Boolean(data.secondInsideRoot.secPart) && (
                        <Text style={{ color, fontSize: size }}>
                            {" + "}
                            {data.secondInsideRoot.secPart}
                        </Text>
                    )}
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Text style={{ color, fontSize: size }}> + </Text>
                <Text style={{ color, fontSize: size }}>
                    {data.thirdBeforeRoot}
                    {" × "}
                </Text>
                <Image
                    source={require("../../../assets/shapes/root.png")}
                    style={{
                        tintColor: color,
                        height: data.thirdInsideRoot.denominator
                            ? size + 20
                            : size + 5,
                        width: data.thirdInsideRoot.denominator
                            ? size
                            : size - 5,
                        marginTop: data.thirdInsideRoot.denominator ? -10 : -3,
                    }}
                />
                <View
                    style={{
                        borderTopWidth: 1.5,
                        borderColor: color,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <View>
                        <Text
                            style={{
                                color,
                                fontSize: size,
                                textAlign: "center",
                            }}>
                            {data.thirdInsideRoot.numerator}
                        </Text>
                        {Boolean(data.thirdInsideRoot.denominator) && (
                            <Text
                                style={{
                                    color,
                                    fontSize: size,
                                    borderTopWidth: 1.5,
                                    borderColor: color,
                                    textAlign: "center",
                                }}>
                                {data.thirdInsideRoot.denominator}
                            </Text>
                        )}
                    </View>
                    {Boolean(data.thirdInsideRoot.secPart) && (
                        <Text style={{ color, fontSize: size }}>
                            {" + "}
                            {data.thirdInsideRoot.secPart}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const Pyramid = (props) => {
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
    const [ans, setAns] = useState({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
    });

    const field = ["A", "B", "Height"];

    const calculate = () => {
        if (input.A === "" || input.B === "" || input.Height === "") return;
        const a = parseFloat(input.A);
        const b = parseFloat(input.B);
        const h = parseFloat(input.Height);
        if (isNaN(a) || isNaN(b) || isNaN(h)) return;
        let volume = (1 / 3) * a * b * h;
        let surfaceArea =
            a * b +
            a * Math.sqrt(Math.pow(b / 2, 2) + h * h) +
            b * Math.sqrt(Math.pow(a / 2, 2) + h * h);
        let lateralSurfaceArea =
            a * Math.sqrt(Math.pow(b / 2, 2) + h * h) +
            b * Math.sqrt(Math.pow(a / 2, 2) + h * h);
        volume = parseNumber(volume, 2);
        surfaceArea = parseNumber(surfaceArea, 2);
        lateralSurfaceArea = parseNumber(lateralSurfaceArea, 2);
        setAns({ volume, surfaceArea, lateralSurfaceArea });
        setInput((prev) => ({
            ...prev,
            a: parseNumber(a, 2),
            b: parseNumber(b, 2),
            h: parseNumber(h, 2),
        }));
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
        inputContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: 25,
        },
        inputHeader: {
            fontSize: 18,
            color: colors.secondary,
            marginVertical: 5,
            textAlign: "center",
        },
        transparentTextStyle: {
            fontSize: 18,
            color: "transparent",
        },
        textStyle: {
            fontSize: 18,
            color: colors.text,
        },
        sa: {
            flexDirection: "row",
            marginTop: 25,
            alignItems: "center",
        },
        sas: {
            flexDirection: "row",
            alignItems: "center",
        },
        rootText: {
            color: colors.text,
            fontSize: 27,
            marginTop: -7,
        },
        openBtn: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        menuHandle: {
            borderWidth: 1,
            width: 150,
            borderRadius: 7,
            paddingRight: 10,
            overflow: "hidden",
            borderColor: colors.secondary,
        },
        selected: {
            fontSize: 12,
            color: colors.text,
            padding: 10,
            textAlign: "center",
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
                        {field.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.inputHeader}>
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
                                        width={100}
                                    />
                                </View>
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
                    {(ans.volume || ans.volume === 0) && (
                        <>
                            <Fraction
                                data={{
                                    text: "Volume",
                                    numerator: "A × B × H",
                                    denominator: "3",
                                }}
                                color={colors.text}
                                bullet={false}
                                size={18}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    text: "Volume",
                                    numerator: `${input.a} × ${input.b} × ${input.h}`,
                                    denominator: "3",
                                }}
                                color={colors.text}
                                bullet={false}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    text: "Volume",
                                    numerator: `${parseNumber(
                                        input.a * input.b * input.h,
                                        2
                                    )}`,
                                    denominator: "3",
                                }}
                                color={colors.text}
                                bullet={false}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    text: "Volume",
                                    numerator: ans.volume,
                                }}
                                color={colors.text}
                                bullet={false}
                                size={18}
                                textVisible={false}
                            />
                            <SA
                                color={colors.text}
                                size={15}
                                text="SA"
                                textVisible={true}
                                data={{
                                    first: "A × B",
                                    secondBeforeRoot: "A",
                                    secondInsideRoot: {
                                        numerator: "B²",
                                        denominator: "4",
                                        hasSQRT: true,
                                        secPart: "H²",
                                    },
                                    thirdBeforeRoot: "B",
                                    thirdInsideRoot: {
                                        numerator: "A²",
                                        denominator: "4",
                                        hasSQRT: true,
                                        secPart: "H²",
                                    },
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <SA
                                color={colors.text}
                                size={15}
                                text="SA"
                                data={{
                                    first: `${input.a} × ${input.b}`,
                                    secondBeforeRoot: input.a,
                                    secondInsideRoot: {
                                        numerator: `${input.b}²`,
                                        denominator: "4",
                                        hasSQRT: true,
                                        secPart: `${input.h}²`,
                                    },
                                    thirdBeforeRoot: input.b,
                                    thirdInsideRoot: {
                                        numerator: `${input.a}²`,
                                        denominator: "4",
                                        hasSQRT: true,
                                        secPart: `${input.h}²`,
                                    },
                                }}
                            />
                            <SA
                                color={colors.text}
                                size={15}
                                text="SA"
                                data={{
                                    first: parseNumber(input.a * input.b, 2),
                                    secondBeforeRoot: input.a,
                                    secondInsideRoot: {
                                        numerator: parseNumber(input.b ** 2, 2),
                                        denominator: "4",
                                        hasSQRT: true,
                                        secPart: parseNumber(input.h ** 2, 2),
                                    },
                                    thirdBeforeRoot: input.b,
                                    thirdInsideRoot: {
                                        numerator: parseNumber(input.a ** 2, 2),
                                        denominator: "4",
                                        hasSQRT: true,
                                        secPart: parseNumber(input.h ** 2, 2),
                                    },
                                }}
                            />
                            <SA
                                color={colors.text}
                                size={15}
                                text="SA"
                                data={{
                                    first: parseNumber(input.a * input.b, 2),
                                    secondBeforeRoot: input.a,
                                    secondInsideRoot: {
                                        numerator: parseNumber(
                                            input.b ** 2 / 4,
                                            2
                                        ),
                                        hasSQRT: true,
                                        secPart: parseNumber(input.h ** 2, 2),
                                    },
                                    thirdBeforeRoot: input.b,
                                    thirdInsideRoot: {
                                        numerator: parseNumber(
                                            input.a ** 2 / 4,
                                            2
                                        ),
                                        hasSQRT: true,
                                        secPart: parseNumber(input.h ** 2, 2),
                                    },
                                }}
                            />
                            <SA
                                color={colors.text}
                                size={15}
                                text="SA"
                                data={{
                                    first: parseNumber(input.a * input.b, 2),
                                    secondBeforeRoot: input.a,
                                    secondInsideRoot: {
                                        numerator: parseNumber(
                                            input.b ** 2 / 4 + input.h ** 2,
                                            2
                                        ),
                                        hasSQRT: true,
                                    },
                                    thirdBeforeRoot: input.b,
                                    thirdInsideRoot: {
                                        numerator: parseNumber(
                                            input.a ** 2 / 4 + input.h ** 2,
                                            2
                                        ),
                                        hasSQRT: true,
                                    },
                                }}
                            />
                            <Fraction
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                                data={{
                                    text: "SA",
                                    numerator: `${parseNumber(
                                        input.a * input.b
                                    )} + ${input.a} × ${parseNumber(
                                        Math.sqrt(
                                            (input.b ** 2 + 4 * input.h ** 2) /
                                                4
                                        ),
                                        2
                                    )} + ${input.b} × ${parseNumber(
                                        Math.sqrt(
                                            (input.a ** 2 + 4 * input.h ** 2) /
                                                4
                                        ),
                                        2
                                    )}`,
                                }}
                            />
                            <Fraction
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                                data={{
                                    text: "SA",
                                    numerator: `${parseNumber(
                                        input.a * input.b
                                    )} + ${parseNumber(
                                        input.a *
                                            Math.sqrt(
                                                (input.b ** 2 +
                                                    4 * input.h ** 2) /
                                                    4
                                            ),
                                        2
                                    )} + ${parseNumber(
                                        input.b *
                                            Math.sqrt(
                                                (input.a ** 2 +
                                                    4 * input.h ** 2) /
                                                    4
                                            ),
                                        2
                                    )}`,
                                }}
                            />
                            <Fraction
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                                data={{
                                    text: "SA",
                                    numerator: ans.surfaceArea,
                                }}
                            />
                            <Fraction
                                size={18}
                                color={colors.text}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `SA - A × B`,
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                size={18}
                                color={colors.text}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `${ans.surfaceArea} - ${input.a} × ${input.b}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                size={18}
                                color={colors.text}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `${ans.surfaceArea} - ${
                                        input.a * input.b
                                    }`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                size={18}
                                color={colors.text}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: ans.lateralSurfaceArea,
                                }}
                                textVisible={false}
                            />
                            <View style={{ marginTop: 25 }}>
                                <Text
                                    style={[
                                        styles.rootText,
                                        { color: colors.secondary },
                                    ]}>
                                    Note :
                                </Text>
                                <Text style={styles.textStyle}>
                                    SA = Surface Area
                                </Text>
                                <Text style={styles.textStyle}>
                                    LSA = Lateral Surface Area
                                </Text>
                            </View>
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Pyramid;
