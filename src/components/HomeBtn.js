import { View, Text, TouchableHighlight, Image } from "react-native";
import React from "react";

import styles from "../allStyles";

const HomeBtn = ({ item, navigation }) => {
    return (
        <View>
            <TouchableHighlight
                style={styles.homeBtn}
                onPress={() => {
                    navigation.navigate(item.name);
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={{ marginBottom: 10, width: 40, height: 40 }}
                        source={item.path}
                    />
                    <Text style={styles.btnText}>{item.text}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default HomeBtn;
