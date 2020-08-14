let currentPlayer = 'X';
const resultDisplay = document.getElementById('msg');
let gameBoard = ["","","","","","","","",""];
let gameWon = false;
let game = true;
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerChange(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
}
function handleClick(selectedCell){
    const selected = selectedCell.target;
    const selectedIndex = `${selected.id}`;
    if(gameBoard[selectedIndex]!==""|| !game){
        return;
    }
    cellClicked(selected,selectedIndex);
    validation();
}

function cellClicked(clicked, clickedIndex){
    gameBoard[clickedIndex] = currentPlayer;
    if(clicked=='O')
    {
        clicked.setAttribute('style','color:#acacac')
    }
    clicked.innerHTML = currentPlayer;
}

function validation(){
    for(let i=0;i<=7;i++){
        const gameCondition =winningCondition[i];
        let condition1 = gameBoard[gameCondition[0]]; 
        let condition2 = gameBoard[gameCondition[1]]; 
        let condition3 = gameBoard[gameCondition[2]];
        if(condition1==''||condition2==''||condition3=='')
        {
            continue;
        }
        if(condition1==condition2&&condition2==condition3){
            gameWon = true;
            break;
        }
    }
    if(gameWon){
        let result = document.getElementById('winPopUp');
        result.setAttribute('class','winPopup show');
        let display = document.getElementById('msg');
        display.innerHTML = `${currentPlayer} has won`;
        let resetter = document.getElementById('reset');
        result.appendChild(display);
        result.appendChild(resetter)
        document.body.appendChild(result);
        return;
    }
    let draw = !gameBoard.includes("");
    if(draw){
        let result = document.getElementById('winPopUp');
        result.setAttribute('class','winPopup show');
        let display = document.getElementById('msg');
        display.innerText = "It's a TIE";
        let resetter = document.getElementById('reset');
        result.appendChild(display);
        result.appendChild(resetter)
        document.body.appendChild(result);
        return;
    }
    playerChange();
}
function reset(){
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML="");
    let gameBoard = ["","","","","","","","",""];
    currentPlayer = 'X';
        let result = document.getElementById('winPopUp');
        result.setAttribute('class','winPopup');
        document.body.appendChild(result);

}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
