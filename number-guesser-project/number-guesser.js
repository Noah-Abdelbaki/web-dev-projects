// ===================
// DOM ELEMENTS
// ===================
const humanScore = document.getElementById("human-score");
const computerScore = document.getElementById("computer-score");
const roundDisplay = document.getElementById("round-number");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const guessButton = document.getElementById("guess");
const humanGuessEl = document.getElementById("human-guess"); // DOM element
const computerGuessEl = document.getElementById("computer-guess");
const targetEl = document.getElementById("target-number");
const resultEl = document.getElementById("result");
const nextRound = document.getElementById("next-round");

// ===================
// UTILITIES
// ===================
const generateTarget = () => Math.floor(Math.random() * 10);

// ===================
// GAME STATE
// ===================
let humanScoreValue = 0;
let computerScoreValue = 0;
let currentRound = 1;

// ===================
// INITIAL UI STATE
// ===================
nextRound.disabled = true;

// ===================
// EVENT: GUESS (play one round, then lock guessing)
// ===================
guessButton.addEventListener("click", () => {
  const target = generateTarget();
  targetEl.textContent = target;

  const computerGuessVal = Math.floor(Math.random() * 10);
  computerGuessEl.textContent = computerGuessVal;

  const humanGuessVal = Number(humanGuessEl.value);

  const d1 = Math.abs(humanGuessVal - target);
  const d2 = Math.abs(computerGuessVal - target);

  if (d1 <= d2) {
    humanScoreValue++;
    humanScore.textContent = humanScoreValue;
    resultEl.textContent = "You win this round";
  } else {
    computerScoreValue++;
    computerScore.textContent = computerScoreValue;
    resultEl.textContent = "Computer wins this round";
  }

  // lock guess, allow next round
  guessButton.disabled = true;
  nextRound.disabled = false;
});

// ===================
// EVENT: NEXT ROUND (increment round, reset UI, unlock guess)
// ===================
nextRound.addEventListener("click", () => {
  currentRound += 1;
  roundDisplay.textContent = currentRound;

  // reset UI for new round
  targetEl.textContent = "?";
  computerGuessEl.textContent = "?";
  resultEl.textContent = "";
  humanGuessEl.value = 0;

  // enable guess, disable next
  guessButton.disabled = false;
  nextRound.disabled = true;
});

// ===================
// EVENT: +/- BUTTONS
// ===================
addButton.addEventListener("click", () => {
  // Increase guess by 1, but stop at 9
  humanGuessEl.value = Math.min(9, Number(humanGuessEl.value) + 1);
});

// subtract uses max to block going below 0, and add uses min to block going above 9.

subtractButton.addEventListener("click", () => {
  // Decrease guess by 1, but stop at 0
  humanGuessEl.value = Math.max(0, Number(humanGuessEl.value) - 1);
});

// ===================
// INPUT CLAMP (manual typing 0–9 only)
// ===================
humanGuessEl.addEventListener("input", () => {
  humanGuessEl.value = Math.max(
    0,
    Math.min(9, Number(humanGuessEl.value || 0))
  );
});

// Disable + or - buttons automatically at limits
function syncButtons() {
  const n = Number(humanGuessEl.value);
  addButton.disabled = n >= 9; // Disable + if guess is 9 or more
  subtractButton.disabled = n <= 0; // Disable - if guess is 0 or less
}

// Run check whenever guess changes (click or type)
addButton.addEventListener("click", syncButtons);
subtractButton.addEventListener("click", syncButtons);
humanGuessEl.addEventListener("input", syncButtons);
