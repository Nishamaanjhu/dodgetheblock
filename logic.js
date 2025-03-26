// Variables
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");

let playerPosition = 130;
let obstaclePosition = 0;
let obstacleSpeed = 8; // Increased speed for challenge
let score = 0;
let gameOver = false;
let touchStartX = 0;
let touchEndX = 0;
const moveDistance = 165; // Fast movement distance

// Function to Set Player Position (Boundary Check)
function setPlayerPosition(newPosition) {
    if (newPosition >= 0 && newPosition <= 260) {
        playerPosition = newPosition;
        player.style.left = `${playerPosition}px`;
    }
}

// Desktop Key Movement
document.addEventListener("keydown", function (e) {
    if (gameOver) return;
    if (e.code === "ArrowLeft") {
        setPlayerPosition(playerPosition - moveDistance);
    } else if (e.code === "ArrowRight") {
        setPlayerPosition(playerPosition + moveDistance);
    }
});

// Touch Controls for Mobile
gameContainer.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
});

gameContainer.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

// Handle Swipe Movement
function handleSwipe() {
    if (gameOver) return;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -100) {
        // Swipe Left
        setPlayerPosition(playerPosition - moveDistance);
    } else if (swipeDistance > 100) {
        // Swipe Right
        setPlayerPosition(playerPosition + moveDistance);
    }
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

// Initialize the Game
moveObstacle();
