import {
    roman,
    numeral,
    romanToNumeral,
    hexToBinTable,
    binToHexTable,
    binToOctTable,
    octToBinTable,
} from "./tables";
import calBtns from "../helpers/calBtns";

export function devide(numberA, numberB) {
    let numbers = [];
    numbers[0] = convertToNumber(numberA).toString();
    numbers[1] = convertToNumber(numberB).toString();
    let result = "0";
    let remainder = numbers[0];
    let multipleRuselts = [];
    let subResults = [];
    let remainderArr = [];
    let spacingArr = [];
    let spacingInfo = [];
    let a = parseInt(numbers[0]);
    let b = parseInt(numbers[1]);
    if (b > a || isNaN(a) || isNaN(b)) {
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
        result,
        multipleRuselts,
        subResults,
        spacingInfo,
    };
}

export function multiple(numberA, numberB) {
    let numbers = [];
    numbers[0] = convertToNumber(numberA).toString();
    numbers[1] = convertToNumber(numberB).toString();
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
        let blakMultiplyFix;
        if (results[i] == 0) {
            if (i == 0) blakMultiplyFix = "";
            else blakMultiplyFix = "0";
            for (let x = 0; x < numbers[0].length; x++) {
                blakMultiplyFix += "0";
            }
            results[i] = blakMultiplyFix;
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

export function factors(number) {
    let num = convertToNumber(number);
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
    return { str, number: num };
}

export function checkLcmHcfNum(str) {
    let numberSet = str;
    numberSet = numberSet.split(" ");
    let valid = true;
    if (numberSet.length < 2) valid = false;
    for (let i = 0; i < numberSet.length; i++) {
        numberSet[i] = parseFloat(numberSet[i]);
        if (isNaN(numberSet[i])) {
            valid = false;
        }
    }
    if (valid) return numberSet;
    else return valid;
}

function maxDigitAfterPoint(numbersArr) {
    let numberSet = numbersArr;
    let maxDigit = 0;
    for (let i = 0; i < numberSet.length; i++) {
        let temp = numberSet[i].toString();
        temp = temp.split(".");
        if (temp.length > 1) {
            let lengthAfter = temp[1].length;
            if (lengthAfter > maxDigit) maxDigit = lengthAfter;
        }
    }
    return maxDigit;
}

export function lcm(numbersArr) {
    let hasPoint = false;
    let numberSet = numbersArr;
    let newNumberSet = [];
    for (let i = 0; i < numberSet.length; i++) {
        numberSet[i] = Math.abs(parseFloat(numberSet[i]));
        if (numberSet[i] != Math.floor(numberSet[i])) {
            hasPoint = true;
        }
    }
    if (!hasPoint) {
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
    } else {
        let maxDigit = maxDigitAfterPoint(numberSet);
        for (let i = 0; i < numberSet.length; i++) {
            newNumberSet[i] = numberSet[i] * Math.pow(10, maxDigit);
        }
        let Lcm = lcm(newNumberSet);
        Lcm = Lcm / Math.pow(10, maxDigit);
        return Lcm;
    }
}

export function gcd(numbersArr) {
    let fractionHcf = false;
    let numberSet = numbersArr;
    for (let i = 0; i < numberSet.length; i++) {
        numberSet[i] = Math.abs(parseFloat(numberSet[i]));
        if (numberSet[i] != Math.floor(numberSet[i])) {
            fractionHcf = true;
        }
    }
    if (!fractionHcf) {
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
    } else {
        let maxDigit = maxDigitAfterPoint(numberSet);
        let newNumberSet = [];
        for (let i = 0; i < numberSet.length; i++) {
            newNumberSet[i] = numberSet[i] * Math.pow(10, maxDigit);
        }
        let hcf = gcd(newNumberSet);
        hcf = hcf / Math.pow(10, maxDigit);
        return hcf;
    }
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
    f = f.toFixed(3).toString();
    f = parseFloat(f);
    let ans = f;
    return ans;
}

export function celToKal(num) {
    let k = parseFloat(num) + 273.15;
    k = k.toFixed(3).toString();
    k = parseFloat(k);
    let ans = k;
    return ans;
}

export function celToRan(num) {
    let r = parseFloat(num) * 1.8 + 491.67;
    r = r.toFixed(3).toString();
    r = parseFloat(r);
    let ans = r;
    return ans;
}

export function farToCel(num) {
    let c = ((parseFloat(num) - 32) / 9) * 5;
    c = c.toFixed(3).toString();
    c = parseFloat(c);
    let ans = c;
    return ans;
}

export function farToRan(num) {
    let r = parseFloat(num) - 459.67;
    r = r.toFixed(3).toString();
    r = parseFloat(r);
    let ans = r;
    return ans;
}

export function farToKal(num) {
    let c = ((parseFloat(num) - 32) / 9) * 5;
    let k = c + 273.15;
    k = k.toFixed(3).toString();
    k = parseFloat(k);
    let ans = k;
    return ans;
}

export function ranToCel(num) {
    let f = parseFloat(num) + 459.67;
    let c = ((f - 32) / 9) * 5;
    c = c.toFixed(3).toString();
    c = parseFloat(c);
    let ans = c;
    return ans;
}

export function ranToFar(num) {
    let f = parseFloat(num) + 459.67;
    f = f.toFixed(3).toString();
    f = parseFloat(f);
    let ans = f;
    return ans;
}

export function ranToKal(num) {
    let f = parseFloat(num) + 459.67;
    let c = ((f - 32) / 9) * 5;
    let k = c + 273.15;
    k = k.toFixed(3).toString();
    k = parseFloat(k);
    let ans = k;
    return ans;
}

export function kalToCal(num) {
    let c = parseFloat(num) - 273.15;
    c = c.toFixed(3).toString();
    c = parseFloat(c);
    let ans = c;
    return ans;
}

export function kalToFar(num) {
    let c = parseFloat(num) - 273.15;
    let f = 1.8 * c + 32;
    f = f.toFixed(3).toString();
    f = parseFloat(f);
    let ans = f;
    return ans;
}

export function kalToRan(num) {
    let c = parseFloat(num) - 273.15;
    let f = 1.8 * c + 32;
    let r = f - 459.67;
    r = r.toFixed(3).toString();
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
    let parts = binaryNum.toString();
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
    let parts = binaryNum.toString();
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
    let parts = octVal.toString();
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
    let number = val.toString();
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

export function equSolve(a1, a2, b1, b2, c1, c2, setFinalAns) {
    a1 = parseFloat(a1);
    a2 = parseFloat(a2);
    b1 = parseFloat(b1);
    b2 = parseFloat(b2);
    c1 = parseFloat(c1);
    c2 = parseFloat(c2);
    if (isNaN(a1)) a1 = 0;
    if (isNaN(a2)) a2 = 0;
    if (isNaN(b1)) b1 = 0;
    if (isNaN(b2)) b2 = 0;
    if (isNaN(c1)) c1 = 0;
    if (isNaN(c2)) c2 = 0;
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
        setFinalAns({ noSolution: true });
    } else if (
        newA1 / newA2 == newB1 / newB2 &&
        newA1 / newA2 == newC1 / newC2 &&
        newB1 / newB2 == newC1 / newC2
    ) {
        setFinalAns({ manySolution: true });
    } else {
        if (firstAns.denominator != 0) {
            let hcfX = gcd([firstAns.numeratorX, firstAns.denominator]);
            let hcfY = gcd([firstAns.numeratorY, firstAns.denominator]);
            if (hcfX == 0) hcfX = 1;
            if (hcfY == 0) hcfY = 1;
            let numeratorX = firstAns.numeratorX / hcfX;
            let denominatorX = firstAns.denominator / hcfX;
            let numeratorY = firstAns.numeratorY / hcfY;
            let denominatorY = firstAns.denominator / hcfY;
            let x = parseFloat((numeratorX / denominatorX).toFixed(4));
            let y = parseFloat((numeratorY / denominatorY).toFixed(4));
            if (denominatorX < 0) {
                numeratorX *= -1;
                denominatorX *= -1;
            }
            if (denominatorY < 0) {
                numeratorY *= -1;
                denominatorY *= -1;
            }
            if (denominatorX == 1 || numeratorX == 0) {
                denominatorX = undefined;
            }
            if (denominatorY == 1 || numeratorY == 0) {
                denominatorY = undefined;
            }
            if (numeratorX == x && numeratorY == y) {
                x = undefined;
                y = undefined;
            }
            setFinalAns({
                numeratorX,
                denominatorX,
                numeratorY,
                denominatorY,
                x,
                y,
            });
        }
    }
}

function simplifyFraction(numerator, denominator) {
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

function calculateRoot(number) {
    let num = parseFloat(number);
    let hasDecimal = false;
    let temp = num.toString();
    temp = temp.split(".");
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

function simplifyAns(fstPart, secPart, deno) {
    let secondPart = secPart.toString().split("√");
    let hasTwoPart = false;
    let secPartTwo = "";
    if (secondPart.length > 1) {
        secPartTwo = secondPart[1];
        if (secondPart[0] == "") secondPart = 1;
        else secondPart = parseFloat(secondPart[0]);
        hasTwoPart = true;
    } else {
        secondPart = 1;
    }
    let hcf;
    if (fstPart == 0) {
        hcf = gcd([secondPart, deno]);
    } else {
        hcf = gcd([fstPart, secondPart, deno]);
    }
    let partOne = fstPart / hcf;
    let partTwo = secondPart / hcf;
    let denominator = deno / hcf;
    if (hasTwoPart) {
        if (partTwo == 1) {
            partTwo = "√" + secPartTwo;
        } else {
            partTwo = partTwo + "√" + secPartTwo;
        }
    }
    return {
        partOne: partOne.toString(),
        partTwo: partTwo.toString(),
        denominator: denominator.toString(),
    };
}

export function solveQuadraticEqu(a, b, c) {
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);
    if (isNaN(a)) a = 0;
    if (isNaN(b)) b = 0;
    if (isNaN(c)) c = 0;
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
                let simplifiedAns = simplifyAns(nuFstPart, nuSecPart, 2 * a);
                let { partOne, partTwo, denominator } = simplifiedAns;
                if (!hasImgRoot) {
                    if (partOne != 0) {
                        if (denominator == 1) {
                            rootOne = `${partOne}+${partTwo}`;
                            rootTwo = `${partOne}-${partTwo}`;
                        } else {
                            rootOne = `(${partOne}+${partTwo})/${denominator}`;
                            rootTwo = `(${partOne}-${partTwo})/${denominator}`;
                        }
                    } else {
                        if (denominator == 1) {
                            rootOne = `${partTwo}`;
                            rootTwo = `-${partTwo}`;
                        } else {
                            rootOne = `${partTwo}/${denominator}`;
                            rootTwo = `-${partTwo}/${denominator}`;
                        }
                    }
                } else {
                    if (partOne != 0) {
                        if (denominator == 1) {
                            rootOne = `${partOne}+${partTwo}𝑖`;
                            rootTwo = `${partOne}-${partTwo}𝑖`;
                        } else {
                            rootOne = `(${partOne}+${partTwo}𝑖)/${denominator}`;
                            rootTwo = `(${partOne}-${partTwo}𝑖)/${denominator}`;
                        }
                    } else {
                        if (denominator == 1) {
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
                    let hcf = gcd([-b, nuSecPart, 2 * a]);
                    hcf = hcf == 0 ? 1 : hcf;
                    let fst = -b / hcf;
                    let sec = nuSecPart / hcf;
                    let de = (2 * a) / hcf;
                    if (de == 1) {
                        rootOne = `${fst}+${sec}𝑖`;
                        rootTwo = `${fst}-${sec}𝑖`;
                    } else {
                        rootOne = `(${fst}+${sec}𝑖)/${de}`;
                        rootTwo = `(${fst}-${sec}𝑖)/${de}`;
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

export function solveQuadraticDec(a, b, c) {
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);
    if (isNaN(a)) a = 0;
    if (isNaN(b)) b = 0;
    if (isNaN(c)) c = 0;
    let d = b * b - 4 * a * c;
    let hasImgRoot = false;
    let rootOne, rootTwo;
    if (a != 0) {
        if (d < 0) {
            hasImgRoot = true;
            d *= -1;
        }
        d = Math.sqrt(d);
        let partOne = parseFloat((-b / (2 * a)).toFixed(4));
        let secondPart = parseFloat((d / (2 * a)).toFixed(4).toString());
        if (!isFinite(partOne) || !isFinite(secondPart)) {
            rootOne = undefined;
            rootTwo = undefined;
        }
        if (hasImgRoot) {
            rootOne = `${partOne}+${secondPart}𝑖`;
            rootTwo = `${partOne}-${secondPart}𝑖`;
        } else {
            rootOne = parseFloat((partOne + secondPart).toFixed(4));
            rootTwo = parseFloat((partOne - secondPart).toFixed(4));
        }
    } else {
        rootOne = parseFloat((-c / b).toFixed(4));
        rootTwo = rootOne;
        if (!isFinite(rootOne)) {
            rootOne = undefined;
            rootTwo = undefined;
        }
    }
    return { rootOne, rootTwo };
}

function simplifyTime(d, h, m, s) {
    let day = parseFloat(d);
    let hou = parseFloat(h);
    let min = parseFloat(m);
    let sec = parseFloat(s);
    let reCalculateTime = parseInt(sec / 60);
    for (let i = 1; i <= reCalculateTime; i++) {
        if (sec >= 60) {
            min += 1;
            sec -= 60;
        }
    }
    reCalculateTime = parseInt(min / 60);
    for (let i = 1; i <= reCalculateTime; i++) {
        if (min >= 60) {
            hou += 1;
            min -= 60;
        }
    }
    reCalculateTime = parseInt(hou / 24);
    for (let i = 1; i <= reCalculateTime; i++) {
        if (hou >= 24) {
            day += 1;
            hou -= 24;
        }
    }
    return { day, hou, min, sec };
}

export function calculateTime(times, operation) {
    let { d1, h1, m1, s1, d2, h2, m2, s2 } = times;
    d1 = parseFloat(d1);
    d2 = parseFloat(d2);
    h1 = parseFloat(h1);
    h2 = parseFloat(h2);
    m1 = parseFloat(m1);
    m2 = parseFloat(m2);
    s1 = parseFloat(s1);
    s2 = parseFloat(s2);
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
    }
}

export function bracManage(str) {
    let openBrac = str.match(/\(/g);
    let closeBrac = str.match(/\)/g);
    if (!openBrac) openBrac = [];
    if (!closeBrac) closeBrac = [];
    openBrac = openBrac.length;
    closeBrac = closeBrac.length;
    let missing = openBrac - closeBrac;
    let newStr = str;
    for (let i = 0; i < missing; i++) {
        newStr = newStr + ")";
    }
    return newStr;
}

function gamma(z) {
    let ansOne = Math.sqrt((2 * Math.PI) / z);
    let ansTwo = Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
    let ans = ansOne * ansTwo;
    ans = ans.toFixed(4).toString();
    ans = parseFloat(ans);
    return ans;
}

export function fact(n) {
    let isDecimal = false;
    let temp = n.toString();
    temp = temp.split(".");
    if (temp.length > 1) isDecimal = true;
    let num = parseFloat(n);
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

export function numaricToRoman(number) {
    let num = Math.abs(parseInt(number));
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
    let ans = valueGen(romanNum);
    return ans;
}

function valueGen(string) {
    let str = string;
    str = str.split("");
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char == "_") {
            str[i] = { val: str[i + 1], special: true };
            str.splice(i + 1, 1);
        } else {
            str[i] = { val: str[i], special: false };
        }
    }
    return str;
}

export function permutationCombination({ n, r }, { order, repeat }) {
    n = parseInt(n);
    r = parseInt(r);
    let invalid = false;
    let nuFormula = "";
    let deFormula = "";
    let valueNu = "";
    let valueDe = "";
    let ans = 0;
    if (n < r || n <= 0 || r <= 0) {
        invalid = true;
    }
    if (!invalid) {
        if (order == 1 && repeat == 1) {
            nuFormula = "n^r";
            deFormula = undefined;
            valueNu = `${n}^${r}`;
            valueDe = undefined;
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
            nuFormula: undefined,
            deFormula: undefined,
            ans: undefined,
            valueNu: undefined,
            valueDe: undefined,
        };
    }
}

function maxRepeating(str) {
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

function validateRoman(string) {
    let valid = true;
    let str = string;
    valid = maxRepeating(str);
    let strArr = str.split("");
    if (strArr.length > 2) {
        for (let i = 2; i < strArr.length; i++) {
            let proPre = romanToNumeral[strArr[i - 2]];
            let current = romanToNumeral[strArr[i]];
            if (proPre < current) {
                valid = false;
                break;
            }
        }
    } else if (strArr.length > 1) {
        for (let i = 1; i < strArr.length; i++) {
            let pre = romanToNumeral[strArr[i - 1]];
            let current = romanToNumeral[strArr[i]];
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

export function romanToNumber(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += arr[i].str;
    }
    if (str == "") return;
    if (validateRoman(str)) {
        let num = romanToNumeral[str.charAt(0)];
        for (let i = 1; i < str.length; i++) {
            let curr = romanToNumeral[str.charAt(i)];
            let pre = romanToNumeral[str.charAt(i - 1)];
            if (curr <= pre) {
                num += curr;
            } else {
                num = num - pre * 2 + curr;
            }
        }
        if (num > 3999999) num = undefined;
        return num;
    } else return undefined;
}

function expToPow(number) {
    let num = number.toString();
    num = num.split("e");
    if (num.length == 1) {
        return number.toString();
    } else {
        let partOne = parseFloat(num[0]).toFixed(3);
        let pow = parseFloat(num[1]);
        let ans = `${partOne}×10^${pow}`;
        return ans;
    }
}

function convertToNumber(number) {
    let num = number.toString();
    num = num.split(" ")[0];
    num = num.split("-")[0];
    num = num.split(".")[0];
    num = num.split(",")[0];
    num = parseInt(num);
    return num;
}
