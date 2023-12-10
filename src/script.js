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

  function getName() {
    return playerName;
  }

  return { getName, getMarker, setMoves, getMoves };
}

const player1 = players("player1", "X");
const player2 = players("player2", "O");

function gameBoard() {
  let gameFlag = false;
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
      board[row][column] = player1.getMarker();
    });

    player2.getMoves().forEach(([row, column]) => {
      board[row][column] = player2.getMarker();
    });
  }

  function switchActivePlayer() {
    return activePlayer === player1 ? player2 : player1;
  }

  function makeMove(row, column) {
    let duplicateFlag = false;
    if (!gameFlag) {
      console.log(`Make move ${activePlayer.getName()}`);
      switchActivePlayer()
        .getMoves()
        .forEach((move) => {
          if (move.join() == [row, column].join()) {
            duplicateFlag = true;
          }
        });
      if (!duplicateFlag) {
        activePlayer.setMoves([row, column]);
        createGameBoard();
        winner();
        activePlayer = switchActivePlayer();
      }
    }
  }

  function getBoard() {
    return board;
  }

  function winner() {
    let winnerFlagCount = 0;
    winningScenario.forEach((scenario) => {
      activePlayer.getMoves().forEach((moved) => {
        scenario.forEach((placement) => {
          if (moved.join() === placement.join()) {
            winnerFlagCount++;
          }
        });
        if (winnerFlagCount === 3) {
          printWinner();
          gameFlag = true;
        }
      });
      winnerFlagCount = 0;
    });
    return -1;
  }

  function printWinner() {
    console.log(`${activePlayer.getName()} WON !!!!!!!!!!!!`);
  }

  function getWinningScenario() {
    return winningScenario;
  }

  return { createGameBoard, makeMove, getBoard, getWinningScenario };
}

function displayController() {
  const game = gameBoard();
  const displayBoard = document.querySelector(".board");
  displayBoard.addEventListener("click", userInput);

  function createButton(row, col) {
    const button = document.createElement("button");
    button.innerText = game.getBoard()[row][col];
    button.setAttribute("type", "button");
    button.classList.add("board-btn");
    button.setAttribute("data-index", `${row} ${col}`);
    return button;
  }

  function generateUiBoard() {
    game.createGameBoard();
    displayBoard.innerText = "";
    const receiveGameBoard = game.getBoard();
    receiveGameBoard.forEach((row, indexRow) => {
      row.forEach((col, indexCol) => {
        displayBoard.appendChild(createButton(indexRow, indexCol));
      });
    });
  }

  function userInput(e) {
    const [row, col] = e.target.dataset.index.split(" ");
    game.makeMove(row, col);
    generateUiBoard();
  }

  generateUiBoard();
}

displayController();
