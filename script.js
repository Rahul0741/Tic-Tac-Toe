let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newgamebtn = document.querySelector(".new-btn");
let turn_1 = true;
let turnIndicator = document.querySelector("#turn-indicator");

let gameOver = false; // To track if the game has ended

const win_pattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game
const resetgame = () => {
    turn_1 = true;
    gameOver = false; // Reset the gameOver flag
    enable_boxes();
    msgcontainer.classList.add("hide");
    msg.innerText = "";
    turnIndicator.innerHTML = "Player O's turn"; // Reset turn indicator
};

// Add event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return; // Prevent actions if the game is over

        if (turn_1) {
            box.innerText = "O";
            turnIndicator.innerHTML = "Player X's turn"; // Update turn indicator
        } else {
            box.innerText = "X";
            turnIndicator.innerHTML = "Player O's turn"; // Update turn indicator
        }

        turn_1 = !turn_1; // Toggle turn
        box.disabled = true; // Disable clicked box

        checkWinner(); // Check if there's a winner
    });
});

// Function to disable all boxes
const disable_boxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes
const enable_boxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to handle the winner display
const showWinner = (winner) => {
    msg.innerText = `Congratulations, The Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    gameOver = true; // Set the gameOver flag
    turnIndicator.innerHTML = ""; // Clear the turn indicator
    disable_boxes();
};

// Function to handle a draw
const Draw = () => {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove("hide");
    gameOver = true; // Set the gameOver flag
    turnIndicator.innerHTML = ""; // Clear the turn indicator
    disable_boxes();
};

// Function to check for a winner or a draw
const checkWinner = () => {
    for (let pattern of win_pattern) {
        let pos0Val = boxes[pattern[0]].innerText;
        let pos1Val = boxes[pattern[1]].innerText;
        let pos2Val = boxes[pattern[2]].innerText;

        if (pos0Val !== "" && pos0Val === pos1Val && pos1Val === pos2Val) {
            showWinner(pos0Val);
            return; // Stop further execution after a win
        }
    }

    // Check for a draw
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false; // Found an empty box, not a draw
            break;
        }
    }

    if (isDraw) {
        Draw();
    }
};

// Event listeners for reset and new game buttons
newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
