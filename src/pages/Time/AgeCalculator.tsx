import { View, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import Feather from "react-native-vector-icons/Feather";
import { Context } from "../../../Context";
import { colorSchemeType } from "../../../types";
import { addOpacity } from "../../helpers/functions";

const AgeCalculator = () => {
    const themeContext = useContext(Context);
    const { colors } = useTheme<colorSchemeType>();
    const [visible, setVisible] = useState({
        from: false,
        to: false,
    });
    const [date, setDate] = useState<{
        from: undefined | string;
        to: undefined | string;
    }>({
        from: undefined,
        to: undefined,
    });
    const [forCal, setForCal] = useState<{
        from: undefined | string;
        to: undefined | string;
    }>({
        from: undefined,
        to: undefined,
    });
    const [nextBirthday, setNextBirthday] = useState({
        days: 0,
        months: 0,
    });
    const [age, setAge] = useState({ days: 0, months: 0, years: 0 });

    const dateToStr = (
        day: Date
    ): {
        today: string;
        dt: string;
    } => {
        const dd = String(day.getDate()).padStart(2, "0");
        const mm = String(day.getMonth() + 1).padStart(2, "0");
        const yyyy = day.getFullYear();
        let todayDate = dd + "/" + mm + "/" + yyyy;
        let dt = `${yyyy}-${mm}-${dd}`;
        return { today: todayDate, dt };
    };

    const strToDate = (str: string | undefined) => {
        if (!str) return new Date();
        const strArr = str.split("/");
        if (strArr.length != 3) return new Date();
        return new Date(
            parseInt(strArr[2]),
            parseInt(strArr[1]) - 1,
            parseInt(strArr[0])
        );
    };

    useEffect(() => {
        let { today, dt } = dateToStr(new Date());
        setDate({ from: today, to: today });
        setForCal({ from: dt, to: dt });
    }, []);

    const confirmOne = (dat: Date) => {
        let ans = dateToStr(dat);
        setDate({ ...date, from: ans.today });
        setVisible({ ...visible, from: false });
        setForCal({ ...forCal, from: ans.dt });
    };

    const confirmTo = (dat: Date) => {
        let ans = dateToStr(dat);
        setDate({ ...date, to: ans.today });
        setVisible({ ...visible, to: false });
        setForCal({ ...forCal, to: ans.dt });
    };

    const calculateAge = () => {
        if (!forCal.to || !forCal.from) return;
        let today = new Date(forCal.to);
        let birthDate = new Date(forCal.from);

        // Reset hours for pure date comparison
        today.setHours(0, 0, 0, 0);
        birthDate.setHours(0, 0, 0, 0);

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            // Borrow days from the previous month
            let prevMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonthDate.getDate();
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        if (years < 0) {
            years = 0;
            months = 0;
            days = 0;
        }

        let nextBDay = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBDay.getTime() < today.getTime()) {
            nextBDay.setFullYear(today.getFullYear() + 1);
        }

        let nextMonths = nextBDay.getMonth() - today.getMonth();
        let nextDays = nextBDay.getDate() - today.getDate();

        if (nextDays < 0) {
            let prevMonthDate = new Date(nextBDay.getFullYear(), nextBDay.getMonth(), 0);
            nextDays += prevMonthDate.getDate();
            nextMonths--;
        }

        if (nextMonths < 0) {
            nextMonths += 12;
        }

        setNextBirthday({ months: nextMonths, days: nextDays });
        setAge({ days, months, years });
    };

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.backgroundColor }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
        >
            <View
                className="p-5 rounded-3xl border mb-6"
                style={{
                    backgroundColor: colors.elevation.level2,
                    borderColor: addOpacity(colors.divider, "10"),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                <View className="mb-5 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        BIRTH DATE
                    </Text>
                    <TouchableOpacity
                        onPress={() => setVisible({ ...visible, from: true })}
                        className="w-full h-12 border rounded-xl flex-row justify-between items-center px-4"
                        style={{
                            borderColor: colors.secondary,
                            backgroundColor: colors.backgroundColor,
                        }}
                    >
                        <Text style={{ color: colors.text, fontSize: 16 }}>
                            {date.from || "Select Date"}
                        </Text>
                        <Feather name="calendar" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                </View>

                <View className="mb-6 w-full">
                    <Text
                        className="text-[13px] font-bold mb-2.5 tracking-[0.5px]"
                        style={{ color: addOpacity(colors.text, "70") }}
                    >
                        TODAY / TARGET DATE
                    </Text>
                    <TouchableOpacity
                        onPress={() => setVisible({ ...visible, to: true })}
                        className="w-full h-12 border rounded-xl flex-row justify-between items-center px-4"
                        style={{
                            borderColor: colors.secondary,
                            backgroundColor: colors.backgroundColor,
                        }}
                    >
                        <Text style={{ color: colors.text, fontSize: 16 }}>
                            {date.to || "Select Date"}
                        </Text>
                        <Feather name="calendar" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                </View>

                <Button
                    mode="contained"
                    onPress={calculateAge}
                    buttonColor={colors.secondary}
                    textColor="white"
                    style={{ borderRadius: 12, paddingVertical: 4 }}
                >
                    Calculate Age
                </Button>
            </View>

            {(age.years > 0 || age.months > 0 || age.days > 0 || date.from !== date.to) && (
                <View
                    className="p-6 rounded-3xl border mb-6 items-center"
                    style={{
                        backgroundColor: colors.elevation.level2,
                        borderColor: colors.secondary + "30",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 8,
                        elevation: 2,
                    }}
                >
                    <Text
                        className="text-[13px] font-bold mb-5 tracking-[1px]"
                        style={{ color: colors.secondary }}
                    >
                        CURRENT AGE
                    </Text>
                    
                    <View className="flex-row w-full justify-between items-center">
                        {/* Years Box */}
                        <View className="items-center flex-1">
                            <Text
                                className="text-[36px] font-bold"
                                style={{ color: colors.text }}
                            >
                                {age.years}
                            </Text>
                            <Text
                                className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "60") }}
                            >
                                {age.years === 1 ? "Year" : "Years"}
                            </Text>
                        </View>
                        
                        <View style={{ width: 1, height: 40, backgroundColor: colors.divider + "30" }} />
                        
                        {/* Months Box */}
                        <View className="items-center flex-1">
                            <Text
                                className="text-[36px] font-bold"
                                style={{ color: colors.text }}
                            >
                                {age.months}
                            </Text>
                            <Text
                                className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "60") }}
                            >
                                {age.months === 1 ? "Month" : "Months"}
                            </Text>
                        </View>

                        <View style={{ width: 1, height: 40, backgroundColor: colors.divider + "30" }} />

                        {/* Days Box */}
                        <View className="items-center flex-1">
                            <Text
                                className="text-[36px] font-bold"
                                style={{ color: colors.text }}
                            >
                                {age.days}
                            </Text>
                            <Text
                                className="text-[11px] font-bold mt-1 uppercase tracking-[0.5px]"
                                style={{ color: addOpacity(colors.text, "60") }}
                            >
                                {age.days === 1 ? "Day" : "Days"}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            {(nextBirthday.months > 0 || nextBirthday.days > 0) ? (
                <View
                    className="p-5 rounded-3xl border flex-row items-center"
                    style={{
                        backgroundColor: colors.secondary + "12",
                        borderColor: colors.secondary + "30",
                    }}
                >
                    <View className="w-12 h-12 rounded-full items-center justify-center mr-4"
                        style={{ backgroundColor: colors.secondary + "20" }}
                    >
                        <Feather name="gift" size={22} color={colors.secondary} />
                    </View>
                    <View className="flex-1">
                        <Text
                            className="text-[12px] font-bold uppercase tracking-[0.5px]"
                            style={{ color: colors.secondary }}
                        >
                            Next Birthday
                        </Text>
                        <Text
                            className="text-[15px] font-semibold mt-0.5"
                            style={{ color: colors.text }}
                        >
                            In {nextBirthday.months > 0 ? `${nextBirthday.months} month${nextBirthday.months > 1 ? "s" : ""} ` : ""}
                            {nextBirthday.days > 0 ? `${nextBirthday.days} day${nextBirthday.days > 1 ? "s" : ""}` : ""}
                        </Text>
                    </View>
                </View>
            ) : (
                (age.years > 0 || age.months > 0 || age.days > 0) && (
                    <View
                        className="p-5 rounded-3xl border flex-row items-center"
                        style={{
                            backgroundColor: "#4CAF5015",
                            borderColor: "#4CAF5030",
                        }}
                    >
                        <View
                            className="w-12 h-12 rounded-full items-center justify-center mr-4"
                            style={{ backgroundColor: "#4CAF5020" }}
                        >
                            <Text style={{ fontSize: 22 }}>🎂</Text>
                        </View>
                        <View className="flex-1">
                            <Text
                                className="text-[12px] font-bold uppercase tracking-[0.5px]"
                                style={{ color: "#4CAF50" }}
                            >
                                Happy Birthday!
                            </Text>
                            <Text
                                className="text-[15px] font-semibold mt-0.5"
                                style={{ color: colors.text }}
                            >
                                Today is your birthday!
                            </Text>
                        </View>
                    </View>
                )
            )}

            <DatePicker
                modal
                open={visible.from}
                date={strToDate(date.from)}
                theme={themeContext?.theme == "light" ? "light" : "dark"}
                dividerColor="#555"
                onConfirm={confirmOne}
                mode="date"
                onCancel={() => {
                    setVisible({ ...visible, from: false });
                }}
            />
            <DatePicker
                modal
                open={visible.to}
                date={strToDate(date.to)}
                theme={themeContext?.theme == "light" ? "light" : "dark"}
                dividerColor="#555"
                onConfirm={confirmTo}
                mode="date"
                onCancel={() => {
                    setVisible({ ...visible, to: false });
                }}
            />
        </ScrollView>
    );
};

export default AgeCalculator;
