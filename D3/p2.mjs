import { str } from "./input.mjs";

const rows = str.split("\n");
const arrIp = rows.map(row=>row.split(""));
const rowLen = arrIp.length;
const colLen = arrIp[0].length;

const starIdxMap = new Map();

const isDigit = (c) => /[0-9]/.test(c);

const dfs = (idx) => {
    const adjStarIdxList = [];
    const helperIdxList = [[0,1], [0,-1], [-1,0], [1,0], [-1,-1], [-1,1], [1,-1], [1,1]];
    for(let i=0; i<helperIdxList.length; i++){
        const rowVal = idx[0]+helperIdxList[i][0];
        const colVal = idx[1] + helperIdxList[i][1];
        if(rowVal<0 || rowVal===arrIp.length || colVal<0 || colVal===arrIp[0].length || arrIp[rowVal][colVal]!=="*" ){
            continue;
        }
        adjStarIdxList.push(`${rowVal},${colVal}`);
    }
    return adjStarIdxList;
}

const solution = () => {
    let total = 0;
    for(let i = 0; i<rowLen; i++){
        let currSum = 0;
        let starsAdjToNumber = new Set();
        for(let j = 0; j<colLen; j++){
            if(!isDigit(arrIp[i][j])){
                if(starsAdjToNumber.size>0){
                starsAdjToNumber.forEach(ele=>{
                    if(starIdxMap.has(ele)){
                        const existingVals = starIdxMap.get(ele);
                        existingVals.push(currSum);
                        starIdxMap.set(ele,existingVals); 
                    }
                    else{
                    starIdxMap.set(ele,[currSum])
                }});                
            }
            currSum = 0;
            starsAdjToNumber = new Set();
            }
            else{
                currSum = currSum*10+parseInt(arrIp[i][j]);
                dfs([i,j]).forEach(ele=>starsAdjToNumber.add(ele));
            }
        }
        if(starsAdjToNumber.size>0){
            starsAdjToNumber.forEach(ele=>{
                if(starIdxMap.has(ele)){
                    const existingVals = starIdxMap.get(ele);
                    existingVals.push(currSum);
                    starIdxMap.set(ele,existingVals); 
                }
                else{
                starIdxMap.set(ele,[currSum])
            }});               
        }
        currSum = 0;
        starsAdjToNumber = new Set();
    }

    for(let [key, val] of starIdxMap){
        if(val.length === 2){
            total+=val[0]*val[1];
        }
    }
    return total;
}

console.log(solution());