var gamePattern = []; //Keeps track of pattern
var buttonColors = ["red", "blue", "green", "yellow"]; // available patterns
var userClickedPattern = []; // keeps track of user pattern
var level = 0; // indicates level
var highScore = 0;
var started = false; // indicates if game is on going


/*
  Event listener for colored buttons
*/
$(".btn").click(function(event){
  if(started === true) { // Only if game is currently running
    var userChosenColour = this.id; // takes id on clicked button from user
    userClickedPattern.push(userChosenColour);  // adds it to userPattern array
    animatePress(userChosenColour); // animation effect
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length -1); // checks if correct pattern
  }
});

/*
  Event listener for go button to start/restart game
*/
$(".goButton").click(function(event){
  if(started === false){ // runs first time of new game only
    nextSequence(); // starts sequence;
    started = true;
    $(".goButton").hide(); // hides go button
  }
});

/*
  checks answer game pattern vs userPattern to see if
  the pattern is followed
*/
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // Checks if user follows game pattern
    if(userClickedPattern.length === gamePattern.length){ // completed pattern
      setTimeout(function() {
        nextSequence(); // wait one second and add to sequence
      },1000);
    }
  }
  else { // failed
    playSound("wrong"); // play wrong sound
    animateGameOver(); // animation for game ended
    $("h1").text("Game Over, Press Restart to Play Again");
    $(".goButton").text("Restart"); //change go -> restart
    startOver() //resets game
  }
}

/*
Plays specific sound for each button
*/
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


/*
Adds next sequence to game Pattern and
*/
function nextSequence() {
  userClickedPattern = []; // clears user pattern
  level++;
  $("h1").text("Level " + level); //update level

  var randomNumber = Math.floor( Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); // add random to color
  playPattern(); // play updated gamePattern to user

}

/*
  Plays complete game pattern for user each level
*/
function playPattern() {
  var i = 0;
  const intervalId = setInterval(function() {
    $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i += 1;
    if (i === gamePattern.length) {
        clearInterval(intervalId);
      }
    }, 1000);
}

/*
  Clears levels and gamePattern
*/
function startOver() {
  if(level > highScore){ // Sets highscore
    highScore = level -1;
    $("h3").text("High Score: " + highScore);
  }
  level = 0;
  gamePattern = [];
  started = false;
  $(".goButton").show();
}

/*
  Indicates the game is over to the user
*/
function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
}

/*
  Animates button clicked effect
*/
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");
  }, 100);

}
