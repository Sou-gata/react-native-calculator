import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import store from "./redux-store/store";
import Main from "./Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 1000);
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
}
