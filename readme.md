# Smart Calculator & Converter

A feature-rich, high-performance **React Native** application that combines a scientific calculator, an extensive suite of unit converters, geometric calculators (2D & 3D), algebraic solvers, and financial utilities under a clean, customizable user interface.

## Features

### 🎨 Customization & Core
* **Light / Dark Mode**: Toggle between light and dark themes seamlessly.
* **Scientific Calculator**: Perform basic and advanced scientific mathematical calculations.
* **Useful Formula Library**: Quick access to essential math and physics formulas.

### 📐 Geometry & Shapes
* **2D Shapes**: Calculate area and perimeter for Circle, Circle Arc, Ellipse, Hexagon, Pentagon, Triangle, Square, Rectangle, Trapezoid, and Rhombus.
* **3D Bodies**: Compute surface area and volume for Cone, Cuboid, Cylinder, Hemisphere, Pyramid, Triangular Prism, and Sphere.

### 🧮 Math & Algebra Solvers
* **Step-by-step Solvers**: View the full process for LCM, HCF, long multiplication, and long division.
* **Equation Solver**: Solve quadratic equations and linear equations with up to 3 variables.
* **Matrix Multiplication**: Easily multiply matrices of various dimensions.
* **Permutation & Combination**: Calculate $_nP_r$ and $_nC_r$ values.
* **Average Calculator**: Find average values of custom data sets.

### 📈 Daily & Financial Utilities
* **EMI Calculator**: Calculate Equated Monthly Installments for loans.
* **GST Calculator**: Quickly calculate Goods and Services Tax.
* **Discount Calculator**: Determine discounts and net prices.
* **Age Calculator**: Compute precise age in years, months, and days.
* **BMI Calculator**: Determine Body Mass Index (BMI).
* **Time Calculator**: Calculate durations and find differences between times.

### 🔄 Converters
* **Unit Converter**: Convert values for Area, Volume, Length, Weight (Mass), Power, and Temperature.
* **Number System Converter**: Convert between Binary, Octal, Decimal, and Hexadecimal.
* **Roman Numeral Converter**: Convert between standard Arabic numbers and Roman numerals.
* **Infix to Postfix Converter**: Parse and convert mathematical expression formats.

---

## Build Process

### Required Tools

Make sure you have the following installed on your development machine:
* [Node.js](https://nodejs.org/en/download) (Version >= 22.11.0)
* [JDK 20](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html)
* [Android Studio](https://developer.android.com/studio) (configured with Android SDK, Platform Tools, and a Virtual Device/Emulator)
* [VS Code](https://code.visualstudio.com/download) or another IDE of your choice

### 1. Installation

Clone this repository, navigate to the root directory, and run the following command to install the project dependencies:

```bash
npm install
```

### 2. Run the Development Server

To start the Metro bundler:

```bash
npm start
```

Once the bundler is running, press `a` to open the app on your connected physical Android device or active Virtual Device (Emulator).

### 3. Building for Production (Release APK)

To build a release-ready APK, follow these steps:

#### Generate a Keystore File
If you don't have an upload key, generate one by running:

```cmd
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### Set up Properties
1. Place the generated `my-upload-key.keystore` file inside the `android/app/` directory.
2. Create or copy a `build.properties` file inside the `android/` directory (you can use `android/build.properties` as a guide).
3. Populate `build.properties` with your credentials:

```properties
storeFile=my-upload-key.keystore
storePassword=your_keystore_password
keyAlias=my-key-alias
keyPassword=your_key_password
versionCode=1
versionName=1.6.0
```

#### Run Build Command
Run the build script defined in `package.json`:

```bash
npm run build
```

Once the compilation completes, you can find the generated APK file at:
`android/app/build/outputs/apk/release/app-release.apk`

---

## Tech Stack
* **Framework:** [React Native](https://reactnative.dev)
* **Styling & UI:** [React Native Paper](https://callstack.github.io/react-native-paper/)
* **Navigation:** [React Navigation](https://reactnavigation.org/)

## Support
For any questions, issues, or suggestions, please contact **sougatatalukdar77@gmail.com**.

## Connect with Me
[![Instagram](https://img.shields.io/badge/instagram-E1306C?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/sougata_76/)
[![Facebook](https://img.shields.io/badge/facebook-0165E1?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/sougata76)
[![LinkedIn](https://img.shields.io/badge/linkedin-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sougata76/)

![Version](https://img.shields.io/badge/version-v1.6.0-blue?style=flat-square)
