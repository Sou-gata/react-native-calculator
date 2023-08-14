import React from "react";
import { TextInput, useTheme } from "react-native-paper";

const CustomInput = ({
    value,
    onChangeText,
    placeholder,
    width,
    keyboardType,
    maxLength,
    onEndEditing,
}) => {
    const { colors } = useTheme();
    const empty = () => {};
    return (
        <TextInput
            mode="outlined"
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType || "decimal-pad"}
            placeholderTextColor={colors.paceHolder}
            outlineColor={colors.secondary}
            selectionColor={colors.secondary}
            activeOutlineColor={colors.secondary}
            textColor={colors.text}
            style={{ textAlign: "center", width: width || 150 }}
            maxLength={maxLength}
            onEndEditing={onEndEditing || empty}
        />
    );
};

export default CustomInput;
