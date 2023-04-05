
function randomDice() {
    return (Math.floor(Math.random() * 6)) + 1;
}

function changeImg(randomNumber) {
    return "images/dice" + randomNumber + ".png"
}

function throwDice(n) {
    var randomNumber = randomDice()
    var player = document.querySelector(".img"+ n)
    player.src = changeImg(randomNumber)
    return randomNumber
}

function gameplay() {

    var player1 = throwDice(1);
    var player2 = throwDice(2);
       
    if (player1 > player2) {
        document.querySelector("h1").textContent = "Player 1 Wins!"
    } else if (player1 == player2) {
        document.querySelector("h1").textContent = "Draw!"
    } else {
        document.querySelector("h1").textContent = "Player 2 Wins!"
    }
}


var play = document.querySelector("button")
play.addEventListener("click", gameplay);

