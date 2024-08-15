import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { parseNumber } from "../../helpers/functions";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { colorSchemeType, shapeType } from "../../../types";

const CircleArc = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;

    const [input, setInput] = useState({
        R: "",
        A: "",
        r: 0,
        a: 0,
    });
    const [ans, setAns] = useState<{ area: number; perimeter: number }>();
    const calculate = () => {
        if (input.R === "" || input.A === "") return;
        const r = parseFloat(input.R);
        const a = parseFloat(input.A);
        if (isNaN(r) || isNaN(a)) return;
        let area = (Math.PI * r * r * a) / 360;
        let perimeter = 2 * Math.PI * r * (a / 360);
        area = parseNumber(area, 2);
        perimeter = parseNumber(perimeter, 2);
        setAns({ area, perimeter });
        setInput((prev) => ({
            ...prev,
            r: parseNumber(r, 2),
            a: parseNumber(a, 2),
        }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 180,
            height: 182,
            alignSelf: "center",
            tintColor: colors.text,
        },
        topText: {
            color: colors.text,
            fontSize: 18,
            marginVertical: 10,
        },
        textStyle: {
            fontSize: 18,
            color: colors.text,
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
                        {shapeDetails?.field.map(
                            (item: string, index: number) => (
                                <View key={index}>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            {
                                                textAlign: "center",
                                                color: colors.secondary,
                                            },
                                        ]}>
                                        {item === "R"
                                            ? "Radius"
                                            : item === "A"
                                            ? "Angle °"
                                            : item}
                                    </Text>
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
                            )
                        )}
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
                    {(ans?.area || ans?.area === 0) && (
                        <>
                            <Fraction
                                data={{
                                    numerator: "π × R² × A",
                                    denominator: "360",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `π × ${input.r}² × ${input.a}`,
                                    denominator: "360",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `3.14 × ${parseFloat(
                                        (input.r ** 2).toFixed(2)
                                    )} × ${input.a}`,
                                    denominator: "360",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: (
                                        Math.PI *
                                        input.r ** 2 *
                                        input.a
                                    ).toFixed(2),
                                    denominator: "360",
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.area.toString(),
                                    text: "Area",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "π × R × A",
                                    denominator: "180",
                                    text: "Arc's Length",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `3.14 × ${input.r} × ${input.a}`,
                                    denominator: "180",
                                    text: "Arc's Length",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${parseFloat(
                                        (Math.PI * input.r * input.a).toFixed(2)
                                    )}`,
                                    denominator: "180",
                                    text: "Arc's Length",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${ans.perimeter}`,
                                    text: "Arc's Length",
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

export default CircleArc;
