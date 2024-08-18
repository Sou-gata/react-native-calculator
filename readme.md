## Build process

### Required Tools

-   [Node.Js](https://nodejs.org/en/download)
-   [JDK 20](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html)
-   [Android Studio](https://developer.android.com/studio)
    with SDK, Platform Tools & Virtual Device
-   [VS Code](https://code.visualstudio.com/download)

Open the project with vs code and run the following commends to start installing project dependencies

```
  npm install
```

After installation is finished run the following commend to get a preview of the app

```cmd
npm start
```

Then press <code>a</code> to open the app in virtual device or phesical device. Now wait for few minutes to complete the process.

Build a keystore file to build a apk. To build a keystore file run the following commend

```cmd
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Put the generated keystore file inside android/app folder.<br/>
Now rename <code>build.sample.properties</code> to <code>build.properties</code> inside android folder and modify the credentials with your own

```gradle
storeFile = my-upload-key.keystore
storePassword = 12345678
keyAlias = my-key-alias
keyPassword = 12345678
versionCode = 1
versionName = 1.4.1
```

save the file and run following commend

```cmd
npm run build
```

wait for few minutes. After build is completed go to android/app/build/outputs/apk/release. Here you will find your apk.

## Features

-   Light/dark mode toggle
-   Scientific calculator
-   Full process of multiply
-   Full process of division
-   Full process of LCM & HCF
-   EMI calculator
-   Surface area & Volume calculator
-   Area, volume, length, waight, power & temparature converter
-   Permutation, combination, equation solve
-   GST, discount & age calculator
-   Number syatem system converter
-   Infix to postfix convertor
-   Some useful fomulas

## Support

For support, email sougatatalukdar77@gmail.com.

## Framework Uses

**Client:** React Native

## 🔗 Links

[![instagram](https://img.shields.io/badge/instagram-E1306C?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/sougata_76/)
[![facebook](https://img.shields.io/badge/facebook-0165E1?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/sougata76)
[![facebook](https://img.shields.io/badge/linkedin-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sougata76/)

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/sou-gata/react-native-calculator?logo=v.1.5.2)

<!-- ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/badge/version-v1.3.1-blue) -->
