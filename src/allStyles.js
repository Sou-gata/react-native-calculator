import { StyleSheet, Platform } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
    homeMain: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
        backgroundColor: "#141414",
    },
    homeBtn: {
        width: wp("25%"),
        height: hp("17.5%"),
        alignItems: "center",
        justifyContent: "center",
    },
    homeBtnContainer: {
        width:
            Platform.OS == "web"
                ? (wp("100%") - 10) / 4
                : (wp("100%") - 10) / 3,
        justifyContent: "center",
        alignItems: "center",
        height:
            Platform.OS == "web"
                ? (hp("100%") - 80) / 4
                : (hp("100%") - 80) / 5,
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
        borderColor: "#f73",
        textAlign: "center",
    },
    btn: {
        marginTop: 25,
        width: 100,
        height: 33,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f73",
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
        textAlign: "center",
    },
    textStyleOrange: {
        color: "#f73",
        fontSize: 35,
        textAlign: "center",
    },
    allBtns: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        height: hp("75%") - 25,
    },
    calBtn: {
        width: wp("17.5%"),
        alignItems: "center",
        height: hp("9.5%"),
        justifyContent: "center",
        borderRadius: 7,
    },
    calBtnEql: {
        width: wp("17.5%"),
        height: hp("7.5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    calEqual: {
        width: hp("7.5%"),
        height: hp("7.5%"),
        backgroundColor: "#f73",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 55,
    },
    calText: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
    },
    calTextOrange: {
        color: "#f73",
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
    },
    inputContainer: {
        alignItems: "center",
    },
    calInput: {
        height: (2 * (hp("25%") - 25)) / 3,
        width: wp("100%"),
        padding: 10,
        paddingRight: 20,
        fontSize: 33,
        color: "#fff",
        textAlign: "right",
        backgroundColor: "#191919",
        flexShrink: 1,
    },
    calInputAns: {
        height: (hp("25%") - 25) / 3,
        width: wp("100%"),
        padding: 10,
        paddingRight: 20,
        fontSize: 25,
        color: "#ffffff90",
        textAlign: "right",
        backgroundColor: "#191919",
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
        backgroundColor: "#f73",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    gstText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    gstTextSelected: {
        color: "#222",
        textAlign: "center",
        fontSize: 16,
    },
    gstBtn: {
        backgroundColor: "#222",
        borderWidth: 1,
        borderColor: "#fff",
        width: 50,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    gstBtnSelected: {
        backgroundColor: "#f73",
        borderWidth: 1,
        borderColor: "#f73",
        width: 50,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    leftGstBtn: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    rightGstBtn: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    areaClmContainer: {
        height: 550,
        justifyContent: "space-around",
    },
    inputLeftText: {
        color: "#fff",
        fontSize: 20,
        height: 50,
        marginTop: 20,
        marginRight: 20,
    },
    miniInput: {
        height: 40,
        width: 60,
        margin: 12,
        borderWidth: 1,
        padding: 7,
        fontSize: 16,
        borderRadius: 7,
        color: "#fff",
        borderColor: "#f73",
        textAlign: "center",
    },
    equText: {
        fontSize: 18,
        color: "#fff",
    },
    supContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    sup1st: {
        fontSize: 20,
        lineHeight: 30,
        color: "#fff",
    },
    supPow: {
        fontSize: 12,
        lineHeight: 18,
        color: "#fff",
    },
    timeHeadText: {
        width: (wp("100%") - 10) / 4,
        alignItems: "center",
    },
});

export default styles;
