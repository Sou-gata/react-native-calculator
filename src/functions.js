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
