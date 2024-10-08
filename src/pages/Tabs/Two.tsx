import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Pressable,
    Dimensions,
} from "react-native";
import { useTheme, Text, TextInput } from "react-native-paper";

import { secondTabComponents } from "../../helpers/componentName";
import {
    colorSchemeType,
    componentNameType,
    secondTabComponentsType,
} from "../../../types";

import { StackNavigationProp } from "@react-navigation/stack";

const Two = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const { colors } = useTheme<colorSchemeType>();
    const androidRipple = {
        color: colors.secondary + "80",
        radius: 100,
    };

    const styles = StyleSheet.create({
        btnText: {
            textAlign: "center",
            color: colors.text,
        },
        homeBtn: {
            width: (Dimensions.get("window").width - 10) * 0.25,
            height: Dimensions.get("window").height * 0.175,
            alignItems: "center",
            justifyContent: "center",
        },
        pressable: {
            borderRadius: 7,
            overflow: "hidden",
        },
        homeMain: {
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 5,
        },
        icons: {
            marginBottom: 10,
            width: 40,
            height: 40,
            tintColor: colors.secondary,
        },
        heading: {
            fontSize: 18,
            color: colors.secondary + "80",
            padding: 2,
            paddingLeft: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
        },
    });

    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(secondTabComponents).map(
                    (item: string, index: number) => {
                        const Component: componentNameType[] =
                            secondTabComponents[
                                item as keyof secondTabComponentsType
                            ];

                        return (
                            <View key={index}>
                                <Text style={styles.heading}>{item}</Text>
                                <View style={styles.homeMain}>
                                    {Component.map(
                                        (
                                            comp: componentNameType,
                                            key: number
                                        ) => (
                                            <View
                                                key={index + key + comp.id}
                                                style={styles.pressable}>
                                                <Pressable
                                                    style={styles.homeBtn}
                                                    android_ripple={
                                                        androidRipple
                                                    }
                                                    onPress={() => {
                                                        navigation.navigate(
                                                            comp.name
                                                        );
                                                    }}>
                                                    <Image
                                                        style={styles.icons}
                                                        source={comp.path}
                                                    />
                                                    <Text
                                                        style={styles.btnText}>
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
                )}
            </ScrollView>
        </View>
    );
};

export default Two;
