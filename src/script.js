"use strict";

function players(name, mark) {
  const playerName = name;
  const playerMoves = [];
  const marker = mark;

  function setMoves(...move) {
    playerMoves.push(move);
  }

  function getMoves() {
    return playerMoves;
  }

  function getMarker() {
    return marker;
  }

  return { playerName, getMarker, setMoves, getMoves };
}


//Creating Players for testing
const player1 = players("player1", "X");
const player2 = players("player2", "O");

function gameBoard() {
  let board = [];
  let activePlayer = player1;

  function createGameBoard() {
    board = [];
    for (let i = 0; i <= 2; i++) {
      board.push([]);
      for (let j = 0; j <= 2; j++) {
        board[i].push(" ");
      }
    }
    player1.getMoves().forEach(([row, column]) => {
      board[row][column] = player1.getMarker();
    });

    player2.getMoves().forEach(([row, column]) => {
      board[row][column] = player2.getMarker();
    });
  }

  function makeMove(row, column) {
    console.log(`Make move ${activePlayer.playerName}`);
    activePlayer.setMoves(row, column);
    createGameBoard();
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function getBoard() {
    return board;
  }

  return { createGameBoard, makeMove, getBoard };
}
