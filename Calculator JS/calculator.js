

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if(isNaN((value))){        
        handleSymbol(value); //If a symbol
    }
    else handleNumber(value); 
    
    screen.innerText = buffer; //Render screen to 0;    
}



function handleSymbol(symbol) {  
   switch(symbol) {
    case 'C':
        buffer = "0";
        runningTotal = 0;
        break;
    case '←':
        if(buffer.length === 1) {
            buffer = '0';
        } else {
            buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
    case '+':
        handleMath(symbol);
        break;
    case '÷':
        handleMath(symbol);
        break;
    case '-':
        handleMath(symbol);
        break;
    case 'x':
        handleMath(symbol);
        break;
    case '=':
        if (previousOperator === null) {
            return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        break;
   }
}

function handleNumber(numberString) { //button click event 1 ~ 9
    if(buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }        
    
}

function handleMath(value) {
    
    if(buffer === "0") {
        
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    switch(previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case 'x':
            runningTotal *= intBuffer;
            break;
        default:
            runningTotal /= intBuffer;
            break;        
    }
}

function init() {

    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {        
        buttonClick(event.target.innerText);
    })
}

init();