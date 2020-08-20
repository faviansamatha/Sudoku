/**
 * Handles the Logic for the game modes modal
 *
 * Created on April 27th, 2020
 *
 */

var timer;
var modal = document.getElementById("startGameModal");

var btn = document.getElementById("newGame");
var close = document.getElementsByClassName("close")[0];
var close2 = document.getElementsByClassName("close")[1];

var difficultyBtn = document.getElementById("difficultyButton");
var gameModeModal = document.getElementById("game-mode-modal");
var gameDifficultyModal = document.getElementById("game-difficulty-modal")

var gameInProgress = false;

difficultyBtn.onclick = function(){
  gameModeModal.style.visibility = "hidden";
  gameDifficultyModal.style.visibility = "visible";
}

btn.onclick = function() {
  modal.style.visibility = "visible";
  gameDifficultyModal.style.visibility = "hidden";
  gameModeModal.style.visibility="visible";
}

close.onclick = function() {
  modal.style.visibility = "hidden";
  gameDifficultyModal.style.visibility = "hidden";
  gameModeModal.style.visibility = "hidden";
}

close2.onclick = function() {
  modal.style.visibility = "hidden";
  gameDifficultyModal.style.visibility = "hidden";
  gameModeModal.style.visibility = "hidden";
}
var modes = document.getElementsByClassName("game-mode-icon");
var gameMode = "casual";

for (i = 0; i < modes.length; i++) {
  modes[i].addEventListener("change", function(e) {
    changeGameModeDescription(e);
  });
}

function changeGameModeDescription(event) {
  var description = document.getElementById("gameModeDescription");
  gameMode = event.path[0].value;

  if (event.path[0].value == "casual") {
    description.innerText = "No Time Limit. Just a casual game of sudoku.";
  } else {
    description.innerText = "10 minutes to solve the puzzle. Are you up for the challenge?";
  }
}

var modes2 = document.getElementsByClassName("game-mode-difficulty");
var gameDifficulty = "MEDIUM";

for( i = 0; i < modes2.length; i++){
  modes2[i].addEventListener("change",function(e) {
    changeGameDifficultyDescription(e);
  })
}
function changeGameDifficultyDescription(event) {
  var description = document.getElementById("gameDifficultyDescription");
  gameDifficulty = event.path[0].value;

  if (event.path[0].value == "BABY") {
    description.innerText = "You're still learning how to play";
  } 
  else if (event.path[0].value == "EASY"){
    description.innerText = "You want an easier game";
  }
  else if (event.path[0].value == "MEDIUM"){
    description.innerText = "You want a regular Sudoku game";
  }
  else if (event.path[0].value == "HARD"){
    description.innerText = "You seek a challenge";
  }
  else{
    description.innerText = "You're never going to win";
  }
}

function startGame(gameMode,gameDifficulty) {
  modal.style.visibility = "hidden";
  gameDifficultyModal.style.visibility = "hidden";
  gameModeModal.style.visibility = "hidden";

  header = document.getElementById("header");

  clearInterval(timer);

  if(gameMode == "casual"){
    header.innerText = gameMode;
  } else {
    header.innerText = "10:00";

    var end = new Date(Date.now() + 600000).getTime();
    timer = setInterval(countdown, 100, end, header);
  }

  populateHTMLBoard(createPuzzleFromSolution(generateSudokuSolution(),gameDifficulty));
  gameInProgress = true;
}

function countdown(end, header){
  var now = new Date().getTime();

  var length = end - now;

  var minutes = Math.floor((length % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((length % (1000 * 60)) / 1000);

  if (seconds < 10) {seconds = "0" + seconds;}
  header.innerText = minutes + ":" + seconds;

  if (length < 0) {
      clearInterval(timer);
      header.innerText = "TIME EXPIRED";
      timeExpired();
  }
}
