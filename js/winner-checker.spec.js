'use strict';

describe('winnerChecker module tests', function () {
    var playerX, playerO;
    playerX = 'X';
    playerO = 'O';
    it('shouldReturnGameEndedWhenGameWonByPlayerX', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: playerO },
            { sign: '' },
        ];
        //when
        result = winnerChecker.isGameEnded(array);
        //then
        expect(result).toBe(true);
    });
    it('shouldReturnGameEndedWhenGameWonByPlayerO', function () {
        //given
        var array, result;
        array = [
            { sign: '' },
            { sign: '' },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: playerO },
        ];
        //when
        result = winnerChecker.isGameEnded(array);
        //then
        expect(result).toBe(true);
    });
    it('shouldReturnGameEndedWhenGameWonByPlayerX', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: playerX },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: playerX },
        ];
        //when
        result = winnerChecker.isGameEnded(array);
        //then
        expect(result).toBe(true);
    });
    it('shouldReturnGameEndedWhenEndedWithTie', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: playerO },
            { sign: playerO },
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: playerX }
        ];
        //when
        result = winnerChecker.isGameEnded(array);
        //then
        expect(result).toBe(true);
    });
    it('shouldReturnGameNotEndedForBeginningState', function () {
        //given
        var array, result;
        array = [
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' }
        ];
        //when
        result = winnerChecker.isGameEnded(array);
        //then
        expect(result).toBe(false);
    });
    it('shouldReturnGameNotEndedForGivenState', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' }
        ];
        //when
        result = winnerChecker.isGameEnded(array);
        //then
        expect(result).toBe(false);
    });


    it('shouldReturnXWhenGameWonByPlayerX', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: playerO },
            { sign: '' },
        ];
        //when
        result = winnerChecker.getGameResult(array);
        //then
        expect(result).toBe(playerX);
    });

    it('shouldReturnOWhenGameWonByPlayerO', function () {
        //given
        var array, result;
        array = [
            { sign: '' },
            { sign: '' },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: playerO },
        ];
        //when
        result = winnerChecker.getGameResult(array);
        //then
        expect(result).toBe(playerO);
    });
    it('shouldReturnXWhenGameWonByPlayerX', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: playerX },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: playerX },
        ];
        //when
        result = winnerChecker.getGameResult(array);
        //then
        expect(result).toBe(playerX);
    });
    it('shouldReturnEmptyFieldWhenEndedWithTie', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: playerO },
            { sign: playerO },
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: playerX }
        ];
        //when
        result = winnerChecker.getGameResult(array);
        //then
        expect(result).toBe('');
    });
    it('shouldReturnEmptyFieldWhenGameNotEnded', function () {
        //given
        var array, result;
        array = [
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' }
        ];
        //when
        result = winnerChecker.getGameResult(array);
        //then
        expect(result).toBe('');
    });
    it('shouldReturnEmptyFieldForGivenState', function () {
        //given
        var array, result;
        array = [
            { sign: playerX },
            { sign: playerX },
            { sign: playerO },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' },
            { sign: '' }
        ];
        //when
        result = winnerChecker.getGameResult(array);
        //then
        expect(result).toBe('');
    });
})