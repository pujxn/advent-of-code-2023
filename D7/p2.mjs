import { str } from "./input.mjs";

let arrIp = str.split("\n");
arrIp = arrIp.map(ele => ele.split(/\s\s*/))

const sortCards = (arr) => {
    const letterCardMap = new Map([["T", 10], ["J", 1], ["Q", 12], ["K", 13], ["A", 14]]);
    arr.sort((a, b) => {
        let differenceVal;
        for (let i = 0; i < a[0].length; i++) {
            const aVal = isNaN(parseInt(a[0][i])) ? letterCardMap.get(a[0][i]) : parseInt(a[0][i]);
            const bVal = isNaN(parseInt(b[0][i])) ? letterCardMap.get(b[0][i]) : parseInt(b[0][i]);
            differenceVal = aVal - bVal;
            if (differenceVal === 0) {
                continue;
            }
            else {
                break;
            }
        }
        return differenceVal > 0 ? -1 : 1;
    });
    return arr;
}

const sortedHandArr = [new Map(), new Map(), new Map(), new Map(), new Map(), new Map(), new Map()]

for (let i = 0; i < arrIp.length; i++) {
    const handCounterMap = new Map();
    let jokerCount = 0;
    for (let j = 0; j < arrIp[i][0].length; j++) {
        arrIp[i][0][j] === "J" ? jokerCount++ : handCounterMap.set(arrIp[i][0][j], (!handCounterMap.get(arrIp[i][0][j]) ? 1 : handCounterMap.get(arrIp[i][0][j]) + 1));
    }

    let strongestKey = null;
    let maxValue = -Infinity;
    for (let [k, v] of handCounterMap) {
        if (v > maxValue) {
            maxValue = v;
            strongestKey = k;
        }
    }

    handCounterMap.set(strongestKey, handCounterMap.get(strongestKey) + jokerCount)
    if (handCounterMap.size === 1) {
        sortedHandArr[0].set(arrIp[i][0], parseInt(arrIp[i][1]));
    }
    else if (handCounterMap.size === 2) {
        for (let [k, v] of handCounterMap) {
            if (v === 4 || v === 1) {
                sortedHandArr[1].set(arrIp[i][0], parseInt(arrIp[i][1]));
                break;
            }
            else {
                sortedHandArr[2].set(arrIp[i][0], parseInt(arrIp[i][1]));
                break;
            }
        }
    }
    else if (handCounterMap.size === 3) {
        let entriesWithOneVal = 0;
        for (let [k, v] of handCounterMap) {
            if (v === 1) {
                entriesWithOneVal++;
            }
        }
        entriesWithOneVal === 2 ? sortedHandArr[3].set(arrIp[i][0], parseInt(arrIp[i][1])) : sortedHandArr[4].set(arrIp[i][0], parseInt(arrIp[i][1]));
    }
    else if (handCounterMap.size === 4) {
        sortedHandArr[5].set(arrIp[i][0], parseInt(arrIp[i][1]));
    }
    else {
        sortedHandArr[6].set(arrIp[i][0], parseInt(arrIp[i][1]));
    }
}

let lowestRankOfPreceding = arrIp.length;
let result = 0;

for (let i = 0; i < sortedHandArr.length; i++) {
    let mapAsTwoDSortedArray = [];
    for (let [k, v] of sortedHandArr[i]) {
        mapAsTwoDSortedArray.push([k, v]);
    }

    mapAsTwoDSortedArray = sortCards(mapAsTwoDSortedArray);
    mapAsTwoDSortedArray.forEach((ele, idx) => result += (ele[1] * (lowestRankOfPreceding - idx)));
    lowestRankOfPreceding = lowestRankOfPreceding - mapAsTwoDSortedArray.length;
}

console.log(result);