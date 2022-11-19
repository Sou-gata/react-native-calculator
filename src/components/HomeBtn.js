import { View, Text, TouchableHighlight, Image } from "react-native";
import React from "react";

import { useSelector } from "react-redux";
import allStylesLight, { colorWhite } from "../allStylesLight";
import allStyleDark, { colorDark } from "../allStylesDark";
let styles = allStyleDark;
let color = colorDark;

const HomeBtn = ({ item, navigation }) => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    color = theme.mode == "dark" ? colorDark : colorWhite;
    return (
        <View style={styles.homeBtnContainer}>
            <TouchableHighlight
                style={styles.homeBtn}
                underlayColor={color.abotDot}
                onPress={() => {
                    navigation.navigate(item.name);
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={{
                            marginBottom: 10,
                            width: 40,
                            height: 40,
                            tintColor: color.primary,
                        }}
                        source={item.path}
                    />
                    <Text style={[styles.btnText, { color: color.white }]}>
                        {item.text}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default HomeBtn;
