import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useState } from "react";
import { Text, useTheme, Button } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import { RouteProp, useRoute } from "@react-navigation/native";
import { colorSchemeType, shapeType } from "../../../types";
import { parseNumber } from "../../helpers/functions";

const Square = () => {
    const { colors } = useTheme<colorSchemeType>();
    const route = useRoute<RouteProp<{ params: shapeType }, "params">>();
    const shapeDetails = route.params;
    const [input, setInput] = useState({
        Side: "",
        side: 0,
    });
    const [ans, setAns] = useState({
        area: 0,
        perimeter: 0,
        diagonal: 0,
    });
    const calculate = () => {
        if (input.Side !== "") {
            let side = parseFloat(input.Side);
            setInput({
                ...input,
                side: parseNumber(side, 2),
            });
            setAns({
                area: parseNumber(side * side, 2),
                perimeter: parseNumber(4 * side, 2),
                diagonal: (parseNumber(Math.sqrt(2) * side), 2),
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
            width: 200,
            height: 220,
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
            fontSize: 20,
            color: "transparent",
        },
        textStyle: {
            fontSize: 20,
            color: colors.text,
        },
        flexRow: {
            flexDirection: "row",
        },
    });

    return (
        <View style={styles.container}>
            <Image source={shapeDetails.mainImage} style={styles.image} />
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Side</Text>
                <CustomInput
                    placeholder="Side"
                    value={input.Side}
                    onChangeText={(e) => {
                        setInput({ ...input, Side: e });
                    }}
                />
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
            {ans.area !== 0 && (
                <>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <Text style={styles.textStyle}>Area = Side × Side</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.transparentTextStyle}>Area</Text>
                        <Text style={styles.textStyle}>
                            {` = ${input.side} × ${input.side}`}
                        </Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.transparentTextStyle}>Area</Text>
                        <Text style={styles.textStyle}>{` = ${ans.area}`}</Text>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <Text style={styles.textStyle}>
                            Perimeter = 4 × Side
                        </Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.transparentTextStyle}>
                            Perimeter
                        </Text>
                        <Text style={styles.textStyle}>
                            {` = 4 × ${input.side}`}
                        </Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.transparentTextStyle}>
                            Perimeter
                        </Text>
                        <Text style={styles.textStyle}>
                            {` = ${ans.perimeter}`}
                        </Text>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <Text style={styles.textStyle}>
                            Diagonal = √2 × Side
                        </Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.transparentTextStyle}>
                            Perimeter
                        </Text>
                        <Text style={styles.textStyle}>
                            {` = ${Math.sqrt(2).toFixed(2)} × ${input.side}`}
                        </Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.transparentTextStyle}>
                            Perimeter
                        </Text>
                        <Text style={styles.textStyle}>
                            {` = ${ans.diagonal}`}
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default Square;
