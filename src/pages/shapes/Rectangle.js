import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";

const Rectangle = (props) => {
    const { colors } = useTheme();
    const shapeDetails = props.route.params.shape;
    const [input, setInput] = useState({
        Length: "",
        Breadth: "",
        l: 0,
        b: 0,
    });
    const [ans, setAns] = useState({
        perimeter: 0,
        area: 0,
        diagonal: 0,
    });

    const calculate = () => {
        if (input.Length != "" && input.Breadth != "") {
            let l = parseFloat(input.Length);
            let b = parseFloat(input.Breadth);
            if (isNaN(l) || isNaN(b)) return;
            l = parseFloat(l.toFixed(2));
            b = parseFloat(b.toFixed(2));
            setInput({ ...input, l, b });
            setAns({
                perimeter: parseFloat((2 * (l + b)).toFixed(2)),
                area: parseFloat((l * b).toFixed(2)),
                diagonal: parseFloat(Math.sqrt(l * l + b * b).toFixed(2)),
            });
        } else return;
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 20,
        },
        image: {
            width: 230,
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
        transparentTextStyle: {
            fontSize: 18,
            color: "transparent",
        },
        textStyle: {
            fontSize: 18,
            color: colors.text,
        },
        flexRow: {
            flexDirection: "row",
        },
    });
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <>
                <Image source={shapeDetails.mainImage} style={styles.image} />
                {shapeDetails.field.map((item, index) => (
                    <View style={styles.inputContainer} key={index}>
                        <Text style={styles.textStyle}>{item}</Text>
                        <CustomInput
                            placeholder={item}
                            value={input[item]}
                            onChangeText={(e) => {
                                setInput((prev) => ({ ...prev, [item]: e }));
                            }}
                        />
                    </View>
                ))}
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
                {ans.area != 0 && ans.perimeter != 0 && (
                    <View style={{ marginTop: 25 }}>
                        <Text style={styles.textStyle}>
                            Area = Length × Breadth
                        </Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Area
                            </Text>
                            <Text style={styles.textStyle}>
                                {` =  ${input.l} × ${input.b}`}
                            </Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Area
                            </Text>
                            <Text style={styles.textStyle}>
                                {" = " + ans.area}
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 25 }]}>
                            Perimeter = 2 × (Length + Breadth)
                        </Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Perimeter
                            </Text>
                            <Text style={styles.textStyle}>
                                {` = 2 × (${input.l} + ${input.b})`}
                            </Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Perimeter
                            </Text>
                            <Text style={styles.textStyle}>
                                {` = 2 × ${input.l + input.b}`}
                            </Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Perimeter
                            </Text>
                            <Text style={styles.textStyle}>
                                {" = " + ans.perimeter}
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 25 }]}>
                            Diagonal = √(Length² + Breadth²)
                        </Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Diagonal
                            </Text>
                            <Text style={styles.textStyle}>
                                {` =  √(${input.l}² + ${input.b}²)`}
                            </Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Diagonal
                            </Text>
                            <Text style={styles.textStyle}>
                                {` = √${input.l * input.l + input.b * input.b}`}
                            </Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.transparentTextStyle}>
                                Diagonal
                            </Text>
                            <Text style={styles.textStyle}>
                                {" = " + ans.diagonal}
                            </Text>
                        </View>
                    </View>
                )}
            </>
        </ScrollView>
    );
};

export default Rectangle;
