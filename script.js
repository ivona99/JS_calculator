class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, resultOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.resultOperandTextElement = resultOperandTextElement;
        this.clear();
    }
    //delete all the displayed values
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.result = '';
        this.resultOperandTextElement.innerText ='';  
        this.bracketSwitch = false;  
        this.expression = '';
        this.newOperation = undefined;
        
    }
    //deleting one by one number from end to start
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    //appending numbers converting to string for easy concating
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
      
    }
    negative(number) {
        number = '+/-';
        if(number === '+/-'){
            this.currentOperand =parseFloat(this.currentOperand) * -1;
        }
    }
    getBracket(number) {
        number = '()';

       if(number ==='()' && this.previousOperand.includes('(') && typeof this.operation !== undefined){
            this.currentOperand = this.currentOperand.toString() + ")";
        }
        else if(number === '()' && !this.bracketSwitch){
            this.currentOperand = "(";
        }
        this.bracketSwitch = !this.bracketSwitch;

    }

    //choose operation, if the operation isn't choosen just return 
    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '' && this.operation !=null && this.currentOperand.includes('(')) {
            this.expression = this.previousOperand;
            this.newOperation = this.operation;
        }else {
            this.expression = 0;
            this.newOperation = null;
        }

        if(this.previousOperand !== '') {
            this.compute();
        }
       this.operation = operation;
       this.previousOperand = this.currentOperand;
       this.currentOperand = ''; 
       this.result = '';

    }
    //convert numbers to float, if value is there calculate 
    compute() {
        let computation;
        if(this.previousOperand.toString().includes('(') && this.currentOperand.toString().includes(')')) {
            this.previousOperand = this.previousOperand.replace('(', '');
            this.currentOperand = this.currentOperand.replace(')', '');
        }

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        const result = parseFloat(this.result);
        const expresion = parseFloat(this.expression);
        //if no value is entered just return
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = (prev / 100) * current;
                break;
            default: 
            return
        }
      if(this.newOperation !== null) {
        switch(this.newOperation) {
            case '+':
                computation = expresion + computation;
                break;
            case '-':
                computation = expresion - computation;
                break;
            case '×':
                computation = expresion * computation;
                break;
            case '÷':
                computation = expresion / computation;
                break;
            default: 
            return
        }
    }
 
        this.currentOperand = computation;
        this.result = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.expression = 0;
        this.resultOperandTextElement.innerText = this.result;
 }

    // getDisplayNumber(number) {
    //     const floatNumber = parseFloat(number);
    //     if(isNaN(floatNumber)) return '';
    //     return floatNumber.toLocaleString('en');
    // }
    //for displaying on screen calculator
    updateDisplay() {
        // this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null) {
            // this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
            this.resultOperandTextElement.innerText = `${this.result }`
            if(this.expression !== '' && this.newOperation !=null) {
                this.previousOperandTextElement.innerText = `${this.expression} ${this.newOperation} ${this.previousOperand} ${this.operation}`
            }
        }
        else {
            this.previousOperandTextElement.innerText = '';
            // this.resultOperandTextElement.innerText = '';
     
            this.resultOperandTextElement.innerText = `${this.result }`

        }
    }
    

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const result = document.querySelector('.result');
const brackets = document.querySelector('[data-brackets]');
const negative = document.querySelector('[data-negative]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, result);
console.log("calculator", calculator);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        // calculator.compute();
    })
});

operationButtons.forEach(button =>  {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        calculator.compute();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

brackets.addEventListener('click', button => {
  
   calculator.getBracket(button);
   calculator.updateDisplay();
});

negative.addEventListener('click', button => {
    calculator.negative(button);
    calculator.updateDisplay();
});

//keyboard
document.addEventListener('keydown', function(event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g;
    if(event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if(event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if(event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    if(event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if(event.key === 'Backspace'){
        event.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }
    if(event.key === 'Delete') {
        event.preventDefault();
        calculator.clear();
        calculator.updateDisplay();
    }
});
