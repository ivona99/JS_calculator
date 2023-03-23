const calculator = document.querySelector('.buttons');
const container = document.querySelector('.container');
const display = document.querySelector('.total');

const calculate = (n1, operator, n2) => {
    let result = ''
    
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
    
    return result
  }

calculator.addEventListener('click', e => {
    if(e.target.matches('button'));
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = container.dataset.previousKeyType;
    
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    
    if(!action) {
        
        if(displayedNum === '0'){
            display.textContent = keyContent;
        }else if(previousKeyType === 'operator'){
            display.textContent += keyContent;
            // container.dataset.previousKeyType = 'number';
        }else {
            display.textContent = displayedNum + keyContent;
        }
        container.dataset.previousKeyType = 'number';
       
    }

    if(action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide') {
        
        key.classList.add('is-depressed');
        container.dataset.previousKeyType = 'operator';
        
        console.log("previous in operation", previousKeyType);
        display.textContent += keyContent;
        
        container.dataset.firstValue = displayedNum;
        container.dataset.operator = action;
        
        
    }
    if(action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
          }if (previousKeyType === 'operator') {
            display.textContent = '0.'
          }
          container.dataset.previousKeyType = 'decimal';
    }
  
    if(action === 'clear') {
        container.dataset.previousKeyType = 'clear'
        console.log("clear key");
    }
    if(action === 'calculate') {
        container.dataset.previousKeyType = 'calculate'
        const firstValue = container.dataset.firstValue;
        const operator = container.dataset.operator;
        const secondValue = displayedNum;

        display.textContent = calculate(firstValue, operator, secondValue);
    }
});



