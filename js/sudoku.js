/**
 * Contains the logic for generating new Sudoku Puzzles
 * Created February 19th, 2020
 */

const IMPOSSIBLE = "IMPOSSIBLE";
const HARD = "HARD";
const MEDIUM = "MEDIUM";
const EASY = "EASY";
const BABY = "BABY";
var sudokuSolution;

function fill_diagonal_matrices(board) {
     for (var i = 0; i < 9; i = i + 3) {
         fill_box(board, i, i)
     }
 }

function fill_box(board, rowIndex, colIndex) {
     var num = 0;
     for (var i = rowIndex; i < rowIndex + 3; i++) {
         for(var j = colIndex; j < colIndex +3; j++) {
             while (!(is_num_valid_in_box(board, rowIndex, colIndex, num))) {
                 num = randomIntFromInterval(1,9);
             }
             board[i][j] = num;
         }
     }
 }

function fill_remaining(board) {
  if (is_board_filled(board)) {
      return true;
  }

  var row = find_empty_spot_on_board(board)[0];
  var col = find_empty_spot_on_board(board)[1];

  for (var num_to_try = 1; num_to_try < 10; num_to_try++) {
    if (is_num_valid_in_box(board,row,col,num_to_try) &&
        is_num_valid_in_row(board[row], num_to_try) &&
        is_num_valid_in_col(board,col,num_to_try)) {
        board[row][col] = num_to_try;
        if (fill_remaining(board)) {
            return true;
        }
        board[row][col] = 0;
    }
  }
  return false;
}

function is_num_valid_in_box(board, rowIndex, colIndex, num) {
    if (Math.floor(rowIndex/3) == 0) {
      rowIndex = 0;
    } else if	( Math.floor(rowIndex/3) ==1) {
      rowIndex = 3;
    } else {
        rowIndex = 6;
    }

    if (Math.floor(colIndex/3) == 0) {
      colIndex = 0;
    } else if	( Math.floor(colIndex/3) ==1) {
      colIndex = 3;
    } else {
        colIndex = 6;
    }

    for (var i = rowIndex; i < rowIndex +3; i++) {
      for (var j = colIndex; j < colIndex +3; j++) {
        if (board[i][j] == num) {
          return false;
        }
      }
    }

    return true;
}

function is_num_valid_in_row(row, num) {
    for(var number = 0; number < row.length; number++) {
      if(row[number] == num) {
        return false;
      }
    }
    return true;
}

function is_num_valid_in_col(board, col, num) {
    for (var row = 0; row < board.length; row++) {
        if (board[row][col] == num)
            return false;
    }
    return true;
}

function is_board_filled(board) {
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }
  return true
}

function find_empty_spot_on_board(board) {
  for (var i = 0; i < board.length; i++) {
    index = board[i].indexOf(0);
    if (index > -1) {
      return [i, index];
    }
  }
}

function createPuzzleFromSolution(boardSolution,difficulty) {
    let numToRemove = 0;
    let counter = 0;
    let numIterations = 0;
    let playerBoard = copyMatrix(boardSolution);
     check = false;
    if( difficulty == IMPOSSIBLE){
        numToRemove = randomIntFromInterval(54,57);
    }
    else if (difficulty == HARD){
        numToRemove = randomIntFromInterval(50,53)
    }
    else if (difficulty == MEDIUM){
        numToRemove = randomIntFromInterval(41,45)
    }
    else if(difficulty == EASY){
        numToRemove = randomIntFromInterval(31,40)
    }
    else {
        numToRemove = randomIntFromInterval(20,25)
    }

    while(counter < numToRemove){
      numIterations++;
      
      if (numIterations > 150) {
        for(let randRow = 0; randRow < 9; randRow++){
          for( let randCol = 0; randCol < 9; randCol++){
            // Line below used for testing
            // console.log("HI");
            let removedNumber = playerBoard[randRow][randCol];
            if (removedNumber ==0){
              continue;
            }
            playerBoard[randRow][randCol] = 0;
            check = isProperandSolvable(playerBoard,boardSolution);
            if (check)
            {
              numIterations = 0;
              counter++;
              break;
            }
            else {
              playerBoard[randRow][randCol] = removedNumber;
            }


          }
          if (check)
            {
              numIterations = 0;
              break;
            }
        }
        if(!check){
          break;
        }
        
        //break;
      }
      
      let randRow = randomIntFromInterval(0,8);
      let randCol = randomIntFromInterval(0,8);
      let removedNumber = playerBoard[randRow][randCol];
      if (removedNumber == 0) {
          continue;
      }

      playerBoard[randRow][randCol] = 0;

      if(isProperandSolvable(playerBoard, boardSolution)) {
          counter++;
          numIterations = 0;
      }
      else {
          playerBoard[randRow][randCol] = removedNumber;
          
      }
    }

    return playerBoard;
}

function isProperandSolvable(playerBoard, solutionBoard) {
  let potentialSolution1 = copyMatrix(playerBoard);
  let potentialSolution2 = copyMatrix(playerBoard);

  fill_remaining(potentialSolution1);
  fill_remaining_from_9_to_1(potentialSolution2);

  if (isBoardSame(potentialSolution1, potentialSolution2) && isBoardSame(potentialSolution1, solutionBoard)) {
    return true;
  }

  return false;
}

function fill_remaining_from_9_to_1(board) {
  if (is_board_filled(board)) {
      return true;
  }

  var row = find_empty_spot_on_board(board)[0];
  var col = find_empty_spot_on_board(board)[1];

  for (var num_to_try = 9; num_to_try > 0; num_to_try--) {
    if (is_num_valid_in_box(board,row,col,num_to_try) &&
        is_num_valid_in_row(board[row], num_to_try) &&
        is_num_valid_in_col(board,col,num_to_try)) {
        board[row][col] = num_to_try;
        if (fill_remaining(board)) {
            return true;
        }
        board[row][col] = 0;
    }
  }
  return false;
}
