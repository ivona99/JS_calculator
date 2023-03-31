class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    //delete all the displayed values
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    //appending numbers converting to string for easy concating
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute();
        }
       this.operation = operation;
       this.previousOperand = this.currentOperand;
       this.currentOperand = ''; 
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
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
            default: 
            return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandTextElement.innerText = '';
        }
        // this.currentOperandTextElement.innerText = this.currentOperand;
        // this.previousOperandTextElement = this.previousOperand;
    }
    

}



// const container = document.querySelector('.container');
// const calculator = document.querySelectorAll('.item');
// const display = document.querySelector('.total');
// const equal = document.querySelector('.back-green');

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
console.log("calculator", calculator);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>  {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

// calculator.forEach(function(btn){
//     btn.addEventListener('click', (e) => {
//         const key = e.target;
//         const keyContent = key.textContent;
//         const displayedNum = display.textContent;
        
//         if(displayedNum === '0') {
//             display.textContent = keyContent;
//         }else {
//             display.textContent = displayedNum + keyContent;
//         }
//     })
// });






// const calculate = (n1, operator, n2) => {
//     let result = ''
    
//     if (operator === 'add') {
//       result = parseFloat(n1) + parseFloat(n2)
//     } else if (operator === 'subtract') {
//       result = parseFloat(n1) - parseFloat(n2)
//     }else if (operator === 'multiply') {
//       result = parseFloat(n1) * parseFloat(n2)
//     } else if (operator === 'divide') {
//       result = parseFloat(n1) / parseFloat(n2)
//     }
    
//     return result
//   }

// calculator.addEventListener('click', e => {
//     if(e.target.matches('button'));
//     const key = e.target;
//     const action = key.dataset.action;
//     const keyContent = key.textContent;
//     const displayedNum = display.textContent;
//     const previousKeyType = container.dataset.previousKeyType;

//     Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    
//     if(!action) {
        
//         if(displayedNum === '0'){
//             display.textContent = keyContent;
//         }else if(previousKeyType === 'operator'){
//             display.textContent += keyContent;
//             container.dataset.previousKeyType = 'number';
//         }else {
//             display.textContent = displayedNum + keyContent;
//         }
//         container.dataset.previousKeyType = 'number';
       
//     }

//     if(action === 'add' ||
//     action === 'subtract' ||
//     action === 'multiply' ||
//     action === 'divide') {

//         const firstValue = container.dataset.firstValue;
//         const operator = container.dataset.operator;
//         const secondValue = displayedNum;;
//         if (
//             firstValue &&
//             operator &&
//             previousKeyType !== 'operator'
//           ) {
//             const calcValue = calculate(firstValue, operator, secondValue)
//             display.textContent = calcValue
            
//           // Update calculated value as firstValue
//             container.dataset.firstValue = calcValue;
//           } else {
//             // If there are no calculations, set displayedNum as the firstValue
//             container.dataset.firstValue = displayedNum;
//           }

//         key.classList.add('is-depressed');
//         container.dataset.previousKeyType = 'operator';
//         display.textContent += keyContent;
//         container.dataset.firstValue = displayedNum;
//         container.dataset.operator = action;
//     }
//     if(action === 'decimal') {
//         if (!displayedNum.includes('.')) {
//             display.textContent = displayedNum + '.'
//           }if (previousKeyType === 'operator') {
//             display.textContent = '0.'
//           }
//           container.dataset.previousKeyType = 'decimal';
//     }
  
//     if(action === 'clear') {
//         container.dataset.previousKeyType = 'clear'
//         console.log("clear key");
//     }
//     if(action === 'calculate') {
//         const firstValue = container.dataset.firstValue;
//         const operator = container.dataset.operator;
//         const secondValue = displayedNum.charAt(2);

//         if (firstValue) {
//             display.textContent = calculate(firstValue, operator, secondValue);
//           }
//         container.dataset.previousKeyType = 'calculate';
//     }
// });



