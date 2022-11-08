import { View, Text, Image, Pressable, Linking } from "react-native";
import React from "react";

import {
    useFonts,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
} from "@expo-google-fonts/source-sans-pro";

import styles from "../allStyles";
const icon = require("../../assets/icon.png");

const About = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        SourceSansPro_400Regular,
        SourceSansPro_600SemiBold,
    });
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={styles.main}>
                <Pressable
                    style={styles.cross}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    <Image source={require("../../assets/icons/cross.png")} />
                </Pressable>
                <View style={[styles.aboutTop, { marginTop: "25%" }]}>
                    <Text style={styles.aboutAppName}>Calculator</Text>
                    <Image style={styles.aboutIcon} source={icon} />
                    <Text style={styles.version}>Version 1.2.4</Text>
                    <View style={styles.flexRow}>
                        <Text style={[styles.aboutAppName, { fontSize: 18 }]}>
                            by{" "}
                        </Text>
                        <Text style={styles.aboutAppName}>
                            Sougata Talukdar
                        </Text>
                    </View>
                </View>
                <View style={styles.aboutBottom}>
                    <Text style={styles.aboutText}>
                        This is an open source project, made using react native.
                        You are free to use it however you like. If you like my
                        work give a star in this project on github. If you find
                        any bugs or any improvement ideas, let me know.
                    </Text>
                    <View style={[styles.flexRow, { marginTop: 25 }]}>
                        <Text style={styles.aboutText}>Source code on </Text>
                        <Text
                            style={{ color: "#f73", fontSize: 18 }}
                            onPress={() =>
                                Linking.openURL(
                                    "https://github.com/Sou-gata/react-native-calculator"
                                )
                            }
                        >
                            Github
                        </Text>
                    </View>
                </View>
                <View style={styles.aboutContact}>
                    <Text style={styles.aboutAppName}>Contact me</Text>
                    <Text
                        style={{ color: "#f73", fontSize: 18, marginTop: 20 }}
                        onPress={() =>
                            Linking.openURL(
                                "https://www.facebook.com/sougata76/"
                            )
                        }
                    >
                        Facebook
                    </Text>
                </View>
            </View>
        );
    }
};

export default About;
