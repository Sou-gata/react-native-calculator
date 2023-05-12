import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
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
                            {item.value == userOption && (
                                <Image
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: color.primary,
                                    }}
                                    source={require("../../assets/icons/circle.png")}
                                />
                            )}
                        </View>
                        <Text style={styles.option}> {item.text}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
