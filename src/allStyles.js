import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
    homeMain: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 5,
    },
    homeContainer: {
        backgroundColor: "#111",
        height: hp("100%"),
        justifyContent: "center",
        alignItems: "center",
    },
    homeBtn: {
        marginTop: 15,
        width: 100,
        height: 100,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        flex: 1,
        backgroundColor: "#222",
    },
    container: {
        marginTop: 29,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 50,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 20,
        borderRadius: 7,
        color: "#fff",
        borderColor: "#ff7733",
        textAlign: "center",
    },
    btn: {
        marginTop: 25,
        width: 100,
        height: 33,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff7733",
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
    },
    hrLine: {
        height: 2,
        backgroundColor: "#fff",
        marginVertical: 2,
        marginTop: 7,
    },
    varticleLine: {
        width: 2,
        height: 30,
        backgroundColor: "#fff",
        marginHorizontal: 4,
    },
    math: {
        alignItems: "center",
    },
    mathText: {
        fontSize: 25,
        color: "#fff",
        fontFamily: "RobotoMono_400Regular",
    },
    divideMath: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 35,
        fontFamily: "RobotoMono_400Regular",
    },
    mathContainer: {
        padding: 20,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
    ansDiv: {
        alignItems: "center",
        padding: 20,
    },
    textStyle: {
        color: "#fff",
        fontSize: 25,
    },
    textStyleOrange: {
        color: "#ff7733",
        fontSize: 35,
    },
    allBtns: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        padding: 20,
        height: hp("76%"),
    },
    calBtn: {
        width: wp("22%"),
        alignItems: "center",
        height: hp("12%"),
        justifyContent: "center",
        borderRadius: 7,
    },
    calBtnEql: {
        width: 60,
        alignItems: "center",
        height: 60,
        justifyContent: "center",
        backgroundColor: "#ff7733",
        borderRadius: 55,
    },
    calText: {
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
    },
    calTextOrange: {
        color: "#ff7733",
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
    },
    inputContainer: {
        alignItems: "center",
    },
    calInput: {
        height: 100,
        width: "87%",
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 35,
        borderRadius: 5,
        color: "#fff",
        borderColor: "#efefef81",
        textAlign: "center",
        backgroundColor: "#111",
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    simplify: {
        width: "100%",
        textAlign: "center",
    },
    list: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
    },
    align: {
        alignItems: "center",
    },
    ageRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    ageBtn: {
        width: 150,
        height: 50,
        backgroundColor: "#ff7733",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;
