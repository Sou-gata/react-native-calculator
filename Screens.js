import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import Pages from "./src/helpers/PagesImport";

const Screens = () => {
    const Stack = createStackNavigator();
    const theme = useTheme();
    const options = {
        headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 50,
        },
        headerTintColor: "#fff",
        animation: "timing",
        ...TransitionPresets.SlideFromRightIOS,
    };
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Pages.Home}
                options={{
                    ...options,
                    headerShown: false,
                }}
            />
            <Stack.Screen name="LCM" component={Pages.LCM} options={options} />
            <Stack.Screen name="HCF" component={Pages.HCF} options={options} />
            <Stack.Screen
                name="Multiply"
                component={Pages.Multiply}
                options={options}
            />
            <Stack.Screen
                name="Divide"
                component={Pages.Divide}
                options={options}
            />
            <Stack.Screen
                name="Factors"
                component={Pages.Factors}
                options={options}
            />
            <Stack.Screen
                name="Proportion"
                component={Pages.Proportion}
                options={options}
            />
            <Stack.Screen name="Gst" component={Pages.Gst} options={options} />
            <Stack.Screen
                name="LengthConverter"
                component={Pages.LengthConverter}
                options={{
                    ...options,
                    title: "Length Converter",
                }}
            />
            <Stack.Screen
                name="NumberConverter"
                component={Pages.NumberConverter}
                options={{
                    ...options,
                    title: "Number Converter",
                }}
            />
            <Stack.Screen
                name="RomanNumber"
                component={Pages.RomanNumber}
                options={{
                    ...options,
                    title: "Roman Number",
                }}
            />
            <Stack.Screen
                name="Area"
                component={Pages.Area}
                options={{
                    ...options,
                    title: "Area Converter",
                }}
            />
            <Stack.Screen
                name="PermutationCombination"
                component={Pages.PermutationCombination}
                options={{
                    ...options,
                    title: "Permutation Combination",
                }}
            />
            <Stack.Screen
                name="About"
                component={Pages.About}
                options={{
                    ...options,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Discount"
                component={Pages.Discount}
                options={{
                    ...options,
                    title: "Discount Calculator",
                }}
            />
            <Stack.Screen
                name="AgeCalculator"
                component={Pages.AgeCalculator}
                options={{
                    ...options,
                    title: "Age Calculator",
                }}
            />
            <Stack.Screen
                name="SolveEqu"
                component={Pages.EquSolve}
                options={{
                    ...options,
                    title: "Solve Equation",
                }}
            />
            <Stack.Screen
                name="TemperatureConverter"
                component={Pages.TemperatureConverter}
                options={{
                    ...options,
                    title: "Temperature Converter",
                }}
            />
            <Stack.Screen
                name="Volume"
                component={Pages.Volume}
                options={{
                    ...options,
                    title: "Volume Converter",
                }}
            />
            <Stack.Screen
                name="PowerConverter"
                component={Pages.PowerConverter}
                options={{
                    ...options,
                    title: "Power Converter",
                }}
            />
            <Stack.Screen
                name="QuadraticEqu"
                component={Pages.QuadraticEqu}
                options={{
                    ...options,
                    title: "Quadratic Equation",
                }}
            />
            <Stack.Screen
                name="TimeCalculator"
                component={Pages.TimeCalculator}
                options={{
                    ...options,
                    title: "Time Calculator",
                }}
            />
            <Stack.Screen
                name="WhatsNew"
                component={Pages.WhatsNew}
                options={{
                    ...options,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MassConverter"
                component={Pages.WaightConverter}
                options={{
                    ...options,
                    title: "Mass Converter",
                }}
            />
            <Stack.Screen
                name="UsefulFormula"
                component={Pages.UsefulFormulas}
                options={{
                    ...options,
                    title: "Useful Formulas",
                }}
            />
            <Stack.Screen
                name="EMICalculator"
                component={Pages.EMICalculator}
                options={{
                    ...options,
                    title: "EMI Calculator",
                }}
            />
            <Stack.Screen
                name="MatrixMultiplication"
                component={Pages.MatrixMultiply}
                options={{
                    ...options,
                    title: "Matrix Multiplication",
                }}
            />
            <Stack.Screen
                name="Postfix"
                component={Pages.PostFix}
                options={{
                    ...options,
                    title: "Infix To Postfix",
                }}
            />
            <Stack.Screen
                name="Average"
                component={Pages.Average}
                options={options}
            />
            <Stack.Screen
                name="BMICalculator"
                component={Pages.BMICalculator}
                options={{
                    ...options,
                    title: "BMI Calculator",
                }}
            />
            <Stack.Screen
                name="Shapes"
                component={Pages.Shapes}
                options={options}
            />
            <Stack.Screen
                name="Triangle"
                component={Pages.Triangle}
                options={options}
            />
            <Stack.Screen
                name="Square"
                component={Pages.Square}
                options={options}
            />
            <Stack.Screen
                name="Rectangle"
                component={Pages.Rectangle}
                options={options}
            />
            <Stack.Screen
                name="Trapezoid"
                component={Pages.Trapezoid}
                options={options}
            />
            <Stack.Screen
                name="Rhombus"
                component={Pages.Rhombus}
                options={options}
            />
            <Stack.Screen
                name="Pentagon"
                component={Pages.Pentagon}
                options={options}
            />
            <Stack.Screen
                name="Hexagon"
                component={Pages.Hexagon}
                options={options}
            />
            <Stack.Screen
                name="Circle"
                component={Pages.Circle}
                options={options}
            />
            <Stack.Screen
                name="Circle Arc"
                component={Pages.CircleArc}
                options={options}
            />
            <Stack.Screen
                name="Ellipse"
                component={Pages.Ellipse}
                options={options}
            />
            <Stack.Screen
                name="Bodies"
                component={Pages.Bodies}
                options={options}
            />
            <Stack.Screen
                name="Cuboid"
                component={Pages.Cuboid}
                options={options}
            />
            <Stack.Screen
                name="Triangular Prism"
                component={Pages.TriangularPrism}
                options={options}
            />
            <Stack.Screen
                name="Pyramid"
                component={Pages.Pyramid}
                options={Pages.options}
            />
            <Stack.Screen
                name="Cone"
                component={Pages.Cone}
                options={options}
            />
            <Stack.Screen
                name="Cylinder"
                component={Pages.Cylinder}
                options={options}
            />
            <Stack.Screen
                name="Sphere"
                component={Pages.Sphere}
                options={options}
            />
            <Stack.Screen
                name="Hemisphere"
                component={Pages.HemiSphere}
                options={options}
            />
            <Stack.Screen
                name="Interest"
                component={Pages.Interest}
                options={options}
            />
            <Stack.Screen
                name="ThreeVeriablesEquation"
                component={Pages.EquationWithThreeVeriables}
                options={{ ...options, title: "Equation With Three Veriables" }}
            />
            <Stack.Screen
                name="Time Difference"
                component={Pages.TimeDifference}
                options={options}
            />
        </Stack.Navigator>
    );
};

export default Screens;
