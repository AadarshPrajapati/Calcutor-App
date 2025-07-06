const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-buttons button');
let currentInput = '';
let operator = '';
let operand1 = null;
let operand2 = null;
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value >= '0' && value <= '9' || value === '.') {
            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            display.value = currentInput;
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '' && operand1 === null) return;
            if (operand1 === null) {
                operand1 = parseFloat(currentInput);
            } else if (!resultDisplayed) {
                operand2 = parseFloat(currentInput);
                operand1 = operate(operand1, operand2, operator);
                display.value = operand1;
            }
            operator = value;
            currentInput = '';
            resultDisplayed = false;
        } else if (value === '=') {
            if (operator && currentInput !== '') {
                operand2 = parseFloat(currentInput);
                const result = operate(operand1, operand2, operator);
                display.value = result;
                operand1 = result;
                currentInput = '';
                resultDisplayed = true;
            }
        } else if (value === 'C') {
            currentInput = '';
            operator = '';
            operand1 = null;
            operand2 = null;
            display.value = '';
            resultDisplayed = false;
        }
    });
});

function operate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}
