import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/Home";
import Lcm from "./src/Lcm";
import Hcf from "./src/Hcf";
import Factors from "./src/Factors";
import Multiply from "./src/Multiply";
import Divide from "./src/Divide";

const App = () => {
    const Stack = createNativeStackNavigator();
    const options = {
        headerStyle: {
            backgroundColor: "#222",
        },
        headerTintColor: "#fff",
    };
    return (
        <NavigationContainer>
            <StatusBar style="auto" />

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ ...options, title: "Calculator By Sougata" }}
                />
                <Stack.Screen name="LCM" component={Lcm} options={options} />
                <Stack.Screen name="HCF" component={Hcf} options={options} />
                <Stack.Screen
                    name="Factors"
                    component={Factors}
                    options={options}
                />
                <Stack.Screen
                    name="Multiply"
                    component={Multiply}
                    options={options}
                />
                <Stack.Screen
                    name="Divide"
                    component={Divide}
                    options={options}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
