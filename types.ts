import { MD3Theme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import {
    NativeSyntheticEvent,
    StyleProp,
    TextInputEndEditingEventData,
    TextStyle,
    ViewStyle,
} from "react-native";
export type themeType = "light" | "dark";
export type ContextType = {
    theme: themeType;
    updateTheme: (theme: themeType) => void;
};
export interface colorsType extends MD3Colors {
    primary: string;
    secondary: string;
    backgroundColor: string;
    numPadBg: string;
    calBg: string;
    text: string;
    calAns: string;
    paceHolder: string;
    divider: string;
}
export interface colorSchemeType extends MD3Theme {
    colors: colorsType;
}
export type componentNameType = {
    id: string;
    name: string;
    text: string;
    path: any;
};
export type secondTabComponentsType = {
    Converters: componentNameType[];
    Arithmetic: componentNameType[];
    Algebra: componentNameType[];
    Geometry: componentNameType[];
    Time: componentNameType[];
    Finance: componentNameType[];
    Others: componentNameType[];
};
export type CustomInputType = {
    value: string;
    onChangeText: (e: string) => void;
    placeholder?: string;
    width?: number;
    keyboardType?: "decimal-pad" | "default";
    maxLength?: number;
    onEndEditing?: (
        e: NativeSyntheticEvent<TextInputEndEditingEventData>
    ) => void;
    style?: StyleProp<TextStyle>;
    autoFocus?: boolean;
};
export type versionInfoType = {
    ver: string;
    changes: string[];
};
export type romanCalBtnType = {
    str: string;
    text: string;
    special: boolean;
    len: number;
};
export type numberToRomanType = {
    val: string;
    special: boolean;
};
export type inputsType = {
    id: number;
    value: string;
};
export type inputFildsProps = {
    inputs: inputsType[];
    setInputs: (e: inputsType[]) => void;
    maxInput: number;
    maxLength?: number;
};
export type fractionPropsType = {
    data: {
        numerator: string | number;
        denominator?: string | number;
        text: string;
    };
    color: string;
    size: number;
    bullet?: boolean;
    textVisible?: boolean;
    style?: StyleProp<ViewStyle>;
};
export type divideReturnType = {
    numberA: number;
    numberB: number;
    result: number;
    multipleRuselts: number[];
    subResults: number[];
    spacingInfo: number[][];
};
export type avgAnsTye = {
    arithmetic: {
        text: string;
        avg: string;
    };
    geometric: {
        text: string;
        avg: string;
    };
    harmonic: {
        text: string;
        avg: string;
    };
};
export type equnAnsType = {
    numeratorX: number;
    denominatorX: number;
    numeratorY: number;
    denominatorY: number;
    x: number;
    y: number;
    noSolution: boolean;
    manySolution: boolean;
    normalSolution: boolean;
};
export interface shapeType {
    label: string;
    field: string[];
    icon: any;
    mainImage: any;
}
export interface bodyType {
    label: string;
    icon: any;
    mainImage: any;
}
export type calBtnsType = {
    str: string;
    type: string;
    text: string;
    evalLen?: number;
    textLen?: number;
    primaryColor?: boolean;
};
export type surfaceAreaType = {
    text: string;
    data: {
        first: string;
        secondBeforeRoot: string;
        secondInsideRoot: {
            numerator: string;
            denominator?: string;
            hasSQRT: boolean;
            secPart?: string;
        };
        thirdBeforeRoot: string;
        thirdInsideRoot: {
            numerator: string;
            denominator?: string;
            hasSQRT: boolean;
            secPart?: string;
        };
    };
    color: string;
    textVisible?: boolean;
    size: number;
    style?: object;
};
export type calculusFormulaTypes = {
    text: string;
    numerator: string;
    denominator?: string;
};
export type matrixType = {
    one: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
    two: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
};
export type compoundInterestDataType = {
    text: string;
    firstPart: string;
    secondPart?: {
        firstPart: string;
        numerator?: string;
        denominator?: string;
    };
    power: string;
    prinsipal: string;
};
