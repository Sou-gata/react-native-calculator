import { useState, createContext } from "react";
import { Appearance } from "react-native";
const colorScheme = Appearance.getColorScheme();
export const Context = createContext();
export default State = ({ children }) => {
    const [mode, setMode] = useState(colorScheme);
    const updateTheme = theme => setMode(theme);
    return (
        <Context.Provider value={{ mode, updateTheme }}>
            {children}
        </Context.Provider>
    );
};
