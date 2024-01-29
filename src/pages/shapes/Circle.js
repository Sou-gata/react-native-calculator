import { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { Fraction } from "../UsefulFormulas";

const Circle = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({
        R: "",
        r: 0,
    });
    const [ans, setAns] = useState({
        area: undefined,
        perimeter: 0,
        diameter: 0,
    });
    const calculate = () => {
        if (input.R === "") return;
        const r = parseFloat(input.R);
        if (isNaN(r)) return;
        let area = Math.PI * r * r;
        let perimeter = 2 * Math.PI * r;
        let diameter = 2 * r;
        area = area.toFixed(2);
        perimeter = perimeter.toFixed(2);
        diameter = diameter.toFixed(2);
        area = parseFloat(area);
        perimeter = parseFloat(perimeter);
        diameter = parseFloat(diameter);
        setAns({ area, perimeter, diameter });
        setInput((prev) => ({ ...prev, r: parseFloat(r.toFixed(2)) }));
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 180,
            height: 180,
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
                        <Text style={styles.textStyle}>Radious</Text>
                        <CustomInput
                            placeholder="R"
                            width={100}
                            value={input.R}
                            onChangeText={(e) => {
                                setInput((prev) => ({ ...prev, R: e }));
                            }}
                        />
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
                                data={{ numerator: "π × R²", text: "Area" }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                            />
                            <Fraction
                                data={{
                                    numerator: `π × ${input.r}²`,
                                    text: "Area",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: `${Math.PI.toFixed(2)} × ${
                                        input.r ** 2
                                    }`,
                                    text: "Area",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.area,
                                    text: "Area",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × π × R",
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: `2 × ${Math.PI.toFixed(2)} × ${
                                        input.r
                                    }`,
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.perimeter,
                                    text: "Perimeter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × R",
                                    text: "Diameter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                style={{ marginTop: 25 }}
                            />
                            <Fraction
                                data={{
                                    numerator: "2 × " + input.r,
                                    text: "Diameter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                            <Fraction
                                data={{
                                    numerator: ans.diameter,
                                    text: "Diameter",
                                }}
                                bullet={false}
                                color={colors.text}
                                size={18}
                                textVisible={false}
                            />
                        </>
                    )}
                </>
            </ScrollView>
        </View>
    );
};

export default Circle;
