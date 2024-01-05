import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { useTheme, Text, DataTable, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { infixToPostfix } from "../helpers/functions";

const PostFix = () => {
    const { colors } = useTheme();
    const [input, setInput] = useState("");
    const [data, setData] = useState({ data: [], infix: "", postfix: "" });
    const calculate = () => {
        const ans = infixToPostfix(input);
        setData(ans);
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.input}>
                <CustomInput
                    width={200}
                    keyboardType="default"
                    placeholder="Enter postfix equation"
                    value={input}
                    onChangeText={(e) => setInput(e)}
                />
                <Button
                    mode="contained"
                    onPress={() => calculate()}
                    buttonColor={colors.secondary}
                    textColor={"white"}
                    style={{ marginTop: 15 }}
                >
                    Calculate
                </Button>
            </View>

            {data.data.length > 0 && (
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            height: 50,
                        }}
                    >
                        <View style={{ alignItems: "flex-end" }}>
                            <Text
                                style={{ fontSize: 20, color: colors.divider }}
                            >
                                Infix:{" "}
                            </Text>
                            <Text
                                style={{ fontSize: 20, color: colors.divider }}
                            >
                                Postfix:{" "}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                {data.infix}
                            </Text>
                            <Text style={{ fontSize: 20, color: colors.text }}>
                                {data.postfix}
                            </Text>
                        </View>
                    </View>
                    <DataTable style={{ marginTop: 20 }}>
                        <DataTable.Header
                            style={{
                                backgroundColor: colors.secondary + "e0",
                            }}
                        >
                            <DataTable.Title style={styles.colOne}>
                                <Text
                                    style={[
                                        { color: colors.text },
                                        styles.headerText,
                                    ]}
                                >
                                    Infix
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title style={styles.colTwo}>
                                <Text
                                    style={[
                                        { color: colors.text },
                                        styles.headerText,
                                    ]}
                                >
                                    Stack
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title style={styles.colThree}>
                                <Text
                                    style={[
                                        { color: colors.text },
                                        styles.headerText,
                                    ]}
                                >
                                    Postfix
                                </Text>
                            </DataTable.Title>
                        </DataTable.Header>
                    </DataTable>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <>
                            <DataTable>
                                {data.data.map((row, i) => {
                                    return (
                                        <DataTable.Row
                                            key={i}
                                            style={{
                                                borderBlockColor:
                                                    colors.secondary,
                                            }}
                                        >
                                            <DataTable.Cell
                                                style={styles.colOne}
                                            >
                                                <Text
                                                    style={{
                                                        color: colors.text,
                                                    }}
                                                >
                                                    {row[0]}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                style={styles.colTwo}
                                            >
                                                <Text
                                                    style={{
                                                        color: colors.text,
                                                    }}
                                                >
                                                    {row[1]}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                style={styles.colThree}
                                            >
                                                <Text
                                                    style={{
                                                        color: colors.text,
                                                    }}
                                                >
                                                    {row[2]}
                                                </Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })}
                            </DataTable>
                            <View style={{ height: 20 }} />
                        </>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default PostFix;

const styles = StyleSheet.create({
    input: {
        alignItems: "center",
        marginVertical: 20,
    },

    colOne: {
        flex: 0,
        width: "15%",
    },
    colTwo: {
        flex: 0,
        width: "30%",
    },
    colThree: {
        flex: 0,
        width: "55%",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 17,
    },
});
