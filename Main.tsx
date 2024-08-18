import { useContext } from "react";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Context } from "./Context";
import Screens from "./Screens";
import { colorSchemeType } from "./types";

const Main = () => {
    const themeContext = useContext(Context);
    const themeLight: colorSchemeType = {
        ...MD3LightTheme,
        colors: {
            ...MD3LightTheme.colors,
            elevation: {
                ...MD3LightTheme.colors.elevation,
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
    const themeDark: colorSchemeType = {
        ...MD3DarkTheme,
        colors: {
            ...MD3DarkTheme.colors,
            elevation: {
                ...MD3DarkTheme.colors.elevation,
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
    let theme = themeContext?.theme == "light" ? themeLight : themeDark;
    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                <StatusBar backgroundColor={theme.colors.primary} />
                <Screens />
            </PaperProvider>
        </NavigationContainer>
    );
};

export default Main;
