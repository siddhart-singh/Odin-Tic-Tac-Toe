"use strict";


function gameBoard() {
    let board = [];

    function createGameBoard() {
        for (let i = 0; i <=2 ; i++) {
            board.push([]);
            for (let j = 0 ; j <=2 ; j++) {
                board[i].push([]);
            }
        }
    }
    createGameBoard();
    console.log(board);
}

gameBoard();