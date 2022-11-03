function selectDifficult(diff) {
  switch (diff) {
    case "easy":
      createBoard(10);
      break;
    case "medium":
      createBoard(16);
      break;
    case "hard":
      createBoard(20);
      break;
  }
  showBoard();
}

function showBoard() {
  let menu = document.getElementById("menu");
  menu.style.display = "none";
  let board = document.getElementById("board");
  board.style.display = "flex";
}

function createBoard(num) {
  let value = addNumbers(num);
  for (let i = 0; i < num; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = value[i];
    let mainBoard = document.getElementById("board");
    mainBoard.appendChild(card);
  }
}
function addNumbers(num) {
  //Create a duplicate numbers array
  let randomArray = [];
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < num / 2; i++) {
      randomArray.push(i);
    }
  }
  //sort unordener array
  return randomArray.sort(() => {
    return Math.random() - 0.5;
  });
}

function compare() {}

function flip() {}

function switchTurn() {}
