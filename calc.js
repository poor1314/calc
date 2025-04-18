let firstOperand = "";
let secondOperand = "";
let inputValue = "";
let selectedOperator = "";
const NUMBER_BUTTONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const OPERATOR_BUTTONS = ["+", "-", "x", "÷", "=", "CLEAR", "DELETE"];


let calculatorButtons = document.querySelector(".buttons");
let primaryDisplay = document.querySelector(".display");
let historyDisplay = document.querySelector(".displayMini");

calculatorButtons.addEventListener("click", function(e){
    let buttonValue = e.target.textContent;
    const validButton = NUMBER_BUTTONS.includes(buttonValue) || OPERATOR_BUTTONS.includes(buttonValue);
    const isNumber = NUMBER_BUTTONS.includes(buttonValue)
    const isOperator = OPERATOR_BUTTONS.includes(buttonValue)
    const firstOperandExist = firstOperand || firstOperand === 0; 
    
    // exit early for invalid button
    if(!validButton) return;

    if(buttonValue === "CLEAR"){
        resetCalculator();
        return;
    }
    // reflect on display & update number after digit deletion 
    if(buttonValue === "DELETE"){
        const updatedValue = deleteLastInput();
        updatePrimaryDisplay(updatedValue);
        return;
    }
    // reflect on display & update appending to number 
    if(isNumber){
        const updatedValue = appendToActiveOperand(buttonValue);
        updatePrimaryDisplay(updatedValue);
        return;
    } 
   
    //assign firstOperand with inputValue when clicked on operator 
    if(!firstOperand  && isOperator){
        firstOperand = inputValue;
        inputValue = "";
        selectedOperator = buttonValue;
        updatePrimaryDisplay("");
        updateHistoryPanel(buttonValue, firstOperand);
    }
    
    // perform calculation when we have firstOperand, secondOperand, an operator, and "=" is pressed 
    else if(isReadyToCalculate() && buttonValue === "="){
        secondOperand = inputValue;
        firstOperand = performOperation(Number(firstOperand), selectedOperator, Number(secondOperand)); 
        resetOperatorAndBuffer(); 
        updatePrimaryDisplay("");
        updateHistoryPanel(buttonValue, firstOperand);
    
    // Operator override live on history panel
    }else if(firstOperandExist){
        selectedOperator = buttonValue;
        updateHistoryPanel(selectedOperator, firstOperand);
    }  

});

function isReadyToCalculate() {
    return firstOperand && inputValue && selectedOperator;
}

function appendToActiveOperand(buttonValue){
    if(buttonValue === ".") inputValue = ensureSingleDecimal(inputValue);
    else inputValue += buttonValue;
    return inputValue;
}

function deleteLastInput(){
    inputValue = inputValue.slice(0, -1);
    return inputValue;
    
}

function ensureSingleDecimal(number){
    if (!number.includes(".")) return number += ".";  
    return number;
}

function performOperation(firstOperand, selectedOperator, secondOperand){
    if(selectedOperator === "+") return firstOperand + secondOperand;
    else if (selectedOperator === "-") return firstOperand - secondOperand;
    else if (selectedOperator === "x") return firstOperand * secondOperand;
    else if (selectedOperator === "÷") return firstOperand / secondOperand;
}

function updatePrimaryDisplay(number){
    if(!inputValue) primaryDisplay.textContent = "";
    primaryDisplay.textContent = number;
}

function updateHistoryPanel(buttonValue, firstOperand){
    if (buttonValue === "=")  historyDisplay.textContent = `${buttonValue} ${firstOperand}`;
    else historyDisplay.textContent = `${firstOperand} ${buttonValue}`;
}

function resetCalculator(){
    firstOperand = "";
    secondOperand = "";
    inputValue = "";
    selectedOperator = "" ;
    updateHistoryPanel("", "");
    updatePrimaryDisplay("CLEARED!");
}

function resetOperatorAndBuffer(){
    inputValue = "";
    secondOperand = "";
}
