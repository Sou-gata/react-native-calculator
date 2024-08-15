import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import data from "../helpers/versionInfo";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorSchemeType, versionInfoType } from "../../types";

const RenderItem = ({ item }: { item: versionInfoType }) => {
    const { colors } = useTheme<colorSchemeType>();
    const styles = StyleSheet.create({
        aboutAppName: {
            fontSize: 30,
            marginTop: 20,
            marginBottom: 10,
            color: colors.secondary,
        },
        aboutText: {
            marginLeft: 15,
            fontSize: 18,
            color: colors.text,
        },
    });
    return (
        <>
            <Text style={styles.aboutAppName}>{item.ver}</Text>
            {item.changes.map((change, index) => (
                <Text key={index} style={styles.aboutText}>
                    {`\u2022  ${change}`}
                </Text>
            ))}
        </>
    );
};

const WhatsNew = ({
    navigation,
}: {
    navigation: StackNavigationProp<any, any>;
}) => {
    const { colors } = useTheme<colorSchemeType>();
    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.backgroundColor },
        aboutAppName: {
            fontSize: 30,
            marginTop: 20,
            marginBottom: 10,
            color: colors.secondary,
        },
        aboutText: {
            marginLeft: 15,
            fontSize: 18,
            color: colors.text,
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
    return (
        <View style={styles.container}>
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
                    {data.map((item, i) => (
                        <RenderItem key={i} item={item} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default WhatsNew;
