let currentNumber = "";

const display = document.querySelector(".display");

function updateDisplay(){
    document.display.innerText = appendDigit;
}


function appendDigit(digit){
currentNumber += digit;
updateDisplay();
}

function operate(num1, operator, num2){

}