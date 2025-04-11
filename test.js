let arr = [10,"+", 7,"-",8,"*",2,"÷",4,"-"] // only works linearly
// which mean calculate whatever come first


let current = 0;
let operator;
for (let i = 0; i < arr.length; i++){
    console.log("index", i);
    
    if(i === 0){
        console.log("q");
        
        current += arr[i]
    }else if (arr[i+1] && arr[i] === "+"){
        console.log("w");
        current += arr[i+1]
    }else if (arr[i+1] && arr[i] === "-"){
        console.log("e");
        current -= arr[i+1]
    }else if (arr[i+1] && arr[i] === "*"){
        console.log("r");
        current *= arr[i+1]
   
    }else if (arr[i+1] && arr[i] === "÷"){
        console.log("t");
        current /= arr[i+1]
   
    }
    // console.log(current);
}

console.log(current);
