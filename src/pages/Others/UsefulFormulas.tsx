import { View, ScrollView } from "react-native";
import { useTheme, Text } from "react-native-paper";
import {
    algebricFormula,
    trigonometricFormula,
    calculusFormula,
} from "../../helpers/tables";
import Fraction from "../../components/Fraction";
import { calculusFormulaTypes, colorSchemeType } from "../../../types";

const Calculus = ({
    data,
    color,
    size,
}: {
    data: calculusFormulaTypes;
    color: string;
    size: number;
}) => {
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
        <View className="mt-[7px] flex-row items-center">
            <Text style={{ fontSize: size, color }}>
                {"\u2022"}
                {"   "}
            </Text>
            <View>
                <Text
                    className="text-center"
                    style={{ fontSize: size, color }}
                >
                    d
                </Text>
                <Text
                    className="border-t pt-[2px] px-[4px]"
                    style={{ fontSize: size, color, borderColor: color }}
                >
                    dx
                </Text>
            </View>
            <Text style={{ fontSize: size, color }}> {text} = </Text>
            {hasDenominator && (
                <View className="justify-center items-center">
                    <Text
                        className={isDenoLarger ? "pb-[2px]" : "border-b pb-[4px] px-[4px]"}
                        style={{ fontSize: size, color, borderColor: color }}
                    >
                        {numerator}
                    </Text>
                    <Text
                        className={isDenoLarger ? "border-t pt-[2px] px-[4px]" : ""}
                        style={{ fontSize: size, color, borderColor: color }}
                    >
                        {denominator}
                    </Text>
                </View>
            )}
            {!denominator && (
                <View className="justify-center items-center">
                    <Text style={{ fontSize: size, color }}>{numerator}</Text>
                </View>
            )}
        </View>
    );
};

const UsefulFormulas = () => {
    const { colors } = useTheme<colorSchemeType>();
    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="p-5">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text
                            className="text-[28px] mt-[5px]"
                            style={{ color: colors.secondary }}
                        >
                            Algebra :-
                        </Text>
                        {algebricFormula.map((formula, i) => (
                            <Text
                                key={i}
                                className="text-[18px] mt-[7px]"
                                style={{ color: colors.text }}
                            >
                                {"\u2022"}
                                {"  "} {formula}
                            </Text>
                        ))}
                    </View>

                    <View>
                        <Text
                            className="text-[28px] mt-[10px]"
                            style={{ color: colors.secondary }}
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

                    <View>
                        <Text
                            className="text-[28px] mt-[10px]"
                            style={{ color: colors.secondary }}
                        >
                            Calculus :-
                        </Text>
                        {calculusFormula.map((formula, i) => (
                            <Calculus
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
