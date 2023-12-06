import { str } from "./input.mjs";

const sortIntervals = (intervalsList) => {
    return intervalsList.sort((a, b) => {
        if (a[0] > b[0]) {
            return 1;
        }
        else {
            return -1;
        }
    })
}

const allPartsSplit = str.split("\n\n");

let initialSeeds = allPartsSplit[0].slice(7).split(" ").map(seed => parseInt(seed));
initialSeeds = initialSeeds.map((ele, idx) => {
    if (idx % 2 === 0) {
        return [ele, ele + initialSeeds[idx + 1] - 1]
    }
    else {
        return null;
    }
})
initialSeeds = initialSeeds.filter(ele => ele !== null);

allPartsSplit.shift();

let arrIp = allPartsSplit.map(eleMapStr => {
    const eleMap = eleMapStr.split("\n");
    eleMap.shift();
    return eleMap;
});

arrIp = arrIp.map(ele => ele.map(eleStr => eleStr.split(" ").map(innerEle => parseInt(innerEle))));

arrIp = arrIp.map(ele => ele.map(innerEle => [...innerEle, innerEle[0] - innerEle[1]]));

arrIp = arrIp.map(ele => ele.map(innerEle => [innerEle[0], [innerEle[1], innerEle[1] + innerEle[2] - 1], innerEle[3]]))

let srcIntervalsToCheck = initialSeeds;

for (let i = 0; i < arrIp.length; i++) {
    let destinationIntervals = [];
    let extrasIntervals = [];
    for (let j = 0; j < srcIntervalsToCheck.length; j++) {
        let found = false;
        for (let k = 0; k < arrIp[i].length; k++) {
            const delta = arrIp[i][k][2];
            if (srcIntervalsToCheck[j][0] >= arrIp[i][k][1][0] && srcIntervalsToCheck[j][1] <= arrIp[i][k][1][1]) {
                destinationIntervals.filter(ele => ele[0] <= srcIntervalsToCheck[j][0] + delta && ele[1] >= srcIntervalsToCheck[j][1] + delta).length === 0 && destinationIntervals.push([srcIntervalsToCheck[j][0] + delta, srcIntervalsToCheck[j][1] + delta]);
                found = true;
            }
            else if (srcIntervalsToCheck[j][0] < arrIp[i][k][1][0] && srcIntervalsToCheck[j][1] <= arrIp[i][k][1][1] && srcIntervalsToCheck[j][1] >= arrIp[i][k][1][0]) {
                destinationIntervals.filter(ele => ele[0] <= arrIp[i][k][1][0] + delta && ele[1] >= srcIntervalsToCheck[j][1] + delta).length === 0 && destinationIntervals.push([arrIp[i][k][1][0] + delta, srcIntervalsToCheck[j][1] + delta]);
                srcIntervalsToCheck.push([srcIntervalsToCheck[j][0], arrIp[i][k][1][0] - 1]);
                found = true;

            }
            else if (srcIntervalsToCheck[j][0] < arrIp[i][k][1][0] && srcIntervalsToCheck[j][1] > arrIp[i][k][1][1]) {
                destinationIntervals.filter(ele => ele[0] <= arrIp[i][k][1][0] + delta && ele[1] >= arrIp[i][k][1][1] + delta).length === 0 && destinationIntervals.push([arrIp[i][k][1][0] + delta, arrIp[i][k][1][1] + delta]);
                srcIntervalsToCheck.push([srcIntervalsToCheck[j][0], arrIp[i][k][1][0] - 1]);
                srcIntervalsToCheck.push([arrIp[i][k][1][1] + 1, srcIntervalsToCheck[j][1]]);
                found = true;

            }
            else if (srcIntervalsToCheck[j][0] >= arrIp[i][k][1][0] && srcIntervalsToCheck[j][1] > arrIp[i][k][1][1] && srcIntervalsToCheck[j][0] <= arrIp[i][k][1][1]) {
                destinationIntervals.filter(ele => ele[0] <= srcIntervalsToCheck[j][0] + delta && ele[1] >= arrIp[i][k][1][1] + delta).length === 0 && destinationIntervals.push([srcIntervalsToCheck[j][0] + delta, arrIp[i][k][1][1] + delta]);
                srcIntervalsToCheck.push([arrIp[i][k][1][1] + 1, srcIntervalsToCheck[j][1]]);
                found = true;
            }
        }
        if (!found) {
            extrasIntervals.push(srcIntervalsToCheck[j]);
        }
    }
    srcIntervalsToCheck = [...destinationIntervals, ...extrasIntervals];
    srcIntervalsToCheck = srcIntervalsToCheck.filter(ele => ele.length !== 0);
}

console.log(sortIntervals(srcIntervalsToCheck)[0][0])
