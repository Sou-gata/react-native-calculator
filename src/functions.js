export function checkNumbers(string) {
    let valid = true;
    let numArr = string;
    numArr = numArr.split(" ");
    if (numArr.length != 2) valid = false;
    numArr[0] = parseInt(numArr[0]);
    numArr[1] = parseInt(numArr[1]);
    if (typeof numArr[0] !== "number" || typeof numArr[1] !== "number") {
        valid = false;
    }
    if (isNaN(numArr[0]) || isNaN(numArr[1])) {
        valid = false;
    }
    if (valid) return numArr;
    else return false;
}

export function devide(numberA, numberB) {
    let numbers = [];
    numbers[0] = numberA + "";
    numbers[1] = numberB + "";
    let result = "0";
    let remainder = numberA;
    let multipleRuselts = [];
    let subResults = [];
    let remainderArr = [];
    let spacingArr = [];
    let spacingInfo = [];
    let a = parseInt(numbers[0]);
    let b = parseInt(numbers[1]);
    if (b > a) {
        return;
    }
    numbers[0] = numbers[0].split("");
    for (let i = 0; i < numbers[0].length; i++) {
        numbers[0][i] = parseInt(numbers[0][i]);
    }
    numbers[1] = parseInt(numbers[1]);
    let loopCount = 0;
    for (let j = 0; true; j++) {
        let tempIn = 0;
        let counter = 0;
        loopCount++;
        for (let i = 0; i < numbers[0].length; i++) {
            if (tempIn < numbers[1]) {
                tempIn = tempIn * 10 + numbers[0][i];
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
            numbers[0].splice(0, 1);
        }
        remainder = tempIn % numbers[1];
        numbers[0].unshift(remainder);
        subResults.push(tempIn);
        let multiple = tempResult * numbers[1];
        multipleRuselts.push(multiple);
        remainderArr.push(remainder);
        if (numbers[0].length == 1) break;
    }
    result = parseInt(result);
    for (let i = 0; i < remainderArr.length; i++) {
        let space =
            (subResults[i] + "").length - (multipleRuselts[i] + "").length;

        spacingArr.push(space);
        space =
            (multipleRuselts[i] + "").length - (remainderArr[i] + "").length;
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
        result,
        multipleRuselts,
        subResults,
        spacingInfo,
    };
}

export function multiple(numberA, numberB) {
    let numbers = [];
    numbers[0] = numberA + "";
    numbers[1] = numberB + "";
    let results = [];
    let ans = 0;
    numbers[1] = numbers[1].split("");

    for (let i = 0; i < numbers[1].length; i++) {
        for (let j = 0; j < numbers[1].length - i - 1; j++) {
            numbers[1][i] += "0";
        }
    }
    numbers[1].reverse();
    for (let i = 0; i < numbers[1].length; i++) {
        results[i] = numbers[0] * numbers[1][i];
        ans += results[i];
    }
    for (let i = 0; i < results.length; i++) {
        results[i] = results[i] + "";
        let l = results[i].length;
        let temp = results[i].split("");
        for (let j = 0; j < i; j++) {
            temp[l - j - 1] = "x";
        }
        let tempStr = "";
        for (let j = 0; j < temp.length; j++) {
            tempStr += temp[j];
        }
        results[i] = tempStr;
    }
    return { results, ans, numberA, numberB };
}

export function factors(number) {
    let num = number;
    num = parseInt(num);
    let facts = [];
    for (let i = 0; i <= num; i++) {
        if (num % i == 0) {
            facts.push(i);
        }
    }

    let str = "";
    for (let i = 0; i < facts.length; i++) {
        str += facts[i];
        if (i < facts.length - 1) {
            str += ", ";
        }
    }
    return { str, number };
}

export function checkLcmHcfNum(str) {
    let numberSet = str;
    numberSet = numberSet.split(" ");
    let valid = true;
    if (numberSet.length < 2) valid = false;
    for (let i = 0; i < numberSet.length; i++) {
        numberSet[i] = parseInt(numberSet[i]);
        if (isNaN(numberSet[i])) {
            valid = false;
        }
    }
    if (valid) return numberSet;
    else return valid;
}

export function lcm(numbersArr) {
    let numberSet = numbersArr;
    let lcm = 1;
    let lcmTemp = numberSet[0];
    for (let i = 0; i < numberSet.length; i++) {
        while (true) {
            if (lcm % numberSet[i] == 0 && lcm % lcmTemp == 0) {
                lcmTemp = lcm;
                break;
            }
            lcm++;
        }
    }
    return lcm;
}

export function gcd(numbersArr) {
    let numberSet = numbersArr;
    for (let i = 0; i < numberSet.length; i++) {
        numberSet[i] = parseInt(numberSet[i]);
    }
    let gcd = numberSet[0];
    for (let i = 0; i < numberSet.length; i++) {
        let gcdTemp = gcd;
        for (let j = 1; j <= gcdTemp; j++) {
            if (numberSet[i] % j == 0 && gcdTemp % j == 0) {
                gcd = j;
            }
        }
    }
    return gcd;
}

export function inputNumbers(str) {
    let numberSet = str;
    numberSet = numberSet.split(" ");
    let inputShow = "";
    for (let i = 0; i < numberSet.length; i++) {
        inputShow += numberSet[i];
        if (i < numberSet.length - 1) {
            inputShow += ", ";
        }
    }
    return inputShow;
}

export function celToFar(num) {
    let f = 1.8 * parseFloat(num) + 32;
    f = f.toFixed(3) + "";
    f = parseFloat(f);
    let ans = f;
    return ans;
}

export function celToKal(num) {
    let k = parseFloat(num) + 273.15;
    k = k.toFixed(3) + "";
    k = parseFloat(k);
    let ans = k;
    return ans;
}

export function celToRan(num) {
    let r = parseFloat(num) * 1.8 + 491.67;
    r = r.toFixed(3) + "";
    r = parseFloat(r);
    let ans = r;
    return ans;
}

export function farToCel(num) {
    let c = ((parseFloat(num) - 32) / 9) * 5;
    c = c.toFixed(3) + "";
    c = parseFloat(c);
    let ans = c;
    return ans;
}

export function farToRan(num) {
    let r = parseFloat(num) - 459.67;
    r = r.toFixed(3) + "";
    r = parseFloat(r);
    let ans = r;
    return ans;
}

export function farToKal(num) {
    let c = ((parseFloat(num) - 32) / 9) * 5;
    let k = c + 273.15;
    k = k.toFixed(3) + "";
    k = parseFloat(k);
    let ans = k;
    return ans;
}

export function ranToCel(num) {
    let f = parseFloat(num) + 459.67;
    let c = ((f - 32) / 9) * 5;
    c = c.toFixed(3) + "";
    c = parseFloat(c);
    let ans = c;
    return ans;
}

export function ranToFar(num) {
    let f = parseFloat(num) + 459.67;
    f = f.toFixed(3) + "";
    f = parseFloat(f);
    let ans = f;
    return ans;
}

export function ranToKal(num) {
    let f = parseFloat(num) + 459.67;
    let c = ((f - 32) / 9) * 5;
    let k = c + 273.15;
    k = k.toFixed(3) + "";
    k = parseFloat(k);
    let ans = k;
    return ans;
}

export function kalToCal(num) {
    let c = parseFloat(num) - 273.15;
    c = c.toFixed(3) + "";
    c = parseFloat(c);
    let ans = c;
    return ans;
}

export function kalToFar(num) {
    let c = parseFloat(num) - 273.15;
    let f = 1.8 * c + 32;
    f = f.toFixed(3) + "";
    f = parseFloat(f);
    let ans = f;
    return ans;
}

export function kalToRan(num) {
    let c = parseFloat(num) - 273.15;
    let f = 1.8 * c + 32;
    let r = f - 459.67;
    r = r.toFixed(3) + "";
    r = parseFloat(r);
    let ans = r;
    return ans;
}

export function decimalToBinary(decimalNum) {
    let i = parseFloat(decimalNum);
    let binaryNum = "";
    let binaryPoint = "";
    let havePoint = Math.floor(i) != i;
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
    binaryNum = binaryNum.split("");
    binaryNum = binaryNum.reverse();
    binaryNum = binaryNum.join("");
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
        binaryNum = parseFloat(binaryNum);
    } else {
        binaryNum = parseInt(binaryNum);
    }
    return binaryNum;
}

export function binaryToDecimal(binaryNum) {
    let digArr = [];
    let count = 0;
    let i = parseFloat(binaryNum);
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
        pointBinary = pointBinary.toFixed(5);
        pointBinary = pointBinary.split("");
        pointBinary.splice(0, 2);
        for (let j = 0; j < 5; j++) {
            pointBinary[j] = parseInt(pointBinary[j]);
            pointDec += pointBinary[j] * (1 / Math.pow(2, j + 1));
        }
        decimalNum += pointDec;
    }
    return decimalNum;
}

import {
    hexToBinTable,
    binToHexTable,
    binToOctTable,
    octToBinTable,
} from "./tables";

export function hexToBin(hexVal) {
    let parts = hexVal.toLowerCase();
    parts = parts.split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let binVal = "";
        for (let i = 0; i < digits.length; i++) {
            if (digits[i] >= 65) digits[i] = digits[i];
            let hexToBin = hexToBinTable[digits[i]];
            binVal += hexToBin;
        }
        return binVal;
    } else if (parts.length == 2) {
        let fstPart = hexToBin(parts[0]);
        let secondPart = hexToBin(parts[1]);
        let fullNumber = fstPart + "." + secondPart;
        return fullNumber;
    }
}

export function binToHex(binaryNum) {
    let parts = binaryNum + "";
    parts = parts.split(".");
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
            snippit = snippit.split("");
            snippit.reverse();
            snippit = snippit.join("");
            binArr.push(snippit);
            if (pointer == 0) break;
        }
        binArr.reverse();
        for (let i = 0; i < binArr.length; i++) {
            binArr[i] = parseInt(binArr[i]);
            if (binArr[i] <= 1) binArr[i] = "000" + binArr[i];
            else if (binArr[i] <= 11) binArr[i] = "00" + binArr[i];
            else if (binArr[i] <= 111) binArr[i] = "0" + binArr[i];
            hexNum += binToHexTable[binArr[i]];
        }
        return hexNum;
    } else if (parts.length == 2) {
        let fstPart = binToHex(parts[0]);
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
            secondPart += binToHexTable[degitSet[i]];
        }
        if (secondPart == "0") {
            return fstPart;
        } else {
            let fullNumber = fstPart + "." + secondPart;
            return fullNumber;
        }
    }
}

export function binToOct(binaryNum) {
    let parts = binaryNum + "";
    parts = parts.split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let pointer = digits.length;
        let count = 0;
        let binArr = [];
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
            snippit = snippit.split("");
            snippit.reverse();
            snippit = snippit.join("");
            binArr.push(snippit);
            if (pointer == 0) break;
        }
        binArr.reverse();

        for (let i = 0; i < binArr.length; i++) {
            binArr[i] = parseInt(binArr[i]);
            if (binArr[i] <= 1) binArr[i] = "00" + binArr[i];
            else if (binArr[i] <= 11) binArr[i] = "0" + binArr[i];
            octNum += binToOctTable[binArr[i]];
        }
        return octNum;
    } else if (parts.length == 2) {
        let fstPart = binToOct(parts[0]);
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
            secondPart += binToOctTable[degitSet[i]];
        }
        if (secondPart == "0") {
            return fstPart;
        } else {
            let fullNumber = fstPart + "." + secondPart;
            return fullNumber;
        }
    }
}

export function octToBin(octVal) {
    let parts = octVal + "";
    parts = parts.split(".");
    if (parts.length == 1) {
        let digits = parts[0].split("");
        let binVal = "";
        for (let i = 0; i < digits.length; i++) {
            let octToBinVal = octToBinTable[digits[i]];
            binVal += octToBinVal;
        }
        return binVal;
    } else if (parts.length == 2) {
        let fstPart = octToBin(parts[0]);
        let secondPart = octToBin(parts[1]);
        let fullNumber = fstPart + "." + secondPart;
        return fullNumber;
    }
}

export function pointRemove(val) {
    let ans;
    let number = val + "";
    number = number.split("");
    let lastDig = number[number.length - 1];
    if (lastDig == ".") {
        number.splice(number.length - 1, 1);
        let temp = "";
        for (let i = 0; i < number.length; i++) {
            temp += number[i];
        }
        ans = temp;
    } else {
        ans = val;
    }
    return ans;
}

import calBtns from "./helpers/calBtns";

export function lastChar(str) {
    let last = str.charAt(str.length - 1);
    let type;
    for (let i = 0; i < calBtns.length; i++) {
        let btn = calBtns[i];
        if (btn.text == last) {
            type = btn.type;
        }
    }
    return type;
}
