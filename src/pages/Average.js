import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomInputFilds from "../components/CustomInputFilds";

const SubScript = ({ main, base, color, fontSize }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: fontSize || 16, color }}>{main}</Text>
            <Text
                style={{
                    fontSize: fontSize / 2 || 8,
                    lineHeight: fontSize * 2 || 32,
                    color,
                }}>
                {base}
            </Text>
        </View>
    );
};

const Fraction = ({ numerator, denominator, color }) => {
    return (
        <View
            style={{
                alignItems: "center",
            }}>
            <Text style={{ fontSize: 16, color, textAlign: "center" }}>
                {numerator}
            </Text>
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: color,
                }}>
                {(() => {
                    if (typeof denominator === "string") {
                        return (
                            <Text
                                style={{
                                    fontSize: 16,
                                    color,
                                    textAlign: "center",
                                }}>
                                {denominator}
                            </Text>
                        );
                    } else {
                        return denominator;
                    }
                })()}
            </View>
        </View>
    );
};

const HarmonicAnswer = ({ inputs, color }) => {
    let tempInputs = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            tempInputs.push("0");
        } else {
            tempInputs.push(
                parseFloat(parseFloat(inputs[i].value).toFixed(4)) + ""
            );
        }
    }
    if (inputs.length == 2) {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[0]}
                    color={color}
                />
                <Text style={{ color: color, fontSize: 16 }}> + </Text>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[1]}
                    color={color}
                />
            </View>
        );
    } else if (inputs.length == 3) {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[0]}
                    color={color}
                />
                <Text style={{ color: color, fontSize: 16 }}> + </Text>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[1]}
                    color={color}
                />
                <Text style={{ color: color, fontSize: 16 }}> + </Text>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[2]}
                    color={color}
                />
            </View>
        );
    } else if (inputs.length > 3) {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[0]}
                    color={color}
                />
                <Text style={{ color: color, fontSize: 16 }}> + </Text>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[1]}
                    color={color}
                />
                <Text style={{ color: color, fontSize: 16 }}> + . . . + </Text>
                <Fraction
                    numerator="1"
                    denominator={tempInputs[inputs.length - 1]}
                    color={color}
                />
            </View>
        );
    }
};

const Average = () => {
    const { colors } = useTheme();
    const [inputs, setInputs] = useState([
        { id: 1, value: "" },
        { id: 2, value: "" },
    ]);
    const [solutionText, setSolutionText] = useState({
        arithmetic: { text: "", avg: "" },
        geometric: { text: "", avg: "" },
        harmonic: { text: "", avg: "" },
    });
    const arithrmeticSolutionText = () => {
        let text = "";
        let avgSum = 0;
        let tempInputs = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                avgSum += 0;
                tempInputs.push("0");
            } else {
                avgSum += parseFloat(parseFloat(inputs[i].value).toFixed(4));
                tempInputs.push(
                    parseFloat(parseFloat(inputs[i].value).toFixed(4)) + ""
                );
            }
        }
        if (tempInputs.length > 3) {
            text +=
                tempInputs[0] +
                " + " +
                tempInputs[1] +
                " + . . . + " +
                tempInputs[inputs.length - 1];
        } else if (tempInputs.length == 3) {
            text +=
                tempInputs[0] + " + " + tempInputs[1] + " + " + tempInputs[2];
        } else if (tempInputs.length == 2) {
            text += tempInputs[0] + " + " + tempInputs[1];
        }
        let avg = avgSum / inputs.length;
        avg = parseFloat(avg.toFixed(4));
        setSolutionText((prev) => ({
            ...prev,
            arithmetic: { ...prev.arithmetic, text, avg },
        }));
    };
    const geometricSolutionText = () => {
        let text = "";
        hasZero = false;
        let avgSum = 1;
        let tempInputs = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                avgSum *= 0;
                hasZero = true;
                tempInputs.push("0");
            } else {
                avgSum *= parseFloat(parseFloat(inputs[i].value).toFixed(4));
                tempInputs.push(
                    parseFloat(parseFloat(inputs[i].value).toFixed(4)) + ""
                );
            }
        }
        if (tempInputs.length > 3) {
            text +=
                tempInputs[0] +
                " × " +
                tempInputs[1] +
                " × . . . × " +
                tempInputs[inputs.length - 1];
        } else if (tempInputs.length == 3) {
            text +=
                tempInputs[0] + " × " + tempInputs[1] + " × " + tempInputs[2];
        } else if (tempInputs.length == 2) {
            text += tempInputs[0] + " × " + tempInputs[1];
        }
        let avg;
        if (hasZero) {
            avg = 0;
        } else {
            avg = Math.pow(avgSum, 1 / inputs.length);
            avg = parseFloat(avg.toFixed(4));
        }
        setSolutionText((prev) => ({
            ...prev,
            geometric: { text, avg },
        }));
    };
    const harmonicSolutionText = () => {
        let avgSum = 0;
        let hasZero = false;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                avgSum += 0;
                hasZero = true;
                break;
            } else {
                avgSum +=
                    1 / parseFloat(parseFloat(inputs[i].value).toFixed(4));
            }
            let avg = 0;
            if (!hasZero) {
                avg = inputs.length / avgSum;
                avg = parseFloat(avg.toFixed(4));
                setSolutionText((prev) => ({
                    ...prev,
                    harmonic: { text: "", avg },
                }));
            }
        }
    };
    useEffect(() => {
        arithrmeticSolutionText();
        geometricSolutionText();
        harmonicSolutionText();
    }, [inputs]);
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.backgroundColor,
            }}>
            <CustomInputFilds
                inputs={inputs}
                setInputs={setInputs}
                maxInput={12}
            />
            {inputs[0].value !== "" && inputs[1].value !== "" && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 20 }}>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: colors.secondary, fontSize: 20 }}>
                            Arithmetic:-
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Text style={{ fontSize: 16, color: colors.text }}>
                                Formula ={" "}
                            </Text>
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 2,
                                    }}>
                                    <SubScript
                                        main="a"
                                        base="1"
                                        color={colors.text}
                                    />
                                    <Text style={{ color: colors.text }}>
                                        {" "}
                                        +{" "}
                                    </Text>
                                    <SubScript
                                        main="a"
                                        base="2"
                                        color={colors.text}
                                    />
                                    <Text style={{ color: colors.text }}>
                                        {" "}
                                        + . . . +{" "}
                                    </Text>
                                    <SubScript
                                        main="a"
                                        base="n"
                                        color={colors.text}
                                    />
                                </View>
                                <View
                                    style={{
                                        backgroundColor: colors.text,
                                        height: 1,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: colors.text,
                                        textAlign: "center",
                                        paddingBottom: 4,
                                        paddingTop: 5,
                                        fontSize: 16,
                                    }}>
                                    n
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Text style={{ fontSize: 16, color: colors.text }}>
                                Solution ={" "}
                            </Text>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colors.text,
                                        paddingBottom: 5,
                                    }}>
                                    {solutionText.arithmetic.text}
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: colors.text,
                                        height: 1,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colors.text,
                                        textAlign: "center",
                                        paddingTop: 5,
                                    }}>
                                    {inputs.length}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    color: colors.backgroundColor,
                                    fontSize: 16,
                                }}>
                                Solution{" "}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: colors.text,
                                    fontWeight: "bold",
                                }}>
                                = {solutionText.arithmetic?.avg}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: colors.secondary,
                                fontSize: 20,
                                marginTop: 10,
                            }}>
                            Geometric:-
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                marginTop: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: colors.text }}>
                                Formula ={" "}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text
                                        style={{
                                            color: colors.text,
                                            lineHeight: 12,
                                            fontSize: 10,
                                            marginRight: -6,
                                        }}>
                                        n
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 23,
                                            color: colors.text,
                                            lineHeight: 26,
                                        }}>
                                        √
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        borderTopWidth: 1,
                                        borderTopColor: colors.text,
                                    }}>
                                    <SubScript
                                        main="a"
                                        base="1"
                                        color={colors.text}
                                    />
                                    <Text style={{ color: colors.text }}>
                                        {" "}
                                        ×{" "}
                                    </Text>
                                    <SubScript
                                        main="a"
                                        base="2"
                                        color={colors.text}
                                    />
                                    <Text style={{ color: colors.text }}>
                                        {" "}
                                        × . . . ×{" "}
                                    </Text>
                                    <SubScript
                                        main="a"
                                        base="n"
                                        color={colors.text}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16, color: colors.text }}>
                                Solution ={" "}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        lineHeight: 12,
                                        fontSize: 10,
                                        marginRight: -6,
                                        color: colors.text,
                                    }}>
                                    {inputs.length}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 23,
                                        lineHeight: 26,
                                        color: colors.text,
                                    }}>
                                    √
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        borderTopWidth: 1,
                                        color: colors.text,
                                        borderTopColor: colors.text,
                                    }}>
                                    {solutionText.geometric.text}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.backgroundColor,
                                }}>
                                Solution{" "}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colors.text,
                                        fontWeight: "bold",
                                        fontSize: 18,
                                    }}>
                                    = {solutionText.geometric.avg}
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: colors.secondary,
                                fontSize: 20,
                                marginVertical: 10,
                            }}>
                            Harmonic:-
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 5,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.text,
                                    marginTop: 9,
                                }}>
                                Formula =
                            </Text>
                            <Fraction
                                color={colors.text}
                                numerator="n"
                                denominator={
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 5,
                                        }}>
                                        <Fraction
                                            color={colors.text}
                                            numerator={"1"}
                                            denominator={
                                                <SubScript
                                                    main="a"
                                                    base="1"
                                                    color={colors.text}
                                                />
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: colors.text,
                                                marginTop: -12,
                                            }}>
                                            +
                                        </Text>
                                        <Fraction
                                            color={colors.text}
                                            numerator={"1"}
                                            denominator={
                                                <SubScript
                                                    main="a"
                                                    base="2"
                                                    color={colors.text}
                                                />
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: colors.text,
                                                marginTop: -12,
                                            }}>
                                            + . . . +
                                        </Text>
                                        <Fraction
                                            color={colors.text}
                                            numerator={"1"}
                                            denominator={
                                                <SubScript
                                                    main="a"
                                                    base="n"
                                                    color={colors.text}
                                                />
                                            }
                                        />
                                    </View>
                                }
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 5,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.text,
                                    marginTop: 9,
                                }}>
                                Solution =
                            </Text>
                            <Fraction
                                color={colors.text}
                                numerator={inputs.length}
                                denominator={
                                    <HarmonicAnswer
                                        inputs={inputs}
                                        color={colors.text}
                                    />
                                }
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.backgroundColor,
                                }}>
                                Solution{"  "}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: colors.text,
                                    fontWeight: "bold",
                                    marginTop: 5,
                                }}>
                                = {solutionText.harmonic.avg}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default Average;
