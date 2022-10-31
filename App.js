import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import Home from "./src/Home";
import Lcm from "./src/components/Lcm";
import Hcf from "./src/components/Hcf";
import Factors from "./src/components/Factors";
import Multiply from "./src/components/Multiply";
import Divide from "./src/components/Divide";
import FractionSimplify from "./src/components/FractionSimplify";
import TemperatureConverter from "./src/components/TemperatureConverter";
import NumberConverter from "./src/components/NumberConverter";
import WaightConverter from "./src/components/WaightConverter";
import LengthConverter from "./src/components/LengthConverter";
import AgeCalculator from "./src/components/AgeCalculator";
import Area from "./src/components/Area";
import Volume from "./src/components/Volume";
import Gst from "./src/components/Gst";
import Discount from "./src/components/Discount";
import EquSolve from "./src/components/EquSolve";
import QuadraticEqu from "./src/components/QuadraticEqu";
import TimeCalculator from "./src/components/TimeCalculator";

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 1500);
    }, []);

    const Stack = createNativeStackNavigator();
    const options = {
        headerStyle: {
            backgroundColor: "#111",
            height: 50,
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
                <Stack.Screen
                    name="Area"
                    component={Area}
                    options={{
                        ...options,
                        title: "Area Converter",
                    }}
                />
                <Stack.Screen
                    name="Volume"
                    component={Volume}
                    options={{
                        ...options,
                        title: "Volume Converter",
                    }}
                />
                <Stack.Screen
                    name="Gst"
                    component={Gst}
                    options={{
                        ...options,
                        title: "GST",
                    }}
                />
                <Stack.Screen
                    name="Discount"
                    component={Discount}
                    options={{
                        ...options,
                        title: "Discount Calculator",
                    }}
                />
                <Stack.Screen
                    name="SolveEqu"
                    component={EquSolve}
                    options={{
                        ...options,
                        title: "Solve Equation",
                    }}
                />
                <Stack.Screen
                    name="QuadraticEqu"
                    component={QuadraticEqu}
                    options={{
                        ...options,
                        title: "Quadratic Equation",
                    }}
                />
                <Stack.Screen
                    name="TimeCalculator"
                    component={TimeCalculator}
                    options={{
                        ...options,
                        title: "Time Calculator",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
