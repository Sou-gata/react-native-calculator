export const secondTabComponents = {
    Converters: [
        {
            id: "12",
            name: "TemperatureConverter",
            text: "Temperature Converter",
            path: require("../../assets/icons/temprature.png"),
        },
        {
            id: "13",
            name: "NumberConverter",
            text: "Number Converter",
            path: require("../../assets/icons/radix.png"),
        },
        {
            id: "14",
            name: "MassConverter",
            text: "Mass Converter",
            path: require("../../assets/icons/mass.png"),
        },
        {
            id: "15",
            name: "LengthConverter",
            text: "Length Converter",
            path: require("../../assets/icons/length.png"),
        },
        {
            id: "16",
            name: "Area",
            text: "Area Converter",
            path: require("../../assets/icons/area.png"),
        },
        {
            id: "17",
            name: "Volume",
            text: "Volume Converter",
            path: require("../../assets/icons/volume.png"),
        },
        {
            id: "18",
            name: "PowerConverter",
            text: "Power Converter",
            path: require("../../assets/icons/power.png"),
        },
        {
            id: "21",
            name: "RomanNumber",
            text: "Roman Number",
            path: require("../../assets/icons/roman.png"),
        },
    ],
    Arithmetic: [
        {
            id: "1",
            name: "LCM",
            text: "LCM",
            path: require("../../assets/icons/LCM.png"),
        },
        {
            id: "2",
            name: "HCF",
            text: "HCF",
            path: require("../../assets/icons/HCF.png"),
        },
        {
            id: "3",
            name: "Factors",
            text: "Factors",
            path: require("../../assets/icons/factors.png"),
        },
        {
            id: "4",
            name: "Proportion",
            text: "Proportion",
            path: require("../../assets/icons/relationship.webp"),
        },
        {
            id: "5",
            name: "Multiply",
            text: "Multiply",
            path: require("../../assets/icons/multiply.png"),
        },
        {
            id: "6",
            name: "Divide",
            text: "Divide",
            path: require("../../assets/icons/devide.png"),
        },
        {
            id: "7",
            name: "Average",
            text: "Average",
            path: require("../../assets/icons/average.png"),
        },
        {
            id: "8",
            name: "PermutationCombination",
            text: "Permutation Combination",
            path: require("../../assets/icons/permutation.png"),
        },
    ],
    Algebra: [
        {
            id: "1",
            name: "QuadraticEqu",
            text: "Quadratic Equation",
            path: require("../../assets/icons/QuadEqu.png"),
        },
        {
            id: "2",
            name: "SolveEqu",
            text: "Solve Equation",
            path: require("../../assets/icons/equ.png"),
        },
        {
            id: "3",
            name: "ThreeVeriablesEquation",
            text: "Three Variables Equation",
            path: require("../../assets/icons/threeEqn.png"),
        },
    ],
    Geometry: [
        {
            id: "1",
            name: "Shapes",
            text: "Shapes",
            path: require("../../assets/icons/shapes.png"),
        },
        {
            id: "2",
            name: "Bodies",
            text: "Bodies",
            path: require("../../assets/icons/bodies.png"),
        },
    ],
    Time: [
        {
            id: "1",
            name: "AgeCalculator",
            text: "Age Calculator",
            path: require("../../assets/icons/date.png"),
        },
        {
            id: "2",
            name: "TimeCalculator",
            text: "Time\nCalculator",
            path: require("../../assets/icons/watch.png"),
        },
        {
            id: "3",
            name: "Time Difference",
            text: "Time Difference",
            path: require("../../assets/icons/timeDiff.png"),
        },
    ],
    Finance: [
        {
            id: "1",
            name: "Gst",
            text: "GST",
            path: require("../../assets/icons/gst.png"),
        },
        {
            id: "2",
            name: "Discount",
            text: "Discount Calculator",
            path: require("../../assets/icons/discount.png"),
        },
        {
            id: "3",
            name: "EMICalculator",
            text: "EMI Calculator",
            path: require("../../assets/icons/emi.png"),
        },
        {
            id: "4",
            name: "Interest",
            text: "Interest",
            path: require("../../assets/icons/interest.png"),
        },
    ],
    Others: [
        {
            id: "1",
            name: "MatrixMultiplication",
            text: "Matrix Multiplication",
            path: require("../../assets/icons/matrix.png"),
        },
        {
            id: "2",
            name: "Postfix",
            text: `Infix To${"\n"}Postfix`,
            path: require("../../assets/icons/postfix.png"),
        },
        {
            id: "3",
            name: "BMICalculator",
            text: "BMI Calculator",
            path: require("../../assets/icons/bmi.png"),
        },
        {
            id: "4",
            name: "UsefulFormula",
            text: "Useful Formulas",
            path: require("../../assets/icons/formula.png"),
        },
    ],
};

export const shapeList = [
    {
        label: "Triangle",
        field: ["A", "B", "C"],
        icon: require("../../assets/shapes/triangle.png"),
        mainImage: require("../../assets/shapes/triangle_main.png"),
    },
    {
        label: "Square",
        field: ["side"],
        icon: require("../../assets/shapes/square.png"),
        mainImage: require("../../assets/shapes/square_main.png"),
    },
    {
        label: "Rectangle",
        field: ["Length", "Breadth"],
        icon: require("../../assets/shapes/rectangle.png"),
        mainImage: require("../../assets/shapes/rectangle_main.png"),
    },
    {
        label: "Trapezoid",
        field: ["A", "B", "H"],
        icon: require("../../assets/shapes/trapezoid.png"),
        mainImage: require("../../assets/shapes/trapezoid_main.png"),
    },
    {
        label: "Rhombus",
        field: ["A", "B"],
        icon: require("../../assets/shapes/rhombus.png"),
        mainImage: require("../../assets/shapes/rhombus_main.png"),
    },
    {
        label: "Pentagon",
        field: ["Side"],
        icon: require("../../assets/shapes/pentagon.png"),
        mainImage: require("../../assets/shapes/pentagon_main.png"),
    },
    {
        label: "Hexagon",
        field: ["Side"],
        icon: require("../../assets/shapes/hexagon.png"),
        mainImage: require("../../assets/shapes/hexagon_main.png"),
    },
    {
        label: "Circle",
        field: ["R"],
        icon: require("../../assets/shapes/circle.png"),
        mainImage: require("../../assets/shapes/circle_main.png"),
    },
    {
        label: "Circle Arc",
        field: ["R", "A"],
        icon: require("../../assets/shapes/circle_arc.png"),
        mainImage: require("../../assets/shapes/circle_arc_main.png"),
    },
    {
        label: "Ellipse",
        field: ["A", "B"],
        icon: require("../../assets/shapes/ellipse.png"),
        mainImage: require("../../assets/shapes/ellipse_main.png"),
    },
];

export const bodyList = [
    {
        label: "Cuboid",
        icon: require("../../assets/bodies/cube.png"),
        mainImage: require("../../assets/bodies/cuboid_main.png"),
    },
    {
        label: "Triangular Prism",
        icon: require("../../assets/bodies/prism.png"),
        mainImage: require("../../assets/bodies/prism_main.png"),
    },
    {
        label: "Pyramid",
        icon: require("../../assets/bodies/pyramid.png"),
        mainImage: require("../../assets/bodies/pyramid_main.png"),
    },
    {
        label: "Cone",
        icon: require("../../assets/bodies/cone.png"),
        mainImage: require("../../assets/bodies/cone_main.png"),
    },
    {
        label: "Cylinder",
        icon: require("../../assets/bodies/cylinder.png"),
        mainImage: require("../../assets/bodies/cylinder_main.png"),
    },
    {
        label: "Sphere",
        icon: require("../../assets/bodies/sphere.png"),
        mainImage: require("../../assets/bodies/sphere_main.png"),
    },
    {
        label: "Hemisphere",
        icon: require("../../assets/bodies/hemisphere.png"),
        mainImage: require("../../assets/bodies/hemisphere_main.png"),
    },
    // {
    //     label: "Ellipsoid",
    //     icon: require("../../assets/shapes/triangle.png"),
    //     mainImage: require("../../assets/shapes/triangle_main.png"),
    // },
];
