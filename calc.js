let buttonsContainer = document.querySelector(".buttons");
let mainDisplay = document.querySelector(".display");
let historyDisplay = document.querySelector(".displayMini");
let clearButton = document.querySelector(".clear");

function calculator() {
    let currentTotal = 0;
    let subtractFlag = true; // 1st currentTotal will be input itself
    let multiplyFlag = true;  // 1st currentTotal * 1
    let divideFlag = true;
    return {
        add(currentInput) {
            currentTotal += currentInput;
            subtractFlag = false; 
            multiplyFlag = false;  
            divideFlag = false;
        },

        subtract(currentInput) {

            if(subtractFlag){
                currentTotal = currentInput;
            }else{
                currentTotal -= currentInput;
            }
            subtractFlag = false; 
            multiplyFlag = false;  
            divideFlag = false;

        },

        multiply(currentInput) {
           
            if(multiplyFlag){
                currentTotal = currentInput;
            }else{
                currentTotal *= currentInput;
            }
            subtractFlag = false; 
            multiplyFlag = false;  
            divideFlag = false;
          
        },

        divide(currentInput) {
             
            if(divideFlag){
                currentTotal = currentInput;
            }else{
                currentTotal /= currentInput;
            }
            subtractFlag = false; 
            multiplyFlag = false;  
            divideFlag = false;
        },

        getSum() {
            return currentTotal;
        },

        erase() {
            currentInput = "";
            previousInput = "";
            // selectedOperator = "";
            isNewInput = "";
            mainDisplay.textContent = "Cleared!";

            subtractFlag = true;
            multiplyFlag = true;
            divideFlag = true;
            // this needs to be number
            // else string + number = string 
            // 33 + 66 = 3366
            currentTotal = 0;
            
        },
    };
}

function displayContent(number) {
    mainDisplay.textContent = number;
}

function miniScreen(previousInput, selectedOperator) {
    historyDisplay.textContent = `${previousInput} ${selectedOperator}`;
}

// if the previous history & current input is the same number
// display the below
function miniScreenPlus(previousInput, selectedOperator, current){
    historyDisplay.textContent = `${previousInput} ${selectedOperator} ${current}`;
}

let calculatorObj = calculator();
let currentInput = "";
let previousInput = "";
// let selectedOperator = "";
let isNewInput;
let saveOperator = "";
let displayEqualSign;


buttonsContainer.addEventListener("click", function(e) {

    const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operatorKeys = ["+", "−", "×", "÷", "="];
    let keyPressed = e.target.textContent;

    console.log("keyPressed", keyPressed);

   

    if (keyPressed === "DELETE"){
        console.log("worked?");
        console.log(currentInput);
       
        displayContent( currentInput.slice(0, -1));
    }


    if ((currentInput.includes(".") && keyPressed === ".")) {
        currentInput += "";
     

    } else if (numberKeys.includes(keyPressed)) {

        currentInput += keyPressed;
        console.log(typeof currentInput);
        
        previousInput = currentInput;
        isNewInput = true;
        displayContent(currentInput);

    } else if (currentInput && operatorKeys.includes(keyPressed) && isNewInput) {
       console.log("currentInput",currentInput);
       console.log("previousInput",  previousInput);
    //    console.log("selectedOperator", selectedOperator);
       console.log("saveOperator", saveOperator);
       console.log("");
       
   
        switch (keyPressed) {
            case "+":
                calculatorObj.add(Number(currentInput));
                break;

            case "−":
                calculatorObj.subtract(Number(currentInput));
                break;

            case "×":
                calculatorObj.multiply(Number(currentInput));
                break;

            case "÷":
                calculatorObj.divide(Number(currentInput));
                break;
            
            case "=":
                if(saveOperator && calculatorObj.getSum()){
                    if(saveOperator === "+"){
                        calculatorObj.add(Number(currentInput));
                    }else if (saveOperator === "−"){
                        calculatorObj.subtract(Number(currentInput));
                    }else if (saveOperator === "×"){
                        calculatorObj.multiply(Number(currentInput));
                    }else if (saveOperator === "÷"){
                        calculatorObj.divide(Number(currentInput));
                    }
                    displayEqualSign = true;
                }
        }
        // result = calculatorObj.getSum() + Number(previousInput);
        // mainDisplay.textContent = result;
     
        // display previous number & operator 
        displayContent(calculatorObj.getSum());



        // a mechanic to prevent passing the if-statement logic
        // by spamming operators 
        // before this, if i had a number as number1, and i spam operator
        // it will keep operating that number
        isNewInput = false;
        currentInput = "";
    }
    if (operatorKeys.includes(keyPressed)){
        saveOperator = keyPressed;
    }
    // live time update on operator for mini-screen 
    if(displayEqualSign){
        miniScreen(saveOperator, calculatorObj.getSum());
        displayEqualSign = false;

        
    }if (calculatorObj.getSum() === Number(currentInput)){
        miniScreenPlus(calculatorObj.getSum(), saveOperator, currentInput);
    }else{
        miniScreen(calculatorObj.getSum(), saveOperator);
    }

    if (keyPressed === "CLEAR") {
        calculatorObj.erase();
        historyDisplay.textContent = "";
    }

    if(keyPressed === "="){
        miniScreen("=", calculatorObj.getSum())
    }

    

   
  
});

// fix some operations
// add delete function

// make miniScreen display 55 + 55 + 55 + 55 = ?
// the input will be added to the number
// also update the result