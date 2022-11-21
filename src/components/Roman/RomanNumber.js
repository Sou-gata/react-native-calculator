import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ThemeSelector from "../../helpers/ThemeSelector";

import NumberToRoman from "./NumberToRoman";
import RomanToNumber from "./RomanToNumber";
import RadioButton from "../RadioButton";

const data = [
    {
        text: "Number to Roman",
        value: 1,
    },
    {
        text: "Roman to Number",
        value: 2,
    },
];

const RomanNumber = () => {
    const [styles, setStyles] = useState({});
    useEffect(() => {
        ThemeSelector(setStyles);
    }, []);
    const [operation, setOperation] = useState(1);
    return (
        <View style={styles.main}>
            <RadioButton
                data={data}
                onSelect={(value) => {
                    setOperation(value);
                }}
                selected={operation}
                style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    marginVertical: 10,
                    height: 75,
                }}
            />
            {operation == 1 ? <NumberToRoman /> : <RomanToNumber />}
        </View>
    );
};

export default RomanNumber;
