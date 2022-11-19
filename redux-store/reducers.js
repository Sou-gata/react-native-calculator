import { THEME_CHANGE } from "./constants";
import { Appearance } from "react-native";
const colorScheme = Appearance.getColorScheme();

// initial system theme
const initialState = {
    mode: colorScheme,
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case THEME_CHANGE:
            return {
                ...state,
                mode: action.payload,
            };
        default:
            return state;
    }
};

export default themeReducer;
