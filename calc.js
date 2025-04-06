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

