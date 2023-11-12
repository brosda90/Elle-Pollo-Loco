class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  endbossHealthbar = new EndbossHealthbar();
  throwableObject = [];
  upgradeSoundPlayed = false;
  backgroundSound = new Audio("audio/background sound.mp3");
  chicken_sound = new Audio("audio/chicken.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext(`2d`);
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.statusBar = this.statusBar;
    this.draw();
    this.setWorld();
    this.run();
    this.setupBackgroundSound();
  }

  /**
   * Sets up and starts the background sound.
   */
  setupBackgroundSound() {
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;
    this.backgroundSound.play();
  }

  /**
   * Sets the world reference for all characters and enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Starts the game loop.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollect();
      this.checkBottleCubeCollect();
      this.checkIfBottleHits();
      this.checkBottleCubeCollect();
    }, 200);
  }

  /**
   * Plays a sound effect.
   * @param {string} path
   */
  playSound(path) {
    if (path === "audio/background sound.mp3") return;

    let audio = new Audio(path);
    this.adjustVolume(audio, path);
    audio.play();
  }

  /**
   * Adjusts the volume for a given sound effect.
   * @param {Audio} audio
   * @param {string} path
   */
  adjustVolume(audio, path) {
    const volumeSettings = {
      "audio/collect bottle.mp3": 0.5,
      "audio/bottlethrow.wav": 0.2,
      "audio/upgrade.mp3": 0.5,
    };

    audio.volume = volumeSettings[path] || 1;
    if (path === "audio/upgrade.mp3") {
      this.setupUpgradeSound(audio);
    }
  }

  /**
   * Sets up the sound to be played when the character upgrades.
   * @param {Audio} audio
   */
  setupUpgradeSound(audio) {
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime > 1) audio.pause();
    });
  }

  /**
   * Checks and handles collisions between the character and throwable objects.
   */
  checkThrowObjects() {
    if (this.keyboard.ALT && this.character.bottleCount >= 20) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this
      );
      this.throwableObject.push(bottle);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  isCharacterJumpingOnTop(character, enemy) {
    let characterBottom = character.y + character.height;
    let enemyTop = enemy.y;
    let space = 100; // Anpassbar
    let isAboveAndFalling =
      characterBottom < enemyTop + space && character.speedY > 0;

    console.log(
      "Charakter unten:",
      characterBottom,
      "Huhn oben:",
      enemyTop,
      "Schwelle zwischen beiden:",
      space,
      "Charakter fällt:",
      character.speedY > 0,
      "isAboveAndFalling:",
      isAboveAndFalling
    );
    return character.isJumping;
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.hit) {
        console.log("Kollision mit Feind:", enemy);

        if (enemy instanceof Chicken) {
          if (this.isCharacterJumpingOnTop(this.character, enemy)) {
            console.log("Charakter springt von oben auf das Huhn");
            enemy.hitByJump();
          } else {
            console.log("Charakter kollidiert seitlich mit dem Huhn");
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        } else if (enemy instanceof Endboss) {
          console.log("Kollision mit Endboss");
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Checks if a thrown bottle hits an enemy.
   * @returns {boolean}
   */
  checkIfBottleHits() {
    let collisionDetected = false;
    for (let throwable of this.throwableObject) {
      for (let i = 0; i < this.level.enemies.length; i++) {
        let enemy = this.level.enemies[i];
        if (throwable.isColliding(enemy) && !throwable.hasPlayedBrokeSound) {
          collisionDetected = true;
          if (enemy instanceof Chicken) {
            enemy.hitByBottle();
          } else if (enemy instanceof Endboss) {
            enemy.hitCounter();
            this.endbossHealthbar.updateHealthBar(enemy.hitCount);
          }
        }
      }
    }
    return collisionDetected;
  }

  /**
   * Checks and handles collisions between the character and coins.
   */
  checkCoinCollisions() {
    this.level.coin = this.level.coin.filter((coin, index) => {
      if (!this.character.isColliding(coin)) return true;

      this.handleCoinCollection(index);
      return false;
    });

    if (this.level.coin.length === 0 && !this.upgradeSoundPlayed) {
      this.handleAllCoinsCollected();
    }
  }

  /**
   * Handles the collection of a coin.
   * @param {number} index
   */
  handleCoinCollection(index) {
    if (this.level.coin.length > 1) {
      this.playSound("audio/coin_catch.wav");
    }

    this.character.count();
    this.statusBarCoins.setPercentage(this.character.coinCount);
  }

  /**
   * Handles the event when all coins are collected.
   */
  handleAllCoinsCollected() {
    this.character.scaleSize(1.3);
    this.playSound("audio/upgrade.mp3");
    this.character.hasScaled = true;
    this.upgradeSoundPlayed = true;
  }

  /**
   * Checks and handles collisions between the character and bottle cubes.
   */
  checkBottleCubeCollect() {
    for (let i = 0; i < this.level.BottleCube.length; i++) {
      let bottleCube = this.level.BottleCube[i];
      if (
        this.character.isColliding(bottleCube) &&
        this.character.bottleCount < 100
      ) {
        this.character.countBottles(true);
        this.playSound("audio/collect bottle.mp3");
        this.statusBarBottles.setPercentage(this.character.bottleCount);

        this.level.BottleCube.splice(i, 1);

        i--;
      }
    }
  }

  /**
   * Checks and handles collisions between the character and bottles.
   */
  checkBottleCollect() {
    for (let i = 0; i < this.level.bottle.length; i++) {
      let bottle = this.level.bottle[i];
      if (
        this.character.isColliding(bottle) &&
        this.character.bottleCount < 100
      ) {
        this.character.countBottles();
        this.playSound("audio/collect bottle.mp3");
        this.statusBarBottles.setPercentage(this.character.bottleCount);

        this.level.bottle.splice(i, 1);

        i--;
      }
    }
  }

  //// DRAWING METHODS ////

  /**
   * The main drawing loop for the game, called every frame.
   */
  draw() {
    this.clearCanvas();
    this.drawWorld();
    this.drawStatusBars();
    this.handleChickenSound();

    if (this.drawGameOver) {
      this.drawGameOver(this.ctx);
    }

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the game world, including the background, characters, and objects.
   */
  drawWorld() {
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.drawBackground();
    this.drawCharactersAndObjects();
    this.ctx.restore();
  }

  /**
   * Draws the background objects and clouds.
   */
  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Draws the characters and throwable objects.
   */
  drawCharactersAndObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottle);
    this.addObjectsToMap(this.level.BottleCube);
    this.addObjectsToMap(this.throwableObject);
  }

  /**
   * Draws the UI components on the canvas.
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.endbossHealthbar);
  }

  /**
   * Handles the playing of chicken sounds when chickens are visible.
   */
  handleChickenSound() {
    let chickenVisible = this.level.enemies.some(
      (enemy) =>
        enemy instanceof Chicken &&
        enemy.x >= this.character.x - 200 &&
        enemy.x <= this.character.x + this.canvas.width
    );

    if (
      chickenVisible &&
      !this.character.isDead() &&
      this.chicken_sound.paused
    ) {
      this.chicken_sound.play();
    } else if (!chickenVisible || this.character.isDead()) {
      this.chicken_sound.pause();
    }
  }

  /**
   * Adds an array of objects to the map.
   * @param {Array} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single movable object to the map.
   * @param {MovableObject} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.showFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of a movable object for leftward movement.
   * @param {MovableObject} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image of a movable object after being flipped.
   * @param {MovableObject} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
