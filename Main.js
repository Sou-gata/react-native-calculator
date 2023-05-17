import { Provider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import Screens from "./Screens";

const Main = () => {
    const themeMode = useSelector((state) => state.theme.mode);
    let themeLight = {
        ...MD3LightTheme,
        colors: {
            elevation: {
                level2: "#ffffff",
            },
            primary: "#0d6efd",
            secondary: "#f50057",
            backgroundColor: "#ffffff",
            numPadBg: "#ffffff",
            calBg: "#e6e6e6",
            text: "#000000de",
            calAns: "#00000090",
            paceHolder: "#00000050",
        },
    };
    const themeDark = {
        ...MD3DarkTheme,
        colors: {
            elevation: {
                level2: "#222222",
            },
            primary: "#4527a0",
            secondary: "#ff7733",
            backgroundColor: "#222222",
            numPadBg: "#222222",
            calBg: "#111111",
            text: "#ffffffde",
            calAns: "#ffffff90",
            paceHolder: "#ffffff50",
        },
    };
    let theme = themeMode == "light" ? themeLight : themeDark;

    return (
        <NavigationContainer>
            <Provider theme={theme}>
                <StatusBar
                    style="light"
                    backgroundColor={theme.colors?.primary}
                />
                <Screens />
            </Provider>
        </NavigationContainer>
    );
};

export default Main;
