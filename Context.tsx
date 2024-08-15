import { createContext, ReactNode, useState } from "react";
import { Appearance } from "react-native";

import { ContextType, themeType } from "./types";

const scheme = Appearance.getColorScheme();
let colorScheme: themeType;
if (scheme == "dark") colorScheme = "dark";
else colorScheme = "light";

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<themeType>(colorScheme);
    const updateTheme = (theme: themeType) => setTheme(theme);
    return (
        <Context.Provider value={{ theme, updateTheme }}>
            {children}
        </Context.Provider>
    );
};
export default ContextProvider;
