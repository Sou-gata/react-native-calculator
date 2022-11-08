import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import Screens from "./Screens";

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 1500);
    }, []);

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Screens />
        </NavigationContainer>
    );
}
