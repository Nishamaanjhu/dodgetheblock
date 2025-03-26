// Variables
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");

let playerPosition = 130;
let obstaclePosition = 0;
let obstacleSpeed = 5;
let score = 0;
let gameOver = false;

// Key Movement Listener
document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= 20;
    } else if (e.code === "ArrowRight" && playerPosition < 260) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + "px";
});

// Obstacle Movement
function moveObstacle() {
    if (gameOver) return;
    
    obstaclePosition += obstacleSpeed;
    obstacle.style.top = obstaclePosition + "px";

    // Reset obstacle when it goes off screen
    if (obstaclePosition > 500) {
        obstaclePosition = -50;
        obstacle.style.left = Math.floor(Math.random() * 260) + "px";
        score++;
        scoreBoard.textContent = "Score: " + score;
    }

    // Collision Detection
    if (checkCollision()) {
        alert("Game Over! Final Score: " + score);
        gameOver = true;
        window.location.reload();
    }
    requestAnimationFrame(moveObstacle);
}

// Collision Check Function
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.bottom < obstacleRect.top ||
        playerRect.top > obstacleRect.bottom ||
        playerRect.right < obstacleRect.left ||
        playerRect.left > obstacleRect.right
    );
}

// Start the Game
moveObstacle();
