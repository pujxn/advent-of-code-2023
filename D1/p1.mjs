import { str } from "./input.mjs";

const arrIp = str.split("\n");

let total = 0;

for(let i=0; i<arrIp.length; i++){
    let start = 0;
    let end = arrIp[i].length-1;
    let startVal=null, endVal=null;
    while(end>=start){
        if(!startVal && /[0-9]/.test(arrIp[i][start])){
            startVal=parseInt(arrIp[i][start])*10;
        }
        if(!endVal && /[0-9]/.test(arrIp[i][end])){
            endVal=parseInt(arrIp[i][end]);
        }
        if(startVal && endVal){
            total+=startVal+endVal;
            break;
        }
        if(!startVal){
        start++;
    }
    if(!endVal){
        end--;
    }
}
}
console.log(total);