export function numToArr(number: number | string) {
    let inputNumber = number.toString().split(".");
    let numbersArr: string[][] = [];
    for (let i = 0; i < inputNumber.length; i++) {
        numbersArr[i] = inputNumber[i].split("");
    }
    if (inputNumber.length > 1) return numbersArr[0].concat(numbersArr[1]);
    else return numbersArr[0];
}
export function binaryCheck(number: number) {
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
export function hexCheck(number: string): boolean {
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
export function octalCheck(number: number) {
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
export function decCheck(number: number) {
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
export function decIntCheck(number: number) {
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
