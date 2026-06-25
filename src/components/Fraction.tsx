import { View } from "react-native";
import { Text } from "react-native-paper";
import { fractionPropsType } from "../../types";
import { cssInterop } from "nativewind";

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

    return (
        <View className="flex-row items-center" style={style}>
            <Text
                style={{
                    fontSize: size,
                    color: textVisible ? color : "transparent",
                }}
            >
                {bullet ? "\u2022   " : ""}
                {text}
            </Text>
            <Text style={{ fontSize: size, color }}>{` = `}</Text>
            {hasDenominator && (
                <View className="justify-center items-center">
                    <Text
                        className={isDenoLarger ? "" : "border-b pb-1 px-1"}
                        style={{
                            fontSize: size,
                            color,
                            borderColor: color,
                            paddingBottom: isDenoLarger ? 2 : undefined,
                        }}
                    >
                        {numerator}
                    </Text>
                    <Text
                        className={isDenoLarger ? "border-t pt-0.5 px-1" : ""}
                        style={{
                            fontSize: size,
                            color,
                            borderColor: color,
                        }}
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

cssInterop(Fraction, {
    className: "style",
});

export default Fraction;
