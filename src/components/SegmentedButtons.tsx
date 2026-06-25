import { Pressable, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { colorSchemeType } from "../../types";

const SegmentedButtons = ({
    data,
    value,
    onChange,
}: {
    data: {
        label: string;
        value: number;
    }[];
    value: number;
    onChange: (value: number) => void;
}) => {
    const { colors } = useTheme<colorSchemeType>();
    const setValue = onChange;
    return (
        <View className="flex-row">
            {data.map((item, i) => {
                const isSelected = item.value === value;
                const dynamicStyles = {
                    borderColor: colors.secondary,
                    backgroundColor: isSelected ? colors.secondary + "80" : undefined,
                };
                let btnClass = "border-l border-t border-b p-[5px] w-[50px]";
                if (i === 0) {
                    btnClass += " rounded-l-[20px]";
                } else if (i === data.length - 1) {
                    btnClass += " border-r rounded-r-[20px]";
                }
                return (
                    <Pressable
                        key={i}
                        onPress={() => setValue(item.value)}
                        className={btnClass}
                        style={dynamicStyles}
                    >
                        <Text
                            className="text-center"
                            style={{ color: colors.text }}
                        >
                            {item.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default SegmentedButtons;
