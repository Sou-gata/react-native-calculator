import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { CustomInputType, colorSchemeType } from "../../types";

const CustomInput = ({
    value,
    onChangeText,
    placeholder,
    width,
    keyboardType,
    maxLength,
    onEndEditing,
    style = {},
    autoFocus = false,
}: CustomInputType) => {
    const { colors } = useTheme<colorSchemeType>();
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
            style={[
                {
                    textAlign: "center",
                    width: width || 150,
                    height: 40,
                    backgroundColor: colors.backgroundColor,
                },
                style,
            ]}
            maxLength={maxLength}
            onEndEditing={onEndEditing || empty}
            outlineStyle={{ borderWidth: 0.5, borderRadius: 7 }}
            autoFocus={autoFocus}
        />
    );
};

export default CustomInput;
