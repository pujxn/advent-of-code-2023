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
let currSrc = "AAA";

for (let i = 0; i < dirList.length; i++) {
    if (dirList[i] === "L") {
        currSrc = srcMap.get(currSrc)[0]
    }
    else if (dirList[i] === "R") {
        currSrc = srcMap.get(currSrc)[1]
    }
    counter++;
    if (currSrc === "ZZZ") {
        break;
    }


    if (i === dirList.length - 1) {
        i = -1;
    }
}

console.log(counter);