import {
    View,
    Text,
    Image,
    Pressable,
    Linking,
    ScrollView,
    StyleSheet,
} from "react-native";
import versionInfo from "../helpers/versionInfo";
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
    const appVersion = versionInfo[0]?.ver || "1.5.2";

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
        },
        headerTitle: {
            fontSize: 22,
            fontFamily: "Flamante",
            color: colors.secondary,
            fontWeight: "bold",
        },
        crossButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.calBg,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.divider || "rgba(0,0,0,0.05)",
        },
        scrollContent: {
            paddingHorizontal: 20,
            paddingBottom: 40,
            paddingTop: 10,
        },
        heroSection: {
            alignItems: "center",
            marginBottom: 20,
        },
        aboutIcon: {
            width: 110,
            height: 110,
            borderRadius: 28,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        appName: {
            fontSize: 32,
            fontFamily: "Flamante",
            color: colors.secondary,
            fontWeight: "800",
            marginTop: 5,
        },
        versionContainer: {
            backgroundColor: colors.calBg,
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 20,
            marginTop: 8,
            borderWidth: 1,
            borderColor: colors.divider || "rgba(0,0,0,0.05)",
        },
        versionText: {
            fontSize: 14,
            color: colors.text,
            fontWeight: "600",
            opacity: 0.8,
        },
        authorText: {
            fontSize: 15,
            color: colors.text,
            marginTop: 10,
            opacity: 0.6,
        },
        authorName: {
            fontFamily: "Flamante",
            color: colors.secondary,
            fontWeight: "bold",
        },
        card: {
            backgroundColor: colors.calBg,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.divider || "rgba(0,0,0,0.05)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 1,
        },
        descriptionText: {
            fontSize: 15,
            lineHeight: 22,
            color: colors.text,
            textAlign: "center",
            opacity: 0.85,
        },
        sectionTitle: {
            fontSize: 18,
            fontFamily: "Flamante",
            color: colors.secondary,
            fontWeight: "bold",
            marginBottom: 15,
        },
        featureItem: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.divider || "rgba(0,0,0,0.05)",
        },
        lastFeatureItem: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
        },
        featureIconContainer: {
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
        },
        featureText: {
            fontSize: 15,
            color: colors.text,
            flex: 1,
            fontWeight: "500",
        },
        githubButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.secondary,
            borderRadius: 16,
            paddingVertical: 15,
            marginBottom: 20,
            shadowColor: colors.secondary,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
        },
        githubButtonText: {
            color: colors.backgroundColor,
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
        },
        socialRow: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 5,
        },
        socialButton: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.divider || "rgba(0,0,0,0.05)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 1,
        },
    });

    const keyFeatures = [
        {
            id: 1,
            text: "Multiply & Divide with detail views",
            icon: "calculator",
        },
        { id: 2, text: "LCM & HCF step-by-step breakdown", icon: "analytics" },
        {
            id: 3,
            text: "Geometric Shapes & Bodies with formulas",
            icon: "cube",
        },
        {
            id: 4,
            text: "Two & Three variable equation solver",
            icon: "git-compare",
        },
        { id: 5, text: "Useful reference formulas list", icon: "book" },
    ];

    return (
        <View style={styles.container}>
            {/* Top Navigation Bar */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}></Text>
                <Pressable
                    style={styles.crossButton}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    <Ionicons name="close" size={22} color={colors.secondary} />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Header Section */}
                <View style={styles.heroSection}>
                    <Image style={styles.aboutIcon} source={icon} />
                    <Text style={styles.appName}>Calculator</Text>
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>v{appVersion}</Text>
                    </View>
                    <Text style={styles.authorText}>
                        by{" "}
                        <Text style={styles.authorName}>Sougata Talukdar</Text>
                    </Text>
                </View>

                {/* About Project Description */}
                <View style={styles.card}>
                    <Text style={styles.descriptionText}>
                        This is an open source project, built using React
                        Native. You are free to use it however you like. If you
                        like my work, please give a star to this project on
                        GitHub. If you find any bugs or have improvement ideas,
                        let me know!
                    </Text>
                </View>

                {/* Key Features Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Key Features</Text>
                    {keyFeatures.map((item, index) => {
                        const isLast = index === keyFeatures.length - 1;
                        return (
                            <View
                                key={item.id}
                                style={
                                    isLast
                                        ? styles.lastFeatureItem
                                        : styles.featureItem
                                }
                            >
                                <View style={styles.featureIconContainer}>
                                    <Ionicons
                                        name={item.icon}
                                        size={20}
                                        color={colors.secondary}
                                    />
                                </View>
                                <Text style={styles.featureText}>
                                    {item.text}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* GitHub Action Button */}
                <Pressable
                    style={styles.githubButton}
                    onPress={() =>
                        Linking.openURL(
                            "https://github.com/Sou-gata/react-native-calculator",
                        )
                    }
                >
                    <Ionicons
                        name="logo-github"
                        size={22}
                        color={colors.backgroundColor}
                    />
                    <Text style={styles.githubButtonText}>
                        Source Code on GitHub
                    </Text>
                </Pressable>

                {/* Contact Card */}
                <View style={styles.card}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { textAlign: "center", marginBottom: 20 },
                        ]}
                    >
                        Contact Developer
                    </Text>
                    <View style={styles.socialRow}>
                        <Pressable
                            style={styles.socialButton}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.facebook.com/sougata76/",
                                )
                            }
                        >
                            <Ionicons
                                name="logo-facebook"
                                size={24}
                                color={colors.secondary}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.socialButton}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.instagram.com/sougata_76/",
                                )
                            }
                        >
                            <Ionicons
                                name="logo-instagram"
                                size={24}
                                color={colors.secondary}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.socialButton}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.linkedin.com/in/sougata76/",
                                )
                            }
                        >
                            <Ionicons
                                name="logo-linkedin"
                                size={24}
                                color={colors.secondary}
                            />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default About;
