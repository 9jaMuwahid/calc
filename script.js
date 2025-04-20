let currentNumber = ""; // Store the current number being typed
let previousNumber = ""; // Store the previous number
let currentOperator = ""; // Store the current operator
const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const equalsButton = document.querySelector(".equals");

// event listener for digits
digits.forEach(button => {
    button.addEventListener('click', () => {
        appendDigit(digit);
    });
});

// This is for the numbers
function appendDigit(digit) {
        currentNumber += digit;
        updateDisplay();
    }
    



// This is for the operator selection
function appendOperator(operator) {
        if (currentNumber === "") return; // checks for number
    
        if (previousNumber !== "" && currentOperator !== "") {
            currentNumber = operate(currentOperator, parseFloat(previousNumber), parseFloat(currentNumber)).toString();
        }
    
        // Stores the current number in previousNumber
        previousNumber = currentNumber;
    
        // Sets the current operator
        currentOperator = operator;
    
        // Clears the current number for the next Num
        currentNumber = "";
    
        // Update the display to show the operator with previous number
        updateDisplay();
    }

    function appendDecimal() {
        if (!currentNumber.includes(".")) { // Only allows one decimal point
            currentNumber += ".";
            updateDisplay();
        }
    }

// equals function
equalsButton.addEventListener('click', () => {
    if (previousNumber === "" || currentNumber === "") return; // checks if there are numbers
    const result = operate(currentOperator, parseFloat(previousNumber), parseFloat(currentNumber));
    currentNumber = result.toString();
    // Clears the previous num and operator and updates the display
    previousNumber = ""; 
    currentOperator = ""; 
    updateDisplay();
});

// Update the display based on current operator and numbers
function updateDisplay() {
    if (currentOperator) {
        // Show the previous number, operator, and current number in the display
        display.textContent = previousNumber + " " + currentOperator + " " + currentNumber;
    } else {
        // If no operator is selected, just show the current number input
        display.textContent = currentNumber || "0";
}}

// Operator functions
const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
};

// Function to perform the operation
function operate(operator, a, b) {
    const operation = operations[operator];
    if (operation) {
        let result = operation(a, b);
        // Round the result to 2 decimal places
        return roundResult(result);
    }
    return 'Invalid operator';
}

function roundResult(result) {
    return Math.round(result * 100) / 100;
}

// backspace function
function backspace() {
    currentNumber = currentNumber.slice(0, -1); // Remove the last number
    updateDisplay();
}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Error: Division by zero!");
        return null;
    }
    return a / b;
}

// Clear the display
function clearDisplay() {
    currentNumber = "";
    previousNumber = "";
    currentOperator = "";
    updateDisplay();
}

//Keyboard Access
// Listen for keyboard events to enable typing
document.addEventListener("keydown", function(event) {
    if (event.key >= "0" && event.key <= "9") {
        appendDigit(event.key); // For number keys (0-9)
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        appendOperator(event.key); // For operator keys (+, -, *, /)
    } else if (event.key === "Enter" || event.key === "=") {
        calculate(); // For equals key (Enter or =(ctrl + "+"))
    } else if (event.key === "Backspace") {
        backspace(); // For backspace key (Backspace or ←)
    } else if (event.key === ".") {
        appendDecimal(); // For decimal point key (.)
    }
});
