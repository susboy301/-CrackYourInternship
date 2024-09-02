let displayValue = '0';
let fullExpression = '';
let waitingForSecondOperand = false;
let operator = null;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = fullExpression || displayValue;
}

function clearDisplay() {
    displayValue = '0';
    fullExpression = '';
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number.toString() : displayValue + number.toString();
    }
    fullExpression += number.toString();
    updateDisplay();
}

function appendDot() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        fullExpression += '.';
        updateDisplay();
    }
}

function toggleSign() {
    if (displayValue !== '0') {
        if (displayValue.startsWith('-')) {
            displayValue = displayValue.substring(1);
            fullExpression = fullExpression.substring(1);
        } else {
            displayValue = '-' + displayValue;
            fullExpression = '-' + fullExpression;
        }
        updateDisplay();
    }
}

function percent() {
    if (displayValue !== '0') {
        displayValue = (parseFloat(displayValue) / 100).toString();
        fullExpression = fullExpression.slice(0, -displayValue.length) + displayValue;
        updateDisplay();
    }
}

function appendOperator(nextOperator) {
    if (operator && waitingForSecondOperand) {
        fullExpression = fullExpression.slice(0, -1) + nextOperator;
        operator = nextOperator;
        updateDisplay();
        return;
    }

    if (!waitingForSecondOperand) {
        fullExpression += ` ${nextOperator} `;
    }

    if (operator) {
        calculate();
    }

    firstOperand = parseFloat(displayValue);
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

const performCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '−': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '×': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '÷': (firstOperand, secondOperand) => firstOperand / secondOperand,
};

function calculate() {
    if (operator && !waitingForSecondOperand) {
        const inputValue = parseFloat(displayValue);
        const result = performCalculation[operator](firstOperand, inputValue);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        fullExpression = displayValue;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

updateDisplay();
