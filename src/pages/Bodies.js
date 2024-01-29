import { View, ScrollView, Image, Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { bodyList } from "../helpers/componentName";

const Bodies = ({ navigation }) => {
    const { colors } = useTheme();

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
            marginBottom: 5,
            paddingTop: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
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
            width: 25,
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
                {bodyList.map((shape, index) => (
                    <Pressable
                        android_ripple={{
                            color: colors.secondary + "20",
                            radius: 200,
                        }}
                        key={index}
                        style={styles.shapeContainer}
                        onPress={() =>
                            navigation.navigate(shape.label, { shape })
                        }>
                        <View style={styles.iconBg}>
                            <Image style={styles.icon} source={shape.icon} />
                        </View>
                        <Text style={styles.text}>{shape.label}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

export default Bodies;
