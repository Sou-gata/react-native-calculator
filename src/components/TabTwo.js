import { View } from "react-native";
import React from "react";

import styles from "../allStyles";
import HomeBtn from "./HomeBtn";
import componentName from "../helpers/componentName";

const data = componentName;

const TabTwo = ({ navigation }) => {
    return (
        <View style={styles.homeContainer}>
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
    );
};

export default TabTwo;