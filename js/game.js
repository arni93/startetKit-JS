"use strict"
var game = (function () {
    var board, beginningPlayer, player1, player2, currentPlayer, Move, wasMoveBefore, gameEnded;
    player1 = 'X';
    player2 = 'O';
    beginningPlayer = player1;
    currentPlayer = player1;
    wasMoveBefore = false;
    gameEnded = false;

    Move = function (x, y, sign) {
        this.x = x;
        this.y = y;
        this.sign = sign;
    };
    board = [
        new Move(0, 0, ''),
        new Move(0, 1, ''),
        new Move(0, 2, ''),
        new Move(1, 0, ''),
        new Move(1, 1, ''),
        new Move(1, 2, ''),
        new Move(2, 0, ''),
        new Move(2, 1, ''),
        new Move(2, 2, '')
    ];
    return {
        makeMove: function (x, y) {
            var gameResult;
            if (!gameEnded) {
                if (!wasMoveBefore) {
                    currentPlayer = beginningPlayer;
                }
                var result, position;
                position = x * 3 + y
                result = false;
                if (board[position].sign == '') {
                    board[position].sign = currentPlayer;
                    document.getElementById('field' + position).value = currentPlayer;
                    if (currentPlayer == player1) {
                        currentPlayer = player2;
                    }
                    else {
                        currentPlayer = player1;
                    }
                    wasMoveBefore = true;
                    result = true;
                    if (winnerChecker.isGameEnded(board)) {
                        gameEnded = true;
                        gameResult = winnerChecker.getGameResult(board);
                        if (gameResult == 'X') {
                            alert('Wygrał x');
                        }
                        else if (gameResult == 'O') {
                            alert('Wygrał o');
                        }
                        else {
                            alert('Remis');
                        }
                    }
                }
                return result;
            }
            
        },
        resetGame: function () {
            var iter;
            for (iter = 0; iter < board.length; iter++) {
                board[iter].sign = '';
                document.getElementById('field' + iter).value = '';
            }
            wasMoveBefore = false;
            gameEnded = false;
        },
        changeBeginningPlayer: function () {
            if (beginningPlayer == player1) {
                beginningPlayer = player2;
            }
            else {
                beginningPlayer = player1;
            }
            document.getElementById('beginningPlayerLabel').innerText = 'Nową grę rozpocznie ' + beginningPlayer;
        }
    }
})();
