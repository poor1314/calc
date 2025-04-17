let firstOperand = "";
let secondOperand = "";
let currentInputBuffer = "";
let selectedOperator = "";

let calculatorButtons = document.querySelector(".buttons");
let primaryDisplay = document.querySelector(".display");
let historyDisplay = document.querySelector(".displayMini");

calculatorButtons.addEventListener("click", function(e){
    let buttonValue = e.target.textContent;
    const numberList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operatorList = ["+", "-", "x", "÷", "="];

    if(numberList.includes(buttonValue)) updatePrimaryDisplay(buttonValue);
    if(buttonValue === "=")secondOperand = currentInputBuffer;
    
    console.log("current buttonValue", buttonValue);
    console.log("firstOperand", firstOperand);
    console.log("secondOperand", secondOperand);
    console.log("selectedOperator", selectedOperator);
    console.log("currentInputBuffer", currentInputBuffer);
    console.log("");   
    
    if(buttonValue === "CLEAR") resetCalculator();
    else if(buttonValue === "DELETE") updatePrimaryDisplay(deleteLastInput());
    // else if(buttonValue === "=") secondOperand = currentInputBuffer;
    else if(firstOperand && selectedOperator && secondOperand && buttonValue === "="){
        secondOperand = currentInputBuffer;
        firstOperand = performOperation(Number(firstOperand), selectedOperator, Number(secondOperand)); 
        resetOperatorAndBuffer(); 
        updateHistoryPanel(buttonValue, firstOperand);
        updatePrimaryDisplay("");
    }
    else if(numberList.includes(buttonValue))updatePrimaryDisplay(appendToActiveOperand(buttonValue));
    else if(operatorList.includes(buttonValue)){
        selectedOperator = buttonValue;
        updateHistoryPanel(selectedOperator, firstOperand);
        updatePrimaryDisplay(currentInputBuffer);
    }
});

function appendToActiveOperand(buttonValue){
    if(!(selectedOperator)){
        if(buttonValue === "."){
            firstOperand = ensureSingleDecimal(firstOperand);
        }else firstOperand += buttonValue;
        return firstOperand;

    }else{
        if(buttonValue === "."){
            currentInputBuffer = ensureSingleDecimal(currentInputBuffer);
        }else currentInputBuffer += buttonValue;
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

function deleteLastInput(){
    if(!currentInputBuffer){
        firstOperand = firstOperand.slice(0, -1);
        return firstOperand;
    }else {
        currentInputBuffer = currentInputBuffer.slice(0, -1);
        return currentInputBuffer;
    }
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
