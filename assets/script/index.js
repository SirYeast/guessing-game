"use strict";

const main = document.querySelector("main");
const triesCount = document.querySelectorAll(".tries");

const form = document.querySelector("form");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

const results = document.getElementById("results");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");

const messages = ["Impressive", "Nicely done", "You can do better",
    "Seriously?", "Uhhhhh what?", "\"How are you so bad lol\" - Albert Einstein"];

let guessTarget = 0;
let tries = 0;

function setTries(num) {
    tries = num;

    for (let span of triesCount)
        span.innerText = num;
}

function reset() {
    guessTarget = Math.floor(Math.random() * 50) + 1;
    guessInput.placeholder = "Enter guess";
    guessInput.value = "";
    setTries(1);
}

window.addEventListener("load", reset);

function validate() {
    let guess = parseInt(guessInput.value);
    guessInput.value = "";

    if (!Number.isInteger(guess)) {
        guessInput.placeholder = "Enter a valid number";
        return;
    }

    if (guess < 1 || guess > 50) {
        guessInput.placeholder = "Number out of range";
        return;
    }

    if (guess == guessTarget) {
        let len = messages.length;
        for (let i = 0; i < len; i++) {
            if (tries <= (i + 1) * 5 || i == len - 1) {
                message.innerText = messages[i];
                break;
            }
        }

        results.style.display = "flex";
        main.style.display = "none";

        return;
    }

    setTries(tries + 1);

    guessInput.placeholder = guess < guessTarget ? "Try a higher number" : "Try a lower number";
};

form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form reset after submit

    validate();
});

guessBtn.addEventListener("mouseup", validate);

resetBtn.addEventListener("mouseup", function () {
    reset();

    main.style.display = "flex";
    results.style.display = "none";
});