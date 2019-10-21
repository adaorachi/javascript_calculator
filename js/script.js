class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand;
        this.clear()
    }

    clear() {
        this.currentOperator = '';
        this.previousOperator = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperator = this.currentOperator.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperator.includes('.')) return
        this.currentOperator = this.currentOperator.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperator === '') return
        if (this.previousOperator !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperator = this.currentOperator;
        this.currentOperator = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperator);
        const current = parseFloat(this.currentOperator);
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperator = computation;
        this.operation = undefined;
        this.previousOperator = '';

    }

    getDisplayNumber(number) {

    }

    updateDisplay() {
        this.currentOperand.innerText = this.getDisplayNumber(this.currentOperator)
        if (this.operation != null) {
            this.previousOperand.innerText = `${this.getDisplayNumber(this.previousOperator)} ${this.operation}`
        }

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
