// Abschnitt Game
const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const score = document.getElementById("score");
const startButton = document.getElementById("startButton");
const highscore = document.getElementById("highscore"); // Highscore Element
const game = document.getElementById("game");
const overlay = document.getElementById("overlay"); // Overlay-Element
const countdown = document.getElementById("countdown");

let gameInterval;
let gameRunning = false;
let highscoreValue = 0;

const originalButtonText = startButton.innerText;

function jump() {
  if (!gameRunning) return;
  car1.classList.add("jump-animation");
  setTimeout(() => car1.classList.remove("jump-animation"), 500);
}

document.addEventListener("keypress", (event) => {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
    if (!car1.classList.contains("jump-animation")) {
      jump();
    }
  }
});

game.addEventListener("click", () => {
  if (!car1.classList.contains("jump-animation")) {
    jump();
  }
});

game.addEventListener("touchstart", () => {
  if (!car1.classList.contains("jump-animation")) {
    jump();
  }
});

startButton.addEventListener("click", () => {
  let countdownValue = 3;
  countdown.innerText = countdownValue;
  countdown.style.display = "block";
  startButton.style.display = "none";
  highscore.style.display = "none";

  const countdownInterval = setInterval(() => {
    countdownValue--;
    if (countdownValue > 0) {
      countdown.innerText = countdownValue;
    } else if (countdownValue === 0) {
      countdown.innerText = "Los!";
    } else {
      clearInterval(countdownInterval);
      countdown.style.display = "none";
      startGame();
    }
  }, 1000);
});

function startGame() {
  score.innerText = 0;
  car2.style.display = "";
  game.classList.add("animate");
  car2.classList.add("animate");
  gameRunning = true;
  overlay.classList.add("hidden");

  if (gameInterval) clearInterval(gameInterval);

  gameInterval = setInterval(() => {
    const car1Top = parseInt(getComputedStyle(car1).getPropertyValue("top"));
    const car2Left = parseInt(getComputedStyle(car2).getPropertyValue("left"));

    score.innerText++;

    if (car2Left < 0) {
      car2.style.display = "none";
    } else {
      car2.style.display = "";
    }

    if (car2Left < 150 && car2Left > 25 && car1Top > 150) {
      gameRunning = false;
      clearInterval(gameInterval);

      const currentScore = parseInt(score.innerText);
      if (currentScore > highscoreValue) {
        highscoreValue = currentScore;
        highscore.innerText = `Highscore: ${highscoreValue}`;
      }

      score.innerText = 0;
      game.classList.remove("animate");
      car2.classList.remove("animate");

      startButton.style.display = "inline-block";
      highscore.style.display = "block";
      startButton.innerText = originalButtonText;
      overlay.classList.remove("hidden");
    }
  }, 50);
}
