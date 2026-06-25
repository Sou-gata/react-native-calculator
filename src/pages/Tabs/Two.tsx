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

const Two = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const { colors } = useTheme<colorSchemeType>();
    const [searchQuery, setSearchQuery] = useState("");

    const androidRipple = {
        color: colors.secondary + "25",
        radius: 45,
        borderless: true,
    };

    // Filtering components based on the search query
    const filteredComponents = Object.keys(secondTabComponents).reduce(
        (acc, category) => {
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
                className="flex-row items-center mx-4 mt-4 mb-2 px-4 rounded-[24px] border h-[46px]"
                style={{
                    backgroundColor: colors.backgroundColor,
                    borderColor: colors.divider || "rgba(0,0,0,0.05)",
                }}
            >
                <Ionicons
                    name="search"
                    size={18}
                    color={colors.secondary}
                    className="mr-2"
                />
                <RNTextInput
                    className="flex-1 text-[15px] py-0"
                    style={{ color: colors.text }}
                    placeholder="Search tools..."
                    placeholderTextColor={colors.secondary + "50"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-6"
            >
                {hasResults ? (
                    Object.keys(filteredComponents).map(
                        (category: string, index: number) => {
                            const components = filteredComponents[category];

                            return (
                                <View key={index} className="mt-4">
                                    <View className="flex-row items-center px-4 mb-2">
                                        <View
                                            className="w-[3px] h-3.5 rounded-[1.5px] mr-2"
                                            style={{ backgroundColor: colors.secondary }}
                                        />
                                        <Text
                                            className="text-[14px] uppercase font-bold tracking-[0.5px] opacity-90"
                                            style={{ color: colors.secondary }}
                                        >
                                            {category}
                                        </Text>
                                    </View>
                                    <View className="flex-row flex-wrap px-2">
                                        {components.map(
                                            (
                                                comp: componentNameType,
                                                key: number
                                            ) => (
                                                <View
                                                    key={index + key + comp.id}
                                                    className="items-center justify-center my-1"
                                                    style={{
                                                        width: (Dimensions.get("window").width - 16) * 0.25,
                                                    }}
                                                >
                                                    <Pressable
                                                        className="w-[90%] items-center justify-center rounded-xl p-1"
                                                        style={{
                                                            height: Dimensions.get("window").height * 0.14,
                                                        }}
                                                        android_ripple={androidRipple}
                                                        onPress={() => {
                                                            navigation.navigate(
                                                                comp.name
                                                            );
                                                        }}
                                                    >
                                                        <Image
                                                            className="mb-2 w-[38px] h-[38px]"
                                                            style={{ tintColor: colors.secondary }}
                                                            source={comp.path}
                                                        />
                                                        <Text
                                                            numberOfLines={2}
                                                            className="text-center text-[11px] font-medium leading-3.5"
                                                            style={{ color: colors.text }}
                                                        >
                                                            {comp.text}
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            )
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
            </ScrollView>
        </View>
    );
};

export default Two;
