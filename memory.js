const EASY = 12;
const MEDIUM = 16;
const HARD = 20;

let flippedCards = 0;
let card1 = "";
let card2 = "";
let winCondition = 0;
let turn = 1;

let player1 = { name: "", score: 0 };
let player2 = { name: "", score: 0 };

function wins() {
  if (player1.score + player2.score == winCondition / 2) {
    if (player1.score > player2.score) {
      alert(player1.name == "" ? "Player 1 WINS!" : `${player1.name} WINS!!`);
    } else if (player1.score < player2.score) {
      alert(player2.name == "" ? "Player 2 WINS!" : `${player2.name} WINS!!`);
    } else {
      alert("It's a DRAW !!");
    }
  }
}
function names() {
  player1.name = document.getElementById("player1").value;
  player1.score = document.getElementById('player1Score');
  player2.name = document.getElementById("player2").value;
  player2.score = document.getElementById('player2Score');
}

function selectDifficult(diff) {
  switch (diff) {
    case "easy":
      createBoard(EASY);
      winCondition = EASY;
      break;
    case "medium":
      createBoard(MEDIUM);
      winCondition = MEDIUM;
      break;
    case "hard":
      createBoard(HARD);
      winCondition = HARD;
      break;
  }
  showBoard();
  names();
}

function showBoard() {
  let menu = document.getElementById("menu");
  menu.style.display = "none";
}

function addNumbers(num) {
  //Create a duplicate numbers array
  let randomArray = [];
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < num / 2; i++) {
      randomArray.push(i);
    }
  }
  //sort unordened array
  return randomArray.sort(() => {
    return Math.random() - 0.5;
  });
}

function createBoard(num) {
  let value = addNumbers(num);
  for (let i = 0; i < num; i++) {
    let card = document.createElement("button");
    card.classList.add("card");
    card.innerHTML = value[i];
    card.id = i;
    card.addEventListener("click", () => {
      flip(card.id);
    });
    let mainBoard = document.getElementById("board");
    mainBoard.appendChild(card);
  }
}

function flip(id) {
  flippedCards++;

  if (flippedCards == 1) {
    let c1 = document.getElementById(id);
    c1.classList.replace("card", "flipped");
    c1.disabled = true;
    card1 = c1;
  }

  if (flippedCards == 2) {
    let c2 = document.getElementById(id);
    c2.classList.replace("card", "flipped");
    c2.disabled = true;
    card2 = c2;
    return compare();
  }
}
function compare() {
  if (card1.innerHTML == card2.innerHTML) {
    card1.classList.replace("flipped", "success");
    card2.classList.replace("flipped", "success");
    card1.disabled = false;
    card2.disabled = false;
    flippedCards = 0;
    points();
  } else {
    card1.classList.replace("flipped", "card");
    card2.classList.replace("flipped", "card");
    card1.disabled = false;
    card2.disabled = false;
    flippedCards = 0;
    switchTurn();
  }
  console.log(turn, player1, player2);
  wins();
}

function points() {
  if (turn == 1) {
    player1.score++;
  } else if (turn == 2) {
    player2.score++;
  }
}

function switchTurn() {
  let t1 = document.getElementById("player1");
  let t2 = document.getElementById("player2");
  if (turn == 1) {
    turn = 2;
    t2.style.backgroundColor = "yellow";
    t1.style.backgroundColor = "white";
  } else if (turn == 2) {
    turn = 1;
    t2.style.backgroundColor = "white";
    t1.style.backgroundColor = "yellow";
  }
}
