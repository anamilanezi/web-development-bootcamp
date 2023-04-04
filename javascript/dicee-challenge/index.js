
function randomDice() {
    return (Math.floor(Math.random() * 6)) + 1;
}

function changeImg(randomNumber) {
    return "images/dice" + randomNumber + ".png"
}

function play() {

    var randomNumber1 = randomDice()
    var player1 = document.querySelector(".img1")
    player1.src = changeImg(randomNumber1)

    var randomNumber2 = randomDice()
    var player2 = document.querySelector(".img2")
    player2.src = changeImg(randomNumber2) 
    
    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").textContent = "Player 1 Wins!"
    } else if (randomNumber1 == randomNumber2) {
        document.querySelector("h1").textContent = "Draw!"
    } else {
        document.querySelector("h1").textContent = "Player 2 Wins!"
    }

}

var throwDice = document.querySelector("button")
throwDice.addEventListener("click", play);

