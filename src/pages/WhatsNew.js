import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import data from "../helpers/versionInfo";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const RenderItem = ({ item, colors }) => {
    return (
        <>
            <Text
                style={[
                    styles.aboutAppName,
                    {
                        marginTop: 20,
                        marginBottom: 10,
                        color: colors.secondary,
                    },
                ]}>
                {item.ver}
            </Text>
            {item.changes.map((change, index) => (
                <Text
                    key={index}
                    style={[
                        styles.aboutText,
                        { marginLeft: 15, color: colors.text },
                    ]}>
                    {"\u2022  "}
                    {change}
                </Text>
            ))}
        </>
    );
};

const WhatsNew = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <Pressable
                style={styles.cross}
                onPress={() => {
                    navigation.navigate("Home");
                }}>
                <Ionicons
                    style={styles.crossImg}
                    name="close"
                    size={35}
                    color={colors.secondary}
                />
            </Pressable>
            <ScrollView
                style={{ padding: 30 }}
                showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 45 }}>
                    {(() => {
                        let allCom = [];
                        for (let i = 0; i < data.length; i++) {
                            let com = (
                                <RenderItem
                                    key={i}
                                    item={data[i]}
                                    colors={colors}
                                />
                            );
                            allCom.push(com);
                        }
                        return allCom;
                    })()}
                </View>
            </ScrollView>
        </View>
    );
};

export default WhatsNew;

const styles = StyleSheet.create({
    aboutAppName: {
        fontSize: 30,
    },
    aboutText: {
        fontSize: 18,
    },
    cross: {
        position: "absolute",
        right: 20,
        top: 20,
        zIndex: 2,
    },
    crossImg: {
        width: 35,
        height: 35,
        opacity: 0.75,
    },
});
