import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import Fraction from "../../components/Fraction";
import { bodyType, colorSchemeType } from "../../../types";
import { RouteProp, useRoute } from "@react-navigation/native";

const Cuboid = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: bodyType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Length: "",
        Breadth: "",
        Height: "",
        l: 0,
        b: 0,
        h: 0,
    });
    const [ans, setAns] = useState<{
        volume: undefined | number;
        surfaceArea: number;
        lateralSurfaceArea: number;
        diagonal: number;
    }>({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
        diagonal: 0,
    });
    const field = ["Length", "Breadth", "Height"];
    const calculate = () => {
        if (input.Length === "" || input.Breadth === "" || input.Height === "")
            return;
        const l = parseFloat(input.Length);
        const b = parseFloat(input.Breadth);
        const h = parseFloat(input.Height);
        if (isNaN(l) || isNaN(b) || isNaN(h)) return;
        let volume = l * b * h;
        let surfaceArea = 2 * (l * b + b * h + h * l);
        let lateralSurfaceArea = 2 * h * (l + b);
        let diagonal = Math.sqrt(l * l + b * b + h * h);
        volume = parseFloat(volume.toFixed(2));
        surfaceArea = parseFloat(surfaceArea.toFixed(2));
        lateralSurfaceArea = parseFloat(lateralSurfaceArea.toFixed(2));
        diagonal = parseFloat(diagonal.toFixed(2));
        setAns({
            volume,
            surfaceArea,
            lateralSurfaceArea,
            diagonal,
        });
        setInput((prev) => ({
            ...prev,
            l: parseFloat(l.toFixed(2)),
            b: parseFloat(b.toFixed(2)),
            h: parseFloat(h.toFixed(2)),
        }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 215,
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
        rootText: {
            color: colors.text,
            fontSize: 27,
            marginTop: -7,
        },
        underRootText: {
            fontSize: 18,
            color: colors.text,
            borderTopWidth: 1.5,
            borderTopColor: colors.text,
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
                                    numerator: "L × B × H",
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `${input.l} × ${input.b} × ${input.h}`,
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.volume,
                                    text: "Volume",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × (L × B + B × H + H × L)",
                                    text: "SA",
                                }}
                                size={15}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × (${input.l} × ${input.b} + ${input.b} × ${input.h} + ${input.h} × ${input.l})`,
                                    text: "SA",
                                }}
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × (${parseFloat(
                                        (input.l * input.b).toFixed(2)
                                    )} + ${parseFloat(
                                        (input.b * input.h).toFixed(2)
                                    )} + ${parseFloat(
                                        (input.h * input.l).toFixed(2)
                                    )})`,
                                    text: "SA",
                                }}
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${parseFloat(
                                        (
                                            input.l * input.b +
                                            input.b * input.h +
                                            input.h * input.l
                                        ).toFixed(2)
                                    )}`,
                                    text: "SA",
                                }}
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.surfaceArea,
                                    text: "SA",
                                }}
                                size={15}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × H × (L + B)",
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${input.h} × (${input.l} + ${input.b})`,
                                    text: "LSA",
                                }}
                                size={18}
                                color={colors.text}
                                bullet={false}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${input.h} × ${
                                        input.l + input.b
                                    }`,
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
                            <View
                                style={{ marginTop: 25, flexDirection: "row" }}>
                                <Text style={styles.textStyle}>Diagonal</Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.rootText}>√</Text>
                                <Text style={styles.underRootText}>
                                    L² + B² + H²
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    Diagonal
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.rootText}>√</Text>
                                <Text style={styles.underRootText}>
                                    {input.l}² + {input.b}² + {input.h}²
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    Diagonal
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.rootText}>√</Text>
                                <Text style={styles.underRootText}>
                                    {parseFloat((input.l ** 2).toFixed(2))} +{" "}
                                    {parseFloat((input.b ** 2).toFixed(2))} +{" "}
                                    {parseFloat((input.h ** 2).toFixed(2))}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    Diagonal
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.rootText}>√</Text>
                                <Text style={styles.underRootText}>
                                    {parseFloat(
                                        (
                                            input.l ** 2 +
                                            input.b ** 2 +
                                            input.h ** 2
                                        ).toFixed(2)
                                    )}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.transparentTextStyle}>
                                    Diagonal
                                </Text>
                                <Text style={styles.textStyle}>{" = "}</Text>
                                <Text style={styles.textStyle}>
                                    {ans.diagonal}
                                </Text>
                            </View>
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

export default Cuboid;
