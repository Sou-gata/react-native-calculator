import React, { useState } from "react";
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
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

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.backgroundColor,
            flex: 1,
        },
        searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.calBg,
            marginHorizontal: 16,
            marginTop: 16,
            marginBottom: 8,
            paddingHorizontal: 16,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: colors.divider || "rgba(0,0,0,0.05)",
            height: 46,
        },
        searchIcon: {
            marginRight: 8,
        },
        searchInput: {
            flex: 1,
            color: colors.text,
            fontSize: 15,
            paddingVertical: 0,
        },
        clearButton: {
            padding: 4,
        },
        scrollContent: {
            paddingBottom: 24,
        },
        sectionContainer: {
            marginTop: 16,
        },
        headerContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            marginBottom: 8,
        },
        headerAccent: {
            width: 3,
            height: 14,
            backgroundColor: colors.secondary,
            borderRadius: 1.5,
            marginRight: 8,
        },
        heading: {
            fontSize: 14,
            color: colors.secondary,
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: 0.5,
            opacity: 0.9,
        },
        gridContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 8,
        },
        cardWrapper: {
            width: (Dimensions.get("window").width - 16) * 0.25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 4,
        },
        cardBtn: {
            width: "90%",
            height: Dimensions.get("window").height * 0.14,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            padding: 4,
        },
        icons: {
            marginBottom: 8,
            width: 38,
            height: 38,
            tintColor: colors.secondary,
        },
        btnText: {
            textAlign: "center",
            color: colors.text,
            fontSize: 11,
            fontWeight: "500",
            lineHeight: 14,
        },
        noResultsContainer: {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 60,
            paddingHorizontal: 20,
        },
        noResultsText: {
            fontSize: 15,
            color: colors.text,
            opacity: 0.6,
            marginTop: 12,
            textAlign: "center",
        },
    });

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
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={18}
                    color={colors.secondary}
                    style={styles.searchIcon}
                />
                <RNTextInput
                    style={styles.searchInput}
                    placeholder="Search tools..."
                    placeholderTextColor={colors.text + "50"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                    <Pressable
                        onPress={() => setSearchQuery("")}
                        style={styles.clearButton}
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
                contentContainerStyle={styles.scrollContent}
            >
                {hasResults ? (
                    Object.keys(filteredComponents).map(
                        (category: string, index: number) => {
                            const components = filteredComponents[category];

                            return (
                                <View key={index} style={styles.sectionContainer}>
                                    <View style={styles.headerContainer}>
                                        <View style={styles.headerAccent} />
                                        <Text style={styles.heading}>{category}</Text>
                                    </View>
                                    <View style={styles.gridContainer}>
                                        {components.map(
                                            (
                                                comp: componentNameType,
                                                key: number
                                            ) => (
                                                <View
                                                    key={index + key + comp.id}
                                                    style={styles.cardWrapper}
                                                >
                                                    <Pressable
                                                        style={styles.cardBtn}
                                                        android_ripple={androidRipple}
                                                        onPress={() => {
                                                            navigation.navigate(
                                                                comp.name
                                                            );
                                                        }}
                                                    >
                                                        <Image
                                                            style={styles.icons}
                                                            source={comp.path}
                                                        />
                                                        <Text
                                                            numberOfLines={2}
                                                            style={styles.btnText}
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
                    <View style={styles.noResultsContainer}>
                        <Ionicons
                            name="search-outline"
                            size={44}
                            color={colors.secondary}
                            style={{ opacity: 0.5 }}
                        />
                        <Text style={styles.noResultsText}>
                            No tools found matching "{searchQuery}"
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Two;
