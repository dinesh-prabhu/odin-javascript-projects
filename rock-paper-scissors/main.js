let playerScore = 0, computerScore = 0;
const GAME_VALUES = ["Paper", "Scissors", "Rock"];

const playerScoreView = document.querySelector("#player-score");
const computerScoreView = document.querySelector("#computer-score");
const gameMessageDiv = document.querySelector("#game-message");
const playerSelectionView = document.querySelector("#player-selection");
const computerSelectionView = document.querySelector("#computer-selection");

const playerButtons = document.querySelectorAll(".player-btn");
playerButtons.forEach(playerButton => playerButton.addEventListener("click", playerMoveListener));

function checkAndDisplayWinner() {
    if(playerScore == 5) {
        alert("Player wins this game!");
        window.location.reload();
    } else if(computerScore == 5) {
        alert("Computer wins this game!");
        window.location.reload();
    }
}

function playerMoveListener(event) {
    let computerSelection = computerPlay();
    gameMessageDiv.textContent = playRound(event.target.getAttribute("data-value"), computerSelection);
    playerScoreView.textContent = playerScore;
    computerScoreView.textContent = computerScore;
    playerSelectionView.textContent = event.target.textContent;
    computerSelectionView.textContent = document.querySelector(`.player-btn[data-value="${computerSelection}"]`).textContent;
    setTimeout(checkAndDisplayWinner, 10);
}

function computerPlay() {
    let randomIndex = Math.floor(Math.random() * GAME_VALUES.length);
    return GAME_VALUES[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    let playerValueIndex = GAME_VALUES.indexOf(playerSelection),
        computerValueIndex = GAME_VALUES.indexOf(computerSelection),
        resultString;
    switch(playerValueIndex - computerValueIndex) {
        case 0:
            resultString = "No points! " + playerSelection + " can't beat " + computerSelection + ".";
            break;
        case 1:
        case -2:
            resultString = "You win! " + playerSelection + " beats " + computerSelection + ".";
            playerScore++;
            break;
        default:
            resultString = "You lose! " + computerSelection + " beats " + playerSelection + ".";
            computerScore++;
    }
    return resultString;
}