import { View, ScrollView, Image, Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { shapeList } from "../helpers/componentName";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorSchemeType } from "../../types";

const Shapes = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors } = useTheme<colorSchemeType>();

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 20,
            paddingHorizontal: 30,
            backgroundColor: colors.backgroundColor,
            flex: 1,
        },
        shapeContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "flex-start",
        },
        iconBg: {
            padding: 15,
            backgroundColor: "#00000020",
            borderRadius: 50,
            width: 55,
            height: 55,
        },
        icon: {
            width: 26,
            height: 25,
            tintColor: colors.secondary,
        },
        text: {
            fontSize: 18,
            color: colors.text,
            marginLeft: 25,
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {shapeList.map((shape, index) => (
                    <View
                        style={{ overflow: "hidden", borderRadius: 7 }}
                        key={index}>
                        <Pressable
                            android_ripple={{
                                color: colors.secondary + "20",
                                radius: 200,
                            }}
                            style={styles.shapeContainer}
                            onPress={() =>
                                navigation.navigate(shape.label, shape)
                            }>
                            <View style={styles.iconBg}>
                                <Image
                                    style={styles.icon}
                                    source={shape.icon}
                                />
                            </View>
                            <Text style={styles.text}>{shape.label}</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Shapes;
