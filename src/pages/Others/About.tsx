import React from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    Linking,
    ScrollView,
    Platform,
} from "react-native";
import versionInfo from "../../helpers/versionInfo";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorSchemeType } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addOpacity } from "../../helpers/functions";

const icon = require("../../../assets/icon.png");

const About = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors, dark } = useTheme<colorSchemeType>();
    const insets = useSafeAreaInsets();
    const appVersion = versionInfo[0]?.ver || "1.5.2";

    // Clean, high-contrast card colors
    const cardBg = dark ? "#2c3134" : "#ffffff";
    const cardBorder = dark ? addOpacity(colors.divider, "10") : addOpacity(colors.divider, "08");

    const keyFeatures = [
        {
            id: 1,
            title: "Advanced Math details",
            desc: "Multiply & Divide with comprehensive step-by-step detail views.",
            icon: "calculator-sharp",
        },
        { 
            id: 2, 
            title: "LCM & HCF breakdown", 
            desc: "Understand factor calculations with exact visual steps.",
            icon: "analytics-sharp" 
        },
        {
            id: 3,
            title: "Geometry Formulas",
            desc: "Explore 2D Shapes & 3D Bodies with equations and volume solving.",
            icon: "cube-sharp",
        },
        {
            id: 4,
            title: "Equation Solver",
            desc: "Solve linear equations with up to two and three variables.",
            icon: "git-compare-sharp",
        },
        { 
            id: 5, 
            title: "Formula Quick-Ref", 
            desc: "Fast reference list for calculus, algebra, and common math formulas.",
            icon: "book-sharp" 
        },
        {
            id: 6,
            title: "Vector & Matrix Suite",
            desc: "Solve 2D/3D vectors and matrix determinants, adjoints, and inverses.",
            icon: "grid-sharp",
        },
        {
            id: 7,
            title: "2D Function Plotter",
            desc: "Plot functions and watch curves morph in real-time with steppers.",
            icon: "stats-chart-sharp",
        },
        {
            id: 8,
            title: "Quick Access & Logs",
            desc: "Pin favorite tools and review the history of last 15 outputs.",
            icon: "star-sharp",
        },
    ];

    const shadowStyle = Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: dark ? 0.25 : 0.05,
            shadowRadius: 10,
        },
        android: {
            elevation: 2,
        },
    });

    const logoOuterRing = {
        backgroundColor: addOpacity(colors.primary, "08"),
        borderColor: addOpacity(colors.primary, "25"),
        borderStyle: "dashed" as const,
        borderWidth: 2,
    };

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            {/* Top Header */}
            <View
                className="flex-row items-center justify-between pb-2 px-6 border-b"
                style={{
                    paddingTop: Math.max(insets.top, 8),
                    borderBottomColor: addOpacity(colors.divider, "10"),
                }}
            >
                <View className="flex-row items-center">
                    <Ionicons
                        name="information-circle"
                        size={24}
                        color={colors.primary}
                        className="mr-2"
                    />
                    <Text
                        className="text-xl font-bold tracking-tight"
                        style={{ color: colors.text }}
                    >
                        About App
                    </Text>
                </View>
                <Pressable
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={({ pressed }) => [
                        {
                            backgroundColor: cardBg,
                            borderWidth: 1,
                            borderColor: cardBorder,
                            opacity: pressed ? 0.7 : 1,
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    <Ionicons name="close" size={22} color={colors.text} />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: 16,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Logo & Headline Card */}
                <View 
                    className="items-center rounded-[24px] p-6 mb-3 border"
                    style={[
                        {
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                        },
                        shadowStyle
                    ]}
                >
                    {/* Pulsing Dash Ring for Icon */}
                    <View 
                        className="w-28 h-28 rounded-full items-center justify-center mb-4"
                        style={logoOuterRing}
                    >
                        <Image
                            className="w-[86px] h-[86px] rounded-[22px]"
                            source={icon}
                        />
                    </View>
                    
                    <Text
                        className="text-3xl font-extrabold tracking-tight"
                        style={{ fontFamily: "Flamante", color: colors.secondary }}
                    >
                        Calculator
                    </Text>
                    
                    <View
                        className="px-3 py-1 rounded-full mt-2 border"
                        style={{
                            backgroundColor: addOpacity(colors.secondary, "10"),
                            borderColor: addOpacity(colors.secondary, "20"),
                        }}
                    >
                        <Text
                            className="text-xs font-bold tracking-wide"
                            style={{ color: colors.secondary }}
                        >
                            VERSION {appVersion}
                        </Text>
                    </View>
                    
                    <Text
                        className="text-[14px] mt-4 opacity-70 text-center leading-5"
                        style={{ color: colors.text }}
                    >
                        An elegant, multipurpose utility designed for fast daily conversions, equation solving, and interactive step-by-step arithmetic.
                    </Text>
                </View>

                {/* About Developer Section */}
                <View
                    className="flex-row items-center rounded-[20px] p-4 mb-3 border"
                    style={[
                        {
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                        },
                        shadowStyle
                    ]}
                >
                    <View 
                        className="w-11 h-11 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: addOpacity(colors.secondary, "10") }}
                    >
                        <Ionicons name="code-slash" size={20} color={colors.secondary} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs opacity-50 uppercase tracking-wider font-semibold" style={{ color: colors.text }}>
                            Developer
                        </Text>
                        <Text
                            className="text-base font-bold"
                            style={{ fontFamily: "Flamante", color: colors.text }}
                        >
                            Sougata Talukdar
                        </Text>
                    </View>
                </View>

                {/* Project Open-Source Info */}
                <View
                    className="rounded-[20px] p-5 mb-3 border"
                    style={[
                        {
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                        },
                        shadowStyle
                    ]}
                >
                    <View className="flex-row items-center mb-3">
                        <Ionicons name="logo-github" size={20} color={colors.text} className="mr-2" />
                        <Text className="text-base font-bold" style={{ color: colors.text }}>
                            Open Source Project
                        </Text>
                    </View>
                    <Text
                        className="text-sm leading-6 opacity-80"
                        style={{ color: colors.text }}
                    >
                        This project is open source and built with React Native. You are free to modify or contribute! If you like this work, please consider giving a star to the repository.
                    </Text>
                    
                    <Pressable
                        className="flex-row items-center justify-center rounded-2xl py-3 mt-4 border border-gray-500"
                        style={({ pressed }) => [
                            {
                                backgroundColor: colors.secondary,
                                borderColor: colors.secondary,
                                opacity: pressed ? 0.9 : 1,
                            },
                        ]}
                        onPress={() =>
                            Linking.openURL(
                                "https://github.com/Sou-gata/react-native-calculator",
                            )
                        }
                    >
                        <Ionicons
                            name="star"
                            size={18}
                            color="#fff"
                        />
                        <Text
                            className="text-sm font-bold ml-2"
                            style={{color:colors.text}}
                        >
                            Star on GitHub
                        </Text>
                    </Pressable>
                </View>

                {/* Key Features Accordion/Card */}
                <View
                    className="rounded-[24px] p-5 mb-3 border"
                    style={[
                        {
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                        },
                        shadowStyle
                    ]}
                >
                    <Text
                        className="text-lg font-bold mb-4"
                        style={{ fontFamily: "Flamante", color: colors.secondary }}
                    >
                        Key Capabilities
                    </Text>
                    {keyFeatures.map((item, index) => {
                        const isLast = index === keyFeatures.length - 1;
                        return (
                            <View
                                key={item.id}
                                className={`flex-row items-start py-3.5 ${
                                    isLast ? "" : "border-b"
                                }`}
                                style={{
                                    borderBottomColor: addOpacity(colors.divider, "08"),
                                }}
                            >
                                <View
                                    className="w-10 h-10 rounded-full items-center justify-center mr-3 mt-0.5"
                                    style={{ backgroundColor: addOpacity(colors.primary, "08") }}
                                >
                                    <Ionicons
                                        name={item.icon}
                                        size={18}
                                        color={colors.secondary}
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text
                                        className="text-[15px] font-bold"
                                        style={{ color: colors.text }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        className="text-xs opacity-60 mt-1 leading-4"
                                        style={{ color: colors.text }}
                                    >
                                        {item.desc}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Contact Developer Card */}
                <View
                    className="rounded-[24px] p-5 mb-6 border"
                    style={[
                        {
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                        },
                        shadowStyle
                    ]}
                >
                    <Text
                        className="text-base font-bold text-center mb-4"
                        style={{ color: colors.text }}
                    >
                        Connect with Developer
                    </Text>
                    <View className="flex-row justify-around items-center">
                        <Pressable
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={({ pressed }) => [
                                {
                                    backgroundColor: dark ? "#1877f215" : "#1877f208",
                                    borderWidth: 1,
                                    borderColor: addOpacity("#1877f2", "20"),
                                    opacity: pressed ? 0.75 : 1,
                                },
                            ]}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.facebook.com/sougata76/",
                                )
                            }
                        >
                            <Ionicons
                                name="logo-facebook"
                                size={22}
                                color="#1877f2"
                            />
                        </Pressable>
                        <Pressable
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={({ pressed }) => [
                                {
                                    backgroundColor: dark ? "#e1306c15" : "#e1306c08",
                                    borderWidth: 1,
                                    borderColor: addOpacity("#e1306c", "20"),
                                    opacity: pressed ? 0.75 : 1,
                                },
                            ]}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.instagram.com/sougata_76/",
                                )
                            }
                        >
                            <Ionicons
                                name="logo-instagram"
                                size={22}
                                color="#e1306c"
                            />
                        </Pressable>
                        <Pressable
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={({ pressed }) => [
                                {
                                    backgroundColor: dark ? "#0077b515" : "#0077b508",
                                    borderWidth: 1,
                                    borderColor: addOpacity("#0077b5", "20"),
                                    opacity: pressed ? 0.75 : 1,
                                },
                            ]}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.linkedin.com/in/sougata76/",
                                )
                            }
                        >
                            <Ionicons
                                name="logo-linkedin"
                                size={22}
                                color="#0077b5"
                            />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default About;
