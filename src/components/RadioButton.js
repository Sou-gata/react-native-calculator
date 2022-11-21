import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ThemeSelector from "../helpers/ThemeSelector";

export default function RadioButton({ data, onSelect, selected, style }) {
    const [color, setColor] = useState({});
    useEffect(() => {
        ThemeSelector(undefined, setColor);
    }, []);
    const styles = StyleSheet.create({
        option: {
            fontSize: 20,
            color: color.primary,
            textAlign: "center",
        },
        container: {
            flexDirection: "row",
            justifyContent: "center",
        },
        outer: {
            width: 20,
            height: 20,
            borderWidth: 2,
            borderColor: color.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        innerSelecter: {
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: color.primary,
        },
        innerUnselected: {
            width: 12,
            height: 12,
            borderRadius: 6,
        },
    });
    const [userOption, setUserOption] = useState(selected);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };
    return (
        <View style={style}>
            {data.map((item, index) => {
                return (
                    <Pressable
                        style={styles.container}
                        onPress={() => selectHandler(item.value)}
                        key={index}
                    >
                        <View style={styles.outer}>
                            <View
                                style={
                                    item.value == userOption
                                        ? styles.innerSelecter
                                        : styles.innerUnselected
                                }
                            ></View>
                        </View>

                        <Text style={styles.option}> {item.text}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
