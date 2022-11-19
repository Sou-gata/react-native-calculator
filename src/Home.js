import { Image, Dimensions } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NormalCalculator from "./components/NormalCalculator";
import TabTwo from "./components/TabTwo";
import { useSelector } from "react-redux";
import allStylesLight, { colorWhite } from "./allStylesLight";
import allStyleDark, { colorDark } from "./allStylesDark";
let styles = allStyleDark;
let color = colorDark;

const Tab = createMaterialTopTabNavigator();

const Home = () => {
    const theme = useSelector((state) => state.theme);
    styles = theme.mode == "dark" ? allStyleDark : allStylesLight;
    color = theme.mode == "dark" ? colorDark : colorWhite;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarIcon: ({ focused }) => {
                    let src, opacity;
                    opacity = focused ? 1 : 0.5;
                    if (route.name === "Normal") {
                        src = require("../assets/icons/calculator.png");
                    } else if (route.name === "Navigation") {
                        src = require("../assets/icons/navigation.png");
                    }
                    return (
                        <Image
                            source={src}
                            style={{
                                width: 30,
                                height: 30,
                                opacity,
                                tintColor: color.headerIcon,
                            }}
                        />
                    );
                },
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: color.headerBg },
                tabBarIndicatorStyle: { backgroundColor: color.primary },
                tabBarIndicatorContainerStyle: { height: 50 },
            })}
            initialLayout={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
            }}
        >
            <Tab.Screen name="Normal" component={NormalCalculator} />
            <Tab.Screen name="Navigation" component={TabTwo} />
        </Tab.Navigator>
    );
};

export default Home;
