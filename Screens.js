import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import LCM from "./src/pages/LCM";
import Home from "./Home";
import HCF from "./src/pages/HCF";
import Multiply from "./src/pages/Multiply";
import Divide from "./src/pages/Divide";
import About from "./src/pages/About";
import Factors from "./src/pages/Factors";
import FractionSimplify from "./src/pages/FractionSimplify";
import Gst from "./src/pages/Gst";
import LengthConverter from "./src/pages/LengthConverter";
import NumberConverter from "./src/pages/NumberConverter";
import RomanNumber from "./src/pages/RomanNumber";
import Area from "./src/pages/Area";
import WhatsNew from "./src/pages/WhatsNew";
import PermutationCombination from "./src/pages/PermutationCombination";
import WaightConverter from "./src/pages/WaightConverter";
import Discount from "./src/pages/Discount";
import AgeCalculator from "./src/pages/AgeCalculator";
import EquSolve from "./src/pages/EquSolve";
import TemperatureConverter from "./src/pages/TemperatureConverter";
import Volume from "./src/pages/Volume";
import PowerConverter from "./src/pages/PowerConverter";
import QuadraticEqu from "./src/pages/QuadraticEqu";
import TimeCalculator from "./src/pages/TimeCalculator";
import SurfaceAreaAndVolume from "./src/pages/SurfaceAreaAndVolume";
import UsefulFormulas from "./src/pages/UsefulFormulas";
import EMICalculator from "./src/pages/EMICalculator";
import MatrixMultiply from "./src/pages/MatrixMultiply";
import PostFix from "./src/pages/PostFix";

const Screens = () => {
    const Stack = createStackNavigator();
    const theme = useTheme();
    const options = {
        headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 50,
        },
        headerTintColor: "white",
        animation: "timing",
        ...TransitionPresets.SlideFromRightIOS,
    };
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    ...options,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LCM"
                component={LCM}
                options={{
                    ...options,
                    headerShown: true,
                }}
            />
            <Stack.Screen name="HCF" component={HCF} options={options} />
            <Stack.Screen
                name="Multiply"
                component={Multiply}
                options={options}
            />
            <Stack.Screen name="Divide" component={Divide} options={options} />
            <Stack.Screen
                name="Factors"
                component={Factors}
                options={options}
            />
            <Stack.Screen
                name="FractionSimplify"
                component={FractionSimplify}
                options={{ ...options, title: "Simplify Fraction" }}
            />
            <Stack.Screen name="Gst" component={Gst} options={options} />
            <Stack.Screen
                name="LengthConverter"
                component={LengthConverter}
                options={{
                    ...options,
                    title: "Length Converter",
                }}
            />
            <Stack.Screen
                name="NumberConverter"
                component={NumberConverter}
                options={{
                    ...options,
                    title: "Number Converter",
                }}
            />
            <Stack.Screen
                name="RomanNumber"
                component={RomanNumber}
                options={{
                    ...options,
                    title: "Roman Number",
                }}
            />
            <Stack.Screen
                name="Area"
                component={Area}
                options={{
                    ...options,
                    title: "Area Converter",
                }}
            />
            <Stack.Screen
                name="PermutationCombination"
                component={PermutationCombination}
                options={{
                    ...options,
                    title: "Permutation Combination",
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    ...options,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Discount"
                component={Discount}
                options={{
                    ...options,
                    title: "Discount Calculator",
                }}
            />
            <Stack.Screen
                name="AgeCalculator"
                component={AgeCalculator}
                options={{
                    ...options,
                    title: "Age Calculator",
                }}
            />
            <Stack.Screen
                name="SolveEqu"
                component={EquSolve}
                options={{
                    ...options,
                    title: "Solve Equation",
                }}
            />
            <Stack.Screen
                name="TemperatureConverter"
                component={TemperatureConverter}
                options={{
                    ...options,
                    title: "Temperature Converter",
                }}
            />
            <Stack.Screen
                name="Volume"
                component={Volume}
                options={{
                    ...options,
                    title: "Volume Converter",
                }}
            />
            <Stack.Screen
                name="PowerConverter"
                component={PowerConverter}
                options={{
                    ...options,
                    title: "Power Converter",
                }}
            />
            <Stack.Screen
                name="QuadraticEqu"
                component={QuadraticEqu}
                options={{
                    ...options,
                    title: "Quadratic Equation",
                }}
            />
            <Stack.Screen
                name="TimeCalculator"
                component={TimeCalculator}
                options={{
                    ...options,
                    title: "Time Calculator",
                }}
            />
            <Stack.Screen
                name="WhatsNew"
                component={WhatsNew}
                options={{
                    ...options,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MassConverter"
                component={WaightConverter}
                options={{
                    ...options,
                    title: "Mass Converter",
                }}
            />
            <Stack.Screen
                name="SurfaceAreaAndVolume"
                component={SurfaceAreaAndVolume}
                options={{
                    ...options,
                    title: "Surface Area & Volume",
                }}
            />
            <Stack.Screen
                name="UsefulFormula"
                component={UsefulFormulas}
                options={{
                    ...options,
                    title: "Useful Formulas",
                }}
            />
            <Stack.Screen
                name="EMICalculator"
                component={EMICalculator}
                options={{
                    ...options,
                    title: "EMI Calculator",
                }}
            />
            <Stack.Screen
                name="MatrixMultiplication"
                component={MatrixMultiply}
                options={{
                    ...options,
                    title: "Matrix Multiplication",
                }}
            />
            <Stack.Screen
                name="Postfix"
                component={PostFix}
                options={{
                    ...options,
                    title: "Infix To Postfix",
                }}
            />
        </Stack.Navigator>
    );
};

export default Screens;
