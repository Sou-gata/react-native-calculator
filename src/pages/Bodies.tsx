import { View, ScrollView, Image, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { bodyList } from "../helpers/componentName";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorSchemeType } from "../../types";

const Bodies = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors } = useTheme<colorSchemeType>();

    return (
        <View
            className="flex-1 py-5 px-[30px]"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {bodyList.map((shape, index) => (
                    <View
                        className="overflow-hidden rounded-[7px]"
                        key={index}
                    >
                        <Pressable
                            android_ripple={{
                                color: colors.secondary + "20",
                                radius: 200,
                            }}
                            key={index}
                            className="flex-row items-center py-[5px] px-[10px] rounded-[10px] justify-start"
                            onPress={() =>
                                navigation.navigate(shape.label, shape)
                            }
                        >
                            <View className="p-[15px] bg-[#00000020] rounded-full w-[55px] h-[55px]">
                                <Image
                                    className="w-[25px] h-[25px]"
                                    style={{ tintColor: colors.secondary }}
                                    source={shape.icon}
                                />
                            </View>
                            <Text
                                className="text-[18px] ml-[25px]"
                                style={{ color: colors.text }}
                            >
                                {shape.label}
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Bodies;
