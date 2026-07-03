import { createContext, ReactNode, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ContextType, themeType } from "./types";

const scheme = Appearance.getColorScheme();
let colorScheme: themeType;
if (scheme === "dark") colorScheme = "dark";
else colorScheme = "light";

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<themeType>(colorScheme);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem("app_theme");
                if (storedTheme === "light" || storedTheme === "dark") {
                    setTheme(storedTheme);
                }
            } catch {
            }
        };
        loadTheme();
    }, []);

    const updateTheme = (newTheme: themeType) => {
        setTheme(newTheme);
        AsyncStorage.setItem("app_theme", newTheme).catch((e) =>
            console.error("Failed to save theme", e)
        );
    };

    return (
        <Context.Provider value={{ theme, updateTheme }}>
            {children}
        </Context.Provider>
    );
};
export default ContextProvider;
