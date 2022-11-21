import store from "../../redux-store/store";
import allStyleDark, { colorDark } from "../allStylesDark";
import allStyleLight, { colorWhite } from "../allStylesLight";

const ThemeSelector = (setStyle, setColor) => {
    let theme = store.getState().theme.mode;
    if (theme == "dark") {
        if (setStyle) setStyle(allStyleDark);
        if (setColor) setColor(colorDark);
    } else {
        if (setStyle) setStyle(allStyleLight);
        if (setColor) setColor(colorWhite);
    }
};

export default ThemeSelector;
