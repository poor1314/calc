function calculator() {
    let current = 0;
    return {
        add(number1) {
            current += number1;
        },
      
        subtract(number1){
            current -= number1;
        },

        multiply(number1){
            current *= number1;
        },

        divide(number1){
            current /= number1
        },

        // delete(number1){

        // },

        erase(){
            number1 = "";
            number2 = "";
            operation = "";
            newNumber = "";
            displayScreen.textContent = "Cleared!";
            displayMiniScreen.textContent = "";
            current = 0;
            
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
        const operation = ["+", "-", "x","÷", ];
        let keyPressed = e.target.textContent;

        console.log(keyPressed);
        
        // reset everything on display, and also all number value
        if (keyPressed === "CLEAR"){
            calculate.erase();
        } 


      
        // only allow 1 dot per number
        if ((number1.includes(".") && keyPressed === ".")){
            number1  += ""; 

        // digital accumulation 
        }else if(num.includes(keyPressed)){
         
            number1  += keyPressed;
            number2 = number1;
            newNumber = true;
            displayContent(number1);

        }else if (number1 && operation.includes(keyPressed) && newNumber){
            console.log("made it passed last", keyPressed);
            
            switch(keyPressed){
                case "+":
                    console.log("hhh");
                    calculate.add(Number(number1));
                    break;

                case "-":
                    console.log("worked?");
                    
                    calculate.subtract(Number(number1));
                    break;
                
                case "x":
                    calculate.multiply(Number(number1));
                    break;
                
                case "÷":
                    calculate.divide(Number(number1));
                    break;

                case "delete":
                    console.log("check if delete works");
                    
                    calculate.divide(Number(number1));
                    break;

               

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



