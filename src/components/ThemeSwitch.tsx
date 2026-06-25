import { View, Pressable, Animated } from "react-native";
import { useRef, useContext } from "react";
import { cssInterop } from "nativewind";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Context } from "../../Context";
import { useTheme } from "react-native-paper";
import { colorSchemeType } from "../../types";

cssInterop(Animated.View, {
    className: "style",
});

const ThemeSwitch = () => {
    const { colors } = useTheme<colorSchemeType>();
    const state = useContext(Context);
    const animOne = useRef(
        new Animated.Value(state?.theme === "dark" ? 0 : 1)
    ).current;
    const animTwo = useRef(
        new Animated.Value(state?.theme === "dark" ? 1 : 0)
    ).current;

    const lightIn = () => {
        Animated.timing(animOne, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(animTwo, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const rotateOne = animOne.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const darkIn = () => {
        Animated.timing(animOne, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(animTwo, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const rotateTwo = animTwo.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    return (
        <View className="absolute z-[99] right-4 top-2.5 w-6 h-6">
            <Pressable
                onPress={() => {
                    if (state?.theme === "dark") lightIn();
                    else darkIn();
                    state?.updateTheme(
                        state.theme === "light" ? "dark" : "light"
                    );
                }}>
                <Animated.View
                    className="absolute top-0 left-0"
                    style={{
                        opacity: animOne,
                        transform: [
                            { scale: animOne },
                            { rotate: rotateOne },
                        ],
                    }}>
                    <MaterialIcons
                        name="brightness-7"
                        size={24}
                        color={colors.secondary}
                    />
                </Animated.View>
                <Animated.View
                    className="absolute top-0 left-0"
                    style={{
                        opacity: animTwo,
                        transform: [
                            { scale: animTwo },
                            { rotate: rotateTwo },
                        ],
                    }}>
                    <Ionicons name="moon" size={24} color={colors.secondary} />
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default ThemeSwitch;
