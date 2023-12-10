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
        activePlayer = switchActivePlayer();
        return winner();
      }
    }
  }

  function getBoard() {
    return board;
  }

  function winner() {
    let winnerFlagCount = 0;
    winningScenario.forEach((scenario) => {
      switchActivePlayer()
        .getMoves()
        .forEach((moved) => {
          scenario.forEach((placement) => {
            if (moved.join() === placement.join()) {
              winnerFlagCount++;
            }
          });
          if (winnerFlagCount === 3) {
            gameFlag = true;
          }
        });
      winnerFlagCount = 0;
    });
    return printWinner();
  }

  function printWinner() {
    if (!gameFlag) {
      return -1;
    } else {
      return `${switchActivePlayer().getName()} WON !!!!!!!!!!!!`;
    }
  }

  function getWinningScenario() {
    return winningScenario;
  }

  function getActivePlayer() {
    return activePlayer;
  }

  return {
    createGameBoard,
    makeMove,
    getBoard,
    getWinningScenario,
    getActivePlayer,
  };
}

function displayController() {
  const game = gameBoard();
  const displayBoard = document.querySelector(".board");
  displayBoard.addEventListener("click", userInput);
  const displayActiveState = document.querySelector(".activeStateDisplay");
  updateActiveState(-1);
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

  function updateActiveState(e) {
    console.log(e);
    let displayOutput = "";
    if (e == -1) {
      displayOutput = `${titleDisplay(
        game.getActivePlayer().getName(),
      )} Play Move`;
    } else {
      displayOutput = titleDisplay(e);
    }
    displayActiveState.innerText = displayOutput;
  }

  function userInput(e) {
    const [row, col] = e.target.dataset.index.split(" ");
    updateActiveState(game.makeMove(row, col));
    generateUiBoard();
  }

  function titleDisplay(str = "") {
    return str
      .split(" ")
      .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
      .join(" ");
  }

  return { generateUiBoard };
}

function gameController() {
  const display = displayController();
  display.generateUiBoard();
}

gameController();
