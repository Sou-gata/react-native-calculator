import { View, Text, Image, Pressable, Linking } from "react-native";
import { StyleSheet } from "react-native";
import Appdata from "../../app.json";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorSchemeType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";

const icon = require("../../assets/icon.png");
const About = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors } = useTheme<colorSchemeType>();

    const styles = StyleSheet.create({
        cross: {
            position: "absolute",
            right: 20,
            top: 20,
            zIndex: 2,
        },
        crossImg: {
            width: 35,
            height: 35,
            opacity: 0.75,
        },
        aboutIcon: {
            width: 100,
            height: 100,
        },
        aboutTop: {
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "30%",
        },
        aboutAppName: {
            fontSize: 30,
            fontFamily: "Flamante",
            color: colors.secondary,
        },
        version: {
            fontSize: 17,
            color: colors.text,
        },
        flexRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        aboutBottom: {
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            height: "20%",
        },
        keyFeatures: {
            alignItems: "center",
        },
        aboutText: {
            fontSize: 18,
            color: colors.text,
        },
        aboutContact: {
            alignItems: "center",
            marginTop: 20,
        },
        hyperlinkText: {
            fontSize: 18,
            fontFamily: "Flamante",
            color: colors.secondary,
        },
    });
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.backgroundColor,
            }}>
            <Pressable
                style={styles.cross}
                onPress={() => {
                    navigation.navigate("Home");
                }}>
                <Ionicons
                    style={styles.crossImg}
                    name="close"
                    size={35}
                    color={colors.secondary}
                />
            </Pressable>
            <View style={[styles.aboutTop, { marginTop: "5%" }]}>
                <Text style={styles.aboutAppName}>Calculator</Text>
                <Image style={styles.aboutIcon} source={icon} />
                <Text style={styles.version}>Version {Appdata.version}</Text>
                <View style={styles.flexRow}>
                    <Text style={[styles.aboutAppName, { fontSize: 18 }]}>
                        by{" "}
                    </Text>
                    <Text style={styles.aboutAppName}>Sougata Talukdar</Text>
                </View>
            </View>
            <View style={styles.aboutBottom}>
                <Text style={styles.aboutText}>
                    This is an open source project, made using react native. You
                    are free to use it however you like. If you like my work
                    give a star in this project on github. If you find any bugs
                    or any improvement ideas, let me know.
                </Text>
            </View>
            <View style={styles.keyFeatures}>
                <Text style={styles.aboutAppName}>Key Features</Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.aboutText}>
                        {"\u2022"} Multiply & Divide In details
                    </Text>
                    <Text style={styles.aboutText}>
                        {"\u2022"} LCM & HCF In details
                    </Text>
                    <Text style={styles.aboutText}>
                        {"\u2022"} Shapes & Bodies with formulas
                    </Text>
                    <Text style={styles.aboutText}>
                        {"\u2022"} Two & Three veriable equation solve
                    </Text>
                    <Text style={styles.aboutText}>
                        {"\u2022"} Some useful formulas
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
                    }>
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
                        }>
                        Facebook
                    </Text>
                    <Text
                        style={[styles.hyperlinkText, { margin: 10 }]}
                        onPress={() =>
                            Linking.openURL(
                                "https://www.instagram.com/sougata_76/"
                            )
                        }>
                        Instagram
                    </Text>
                </View>
                <View style={styles.flexRow}>
                    <Text
                        style={[styles.hyperlinkText, { margin: 10 }]}
                        onPress={() =>
                            Linking.openURL(
                                "https://www.linkedin.com/in/sougata76/"
                            )
                        }>
                        Linkedin
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default About;
