import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import ThemeSelector from "../helpers/ThemeSelector";

const Discount = () => {
    const [styles, setStyles] = useState({});
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles, setColor);
    }, []);
    const [inputs, setInputs] = useState({
        price: "",
        discount: "",
    });
    const [ans, setAns] = useState({ cost: 0, discount: 0 });
    const [opacity, setOpacity] = useState(0);

    const calculate = (e, type) => {
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

    return (
        <View style={styles.main}>
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        height: 160,
                    },
                ]}
            >
                <View
                    style={{
                        justifyContent: "space-around",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Price
                    </Text>
                    <Text style={{ color: color.white, fontSize: 17 }}>
                        Discount
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            calculate(e, "price");
                        }}
                        value={inputs.price}
                        placeholder="Price"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => {
                            calculate(e, "discount");
                        }}
                        value={inputs.discount}
                        placeholder="Discount in %"
                        placeholderTextColor={color.paceHolder}
                        keyboardType="numeric"
                        maxLength={2}
                    />
                </View>
            </View>
            <View
                style={
                    opacity == 0
                        ? { display: "none" }
                        : { display: "flex", marginTop: 50 }
                }
            >
                <View style={styles.ageRow}>
                    <Text style={styles.textStyle}>The final price is </Text>
                    <Text style={styles.textStyleOrange}>{ans.cost}</Text>
                </View>
                <View style={styles.ageRow}>
                    <Text style={styles.textStyle}>You save </Text>
                    <Text style={styles.textStyleOrange}>{ans.discount}</Text>
                </View>
            </View>
        </View>
    );
};

export default Discount;
