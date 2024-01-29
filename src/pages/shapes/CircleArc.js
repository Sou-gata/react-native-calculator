import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";
const CircleArc = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({
        R: "",
        A: "",
        r: 0,
        a: 0,
    });
    const [ans, setAns] = useState({
        area: undefined,
        perimeter: 0,
    });
    const calculate = () => {
        if (input.R === "" || input.A === "") return;
        const r = parseFloat(input.R);
        const a = parseFloat(input.A);
        if (isNaN(r) || isNaN(a)) return;
        let area = (Math.PI * r * r * a) / 360;
        let perimeter = 2 * Math.PI * r * (a / 360);
        area = area.toFixed(2);
        perimeter = perimeter.toFixed(2);
        area = parseFloat(area);
        perimeter = parseFloat(perimeter);
        setAns({ area, perimeter });
        setInput((prev) => ({
            ...prev,
            r: parseFloat(r.toFixed(2)),
            a: parseFloat(a.toFixed(2)),
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
                                    {item === "R"
                                        ? "Radius"
                                        : item === "A"
                                        ? "Angle °"
                                        : item}
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
                    {(ans.area || ans.area === 0) && (
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
                                    numerator: ans.area,
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
