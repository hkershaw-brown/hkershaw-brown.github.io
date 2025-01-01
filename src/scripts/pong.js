const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Create the paddle (left and right)
const paddleWidth = 10, paddleHeight = 100;
const leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };

// Create the ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 5,
  speedY: 5,
  dx: 5,
  dy: 5,
};

// Draw functions
function drawPaddle(x, y, width, height) {
  context.fillStyle = "#FFF";
  context.fillRect(x, y, width, height);
}

function drawBall(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fillStyle = "#FFF";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  drawBall(ball.x, ball.y, ball.radius);
}

// Ball movement
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with top and bottom walls
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Ball collision with paddles
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
    ball.dx *= -1;
  }

  if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
    ball.dx *= -1;
  }

  // Ball goes out of bounds (left or right)
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    resetBall();
  }
}

// Reset ball to the center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
  ball.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
}

// Paddle movement
function updatePaddles() {
  if (leftPaddle.dy !== 0) {
    leftPaddle.y += leftPaddle.dy;
  }

  if (rightPaddle.dy !== 0) {
    rightPaddle.y += rightPaddle.dy;
  }

  // Prevent paddles from going out of bounds
  leftPaddle.y = Math.max(0, Math.min(canvas.height - leftPaddle.height, leftPaddle.y));
  rightPaddle.y = Math.max(0, Math.min(canvas.height - rightPaddle.height, rightPaddle.y));
}

// Control paddles
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    rightPaddle.dy = -8;
  }
  if (event.key === "ArrowDown") {
    rightPaddle.dy = 8;
  }
  if (event.key === "w") {
    leftPaddle.dy = -8;
  }
  if (event.key === "s") {
    leftPaddle.dy = 8;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    rightPaddle.dy = 0;
  }
  if (event.key === "w" || event.key === "s") {
    leftPaddle.dy = 0;
  }
});

// Game loop
function gameLoop() {
  updateBall();
  updatePaddles();
  draw();
  requestAnimationFrame(gameLoop); // Keep looping
}

gameLoop();
