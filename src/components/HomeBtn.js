import { View, Text, TouchableHighlight } from "react-native";
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
                <Text style={styles.btnText}>{item.text}</Text>
            </TouchableHighlight>
        </View>
    );
};

export default HomeBtn;
