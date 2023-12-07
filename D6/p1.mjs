import { str } from "./input.mjs";

let arrIp = str.split("\n");
arrIp = arrIp.map(ele => ele.split(/:\s*/))
arrIp = arrIp.map(ele => ele.slice(-1 * (ele.length - 1)))
arrIp = arrIp.map(ele => ele.map(innerEle => innerEle.split(/\s\s*/)))
arrIp = arrIp[0][0].map((ele, idx) => [ele, arrIp[1][0][idx]])

const waysWithBinSearch = (totalTime, recordDistance) => {
    let start = 0, end = totalTime;
    while (start < end) {
        const mid = parseInt(start + (end - start) / 2);
        if (mid * (totalTime - mid) >= recordDistance) {
            end = mid;
        }
        else {
            start = mid + 1;
        }
    }
    return totalTime % 2 === 0 ? ((totalTime / 2) - start) * 2 + 1 : (((totalTime / 2) + 0.5) - start) * 2;
}

let result = 1;

arrIp.forEach(ele => result *= waysWithBinSearch(ele[0], ele[1]));

console.log(result);