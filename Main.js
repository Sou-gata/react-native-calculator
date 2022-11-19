import React from "react";
import { StatusBar } from "react-native";
import Screens from "./Screens";

import { useSelector } from "react-redux";
import { colorWhite } from "./src/allStylesLight";
import { colorDark } from "./src/allStylesDark";
let color = colorDark;

const Main = () => {
    const theme = useSelector((state) => state.theme);
    color = theme.mode == "dark" ? colorDark : colorWhite;
    return (
        <>
            <StatusBar style="auto" backgroundColor={color.statusBar} />
            <Screens />
        </>
    );
};

export default Main;
