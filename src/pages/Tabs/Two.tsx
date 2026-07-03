import React, { useState } from "react";
import {
    View,
    ScrollView,
    Image,
    Pressable,
    Dimensions,
    TextInput as RNTextInput,
} from "react-native";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { secondTabComponents } from "../../helpers/componentName";
import {
    colorSchemeType,
    componentNameType,
    secondTabComponentsType,
} from "../../../types";

import { StackNavigationProp } from "@react-navigation/stack";
import { addOpacity } from "../../helpers/functions";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

const Two = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const { colors } = useTheme<colorSchemeType>();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    React.useEffect(() => {
        translateX.value = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCategoryPress = (catId: string, index: number) => {
        if (catId === activeCategory) return;

        const screenWidth = Dimensions.get("window").width;
        const isMovingRight = index >= currentCategoryIndex;
        const slideInFrom = isMovingRight ? screenWidth : -screenWidth;

        translateX.value = slideInFrom;

        setCurrentCategoryIndex(index);
        setActiveCategory(catId);

        translateX.value = withTiming(0, { duration: 200 });
    };

    const androidRipple = {
        color: addOpacity(colors.secondary, "25"),
        radius: 45,
        borderless: true,
    };

    const categoriesList = [
        { id: "All", text: "All", icon: "apps-outline" },
        { id: "Converters", text: "Converters", icon: "swap-horizontal-outline" },
        { id: "Arithmetic", text: "Arithmetic", icon: "calculator-outline" },
        { id: "Algebra", text: "Algebra", icon: "analytics-outline" },
        { id: "Geometry", text: "Geometry", icon: "shapes-outline" },
        { id: "Time", text: "Time", icon: "time-outline" },
        { id: "Finance", text: "Finance", icon: "cash-outline" },
        { id: "Others", text: "Others", icon: "ellipsis-horizontal-circle-outline" },
    ];

    const categoryIcons: Record<string, string> = {
        Converters: "swap-horizontal-outline",
        Arithmetic: "calculator-outline",
        Algebra: "analytics-outline",
        Geometry: "shapes-outline",
        Time: "time-outline",
        Finance: "cash-outline",
        Others: "ellipsis-horizontal-circle-outline",
    };

    // Filtering components based on the search query and active category
    const filteredComponents = Object.keys(secondTabComponents).reduce(
        (acc, category) => {
            if (activeCategory !== "All" && activeCategory !== category) {
                return acc;
            }
            const comps = secondTabComponents[
                category as keyof secondTabComponentsType
            ];
            const matched = comps.filter((comp) =>
                comp.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (matched.length > 0) {
                acc[category] = matched;
            }
            return acc;
        },
        {} as Record<string, componentNameType[]>
    );

    const hasResults = Object.keys(filteredComponents).length > 0;

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            {/* Search Bar */}
            <View
                className="flex-row items-center mx-4 mt-4 mb-2 px-4 rounded-[20px] border h-[48px]"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: isSearchFocused ? colors.primary : addOpacity(colors.divider, "08"),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                    elevation: 1,
                }}
            >
                <Ionicons
                    name="search"
                    size={18}
                    color={isSearchFocused ? colors.primary : colors.secondary}
                    className="mr-2"
                />
                <RNTextInput
                    className="flex-1 text-[15px] py-0"
                    style={{ color: colors.text }}
                    placeholder="Search tools..."
                    placeholderTextColor={addOpacity(colors.text, "40")}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
                {searchQuery.length > 0 && (
                    <Pressable
                        onPress={() => setSearchQuery("")}
                        className="p-1"
                    >
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.text + "80"}
                        />
                    </Pressable>
                )}
            </View>

            {/* Category Filter Pills */}
            <View className="mb-2">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="px-4 py-1"
                >
                    {categoriesList.map((cat, idx) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <Pressable
                                key={cat.id}
                                onPress={() => handleCategoryPress(cat.id, idx)}
                                className="flex-row items-center px-4 py-2 rounded-full mr-2.5 border"
                                style={{
                                    backgroundColor: isActive ? colors.secondary : colors.elevation.level2,
                                    borderColor: isActive ? colors.secondary : addOpacity(colors.divider, "08"),
                                }}
                            >
                                <Ionicons
                                    name={cat.icon}
                                    size={15}
                                    color={isActive ? "#ffffff" : colors.text}
                                    style={{ marginRight: 6 }}
                                />
                                <Text
                                    className="text-[12px] font-bold tracking-[0.2px]"
                                    style={{ color: isActive ? "#ffffff" : colors.text }}
                                >
                                    {cat.text}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-6"
            >
                <Animated.View
                    style={animatedStyle}
                    className="flex-1"
                >
                    {hasResults ? (
                    Object.keys(filteredComponents).map(
                        (category: string) => {
                            const components = filteredComponents[category];

                            return (
                                <View key={category} className="mt-4">
                                    {/* Category Section Header */}
                                    <View className="flex-row items-center justify-between px-4 mb-3 mt-2">
                                        <View className="flex-row items-center">
                                            <View
                                                className="w-7 h-7 rounded-lg items-center justify-center mr-2.5"
                                                style={{ backgroundColor: addOpacity(colors.secondary, "10") }}
                                            >
                                                <Ionicons
                                                    name={categoryIcons[category] || "cube-outline"}
                                                    size={16}
                                                    color={colors.secondary}
                                                />
                                            </View>
                                            <Text
                                                className="text-[14px] font-bold tracking-[0.3px]"
                                                style={{ color: colors.text }}
                                            >
                                                {category}
                                            </Text>
                                        </View>
                                        <View
                                            className="px-2.5 py-0.5 rounded-full"
                                            style={{ backgroundColor: addOpacity(colors.divider, "08") }}
                                        >
                                            <Text
                                                className="text-[10px] font-bold"
                                                style={{ color: addOpacity(colors.text, "90") }}
                                            >
                                                {components.length} {components.length === 1 ? "tool" : "tools"}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Tools Grid */}
                                    <View className="flex-row flex-wrap px-3.5 justify-start">
                                        {components.map(
                                            (
                                                comp: componentNameType
                                            ) => {
                                                const cardWidth = (Dimensions.get("window").width - 28 - 18) / 3;
                                                return (
                                                    <View
                                                        key={comp.name}
                                                        className="items-center justify-center my-1.5"
                                                        style={{
                                                            width: cardWidth,
                                                            marginHorizontal: 3,
                                                        }}
                                                    >
                                                        <Pressable
                                                            className="w-full items-center justify-center rounded-2xl p-2 border"
                                                            style={{
                                                                height: 110,
                                                                backgroundColor: colors.elevation.level2,
                                                                borderColor: addOpacity(colors.divider, "20"),
                                                                shadowColor: "#000",
                                                                shadowOffset: { width: 0, height: 1 },
                                                                shadowOpacity: 0.05,
                                                                shadowRadius: 2,
                                                                elevation: 2,
                                                            }}
                                                            android_ripple={androidRipple}
                                                            onPress={() => {
                                                                navigation.navigate(
                                                                    comp.name
                                                                );
                                                            }}
                                                        >
                                                            {/* Soft icon background bubble */}
                                                            <View
                                                                className="w-14 h-14 rounded-full items-center justify-center mb-2"
                                                                style={{
                                                                    backgroundColor: addOpacity(colors.secondary, "20"),
                                                                }}
                                                            >
                                                                <Image
                                                                    className="w-[26px] h-[26px]"
                                                                    style={{ tintColor: colors.secondary }}
                                                                    source={comp.path}
                                                                />
                                                            </View>
                                                            <Text
                                                                numberOfLines={2}
                                                                className="text-center text-[10.5px] font-bold leading-3.5 px-0.5"
                                                                style={{ color: colors.text }}
                                                            >
                                                                {comp.text}
                                                            </Text>
                                                        </Pressable>
                                                    </View>
                                                );
                                            }
                                        )}
                                    </View>
                                </View>
                            );
                        }
                    )
                ) : (
                    <View className="items-center justify-center py-[60px] px-5">
                        <Ionicons
                            name="search-outline"
                            size={44}
                            color={colors.secondary}
                            style={{ opacity: 0.5 }}
                        />
                        <Text
                            className="text-[15px] opacity-60 mt-3 text-center"
                            style={{ color: colors.text }}
                        >
                            No tools found matching "{searchQuery}"
                        </Text>
                    </View>
                )}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default Two;
