function calculator() {
    let current = 0;

    return {
        add(input) {
           current += input;
        },

        subtract(input){
            current -= input;
        },

        multiply(input){
            current *= input;
        },

        divide(input){
            current /= input;
        },

        reset() {
            current = 0;
        },

        getValue(){
            return current
        },
    };
}

// const doMath= calculator();
// doMath.add(5.3);
// doMath.add(2);
// console.log(doMath.getValue());
// // doMath.reset();
// // console.log(doMath.getValue());

// doMath.divide(5);
// console.log(doMath.getValue());




let element = document.querySelector(".buttons");
let display = document.querySelector(".display");
let clear = document.querySelector(".clear");

// display content on calc console except clear and delete
function displayContent(e) {
    let target = e.target;
    const isButton = target.tagName === "BUTTON";
    const isClearOrDelete = target.className === "clear" || target.className === "delete";
    

    // Check if it's a button and not a clear/delete button
    if (isButton && !isClearOrDelete) {
        display.textContent = target.textContent;
    }
}


element.addEventListener("click", function(e){

        let target = e.target.textContent;
        displayContent(e)
        console.log(target);
        

        switch(target) {
            case 'CLEAR': // works
                calculator().reset();
                display.textContent = "";
                break;

            // case 'DELETE':
            //     console.log('');
            //     break;

            case '+':
                calculator().add(Number(target));
                break;
        
            // case '-':
            //     console.log('');
            //     break;

            // case '*':
            //     console.log('');
            //     break;

            // case '÷':
            //     console.log('÷');
            //     break;

            case '=': // why is getValue = 0?
                console.log(calculator().getValue());
                
                display.textContent = calculator().getValue();
                break;
        }
});





