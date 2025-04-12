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
            // return Math.round(currentTotal);
            return currentTotal;
        },

        erase() {
            currentInput = "";
            saveOperator = "";
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


let calculatorObj = calculator();
let currentInput = "";
let historyInput = "";
let saveOperator = "";
let isNewInput;


buttonsContainer.addEventListener("click", function(e) {

    const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operatorKeys = ["+", "−", "×", "÷", "="];
    let keyPressed = e.target.textContent;

    // console.log("keyPressed", keyPressed);
    // console.log("currentInput",currentInput);
    // console.log("saveOperator", saveOperator);
    // console.log("calculatorObj.getSum()", calculatorObj.getSum());
    // console.log("");


    if ((currentInput.includes(".") && keyPressed === ".")) {
        currentInput += "";
     

    }else if(numberKeys.includes(keyPressed)) {

        currentInput += keyPressed;
        historyInput = currentInput;
        isNewInput = true;
        displayContent(currentInput);
        

    }else if(keyPressed === "DELETE"){
       
        if(currentInput){
            currentInput = currentInput.slice(0, -1);
            displayContent(currentInput);
        }
   
    }else if(currentInput && operatorKeys.includes(keyPressed) && isNewInput) {
   
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
                    
                }
        }
       
        // a mechanic to prevent passing the if-statement logic
        // by spamming operators 
        // before this, if i had a number as number1, and i spam operator
        // it will keep operating that number
        isNewInput = false;
        currentInput = "";
    }
    

    if(operatorKeys.includes(keyPressed)){
        saveOperator = keyPressed;
        displayContent("");
        miniScreen(calculatorObj.getSum(), saveOperator);
    }


    if(keyPressed === "="){
        // saveOperator = keyPressed;
        displayContent("");
        miniScreen("=", calculatorObj.getSum());
    }
    
    if (keyPressed === "CLEAR") {
        calculatorObj.erase();
        historyDisplay.textContent = "";
    }


});

// calc become buggy when dealing with 0