class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.player = new Player(
      this.gameScreen,
      212,
      450,
      75,
      150,
      "images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.frames = 0;
    this.timeLeft = 30;
    this.stats = document.getElementById("stats-container");
    this.clockContainer = document.getElementById("clock-container");
    this.clock = document.getElementById("clock");
    this.endMessage = document.getElementById("end-message");
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.gameEndScreen.style.display = "none";
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "inherit";
    this.stats.style.display = "block";
    this.clockContainer.style.display = "flex";
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();
    this.frames++;

    if (this.frames % 120 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (this.frames % 60 === 0) {
      this.timeLeft--;
      this.clock.innerHTML = this.timeLeft;
    }

    if (this.timeLeft <= 0) {
      this.gameIsOver = true;
      this.gameOver();
    }

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();

    this.obstacles.forEach((obstacle, i, arr) => {
      obstacle.move();
      if (obstacle.top > 640) {
        arr.splice(i, 1);
        obstacle.element.remove();
        this.score++;
      }
      if (this.player.didCollide(obstacle)) {
        this.lives--;

        arr.splice(i, 1);
        obstacle.element.remove();
        if (this.lives <= 0) {
          this.gameIsOver = true;
          this.gameOver();
        }
      }
    });

    this.scoreElement.innerHTML = this.score;
    this.livesElement.innerHTML = this.lives;
  }

  returnLivesMessage() {
    if (this.lives > 1) {
      return `${this.lives} lives remaining`;
    } else {
      return `${this.lives} life remaining`;
    }
  }

  gameOver() {
    console.log("Game over");
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
    this.gameScreen.style.height = `${0}px`;
    this.gameScreen.style.width = `${0}px`;
    this.gameScreen.style.display = "none";
    this.stats.style.display = "none";
    this.clockContainer.style.display = "none";
    this.gameEndScreen.style.display = "inherit";
    if (this.timeLeft <= 0) {
      this.endMessage.innerText = `You won! You finished with a score of ${
        this.score
      } and ${this.returnLivesMessage()}!`;
    } else {
      this.endMessage.innerText = `You lost!  You ran out of lives and finished with a score of ${this.score}.`;
    }
  }
}
