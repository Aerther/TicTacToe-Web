// HTML elements
const boardButtons = document.getElementsByClassName("board-button");
const changeDiv = document.getElementById("change-div");
const X_score = document.getElementById("x-score");
const O_score = document.getElementById("o-score");

// Program variables
const casesWin = [["TL", "TM", "TR"], ["ML", "MM", "MR"], ["BL", "BM", "BR"], ["TL", "ML", "BL"], ["TM", "MM", "BM"], ["TR", "MR", "BR"], ["TL", "MM", "BR"], ["TR", "MM", "BL"]];
const turn = {0:"X", 1:"O"};
const colors = {0:"#ff0000", 1:"#0000ff"};
const scores = {0: 0, 1: 0};
var activePlayer = 0;
var firstPlayer = activePlayer;
var turns = 0;

// Add events
for(let i = 0; i < boardButtons.length; i++) {
    boardButtons.item(i).addEventListener("click", handleButtonClick)
}

function handleButtonClick(e) {
    if(e.target.textContent != "") {
        alert("Espaço Ocupado");
        return;
    }

    e.target.textContent = turn[activePlayer];
    e.target.style.backgroundColor = colors[activePlayer];

    if(checkWinner()) {
        resetGame(`${turn[activePlayer]} won the game`);
        scores[activePlayer] += 1;
    }
    else if(checkDrawn()) {
        resetGame("It's a drawn");
    } else {
        activePlayer = activePlayer == 0 ? 1 : 0;
        turns += 1;
    }

    updateScore();
    updateChangeDiv();
}

function updateChangeDiv() {
    changeDiv.style.backgroundColor = colors[activePlayer];
    changeDiv.textContent = turn[activePlayer];
}

function updateScore() {
    X_score.textContent = "X: " + scores[0];
    O_score.textContent = "O: " + scores[1];
}

function checkDrawn() {
    return turns == 8 ? true : false;
}

function checkWinner() {
    for (let i = 0; i < casesWin.length; i++) {
        firstChar = boardButtons.namedItem(casesWin[i][0]).textContent;
        secondChar = boardButtons.namedItem(casesWin[i][1]).textContent;
        thirdChar = boardButtons.namedItem(casesWin[i][2]).textContent;

        if(firstChar == secondChar && secondChar == thirdChar && firstChar != "") {
            return true;
        }
    }

    return false;
}

function resetGame(message) {
    firstPlayer = firstPlayer == 0 ? 1 : 0;
    activePlayer = firstPlayer;
    turns = 0;

    alert(message);

    for(let i = 0; i < boardButtons.length; i++) {
        boardButtons.item(i).textContent = "";
        boardButtons.item(i).style.backgroundColor = "lightgrey";
    }
}