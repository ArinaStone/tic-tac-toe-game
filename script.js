'use strict';

// Начальные настройки
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const message = document.getElementById('gameMessage');
message.classList.remove('message-appear');

// Смена игрока
function handlePlayerTurn(clickedCellIndex) {
    // Проверка клетки и активна ли игра
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    // Установка символа текущего игрока и переключение хода
    gameBoard[clickedCellIndex] = currentPlayer;
    checkForWinOrDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Выбор всех ячеек и добавление слушателя событий
const cells = document.querySelectorAll('.gameboard__cell');
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
});

// Обработка кликов по ячейкам
function cellClicked(clickedCellEvent) {
    // Проверка идентификатора ячейки
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    // Переключение хода и обновление интерфейса
    handlePlayerTurn(clickedCellIndex);
    updateUI();
    clickedCell.style.backgroundColor = '#fae798';
}

// Обновление интерфейса
function updateUI() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
}

// Возможные выигрышные комбинации
const winConditions = [
    [0, 1, 2], // Верхний ряд
    [3, 4, 5], // Средний ряд
    [6, 7, 8], // Нижний ряд
    [0, 3, 6], // Левый столбик
    [1, 4, 7], // Средний столбик
    [2, 5, 8], // Правый столбик
    [0, 4, 8], // Диагональ слева направо
    [2, 4, 6]  // Диагональ справа налево
];

// Проверка статуса игры
function checkForWinOrDraw() {
    let roundWon = false;
    // Перебор выигрышных комбинаций
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }
    // Игрок выиграл
    if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }
    // Ничья
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
}

// Объявление победителя
function announceWinner(player) {
    message.innerText = `🎉 Player ${player} Wins!`;
    message.classList.add('message-appear');
}

// Объявление ничьей
function announceDraw() {
    message.innerText = '👍 Game Draw!';
    message.classList.add('message-appear');
}

// Добавление кнопки сброса
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);

// Перезапуск игры
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#fff';
    });
    message.innerText = '';
    message.classList.remove('message-appear');

}
