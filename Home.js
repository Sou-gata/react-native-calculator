import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import One from "./src/pages/Tabs/One";
import Two from "./src/pages/Tabs/Two";
import { Image, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();
const Home = () => {
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarIcon: ({ focused }) => {
                    let src, opacity;
                    opacity = focused ? 1 : 0.5;
                    if (route.name === "Normal") {
                        src = require("./assets/icons/calculator.png");
                    } else if (route.name === "Navigation") {
                        src = require("./assets/icons/navigation.png");
                    }
                    return (
                        <Image
                            source={src}
                            style={{
                                width: 30,
                                height: 30,
                                opacity,
                                tintColor: "white",
                            }}
                        />
                    );
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                    height: 56,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: theme.colors.secondary,
                },
                tabBarIndicatorContainerStyle: { height: 56 },
            })}
            initialLayout={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
            }}>
            <Tab.Screen name="Normal" component={One} />
            <Tab.Screen name="Navigation" component={Two} />
        </Tab.Navigator>
    );
};

export default Home;
