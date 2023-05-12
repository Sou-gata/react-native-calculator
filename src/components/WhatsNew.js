import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
    useFonts,
    VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import data from "../helpers/versionInfo";
import ThemeSelector from "../helpers/ThemeSelector";
const WhatsNew = ({ navigation }) => {
    const [styles, setStyles] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles);
    }, []);
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
    });
    if (!fontsLoaded) {
        return <View style={styles.main}></View>;
    }

    const RenderItem = ({ item }) => {
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
                <View style={{ marginBottom: 45 }}>
                    {(() => {
                        let allCom = [];
                        for (let i = 0; i < data.length; i++) {
                            let com = <RenderItem key={i} item={data[i]} />;
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
