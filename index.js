//aquiring the needed html elements
const cookie = document.getElementById('cookie');
const counterElement = document.getElementById('counter');
const plusOne = document.getElementById('plusOne');
//defining variable to keep track of when the user last clicked the cookie
var lastTriggered = Date.now();
var clickStreak = 0;

//checking if the player has already palyed and therefor has the local storage if not make a new one and reload
if(localStorage.getItem('counter')) {
    //aquiring the saved cookies from localStorage
    var counter = parseInt(localStorage.getItem('counter'));
    counterElement.innerHTML = counter;
}else {
    localStorage.setItem('counter', '0');
    location.reload();
}

//checking if the player has lost thier click streak every 0.1s
setInterval(() => {
    if(Date.now() - lastTriggered > 750){
        stopStreak();
    }
}, 100);

//function gets triggered on cookie clicked
function UpdateCounter(){
    lastTriggered = Date.now();
    addStreak();
    counter++;
    //updating localStorage
    localStorage.setItem('counter', counter);
    counterElement.innerHTML = counter;
}
//add to the click steak when you keep clicking
function addStreak(){
    clickStreak++;
    plusOne.style.opacity = '100';
    plusOne.innerHTML = '+' + clickStreak;
}
//reseting the steak after ideling for 1.5s
function stopStreak(){
    clickStreak = 0;
    plusOne.style.opacity = '0';
    plusOne.innerHTML = clickStreak;
}