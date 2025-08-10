// ====== SETUP: DOM refs ======
const humanScoreDisplay = document.getElementById("human-score");
const computerScoreDisplay = document.getElementById("computer-score");
const scissorsButton = document.getElementById("scissors");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const humanChoiceDisplay = document.getElementById("human-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const submitButton = document.getElementById("submit-choice-button");
const newRoundButton = document.getElementById("new-round-button");
const newGameButton = document.getElementById("new-game-button");
const winnerEntry = document.getElementById("winner");
const roundNumberSpan = document.getElementById("round-number");

// ====== CONSTANTS / STATE ======
const rockValue = 0;
const paperValue = 1;
const scissorsValue = 2;
let humanChoiceValue;
let computerChoiceValue;
let humanScoreNum = 0;
let computerScoreNum = 0;

const setScore = (scoreElement, scoreValue) => {
  scoreElement.textContent = scoreValue;
};

// ====== INITIAL UI ======
humanScoreDisplay.style.color = "white";
computerScoreDisplay.style.color = "white";
roundNumberSpan.style.color = "white";
submitButton.disabled = true;
newRoundButton.disabled = true;
newGameButton.hidden = true;
humanChoiceDisplay.textContent = "?";

// ====== CHOICE HANDLERS ======
const setHumanChoice = (val, label) => {
  humanChoiceValue = val;
  humanChoiceDisplay.textContent = label;
  submitButton.disabled = false;
};

rockButton.addEventListener("click", () => setHumanChoice(rockValue, "Rock"));
paperButton.addEventListener("click", () =>
  setHumanChoice(paperValue, "Paper")
);
scissorsButton.addEventListener("click", () =>
  setHumanChoice(scissorsValue, "Scissors")
);

// ====== NEW ROUND ======
newRoundButton.addEventListener("click", () => {
  // reset round state
  computerChoiceValue = -1;
  roundNumberSpan.textContent = String(Number(roundNumberSpan.textContent) + 1);
  winnerEntry.textContent = "";

  // buttons
  newRoundButton.disabled = true;
  submitButton.disabled = true;
  rockButton.disabled = false;
  scissorsButton.disabled = false;
  paperButton.disabled = false;

  // displays
  humanChoiceDisplay.style.color = "black";
  computerChoiceDisplay.style.color = "black";
  humanChoiceDisplay.textContent = "?";
  computerChoiceDisplay.textContent = "?";
});

// ====== SUBMIT (PLAY ONE ROUND) ======
submitButton.addEventListener("click", () => {
  // -- 1) COMPUTER CHOICE
  const CHOICES = ["Rock", "Paper", "Scissors"];
  computerChoiceValue = Math.floor(Math.random() * 3);
  computerChoiceDisplay.textContent = CHOICES[computerChoiceValue];

  // -- 2) DECIDE WINNER
  // TIE?
  if (humanChoiceValue === computerChoiceValue) {
    winnerEntry.textContent = "It's a tie!";
    humanChoiceDisplay.style.color = "green";
    computerChoiceDisplay.style.color = "green";
  } else {
    // Determine winner in one ternary
    const humanWins =
      (humanChoiceValue === rockValue &&
        computerChoiceValue === scissorsValue) ||
      (humanChoiceValue === scissorsValue &&
        computerChoiceValue === paperValue) ||
      (humanChoiceValue === paperValue && computerChoiceValue === rockValue);

    // Score update + text
    humanWins
      ? ((winnerEntry.textContent = "Human wins this round!"),
        humanScoreNum++,
        setScore(humanScoreDisplay, humanScoreNum))
      : ((winnerEntry.textContent = "Computer wins this round!"),
        computerScoreNum++,
        setScore(computerScoreDisplay, computerScoreNum));

    // Colors
    humanChoiceDisplay.style.color = humanWins ? "green" : "red";
    computerChoiceDisplay.style.color = humanWins ? "red" : "green";
  }

  // -- 3) GAME OVER?
  if (humanScoreNum === 5 || computerScoreNum === 5) {
    winnerEntry.textContent =
      humanScoreNum === 5
        ? "Human wins this game!"
        : "Computer wins this game!";
    newGameButton.hidden = false;

    submitButton.disabled = true;
    newRoundButton.disabled = true;
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    return; // stop — don't allow next round
  }

  // -- 4) ROUND OVER
  submitButton.disabled = true;
  newRoundButton.disabled = false;
  rockButton.disabled = true;
  scissorsButton.disabled = true;
  paperButton.disabled = true;
});

// ====== NEW GAME ======
newGameButton.addEventListener("click", () => {
  // reset scores/round
  humanScoreNum = 0;
  computerScoreNum = 0;
  setScore(humanScoreDisplay, humanScoreNum);
  setScore(computerScoreDisplay, computerScoreNum);
  roundNumberSpan.textContent = "1";

  // reset UI
  winnerEntry.textContent = "";
  humanChoiceDisplay.textContent = "?";
  computerChoiceDisplay.textContent = "?";
  humanChoiceDisplay.style.color = "black";
  computerChoiceDisplay.style.color = "black";

  // button states
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;
  submitButton.disabled = true;
  newRoundButton.disabled = true;

  // hide new game btn
  newGameButton.hidden = true;
});
