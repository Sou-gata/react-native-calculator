import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/Home";
import Lcm from "./src/components/Lcm";
import Hcf from "./src/components/Hcf";
import Factors from "./src/components/Factors";
import Multiply from "./src/components/Multiply";
import Divide from "./src/components/Divide";
import NormalCalculator from "./src/components/NormalCalculator";
import FractionSimplify from "./src/components/FractionSimplify";
import TemperatureConverter from "./src/components/TemperatureConverter";
import NumberConverter from "./src/components/NumberConverter";
import WaightConverter from "./src/components/WaightConverter";
import LengthConverter from "./src/components/LengthConverter";
import AgeCalculator from "./src/components/AgeCalculator";

export default function App() {
    const Stack = createNativeStackNavigator();
    const options = {
        headerStyle: {
            backgroundColor: "#111",
        },
        headerTintColor: "#fff",
        animation: "slide_from_left",
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
                <Stack.Screen
                    name="NumberConverter"
                    component={NumberConverter}
                    options={{
                        ...options,
                        title: "Number Converter",
                    }}
                />
                <Stack.Screen
                    name="WaightConverter"
                    component={WaightConverter}
                    options={{
                        ...options,
                        title: "Waight Converter",
                    }}
                />
                <Stack.Screen
                    name="LengthConverter"
                    component={LengthConverter}
                    options={{
                        ...options,
                        title: "Length Converter",
                    }}
                />
                <Stack.Screen
                    name="AgeCalculator"
                    component={AgeCalculator}
                    options={{
                        ...options,
                        title: "Age Calculator",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
