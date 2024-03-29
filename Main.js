import { Provider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useContext } from "react";
import Screens from "./Screens";
import { Context } from "./Context";

const Main = () => {
    const themeContext = useContext(Context);
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
            divider: "#00000080",
        },
    };
    const themeDark = {
        ...MD3DarkTheme,
        colors: {
            elevation: {
                level2: "#1a1a1a",
            },
            primary: "#4527a0",
            secondary: "#ff7733",
            backgroundColor: "#24292b",
            numPadBg: "#24292b",
            calBg: "#161b1c",
            text: "#ffffffde",
            calAns: "#ffffff90",
            paceHolder: "#ffffff50",
            divider: "#ffffff80",
        },
    };
    let theme = themeContext.mode == "light" ? themeLight : themeDark;
    return (
        <NavigationContainer>
            <Provider theme={theme}>
                <StatusBar backgroundColor={theme.colors.primary} />
                <Screens />
            </Provider>
        </NavigationContainer>
    );
};

export default Main;
