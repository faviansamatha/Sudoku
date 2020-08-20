from random import randint
from math import floor

def print_board(board):
    for row in board:
        print(row)

def fill_diagonal_matrices(board):
    for i in range(0, 9, 3):
        fill_box(board, i, i)

def fill_box(board, rowIndex, colIndex):
    num = 0
    for i in range(rowIndex, rowIndex+3):
        for j in range(colIndex, colIndex+3):
            while not is_num_valid_in_box(board, rowIndex, colIndex, num):
                num = randint(1, 9)
            board[i][j] = num

def fill_remaining(board):
    if is_board_filled(board):
        return True

    for i in range(len(board)):
        for j in range(len(board[i])):
            flag = False
            if board[i][j] == 0:
                row = i
                col = j
                flag = True
                break
        if flag:
            break

    for num_to_try in range(1, 10):
        if is_num_valid_in_box(board, row, col, num_to_try) and is_num_valid_in_row(board[i], num_to_try) and is_num_valid_in_col(board, col, num_to_try):
            board[row][col] = num_to_try
            if fill_remaining(board):
                return True
            board[row][col] = 0

    return False

def is_num_valid_in_box(board, rowIndex, colIndex, num):
    if floor(rowIndex/3) == 0:
        rowIndex = 0
    elif floor(rowIndex/3) == 1:
        rowIndex = 3
    else:
        rowIndex = 6
    if floor(colIndex/3) == 0:
        colIndex = 0
    elif floor(colIndex/3) == 1:
        colIndex = 3
    else:
        colIndex = 6

    for i in range(rowIndex, rowIndex+3):
        for j in range(colIndex, colIndex+3):
            if board[i][j] == num:
                return False
    return True

def is_num_valid_in_row(row, num):
    for number in row:
        if number == num:
            return False
    return True

def is_num_valid_in_col(board, col, num):
    for row in board:
        if row[col] == num:
            return False
    return True

def is_board_filled(board):
    for row in board:
        for col in row:
            if col == 0:
                return False
    return True

board = []

for i in range(9):
    board.append([0]*9)

fill_diagonal_matrices(board)
if fill_remaining(board):
    print_board(board)
else:
    print("Something went wrong")
