import { View, Text } from "react-native";
import styles from "../allStyles";
import React, { useState } from "react";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";

const PopupMenu = () => {
    const [opened, setOpened] = useState(false);
    const navigation = useNavigation();
    return (
        <Menu opened={opened} onBackdropPress={() => setOpened(false)}>
            <MenuTrigger
                onPress={() => {
                    setOpened(!opened);
                }}
                style={styles.dotContainer}
            >
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuContainer}>
                <MenuOption
                    style={styles.menuItem}
                    onSelect={() => {
                        setOpened(false);
                        navigation.navigate("About");
                    }}
                >
                    <Text style={styles.menuItemText}>About</Text>
                </MenuOption>
                <MenuOption
                    style={styles.menuItem}
                    onSelect={() => {
                        setOpened(false);
                        navigation.navigate("WhatsNew");
                    }}
                >
                    <Text style={styles.menuItemText}>What's New ?</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

export default PopupMenu;