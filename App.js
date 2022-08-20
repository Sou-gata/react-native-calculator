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
import NormalCalculator from "./src/NormalCalculator";
import FractionSimplify from "./src/FractionSimplify";
import TemperatureConverter from "./src/TemperatureConverter";

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
                    options={{
                        ...options,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="NormalCalculator"
                    component={NormalCalculator}
                    options={options}
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
                <Stack.Screen
                    name="FractionSimplify"
                    component={FractionSimplify}
                    options={{
                        ...options,
                        title: "Simplify Fraction",
                    }}
                />
                <Stack.Screen
                    name="TemperatureConverter"
                    component={TemperatureConverter}
                    options={{
                        ...options,
                        title: "Temperature Converter",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
