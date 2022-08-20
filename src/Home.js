import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";

import styles from "./allStyles";

const Home = ({ navigation }) => {
    const data = [
        {
            id: "1",
            name: "NormalCalculator",
            text: "Normal Calculator",
        },
        {
            id: "2",
            name: "LCM",
            text: "LCM",
        },
        {
            id: "3",
            name: "HCF",
            text: "HCF",
        },
        {
            id: "4",
            name: "Factors",
            text: "Factors",
        },
        {
            id: "5",
            name: "Multiply",
            text: "Multiply",
        },
        {
            id: "6",
            name: "Divide",
            text: "Divide",
        },
        {
            id: "7",
            name: "FractionSimplify",
            text: "Simplify Factors",
        },
        {
            id: "8",
            name: "TemperatureConverter",
            text: "Temperature Converter",
        },
    ];
    return (
        <View style={styles.homeMain}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.homeBtn}
                            onPress={() => {
                                navigation.navigate(item.name);
                            }}
                        >
                            <Text style={styles.btnText}>{item.text}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default Home;
