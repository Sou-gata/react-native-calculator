import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from "react-native-vector-icons/Feather";

const AgeCalculator = () => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState({
        from: false,
        to: false,
    });
    let [date, setDate] = useState({
        from: undefined,
        to: undefined,
    });
    const [forCal, setForCal] = useState({
        from: undefined,
        to: undefined,
    });
    const [age, setAge] = useState({ days: 0, months: 0, years: 0 });
    const dateToStr = day => {
        let today = day;
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        let dt = `${yyyy}-${mm}-${dd}`;
        return { today, dt };
    };
    useEffect(() => {
        let { today } = dateToStr(new Date());
        let { dt } = dateToStr(new Date());
        setDate({ from: today, to: today });
        setForCal({ from: dt, to: dt });
    }, []);

    const confirmOne = dat => {
        let ans = dateToStr(dat);
        let d = ans.today;
        setDate({ ...date, from: d });
        setVisible({ ...visible, from: false });
        setForCal({ ...forCal, from: ans.dt });
    };
    const confirmTo = dat => {
        let ans = dateToStr(dat);
        let d = ans.today;
        setDate({ ...date, to: d });
        setVisible({ ...visible, to: false });
        setForCal({ ...forCal, to: ans.dt });
    };

    const calculateAge = () => {
        let today = new Date(forCal.to);
        let birthDate = new Date(forCal.from);

        let years;
        if (
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() == birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate())
        ) {
            years = today.getFullYear() - birthDate.getFullYear();
        } else {
            years = today.getFullYear() - birthDate.getFullYear() - 1;
        }

        let months;
        if (today.getDate() >= birthDate.getDate()) {
            months = today.getMonth() - birthDate.getMonth();
        } else if (today.getDate() < birthDate.getDate()) {
            months = today.getMonth() - birthDate.getMonth() - 1;
        }
        months = months < 0 ? months + 12 : months;

        let days;
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let tempDate = new Date(new Date().getFullYear(), 2, 0);
        if (tempDate == 29) monthDays[1] = 29;
        if (today.getDate() >= birthDate.getDate()) {
            days = today.getDate() - birthDate.getDate();
        } else {
            days =
                today.getDate() -
                birthDate.getDate() +
                monthDays[birthDate.getMonth()];
        }
        if (years < 0) {
            years = 0;
            months = 0;
            days = 0;
        }
        setAge({ days, months, years });
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <View style={styles.container}>
                <View style={styles.dateRow}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>
                        From
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible({ ...visible, from: true });
                        }}>
                        <View style={styles.flexRow}>
                            <Text
                                style={{
                                    color: colors.secondary,
                                    fontSize: 20,
                                }}>
                                {date.from}
                            </Text>
                            <Feather
                                name="calendar"
                                size={24}
                                color={colors.secondary}
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={visible.from}
                        mode="date"
                        onConfirm={confirmOne}
                        onCancel={() => setVisible({ ...visible, from: false })}
                    />
                </View>
                <View style={styles.dateRow}>
                    <Text style={{ color: colors.text, fontSize: 20 }}>To</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible({ ...visible, to: true });
                        }}>
                        <View style={styles.flexRow}>
                            <Text
                                style={{
                                    color: colors.secondary,
                                    fontSize: 20,
                                }}>
                                {date.to}
                            </Text>
                            <Feather
                                name="calendar"
                                size={24}
                                color={colors.secondary}
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={visible.to}
                        mode="date"
                        onConfirm={confirmTo}
                        onCancel={() => setVisible({ ...visible, to: false })}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={calculateAge}
                        buttonColor={colors.secondary}
                        textColor={"white"}>
                        Calculate
                    </Button>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            height: 130,
                        }}>
                        <Text
                            style={{ fontSize: 100, color: colors.secondary }}>
                            {age.years}
                        </Text>
                        <Text style={{ fontSize: 20, color: colors.text }}>
                            {"   "}Years
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 40, color: colors.text }}>
                            {age.months}
                        </Text>
                        <Text style={{ fontSize: 20, color: colors.text }}>
                            {"   "}
                            Months
                            {"      "}
                        </Text>
                        <Text style={{ fontSize: 40, color: colors.text }}>
                            {age.days}
                        </Text>
                        <Text style={{ fontSize: 20, color: colors.text }}>
                            {"   "}Days
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AgeCalculator;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 30,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
});
