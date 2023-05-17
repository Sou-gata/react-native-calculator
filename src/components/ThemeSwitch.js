import { View, Pressable } from "react-native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { switchMode } from "../../redux-store/actions";

const ThemeSwitch = ({ colors }) => {
    const themeMode = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    return (
        <View
            style={{
                position: "absolute",
                zIndex: 99,
                right: 0,
                top: 10,
                width: 40,
                height: 40,
            }}
        >
            <Pressable
                onPress={() => {
                    dispatch(
                        switchMode(
                            themeMode.mode === "light" ? "dark" : "light"
                        )
                    );
                }}
            >
                {themeMode.mode === "light" ? (
                    <MaterialIcons
                        name="brightness-7"
                        size={24}
                        color={colors.secondary}
                    />
                ) : (
                    <Ionicons name="moon" size={24} color={colors.secondary} />
                )}
            </Pressable>
        </View>
    );
};

export default ThemeSwitch;
