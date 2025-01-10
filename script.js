const cells = document.querySelectorAll('[data-cell]');
const winnerMessageElement = document.querySelector('.winner-message');
const winnerText = document.querySelector('[data-winner-text]');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessageElement.classList.remove('active');
    currentPlayer = 'X';
}

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function endGame(draw) {
    if (draw) {
        winnerText.textContent = 'Draw!';
    } else {
        winnerText.textContent = `${currentPlayer} Wins!`;
    }
    winnerMessageElement.classList.add('active');
}

function isDraw() {
    return [...cells].every(cell => cell.textContent === 'X' || cell.textContent === 'O');
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

restartButton.addEventListener('click', startGame);

startGame();
