let firstOperand = "";
let secondOperand = "";
let currentInputBuffer = "";
let selectedOperator = "";

let calculatorButtons = document.querySelector(".buttons");
let primaryDisplay = document.querySelector(".display");
let historyDisplay = document.querySelector(".displayMini");

calculatorButtons.addEventListener("click", function(e){
    let buttonValue = e.target.textContent;
    const firstOperandExist = firstOperand || (firstOperand === 0); 
    const NUMBER_BUTTONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const OPERATOR_BUTTONS = ["+", "-", "x", "÷", "=", "CLEAR", "DELETE"];
    const validButton = NUMBER_BUTTONS.includes(buttonValue) || OPERATOR_BUTTONS.includes(buttonValue);

    if(buttonValue === "CLEAR"){
        resetCalculator();
        return;
    }
    // reflect on display & update number after digit deletion 
    if(buttonValue === "DELETE"){
        updatePrimaryDisplay(deleteLastInput()); 
        return;
    }
    // reflect on display & update appending to number 
    if(NUMBER_BUTTONS.includes(buttonValue)){
        updatePrimaryDisplay(appendToActiveOperand(buttonValue)); 
        return;
    } 
    // avoid nesting, so if isn't a valid button, exit early and don't execute the below
    if(!validButton)
        return;

    // perform calculation when we have firstOperand, secondOperand, an operator, and "=" is pressed 
    if(firstOperandExist && selectedOperator && buttonValue === "="){
        secondOperand = currentInputBuffer;
        firstOperand = performOperation(Number(firstOperand), selectedOperator, Number(secondOperand)); 
        resetOperatorAndBuffer(); 
        updateHistoryPanel(buttonValue, firstOperand);
        updatePrimaryDisplay("");
    
    // allow operator changes and reflect live on calc
    }else if(firstOperandExist){
        selectedOperator = buttonValue;
        updateHistoryPanel(selectedOperator, firstOperand);
        updatePrimaryDisplay(currentInputBuffer);
    }  
});

function appendToActiveOperand(buttonValue){
    if(!(selectedOperator)){
        if(buttonValue === ".") firstOperand = ensureSingleDecimal(firstOperand);
        else firstOperand += buttonValue;
        return firstOperand;

    }else{
        if(buttonValue === ".") currentInputBuffer = ensureSingleDecimal(currentInputBuffer);
        else currentInputBuffer += buttonValue;
        return currentInputBuffer;
    }
}

function deleteLastInput(){
    if(!currentInputBuffer){
        firstOperand = firstOperand.slice(0, -1);
        return firstOperand;
    }else {
        currentInputBuffer = currentInputBuffer.slice(0, -1);
        return currentInputBuffer;
    }
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
    if(!currentInputBuffer) primaryDisplay.textContent = "";
    primaryDisplay.textContent = number;
}

function updateHistoryPanel(buttonValue, firstOperand){
    if (buttonValue === "=")  historyDisplay.textContent = `${buttonValue} ${firstOperand}`;
    else historyDisplay.textContent = `${firstOperand} ${buttonValue}`;
}

function resetCalculator(){
    firstOperand = "";
    secondOperand = "";
    currentInputBuffer = "";
    selectedOperator = "" ;
    updateHistoryPanel("", "");
    updatePrimaryDisplay("CLEARED!");
}

function resetOperatorAndBuffer(){
    currentInputBuffer = "";
    secondOperand = "";
}
