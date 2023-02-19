"use strict";
//Player
const Player = sign => {
  const getSign = () => {
    return sign;
  };

  return { getSign };
}; //Player
//Gameboard
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const setField = (index, sign) => {
    return (board[index] = sign);
  };
  const getField = index => {
    if (index > board.length);
    return board[index];
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  return { setField, getField, reset };
})(); //Gameboard

//Display Controll
const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");
  const messageElement = document.querySelector(".message");
  const restartButton = document.querySelector(".restartBtn");
  fieldElements.forEach(field =>
    field.addEventListener("click", e => {
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
    })
  );

  restartButton.addEventListener("click", e => {
    Gameboard.reset();
    gameController.reset();
    updateGameboard();
    setMessageElement('"Player x\'s turn"');
  });
  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = Gameboard.getField(i);
    }
  };
  const setResultMessage = winner => {
    if (winner === "Draw") {
      setMessageElement("It's a draw!");
    } else {
      setMessageElement(`Player ${winner} has won!`);
    }
  };

  const setMessageElement = message => {
    messageElement.textContent = message;
  };
  return { setResultMessage, setMessageElement };
})(); //Display Controll

//Game Controll
const gameController = (() => {
  const playerX = Player("x");
  const playerO = Player("o");
  let round = 1;
  let isOver = false;

  const playRound = fieldIndex => {
    Gameboard.setField(fieldIndex, getCurrentPlayerSign());
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign());
      isOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultMessage("Draw");
      isOver = true;
      return;
    }
    round++;
    displayController.setMessageElement(
      `Player ${getCurrentPlayerSign()}'s turn`
    );
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };
  const checkWinner = fieldIndex => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter(combination => combination.includes(fieldIndex))
      .some(possibleCombination =>
        possibleCombination.every(
          index => Gameboard.getField(index) === getCurrentPlayerSign()
        )
      );
  };
  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };
  return { playRound, getIsOver, reset };
})(); //Game Controll
