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
            var gameResult, pushBoardChangesToView, changeCurrentPlayer, alertGameResult, updateHistory, pushHistoryToView;
            pushBoardChangesToView = function (movePosition) {
                var htmlNode;
                htmlNode = document.getElementById('field' + movePosition)
                if (htmlNode != null) {
                    htmlNode.innerText = currentPlayer;
                    htmlNode.className = ('player_' + currentPlayer.toLowerCase());
                }
            };
            changeCurrentPlayer = function () {
                if (currentPlayer == player1) {
                    currentPlayer = player2;
                }
                else {
                    currentPlayer = player1;
                }
            };
            alertGameResult = function (gameResult) {
                if (gameResult == 'X') {
                    alert('Wygrał X');
                }
                else if (gameResult == 'O') {
                    alert('Wygrał O');
                }
                else {
                    alert('Remis');
                }
            };
            updateHistory = function(whoWon){
                if (whoWon == 'X'){
                    history.xWon();
                }
                else if (whoWon == 'O'){
                    history.oWon();
                }
                else{
                    history.wasDraw();
                }
            };
            pushHistoryToView = function(){
                document.getElementById('xPlayerWon').value = history.getTimesXWon();
                document.getElementById('oPlayerWon').value = history.getTimesOWon();
                document.getElementById('tieQuantity').value = history.getTimesWasDraw();
            }

            if (!gameEnded) {
                if (!wasMoveBefore) {
                    currentPlayer = beginningPlayer;
                }
                var position;
                position = x * 3 + y;
                if (board[position].sign == '') {
                    board[position].sign = currentPlayer;
                    pushBoardChangesToView(position);
                    changeCurrentPlayer();
                    wasMoveBefore = true;
                    if (winnerChecker.isGameEnded(board)) {
                        gameEnded = true;
                        gameResult = winnerChecker.getGameResult(board);
                        alertGameResult(gameResult);
                        //update history
                        updateHistory();
                        pushHistoryToView();
                    }
                }
                return result;
            }

        },
        resetGame: function () {
            var iter, clearGameView, htmlElement;
            clearGameView = function () {
                for (iter = 0; iter < board.length; iter++) {
                    board[iter].sign = '';
                    htmlElement = document.getElementById('field' + iter);
                    if (htmlElement != null) {
                        htmlElement.innerText = '';
                    }
                }
            };
            clearGameView();
            wasMoveBefore = false;
            gameEnded = false;
        },
        changeBeginningPlayer: function () {
            var htmlElement;
            if (beginningPlayer == player1) {
                beginningPlayer = player2;
            }
            else {
                beginningPlayer = player1;
            }

            htmlElement = document.getElementById('beginningPlayerButton');
            if (htmlElement != null) {
                htmlElement.value = 'Nową grę rozpocznie gracz ' + beginningPlayer;
            }
        }
    }
})();
