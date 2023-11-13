let canvas;
let world;
let keyboard = new Keyboard();

// Mapping key codes to their actions.
const keyMap = {
  39: "RIGHT",
  37: "LEFT",
  38: "UP",
  40: "DOWN",
  32: "SPACE",
  18: "ALT",
};

/**
 * Handles keyboard events and updates the keyboard state.
 * @param {KeyboardEvent}
 * @param {boolean}
 */
function handleKeyEvent(event, isKeyDown) {
  const keyAction = keyMap[event.keyCode];
  if (keyAction) {
    keyboard[keyAction] = isKeyDown;
  }
}

/**
 * Sets up event listeners for keyboard inputs.
 */
function setupKeyboardListeners() {
  document.addEventListener("keydown", (event) => handleKeyEvent(event, true));
  document.addEventListener("keyup", (event) => handleKeyEvent(event, false));
}

/**
 * Hides control manual spans.
 */
function hideControlManualSpans() {
  var spans = document.querySelectorAll("#control-manual span");
  spans.forEach(function (span) {
    span.style.display = "none";
  });
}

/**
 * Toggles the control manual display.
 */
function toggleControlManual() {
  var controlManual = document.getElementById("control-manual");
  var gameInfo = document.getElementById("open-game-info");

  if (controlManual.style.display === "none") {
    controlManual.style.display = "block";
    animateControlManual(controlManual, 0, 300);
    gameInfo.style.display = "none";
  } else {
    controlManual.style.display = "none";
    gameInfo.style.display = "flex";
    hideControlManualSpans();
  }
}

/**
 * Animates the control manual for smooth display transitions.
 * @param {HTMLElement}
 */
function animateControlManual(element, startWidth, maxWidth) {
  if (startWidth < maxWidth) {
    element.style.width = startWidth + "px";
    setTimeout(function () {
      animateControlManual(element, startWidth + 10, maxWidth);
    }, 20);
  } else {
    showControlManualSpans();
  }
}

/**
 * Shows the controls in Game.
 */
function setupGameControls() {
  const controlsInGame = document.getElementById("controlsInGame");
  const closeGame = document.getElementById("closeGame");
  const controlManualInGame = document.getElementById("control-manual-in-game");

  controlsInGame.addEventListener("click", () => {
    controlManualInGame.style.display =
      controlManualInGame.style.display === "none" ? "block" : "none";
  });

  closeGame.addEventListener("click", () => location.reload());
}

/**
 * Shows the control manual spans.
 */
function showControlManualSpans() {
  var spans = document.querySelectorAll("#control-manual span");
  spans.forEach(function (span) {
    span.style.display = "inline";
  });
}

/**
 * Toggles the game information display.
 * @param {boolean}
 */
function toggleGameInfo(open) {
  var gameInfo = document.getElementById("gameInfo");
  gameInfo.style.display = open ? "block" : "none";
  if (open) {
    animateGameInfo(gameInfo, 0, 691);
  } else {
    gameInfo.style.width = "0";
    hideGameInfoContent();
  }
}

/**
 * Animates the game information for smooth display transitions.
 * @param
 */
function animateGameInfo(element, startWidth, maxWidth) {
  if (startWidth < maxWidth) {
    element.style.width = startWidth + "px";
    setTimeout(function () {
      animateGameInfo(element, startWidth + 10, maxWidth);
    }, 10);
  } else {
    showGameInfoContent();
  }
}

/**
 * Shows the game information content.
 */
function showGameInfoContent() {
  var content = document.querySelectorAll("#gameInfo img, #gameInfo span");
  content.forEach(function (item) {
    item.style.display = "block";
  });
}

/**
 * Hides the game information content.
 */
function hideGameInfoContent() {
  var content = document.querySelectorAll("#gameInfo img, #gameInfo span");
  content.forEach(function (item) {
    item.style.display = "none";
  });
}

/**
 * Handles the touch events.
 */
function handleTouchEvent(keyCode, isKeyDown) {
  handleKeyEvent({ keyCode: keyCode }, isKeyDown);
}

/**
 * Initializes the game setup.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  level1 = new Level();
}

/**
 * Starts the game, hiding the start screen and displaying the canvas.
 */
function startGame() {
  const elementsToHide = [
    "open-controller-manual",
    "open-game-info",
    "startScreen",
    "startGameButton",
    "description",
    "controlsInGame",
    "closeGame",
    "gameInfo",
  ];

  const elementsToShow = {
    canvas: "block",
    "touch-controls": "flex",
    controlsInGame: "block",
    closeGame: "block",
  };

  elementsToHide.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });

  for (const [id, displayValue] of Object.entries(elementsToShow)) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = displayValue;
    }
  }

  initLevel1();
  init();
}

/**
 * Registers event listeners when the document is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("open-controller-manual")
    .addEventListener("click", toggleControlManual);
  document
    .getElementById("open-game-info")
    .addEventListener("click", () => toggleGameInfo(true));
  document
    .getElementById("closeInfoMenu")
    .addEventListener("click", () => toggleGameInfo(false));

  setupKeyboardListeners();

  const startGameButton = document.getElementById("startGameButton");
  const retryGameButton = document.getElementById("retryGameButton");
  const introSound = document.getElementById("introSound");
  const muteButton = document.getElementById("muteButton");
  const touchControls = document.getElementById("touch-controls");

  setupStartGameButtonListener(
    startGameButton,
    introSound,

    muteButton,
    touchControls,
    (introSound.volume = 0.1)
  );
  setupRetryGameButtonListener(retryGameButton, touchControls);
  setupMuteButtonListener(muteButton, introSound);

  hideControlManualSpans();
  hideGameInfoContent();
  setupTouchControls();
  setupGameControls();
});

/**
 * Sets up touch controls for the game.
 */
function setupTouchControls() {
  addTouchEvent("left-btn", 37);
  addTouchEvent("right-btn", 39);
  addTouchEvent("jump-btn", 32);
  addTouchEvent("throw-btn", 18);
}

/**
 * Adds a touch event listener to a button.
 * @param {string}
 * @param {number}
 */
function addTouchEvent(buttonId, keyCode) {
  const button = document.getElementById(buttonId);
  button.addEventListener("touchstart", () => handleTouchEvent(keyCode, true), {
    passive: true,
  });
  button.addEventListener("touchend", () => handleTouchEvent(keyCode, false));
}

function setupStartGameButtonListener(
  startGameButton,
  introSound,
  muteButton,
  touchControls
) {
  startGameButton.addEventListener("click", () => {
    startGame();
    introSound.pause();
    muteButton.style.display = "none";
    touchControls.style.display = "flex";
  });
}

function setupRetryGameButtonListener(retryGameButton, touchControls) {
  retryGameButton.addEventListener("click", () => {
    location.reload();
  });
}

function setupMuteButtonListener(muteButton, introSound) {
  muteButton.addEventListener("click", () => {
    introSound.muted = !introSound.muted;
    muteButton.src = introSound.muted
      ? "img/Icons/mute.png"
      : "img/Icons/playaudio.png";
  });
}
