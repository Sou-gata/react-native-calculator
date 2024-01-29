import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";
import { parseNumber } from "../../helpers/functions";

const HemiSphere = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({
        Radious: "",
        Height: "",
        r: 0,
        h: 0,
    });
    const [ans, setAns] = useState({
        volume: undefined,
        surfaceArea: 0,
        lateralSurfaceArea: 0,
    });
    const field = ["Radious"];
    const calculate = () => {
        if (input.Radious === "") return;
        const r = Math.abs(parseFloat(input.Radious));
        if (isNaN(r)) return;
        const volume = (2 / 3) * Math.PI * r * r * r;
        const surfaceArea = 3 * Math.PI * r * r;
        const lateralSurfaceArea = 2 * Math.PI * r * r;
        setAns({
            volume: parseNumber(volume, 2),
            surfaceArea: parseNumber(surfaceArea, 2),
            lateralSurfaceArea: parseNumber(lateralSurfaceArea, 2),
        });
        setInput((prev) => ({ ...prev, r }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 250,
            height: 150,
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
        root: {
            color: colors.text,
            fontSize: 28,
            marginTop: -8,
        },
        underRootText: {
            color: colors.text,
            fontSize: 18,
            borderTopWidth: 1.5,
            borderTopColor: colors.text,
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
                            textColor="#fff"
                            style={{ marginTop: 15 }}
                            onPress={() => calculate()}>
                            {" "}
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
                                    numerator: "2 × π × R³",
                                    denominator: "3",
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `2 × π × ${input.r}³`,
                                    denominator: "3",
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: `2 × 3.14 × ${parseNumber(
                                        input.r ** 2 * input.r,
                                        2
                                    )}`,
                                    denominator: "3",
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
                                        2 * Math.PI * input.r ** 2 * input.r,
                                        2
                                    )}`,
                                    denominator: "3",
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "Volume",
                                    numerator: ans.volume,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: "3 × π × R²",
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `3 × π × ${input.r}²`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: `3 × 3.14 × ${input.r ** 2}`,
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
                                    numerator: "2 × π × R²",
                                }}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `2 × π × ${input.r}²`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "LSA",
                                    numerator: `2 × 3.14 × ${input.r ** 2}`,
                                }}
                                textVisible={false}
                            />
                            <Fraction
                                color={colors.text}
                                size={18}
                                bullet={false}
                                data={{
                                    text: "SA",
                                    numerator: ans.lateralSurfaceArea,
                                }}
                                textVisible={false}
                            />
                            <View style={{ marginTop: 25 }}>
                                <Text
                                    style={[
                                        styles.root,
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

export default HemiSphere;
