let leftSideButtons = document.getElementById("leftSide").querySelectorAll(".button");
let rightSideButtons = document.getElementById("rightSide").querySelectorAll(".button");
let bottomButtons = document.getElementById("bottom").querySelectorAll(".button");

//Dimensions of the calculator
let calcWidth = window.getComputedStyle(main).getPropertyValue('width');
let topHeight = window.getComputedStyle(document.getElementById("top")).getPropertyValue('flex-basis');
let calcHeight = window.getComputedStyle(main).getPropertyValue('height');
let displayHeight = window.getComputedStyle(document.getElementById("display")).getPropertyValue('flex-basis');


// Left side of calculator 
let buttonHeight = (parseInt(topHeight)/4) + "px";
let buttonWidth = (parseInt(calcWidth)/4) + "px";

leftSideButtons.forEach(button => {
    button.style.height = buttonHeight;
    button.style.width = buttonWidth;
    
    button.addEventListener('click',() => {
        console.log(button.innerHTML);
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
        console.log(button.innerHTML);
    });
});


console.log(parseInt(calcHeight) - (parseInt(displayHeight) + parseInt(topHeight)));
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
        console.log(button.innerHTML);
    });
});