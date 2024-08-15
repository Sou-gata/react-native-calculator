import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../types";
import { parseNumber } from "../../helpers/functions";

const Pentagon = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        S: "",
        s: 0,
    });
    const [ans, setAns] = useState<{
        area: number;
        perimeter: number;
    }>();
    const calculate = () => {
        if (input.S === "") return;
        const s = parseFloat(input.S);
        if (isNaN(s)) return;
        let area = (5 * s * s) / (4 * Math.tan((36 * Math.PI) / 180));
        let perimeter = 5 * s;
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        setAns({ area, perimeter });
        setInput((prev) => ({ ...prev, s: parseNumber(s, 2) }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 210,
            height: 200,
            alignSelf: "center",
            tintColor: colors.text,
        },
        inputContainer: {
            marginTop: 25,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
        },
        transparentTextStyle: {
            fontSize: 18,
            color: "transparent",
        },
        textStyle: {
            fontSize: 18,
            color: colors.text,
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
                        <Text style={styles.textStyle}>Side</Text>
                        <CustomInput
                            placeholder="Side"
                            width={100}
                            value={input.S}
                            onChangeText={(e) => {
                                setInput((prev) => ({ ...prev, S: e }));
                            }}
                        />
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
                    {(ans?.area || ans?.area === 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "5 × S²",
                                    denominator: "4 × tan(36°)",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                            />
                            <Fraction
                                data={{
                                    numerator: `5 × ${input.s}²`,
                                    denominator: "4 × tan(36°)",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `5 × ${input.s}²`,
                                    denominator: "4 × 0.73",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `5 × ${input.s ** 2}`,
                                    denominator: "2.91",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${parseFloat(
                                        (5 * input.s ** 2).toFixed(2)
                                    )}`,
                                    denominator: "2.91",
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.area,
                                    text: "Area",
                                }}
                                bullet={false}
                                size={18}
                                color={colors.text}
                                textVisible={false}
                            />
                            <View style={{ marginTop: 25 }}>
                                <Fraction
                                    data={{
                                        numerator: "5 × S",
                                        text: "Perimeter",
                                    }}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                />
                                <Fraction
                                    data={{
                                        numerator: `5 × ${input.s}`,
                                        text: "Perimeter",
                                    }}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
                                    textVisible={false}
                                />
                                <Fraction
                                    data={{
                                        numerator: ans.perimeter,
                                        text: "Perimeter",
                                    }}
                                    bullet={false}
                                    size={18}
                                    color={colors.text}
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

export default Pentagon;
