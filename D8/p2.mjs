import { str } from "./input.mjs";

let arrIp = str.split("\n\n");


const dirList = arrIp[0];

arrIp.shift();
arrIp = arrIp.map(ele => ele.split("\n"))[0];
arrIp = arrIp.map(ele => ele.split("="));
arrIp = arrIp.map(ele => ele.map(innerEle => innerEle.trim()));

arrIp = arrIp.map(ele => [ele[0], ele[1].substring(1, ele[1].length - 1)])
arrIp = arrIp.map(ele => [ele[0], ele[1].split(", ")]);

const srcMap = new Map();

for (let i = 0; i < arrIp.length; i++) {
    srcMap.set(arrIp[i][0], arrIp[i][1]);
}
let counter = 0;
let currSrc = Array.from(srcMap.keys()).filter(ele => ele[ele.length - 1] === "A");
let currSrcCountsList = [];
for (let j = 0; j < currSrc.length; j++) {
    let currSrcNode = currSrc[j];
    for (let i = 0; i < dirList.length; i++) {

        if (dirList[i] === "L") {
            currSrcNode = srcMap.get(currSrcNode)[0]
        }
        else if (dirList[i] === "R") {
            currSrcNode = srcMap.get(currSrcNode)[1]
        }
        counter++;
        if (currSrcNode[currSrcNode.length - 1] === "Z") {
            currSrcCountsList[j] = counter;
            break;
        }
        if (i === dirList.length - 1) {
            i = -1;
        }
    }
    counter = 0;
}

const hcf = (a, b) => {
    let minEle = a < b ? a : b;
    let maxEle = a > b ? a : b
    let modZero = false;
    while (!modZero) {
        if (maxEle % minEle != 0) {
            minEle = maxEle % minEle;
        }
        else {
            modZero = true;
        }
    }
    return minEle;
}
let firstEle = currSrcCountsList[0];
for (let i = 0; i < currSrcCountsList.length - 1; i++) {
    let secondEle = currSrcCountsList[i + 1];
    firstEle = hcf(firstEle, secondEle);
}
let product = 1;
currSrcCountsList.forEach(ele => product *= ele)
console.log(product / firstEle);
