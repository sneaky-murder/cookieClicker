// [MAIN GAME] \\
//aquiring the needed html elements
const container = document.getElementById('container')
const cookie = document.getElementById('cookie');
const counterElement = document.getElementById('counter');
const plusOne = document.getElementById('plusOne');
const clearPopUp = document.getElementById('clearPopUp');
const clearPopUpButtonsContainer = document.getElementById('clearPopUpButtonsContainer');
//defining variable to keep track of when the user last clicked the cookie
var lastTriggered = Date.now();
var clickStreak = 0;

//checking if the player has already palyed and therefor has the local storage if not make a new one and reload
if(localStorage.getItem('counter')) {
    //aquiring the saved cookies from localStorage
    var counter = parseInt(localStorage.getItem('counter'));
    var upgrade = parseInt(localStorage.getItem('upgrade'));
    var upgradePrice = parseInt(localStorage.getItem('upgradePrice'))
    counterElement.innerHTML = counter;
}else {
    localStorage.setItem('counter', '0');
    localStorage.setItem('upgrade', '1');
    localStorage.setItem('upgradePrice', '10')
    location.reload();
}

//checking if the player has lost thier click streak every 0.1s
setInterval(() => {
    counter = parseInt(localStorage.getItem('counter'));
    upgrade = parseInt(localStorage.getItem('upgrade'));
    upgradePrice = parseInt(localStorage.getItem('upgradePrice'));

    if(Date.now() - lastTriggered > 750){
        stopStreak();
    }
}, 250);

//function gets triggered on cookie clicked
function UpdateCounter(){
    lastTriggered = Date.now();
    addStreak();
    counter += upgrade;
    //updating localStorage
    localStorage.setItem('counter', counter);
    counterElement.innerHTML = counter;
}
//add to the click steak when you keep clicking
function addStreak(){
    clickStreak += upgrade;
    plusOne.style.opacity = '100';
    plusOne.innerHTML = '+' + clickStreak;
}
//reseting the steak after ideling for 1.5s
function stopStreak(){
    clickStreak = 0;
    plusOne.style.opacity = '0';
    plusOne.innerHTML = clickStreak;
}
//making the pop up apear to ask if the user is sure they want to clear all progress
function clearProgress(){
    clearPopUp.style.display = 'flex';
    container.style.filter = 'blur(5px)';
}
//if yes
function clearYes (){
    localStorage.setItem('counter', '0');
    localStorage.setItem('upgrade', '1');
    localStorage.setItem('upgradePrice', '10');
    location.reload();
}
//if no
function clearNo(){
    clearPopUp.style.display = 'none';
    container.style.filter = 'blur(0px)';
}

// [UPGRADE ADDON] \\
const upgradeButton = document.getElementById('upgrade');

UpdateUpgradeButton();

function UpgradeHandler(){
    if(counter >= upgradePrice) {
        counter -= upgradePrice;
        localStorage.setItem('counter', counter);
        upgrade++;
        localStorage.setItem('upgrade', upgrade);
        upgradePrice += Math.floor(Math.random() * upgrade * upgrade + 10 * upgrade);
        localStorage.setItem('upgradePrice', upgradePrice);
        UpdateUpgradeButton();
        counterElement.innerHTML = counter;
    }
}

function UpdateUpgradeButton(){
    upgradeButton.innerHTML = `upgrade: ${upgrade+1}(${upgradePrice}🍪)`;
}
