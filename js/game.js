let canvas;
let world;
let keyboard = new Keyboard();


function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  level1 = new Level}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 18) {
    keyboard.ALT = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 18) {
    keyboard.ALT = false;
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("startGameButton");
  startGameButton.addEventListener("click", () => {
    startGame();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('retryGameButton').addEventListener('click', function() {
      location.reload(); // This will refresh the entire page.
  });
});


function startGame() {
  // Verbergen Sie den Startbildschirm und zeigen Sie das Canvas-Element an
  const startGameButton = document.getElementById ("startGameButton");
  const description = document.getElementById ("description");
  const startScreen = document.getElementById("startScreen");
  const canvas = document.getElementById("canvas");
  startScreen.style.display = "none";
  startGameButton.style.display = "none";
  description.style.display = "none";
  canvas.style.display = "block";

  
  // Initialisieren Sie das Spiel
  init();
 

  
}