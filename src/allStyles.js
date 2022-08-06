import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#333",
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
        borderRadius: 50,
        color: "#fff",
        borderColor: "#efefef81",
        textAlign: "center",
    },
    btn: {
        marginTop: 25,
        width: 100,
        height: 33,
        borderColor: "#efefef81",
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 33,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
    },
    hrLine: {
        height: 2,
        backgroundColor: "#efefef81",
        marginVertical: 2,
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
});

export default styles;
