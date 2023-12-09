import { str } from "./input.mjs";

const arrIp = str.split("\n").map(ele => ele.split(/\s\s*/)).map(ele => ele.map(innerEle => parseInt(innerEle)));

const checkAllZeros = (arr) => {
    return arr.filter(ele => ele !== 0).length === 0 ? true : false;
}

const differenceCreator = (arr) => {
    let diffArray = [];
    for (let i = 0; i < arr.length - 1; i++) {
        diffArray.push(arr[i + 1] - arr[i]);
    }
    return diffArray;
}

let total = 0;

for (let i = 0; i < arrIp.length; i++) {
    let firstEleArray = [];
    let currHistDiff = 0;
    let arrToCheck = arrIp[i];

    while (!checkAllZeros(arrToCheck)) {
        firstEleArray.push(arrToCheck[0]);
        arrToCheck = differenceCreator(arrToCheck);
    }

    for (let i = firstEleArray.length - 1; i >= 0; i--) {
        currHistDiff = firstEleArray[i] - currHistDiff;
    }

    total += currHistDiff;
}

console.log(total)