const userHandImg = document.querySelector("#user-hand");
const AiHandImg = document.querySelector("#Ai-hand");
const choices = document.querySelectorAll(".logos > img");
const userScoreDisplay = document.querySelector("#user-points");
const AiScoreDisplay = document.querySelector("#Ai-points");
const playAgainButton = document.querySelector(".play-again");

const gameOptions = ["rock", "paper", "scissors"];
let userScore = 0;
let AiScore = 0;

function getUserChoice(option) {
  userHandImg.src = `assets/${option}-hand.png`;
  const AiChoice = getAiChoice();
  AiHandImg.src = `assets/${AiChoice}-hand.png`;
  determineWinner(option, AiChoice);
}

function getAiChoice() {
  const randomIndex = Math.floor(Math.random() * gameOptions.length);
  return gameOptions[randomIndex];
}

function determineWinner(userChoice, AiChoice) {
  if (
    (userChoice === "rock" && AiChoice === "scissors") ||
    (userChoice === "paper" && AiChoice === "rock") ||
    (userChoice === "scissors" && AiChoice === "paper")
  ) {
    userScore++;
  } else if (
    (userChoice === "rock" && AiChoice === "paper") ||
    (userChoice === "paper" && AiChoice === "scissors") ||
    (userChoice === "scissors" && AiChoice === "rock")
  ) {
    AiScore++;
  }

  updateScoreboard();
  checkGameEnd();
}

function updateScoreboard() {
  userScoreDisplay.textContent = userScore;
  AiScoreDisplay.textContent = AiScore;
}

function checkGameEnd() {
  if (userScore === 5) {
    endGame("User");
  } else if (AiScore === 5) {
    endGame("AI");
  }
}

function endGame(winner) {
  playAgainButton.style.visibility = "visible";
  playAgainButton.querySelector("h3").textContent = `${winner} won the game!`;
  choices.forEach(choice => {
    choice.removeEventListener("click", choiceHandler);
  });
}

function choiceHandler(event) {
  const userChoice = event.target.alt;
  getUserChoice(userChoice);
}

choices.forEach(choice => {
  choice.addEventListener("click", choiceHandler);
});

playAgainButton.onclick = () => {
  window.location.href = "./game.html";
};
