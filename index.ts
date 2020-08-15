class Game{
    currentPlayer: string = 'X';
    gameWon: boolean = false;
    game: boolean = true;
    draw: boolean = false;
    count:number;
    gameBoard : string[] =["","","","","","","","",""];
    winningProbablity: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    constructor(){}
    playerChange(){
        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";
    }
    handleCellClick(selectedCell){
        const selected = selectedCell.target;
        const selectedIndex = `${selected.id}`;
        gamePlay.cellClicked(selected,selectedIndex);
        gamePlay.validation();
        }
    cellClicked(clicked,clickedIndex){
        this.gameBoard[clickedIndex] = this.currentPlayer;
        clicked.innerHTML = this.currentPlayer;
    }    
    validation(){
        for(let i=0;i<=7;i++){
            const gameCondition = this.winningProbablity[i];
            let condition1 = this.gameBoard[gameCondition[0]]; 
            let condition2 = this.gameBoard[gameCondition[1]]; 
            let condition3 = this.gameBoard[gameCondition[2]];
            if(condition1==''||condition2==''||condition3=='')
            {
                continue;
            }
            if(condition1==condition2&&condition2==condition3){
                this.gameWon = true;
                break;
            }
        }
        if(this.gameWon){
            let result = document.getElementById('winPopUp');
            result.setAttribute('class','winPopup show');
            let display = document.getElementById('msg');
            display.innerHTML = `${this.currentPlayer} has won`;
            let resetter = document.getElementById('reset');
            result.appendChild(display);
            result.appendChild(resetter)
            document.body.appendChild(result);
            return;
        }
        let count=0;
        const copyBoard = this.gameBoard;
        copyBoard.forEach(element => {
            if(element!="")
            count++;
        });
        if(count>8){
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
        gamePlay.playerChange();
    }
    reset() :void{
       document.querySelectorAll('.cell').forEach(cell => cell.innerHTML="");
        this.gameBoard = ["","","","","","","","",""];
        this.currentPlayer = 'X';
        this.game=true;
        this.gameWon = false;
            let result = document.getElementById('winPopUp');
            result.setAttribute('class','winPopup');
            document.body.appendChild(result); 
          document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', gamePlay.handleCellClick,{once:true}));

    }

}
var gamePlay = new Game();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', gamePlay.handleCellClick,{once:true}));
