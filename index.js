var Game = /** @class */ (function () {
    function Game() {
        this.currentPlayer = 'X';
        this.gameWon = false;
        this.game = true;
        this.draw = false;
        this.gameBoard = ["", "", "", "", "", "", "", "", ""];
        this.winningProbablity = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }
    Game.prototype.playerChange = function () {
        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";
    };
    Game.prototype.handleCellClick = function (selectedCell) {
        var selected = selectedCell.target;
        var selectedIndex = "" + selected.id;
        gamePlay.cellClicked(selected, selectedIndex);
        gamePlay.validation();
    };
    Game.prototype.cellClicked = function (clicked, clickedIndex) {
        this.gameBoard[clickedIndex] = this.currentPlayer;
        clicked.innerHTML = this.currentPlayer;
    };
    Game.prototype.validation = function () {
        for (var i = 0; i <= 7; i++) {
            var gameCondition = this.winningProbablity[i];
            var condition1 = this.gameBoard[gameCondition[0]];
            var condition2 = this.gameBoard[gameCondition[1]];
            var condition3 = this.gameBoard[gameCondition[2]];
            if (condition1 == '' || condition2 == '' || condition3 == '') {
                continue;
            }
            if (condition1 == condition2 && condition2 == condition3) {
                this.gameWon = true;
                break;
            }
        }
        if (this.gameWon) {
            var result = document.getElementById('winPopUp');
            result.setAttribute('class', 'winPopup show');
            var display = document.getElementById('msg');
            display.innerHTML = this.currentPlayer + " has won";
            var resetter = document.getElementById('reset');
            result.appendChild(display);
            result.appendChild(resetter);
            document.body.appendChild(result);
            return;
        }
        var count = 0;
        var copyBoard = this.gameBoard;
        copyBoard.forEach(function (element) {
            if (element != "")
                count++;
        });
        if (count > 8) {
            var result = document.getElementById('winPopUp');
            result.setAttribute('class', 'winPopup show');
            var display = document.getElementById('msg');
            display.innerText = "It's a TIE";
            var resetter = document.getElementById('reset');
            result.appendChild(display);
            result.appendChild(resetter);
            document.body.appendChild(result);
            return;
        }
        gamePlay.playerChange();
    };
    Game.prototype.reset = function () {
        document.querySelectorAll('.cell').forEach(function (cell) { return cell.innerHTML = ""; });
        this.gameBoard = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = 'X';
        this.game = true;
        this.gameWon = false;
        var result = document.getElementById('winPopUp');
        result.setAttribute('class', 'winPopup');
        document.body.appendChild(result);
        document.querySelectorAll('.cell').forEach(function (cell) { return cell.addEventListener('click', gamePlay.handleCellClick, { once: true }); });
    };
    return Game;
}());
var gamePlay = new Game();
document.querySelectorAll('.cell').forEach(function (cell) { return cell.addEventListener('click', gamePlay.handleCellClick, { once: true }); });
