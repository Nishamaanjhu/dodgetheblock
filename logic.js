// Variables
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");

let playerPosition = 130;
let obstaclePosition = 0;
let obstacleSpeed = 8; // Faster falling speed
let score = 0;
let gameOver = false;
let touchStartX = 0;
let touchEndX = 0;
const moveDistance = 65; // Fast block movement

// Key Movement for Desktop
document.addEventListener("keydown", function (e) {
    if (gameOver) return;
    if (e.code === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= moveDistance;
    } else if (e.code === "ArrowRight" && playerPosition < 260) {
        playerPosition += moveDistance;
    }
    player.style.left = `${playerPosition}px`;
});

// Touch Controls for Mobile
gameContainer.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
});

gameContainer.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

// Swipe Detection with Fast Movement
function handleSwipe() {
    if (gameOver) return;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -50 && playerPosition > 0) {
        // Swipe Left
        playerPosition -= moveDistance;
    } else if (swipeDistance > 50 && playerPosition < 260) {
        // Swipe Right
        playerPosition += moveDistance;
    }
    player.style.left = `${playerPosition}px`; // Immediate position change
}

// Obstacle Movement
function moveObstacle() {
    if (gameOver) return;

    obstaclePosition += obstacleSpeed;
    obstacle.style.top = `${obstaclePosition}px`;

    // Reset obstacle when it goes off screen
    if (obstaclePosition > 500) {
        obstaclePosition = -50;
        obstacle.style.left = Math.floor(Math.random() * 260) + "px";
        score++;
        scoreBoard.textContent = `Score: ${score}`;
    }

    // Collision Detection
    if (checkCollision()) {
        alert(`Game Over! Final Score: ${score}`);
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
