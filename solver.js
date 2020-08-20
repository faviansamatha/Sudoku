const IMPOSSIBLE = "Impossible";
const HARD = "Hard";
const MEDIUM = "Medium";
const EASY = "Easy";
const BABY = "Baby";

function print_board(board) {
    for(var row = 0; row<board.length; row++) {
        for(var col = 0; col<board[row].length; col++) {
            document.write(board[row][col]);
            document.write(" ")
        }
        document.write("<br>")
    }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max - min+1) + min);
}

function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for (var i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
    }
    return arr;
}

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

function find_zero_on_board(board){
    var temp = [-1,-1];
    for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] == 0){
                temp[0] = i;
                temp[1] = j;
                return temp;
            }
        }
    }
}

function fill_remaining(board) {
    if (is_board_filled(board)) {
        return true;
    }

    var temp = find_zero_on_board(board)
    var row = temp[0]
    var col = temp[1]

    for(var num_to_try = 1; num_to_try <10; num_to_try++) {
        if (is_num_valid_in_box(board,row,col,num_to_try) &&
            is_num_valid_in_row(board[row], num_to_try) &&
            is_num_valid_in_col(board,col,num_to_try)) {
            board[row][col] = num_to_try
            if (fill_remaining(board)) {
                return true
            }
            board[row][col] = 0;
        }
    }
    return false
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

function is_num_valid_in_row(row,num) {
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
      if (board[row][col] == 0) {
        return false;
      }
    }
  }
  return true
}

function is_num_valid_in_box2(board, rowIndex, colIndex, num) {
    let originalRow = rowIndex;
    let originalCol = colIndex;
    if (Math.floor(rowIndex/3) == 0)
        {rowIndex = 0;}
    else if	( Math.floor(rowIndex/3) ==1)
        {rowIndex = 3;}
    else {
        rowIndex = 6;
    }

    if (Math.floor(colIndex/3) == 0)
        {colIndex = 0;}
    else if	( Math.floor(colIndex/3) ==1)
        {colIndex = 3;}
    else {
        colIndex = 6;
    }
    for (var i = rowIndex; i < rowIndex +3; i++)
    {
        for (var j = colIndex; j < colIndex +3; j++)
        {
            if(i == originalRow && j == originalCol){
                continue;
            }
            if (board[i][j] == num)
                {
                    return false;
                }
        }
    }
    return true;


}
function is_num_valid_in_row2(row,num,colIndex)
{
    for(var number = 0; number < row.length; number++){
        if(number == colIndex){
            continue;
        }
        if(row[number] == num)
            {
                return false;
            }

    }
    return true;
}

function is_num_valid_in_col2(board, col, num, rowIndex){

    for (var row = 0; row < board.length; row++)
    {
        if(row == rowIndex){
            continue;
        }
        if (board[row][col] == num)
            return false;

    }
    return true;
}


function isSolution(board){
    if (!is_board_filled(board)){
        return false;
    }

    var isSolution = false;
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if( is_num_valid_in_box2(board, i,j, board[i][j]) &&
                is_num_valid_in_col2(board,j,board[i][j],i) &&
                is_num_valid_in_row2(board[i], board[i][j], j))
                {
                isSolution = true;
            }
            else{
                isSolution = false;
            }
            if(!isSolution){
                break;
            }

        }
        if(!isSolution){
            break;
        }
    }
    return isSolution;
}

function isSolvable(board){
    if (is_board_filled(board)){
        return true;
    }
    let temp = find_zero_on_board(board);
    let row = temp[0];
    let col = temp[1];

    for (let k = 1; k < 10; k++){
        if(is_num_valid_in_box(board,row,col,k) &&
            is_num_valid_in_row(board[row], k) &&
            is_num_valid_in_col(board,col,k)){
            board[row][col] = k
            if(isSolvable(board)){
                return true
            }
            board[row][col] = 0;
        }
    }
    return false;
}

function isSolvable2(board){
    if (is_board_filled(board)){
        return true;
    }
    let temp = find_zero_on_board(board);
    let row = temp[0];
    let col = temp[1];

    for (let k = 9; k > 0; k--){
        if(is_num_valid_in_box(board,row,col,k) &&
            is_num_valid_in_row(board[row], k) &&
            is_num_valid_in_col(board,col,k)){
            board[row][col] = k
            if(isSolvable2(board)){
                return true
            }
            board[row][col] = 0;
        }
    }
    return false;
}

function isBoardSame(board1, board2){
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

function copyMatrix(arr, arrToCopy){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            arr[i][j] = arrToCopy[i][j]
        }
    }
    return arr;
}

function isProperandSolvable(boardPlayer,boardSolution){
    let board1 = makeArray(9,9);
    board1 = copyMatrix(board1, boardPlayer);
    let board2 = makeArray(9,9);
    board2 = copyMatrix(board2, boardPlayer);

    return true;
}

function createPuzzleFromSolution(boardSolution, difficulty) {
    let numToRemove = 0;
    let counter = 0;
    let playerBoard = makeArray(9,9);
    playerBoard = copyMatrix(playerBoard,boardSolution);
    if( difficulty == IMPOSSIBLE){
        numToRemove = randomIntFromInterval(54,59);
    }
    else if (difficulty == HARD){
        numToRemove = randomIntFromInterval(50,53)
    }
    else if (difficulty == MEDIUM){
        numToRemove = randomIntFromInterval(36,49)
    }
    else if(difficulty == EASY){
        numToRemove = randomIntFromInterval(41,45)
    }
    else {
        numToRemove = randomIntFromInterval(20,31)
    }
    while(counter < numToRemove){
        // document.write(counter);
        let randRow = randomIntFromInterval(0,8);
        let randCol = randomIntFromInterval(0,8);
        let removedNumber = playerBoard[randRow][randCol];
        if(removedNumber == 0)
        {
            continue;
        }
        playerBoard[randRow][randCol] =0;

        if(isProperandSolvable(playerBoard,boardSolution)){
            counter++;
        }
        else{
            playerBoard[randRow][randCol] = removedNumber;
        }

        // document.write(randRow)
        // document.write(randCol)
        // document.write(' ')
        // if(playerBoard[randRow][randCol] == 0){
        //     continue;
        // }
        // let removedNumber = playerBoard[randRow][randCol];

        // playerBoard[randRow][randCol] = 0;

        // if(isProperandSolvable(playerBoard,boardSolution)){
        //     playerBoard[randRow][randCol] = 0;
        //     counter++;
        //     // document.write("Test")
        // }
        // else{
        //     playerBoard[randRow][randCol] = removedNumber;
        // }


    }
    // print_board(playerBoard)

    return playerBoard;
}


const board_size = 9;
var board = makeArray(board_size,board_size);
for(var i =0; i < board_size; i++){
    for(var j = 0; j  < board_size; j++){
        board[i][j] =0
    }
}
fill_diagonal_matrices(board)
fill_remaining(board)

// let playerBoard = createPuzzleFromSolution(board,MEDIUM);
//
print_board(board)

// document.write(isProperandSolvable(test2, test))
 // print_board(testPlayer)


// document.write(isSolution(board))


// var test =[
//         [4,9,5,1,2,3,6,8,7],
//         [7,6,8,9,4,5,1,2,3],
//         [3,1,2,6,7,8,9,5,4],
//         [1,5,4,7,9,6,8,3,2],
//         [6,3,7,4,8,2,5,1,9],
//         [2,8,9,5,3,1,7,4,6],
//         [5,7,1,2,6,4,3,9,8],
//         [8,4,6,3,1,9,2,7,5],
//         [9,2,3,8,5,7,4,6,1]


//                     ]


// var test2 =[
//     [4,9,5,1,2,3,6,8,7],
//     [7,6,8,9,4,5,1,2,3],
//     [3,1,2,6,7,8,9,5,4],
//     [1,5,4,7,9,6,8,3,2],
//     [6,3,7,4,8,2,5,1,9],
//     [2,8,9,5,3,1,7,4,6],
//     [5,7,1,2,6,4,3,9,8],
//     [8,4,6,3,1,9,2,7,5],
//     [9,2,3,8,5,7,4,6,1]



//                     ]
// document.write(isBoardSame(test,test2))
    // print_board(test);
    // document.write(is_num_valid_in_row2(test[0],9,1))
    // document.write(is_num_valid_in_col2(test,1,9,0))
    // document.write(is_num_valid_in_box2(test,0,1,9))
    // document.write(isSolution(test));
