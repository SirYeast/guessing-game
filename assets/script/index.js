"use strict";

const main = document.querySelector("main");
const triesDisplay = document.getElementById("tries-display");
const instructions = document.getElementById("instructions");

const form = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

const overlay = document.getElementById("overlay");
const message = document.getElementById("result-message");
const startBtn = document.getElementById("start-btn");

const difficultyScroller = document.getElementById("difficulty-scroller");
const selectedDifficulty = document.getElementById("selected-difficulty");

const prevSelector = difficultyScroller.querySelector(".prev");
const nextSelector = difficultyScroller.querySelector(".next");

const difficulties = [
    {
        name: "Easy",
        icon: "baby",
        max: 50
    },
    {
        name: "Medium",
        icon: "user",
        max: 150
    },
    {
        name: "Hard",
        icon: "fire",
        max: 500
    },
    {
        name: "Extreme",
        icon: "skull",
        max: 2500
    },
    {
        name: "Nightmare",
        icon: "skull-crossbones",
        max: 7500
    }
];

const messages = [
    "Impressive",
    "Nicely done",
    "You can do better",
    "Seriously?",
    "Uhhhhh what?",
    "\"How are you so bad lol\" - Albert Einstein"
];

let difficultyIndex = 0;
let difficulty;

let guessTarget;
let tries;

function setTries(num) {
    tries = num;

    triesDisplay.innerText = num;
}

function setDifficulty(index) {
    if (index < 0 || index > difficulties.length - 1) {
        return;
    }

    difficultyIndex = index;

    //update UI
    prevSelector.disabled = index === 0;
    nextSelector.disabled = index === difficulties.length - 1;

    const difficulty = difficulties[index];

    selectedDifficulty.innerHTML = `
        <i class="fa-solid fa-${difficulty.icon} fa-bounce"></i>
        <h3 class="title">${difficulty.name}</h3>
        <span class="max">1 - ${difficulty.max} range</span>
    `;
}

setDifficulty(0);

prevSelector.addEventListener("click", function () {
    setDifficulty(difficultyIndex - 1);
});

nextSelector.addEventListener("click", function () {
    setDifficulty(difficultyIndex + 1)
});

form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent form reset after submit

    const guess = parseInt(guessInput.value);

    guessInput.value = "";
    guessInput.focus();

    if (!Number.isInteger(guess)) {
        guessInput.placeholder = "Enter a valid number";
        return;
    }

    if (guess < 1 || guess > difficulty.max) {
        guessInput.placeholder = "Number out of range";
        return;
    }

    if (guess !== guessTarget) {
        setTries(tries + 1);
        guessInput.placeholder = guess < guessTarget ? "Try a higher number" : "Try a lower number";
        return;
    }

    //number was guessed, determine message on result screen and show
    const len = messages.length;
    for (let i = 0; i < len; i++) {
        if (tries <= (i + 1) * 5 || i === len - 1) {
            message.innerText = `You guessed the number in ${tries} ${tries == 1 ? "try" : "tries"}! ${messages[i]}.`;
            break;
        }
    }

    main.style.display = "none";
    overlay.style.display = "flex";
    message.style.display = "block";
});

startBtn.addEventListener("click", function () {
    difficulty = difficulties[difficultyIndex];
    guessTarget = Math.floor(Math.random() * difficulty.max) + 1;

    setTries(1);

    instructions.innerText = `1 - ${difficulty.max} range`;

    guessInput.placeholder = "Enter guess";
    guessInput.value = "";

    main.style.display = "flex";
    overlay.style.display = "none";
});