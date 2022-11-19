import {
    View,
    Text,
    Pressable,
    Image,
    FlatList,
    ScrollView,
} from "react-native";
import React from "react";
import {
    useFonts,
    VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

import allStylesLight from "../allStylesLight";
import allStyleDark from "../allStylesDark";
import data from "../helpers/versionInfo";

import { useSelector } from "react-redux";
const WhatsNew = ({ navigation }) => {
    const theme = useSelector((state) => state.theme);
    let styles = theme.mode == "dark" ? allStyleDark : allStylesLight;

    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
    });
    if (!fontsLoaded) {
        return <View style={styles.main}></View>;
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <View>
                    <Text
                        style={[
                            styles.aboutAppName,
                            { marginTop: 20, marginBottom: 10 },
                        ]}
                    >
                        {item.ver}
                    </Text>
                </View>
                <View>
                    {(() => {
                        let comp = [];
                        for (let i = 0; i < item.changes.length; i++) {
                            let txt = (
                                <Text
                                    style={[
                                        styles.aboutText,
                                        { marginLeft: 15 },
                                    ]}
                                    key={i}
                                >
                                    {"\u2022"}
                                    {"  "}
                                    {item.changes[i]}
                                </Text>
                            );
                            comp.push(txt);
                        }
                        return comp;
                    })()}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.main}>
            <Pressable
                style={styles.cross}
                onPress={() => {
                    navigation.navigate("Home");
                }}
            >
                <Image
                    style={styles.crossImg}
                    source={require("../../assets/icons/cross.png")}
                />
            </Pressable>
            <ScrollView
                style={{ padding: 30 }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.ver}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default WhatsNew;
