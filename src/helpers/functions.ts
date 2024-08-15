import {
    divideReturnType,
    equnAnsType,
    inputsType,
    matrixType,
    numberToRomanType,
    romanCalBtnType,
} from "../../types";
import {
    binToHexTable,
    binToOctTable,
    hexToBinTable,
    octToBinTable,
    numeral,
    roman,
    romanToNumeral,
} from "./tables";
import calBtns from "../helpers/calBtns";
import { Dimensions } from "react-native";

export const wp = (str: string): number => {
    return (Dimensions.get("window").width * parseFloat(str)) / 100;
};
export const hp = (str: string): number => {
    return (Dimensions.get("window").height * parseFloat(str)) / 100;
};
export function parseNumber(number: number, fixed = 4): number {
    let num = number;
    let ans = num.toFixed(fixed);
    return parseFloat(ans);
}
export function celToFar(num: number): number {
    let f = 1.8 * num + 32;
    return parseNumber(f);
}
export function celToKal(num: number): number {
    let k = num + 273.15;
    return parseNumber(k);
}
export function celToRan(num: number): number {
    let r = num * 1.8 + 491.67;
    return parseNumber(r);
}
export function farToCel(num: number): number {
    let c = ((num - 32) / 9) * 5;
    return parseNumber(c);
}
export function farToRan(num: number): number {
    let r = num - 459.67;
    return parseNumber(r);
}
export function farToKal(num: number): number {
    let c = ((num - 32) / 9) * 5;
    let k = c + 273.15;
    return parseNumber(k);
}
export function ranToCel(num: number): number {
    let f = num + 459.67;
    let c = ((f - 32) / 9) * 5;
    return parseNumber(c);
}
export function ranToFar(num: number): number {
    let f = num + 459.67;
    return parseNumber(f);
}
export function ranToKal(num: number) {
    let f = num + 459.67;
    let c = ((f - 32) / 9) * 5;
    let k = c + 273.15;
    return parseNumber(k);
}
export function kalToCal(num: number): number {
    let c = num - 273.15;
    return parseNumber(c);
}
export function kalToFar(num: number): number {
    let c = num - 273.15;
    let f = 1.8 * c + 32;
    return parseNumber(f);
}
export function kalToRan(num: number): number {
    let c = num - 273.15;
    let f = 1.8 * c + 32;
    let r = f - 459.67;
    return parseNumber(r);
}
export function binaryToDecimal(binaryNum: number): number {
    let digArr: number[] = [];
    let count = 0;
    let i = binaryNum;
    let havePoint = Math.floor(i) != i;
    i = Math.floor(i);
    while (i != 0) {
        let lastDegit = i % 10;
        i = Math.floor(i / 10);
        digArr[count] = lastDegit;
        count++;
    }
    digArr = digArr.reverse();
    let decimalNum = 0;
    for (let j = 0; j < digArr.length; j++) {
        decimalNum += digArr[j] * Math.pow(2, digArr.length - j - 1);
    }
    if (havePoint) {
        let pointBinary = binaryNum - Math.floor(binaryNum);
        let pointDec = 0;
        pointBinary = parseNumber(pointBinary);
        let pointBinaryArr: string[] = pointBinary.toString().split("");
        pointBinaryArr.splice(0, 2);

        for (let j = 0; j < pointBinaryArr.length; j++) {
            pointDec += parseInt(pointBinaryArr[j]) * (1 / Math.pow(2, j + 1));
        }
        decimalNum += pointDec;
    }
    return decimalNum;
}
export function hexToBin(hexVal: string): number {
    let parts = hexVal.toLowerCase().split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let binVal = "";
        for (let i = 0; i < digits.length; i++) {
            if (digits[i].charCodeAt(0) >= 65) digits[i] = digits[i];
            let hexToBin = hexToBinTable[digits[i] as keyof object];
            binVal += hexToBin;
        }
        return parseNumber(parseFloat(binVal));
    } else {
        let fstPart = hexToBin(parts[0]);
        let secondPart = hexToBin(parts[1]);
        let fullNumber = fstPart + "." + secondPart;
        return parseNumber(parseFloat(fullNumber));
    }
}
export function binToHex(binaryNum: number): string {
    let parts = binaryNum.toString().split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let pointer = digits.length;
        let count = 0;
        let binArr = [];
        let hexNum = "";
        for (let j = 0; true; j++) {
            let snippit = "";
            for (let i = pointer - 1; i >= 0; i--) {
                snippit += digits[i];
                pointer--;
                count++;
                if (count == 4) break;
                if (pointer == 0) break;
            }
            count = 0;
            let snippitArr = snippit.split("");
            snippitArr.reverse();
            snippit = snippitArr.join("");
            binArr.push(snippit);
            if (pointer == 0) break;
        }
        binArr.reverse();

        for (let i = 0; i < binArr.length; i++) {
            if (binArr[i].length <= 1) binArr[i] = "000" + binArr[i];
            else if (binArr[i].length <= 2) binArr[i] = "00" + binArr[i];
            else if (binArr[i].length <= 3) binArr[i] = "0" + binArr[i];
            hexNum += binToHexTable[binArr[i] as keyof object];
        }
        return hexNum;
    } else {
        let fstPart = binToHex(parseInt(parts[0]));
        let secondPart = "";
        let tempDegits = parts[1].split("");
        let degitSet = [];
        let counter = 0;
        let pointer = tempDegits.length;
        for (let i = 0; true; i++) {
            let snippit = "";
            for (let j = 0; j < 4; j++) {
                snippit += tempDegits[j];
                counter++;
                pointer--;
                if (counter == tempDegits.length) break;
            }
            degitSet.push(snippit);
            if (pointer == 0) break;
        }
        for (let i = 0; i < degitSet.length; i++) {
            if (degitSet[i].length == 1) degitSet[i] = degitSet[i] + "000";
            else if (degitSet[i].length == 2) degitSet[i] = degitSet[i] + "00";
            else if (degitSet[i].length == 3) degitSet[i] = degitSet[i] + "0";
        }
        for (let i = 0; i < degitSet.length; i++) {
            secondPart += binToHexTable[degitSet[i] as keyof object];
        }
        if (secondPart == "0") {
            return fstPart;
        } else {
            let fullNumber = fstPart + "." + secondPart;
            return fullNumber;
        }
    }
}
export function binToOct(binaryNum: number): number {
    let parts = binaryNum.toString().split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let pointer = digits.length;
        let count = 0;
        let binArr: string[] = [];
        let octNum = "";
        for (let j = 0; true; j++) {
            let snippit = "";
            for (let i = pointer - 1; i >= 0; i--) {
                snippit += digits[i];
                pointer--;
                count++;
                if (count == 3) break;
                if (pointer == 0) break;
            }
            count = 0;
            let snippitArr = snippit.split("");
            snippitArr.reverse();
            snippit = snippitArr.join("");
            binArr.push(snippit);
            if (pointer == 0) break;
        }
        binArr.reverse();

        for (let i = 0; i < binArr.length; i++) {
            if (binArr[i].length <= 1) binArr[i] = "00" + binArr[i];
            else if (binArr[i].length <= 2) binArr[i] = "0" + binArr[i];
            octNum += binToOctTable[binArr[i] as keyof object];
        }
        return parseFloat(octNum);
    } else {
        let fstPart = binToOct(parseInt(parts[0]));
        let secondPart = "";
        let tempDegits = parts[1].split("");
        let degitSet = [];
        let counter = 0;
        let pointer = tempDegits.length;
        for (let i = 0; true; i++) {
            let snippit = "";
            for (let j = 0; j < 3; j++) {
                snippit += tempDegits[j];
                counter++;
                pointer--;
                if (counter == tempDegits.length) break;
            }
            degitSet.push(snippit);
            if (pointer == 0) break;
        }
        for (let i = 0; i < degitSet.length; i++) {
            if (degitSet[i].length == 1) degitSet[i] = degitSet[i] + "00";
            else if (degitSet[i].length == 2) degitSet[i] = degitSet[i] + "0";
        }
        for (let i = 0; i < degitSet.length; i++) {
            secondPart += binToOctTable[degitSet[i] as keyof object];
        }
        if (secondPart == "0") {
            return fstPart;
        } else {
            let fullNumber = fstPart + "." + secondPart;
            return parseFloat(fullNumber);
        }
    }
}
export function octToBin(octVal: number): number {
    let parts = octVal.toString().split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let binVal = "";
        for (let i = 0; i < digits.length; i++) {
            let octToBinVal = octToBinTable[digits[i] as keyof object];
            binVal += octToBinVal;
        }
        return parseInt(binVal);
    } else {
        let fstPart = octToBin(parseInt(parts[0]));
        let secondPart = octToBin(parseFloat(parts[1]));
        let fullNumber = fstPart + "." + secondPart;
        return parseFloat(fullNumber);
    }
}
export function decimalToBinary(decimalNum: number): number {
    let i = decimalNum;
    let binaryNum = "";
    let binaryPoint = "";
    let havePoint = Math.floor(i) !== i;
    i = Math.floor(i);
    while (i != 0) {
        let degit;
        if (i % 2 == 0) {
            degit = 0;
        } else {
            degit = 1;
            i = i - 1;
        }
        binaryNum += degit;
        i = Math.floor(i / 2);
    }
    binaryNum = binaryNum.split("").reverse().join("");
    if (havePoint) {
        let decPoint = decimalNum - Math.floor(decimalNum);
        decPoint = parseFloat(decPoint.toFixed(5));
        for (let j = 1; j <= 5; j++) {
            let tempDegit = Math.floor(decPoint * 2);
            binaryPoint += tempDegit;
            decPoint *= 2;
            if (decPoint >= 1) {
                decPoint = parseFloat((decPoint - 1).toFixed(4));
            }
        }
        binaryPoint = "." + binaryPoint;
        binaryNum = binaryNum + binaryPoint;
        return parseFloat(binaryNum);
    } else {
        return parseInt(binaryNum);
    }
}
export function pointRemove(val: string): string {
    let ans: string;
    let number = val.split("");
    let lastDig = number[number.length - 1];
    if (lastDig == ".") {
        number.splice(number.length - 1, 1);
        let temp = "";
        for (let i = 0; i < number.length; i++) {
            temp += number[i];
        }
        return temp;
    } else {
        return val;
    }
}
function valueGen(string: string): numberToRomanType[] {
    let str = string.split("");
    let strArr = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char == "_") {
            strArr[i] = { val: str[i + 1], special: true };
            str.splice(i + 1, 1);
        } else {
            strArr[i] = { val: str[i], special: false };
        }
    }
    return strArr;
}
export function numaricToRoman(number: number): numberToRomanType[] {
    let num = Math.abs(number);
    if (num == 0 || num > 3999999 || isNaN(num)) return [];
    let romanNum = "";
    for (let i = 0; i < numeral.length; i++) {
        let rN = roman[i];
        if (romanNum == "" && num < 5000 && num >= 4000) {
            if (rN == "_I_V") rN = "MMMM";
        } else if (romanNum != "" && num >= 1000 && num < 4000) {
            if (rN == "M") rN = "_I";
        }
        romanNum = romanNum + rN.repeat(num / numeral[i]);
        num = num % numeral[i];
    }
    return valueGen(romanNum);
}
function maxRepeating(str: string): boolean {
    let len = str.length;
    let count = 0;
    let res = str[0];
    for (let i = 0; i < len; i++) {
        let cur_count = 1;
        for (let j = i + 1; j < len; j++) {
            if (str[i] != str[j]) break;
            cur_count++;
        }
        if (cur_count > count) {
            count = cur_count;
            res = str[i];
        }
    }
    let valid = true;
    if (count > 3) valid = false;
    if (count == 4 && res == "M") valid = true;
    return valid;
}
function validateRoman(string: string): boolean {
    let valid = true;
    let str = string;
    valid = maxRepeating(str);
    let strArr = str.split("");
    if (strArr.length > 2) {
        for (let i = 2; i < strArr.length; i++) {
            let proPre: number = romanToNumeral[strArr[i - 2] as keyof object];
            let current: number = romanToNumeral[strArr[i] as keyof object];
            if (proPre < current) {
                valid = false;
                break;
            }
        }
    } else if (strArr.length > 1) {
        for (let i = 1; i < strArr.length; i++) {
            let pre: number = romanToNumeral[strArr[i - 1] as keyof object];
            let current: number = romanToNumeral[strArr[i] as keyof object];
            if (pre <= current) {
                let currDegit = current.toString().length;
                let preDegit = pre.toString().length;
                let preFstDgt = parseInt(pre.toString().charAt(0));
                if (preFstDgt != 1) {
                    valid = false;
                    break;
                }
                if (preDegit == currDegit || preDegit == currDegit - 1) {
                } else {
                    valid = false;
                    break;
                }
            }
        }
    }
    return valid;
}
export function romanToNumber(arr: romanCalBtnType[]): number | false {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += arr[i].str;
    }
    if (str == "") return false;
    if (validateRoman(str)) {
        let num: number = romanToNumeral[str.charAt(0) as keyof object];
        for (let i = 1; i < str.length; i++) {
            let curr = romanToNumeral[str.charAt(i) as keyof object];
            let pre = romanToNumeral[str.charAt(i - 1) as keyof object];
            if (curr <= pre) {
                num += curr;
            } else {
                num = num - pre * 2 + curr;
            }
        }
        if (num > 3999999) return false;
        return num;
    } else return false;
}
function adjustSpacing(array: number[]): string[] {
    let max = largeInArr(array);
    max = max.toString().length;
    let newArr: string[] = [];
    for (let i = 0; i < array.length; i++) {
        newArr[i] = array[i].toString();
        let length = newArr[i].length;
        let required = Math.abs(max - length);
        for (let j = 0; j < required; j++) {
            newArr[i] = " " + newArr[i];
        }
    }
    return newArr;
}
export function checkLcmHcfNumber(inputs: inputsType[]): number[] | false {
    let numberSet = [];
    if (inputs.length < 2) return false;
    if (inputs[0].value == "" || inputs[1].value == "") return false;
    for (let i = 0; i < inputs.length; i++) {
        numberSet[i] = parseFloat(parseFloat(inputs[i].value).toFixed(4));
        if (numberSet[i] == 0) return false;
        if (isNaN(numberSet[i])) {
            return false;
        }
    }
    return numberSet;
}
export function lcm(number: number[]): number {
    let numberSet = [...number];
    let Lcm = 1;
    let lcmTemp = numberSet[0];
    for (let i = 0; i < numberSet.length; i++) {
        while (true) {
            if (Lcm % numberSet[i] == 0 && Lcm % lcmTemp == 0) {
                lcmTemp = Lcm;
                break;
            }
            Lcm++;
        }
    }
    return Lcm;
}
export function largeInArr(array: number[]): number | false {
    if (array.length == 0) return false;
    let max = array[0];
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i];
        max = Math.max(max, array[i]);
    }
    return max;
}
export function factorLcm(numbersArr: number[]) {
    let numArr = [...numbersArr];
    let max = largeInArr(numArr);
    let divisiors: number[] = [];
    let dividends: number[][] = [];
    let i = 2;
    while (true) {
        let devided = 0;
        for (let j = 0; j < numArr.length; j++) {
            if (numArr[j] % i == 0) devided++;
        }
        if (devided >= 2) {
            for (let j = 0; j < numArr.length; j++) {
                if (numArr[j] % i == 0) {
                    numArr[j] /= i;
                }
                if (j == numArr.length - 1) {
                    dividends.push([...numArr]);
                }
            }
            divisiors.push(i);
        } else i++;

        if (max && i >= max) break;
    }
    dividends.unshift(numbersArr);
    if (divisiors.length == 0) {
        divisiors = [1];
        dividends.unshift(numbersArr);
    }

    let factors = [...divisiors, ...dividends[dividends.length - 1]];
    for (let i = factors.length - 1; i >= 0; i--) {
        if (factors[i] == 1) {
            factors.splice(i, 1);
        }
    }
    return { divisiors, dividends, factors };
}
export function hasDecimalInArr(arr: number[]): boolean {
    let hasPoint = false;
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.abs(arr[i]);
        if (arr[i] != Math.floor(arr[i])) {
            hasPoint = true;
        }
    }
    return hasPoint;
}
function maxDigitAfterPoint(numbersArr: number[]): number {
    let numberSet = numbersArr;
    let maxDigit = 0;
    for (let i = 0; i < numberSet.length; i++) {
        let temp = numberSet[i].toString().split(".");
        if (temp.length > 1) {
            let lengthAfter = temp[1].length;
            if (lengthAfter > maxDigit) maxDigit = lengthAfter;
        }
    }
    return maxDigit;
}
export function decimalLcm(numbersArr: number[]): {
    numinator: string;
    denominator: number;
    nuLcm: number;
    lcm: number;
} {
    let numberSet = [...numbersArr];
    let newNumberSet: number[] = [];
    let maxDigit = maxDigitAfterPoint(numberSet);
    for (let i = 0; i < numberSet.length; i++) {
        newNumberSet[i] = numberSet[i] * Math.pow(10, maxDigit);
    }
    let Lcm = lcm(newNumberSet);
    let nuLcm = Lcm;
    Lcm = Lcm / Math.pow(10, maxDigit);

    return {
        numinator: newNumberSet.join(", "),
        denominator: Math.pow(10, maxDigit),
        nuLcm,
        lcm: Lcm,
    };
}
export function gcd(numbersArr: number[]): number {
    let numberSet = [...numbersArr];
    let gcd = numberSet[0];
    for (let i = 0; i < numberSet.length; i++) {
        let gcdTemp = gcd;
        for (let j = 1; j <= gcdTemp; j++) {
            if (numberSet[i] % j == 0 && gcdTemp % j == 0) {
                gcd = j;
            }
        }
    }
    gcd = gcd == 0 ? 1 : gcd;
    return gcd;
}
export function factorize(number: number): number[] {
    let num = number;
    if (num == 0) return [0, 1];
    let factors = [];
    let original = num;
    for (let i = 2; i <= original; i++) {
        for (let j = 2; j <= i; j++) {
            if (num % j == 0) {
                factors.push(j);
                num = num / j;
                break;
            }
        }
        if (num == 1) break;
    }
    factors.unshift(1);
    return factors;
}
export function factorizeHcf(arr: number[]) {
    let factorsAll: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
        let num = Math.floor(arr[i]);
        let factorArr = factorize(num);
        factorsAll.push(factorArr);
    }
    let hcf = factorize(gcd(arr));
    let numbers = adjustSpacing([...arr]);
    return { factors: factorsAll, hcf, numbers };
}
export function decimalHcf(numbersArr: number[]): {
    hcf: number;
    numinator: string;
    denominator: number;
    nuHcf: number;
} {
    let numberSet = [...numbersArr];
    let maxDigit = maxDigitAfterPoint(numberSet);
    let newNumberSet = [];
    for (let i = 0; i < numberSet.length; i++) {
        newNumberSet[i] = numberSet[i] * Math.pow(10, maxDigit);
    }
    let hcf = gcd(newNumberSet);
    let nuHcf = hcf;
    hcf = hcf / Math.pow(10, maxDigit);
    let numinator = newNumberSet.join(", ");
    let denominator = Math.pow(10, maxDigit);
    return { hcf, numinator, denominator, nuHcf };
}
function convertToNumber(number: number): number {
    let num = number.toString();
    num = num.split(" ")[0];
    num = num.split("-")[0];
    num = num.split(".")[0];
    num = num.split(",")[0];
    return parseInt(num);
}
export function factors(number: number): { str: string; number: number } {
    let num = convertToNumber(number);
    let facts = [];
    for (let i = 0; i <= num; i++) {
        if (num % i == 0) {
            facts.push(i);
        }
    }

    let str = facts.join(", ");
    return { str, number: num };
}
export function multiple(
    numberA: number,
    numberB: number
): {
    results: string[];
    ans: number;
    numberA: number;
    numberB: number;
} {
    let numbers: string[] = [];
    numbers[0] = convertToNumber(numberA).toString();
    numbers[1] = convertToNumber(numberB).toString();
    let results: string[] = [];
    let ans: number = 0;
    const splitedNumberB = numbers[1].split("");

    for (let i = 0; i < splitedNumberB.length; i++) {
        for (let j = 0; j < splitedNumberB.length - i - 1; j++) {
            splitedNumberB[i] += "0";
        }
    }
    splitedNumberB.reverse();
    let tempResult: number[] = [];
    for (let i = 0; i < splitedNumberB.length; i++) {
        tempResult[i] = parseInt(numbers[0]) * parseInt(splitedNumberB[i]);
        ans += tempResult[i];
        let blakMultiplyFix;
        if (tempResult[i] == 0) {
            if (i == 0) blakMultiplyFix = "";
            else blakMultiplyFix = "0";
            for (let x = 0; x < numbers[0].length; x++) {
                blakMultiplyFix += "0";
            }
            results[i] = blakMultiplyFix;
        } else {
            results[i] = tempResult[i].toString();
        }
    }

    for (let i = 0; i < results.length; i++) {
        results[i] = results[i].toString();
        let l = results[i].length;
        let temp = results[i].split("");
        for (let j = 0; j < i; j++) {
            temp[l - j - 1] = "×";
        }
        let tempStr = "";
        for (let j = 0; j < temp.length; j++) {
            tempStr += temp[j];
        }
        results[i] = tempStr;
    }

    return { results, ans, numberA, numberB };
}
export function devide(
    numberA: number,
    numberB: number
): divideReturnType | false {
    let numbers: number[] = [];
    numbers[0] = numberA;
    numbers[1] = numberB;
    let result: string = "0";
    let remainder: number = numbers[0];
    let multipleRuselts: number[] = [];
    let subResults: number[] = [];
    let remainderArr: number[] = [];
    let spacingArr: number[] = [];
    let spacingInfo: number[][] = [];
    let a = numbers[0];
    let b = numbers[1];
    if (b > a || isNaN(a) || isNaN(b)) {
        return false;
    }
    let tempNumA = numbers[0].toString().split("");
    let numA: number[] = [];
    for (let i = 0; i < tempNumA.length; i++) {
        numA[i] = parseInt(tempNumA[i]);
    }
    let loopCount = 0;
    for (let j = 0; true; j++) {
        let tempIn = 0;
        let counter = 0;
        loopCount++;
        for (let i = 0; i < numA.length; i++) {
            if (tempIn < numbers[1]) {
                tempIn = tempIn * 10 + numA[i];
                counter++;
                if (loopCount > 1 && counter > 2) {
                    result += 0;
                }
            } else {
                break;
            }
        }
        let tempResult = Math.floor(tempIn / numbers[1]);
        result += tempResult;
        for (let i = 0; i < counter; i++) {
            numA.splice(0, 1);
        }
        remainder = tempIn % numbers[1];
        numA.unshift(remainder);
        subResults.push(tempIn);
        let multiple = tempResult * numbers[1];
        multipleRuselts.push(multiple);
        remainderArr.push(remainder);
        if (numA.length == 1) break;
    }
    let finalResult = parseInt(result);
    for (let i = 0; i < remainderArr.length; i++) {
        let space =
            subResults[i].toString().length -
            multipleRuselts[i].toString().length;

        spacingArr.push(space);
        space =
            multipleRuselts[i].toString().length -
            remainderArr[i].toString().length;
        spacingArr.push(space);
    }
    for (let i = 1; i < spacingArr.length; i++) {
        spacingArr[i] = spacingArr[i] + spacingArr[i - 1];
    }
    for (let i = 0; i < spacingArr.length / 2; i++) {
        let even = 2 * i;
        let tempArr = [spacingArr[even], spacingArr[even + 1]];
        spacingInfo[i] = tempArr;
    }
    subResults.splice(0, 1);
    subResults.push(remainder);
    return {
        numberA,
        numberB,
        result: finalResult,
        multipleRuselts,
        subResults,
        spacingInfo,
    };
}
function gamma(z: number): number {
    let ansOne = Math.sqrt((2 * Math.PI) / z);
    let ansTwo = Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
    let ans = ansOne * ansTwo;
    ans = parseNumber(ans);
    return ans;
}
export function fact(n: number): number {
    let isDecimal = false;
    let temp = n.toString().split(".");
    if (temp.length > 1) isDecimal = true;
    let num = n;
    if (num >= 0) {
        if (isDecimal) {
            return gamma(n + 1);
        } else {
            if (num == 0 || num == 1) {
                return 1;
            } else {
                let ans = 1;
                for (let i = 1; i <= num; i++) {
                    ans = ans * i;
                }
                return ans;
            }
        }
    } else return NaN;
}
function expToPow(number: number): string {
    let num = number.toString().split("e");
    if (num.length == 1) {
        return number.toString();
    } else {
        let partOne = parseFloat(num[0]).toFixed(3);
        let pow = parseFloat(num[1]);
        let ans = `${partOne}×10^${pow}`;
        return ans;
    }
}
export function permutationCombination(
    { n, r }: { n: number; r: number },
    {
        order,
        repeat,
    }: {
        order: number;
        repeat: number;
    }
): {
    nuFormula: string;
    deFormula: string;
    ans: string;
    valueNu: string;
    valueDe: string;
} {
    let invalid = false;
    let nuFormula = "";
    let deFormula: string = "";
    let valueNu = "";
    let valueDe: string = "";
    let ans: string = "";
    if (n < r || n <= 0 || r <= 0) {
        invalid = true;
    }
    if (!invalid) {
        if (order == 1 && repeat == 1) {
            nuFormula = "n^r";
            deFormula = "";
            valueNu = `${n}^${r}`;
            valueDe = "";
            ans = expToPow(Math.pow(n, r));
        } else if (order == 1 && repeat == 2) {
            nuFormula = "n!";
            deFormula = "(n-r)!";
            valueNu = `${n}!`;
            valueDe = `(${n}-${r})!`;
            ans = expToPow(fact(n) / fact(n - r));
        } else if (order == 2 && repeat == 1) {
            nuFormula = "(n+r-1)!";
            deFormula = "r!(n-1)!";
            valueNu = `(${n}+${r}-1)!`;
            valueDe = `${r}!(${n}-1)!`;
            ans = expToPow((fact(n + r - 1) / fact(r)) * (1 / fact(n - 1)));
        } else if (order == 2 && repeat == 2) {
            nuFormula = "n!";
            deFormula = "r!(n-r)!";
            valueNu = `${n}!`;
            valueDe = `${r}!(${n}-${r})!`;
            ans = expToPow((fact(n) / fact(r)) * (1 / fact(n - r)));
        }
        return { nuFormula, deFormula, ans, valueNu, valueDe };
    } else {
        return {
            nuFormula: "",
            deFormula: "",
            ans: "",
            valueNu: "",
            valueDe: "",
        };
    }
}
function simplifyFraction(numerator: number, denominator: number): string {
    let nume = numerator;
    let deno = denominator;
    let hcf = gcd([nume, deno]);
    let root = "";
    if (deno < 0) {
        nume = nume * -1;
        deno = deno * -1;
    }
    if (hcf != 0) {
        nume = nume / hcf;
        deno = deno / hcf;
    }
    if (nume == 0) {
        root = "0";
    } else if (deno == 1) {
        root = nume.toString();
    } else {
        root = `${nume}/${deno}`;
    }
    return root;
}
function calculateRoot(number: number): {
    ans: string;
    hasRoot: boolean;
} {
    let num = number;
    let hasDecimal = false;
    let temp = num.toString().split(".");
    if (temp.length > 1) hasDecimal = true;
    if (hasDecimal) {
        return {
            ans: parseFloat(Math.sqrt(num).toFixed(4)).toString(),
            hasRoot: false,
        };
    } else {
        let rootOver = Math.sqrt(num);
        if (rootOver == Math.floor(rootOver)) {
            return { ans: Math.sqrt(num).toString(), hasRoot: false };
        } else {
            let maxSqureFactor = 1;
            for (let i = 1; i <= Math.sqrt(num); i++) {
                if (number % (i * i) == 0) {
                    maxSqureFactor = i * i;
                }
            }
            if (maxSqureFactor == 1) {
                return { ans: "√" + num, hasRoot: true };
            } else {
                let fontNum = Math.sqrt(maxSqureFactor);
                let backNum = num / maxSqureFactor;
                return { ans: fontNum + "√" + backNum, hasRoot: true };
            }
        }
    }
}
function simplifyAns(
    fstPart: string,
    secPart: string,
    deno: number
): {
    partOne: string;
    partTwo: string;
    denominator: string;
} {
    let secondPart = secPart.toString().split("√");
    let hasTwoPart = false;
    let secPartTwo = "";
    let pTwo: number;
    if (secondPart.length > 1) {
        secPartTwo = secondPart[1];
        if (secondPart[0] == "") pTwo = 1;
        else pTwo = parseFloat(secondPart[0]);
        hasTwoPart = true;
    } else {
        pTwo = 1;
    }
    let hcf;
    if (parseFloat(fstPart) == 0) {
        hcf = gcd([pTwo, deno]);
    } else {
        hcf = gcd([parseFloat(fstPart), pTwo, deno]);
    }
    let partOne = parseFloat(fstPart) / hcf;
    let partTwo = pTwo / hcf;
    let denominator = deno / hcf;
    denominator = parseFloat(denominator.toFixed(4));
    let partTwoStr = "";
    if (hasTwoPart) {
        if (partTwo == 1) {
            partTwoStr = "√" + secPartTwo;
        } else {
            partTwoStr = partTwo + "√" + secPartTwo;
        }
    }
    return {
        partOne: partOne.toString(),
        partTwo: partTwoStr,
        denominator: denominator.toString(),
    };
}
export function solveQuadraticEqu(a = 0, b = 0, c = 0) {
    const removeSigne = (num: number) => num.toString().slice(1);
    if (a == 0 && b == 0) return false;
    let hasImgRoot = false;
    let rootOne = "";
    let rootTwo = "";
    let d = b * b - 4 * a * c;
    if (a != 0) {
        if (d < 0) {
            hasImgRoot = true;
            d = d * -1;
        }
        if (d == 0) {
            let hcf = gcd([-b, 2 * a]);
            let nume = -b / hcf;
            let deno = (2 * a) / hcf;
            let ans = simplifyFraction(nume, deno);
            rootOne = ans;
            rootTwo = rootOne;
        } else {
            let calRoot = calculateRoot(d);
            let nuSecPart = calRoot.ans;
            let nuFstPart = -b;
            if (calRoot.hasRoot) {
                let simplifiedAns = simplifyAns(
                    nuFstPart.toString(),
                    nuSecPart,
                    2 * a
                );
                let { partOne, partTwo, denominator } = simplifiedAns;
                if (!hasImgRoot) {
                    if (parseFloat(partOne) != 0) {
                        partOne = parseNumber(parseFloat(partOne)).toString();
                        partTwo = parseNumber(parseFloat(partTwo)).toString();
                        denominator = parseNumber(
                            parseFloat(denominator)
                        ).toString();
                        if (parseFloat(denominator) == 1) {
                            if (parseFloat(partTwo) < 0) {
                                rootOne = `${partOne}-${
                                    parseFloat(partTwo) * -1
                                }`;
                                rootTwo = `${partOne}+${
                                    parseFloat(partTwo) * -1
                                }`;
                            } else {
                                rootOne = `${partOne}+${partTwo}`;
                                rootTwo = `${partOne}-${partTwo}`;
                            }
                        } else {
                            if (parseFloat(partTwo) < 0) {
                                rootOne = `(${partOne}-${
                                    parseFloat(partTwo) * -1
                                })/${denominator}`;
                                rootTwo = `(${partOne}+${
                                    parseFloat(partTwo) * -1
                                })/${denominator}`;
                            } else {
                                rootOne = `(${partOne}+${partTwo})/${denominator}`;
                                rootTwo = `(${partOne}-${partTwo})/${denominator}`;
                            }
                        }
                    } else {
                        if (parseFloat(denominator) == 1) {
                            rootOne = `${partTwo}`;
                            rootTwo = `-${partTwo}`;
                        } else {
                            rootOne = `${partTwo}/${denominator}`;
                            rootTwo = `-${partTwo}/${denominator}`;
                        }
                    }
                } else {
                    if (parseFloat(partOne) != 0) {
                        if (parseFloat(denominator) == 1) {
                            rootOne = `${partOne}+${partTwo}𝑖`;
                            rootTwo = `${partOne}-${partTwo}𝑖`;
                        } else {
                            let isNegative = parseFloat(partTwo) < 0;
                            rootOne = `(${partOne}${
                                isNegative ? "-" : "+"
                            }${removeSigne(
                                parseNumber(parseFloat(partTwo))
                            )}𝑖)/${denominator}`;
                            rootTwo = `(${partOne}${
                                isNegative ? "+" : "-"
                            }${removeSigne(
                                parseNumber(parseFloat(partTwo))
                            )}𝑖)/${denominator}`;
                        }
                    } else {
                        if (parseFloat(denominator) == 1) {
                            rootOne = `${partTwo}𝑖`;
                            rootTwo = `-${partTwo}𝑖`;
                        } else {
                            rootOne = `${partTwo}𝑖/${denominator}`;
                            rootTwo = `-${partTwo}𝑖/${denominator}`;
                        }
                    }
                }
            } else {
                let nuOne = -b + parseFloat(nuSecPart);
                let nuTwo = -b - parseFloat(nuSecPart);
                if (hasImgRoot) {
                    let hcf = gcd([-b, parseFloat(nuSecPart), 2 * a]);
                    hcf = hcf == 0 ? 1 : hcf;
                    let fst = parseNumber(-b / hcf);
                    let sec = parseNumber(parseFloat(nuSecPart) / hcf);
                    let de = parseNumber((2 * a) / hcf);
                    if (de == 1) {
                        rootOne = `${fst}+${sec}𝑖`;
                        rootTwo = `${fst}-${sec}𝑖`;
                    } else {
                        if (sec < 0) {
                            rootOne = `(${fst}-${sec * -1}𝑖)/${de}`;
                            rootTwo = `(${fst}+${sec * -1}𝑖)/${de}`;
                        } else {
                            rootOne = `(${fst}+${sec}𝑖)/${de}`;
                            rootTwo = `(${fst}-${sec}𝑖)/${de}`;
                        }
                    }
                } else {
                    rootOne = simplifyFraction(nuOne, 2 * a);
                    rootTwo = simplifyFraction(nuTwo, 2 * a);
                }
            }
        }
    } else {
        let hcf = gcd([-c, b]);
        let nume, deno;
        if (hcf != 0) {
            nume = -c / hcf;
            deno = b / hcf;
        } else {
            nume = -c;
            deno = b;
        }
        rootOne = simplifyFraction(nume, deno);
        rootTwo = rootOne;
    }

    return { rootOne, rootTwo };
}
export function solveQuadraticDec(
    a = 0,
    b = 0,
    c = 0
): {
    rootOne: string;
    rootTwo: string;
} {
    let d = b * b - 4 * a * c;
    let hasImgRoot = false;
    let rootOne, rootTwo;
    if (a != 0) {
        if (d < 0) {
            hasImgRoot = true;
            d *= -1;
        }
        d = Math.sqrt(d);
        let partOne = parseNumber(-b / (2 * a));
        let secondPart = parseNumber(d / (2 * a));
        if (!isFinite(partOne) || !isFinite(secondPart)) {
            rootOne = "";
            rootTwo = "";
        }
        if (hasImgRoot) {
            rootOne = `${partOne}+${secondPart}𝑖`;
            rootTwo = `${partOne}-${secondPart}𝑖`;
        } else {
            rootOne = parseNumber(partOne + secondPart).toString();
            rootTwo = parseNumber(partOne - secondPart).toString();
        }
    } else {
        rootOne = parseNumber(-c / b);
        rootTwo = rootOne.toString();
        if (!isFinite(rootOne)) {
            rootOne = "";
            rootTwo = "";
        } else {
            rootOne = parseNumber(-c / b).toString();
        }
    }
    return { rootOne, rootTwo };
}
export function equSolve(
    a1 = 0,
    a2 = 0,
    b1 = 0,
    b2 = 0,
    c1 = 0,
    c2 = 0,
    setFinalAns: React.Dispatch<React.SetStateAction<equnAnsType>>
) {
    let numeratorX = b1 * c2 - b2 * c1;
    let numeratorY = c1 * a2 - c2 * a1;
    let denominator = b2 * a1 - b1 * a2;
    let firstAns = { numeratorX, numeratorY, denominator };

    let hcf = gcd([a1, a2]);
    let newA1 = a1 / hcf,
        newA2 = a2 / hcf,
        newB1 = b1 / hcf,
        newB2 = b2 / hcf,
        newC1 = c1 / hcf,
        newC2 = c2 / hcf;
    if (newA1 / newA2 == newB1 / newB2 && newA1 / newA2 != newC1 / newC2) {
        setFinalAns((prev) => {
            return { ...prev, noSolution: true };
        });
    } else if (
        newA1 / newA2 == newB1 / newB2 &&
        newA1 / newA2 == newC1 / newC2 &&
        newB1 / newB2 == newC1 / newC2
    ) {
        setFinalAns((prev) => {
            return { ...prev, manySolution: true };
        });
    } else {
        if (firstAns.denominator != 0) {
            let hcfX = gcd([firstAns.numeratorX, firstAns.denominator]);
            let hcfY = gcd([firstAns.numeratorY, firstAns.denominator]);
            if (hcfX == 0) hcfX = 1;
            if (hcfY == 0) hcfY = 1;
            let numeratorX = parseNumber(firstAns.numeratorX / hcfX);
            let denominatorX = parseNumber(firstAns.denominator / hcfX);
            let numeratorY = parseNumber(firstAns.numeratorY / hcfY);
            let denominatorY = parseNumber(firstAns.denominator / hcfY);
            let x = parseNumber(numeratorX / denominatorX);
            let y = parseNumber(numeratorY / denominatorY);
            if (denominatorX < 0) {
                numeratorX *= -1;
                denominatorX *= -1;
            }
            if (denominatorY < 0) {
                numeratorY *= -1;
                denominatorY *= -1;
            }
            if (denominatorX == 1 || numeratorX == 0) {
                denominatorX = 0;
            }
            if (denominatorY == 1 || numeratorY == 0) {
                denominatorY = 0;
            }
            if (numeratorX == x && numeratorY == y) {
                x = 0;
                y = 0;
            }
            setFinalAns((prev) => {
                return {
                    ...prev,
                    numeratorX,
                    denominatorX,
                    numeratorY,
                    denominatorY,
                    x,
                    y,
                    normalSolution: true,
                };
            });
        }
    }
}
export function bracManage(str: string): string {
    let openBrac = str.match(/\(/g);
    let closeBrac = str.match(/\)/g);
    let openBrakets: string[] = [];
    let closeBrackets: string[] = [];
    if (openBrac) openBrakets = openBrac.join(",").split(",");
    if (closeBrac) closeBrackets = closeBrac.join(",").split(",");
    let openBracNumber = openBrakets.length;
    let closeBracNumber = closeBrackets.length;
    let missing = openBracNumber - closeBracNumber;
    let newStr = str;
    for (let i = 0; i < missing; i++) {
        newStr = newStr + ")";
    }
    return newStr;
}
export function lastChar(str: string): string {
    let last = str.charAt(str.length - 1);
    let type = "";
    for (let i = 0; i < calBtns.length; i++) {
        let btn = calBtns[i];
        if (btn.text == last) {
            type = btn.type;
        }
    }
    return type;
}

function simplifyTime(d = 0, h = 0, m = 0, s = 0) {
    let day = d;
    let hou = h;
    let min = m;
    let sec = s;
    let reCalculateTime = parseInt((sec / 60).toString());
    for (let i = 1; i <= reCalculateTime; i++) {
        if (sec >= 60) {
            min += 1;
            sec -= 60;
        }
    }
    reCalculateTime = parseInt((min / 60).toString());
    for (let i = 1; i <= reCalculateTime; i++) {
        if (min >= 60) {
            hou += 1;
            min -= 60;
        }
    }
    reCalculateTime = parseInt((hou / 24).toString());
    for (let i = 1; i <= reCalculateTime; i++) {
        if (hou >= 24) {
            day += 1;
            hou -= 24;
        }
    }
    return { day, hou, min, sec };
}

export function calculateTime(
    times: {
        d1: string;
        d2: string;
        h1: string;
        h2: string;
        m1: string;
        m2: string;
        s1: string;
        s2: string;
    },
    operation: number
) {
    let d1 = parseFloat(times.d1);
    let d2 = parseFloat(times.d2);
    let h1 = parseFloat(times.h1);
    let h2 = parseFloat(times.h2);
    let m1 = parseFloat(times.m1);
    let m2 = parseFloat(times.m2);
    let s1 = parseFloat(times.s1);
    let s2 = parseFloat(times.s2);
    if (isNaN(d1)) d1 = 0;
    if (isNaN(d2)) d2 = 0;
    if (isNaN(h1)) h1 = 0;
    if (isNaN(h2)) h2 = 0;
    if (isNaN(m1)) m1 = 0;
    if (isNaN(m2)) m2 = 0;
    if (isNaN(s1)) s1 = 0;
    if (isNaN(s2)) s2 = 0;
    if (operation == 1) {
        let day = d1 + d2;
        let hou = h1 + h2;
        let min = m1 + m2;
        let sec = s1 + s2;
        let ans = simplifyTime(day, hou, min, sec);
        return { day: ans.day, hou: ans.hou, min: ans.min, sec: ans.sec };
    } else if (operation == 2) {
        let timeOne = simplifyTime(d1, h1, m1, s1);
        let timeTwo = simplifyTime(d2, h2, m2, s2);
        while (
            timeOne.hou < timeTwo.hou ||
            timeOne.min < timeTwo.min ||
            timeOne.sec < timeTwo.sec
        ) {
            if (timeOne.hou < timeTwo.hou) {
                timeOne.day -= 1;
                timeOne.hou += 24;
            }
            if (timeOne.min < timeTwo.min) {
                timeOne.hou -= 1;
                timeOne.min += 60;
            }
            if (timeOne.sec < timeTwo.sec) {
                timeOne.min -= 1;
                timeOne.sec += 60;
            }
        }
        let day = timeOne.day - timeTwo.day;
        let hou = timeOne.hou - timeTwo.hou;
        let min = timeOne.min - timeTwo.min;
        let sec = timeOne.sec - timeTwo.sec;
        return { day, hou, min, sec };
    } else {
        return { day: 0, hou: 0, min: 0, sec: 0 };
    }
}

export function matrixMultiply(
    matrix: matrixType,
    info: {
        oneRow: string;
        twoRow: string;
        oneCol: string;
        twoCol: string;
    }
) {
    const { oneRow, oneCol, twoCol } = info;
    const { one, two } = matrix;
    let matrixOne: number[][] = [];
    let matrixTwo: number[][] = [];
    for (let i = 0; i < parseInt(oneCol); i++) {
        const col: string = one[(i + 1 + "") as keyof object];
        const colElements = col.trim().split(" ");
        const colNumbers: number[] = [];
        for (let j = 0; j < colElements.length; j++) {
            colNumbers.push(
                isNaN(parseFloat(colElements[i]))
                    ? 0
                    : parseFloat(colElements[i])
            );
        }
        matrixOne.push(colNumbers);
    }
    for (let i = 0; i < parseInt(twoCol); i++) {
        const col: string = two[(i + 1 + "") as keyof object];
        const colElements = col.trim().split(" ");
        const colNumbers: number[] = [];
        for (let j = 0; j < colElements.length; j++) {
            colNumbers.push(
                isNaN(parseFloat(colElements[i]))
                    ? 0
                    : parseFloat(colElements[i])
            );
        }
        matrixTwo.push(colNumbers);
    }
    let ans: number[][] = [];
    for (let i = 0; i < parseInt(oneRow); i++) {
        ans.push([]);
    }
    for (let i = 0; i < parseInt(oneRow); i++) {
        for (let j = 0; j < parseInt(twoCol); j++) {
            ans[i][j] = 0;
            for (let k = 0; k < parseInt(oneCol); k++) {
                ans[i][j] += matrixOne[i][k] * matrixTwo[k][j];
            }
        }
    }
    let newMatrix = [];
    for (let j = 0; j < parseInt(twoCol); j++) {
        let x = [];
        for (let i = 0; i < parseInt(oneRow); i++) {
            x.push(ans[i][j]);
        }
        newMatrix.push(x);
    }
    return { newMatrix, matrixOne, matrixTwo };
}

function removeSpace(str: string) {
    let ans = "";
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != " ") {
            ans += str[i];
        }
    }
    return ans;
}

export function infixToPostfix(infix: string) {
    const pOne = ["^"];
    const pTwo = ["*", "/"];
    const pThree = ["+", "-"];
    let strInput = removeSpace(infix).toUpperCase();
    let ans = "";
    let stack = [];
    let str = strInput.split("");
    str.unshift("(");
    str.push(")");
    let returnData = [];
    if (str.length == 2)
        return {
            data: [],
            infix: "",
            postfix: "",
        };
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "(") {
            stack.push(str[i]);
        } else if (str[i] == ")") {
            while (stack[stack.length - 1] != "(") {
                ans += stack.pop();
            }
            stack.pop();
        } else if (pOne.includes(str[i])) {
            stack.push(str[i]);
        } else if (pTwo.includes(str[i])) {
            let j = stack.length - 1;
            while (stack[j] != "(") {
                if (
                    pOne.includes(stack[stack.length - 1]) ||
                    pTwo.includes(stack[stack.length - 1])
                ) {
                    ans += stack.pop();
                }
                j--;
            }
            stack.push(str[i]);
        } else if (pThree.includes(str[i])) {
            let j = stack.length - 1;
            while (stack[j] != "(") {
                if (
                    pOne.includes(stack[stack.length - 1]) ||
                    pTwo.includes(stack[stack.length - 1]) ||
                    pThree.includes(stack[stack.length - 1])
                ) {
                    ans += stack.pop();
                }
                j--;
            }
            stack.push(str[i]);
        } else {
            ans += str[i];
        }
        returnData.push([str[i], stack.join(""), ans]);
    }
    return {
        data: returnData,
        infix: removeSpace(infix).toUpperCase(),
        postfix: removeSpace(ans),
    };
}
