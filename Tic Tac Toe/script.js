// script.js

const cells = document.querySelectorAll("[data-cell]");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");
const themeSwitch = document.getElementById("themeSwitch");
let currentPlayer = "X";
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent === "" && isGameActive) {
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === "X" ? "#e63946" : "#457b9d"; // Optional: Different colors for X and O
        if (checkWin(currentPlayer)) {
            statusMessage.textContent = `Player ${currentPlayer} Wins!`;
            isGameActive = false;
        } else if (isDraw()) {
            statusMessage.textContent = "It's a Draw!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === "X" || cell.textContent === "O";
    });
}

function restartGame() {
    currentPlayer = "X";
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "inherit"; // Reset color
    });
    isGameActive = true;
}

function toggleTheme(e) {
    if (e.target.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeSwitch.checked = true;
    } else {
        document.body.classList.remove("dark");
        themeSwitch.checked = false;
    }
}

// Initialize theme on page load
loadTheme();

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartButton.addEventListener("click", restartGame);
themeSwitch.addEventListener("change", toggleTheme);

statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
