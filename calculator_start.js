/** TODO:
* 1. Add these new functions: percentage, inverse, factorial, square and square root
* 2. Bootstrap it to make it pretty!
* 3. User can only type numbers in the display (30 max!), and the numbers are right aligned.
* 4. Fix divide by 0 errors!
* 5. Add the ability to clear the current input, but not memory.
* 6. Challenge: Add trig functions (in radian AND degree mode)
* 7. Extra Challenge: Add mc, m+, m-, mr butons that work!
* 8. Super Challenge: Add ( and ) buttons that work!
* 9. Super Duper Challenge: Add exponents (negatives too!)
*/

var currentInput = "0";
var memory = "0";
var operator = 0;
var mode = "RADIAN";
var storedNumber = "0";

// Helper function for displaying the current input
/**
 * Puts any value onto the screen
 */
function displayCurrentInput() {
    document.getElementById('screen').value = currentInput;
}

// Adds a digit to the current input
/**
 * Adds a digit to the current input
 * @param {string} dig id of element to contain the new digit.
 */
function addDigit(dig) {
    if ((eval(currentInput) == 0) && (currentInput.indexOf(".") == -1)) {
        currentInput = dig;
    } else if (currentInput.length <= 17) {
        currentInput = currentInput + dig;
    }
    displayCurrentInput();
}

/**
 * Adds decimal to current input
 */
function addDecimal() {
    if (currentInput.length == 0) {
        //no leading ".", use "0."
        currentInput = "0.";
    } else {
        // First make sure one doesn't exist
        if (currentInput.indexOf(".") == -1) {
            currentInput = currentInput + ".";
        }
    }
    displayCurrentInput();
}

// Clears everything.
/**
 * Used to clear all data that was inputed
 */
function allClear() {
    currentInput = "0";
    operator = 0;                //clear operator
    memory = "0";                  //clear memory
    displayCurrentInput();
}

/**
 * Stores the last operator pushed for multiply, divide, add, subtract, exponent, or root.
 * @param {string} op id of element to conatin an operator
 */
function storeOperator(op) {
    if (op.indexOf("*") > -1) { operator = 1; };       // codes for *
    if (op.indexOf("/") > -1) { operator = 2; };       // slash (divide)
    if (op.indexOf("+") > -1) { operator = 3; };       // sum
    if (op.indexOf("-") > -1) { operator = 4; };       // difference
    if (op.indexOf("^") > -1) { operator = 5; };       // exponent
    if (op.indexOf("√") > -1) { operator = 6; };       // root

    memory = currentInput;                 //store value
    currentInput = "0";
    displayCurrentInput();
}

/**
 * Calculate using operator, the memory and what is current
 */
function calculate() {
    if (operator == 1) { currentInput = eval(memory) * eval(currentInput); };
    if (operator == 3) { currentInput = eval(memory) + eval(currentInput); };
    if (operator == 4) { currentInput = eval(memory) - eval(currentInput); };
    if (operator == 5) { currentInput = Math.pow(eval(memory),currentInput); };
    if (operator == 6) {
        if(Math.pow(eval(memory),1/currentInput) < 0) {
            currentInput = 105;
        }
        else {
            currentInput = Math.pow(eval(memory),1/currentInput);
        }
    };
    if (operator == 2) {
        if( eval(currentInput) == 0){
            currentInput = "DIVIDE BY ZERO ERROR";
        }
        else{
            currentInput = eval(memory) / eval(currentInput);
        }
    };

    operator = 0;                //clear operator
    memory    = "0";              //clear memory
    displayCurrentInput();
}

/**
 * Change the sign of the current input
 */
function changeSign() {
    currentInput = currentInput * -1;
    displayCurrentInput();
}

/**
 * Clear the current input back to 0
 */
function justClear() {
    currentInput = "0";
    displayCurrentInput();
}

/**
 * Change the current input to a percentage
 */
function percentage() {
    currentInput = currentInput / 100;
    displayCurrentInput();
}

/**
 * Calculate the factorial of the current input
 */
function factorial() {
    var i;
    var f = currentInput;
    for(i = 1; i < f; i++){
        currentInput = currentInput * i;
    }
    displayCurrentInput();
}

/**
 * Calculate the square of the current input
 */
function square() {
    currentInput = currentInput * currentInput
    displayCurrentInput();
}

/**
 * Calculate the square root of the current input
 */
function squareRoot() {
    if(currentInput < 0) {
        currentInput = currentInput * -1;
        currentInput = Math.sqrt(currentInput)
        currentInput = Math.sqrt(currentInput) + "i";
    }
    else {
        currentInput = Math.sqrt(currentInput)
    }
    displayCurrentInput();
}

/**
 * Calculate the inverse of the current input
 */
function inverse() {
    currentInput = 1 / currentInput;
    displayCurrentInput();
}
/**
 * Calculate the trig functions of the current input
 * @param {string} sign id of element to contain trig functions
 */

function trig(sign) {
    if(mode == "DEGREE"){
        currentInput = currentInput * (Math.PI/180)
    }
    if(sign == "sin"){
        currentInput = Math.sin(currentInput);
    }
    else if(sign == "cos"){
        currentInput = Math.cos(currentInput);
    }
    else if(sign == "tan"){
        currentInput = Math.tan(currentInput);
    }
    displayCurrentInput();
}

/**
 * Set Calculator Mode
 */
function rad() {
    if(mode == "RADIAN"){
        mode = "DEGREE";
        currentInput = "NOW IN DEGREE MODE ";
    }
    else if(mode == "DEGREE"){
        mode = "RADIAN";
        currentInput = "NOW IN RADIAN MODE ";
    }
    displayCurrentInput();
}

//Add Pi to Calculator
function pi() {
    currentInput = Math.PI;
    displayCurrentInput();
}

/**
 * Play John Cena Theme
 */
function johnCena() {
    var audio = new Audio('Cena.mp3');
    audio.play();
    currentInput = "WWE - SUPERSLAM   ";
    displayCurrentInput();
}

/**
 * Calculate using log
 */
function log(){
    currentInput = Math.log(currentInput);
    displayCurrentInput();
}

/**
 * Calculates the Cube
 */
function cube() {
currentInput = currentInput * currentInput * currentInput;
displayCurrentInput();
}

/**
 * Calculates the Cube Root
 */
function cubeRoot() {
currentInput = Math.cbrt(currentInput);
displayCurrentInput();
}

/**
 * Chooses a CSS Class
 * @param {string} id
 * @param {string} className
 */
function changeElementCLass(id, className){
    var el = document.getElementById(id);
    el.className = className;
}

/**
 * Memory Functions
 * @param {object} input The input is stored
 */
function store(input) {
    if(input == "m+"){
        storedNumber = currentInput;
    }
    if(input == "m-"){
        storedNumber = currentInput * -1;
    }
    if(input == "mr"){
        currentInput = storedNumber;
    }
    if(input == "mc"){
     storedNumber = 0;
    }
    displayCurrentInput();
}
