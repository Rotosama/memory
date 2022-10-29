function selectDifficult(diff){
    switch (diff){
        case 'easy':
            createBoard(10)
            break;
        case 'medium':
            createBoard(16)
            break;
        case'hard':
            createBoard(20)
            break;
    }
    showBoard();
}

function showBoard(){
let menu = document.getElementById('menu');
menu.style.display = 'none';
let board = document.getElementById('board');
board.style.display = 'flex';
}

function createBoard(num){
    
    for(let i=0; i<num;i++){
        let card = document.createElement("div");
        card.classList.add('card');
        card.innerHTML = i;
        let mainBoard = document.getElementById('board');
        mainBoard.appendChild(card);
    
}
}