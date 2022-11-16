import { View, Text, Image, Pressable, Linking } from "react-native";
import React from "react";
import Appdata from "../../app.json";

import {
    useFonts,
    VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

import styles from "../allStyles";
const icon = require("../../assets/icon.png");

const About = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
    });
    if (!fontsLoaded) {
        return <View style={styles.main}></View>;
    } else {
        return (
            <View style={styles.main}>
                <Pressable
                    style={styles.cross}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    <Image
                        style={styles.crossImg}
                        source={require("../../assets/icons/cross.png")}
                    />
                </Pressable>
                <View style={[styles.aboutTop, { marginTop: "5%" }]}>
                    <Text style={styles.aboutAppName}>Calculator</Text>
                    <Image style={styles.aboutIcon} source={icon} />
                    <Text style={styles.version}>
                        Version {Appdata.expo.version}
                    </Text>
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
                </View>
                <View style={styles.keyFeatures}>
                    <Text style={styles.aboutAppName}>Key Features</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.aboutText}>
                            {"\u2022"} Multiply In details
                        </Text>
                        <Text style={styles.aboutText}>
                            {"\u2022"} Divide In details
                        </Text>
                        <Text style={styles.aboutText}>
                            {"\u2022"} Two degree equation solve
                        </Text>
                        <Text style={styles.aboutText}>
                            {"\u2022"} Two veriable equation solve
                        </Text>
                    </View>
                </View>
                <View style={[styles.flexRow, { marginTop: 25 }]}>
                    <Text style={styles.aboutText}>Source code on </Text>
                    <Text
                        style={styles.hyperlinkText}
                        onPress={() =>
                            Linking.openURL(
                                "https://github.com/Sou-gata/react-native-calculator"
                            )
                        }
                    >
                        Github
                    </Text>
                </View>
                <View style={styles.aboutContact}>
                    <Text style={styles.aboutAppName}>Contact me</Text>
                    <View style={styles.flexRow}>
                        <Text
                            style={[styles.hyperlinkText, { margin: 10 }]}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.facebook.com/sougata76/"
                                )
                            }
                        >
                            Facebook
                        </Text>
                        <Text
                            style={[styles.hyperlinkText, { margin: 10 }]}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.instagram.com/sougata_76/"
                                )
                            }
                        >
                            Instagram
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
};

export default About;
