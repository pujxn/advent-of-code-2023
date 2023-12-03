import { str } from "./input.mjs";

const gamesArr = str.split("\n");   

let powerSum = 0;

for(let i = 0; i< gamesArr.length; i++){
    const gameMap = new Map([["red", 0], ["green", 0], ["blue", 0]])

    gamesArr[i] = gamesArr[i].slice(5);
    gamesArr[i] =  gamesArr[i].split(": ");
    gamesArr[i] = gamesArr[i][1].split("; ");
    for(let j = 0; j<gamesArr[i].length; j++){
        gamesArr[i][j] = gamesArr[i][j].split(", ");
        for(let k = 0; k < gamesArr[i][j].length; k++){
            const keyValToCheck = gamesArr[i][j][k].split(" ");
            if(keyValToCheck[0]>gameMap.get(keyValToCheck[1])){
                gameMap.set(keyValToCheck[1],parseInt(keyValToCheck[0]));
            }
        }
    }
    powerSum+=gameMap.get("red")*gameMap.get("green")*gameMap.get("blue")
}

console.log(powerSum);