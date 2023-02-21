let leftSideButtons = document.getElementById("leftSide").querySelectorAll(".button");
let rightSideButtons = document.getElementById("rightSide").querySelectorAll(".button");
let bottomButtons = document.getElementById("bottom").querySelectorAll(".button");

//Dimensions of the calculator
let calcWidth = window.getComputedStyle(main).getPropertyValue('width');
let topHeight = window.getComputedStyle(document.getElementById("top")).getPropertyValue('flex-basis');
let calcHeight = window.getComputedStyle(main).getPropertyValue('height');
let displayHeight = window.getComputedStyle(document.getElementById("display")).getPropertyValue('flex-basis');

let showEquation = document.getElementById("equation")
let finalCalc = document.getElementById("finalcalc")

// Left side of calculator 
let buttonHeight = (parseInt(topHeight)/4) + "px";
let buttonWidth = (parseInt(calcWidth)/4) + "px";

// The equation will be stored here
let userInput = [];
let equation = [];

let operators = {division : { on :false,
                              size : 0 },
                 multiply  : { on :false,
                               size : 0 },
                 addition  : { on :false,
                               size : 0 },
                 subtraction : { on :false,
                                 size : 0 }};

leftSideButtons.forEach(button => {
    button.style.height = buttonHeight;
    button.style.width = buttonWidth;
    
    button.addEventListener('click',() => {
        userInput.push(button.innerHTML);
        showEquation.innerHTML += button.innerHTML

        if(button.innerHTML == "/") {
            checkValid(userInput);
            userInput = [];
        }
    });
});

// Right side of calculator
rightSideButtons.forEach(button =>{
    if(button.innerHTML == "*") {
        button.style.height = 96 + "px";
    }
    else {
        button.style.height = 192 + "px";
    }
    button.style.width = buttonWidth;
    button.addEventListener('click',() => {
        userInput.push(button.innerHTML);
        showEquation.innerHTML += button.innerHTML

        if(button.innerHTML == "*" || button.innerHTML == "-" || button.innerHTML == "+") {
            checkValid(userInput);
            userInput = [];
        }
    });
});

// Bottom of the Calculator
bottomButtons.forEach(button => {
    button.style.height = (parseInt(calcHeight) - (parseInt(displayHeight) + parseInt(topHeight))) + 'px';
    if(button.innerHTML == ".") {
        button.style.width = parseInt(calcWidth) / 5 + "px";
    }
    else {
        button.style.width = parseInt(calcWidth) * 2 / 5 + "px";
    }
    button.addEventListener('click',() => {
        if(button.innerHTML != "=") {
            userInput.push(button.innerHTML);
        }
        if(button.innerHTML == "=") {
            let tmp = ""
            //if the number is valid concatenate the previous index into one
            for(let i = 0; i < userInput.length ; i++) {
            tmp += userInput[i];
            }
            userInput =[];
            equation.push(tmp);
            // So, checks how many operator are the there
            operatorcheck(equation);
            operate();
        }
    });
});


// // function
function  checkValid(data) {
    //checking if the previous index has more than one decimal point
    decimalExists = false;
    for(let i = 0; i < data.length; i++) {
        if (data[i] == ".") {
            if(decimalExists) {
                console.log("error");
            }
            decimalExists = true;
        }
    }
    let tmp = ""
    //if the number is valid concatenate the previous index into one
    for(let i = 0; i < data.length - 1; i++) {
        tmp += data[i];
    }
    
    equation.push(tmp)
    equation.push(data[data.length - 1])
};

function operatorcheck(input) {
    // for following order of operation
    operators = {division : { on :false,
                              size : 0 },    // for each arithmetic operator there is a on key for if there is that given operator
                multiply  : { on :false,     // and size is there for how many of that given operator in equation
                              size : 0 },
                addition  : { on :false,
                              size : 0 },
                subtraction : { on :false,
                                size : 0 }}; 
                                

    input.forEach(element => {
        switch (element) {
            case "/":
                operators.division.on = true;
                operators.division.size++;
                break;
            case "*":
                operators.multiply.on = true;
                operators.multiply.size++;
                break;
            case "+":
                operators.addition.on = true;
                operators.addition.size++;
                break;
            case "-":
                operators.subtraction.on = true;
                operators.subtraction.size++;
                break;
            default:
                break;
        }
    });
}

function operate() {
    let symbolIndex = 0;
    let leftmostIndex = 0; //These variables to navigate through the equation
    let righmostIndex = 0;

    for (const operator in operators)
    {
        if(!operators[operator].on) {
            continue; //There was no given operator so we skip it.
        }
        //else we continue to find which operator it was 
        switch (operator) {
            case "division":
                while (operators[operator].size != 0) {
                    for (let i = 0; i < equation.length; i++) {
                        if (equation[i] == "/") {
                            symbolIndex = i;
                            leftmostIndex = i - 1;
                            righmostIndex = i + 1;

                            let tmpvalue = equation[leftmostIndex] / equation[righmostIndex];
                            equation.splice(leftmostIndex,1, tmpvalue);
                            equation.splice(symbolIndex,(righmostIndex - symbolIndex + 1));
                            // Where calculation occurs
                            operators[operator].size--;      
                        }                   
                    }
                }
                break;
            case "multiply":
                while (operators[operator].size != 0) {
                    for (let i = 0; i < equation.length; i++) {
                        if (equation[i] == "*") {
                            symbolIndex = i;
                            leftmostIndex = i - 1;
                            righmostIndex = i + 1;

                            let tmpvalue = equation[leftmostIndex] * equation[righmostIndex];
                            equation.splice(leftmostIndex,1, tmpvalue);
                            equation.splice(symbolIndex,(righmostIndex - symbolIndex + 1));
                            // Where calculation occurs
                            operators[operator].size--;      
                        }                   
                    }
                }
                break;
            case "addition":
                while (operators[operator].size != 0) {
                    for (let i = 0; i < equation.length; i++) {
                        if (equation[i] == "+") {
                            symbolIndex = i;
                            leftmostIndex = i - 1;
                            righmostIndex = i + 1;

                            let tmpvalue = equation[leftmostIndex] + +equation[righmostIndex];
                            equation.splice(leftmostIndex,1, tmpvalue);
                            equation.splice(symbolIndex,(righmostIndex - symbolIndex + 1));
                            // Where calculation occurs
                            operators[operator].size--;      
                        }                   
                    }
                }
                break;
            case "subtraction":
                while (operators[operator].size != 0) {
                    for (let i = 0; i < equation.length; i++) {
                        if (equation[i] == "-") {
                            symbolIndex = i;
                            leftmostIndex = i - 1;
                            righmostIndex = i + 1;

                            let tmpvalue = equation[leftmostIndex] - +equation[righmostIndex];
                            equation.splice(leftmostIndex,1, tmpvalue);
                            equation.splice(symbolIndex,(righmostIndex - symbolIndex + 1));
                            // Where calculation occurs
                            operators[operator].size--;      
                        }                   
                    }
                }
                break;
        
            default:
                break;
        }
    }
    finalCalc.innerHTML = equation
    equation = []
}
