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
    const lastEleArray = [];
    let arrToCheck = arrIp[i];

    while (!checkAllZeros(arrToCheck)) {
        lastEleArray.push(arrToCheck[arrToCheck.length - 1]);
        arrToCheck = differenceCreator(arrToCheck);
    }

    lastEleArray.forEach(ele => total += ele);
}

console.log(total)