let tg = window.Telegram.Webapp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let item = "";

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");

function updateMainButton(text) {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText(text);
        tg.MainButton.show();
    }
}

btn1.addEventListener("click", function() {
    updateMainButton("Ви обрали товар 1!");
    item = "1";
});

btn2.addEventListener("click", function() {
    updateMainButton("Ви обрали товар 2!");
    item = "2";
});

btn3.addEventListener("click", function() {
    updateMainButton("Ви обрали товар 3!");
    item = "3";
});

btn4.addEventListener("click", function() {
    updateMainButton("Ви обрали товар 4!");
    item = "4";
});

btn5.addEventListener("click", function() {
    updateMainButton("Ви обрали товар 5!");
    item = "5";
});

btn6.addEventListener("click", function() {
    updateMainButton("Ви обрали товар 6!");
    item = "6";
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(item);
});
