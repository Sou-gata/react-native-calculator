import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";
import { parseNumber } from "../../helpers/functions";

const TriangularPrism = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({
        Side: "",
        Height: "",
        s: 0,
        h: 0,
    });
    const [ans, setAns] = useState({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
    });
    const field = ["Side", "Height"];
    const calculate = () => {
        if (input.Side === "" || input.Height === "") return;
        const s = parseFloat(input.Side);
        const h = parseFloat(input.Height);
        if (isNaN(s) || isNaN(h)) return;
        let volume = (Math.sqrt(3) * s * s * h) / 4;
        let surfaceArea = 3 * s * h + (Math.sqrt(3) * s * s) / 2;
        let lateralSurfaceArea = 3 * s * h;
        volume = parseNumber(volume, 2);
        surfaceArea = parseNumber(surfaceArea, 2);
        lateralSurfaceArea = parseNumber(lateralSurfaceArea, 2);
        setAns({
            volume,
            surfaceArea,
            lateralSurfaceArea,
        });
        setInput((prev) => ({
            ...prev,
            s: parseNumber(s, 2),
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
            width: 225,
            height: 172,
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
                        {field.map((item, index) => (
                            <View key={index}>
                                <Text style={styles.inputHeader}>{item}</Text>
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
                    {(ans.volume || ans.volume === 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "√3 × S² × H",
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `√3 × ${input.s}² × ${input.h}`,
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `√3 × ${parseNumber(
                                        input.s ** 2,
                                        2
                                    )} × ${input.h}`,
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: parseNumber(
                                        input.s ** 2 * input.h * Math.sqrt(3),
                                        2
                                    ),
                                    denominator: "4",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.volume ? ans.volume : "",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <View style={styles.sa}>
                                <Fraction
                                    data={{
                                        numerator: "√3 × S²",
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                />
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { marginTop: 9 },
                                    ]}>
                                    {" + 3 × S × H"}
                                </Text>
                            </View>
                            <View style={styles.sas}>
                                <Fraction
                                    data={{
                                        numerator: `√3 × ${input.s}²`,
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { marginTop: 9 },
                                    ]}>
                                    {" + "}3 × {input.s} × {input.h}
                                </Text>
                            </View>
                            <View style={styles.sas}>
                                <Fraction
                                    data={{
                                        numerator: `√3 × ${parseNumber(
                                            input.s ** 2,
                                            2
                                        )}`,
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { marginTop: 9 },
                                    ]}>
                                    {" + "}
                                    {parseNumber(3 * input.s * input.h, 2)}
                                </Text>
                            </View>
                            <View style={styles.sas}>
                                <Fraction
                                    data={{
                                        numerator: `${parseNumber(
                                            input.s ** 2 * Math.sqrt(3),
                                            2
                                        )}`,
                                        denominator: "2",
                                        text: "SA",
                                    }}
                                    size={18}
                                    color={colors.text}
                                    bullet={false}
                                    textVisible={false}
                                />
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { marginTop: 9 },
                                    ]}>
                                    {" + "}
                                    {parseNumber(3 * input.s * input.h, 2)}
                                </Text>
                            </View>
                            <Fraction
                                data={{
                                    numerator: `${parseNumber(
                                        (input.s ** 2 * Math.sqrt(3)) / 2,
                                        2
                                    )} + ${parseNumber(
                                        3 * input.s * input.h,
                                        2
                                    )}`,
                                    text: "SA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.surfaceArea,
                                    text: "SA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "3 × S × H",
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `3 × ${input.s} × ${input.h}`,
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.lateralSurfaceArea,
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
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

export default TriangularPrism;
