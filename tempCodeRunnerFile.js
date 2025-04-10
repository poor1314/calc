let buttonsContainer = document.querySelector(".buttons");
let mainDisplay = document.querySelector(".display");
let historyDisplay = document.querySelector(".displayMini");
let clearButton = document.querySelector(".clear");

function calculator() {
    let currentTotal = 0;
    return {
        add(currentInput) {
            currentTotal += currentInput;
        },

        subtract(currentInput) {
            
        },

        multiply(currentInput) {
            currentTotal *= currentInput;
        },

        divide(currentInput) {
            currentTotal /= currentInput;
        },

        getSum() {
            return currentTotal;
        },

        erase() {
            currentInput = "";
            previousInput = "";
            selectedOperator = "";
            isNewInput = "";
            mainDisplay.textContent = "Cleared!";
            historyDisplay.textContent = "";

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
let previousInput = "";
let selectedOperator = "";
let isNewInput;

buttonsContainer.addEventListener("click", function(e) {

    const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operatorKeys = ["+", "−", "×", "÷", "="];
    let keyPressed = e.target.textContent;

    console.log(keyPressed);

    if (keyPressed === "CLEAR") {
        calculatorObj.erase();
    }

    // if(previousInput &&  )
    // miniScreen(calculatorObj.getSum(), keyPressed, currentInput, result);

    if ((currentInput.includes(".") && keyPressed === ".")) {
        currentInput += "";

    } else if (numberKeys.includes(keyPressed)) {

        currentInput += keyPressed;
        previousInput = currentInput;
        isNewInput = true;
        displayContent(currentInput);

    } else if (currentInput && operatorKeys.includes(keyPressed) && isNewInput) {
        console.log("made it passed last", keyPressed);

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
        }

        result = calculatorObj.getSum() + Number(previousInput);
        mainDisplay.textContent = result;
     
        // display previous number & operator 
        displayContent(calculatorObj.getSum());
        miniScreen(calculatorObj.getSum(), keyPressed);

        

        // a mechanic to prevent passing the if-statement logic
        // by spamming operators 
        // before this, if i had a number as number1, and i spam operator
        // it will keep operating that number
        isNewInput = false;
        currentInput = "";
    }
});

// fix some operations
// add delete function

// make miniScreen display 55 + 55 + 55 + 55 = ?
// the input will be added to the number
// also update the result
