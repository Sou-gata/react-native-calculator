import React from "react";
import { cssInterop } from "nativewind";
import { TextInput as PaperTextInput, useTheme } from "react-native-paper";
import { CustomInputType, colorSchemeType } from "../../types";

cssInterop(PaperTextInput, {
    className: "style",
});

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
        <PaperTextInput
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
            className="text-center h-10"
            style={[
                {
                    width: width || 150,
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
