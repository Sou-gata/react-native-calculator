import React, { useState } from "react";
import {
    View,
    Pressable,
    ScrollView,
    Platform,
} from "react-native";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import data from "../helpers/versionInfo";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorSchemeType } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
    FadeInUp,
    FadeOutUp,
    LinearTransition,
} from "react-native-reanimated";
import { addOpacity } from "../helpers/functions";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getChangeCategory = (change: string) => {
    const text = change.toLowerCase();
    if (
        text.includes("add") ||
        text.includes("new") ||
        text.includes("create") ||
        text.includes("introduced")
    ) {
        return {
            type: "feature" as const,
            icon: "sparkles-sharp",
            color: "#10b981", // Emerald Green
            bg: "#ecfdf5",
            darkBg: "#065f4630",
            label: "Feature",
        };
    }
    if (
        text.includes("fix") ||
        text.includes("bugs") ||
        text.includes("bug") ||
        text.includes("issue")
    ) {
        return {
            type: "fix" as const,
            icon: "bug-sharp",
            color: "#ef4444", // Rose Red
            bg: "#fef2f2",
            darkBg: "#991b1b30",
            label: "Fix",
        };
    }
    return {
        type: "improvement" as const,
        icon: "trending-up-sharp",
        color: "#3b82f6", // Royal Blue
        bg: "#eff6ff",
        darkBg: "#1e40af30",
        label: "Improvement",
    };
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const WhatsNew = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors, dark } = useTheme<colorSchemeType>();
    const insets = useSafeAreaInsets();

    const [expandedVersion, setExpandedVersion] = useState<string | null>(
        data[0]?.ver || null
    );

    const toggleExpand = (version: string) => {
        setExpandedVersion((prev) => (prev === version ? null : version));
    };

    const cardShadowStyle = Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 6,
        },
        android: {
            elevation: 1,
        },
    });

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            {/* Elegant Sticky Header */}
            <View
                className="flex-row items-center justify-between px-6 pb-4 border-b"
                style={{
                    paddingTop: Math.max(insets.top, 16),
                    borderBottomColor: addOpacity(colors.divider, "10"),
                }}
            >
                <View className="flex-1 mr-4">
                    <View className="flex-row items-center">
                        <Text
                            className="text-[28px] font-bold tracking-tight"
                            style={{ color: colors.text }}
                        >
                            What's New
                        </Text>
                        <Ionicons
                            name="sparkles"
                            size={22}
                            color={colors.secondary}
                            className="ml-2"
                        />
                    </View>
                    <Text
                        className="text-[13px] mt-1"
                        style={{ color: addOpacity(colors.text, "80") }}
                    >
                        Updates, features, and fixes in this release
                    </Text>
                </View>
                <Pressable
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={({ pressed }) => [
                        {
                            backgroundColor: addOpacity(colors.divider, "08"),
                            borderWidth: 1,
                            borderColor: addOpacity(colors.divider, "10"),
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

            {/* ScrollView of Cards */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingTop: 24,
                    paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
            >
                {data.map((item, index) => {
                    const isLatest = index === 0;
                    const isExpanded = expandedVersion === item.ver;

                    return (
                        <View className="flex-row" key={item.ver}>
                            <View className="flex-1">
                                <AnimatedPressable
                                    layout={LinearTransition.duration(200)}
                                    onPress={() => toggleExpand(item.ver)}
                                    className="rounded-2xl px-4 py-3.5 mb-5"
                                    style={({ pressed }: { pressed: boolean }) => [
                                        {
                                            backgroundColor: isLatest
                                                ? dark
                                                    ? addOpacity(colors.primary, "12")
                                                    : addOpacity(colors.primary, "06")
                                                : dark
                                                ? "#2c3134"
                                                : "#ffffff",
                                            borderWidth: 1,
                                            borderColor: isLatest
                                                ? addOpacity(colors.primary, "30")
                                                : dark
                                                ? addOpacity(colors.divider, "10")
                                                : addOpacity(colors.divider, "08"),
                                            opacity: pressed ? 0.95 : 1,
                                            ...cardShadowStyle,
                                        },
                                    ]}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1">
                                            <Text
                                                className="text-[17px] font-bold tracking-tight"
                                                style={{ color: colors.text }}
                                            >
                                                Version {item.ver}
                                            </Text>
                                            {isLatest && (
                                                <View
                                                    className="px-2 py-0.5 rounded-full ml-2.5"
                                                    style={{ backgroundColor: colors.primary }}
                                                >
                                                    <Text className="color-white text-[10px] font-extrabold tracking-wider">
                                                        LATEST
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                        <Ionicons
                                            name={isExpanded ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color={addOpacity(colors.text, "60")}
                                        />
                                    </View>

                                    {isExpanded && (
                                        <Animated.View
                                            entering={FadeInUp.duration(200)}
                                            exiting={FadeOutUp.duration(200)}
                                            className="mt-4 pt-3 border-t"
                                            style={{ borderTopColor: addOpacity(colors.divider, "08") }}
                                        >
                                            {item.changes.map((change, idx) => {
                                                const category = getChangeCategory(change);
                                                return (
                                                    <View key={idx} className="flex-row items-start my-1.5">
                                                        <View
                                                            className="w-[22px] h-[22px] rounded-full items-center justify-center mt-0.5"
                                                            style={{
                                                                backgroundColor: dark
                                                                    ? category.darkBg
                                                                    : category.bg,
                                                            }}
                                                        >
                                                            <Ionicons
                                                                name={category.icon}
                                                                size={12}
                                                                color={category.color}
                                                            />
                                                        </View>
                                                        <Text
                                                            className="text-sm flex-1 ml-2.5 leading-5"
                                                            style={{ color: addOpacity(colors.text, "d0") }}
                                                        >
                                                            {capitalize(change)}
                                                        </Text>
                                                    </View>
                                                );
                                            })}
                                        </Animated.View>
                                    )}
                                </AnimatedPressable>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default WhatsNew;
