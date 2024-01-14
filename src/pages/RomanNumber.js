import { View } from "react-native";
import { useState } from "react";
import { useTheme, RadioButton } from "react-native-paper";
import NumberToRoman from "../components/NumberToRoman";
import RomanToNumber from "../components/RomanToNumber";
const RomanNumber = () => {
    const { colors } = useTheme();
    const [value, setValue] = useState(1);
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View
                style={{
                    alignItems: "center",
                }}>
                <RadioButton.Group
                    onValueChange={(val) => setValue(val)}
                    value={value}>
                    <RadioButton.Item
                        label="Number to Roman"
                        value={1}
                        labelStyle={{ color: colors.secondary, fontSize: 20 }}
                        uncheckedColor={colors.secondary}
                        color={colors.secondary}
                        position="leading"
                    />
                    <RadioButton.Item
                        label="Roman to Number"
                        value={2}
                        labelStyle={{ color: colors.secondary, fontSize: 20 }}
                        uncheckedColor={colors.secondary}
                        color={colors.secondary}
                        position="leading"
                    />
                </RadioButton.Group>
            </View>
            {value == 1 ? <NumberToRoman /> : <RomanToNumber />}
        </View>
    );
};

export default RomanNumber;
