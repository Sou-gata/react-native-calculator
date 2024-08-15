import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { parseNumber } from "../../helpers/functions";
import { bodyType, colorSchemeType } from "../../../types";
import { RouteProp, useRoute } from "@react-navigation/native";

const Cylinder = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: bodyType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Radious: "",
        Height: "",
        r: 0,
        h: 0,
    });
    const [ans, setAns] = useState<{
        volume: undefined | number;
        surfaceArea: number;
        lateralSurfaceArea: number;
    }>({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
    });
    const field = ["Radious", "Height"];
    const calculate = () => {
        if (input.Radious === "" || input.Height === "") return;
        const r = Math.abs(parseFloat(input.Radious));
        const h = Math.abs(parseFloat(input.Height));
        if (isNaN(r) || isNaN(h)) return;
        const volume = Math.PI * r * r * h;
        const surfaceArea = 2 * Math.PI * r * (h + r);
        const lateralSurfaceArea = Math.PI * r * h;
        setAns({
            volume: parseNumber(volume, 2),
            surfaceArea: parseNumber(surfaceArea, 2),
            lateralSurfaceArea: parseNumber(lateralSurfaceArea, 2),
        });
        setInput((prev) => ({ ...prev, r, h }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 140,
            height: 212,
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
        parentContainer: {
            marginTop: 25,
            flexDirection: "row",
            alignItems: "center",
        },

        flexRowCenter: {
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
                        {field.map((item, index) => (
                            <View key={index}>
                                <Text style={styles.inputHeader}>{item}</Text>
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
                                />
                            </View>
                        ))}
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
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: "π × R² × H",
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `π × ${input.r}² × ${input.h}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `3.14 × ${parseNumber(
                                        input.r ** 2,
                                        2
                                    )} × ${input.h}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `${parseNumber(
                                        Math.PI * input.r ** 2 * input.h,
                                        2
                                    )}`,
                                }}
                                textVisible={false}
                            />

                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: "2 × π × R × (R + H)",
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `2 × π × ${input.r} × (${input.r} + ${input.h})`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `2 × 3.14 × ${input.r} × ${
                                        input.r + input.h
                                    }`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: ans.surfaceArea,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `2 × π × R × H`,
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `2 × π × ${input.r} × ${input.h}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `2 × 3.14 × ${parseNumber(
                                        input.r * input.h,
                                        2
                                    )}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: ans.lateralSurfaceArea,
                                }}
                                textVisible={false}
                            />
                            <View style={{ marginTop: 25 }}>
                                <Text
                                    style={{
                                        color: colors.secondary,
                                        fontSize: 24,
                                    }}>
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

export default Cylinder;
