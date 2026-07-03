import { View, ScrollView } from "react-native";
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

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
        >
            <View className="items-center my-5">
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
                    className="mt-[15px]"
                >
                    Calculate
                </Button>
            </View>

            {data.data.length > 0 && (
                <>
                    <View className="flex-row justify-center h-[50px]">
                        <View className="items-end">
                            <Text
                                className="text-[20px]"
                                style={{ color: colors.divider }}
                            >
                                Infix:{" "}
                            </Text>
                            <Text
                                className="text-[20px]"
                                style={{ color: colors.divider }}
                            >
                                Postfix:{" "}
                            </Text>
                        </View>
                        <View>
                            <Text
                                className="text-[20px]"
                                style={{ color: colors.text }}
                            >
                                {data.infix}
                            </Text>
                            <Text
                                className="text-[20px]"
                                style={{ color: colors.text }}
                            >
                                {data.postfix}
                            </Text>
                        </View>
                    </View>
                    <DataTable className="mt-5">
                        <DataTable.Header style={{ backgroundColor: colors.secondary + "e0" }}>
                            <DataTable.Title className="flex-0 w-[15%]">
                                <Text className="font-bold text-[17px] text-white">Infix</Text>
                            </DataTable.Title>
                            <DataTable.Title className="flex-0 w-[30%]">
                                <Text className="font-bold text-[17px] text-white">Stack</Text>
                            </DataTable.Title>
                            <DataTable.Title className="flex-0 w-[55%]">
                                <Text className="font-bold text-[17px] text-white">Postfix</Text>
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
                                            style={{ borderBlockColor: colors.secondary }}>
                                            <DataTable.Cell
                                                className="flex-0 w-[15%]"
                                            >
                                                <Text style={{ color: colors.text }}>
                                                    {row[0]}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                className="flex-0 w-[30%]"
                                            >
                                                <Text style={{ color: colors.text }}>
                                                    {row[1]}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                className="flex-0 w-[55%]"
                                            >
                                                <Text style={{ color: colors.text }}>
                                                    {row[2]}
                                                </Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })}
                            </DataTable>
                            <View className="h-5" />
                        </>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default PostFix;
