class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
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
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "inherit";
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
  }

  gameOver() {
    console.log("Game over");
    this.gameScreen.style.height = `${0}px`;
    this.gameScreen.style.width = `${0}px`;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "inherit";
  }
}
