import { str } from "./input.mjs";

const arrIp = str.split("\n");

const lookupMap = new Map([
    ["o", [["ne",1]]],
    ["t", [["wo",2],["hree", 3]]],
    ["f", [["our", 4],["ive", 5]]],
    ["s", [["ix", 6], ["even",7]]],
    ["e", [["ight", 8]]],
    ["n", [["ine", 9]]]
])
let total = 0;

for(let i=0; i<arrIp.length; i++){
    let start = 0;
    let end = 0;
    let startVal=null, endVal=null;
    while(end<arrIp[i].length){
        if(!startVal){
           if(/[0-9]/.test(arrIp[i][start])){
            startVal=parseInt(arrIp[i][start])*10;
            endVal = startVal/10;
            end=start+1;
            continue;
           }
           else if(lookupMap.has(arrIp[i][start])){
            let mapVal = lookupMap.get(arrIp[i][start]);
            for(let j = 0; j<mapVal.length; j++){

                if(arrIp[i].substring(start+1, start+1+mapVal[j][0].length)===mapVal[j][0]){
                    startVal = mapVal[j][1]*10;
                    endVal = startVal/10;
                    end=start+1;
                    break;
                }
            }
        }
        start++;
    }
        else{
            if(/[0-9]/.test(arrIp[i][end])){
                endVal=parseInt(arrIp[i][end]);
               }
               else if(lookupMap.has(arrIp[i][end])){
                let mapVal = lookupMap.get(arrIp[i][end]);
                for(let j = 0; j<mapVal.length; j++){
                    if(arrIp[i].substring(end+1, end+1+mapVal[j][0].length)===mapVal[j][0]){
                        endVal = mapVal[j][1];
                        break;
                    }
                }
               }
                end++;
        }
    }
    total+=startVal+endVal
}
console.log(total);