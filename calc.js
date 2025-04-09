function calculator() {
    let current = 0;
    return {
      

        subtract(input){
            current -= input;
        },


        add(input) {
            current += input;
        },
     
        getSum(){
            return current
        },
    };
}

let buttonsContainer = document.querySelector(".buttons");
let displayScreen = document.querySelector(".display");
let clearButton = document.querySelector(".clear");


// // display numbers
function displayContent(numbers) {

        displayScreen.textContent = numbers;

}

let calculate = calculator(); 
let lastClicked = "";
let operatorHolder = "";
let operatorHolder2 = "";
let total = 0;

buttonsContainer.addEventListener("click", function(e){
        
        const checkList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
        const operation = ["+", "-", "*","÷"];
        let keyPressed = e.target.textContent;

        if(checkList.includes(keyPressed) && (operatorHolder)){
            lastClicked = "";
            operatorHolder = "";
        }

        // console.log("this is keyPressed:", keyPressed);
        // console.log("this is lastClicked:", lastClicked);

        // digital accumulation 
        if ((lastClicked.includes(".") && keyPressed === ".")){
            lastClicked  += "";
        }else if(checkList.includes(keyPressed)){
            console.log("bug here");
            
            lastClicked  += keyPressed;
            displayContent(lastClicked);
            
        }


        if(lastClicked &&  operation.includes(keyPressed)){
            displayContent("123");
            switch(keyPressed){
                case "+":
                    console.log("worked!");
               
                    // console.log(typeof Number(lastClicked));
                    displayContent(0);
                    total += Number(lastClicked);
                    console.log("this is total:", total);
                    operatorHolder = keyPressed;
                    operatorHolder2 = operatorHolder;
                    displayContent(total);
            }

        }

       
        
      


       
      
}); 

function appendingDigits(current, e){
    return current.concat(e);
}


// When done, reset display to 0
// also reset current
function reset(){
    displayScreen.textContent = 0;
}


