/**
 * Handles the logic for the Game Over modal
 *
 * Created on May 5th, 2020
 */

var gameOverModal = document.getElementById("gameOverModal");
var checkSolutionBtn = document.getElementById("checkSolutionBtn");
var closeBtn = document.getElementById("gameOverCloseBtn");
var gameOverHeader = document.getElementById("gameOverHeader");
var gameOverMessage = document.getElementById("gameOverMessage");

checkSolutionBtn.addEventListener("click", function(e) {
  if (!gameInProgress) {
    e.preventDefault();
  } else {
    checkSolution(sudokuSolution);
  }
});

closeBtn.onclick = function() {
  gameOverModal.style.visibility = "hidden";

  if (!gameInProgress) {
    clearBoard();
  }
}

/**
 * Checks if the solution entered by the user is correct
 * @param  {[type]} solutionBoard The solution to the puzzle
 * @return {[type]}
 */
function checkSolution(solutionBoard) {
  var sudokuBoard = document.getElementById("sudokuBoard");
  gameOverModal.style.visibility = "visible";

  for (var i = 0; i < sudokuBoard.rows.length; i++) {
    for (var j = 0; j < sudokuBoard.rows[i].cells.length; j++) {
      if (sudokuBoard.rows[i].cells[j].innerText != solutionBoard[i][j]) {
        gameOverHeader.innerText = "Wrong solution";
        gameOverMessage.innerText = "But you can keep trying."
        closeBtn.innerText = "Back to Game";
        return false;
      }
    }
  }

  gameOverHeader.innerText = "Puzzle complete";
  gameOverMessage.innerText = "You did it!";
  closeBtn.innerText = "Close";
  gameInProgress = false;
  return true;
}

function timeExpired() {
  gameOverModal.style.visibility = "visible";
  gameOverHeader.innerText = "Time Expired"
  gameOverMessage.innerText = "But you can keep playing if you want."
}
