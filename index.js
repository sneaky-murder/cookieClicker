const cookie = document.getElementById('cookie');
const counterElement = document.getElementById('counter');

if(localStorage.getItem('counter')) {
    var counter = parseInt(localStorage.getItem('counter'));
    counterElement.innerHTML = counter;
    //cookie.addEventListener('click', UpdateCounter(counter))
}else {
    localStorage.setItem('counter', '0');
    location.reload();
}

function UpdateCounter(){
    counter++;
    localStorage.setItem('counter', counter);
    counterElement.innerHTML = counter;
}
