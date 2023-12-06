import { str } from "./input.mjs";

const allPartsSplit = str.split("\n\n");

let initialSeeds = allPartsSplit[0].slice(7).split(" ").map(seed => parseInt(seed));

const seedToLocationMap = new Map();
initialSeeds.forEach(ele => seedToLocationMap.set(ele, 0));

allPartsSplit.shift();
let arrIp = allPartsSplit.map(eleMapStr => {
    const eleMap = eleMapStr.split("\n");
    eleMap.shift();
    return eleMap;
});

arrIp = arrIp.map(ele => ele.map(eleStr => eleStr.split(" ").map(innerEle => parseInt(innerEle))));

for (let i = 0; i < initialSeeds.length; i++) {
    let eleToCheck = initialSeeds[i];
    for (let j = 0; j < arrIp.length; j++) {
        for (let k = 0; k < arrIp[j].length; k++) {
            if (eleToCheck >= arrIp[j][k][1] && eleToCheck <= arrIp[j][k][1] + arrIp[j][k][2] - 1) {
                eleToCheck = arrIp[j][k][0] + (eleToCheck - arrIp[j][k][1]);
                break;
            }
        }
    }
    seedToLocationMap.set(initialSeeds[i], eleToCheck);
}

let lowestLocation = seedToLocationMap.get(initialSeeds[0]);
for (let [key, value] of seedToLocationMap) {
    lowestLocation = seedToLocationMap.get(key) < lowestLocation ? seedToLocationMap.get(key) : lowestLocation;
}

console.log(lowestLocation);