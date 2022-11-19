import { View, ScrollView, Text } from "react-native";
import React from "react";

import HomeBtn from "./HomeBtn";
import componentName from "../helpers/componentName";
import { useSelector } from "react-redux";
import allStylesLight from "../allStylesLight";
import allStyleDark from "../allStylesDark";
let styles = allStyleDark;

const data = componentName;

const TabTwo = ({ navigation }) => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.homeMain}>
                    {(() => {
                        let btns = [];
                        for (let i = 0; i < data.length; i++) {
                            let com = (
                                <HomeBtn
                                    key={i}
                                    navigation={navigation}
                                    item={data[i]}
                                />
                            );
                            btns.push(com);
                        }
                        return btns;
                    })()}
                </View>
            </View>
        </ScrollView>
    );
};

export default TabTwo;
