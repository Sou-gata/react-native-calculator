import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { useTheme, Text, DataTable, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { infixToPostfix } from "../helpers/functions";
import { colorSchemeType } from "../../types";

const PostFix = () => {
    const { colors } = useTheme<colorSchemeType>();
    const [input, setInput] = useState("");
    const [data, setData] = useState<{
        data: string[][];
        infix: string;
        postfix: string;
    }>({ data: [], infix: "", postfix: "" });
    const calculate = () => {
        const ans = infixToPostfix(input);
        setData(ans);
    };

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.backgroundColor },
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
        ansContainer: {
            flexDirection: "row",
            justifyContent: "center",
            height: 50,
        },
        ansKeyText: {
            fontSize: 20,
            color: colors.divider,
        },
        ansValueText: {
            fontSize: 20,
            color: colors.text,
        },
        tableHeader: {
            backgroundColor: colors.secondary + "e0",
        },
        headerText: {
            fontWeight: "bold",
            fontSize: 17,
            color: "#fff",
        },
        tableRow: {
            borderBlockColor: colors.secondary,
        },
        tableData: {
            color: colors.text,
        },
    });

    return (
        <View style={styles.container}>
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
                    textColor="white"
                    style={{ marginTop: 15 }}>
                    Calculate
                </Button>
            </View>

            {data.data.length > 0 && (
                <>
                    <View style={styles.ansContainer}>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.ansKeyText}>Infix: </Text>
                            <Text style={styles.ansKeyText}>Postfix: </Text>
                        </View>
                        <View>
                            <Text style={styles.ansValueText}>
                                {data.infix}
                            </Text>
                            <Text style={styles.ansValueText}>
                                {data.postfix}
                            </Text>
                        </View>
                    </View>
                    <DataTable style={{ marginTop: 20 }}>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title style={styles.colOne}>
                                <Text style={styles.headerText}>Infix</Text>
                            </DataTable.Title>
                            <DataTable.Title style={styles.colTwo}>
                                <Text style={styles.headerText}>Stack</Text>
                            </DataTable.Title>
                            <DataTable.Title style={styles.colThree}>
                                <Text style={styles.headerText}>Postfix</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                    </DataTable>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <>
                            <DataTable>
                                {data.data.map((row, i) => {
                                    return (
                                        <DataTable.Row
                                            key={i}
                                            style={styles.tableRow}>
                                            <DataTable.Cell
                                                style={styles.colOne}>
                                                <Text style={styles.tableData}>
                                                    {row[0]}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                style={styles.colTwo}>
                                                <Text style={styles.tableData}>
                                                    {row[1]}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                style={styles.colThree}>
                                                <Text style={styles.tableData}>
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
