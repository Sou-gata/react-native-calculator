import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("LCM");
                }}
            >
                <Text style={styles.btnText}>LCM</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("HCF");
                }}
            >
                <Text style={styles.btnText}>HCF</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("Factors");
                }}
            >
                <Text style={styles.btnText}>Factors</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("Multiply");
                }}
            >
                <Text style={styles.btnText}>Multiply</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("Divide");
                }}
            >
                <Text style={styles.btnText}>Divide</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#333",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    btn: {
        width: 200,
        height: 66,
        borderRadius: 66,
        borderColor: "#fff",
        borderWidth: 1.5,
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 20,
    },
});
