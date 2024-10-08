import { calculusFormulaTypes } from "../../types";

export const hexToBinTable = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    a: "1010",
    b: "1011",
    c: "1100",
    d: "1101",
    e: "1110",
    f: "1111",
};
export const binToHexTable = {
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    1000: "8",
    1001: "9",
    1010: "a",
    1011: "b",
    1100: "c",
    1101: "d",
    1110: "e",
    1111: "f",
};
export const binToOctTable = {
    "000": "0",
    "001": "1",
    "010": "2",
    "011": "3",
    100: "4",
    101: "5",
    110: "6",
    111: "7",
};
export const octToBinTable = {
    0: "000",
    1: "001",
    2: "010",
    3: "011",
    4: "100",
    5: "101",
    6: "110",
    7: "111",
};
export const roman = [
    "_M",
    "_C_M",
    "_D",
    "_C_D",
    "_C",
    "_X_C",
    "_L",
    "_X_L",
    "_X",
    "_I_X",
    "_V",
    "_I_V",
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
];
export const numeral = [
    1000000, 900000, 500000, 400000, 100000, 90000, 50000, 40000, 10000, 9000,
    5000, 4000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
];
export const romanToNumeral = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    N: 4000,
    O: 1000,
    P: 5000,
    Q: 10000,
    R: 50000,
    S: 100000,
    T: 500000,
    U: 1000000,
};

export const trigonometricFormula = [
    {
        text: "sin θ",
        numerator: "height",
        denominator: "hypotenuse",
    },
    {
        text: "cos θ",
        numerator: "base",
        denominator: "hypotenuse",
    },
    {
        text: "tan θ",
        numerator: "height",
        denominator: "base",
    },
    {
        text: "tan θ",
        numerator: "sin θ",
        denominator: "cos θ",
    },
    {
        text: "cot θ",
        numerator: "cos θ",
        denominator: "sin θ",
    },
    {
        text: "cosec θ",
        numerator: "1",
        denominator: "sin θ",
    },
    {
        text: "sec θ",
        numerator: "1",
        denominator: "cos θ",
    },
    {
        text: "cot θ",
        numerator: "1",
        denominator: "tan θ",
    },
    {
        text: "sin²θ + cos²θ",
        numerator: "1",
    },
    {
        text: "cosec²θ - cot²θ",
        numerator: "1",
    },
    {
        text: "sec²θ - tan²θ",
        numerator: "1",
    },
    {
        text: "sin θ",
        numerator: "cos(90-θ)",
    },
    {
        text: "cos θ",
        numerator: "sin(90-θ)",
    },
    {
        text: "tan θ",
        numerator: "cot(90-θ)",
    },
    {
        text: "cosec θ",
        numerator: "sec(90-θ)",
    },
    {
        text: "sec θ",
        numerator: "cosec(90-θ)",
    },
    {
        text: "sin 2θ",
        numerator: "2 sin θ cos θ",
    },
    {
        text: "cos 2θ",
        numerator: "cos²θ - sin²θ",
    },
    {
        text: "tan 2θ",
        numerator: "2 tan θ",
        denominator: "1-tan²θ",
    },
    {
        text: "sin x . cos y",
        numerator: "sin(x+y) + sin(x-y)",
        denominator: "2",
    },
    {
        text: "cos x . cos y",
        numerator: "cos(x+y) + cos(x-y)",
        denominator: "2",
    },
    {
        text: "sin x . sin y",
        numerator: "cos(x+y) - cos(x-y)",
        denominator: "2",
    },
];

export const algebricFormula = [
    "a² – b² = (a - b)(a + b)",
    "a² – b² = (a - b)(a + b)",
    "(a - b)² = a² – 2ab + b²",
    "a² + b² = (a - b)² + 2ab",
    "(a+b+c)² = a²+ b²+c²+2ab+2ac+2bc",
    "(a-b-c)² = a²+b²+c²-2ab-2ac+2bc",
    "a³ + b³ = (a + b) (a² – ab + b²)",
    "a³ - b³ = (a - b) (a² + ab + b²)",
    "(a + b)³ = a³ + 3a²b + 3ab² + b³",
    "(a - b)³ = a³ - 3a²b + 3ab² – b³",
];

export const calculusFormula: calculusFormulaTypes[] = [
    {
        text: "xⁿ",
        numerator: "n . xⁿ⁻¹",
    },
    {
        text: "√x",
        numerator: "1",
        denominator: "2√x",
    },
    {
        text: "sin x",
        numerator: "cos x",
    },
    {
        text: "cos x",
        numerator: "-sin x",
    },
    {
        text: "tan x",
        numerator: "sec²x",
    },
    {
        text: "cot x",
        numerator: "-cosec²x",
    },
    {
        text: "sec x",
        numerator: "sec x . tan x",
    },
    {
        text: "cosec x",
        numerator: "-cosec x . cot x",
    },
    {
        text: "aˣ",
        numerator: "aˣ . logₑa",
    },
    {
        text: "logₑx",
        numerator: "1",
        denominator: "x",
    },
    {
        text: "eˣ",
        numerator: "eˣ",
    },
    {
        text: "logₐx",
        numerator: "logₑa",
        denominator: "x",
    },
    {
        text: "sin⁻¹x",
        numerator: "1",
        denominator: "√(1-x²)",
    },
    {
        text: "cos⁻¹x",
        numerator: "-1",
        denominator: "√(1-x²)",
    },
    {
        text: "tan⁻¹x",
        numerator: "1",
        denominator: "1+x²",
    },
    {
        text: "cot⁻¹x",
        numerator: "-1",
        denominator: "1+x²",
    },
    {
        text: "sec⁻¹x",
        numerator: "1",
        denominator: "|x| . √(x²-1)",
    },
    {
        text: "cosec⁻¹x",
        numerator: "-1",
        denominator: "|x| . √(x²-1)",
    },
    {
        text: "sinh x",
        numerator: "cosh x",
    },
    {
        text: "cosh x",
        numerator: "sinh x",
    },
    {
        text: "tanh x",
        numerator: "sech²x",
    },
    {
        text: "coth x",
        numerator: "-cosh x",
        denominator: "sinh²x",
    },
    {
        text: "sech x",
        numerator: "-sech x . tanh x",
    },
    {
        text: "cosech x",
        numerator: "-cosech x . coth x",
    },
    {
        text: "sinh⁻¹x",
        numerator: "1",
        denominator: "√(x²+1)",
    },
    {
        text: "cosh⁻¹x",
        numerator: "1",
        denominator: "√(x²-1)",
    },
    {
        text: "tanh⁻¹x",
        numerator: "1",
        denominator: "1-x²",
    },
];
