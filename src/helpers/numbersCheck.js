export function numToArr(number) {
    let inputNumber = number;
    inputNumber = inputNumber + "";
    inputNumber = inputNumber.split(".");
    for (let i = 0; i < inputNumber.length; i++) {
        inputNumber[i] = inputNumber[i].split("");
    }
    if (inputNumber.length > 1)
        inputNumber = inputNumber[0].concat(inputNumber[1]);
    else inputNumber = inputNumber[0];
    return inputNumber;
}
export function binaryCheck(number) {
    let inputNumber = numToArr(number);
    let correct = true;
    for (let i = 0; i < inputNumber.length; i++) {
        if (inputNumber[i].charCodeAt(0) >= 50) {
            correct = false;
            break;
        }
    }
    return correct;
}
export function hexCheck(number) {
    let inputNumber = numToArr(number);
    let correct = true;
    for (let i = 0; i < inputNumber.length; i++) {
        let a = inputNumber[i].charCodeAt(0);
        if (
            (a >= 48 && a <= 57) ||
            (a >= 97 && a <= 102) ||
            (a >= 65 && a <= 70)
        )
            continue;
        else {
            correct = false;
            break;
        }
    }
    return correct;
}
export function octalCheck(number) {
    let inputNumber = numToArr(number);
    let correct = true;
    for (let i = 0; i < inputNumber.length; i++) {
        let a = inputNumber[i].charCodeAt(0);
        if (a >= 48 && a <= 55) continue;
        else {
            correct = false;
            break;
        }
    }
    return correct;
}
export function decCheck(number) {
    let inputNumber = numToArr(number);
    let correct = true;
    for (let i = 0; i < inputNumber.length; i++) {
        let a = inputNumber[i].charCodeAt(0);
        if (a >= 48 && a <= 57) continue;
        else {
            correct = false;
            break;
        }
    }
    return correct;
}
export function decIntCheck(number) {
    let inputNumber = [];
    inputNumber = number.toString().split("");
    let correct = true;
    for (let i = 0; i < inputNumber.length; i++) {
        let a = inputNumber[i].charCodeAt(0);
        if (a >= 48 && a <= 57) continue;
        else {
            correct = false;
            break;
        }
    }
    return correct;
}
