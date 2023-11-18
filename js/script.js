window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    game = new Game();
    startGame();
  });

  function startGame() {
    console.log("start game");
    game.start();

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        console.log("Left");
        if (game.player.directionX > -4) {
          game.player.directionX -= 1;
        }
      }
      if (e.key === "ArrowRight") {
        console.log("Right");
        if (game.player.directionX < 4) {
          game.player.directionX += 1;
        }
      }
      if (e.key === "ArrowDown") {
        console.log("Down");
        if (game.player.directionY < 4) {
          game.player.directionY += 1;
        }
      }
      if (e.key === "ArrowUp") {
        console.log("UP");
        if (game.player.directionY > -4) {
          game.player.directionY -= 1;
        }
      }
    });
  }
};
