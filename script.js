
let Operand1 ='';
let Operand2 ='';
let Operator = '';
let isDotpresent = false;
let shouldResetScreen = false;
let currentOperator = null;
const CurrentScreen = document.getElementById("current-screen");
const OpScreen = document.getElementById("op-screen");
const ClearButton = document.getElementById("clear-button");
const BackButton = document.getElementById("back-button");
const equalsButton = document.getElementById("equals");
const dotButton = document.getElementById("dot-button");
const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-op]');
ClearButton.addEventListener('click',ClearScreen);
BackButton.addEventListener('click',BackSpace);
equalsButton.addEventListener('click',Evaluate);
dotButton.addEventListener('click',dotClicked)

function ClearScreen(){
CurrentScreen.textContent = "0";
OpScreen.textContent = "";
isDotpresent = false;
}

function dotClicked(){
    if(isOperator(CurrentScreen.textContent)){
        return;
    }
    if(!isDotpresent){
        if(!(isOperator(CurrentScreen))){
            CurrentScreen.textContent += ".";
            isDotpresent = true;
        }
    }
}
function Evaluate(){
if(isOperator(CurrentScreen.textContent)){
    return;
}
Operand2 = CurrentScreen.textContent;
console.log(Operand2);

switch(currentOperator){
    case "+":{
        console.log("Add");
        let result = roundDecimals(Number(Operand1) + Number(Operand2));
        CurrentScreen.textContent = result;
        OpScreen.textContent = "";
        break;
    }
    case "-":{
        console.log("Sub");
        let result = roundDecimals(Operand1 - Operand2);
        CurrentScreen.textContent = result;
        OpScreen.textContent = "";
        break;
    }
    case "/":{
        console.log("Div");
        let result = roundDecimals(Operand1 / Operand2);
        if(Operand2 === "0"){
            result = "Lmao";
        }
        CurrentScreen.textContent = result;
        OpScreen.textContent = "";
        break;
    }
    case "x":{
        console.log("Mult");
        let result = roundDecimals(Operand1 * Operand2);
        CurrentScreen.textContent = result;
        OpScreen.textContent = "";
        break;
    }
    default :{
        console.log("Error");
        break;

    }
}
Operand1 = CurrentScreen.textContent;
Operand2 = "";
currentOperator = null;
shouldResetScreen = true;
}
function BackSpace(){
    if(CurrentScreen.textContent === '0' || CurrentScreen.textContent === '1' || CurrentScreen.textContent === '2' || CurrentScreen.textContent === '3' ||CurrentScreen.textContent === '4' || CurrentScreen.textContent === '5' || CurrentScreen.textContent === '6' ||CurrentScreen.textContent === '7' ||CurrentScreen.textContent === '8'||CurrentScreen.textContent === '9'){
        CurrentScreen.textContent = '0';
        return;
    }
    
    if(isOperator(CurrentScreen.textContent)){
        return;
    }
    CurrentScreen.textContent = CurrentScreen.textContent.toString().slice(0,-1);
}

numButtons.forEach((numbutton)=>
    numbutton.addEventListener('click',() => appendNumber(numbutton.textContent))
);
opButtons.forEach((opbutton)=>
    opbutton.addEventListener('click',() => setOperator(opbutton.textContent))
);

function appendNumber(num){
    if(shouldResetScreen === true){
        CurrentScreen.textContent = "";
        shouldResetScreen = false;
    }
    if(isOperator(CurrentScreen.textContent)){
        OpScreen.textContent += CurrentScreen.textContent;
        CurrentScreen.textContent = "";
    }
    if(CurrentScreen.textContent === '0'){
        CurrentScreen.textContent = '';
    }
    
    CurrentScreen.textContent = CurrentScreen.textContent + num;
}
function setOperator(op){
    if(isOperator(CurrentScreen.textContent)){
        
        CurrentScreen.textContent = op;
        return;
    }
    if(currentOperator != null){
        let result;
        Operand2 = CurrentScreen.textContent; 
        switch(currentOperator){
            case "+":{
                console.log("Add");
                result = roundDecimals(Number(Operand1) + Number(Operand2));
                
                break;
            }
            case "-":{
                console.log("Sub");
                result = roundDecimals(Operand1 - Operand2);
                
                break;
            }
            case "/":{
                console.log("Div");
                result = roundDecimals(Operand1 / Operand2);
                
                break;
            }
            case "x":{
                console.log("Mult");
                result = roundDecimals(Operand1 * Operand2);
                
                break;
            }
            default :{
                console.log("Error");
                break;
        
            }
    }
    Operand1 = result;
    Operand2 = "";
    OpScreen.textContent = result;
    CurrentScreen.textContent = op;
    currentOperator = op;
    

}
    
    else{
    OpScreen.textContent = CurrentScreen.textContent;
    currentOperator = op;
    Operand1 = CurrentScreen.textContent;
    console.log(Operand1);
    console.log(currentOperator);
    CurrentScreen.textContent = "";
    CurrentScreen.textContent += op;
    }
    isDotpresent = false;
}
function isOperator(op){
    if(op === "+"||op==="-"||op==="x"||op==="/"){
        return true;
    }
    else{
        return false;
    }
}
function roundDecimals(num){
    return Math.round(num *1000) /1000;
}
