import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { colorWhite } from "../allStylesLight";
import { colorDark } from "../allStylesDark";
import { useSelector, useDispatch } from "react-redux";
import { switchMode } from "../../redux-store/actions";

const sun = require("../../assets/icons/sun.png");
const moon = require("../../assets/icons/moon.png");

const LightDark = () => {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const [mode, setMode] = useState(theme.mode);
    let color = theme.mode == "dark" ? colorDark : colorWhite;
    useEffect(() => {
        setMode(theme.mode);
        color = theme.mode == "dark" ? colorDark : colorWhite;
    }, [theme]);
    const handleThemeChange = () => {
        dispatch(switchMode(theme.mode === "light" ? "dark" : "light"));
    };
    return (
        <View
            style={{
                position: "absolute",
                zIndex: 99,
                right: 0,
                top: "1%",
                width: 40,
                height: 40,
            }}
        >
            <Pressable onPress={handleThemeChange}>
                <Image
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: color.primary,
                    }}
                    source={theme.mode == "dark" ? sun : moon}
                />
            </Pressable>
        </View>
    );
};

export default LightDark;
