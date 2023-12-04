import { str } from "./input.mjs";

let arrIp = str.split("\n");
arrIp = arrIp.map(ele=>ele.split(": "));
arrIp = arrIp.map(ele=>ele[1]);
arrIp = arrIp.map(ele=>ele.split(" | "));
arrIp = arrIp.map(ele=>ele.map(innerEle=>innerEle.split(/\s* \s*/)));


const cardMap = new Map(); 
arrIp.forEach((ele,idx)=>cardMap.set(idx, 1));

const solution = () => {
    let total = 0;
    for(let i=0; i<arrIp.length; i++){
        const winningSet = new Set();
        let currTotal = 0;
        for(let j = 0; j < arrIp[i][0].length; j++){
            winningSet.add(arrIp[i][0][j]);
        }
        for(let j=0; j< arrIp[i][1].length; j++){
            if(winningSet.has(arrIp[i][1][j])){
                currTotal++;
            }
        }
        for(let j = i+1; j <= i+currTotal; j++){
            cardMap.set(j, cardMap.get(j)+1*cardMap.get(i));
        }
    }
    for(let [key, value] of cardMap){
        total+=cardMap.get(key);
    }
    return total;
}

console.log(solution());