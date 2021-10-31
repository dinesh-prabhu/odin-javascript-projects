const GAME_VALUES = ["Paper", "Scissors", "Rock"];

function computerPlay() {
    let randomIndex = Math.floor(Math.random() * GAME_VALUES.length);
    return GAME_VALUES[randomIndex];
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    let playerValueIndex = GAME_VALUES.indexOf(capitalizeFirstLetter(playerSelection));
    if(playerValueIndex == -1) {
        return "Invalid value! Try again.";
    }
    let resultString;
    let computerValueIndex = GAME_VALUES.indexOf(computerSelection);
    switch(playerValueIndex - computerValueIndex) {
        case 0:
            resultString = "No points! " + playerSelection + " can't beat " + computerSelection + ".";
            break;
        case 1:
        case -2:
            resultString = "You win! " + playerSelection + " beats " + computerSelection + ".";
            break;
        default:
            resultString = "You lose! " + computerSelection + " beats " + playerSelection + ".";
    }
    return resultString;
}

function game() {
    let playerScore = 0, computerScore = 0;
    console.log("5 rounds of this game starts now.");

    for(let i = 0; i < 5; i++) {
        let playerValue = prompt("Enter your selection value:") ?? "";
        let resultString = playRound(playerValue, computerPlay());

        if(resultString.indexOf("win") != -1) {
            playerScore++;
        } else if(resultString.indexOf("lose") != -1) {
            computerScore++;
        } else if(resultString.indexOf("Invalid") != -1) {
            i--;
        }
        
        console.log(resultString);
    }

    if(playerScore > computerScore) {
        return "Player wins this game!";
    } else if(playerScore < computerScore) {
        return "Computer wins this game!";
    }
    return "This game ends in a tie!";
}

console.log(game());