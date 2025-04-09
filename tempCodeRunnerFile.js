function calculator() {
    let current = 0;
    return {
      

        subtract(number1){
            current -= number1;
        },


        add(number1) {
            current += number1;
        },
     
        getSum(){
            return current
        },
    };
}

let buttonsContainer = document.querySelector(".buttons");
let displayScreen = document.querySelector(".display");
let displayMiniScreen = document.querySelector(".displayMini");
let clearButton = document.querySelector(".clear");


// // display numbers
function displayContent(number) {

    displayScreen.textContent = number;

}

function miniScreen(number2, operation) {


    displayMiniScreen.textContent =  `${number2} ${operation}`;

}



let calculate = calculator(); 
let number1 = "";
let number2 = "";
let operation = "";
let newNumber;

buttonsContainer.addEventListener("click", function(e){
        
        const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
        const operation = ["+", "-", "*","÷"];
        let keyPressed = e.target.textContent;

        // if(num.includes(keyPressed) && (operatorHolder)){
        //     number1 = "";
        //     operatorHolder = "";
        // }

        // console.log("this is keyPressed:", keyPressed);
        // console.log("this is number1:", number1);

        // digital accumulation 
        if ((number1.includes(".") && keyPressed === ".")){
            number1  += "";
        }else if(num.includes(keyPressed)){
         
            number1  += keyPressed;
            number2 = number1;
            newNumber = true;
            displayContent(number1);

        }else if (number1 && operation.includes(keyPressed) && newNumber){
            switch(keyPressed){
                case "+":

                    calculate.add(Number(number1));
                  
                    break;

                case "-":




               
               
            } 
            // display previous number & operator 
            displayContent(calculate.getSum());
            miniScreen(calculate.getSum(), keyPressed);
            
            // a mechanic to prevent passing the if-statement logic
            // by spamming operators 
            // before this, if i had a number as number1, and i spam operator
            // it will keep operating that number
            newNumber = false;
            // reset number1
            number1 = "";
 
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


