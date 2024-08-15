import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { fractionPropsType } from "../../types";

export const Fraction = ({
    data,
    color,
    size,
    bullet = true,
    textVisible = true,
    style = {},
}: fractionPropsType) => {
    const text = data.text;
    const numerator = data.numerator;
    const denominator = data.denominator;
    let hasDenominator = false;
    let isDenoLarger = false;
    if (denominator) {
        isDenoLarger =
            numerator.toString().length < denominator.toString().length;
        hasDenominator = true;
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
        },
        numerator: {
            borderBottomWidth: 1,
            paddingBottom: 4,
            paddingHorizontal: 4,
        },
        denominator: {
            borderTopWidth: 1,
            paddingTop: 2,
            paddingHorizontal: 4,
            fontSize: size,
            color,
            borderColor: color,
        },
        bullet: {
            fontSize: size,
            color: textVisible ? color : "transparent",
        },
        equal: { fontSize: size, color },
        denominatorContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        smallNu: { fontSize: size, color, paddingBottom: 2 },
        largeNu: {
            borderBottomWidth: 1,
            paddingBottom: 4,
            paddingHorizontal: 4,
            fontSize: size,
            color,
            borderColor: color,
        },
        smallDeno: { fontSize: size, color },
        denominatorText: { fontSize: size, color },
    });

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.bullet}>
                {bullet ? "\u2022   " : ""}
                {text}
            </Text>
            <Text style={styles.equal}>{` = `}</Text>
            {hasDenominator && (
                <View style={styles.denominatorContainer}>
                    <Text
                        style={isDenoLarger ? styles.smallNu : styles.largeNu}>
                        {numerator}
                    </Text>
                    <Text
                        style={
                            isDenoLarger ? styles.denominator : styles.smallDeno
                        }>
                        {denominator}
                    </Text>
                </View>
            )}
            {!denominator && (
                <View style={styles.denominatorContainer}>
                    <Text style={styles.denominatorText}>{numerator}</Text>
                </View>
            )}
        </View>
    );
};

export default Fraction;
