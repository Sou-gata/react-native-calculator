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

function celToFar(num) {
    let f = 1.8 * parseFloat(num) + 32;
    f = f.toFixed(3) + "";
    f = parseFloat(f);
    let ans = `${num} °C = ${f} °F`;
    return ans;
}

function celToKal(num) {
    let k = parseFloat(num) + 273.15;
    k = k.toFixed(3) + "";
    k = parseFloat(k);
    let ans = `${num} °C = ${k} K`;
    return ans;
}

function celToRan(num) {
    let r = parseFloat(num) * 1.8 + 491.67;
    r = r.toFixed(3) + "";
    r = parseFloat(r);
    let ans = `${num} °C = ${r} °R`;
    return ans;
}

function farToCel(num) {
    let c = ((parseFloat(num) - 32) / 9) * 5;
    c = c.toFixed(3) + "";
    c = parseFloat(c);
    let ans = `${num} °F = ${c} °C`;
    return ans;
}

function farToRan(num) {
    let r = parseFloat(num) - 459.67;
    r = r.toFixed(3) + "";
    r = parseFloat(r);
    let ans = `${num} °F = ${r} °R`;
    return ans;
}

function farToKal(num) {
    let c = ((parseFloat(num) - 32) / 9) * 5;
    let k = c + 273.15;
    k = k.toFixed(3) + "";
    k = parseFloat(k);
    let ans = `${num} °F = ${k} K`;
    return ans;
}

function ranToCel(num) {
    let f = parseFloat(num) + 459.67;
    let c = ((f - 32) / 9) * 5;
    c = c.toFixed(3) + "";
    c = parseFloat(c);
    let ans = `${num} °R = ${c} °C`;
    return ans;
}

function ranToFar(num) {
    let f = parseFloat(num) + 459.67;
    f = f.toFixed(3) + "";
    f = parseFloat(f);
    let ans = `${num} °R = ${f} °F`;
    return ans;
}

function ranToKal(num) {
    let f = parseFloat(num) + 459.67;
    let c = ((f - 32) / 9) * 5;
    let k = c + 273.15;
    k = k.toFixed(3) + "";
    k = parseFloat(k);
    let ans = `${num} °R = ${k} K`;
    return ans;
}

function kalToCal(num) {
    let c = parseFloat(num) - 273.15;
    c = c.toFixed(3) + "";
    c = parseFloat(c);
    let ans = `${num} K = ${c} °C`;
    return ans;
}

function kalToFar(num) {
    let c = parseFloat(num) - 273.15;
    let f = 1.8 * c + 32;
    f = f.toFixed(3) + "";
    f = parseFloat(f);
    let ans = `${num} K = ${f} °F`;
    return ans;
}

function kalToRan(num) {
    let c = parseFloat(num) - 273.15;
    let f = 1.8 * c + 32;
    let r = f - 459.67;
    r = r.toFixed(3) + "";
    r = parseFloat(r);
    let ans = `${num} K = ${r} °R`;
    return ans;
}

export function temConvert(fromToObj, num) {
    let index = fromToObj;
    let text = parseFloat(num);

    let ans = "";

    if (index.from == index.to) {
        ans = "Invalid";
    } else if (index.from == 0) {
        if (index.to == 1) {
            let f = celToFar(text);
            ans = f;
        } else if (index.to == 2) {
            let k = celToKal(text);
            ans = k;
        } else if (index.to == 3) {
            let r = celToRan(text);
            ans = r;
        }
    } else if (index.from == 1) {
        if (index.to == 0) {
            let c = farToCel(text);
            ans = c;
        } else if (index.to == 2) {
            let k = farToKal(text);
            ans = k;
        } else if (index.to == 3) {
            let r = farToRan(text);
            ans = r;
        }
    } else if (index.from == 2) {
        if (index.to == 0) {
            let c = kalToCal(text);
            ans = c;
        } else if (index.to == 1) {
            let f = kalToFar(text);
            ans = f;
        } else if (index.to == 3) {
            let r = kalToRan(text);
            ans = r;
        }
    } else if (index.from == 3) {
        if (index.to == 0) {
            let c = ranToCel(text);
            ans = c;
        } else if (index.to == 1) {
            let f = ranToFar(text);
            ans = f;
        } else if (index.to == 2) {
            let k = ranToKal(text);
            ans = k;
        }
    }
    return ans;
}
