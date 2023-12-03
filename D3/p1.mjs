import { str } from "./input.mjs";

const rows = str.split("\n");
const arrIp = rows.map(row=>row.split(""));
const rowLen = arrIp.length;
const colLen = arrIp[0].length;

const isDigitOrPeriod = (c) => /[0-9.]/.test(c);

const isDigit = (c) => /[0-9]/.test(c);

const dfs = (idx) => {
    const helperIdxList = [[0,1], [0,-1], [-1,0], [1,0], [-1,-1], [-1,1], [1,-1], [1,1]];
    for(let i=0; i<helperIdxList.length; i++){
        const rowVal = idx[0]+helperIdxList[i][0];
        const colVal = idx[1] + helperIdxList[i][1];
        if(rowVal<0 || rowVal===arrIp.length || colVal<0 || colVal===arrIp[0].length || isDigitOrPeriod(arrIp[rowVal][colVal])){
            continue;
        }
        return true;
    }
    return false;
}

const solution = () => {
    let partsSum = 0;
    let encounteredSpecial = false;
    for(let i = 0; i<rowLen; i++){
        let currSum = 0;
        for(let j = 0; j<colLen; j++){
            if(!isDigit(arrIp[i][j])){
                if(encounteredSpecial){
                partsSum+=currSum;
                encounteredSpecial = false;
            }
                currSum = 0;
            }
            else{
                currSum = currSum*10+parseInt(arrIp[i][j]);
                encounteredSpecial = encounteredSpecial || dfs([i,j]);
            }

        }
        if(encounteredSpecial){
        partsSum+=currSum;
    }
        currSum = 0;
        encounteredSpecial=false;
    }

    return partsSum;
}

console.log(solution());