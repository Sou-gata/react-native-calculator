import React from "react";
import { TextInput, useTheme } from "react-native-paper";

const CustomInput = ({
    value,
    onChangeText,
    placeholder,
    width,
    keyboardType,
    maxLength,
}) => {
    const { colors } = useTheme();
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
        />
    );
};

export default CustomInput;
