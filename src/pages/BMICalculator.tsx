import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { colorSchemeType } from "../../types";

const BMICalculator = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [height, setHeight] = useState({ m: "", cm: "", ft: "", in: "" });
    const [weight, setWeight] = useState({ kg: "", g: "", lb: "", oz: "" });
    const [unit, setUnit] = useState("Metric");
    const [result, setResult] = useState({
        bmi: "",
        category: "",
    });
    const width = parseFloat(
        ((Dimensions.get("window").width - 50) / 3).toFixed(2)
    );
    const bmiRanges = [
        { category: "Category", range: "Range" },
        { category: "Severe Thinness", range: "< 16" },
        { category: "Moderate Thinness", range: "16 - 17" },
        { category: "Mild Thinness", range: "17 - 18.5" },
        { category: "Normal", range: "18.5 - 25" },
        { category: "Overweight", range: "25 - 30" },
        { category: "Obese Class I", range: "30 - 35" },
        { category: "Obese Class II", range: "35 - 40" },
        { category: "Obese Class III", range: "> 40" },
    ];
    const calculate = () => {
        let bmi = "";
        let category = "";
        if (unit === "Metric") {
            if (height.m !== "" && weight.kg !== "") {
                if (height.cm === "") height.cm = "0";
                if (weight.g === "") weight.g = "0";
                const h = parseFloat(height.m) + parseFloat(height.cm) / 100;
                const w = parseFloat(weight.kg) + parseFloat(weight.g) / 1000;
                bmi = (w / (h * h)).toFixed(2);
            }
        } else {
            if (height.ft !== "" && weight.lb !== "") {
                if (height.in === "") height.in = "0";
                if (weight.oz === "") weight.oz = "0";
                const h = parseFloat(height.ft) * 12 + parseFloat(height.in);
                const w = parseFloat(weight.lb) + parseFloat(weight.oz) / 16;
                bmi = ((w * 703) / (h * h)).toFixed(2);
            }
        }
        const bmiNum = parseFloat(bmi);
        if (bmiNum < 16) category = "Severe Thinness";
        else if (bmiNum >= 16 && bmiNum < 17) category = "Moderate Thinness";
        else if (bmiNum >= 17 && bmiNum < 18.5) category = "Mild Thinness";
        else if (bmiNum >= 18.5 && bmiNum < 25) category = "Normal";
        else if (bmiNum >= 25 && bmiNum < 30) category = "Overweight";
        else if (bmiNum >= 30 && bmiNum < 35) category = "Obese Class I";
        else if (bmiNum >= 35 && bmiNum < 40) category = "Obese Class II";
        else if (bmiNum >= 40) category = "Obese Class III";
        setResult({ bmi, category });
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.backgroundColor,
            }}>
            <View style={styles.rowContainer}>
                <View style={{ width }}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Height:
                    </Text>
                </View>
                <CustomInput
                    placeholder={unit === "Metric" ? "m" : "ft"}
                    width={width}
                    value={unit === "Metric" ? height.m : height.ft}
                    onChangeText={(e) => {
                        if (unit === "Metric") setHeight({ ...height, m: e });
                        else setHeight({ ...height, ft: e });
                    }}
                />
                <CustomInput
                    placeholder={unit === "Metric" ? "cm" : "in"}
                    width={width}
                    value={unit === "Metric" ? height.cm : height.in}
                    onChangeText={(e) => {
                        if (unit === "Metric") setHeight({ ...height, cm: e });
                        else setHeight({ ...height, in: e });
                    }}
                />
            </View>
            <View style={styles.rowContainer}>
                <View style={{ width }}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Weight:
                    </Text>
                </View>
                <CustomInput
                    placeholder={unit === "Metric" ? "kg" : "lb"}
                    width={width}
                    value={unit === "Metric" ? weight.kg : weight.lb}
                    onChangeText={(e) => {
                        if (unit === "Metric") setWeight({ ...weight, kg: e });
                        else setWeight({ ...weight, lb: e });
                    }}
                />
                <CustomInput
                    placeholder={unit === "Metric" ? "g" : "oz"}
                    width={width}
                    value={unit === "Metric" ? weight.g : weight.oz}
                    onChangeText={(e) => {
                        if (unit === "Metric") setWeight({ ...weight, g: e });
                        else setWeight({ ...weight, oz: e });
                    }}
                />
            </View>
            <View style={styles.rowContainer}>
                <View style={{ width }}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        Unit:
                    </Text>
                </View>
                <Pressable
                    onPress={() => {
                        setUnit((prev) =>
                            prev === "Metric" ? "Imperial" : "Metric"
                        );
                        setHeight({ m: "", cm: "", ft: "", in: "" });
                        setWeight({ kg: "", g: "", lb: "", oz: "" });
                    }}
                    style={{
                        width,
                        height: 40,
                        borderColor: colors.secondary,
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            color: colors.secondary,
                            fontSize: 17,
                        }}>
                        {unit}
                    </Text>
                </Pressable>
            </View>
            <View style={{ alignItems: "center", marginTop: 15 }}>
                <Button
                    mode="contained"
                    onPress={() => {
                        calculate();
                    }}
                    buttonColor={colors.secondary}
                    textColor="white">
                    Calculate
                </Button>
            </View>
            {result.bmi && (
                <View style={styles.ansContainer}>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ color: colors.text, fontSize: 22 }}>
                            BMI :
                        </Text>
                        <Text style={{ color: colors.text, fontSize: 22 }}>
                            Category :
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: colors.secondary, fontSize: 22 }}>
                            {result.bmi}
                        </Text>
                        <Text style={{ color: colors.secondary, fontSize: 22 }}>
                            {result.category}
                        </Text>
                    </View>
                </View>
            )}
            <View style={{ padding: 10 }}>
                {bmiRanges.map((item, index) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderBottomWidth: index == 0 ? 0 : 1,
                            borderColor: colors.divider,
                            backgroundColor:
                                index == 0 ? colors.secondary : "transparent",
                        }}
                        key={index}>
                        <Text
                            style={{
                                color: index == 0 ? "white" : colors.text,
                                fontSize: 17,
                                fontWeight: index == 0 ? "bold" : "normal",
                            }}>
                            {item.category}
                        </Text>
                        <Text
                            style={{
                                color: index == 0 ? "white" : colors.text,
                                fontSize: 17,
                                fontWeight: index == 0 ? "bold" : "normal",
                            }}>
                            {item.range}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default BMICalculator;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        padding: 10,
    },
    ansContainer: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        flexDirection: "row",
        gap: 15,
    },
});
