import { StyleSheet, View, ScrollView } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { algebricFormula, trigonometricFormula } from "../helpers/tables";

const Fraction = ({ data, color, size }) => {
    const text = data.text;
    const numerator = data.numerator;
    const denominator = data.denominator;
    let hasDenominator = false;
    let isDenoLarger = false;
    if (denominator) {
        isDenoLarger = numerator.length < denominator.length;
        hasDenominator = true;
    }

    return (
        <View
            style={{
                marginTop: 7,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: size,
                    color,
                }}
            >
                {"\u2022"}
                {"   "}
                {text} ={" "}
            </Text>
            {hasDenominator && (
                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Text
                        style={
                            isDenoLarger
                                ? { fontSize: size, color, paddingBottom: 2 }
                                : [
                                      styles.numerator,
                                      {
                                          fontSize: size,
                                          color,
                                          borderColor: color,
                                      },
                                  ]
                        }
                    >
                        {numerator}
                    </Text>
                    <Text
                        style={
                            isDenoLarger
                                ? [
                                      styles.denominator,
                                      {
                                          fontSize: size,
                                          color,
                                          borderColor: color,
                                      },
                                  ]
                                : { fontSize: size, color }
                        }
                    >
                        {denominator}
                    </Text>
                </View>
            )}
            {!denominator && (
                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ fontSize: size, color }}>{numerator}</Text>
                </View>
            )}
        </View>
    );
};

const UsefulFormulas = () => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={{ padding: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text
                            style={{
                                fontSize: 28,
                                color: colors.secondary,
                                marginTop: 5,
                            }}
                        >
                            Algebra :-
                        </Text>
                        {algebricFormula.map((formula, i) => (
                            <Text
                                key={i}
                                style={{
                                    fontSize: 18,
                                    color: colors.text,
                                    marginTop: 7,
                                }}
                            >
                                {"\u2022"}
                                {"  "} {formula}
                            </Text>
                        ))}
                    </View>

                    <View>
                        <Text
                            style={{
                                fontSize: 28,
                                color: colors.secondary,
                                marginTop: 10,
                            }}
                        >
                            Trigonometry :-
                        </Text>
                        {trigonometricFormula.map((formula, i) => (
                            <Fraction
                                key={i}
                                data={formula}
                                color={colors.text}
                                size={18}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default UsefulFormulas;

const styles = StyleSheet.create({
    numerator: {
        borderBottomWidth: 1,
        paddingBottom: 4,
        paddingHorizontal: 4,
    },
    denominator: {
        borderTopWidth: 1,
        paddingTop: 2,
        paddingHorizontal: 4,
    },
});
