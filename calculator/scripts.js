// Get elements from the DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Initialize variables
let currentInput = '';
let firstOperand = null;
let operator = null;

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

// Function to handle button clicks
function handleButtonClick(event) {
    const clickedButton = event.target;
    const buttonValue = clickedButton.textContent;

    if (/\d/.test(buttonValue) || buttonValue === '.') {
        // If the clicked button is a number or decimal point
        currentInput += buttonValue;
        updateDisplay(currentInput);
    } else if (buttonValue === 'C') {
        // Clear button
        clearCalculator();
    } else if (buttonValue === '=') {
        // Calculate button
        performCalculation();
    } else {
        // Operator buttons (+, -, *, /)
        if (currentInput !== '') {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentInput = '';
                operator = buttonValue;
            } else {
                performCalculation();
                operator = buttonValue;
            }
        }
    }
}

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    updateDisplay('0');
}

// Function to perform the calculation
function performCalculation() {
    if (operator && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
            case '+':
                currentInput = (firstOperand + secondOperand).toString();
                break;
            case '-':
                currentInput = (firstOperand - secondOperand).toString();
                break;
            case '*':
                currentInput = (firstOperand * secondOperand).toString();
                break;
            case '/':
                if (secondOperand === 0) {
                    currentInput = 'Error';
                } else {
                    currentInput = (firstOperand / secondOperand).toString();
                }
                break;
        }
        firstOperand = parseFloat(currentInput);
        operator = null;
        updateDisplay(currentInput);
    }
}
