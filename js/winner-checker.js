"use strict"
var winnerChecker = (function () {
    var hasPlayerWon;
    hasPlayerWon = function (movesArray, playerSign) {
        var rows, cols, position, areOtherSigns;
        for (rows = 0; rows < 3; rows++) {
            areOtherSigns = false;
            for (cols = 0; cols < 3; cols++) {
                position = rows * 3 + cols;
                if (movesArray[position].sign != playerSign) {
                    areOtherSigns = true;
                }
            }
            if (areOtherSigns == false) {
                return true;
            }
        }
        for (cols = 0; cols < 3; cols++) {
            areOtherSigns = false;
            for (rows = 0; rows < 3; rows++) {
                position = rows * 3 + cols;
                if (movesArray[position].sign != playerSign) {
                    areOtherSigns = true;
                }
            }
            if (areOtherSigns == false) {
                return true;
            }
        }
        if (movesArray[0].sign == playerSign && movesArray[4].sign == playerSign && movesArray[8].sign == playerSign) {
            return true;
        }
        if (movesArray[6].sign == playerSign && movesArray[4].sign == playerSign && movesArray[2].sign == playerSign) {
            return true;
        }
    };
    return {
        isGameEnded: function (movesArray) {
            var iter;
            if (hasPlayerWon(movesArray, 'X')) {
                return true;
            }
            if (hasPlayerWon(movesArray, 'O')) {
                return true;
            }
            for (iter = 0; iter < movesArray.length; iter++) {
                if (movesArray[iter].sign == '') {
                    return false;
                }
            }
            return true;
        },
        getGameResult : function (movesArray){
            var result = '';
            if (hasPlayerWon(movesArray, 'X')) {
                result = 'X';
            }
            if (hasPlayerWon(movesArray, 'O')) {
                result = 'O';
            }
            return result;
        }
    }
})();