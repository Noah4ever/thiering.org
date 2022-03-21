"use strict"

let moveSpeedInput = document.getElementById("moveSpeed");
let moveSpeed = 10;
moveSpeedInput.addEventListener("change", (e) => {
    if(moveSpeedInput.value <= moveSpeedInput.max){
        moveSpeed = parseInt(moveSpeedInput.value);
    }
});
let colorInput = document.getElementById("bg-color");
colorInput.addEventListener("change", (e) => {
    document.getElementById("hex-color").innerText = colorInput.value;
    document.getElementById("html").style.backgroundColor = colorInput.value;
})


let controller = {
    "w": {pressed: false, func: moveApacheUp},
    "s": {pressed: false, func: moveApacheDown},
    "a": {pressed: false, func: moveApacheLeft},
    "d": {pressed: false, func: moveApacheRight},
}

let apache = document.getElementById("apache"); // Get apache (wrapper around the img)
let apacheGif = document.getElementById("apache-gif"); // For width
let apachePos = { // player pos x and y
    x: 0,
    y: 0
};

function moveApacheUp(){
    if(apachePos.y >= 0){
        apachePos.y -= moveSpeed;
        moveApachteToNewPosition()
    }else{
        apachePos.y = 0;
    }
}
function moveApacheDown(){
    if(apachePos.y <= window.innerHeight - (apache.clientHeight / 2)){
        apachePos.y += moveSpeed;
        moveApachteToNewPosition()
    }else{
        apachePos.y = window.innerHeight - (apache.clientHeight / 2);
    }
}
function moveApacheLeft(){
    if(apachePos.x >= 0){
        apachePos.x -= moveSpeed;
        moveApachteToNewPosition()
    }else{
        apachePos.x = 0;
    }
}
function moveApacheRight(){
    if(apachePos.x <= window.innerWidth - (apacheGif.clientWidth / 1.25)){
        apachePos.x += moveSpeed;
        moveApachteToNewPosition()
    }else{
        apachePos.x = window.innerWidth - (apacheGif.clientWidth / 1.25);
    }
}

function moveApachteToNewPosition(){ // Move apache to Position
    apache.style.left = apachePos.x + 'px';
    apache.style.top = apachePos.y + 'px';

}


document.addEventListener("keydown", (e) => { // If key is pressed, pressed state to true
    if(controller[e.key]){
        controller[e.key].pressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if(controller[e.key]){
        controller[e.key].pressed = false;
    }
});

function moveApache(){
    Object.keys(controller).forEach(key => {
        controller[key].pressed && controller[key].func();
    })
}

function update(){

    moveApache();

    window.requestAnimationFrame(update);
}

moveApachteToNewPosition() // Move player to start pos

window.requestAnimationFrame(update)