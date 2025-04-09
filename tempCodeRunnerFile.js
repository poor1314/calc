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
let lastClickedHolder = "";

buttonsContainer.addEventListener("click", function(e){
        const checkList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
        const operation = ["+", "-", "*","÷"];

        

        let keyPressed = e.target.textContent;
        console.log("this is keyPressed:", keyPressed);
        console.log("this is lastClicked:", lastClicked);
        
       
        if ((lastClicked.includes(".") && keyPressed === ".")){
            lastClicked  += "";
        }else if(checkList.includes(keyPressed)){
            
            lastClicked  += keyPressed;
            displayContent(lastClicked);

        }else if(operation.includes(keyPressed)){
            switch(keyPressed){
                case "+":
                    calculate.add(Number(lastClicked));
                    lastClickedHolder = keyPressed;
                    console.log("checking lastClickHolder", lastClickedHolder);
                    
            }

        }
        
        if(lastClickedHolder){
            switch(lastClickedHolder){
                case "+":
                    console.log("hello worked?");
                    calculate.add(Number(lastClicked));
                    lastClickedHolder = "";


                case "=":
                    displayContent(calculate.getSum());
                    lastClickedHolder = "";
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


// bug 1. if clicked on any layout outside of the pad,
// it will print the whole class ="button" out

// 