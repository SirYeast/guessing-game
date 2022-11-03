"use strict";

const main = document.querySelector("main");
const triesCount = document.querySelectorAll(".tries");

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

const results = document.getElementById("results");
const resetBtn = document.getElementById("reset-btn");

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

guessBtn.addEventListener("mouseup", function () {
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
        results.style.display = "flex";
        main.style.display = "none";
        return;
    }

    setTries(tries + 1);

    guessInput.placeholder = guess < guessTarget ? "Try a higher number" : "Try a lower number";
});

resetBtn.addEventListener("mouseup", function () {
    reset();

    main.style.display = "flex";
    results.style.display = "none";
});