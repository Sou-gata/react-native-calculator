import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { colorSchemeType } from "../../types";

const Discount = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [inputs, setInputs] = useState({
        price: "",
        discount: "",
    });
    const [ans, setAns] = useState({ cost: 0, discount: 0 });
    const [opacity, setOpacity] = useState(0);

    const calculate = (e: string, type: string) => {
        setInputs({ ...inputs, [type]: e });
        let discount, price;
        if (type == "price") {
            price = e;
            discount = inputs.discount;
        } else {
            price = inputs.price;
            discount = e;
        }
        if (price != "" && discount != "") {
            price = parseFloat(price);
            discount = parseFloat(discount);
            const totalDis = (price * discount) / 100;
            const cost = price - totalDis;
            setAns({ cost, discount: totalDis });
            setOpacity(1);
        } else {
            setAns({ cost: 0, discount: 0 });
            setOpacity(0);
        }
    };
    const textStyle = [styles.textStyle, { color: colors.text }];
    const textHeighlight = [styles.textHeighlight, { color: colors.secondary }];
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.container}>
                <View style={styles.convertorIndicator}>
                    <Text style={{ color: colors.text, fontSize: 17 }}>
                        Price
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 17 }}>
                        Discount
                    </Text>
                </View>
                <View style={[styles.convertorIndicator, { marginLeft: 30 }]}>
                    <CustomInput
                        onChangeText={(e) => {
                            calculate(e, "price");
                        }}
                        value={inputs.price}
                        placeholder="Price"
                        width={170}
                    />
                    <CustomInput
                        onChangeText={(e) => {
                            calculate(e, "discount");
                        }}
                        value={inputs.discount}
                        placeholder="Discount in %"
                        width={170}
                    />
                </View>
            </View>
            {Boolean(opacity) && (
                <View style={{ display: "flex", marginTop: 50 }}>
                    <View style={styles.flexRow}>
                        <Text style={textStyle}>The final price is </Text>
                        <Text style={textHeighlight}>{ans.cost}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={textStyle}>You save </Text>
                        <Text style={textHeighlight}>{ans.discount}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Discount;

const styles = StyleSheet.create({
    container: {
        marginTop: 29,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 150,
    },
    convertorIndicator: {
        justifyContent: "space-around",
        height: "100%",
        alignItems: "flex-end",
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
    },
    textHeighlight: {
        fontSize: 35,
        textAlign: "center",
    },
});
