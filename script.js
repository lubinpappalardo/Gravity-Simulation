const square = document.querySelector("#square");
let ground = document.querySelector("#ground").getBoundingClientRect();

const intervalDurationInput = document.querySelector("#intervalDuration");
const intervalDurationValue = document.querySelector("#intervalDurationValue");

const accelerationInput = document.querySelector("#acceleration");
const accelerationValue = document.querySelector("#accelerationValue");

const squareSizeInput = document.querySelector("#squareSize");
const groundLevelInput = document.querySelector("#groundLevel");

accelerationValue.innerHTML = accelerationInput.value;
intervalDurationValue.innerHTML = intervalDurationInput.value;

// global variables
let acceleration = 9.8; // N.kg^-1
let intervalDuration = Number(intervalDurationInput.value); // ms
let interval;
let time = 0;

accelerationInput.addEventListener("input", (event) => {
    acceleration = Number(event.target.value);
    accelerationValue.innerHTML = event.target.value;
});

intervalDurationInput.addEventListener("input", (event) => {
    intervalDuration = Number(event.target.value);
    intervalDurationValue.innerHTML = event.target.value;
});

squareSizeInput.addEventListener("input", (event) => {
    square.style.width = event.target.value + "px";
    square.style.top = (window.innerHeight - ground.height) - 0.5 * square.getBoundingClientRect().height + "px";
});

groundLevelInput.addEventListener("input", (event) => {
    document.querySelector("#ground").style.height = event.target.value + "px";
    ground = document.querySelector("#ground").getBoundingClientRect();
    // position the square on the ground
    square.style.top = (window.innerHeight - ground.height) - 0.5 * square.getBoundingClientRect().height + "px";
});

// function for changing square position
const updatePosition = () => {

    square_top = square.getBoundingClientRect().bottom;
    // calculate the distance traveled in the amount of time using the formula : d = 1/2 * a * t^2
    distance = 0.5 * acceleration * Math.pow(time / 1000, 2);

    // console.log(distance + " | " + square.getBoundingClientRect().bottom);
    console.log(parseInt(square_top + distance));

    // move the square down to simulate the fall
    square.style.top = parseInt(square_top + distance) + "px"; 
    time += intervalDuration;

    // create points spaced by the same amount of time
    const point = document.createElement("div");
    point.style.width = "10px";
    point.style.height = "10px";
    point.style.borderRadius = "50%";
    point.style.transform = "translate(-50%, -50%)";
    point.style.background = "black";
    point.style.position = "absolute";
    point.style.left = "50%";
    point.style.top = parseInt(square_top + distance) + "px";
    document.querySelector(".points").appendChild(point);

    // stop when hit the ground
    if (square.getBoundingClientRect().bottom >= (window.innerHeight - ground.height)) {
        clearInterval(interval);
        // position square on the ground in case it went further
        square.style.top = (window.innerHeight - ground.height) - 0.5 * square.getBoundingClientRect().height + "px";
    }
};

// start the simulation
document.querySelector("#start").addEventListener('click', function() { 
    console.log(acceleration);
    console.log(intervalDuration);
    clearInterval(interval);
    square.style.top = 100 + "px"; 
    time = 0;
    document.querySelector(".points").innerHTML = '';
    document.querySelector("#start").innerHTML = 'RESTART';
    interval = setInterval(updatePosition, intervalDuration);
});
