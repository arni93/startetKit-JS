'use strict';

describe('testing game module', function () {

    beforeEach(function () {
        history.xWon = jasmine.createSpy('history.xWon');
        history.oWon = jasmine.createSpy('history.oWon');
        history.wasDraw = jasmine.createSpy('history.wasDraw');
        history.getTimesXWon = jasmine.createSpy('history.getTimesXWon');
        history.getTimesOWon = jasmine.createSpy('history.getTimesOWon');
        history.getTimesWasDraw = jasmine.createSpy('history.getTimesWasDraw');
        alert = jasmine.createSpy('alert() Spy');
        game.resetGame();
    });

    afterEach(function () {
        history.xWon.calls.reset;
        history.oWon.calls.reset;
        history.wasDraw.calls.reset;
        history.getTimesXWon.calls.reset;
        history.getTimesOWon.calls.reset;
        history.getTimesWasDraw.calls.reset;
        alert.calls.reset;
        document.getElementById.calls.reset;
    });


    it('shouldMakeOneMove', function () {
        //given
        var result, dummyElement;
        dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        result = game.makeMove(1, 1);
        // then
        expect(true).toBe(result);
    });
    it('shouldReturnFalseWhenTwoMovesOnSamePositionMade', function () {
        // given
        var firstMoveResult, secondMoveResult, dummyElement;
        dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        // when
        firstMoveResult = game.makeMove(1, 1);
        secondMoveResult = game.makeMove(1, 1)
        // then
        expect(firstMoveResult).toBe(true);
        expect(secondMoveResult).toBe(false);
    });

    it('shouldMakeTwoMovesOnSamePositionWhenWhileResetingBetweenMovesDone', function () {
        // given
        var firstMoveResult, secondMoveResult, dummyElement;
        dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        // when
        firstMoveResult = game.makeMove(1, 1);
        game.resetGame();
        secondMoveResult = game.makeMove(1, 1)
        // then
        expect(firstMoveResult).toBe(true);
        expect(secondMoveResult).toBe(true);
    });

    it('shouldPushChangesToViewWhileDoingMoves', function () {
        //given
        var dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(0, 1);
        //then
        expect(document.getElementById.calls.count()).toEqual(2);
        expect(document.getElementById.calls.argsFor(0)).toEqual(['field0']);
        expect(document.getElementById.calls.argsFor(1)).toEqual(['field1']);
    });
    it('shouldNotPushChangesToViewOnSecondMoveThatMadeOnOccupiedPosition', function () {
        //given
        var dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(0, 0);
        //then
        expect(document.getElementById.calls.count()).toEqual(1);
    });

    it('shouldClearAllNinePositionsInViewWhileReseting', function () {
        //given
        var dummyElement, expectedCount;
        expectedCount = 9;
        dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.resetGame();
        //then
        expect(document.getElementById.calls.count()).toEqual(9);
        expect(document.getElementById.calls.allArgs()).toEqual([['field0'], ['field1'], ['field2'], ['field3'], ['field4'], ['field5'], ['field6'], ['field7'], ['field8']]);
    });

    it('shouldBeWonByPlayerXAndShouldUpdateHistoryAndHistoryView', function () {
        //given
        var dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(1, 0);
        game.makeMove(0, 1);
        game.makeMove(1, 1);
        game.makeMove(0, 2);
        //then
        expect(history.xWon.calls.count()).toBe(1);
        expect(history.oWon.calls.count()).toBe(0);
        expect(history.wasDraw.calls.count()).toBe(0);
        expect(history.getTimesXWon.calls.count()).toBe(1);
        expect(document.getElementById.calls.allArgs()).toContain(['xPlayerWon']);
        expect(history.getTimesOWon.calls.count()).toBe(1);
        expect(document.getElementById.calls.allArgs()).toContain(['oPlayerWon']);
        expect(history.getTimesWasDraw.calls.count()).toBe(1);
        expect(document.getElementById.calls.allArgs()).toContain(['tieQuantity']);
        expect(alert.calls.count()).toEqual(1);
        expect(alert).toHaveBeenCalledWith('Wygrał X');
    });
    it('shouldBeWonByPlayerOAfterPlayerChangeOnBeginingAndShouldUpdateHistoryAndHistoryView', function () {
        //given
        var dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.changeBeginningPlayer();
        game.makeMove(0, 0);
        game.makeMove(1, 0);
        game.makeMove(0, 1);
        game.makeMove(1, 1);
        game.makeMove(0, 2);
        //then
        expect(history.xWon.calls.count()).toBe(0);
        expect(history.oWon.calls.count()).toBe(1);
        expect(history.wasDraw.calls.count()).toBe(0);
        expect(history.getTimesXWon.calls.count()).toBe(1);
        expect(document.getElementById.calls.allArgs()).toContain(['xPlayerWon']);
        expect(history.getTimesOWon.calls.count()).toBe(1);
        expect(document.getElementById.calls.allArgs()).toContain(['oPlayerWon']);
        expect(history.getTimesWasDraw.calls.count()).toBe(1);
        expect(document.getElementById.calls.allArgs()).toContain(['tieQuantity']);
        expect(alert.calls.count()).toEqual(1);
        expect(alert).toHaveBeenCalledWith('Wygrał O');
    });
    it('shouldBeTieAndShouldUpdateHistoryAndHistoryView', function () {
        //given
        var dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(0, 1);
        game.makeMove(0, 2);
        game.makeMove(1, 2);
        game.makeMove(1, 0);
        game.makeMove(2, 0);
        game.makeMove(1, 1);
        game.makeMove(2, 2);
        game.makeMove(2, 1);
        //then
        expect(history.xWon.calls.count()).toEqual(0);
        expect(history.oWon.calls.count()).toEqual(0);
        expect(history.wasDraw.calls.count()).toEqual(1);
        expect(history.getTimesXWon.calls.count()).toEqual(1);
        expect(document.getElementById.calls.allArgs()).toContain(['xPlayerWon']);
        expect(history.getTimesOWon.calls.count()).toEqual(1);
        expect(document.getElementById.calls.allArgs()).toContain(['oPlayerWon']);
        expect(history.getTimesWasDraw.calls.count()).toEqual(1);
        expect(document.getElementById.calls.allArgs()).toContain(['tieQuantity']);
        expect(alert.calls.count()).toEqual(1);
        expect(alert).toHaveBeenCalledWith('Remis');
    });

    it('shouldNotCallHistoryModuleAndAlertWhenGameNotEnded', function () {
        //given
        var dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(0, 1);
        game.makeMove(0, 2);
        game.makeMove(1, 2);
        game.makeMove(1, 0);
        //then
        expect(history.xWon.calls.count()).toEqual(0);
        expect(history.oWon.calls.count()).toEqual(0);
        expect(history.wasDraw.calls.count()).toEqual(0);
        expect(history.getTimesXWon.calls.count()).toEqual(0);
        expect(history.getTimesOWon.calls.count()).toEqual(0);
        expect(history.getTimesWasDraw.calls.count()).toEqual(0);
        expect(alert.calls.count()).toEqual(0);
    });

    it('shouldNotBeAbleToDoMoveOnFreePositionAfterGameWonByX', function () {
        //given
        var result, dummyElement;
        dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(1, 0);
        game.makeMove(0, 1);
        game.makeMove(1, 1);
        game.makeMove(0, 2);
        result = game.makeMove(2,2);
        //then
        expect(result).toEqual(false);
    });
    
    it('shouldBeAbleToDoMoveOnFreePositionAfterGameWonByXAndGameReseted', function() {
        //given
        var result, dummyElement;
        dummyElement = document.createElement('td');
        spyOn(document, "getElementById").and.returnValue(dummyElement);
        //when
        game.makeMove(0, 0);
        game.makeMove(1, 0);
        game.makeMove(0, 1);
        game.makeMove(1, 1);
        game.makeMove(0, 2);
        game.resetGame();
        result = game.makeMove(2,2);
        // then
        expect(result).toEqual(true);
    });
        




})