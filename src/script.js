"use strict";

function players(name, mark) {
  const playerName = name;
  const playerMoves = [];
  const marker = mark;

  function setMoves(move) {
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

const player1 = players("player1", "X");
const player2 = players("player2", "O");
function gameBoard() {
  let board = [];
  let activePlayer = player1;
  let winningScenario = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 2],
      [0, 1],
      [1, 1],
    ],

    [
      [0, 2],
      [1, 2],
      [1, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [1, 0],
      [0, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 2],
      [2, 2],
      [2, 1],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],

    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [1, 1],
    ],
    [
      [2, 0],
      [1, 0],
      [1, 1],
    ],

    [
      [2, 1],
      [2, 0],
      [1, 0],
    ],

    [
      [2, 2],
      [1, 2],
      [1, 1],
    ],

    [
      [2, 2],
      [2, 1],
      [1, 1],
    ],
  ];

  function createGameBoard() {
    board = [];
    for (let i = 0; i <= 2; i++) {
      board.push([]);
      for (let j = 0; j <= 2; j++) {
        board[i].push(" ");
      }
    }
    player1.getMoves().forEach(([row, column]) => {
      console.log(board[row][column]);
      board[row][column] = player1.getMarker();
    });

    player2.getMoves().forEach(([row, column]) => {
      board[row][column] = player2.getMarker();
    });
  }

  function makeMove(row, column) {
    console.log(`Make move ${activePlayer.playerName}`);
    activePlayer.setMoves([row, column]);
    createGameBoard();
    winner()
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function getBoard() {
    return board;
  }

  function winner() {
    let winnerFlagCount = 0;;
    winningScenario.forEach(scenario => {
      activePlayer.getMoves().forEach(moved => {
        scenario.forEach(placement => {
          if(moved.join() === placement.join()) {
            winnerFlagCount++;
          }
        })
        if (winnerFlagCount === 3) {
          printWinner();
        }
      })
      winnerFlagCount = 0;
    })
    return -1;
  }

  function printWinner() {
    console.log(`${activePlayer.name} WON !!!!!!!!!!!!`);
  }

  function getWinningScenario() {
    return winningScenario;
  }

  return { createGameBoard, makeMove, getBoard, getWinningScenario };
}
