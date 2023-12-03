import { str } from "./input.mjs";

const gamesArr = str.split("\n");   

let idSum = 0;

const lookupMap = new Map([["red", 12], ["green", 13], ["blue", 14]])

for(let i = 0; i< gamesArr.length; i++){
    let gameValid = true;
    gamesArr[i] = gamesArr[i].slice(5);
    gamesArr[i] =  gamesArr[i].split(": "); 
    const gameId = parseInt(gamesArr[i][0]);
    gamesArr[i] = gamesArr[i][1].split("; "); 
    for(let j = 0; j<gamesArr[i].length; j++){
        gamesArr[i][j] = gamesArr[i][j].split(", ");
        for(let k = 0; k < gamesArr[i][j].length; k++){
            const keyValToCheck = gamesArr[i][j][k].split(" ");
            if(keyValToCheck[0]>lookupMap.get(keyValToCheck[1])){
                gameValid = false;
                break;
            }
        }
        if(!gameValid){
            break;
        }
    }
    if(gameValid){
        idSum+=gameId;
    }
}

console.log(idSum);