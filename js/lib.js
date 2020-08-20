/**
 * Library for useful functions
 * Created February 18th, 2020
 *
 */

/**
 * Test Function
 *
 */
function hello() {
  alert("hello");
}

/**
 * Returns a random Integer between min and max inclusively
 * @param  {[int]} min
 * @param  {[int]} max
 * @return {[int]}
 *
 */
function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max - min+1) + min);
}

/**
 * Generates the Completed Sudoku Solution
 * @return {[2D array]} Double array Containing the solution
 *
 */
const generateSudokuSolution = () => {
  var board = new Array(9);

  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(9);
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = 0;
    }
  }

  fill_diagonal_matrices(board);
  fill_remaining(board);

  sudokuSolution = board;
  return board;
}

/**
 * Populates the HTML table with the sudoku game
 * @param  {[2D array]} board
 *
 */
function populateHTMLBoard(board) {
  var sudokuBoard = document.getElementById("sudokuBoard");

  for (var i = 0; i < sudokuBoard.rows.length; i++) {
    for (var j = 0; j < sudokuBoard.rows[i].cells.length; j++) {
      if (board[i][j] == 0) {
        sudokuBoard.rows[i].cells[j].innerHTML = "";
        sudokuBoard.rows[i].cells[j].contentEditable = "true";
      } else {
        sudokuBoard.rows[i].cells[j].innerHTML = "<strong>" + board[i][j] + "</strong>";
        sudokuBoard.rows[i].cells[j].contentEditable = "false";
      }

      // add event listener to the cells so that characters and multiple digits can be disabled
      sudokuBoard.rows[i].cells[j].addEventListener("keypress", function(e) {
        disableCharacters(e);
        disableMultipleDigits(e, this.innerHTML);
      });
    }
  }
}

/**
 * Makes a copy of a 2D array
 * @param  {[2D array]} arrToCopy
 * @return {[2D array]}
 */
function copyMatrix(arrToCopy){
  var newArray = new Array(9)
  for(let i = 0; i < newArray.length; i++){
    newArray[i] = arrToCopy[i].slice();
  }

  return newArray;
}

/**
 * Returns true if two boards are the same, false if different
 * @param  {2D array}  board1 first board to be compared
 * @param  {2D array}  board2 second board to be compared
 * @return {Boolean}
 */
function isBoardSame(board1, board2) {
  let flag = true;
    for (let i = 0; i < board1.length; i++){
      for(let j = 0; j < board2.length; j++){
          if(board1[i][j] != board2[i][j]){
              flag = false;
              break;
          }
      }
      if(!flag){
          break;
      }
    }

  return flag;
}

/**
 * disables characters (and the digit 0) in table cells
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function disableCharacters(event) {
  if (event.keyCode < 49 || event.keyCode > 57) {
    event.preventDefault();
    return false;
  }
  return true;
}

/**
 * disable multiple digit inputs in table cells
 * @param  {[type]} event [description]
 * @param  {[string]} text  the content already in the table cell
 * @return {[type]}       [description]
 */
function disableMultipleDigits(event, text) {
  if (text.length >= 1) {
    event.preventDefault();
    return false;
  }

  return true;
}

function seeSolution(solutionBoard) {
  var sudokuBoard = document.getElementById("sudokuBoard");

  for (var i = 0; i < sudokuBoard.rows.length; i++) {
    for (var j = 0; j < sudokuBoard.rows[i].cells.length; j++) {
      sudokuBoard.rows[i].cells[j].innerHTML = solutionBoard[i][j];
    }
  }
}

function clearBoard() {
  var sudokuBoard = document.getElementById("sudokuBoard");

  for (var i = 0; i < sudokuBoard.rows.length; i++) {
    for (var j = 0; j < sudokuBoard.rows[i].cells.length; j++) {
      sudokuBoard.rows[i].cells[j].innerHTML = "";
      sudokuBoard.rows[i].cells[j].contentEditable = "false";
    }
  }

  header.innerText = "Hello There";
  gameInProgress = false;
}
