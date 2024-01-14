import { StyleSheet, Pressable, View } from "react-native";
import { useTheme, Text } from "react-native-paper";

const SegmentedButtons = ({ data, value, onChange }) => {
    const { colors } = useTheme();
    const setValue = onChange;
    return (
        <View style={[styles.flexRow]}>
            {data.map((item, i) => {
                if (i == 0) {
                    return (
                        <Pressable
                            key={i}
                            onPress={() => setValue(item.value)}
                            style={[
                                styles.sagment,
                                styles.one,
                                { borderColor: colors.secondary },
                                item.value == value
                                    ? {
                                          backgroundColor:
                                              colors.secondary + "80",
                                      }
                                    : {},
                            ]}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: colors.text,
                                }}>
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                } else if (i == data.length - 1) {
                    return (
                        <Pressable
                            key={i}
                            onPress={() => setValue(item.value)}
                            style={[
                                styles.sagment,
                                styles.last,
                                { borderColor: colors.secondary },
                                item.value == value
                                    ? {
                                          backgroundColor:
                                              colors.secondary + "80",
                                      }
                                    : {},
                            ]}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: colors.text,
                                }}>
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                } else {
                    return (
                        <Pressable
                            key={i}
                            onPress={() => setValue(item.value)}
                            style={[
                                styles.sagment,
                                { borderColor: colors.secondary },
                                item.value == value
                                    ? {
                                          backgroundColor:
                                              colors.secondary + "80",
                                      }
                                    : {},
                            ]}>
                            <Text
                                style={[
                                    {
                                        textAlign: "center",
                                        color: colors.text,
                                    },
                                ]}>
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                }
            })}
        </View>
    );
};

export default SegmentedButtons;

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
    },
    sagment: {
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        width: 50,
    },
    one: {
        borderBottomStartRadius: 20,
        borderTopStartRadius: 20,
    },
    last: {
        borderRightWidth: 1,
        borderBottomEndRadius: 20,
        borderTopEndRadius: 20,
    },
});
