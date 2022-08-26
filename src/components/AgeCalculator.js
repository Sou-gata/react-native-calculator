import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "../allStyles";

const AgeCalculator = () => {
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
    const dateToStr = (day) => {
        let today = day;
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
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

    const confirmOne = (dat) => {
        let ans = dateToStr(dat);
        let d = ans.today;
        setDate({ ...date, from: d });
        setVisible({ ...visible, from: false });
        setForCal({ ...forCal, from: ans.dt });
    };
    const confirmTo = (dat) => {
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
        <View style={[styles.main, { padding: 30 }]}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10,
                }}
            >
                <Text style={styles.text}>From</Text>
                <TouchableOpacity
                    onPress={() => {
                        setVisible({ ...visible, from: true });
                    }}
                >
                    <View style={styles.ageRow}>
                        <Text style={[styles.text, { color: "#ff7433" }]}>
                            {date.from}
                        </Text>
                        <Image
                            style={{ width: 30, height: 30, marginLeft: 10 }}
                            source={require("../../assets/icons/date.png")}
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
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10,
                }}
            >
                <Text style={styles.text}>To</Text>
                <TouchableOpacity
                    onPress={() => {
                        setVisible({ ...visible, to: true });
                    }}
                >
                    <View style={styles.ageRow}>
                        <Text style={[styles.text, { color: "#ff7433" }]}>
                            {date.to}
                        </Text>
                        <Image
                            style={{ width: 30, height: 30, marginLeft: 10 }}
                            source={require("../../assets/icons/date.png")}
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
            <View
                style={{ width: "100%", alignItems: "center", marginTop: 20 }}
            >
                <TouchableOpacity
                    style={styles.ageBtn}
                    onPress={() => {
                        calculateAge();
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                        Calculate
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 130,
                    }}
                >
                    <Text style={{ fontSize: 100, color: "#ff7433" }}>
                        {age.years}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#fff" }}>
                        {"   "}Years
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 40, color: "#fff" }}>
                        {age.months}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#fff" }}>
                        {"   "}
                        Months
                        {"      "}
                    </Text>
                    <Text style={{ fontSize: 40, color: "#fff" }}>
                        {age.days}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#fff" }}>
                        {"   "}Days
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default AgeCalculator;
