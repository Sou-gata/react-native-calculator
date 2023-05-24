import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import componentName from "../../helpers/componentName";
const data = componentName;

const Two = ({ navigation }) => {
    const { colors } = useTheme();
    const androidRipple = {
        color: colors.secondary + "80",
        radius: 100,
    };
    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.homeMain}>
                        {(() => {
                            let btns = [];
                            for (let i = 0; i < data.length; i++) {
                                let com = (
                                    <View
                                        key={i}
                                        style={styles.homeBtnContainer}
                                    >
                                        <View style={styles.pressable}>
                                            <Pressable
                                                style={styles.homeBtn}
                                                android_ripple={androidRipple}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        data[i].name
                                                    );
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            marginBottom: 10,
                                                            width: 40,
                                                            height: 40,
                                                            tintColor:
                                                                colors.secondary,
                                                        }}
                                                        source={data[i].path}
                                                    />
                                                    <Text
                                                        style={[
                                                            styles.btnText,
                                                            {
                                                                color: colors.text,
                                                            },
                                                        ]}
                                                    >
                                                        {data[i].text}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>
                                );
                                btns.push(com);
                            }
                            return btns;
                        })()}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    btnText: {
        textAlign: "center",
    },
    homeBtn: {
        width: wp("25%"),
        height: hp("17.5%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
    },
    homeBtnContainer: {
        width: (wp("100%") - 10) / 3,
        justifyContent: "center",
        alignItems: "center",
        height: (hp("100%") - 80) / 5,
    },
    pressable: {
        borderRadius: 10,
        overflow: "hidden",
    },
    homeMain: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
    },
});

export default Two;