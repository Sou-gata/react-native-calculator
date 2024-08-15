import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { parseNumber } from "../../helpers/functions";
import { colorSchemeType, shapeType } from "../../../types";

const Hexagon = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        S: "",
        s: 0,
    });
    const [ans, setAns] = useState<{ area: number; perimeter: number }>();
    const calculate = () => {
        if (input.S === "") return;
        const s = parseFloat(input.S);
        if (isNaN(s)) return;
        let area = (3 * s * s * Math.sqrt(3)) / 2;
        let perimeter = 6 * s;
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
            width: 230,
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
            <Image source={shapeDetails.mainImage} style={styles.image} />
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
                    textColor={"white"}
                    style={{ marginTop: 15 }}
                    onPress={() => calculate()}>
                    Calculate
                </Button>
            </View>
            {(ans?.area || ans?.area === 0) && (
                <>
                    <Fraction
                        data={{
                            numerator: "3 × sin(60°) × S²",
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                    />
                    <Fraction
                        data={{
                            numerator: `3  × 0.87 × ${input.s}²`,
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                        textVisible={false}
                    />
                    <Fraction
                        data={{
                            numerator: `2.6 × ${input.s}²`,
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                        textVisible={false}
                    />
                    <Fraction
                        data={{
                            numerator: `2.6 × ${parseFloat(
                                (input.s ** 2).toFixed(2)
                            )}`,
                            text: "Area",
                        }}
                        bullet={false}
                        size={18}
                        color={colors.text}
                        textVisible={false}
                    />
                    <Fraction
                        data={{
                            numerator: ans.area.toString(),
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
                                numerator: "6 × S",
                                text: "Perimeter",
                            }}
                            bullet={false}
                            size={18}
                            color={colors.text}
                        />
                        <Fraction
                            data={{
                                numerator: `6 × ${input.s}`,
                                text: "Perimeter",
                            }}
                            bullet={false}
                            size={18}
                            color={colors.text}
                            textVisible={false}
                        />
                        <Fraction
                            data={{
                                numerator: ans.perimeter.toString(),
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
        </View>
    );
};

export default Hexagon;
