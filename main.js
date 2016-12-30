var SAVE_KEY = "save";

var gameState = {
  attemptCounter : 0,
  puzzleValue : ""
};

function init() {
  gameState.puzzleValue = randomFourUniqueFigures();
  saveGameState(gameState); 
}

function makeAttempt() {
  var attemptResult = "";
  var text = "";  
  var attempt = document.getElementById("attempt").value;
  if (isValidValue(attempt)) {
    var gameStateNow = loadGameState();
    attemptResult = checkAttempt(attempt, gameStateNow.puzzleValue);
    gameStateNow.attemptCounter++;
    if (attemptResult === "") {
      document.getElementById("winMessage").innerHTML = "CONGRATULATIONS! YOU HAVE WON THE GAME! ATTEMPTS COUNT "
                                                        + gameStateNow.attemptCounter;
       document.getElementById('btn_attempt').style.visibility = 'hidden';    
       return;                                             
    }
    saveGameState(gameStateNow);
    insertAttemptRow(gameStateNow.attemptCounter, attempt, attemptResult);
  }    
}

function checkAttempt(attempt, puzzleValue) {
  var bullsCounter = 0;
  var cowsCounter = 0;
  var result = "";
  for (var i = 0; i < 4; i++) {
    if (attempt[i] === puzzleValue[i]) {
      bullsCounter++;
    } else {
      if (puzzleValue.includes(attempt[i])) {
        cowsCounter++;
      }
    }
  }
  if (bullsCounter !== 4) {
    result = bullsCounter + " bulls " + cowsCounter + " cows";
  }
  return result;
}

function insertAttemptRow(attemptCounter, attempt, attemptResult) {
  var table = document.getElementById("gameProgressTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = attemptCounter;
  cell2.innerHTML = attempt;
  cell3.innerHTML = attemptResult;
}

function randomFourUniqueFigures() {
  var currentRandomFigure;
  var result = "";
  var figuresArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (var i = 0; i < 4; i++) {
    currentRandomFigure = randomIntegerFromZero(figuresArr.length - 1);
    result += figuresArr[currentRandomFigure];
    figuresArr.splice(currentRandomFigure, 1);
  }
  return result;
}

function randomIntegerFromZero(max) {
  var rand =  Math.random() * (max + 1) - 0.5;
  rand = Math.round(rand);
  return rand;
}

function isValidValue(inputValue) {
  var text = ""; 
  var result = false;
  if (inputValue !== null && 
      inputValue !== undefined &&
      inputValue.search(/\D/) === -1 && 
      new Set(inputValue.split("")).size === 4 ) {
    result = true;
  } else {
    text = "Please enter 4 unique figures";
  }
  document.getElementById("validationMessage").innerHTML = text;
  return result;
}

function saveGameState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadGameState() {
  return JSON.parse(localStorage.getItem(SAVE_KEY));
}