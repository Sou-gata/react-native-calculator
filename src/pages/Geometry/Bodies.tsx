import { View, ScrollView, Image, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { bodyList } from "../../helpers/componentName";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorSchemeType } from "../../../types";
import { addOpacity } from "../../helpers/functions";

const Bodies = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors } = useTheme<colorSchemeType>();

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20 }}
            >
                <View className="flex-row flex-wrap justify-between w-full">
                    {bodyList.map((shape, index) => (
                        <View
                            key={index}
                            className="w-[48%] mb-4 rounded-3xl border overflow-hidden"
                            style={{
                                backgroundColor: colors.elevation.level2,
                                borderColor: addOpacity(colors.divider, "10"),
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.05,
                                shadowRadius: 8,
                                elevation: 2,
                            }}
                        >
                            <Pressable
                                android_ripple={{
                                    color: colors.secondary + "20",
                                }}
                                className="items-center justify-center p-5"
                                onPress={() =>
                                    navigation.navigate(shape.label, shape)
                                }
                            >
                                <View 
                                    className="w-16 h-16 rounded-full items-center justify-center mb-3"
                                    style={{
                                        backgroundColor: colors.secondary + "12",
                                    }}
                                >
                                    <Image
                                        className="w-8 h-8"
                                        style={{ tintColor: colors.secondary, resizeMode: "contain" }}
                                        source={shape.icon}
                                    />
                                </View>
                                <Text
                                    className="text-[15px] font-bold text-center"
                                    style={{ color: colors.text }}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                >
                                    {shape.label}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Bodies;
