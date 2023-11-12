class Character extends MovableObject {
  height = 280;
  y = 80;
  speed = 5;
  idleCounter = 0;
  hasScaled = false;
  statusBar = null;
  gameOverSoundPlayed = false;
  isJumping = false;

  game_over_sound = new Audio("audio/game over.mp3");
  hurt_sound = new Audio("audio/Character Hurt.mp3");
  walking_sound = new Audio("audio/Character walking.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  snoring_sound = new Audio("audio/snoring.mp3");

  IMAGES_IDLE = this.generateImagePaths(
    "img/2_character_pepe/1_idle/idle",
    "I",
    1,
    10
  );
  IMAGES_LONG_IDLE = this.generateImagePaths(
    "img/2_character_pepe/1_idle/long_idle",
    "I",
    11,
    20
  );
  IMAGES_WALKING = this.generateImagePaths(
    "img/2_character_pepe/2_walk",
    "W",
    21,
    26
  );
  IMAGES_JUMPING = this.generateImagePaths(
    "img/2_character_pepe/3_jump",
    "J",
    31,
    39
  );
  IMAGES_DEAD = this.generateImagePaths(
    "img/2_character_pepe/5_dead",
    "D",
    51,
    57
  );
  IMAGES_HURT = this.generateImagePaths(
    "img/2_character_pepe/4_hurt",
    "H",
    41,
    43
  );
  world;

  /**
   * Creates Character.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.frameOffset = { x: 5, y: 95, width: -10, height: -100 };
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);

    this.baseY = this.y;
    this.applyGravity();
    this.animate();
  }

  /**
   * Checks if character is in idle.
   * @returns {boolean} True if the character is in idle, false otherwise.
   */
  isIdle() {
    return (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.isAboveGround() &&
      !this.isDead() &&
      !this.isHurt()
    );
  }

  /**
   * Scales the size of the character when all coins collected.
   * sets the healthBar to 100%
   * @param {number} factor -scaling factor.
   * @param {number} y - correct y-coordinate.
   */
  scaleSize(factor, y) {
    if (!this.hasScaled) {
      let deltaHeight = this.height * factor - this.height;
      this.y -= deltaHeight;
      this.height *= factor;
      this.width *= factor;
      this.hasScaled = true;

      // Update the statusBar percentage to 100
      if (this.statusBar) {
        this.statusBar.setPercentage(100);
      }
    }
  }

  /**
   * Initiates the game over sequence.
   */
  lose() {
    if (this.gameOverSoundPlayed) return;
    this.setGameOverState();
    this.playGameOverSound();
    this.animateGameOverImage();
    this.showLoseContainerAfterDelay();
  }

  /**
   * Sets the game over state for the character.
   */
  setGameOverState() {
    this.gameLost = true;
    this.gameOverSoundPlayed = true;
  }

  /**
   * Plays the game over sound.
   */
  playGameOverSound() {
    this.game_over_sound.play();
  }

  /**
   * Animates the game over image falling into view.
   */
  animateGameOverImage() {
    let gameOverY = -490;
    let gameOverImage = new Image();
    gameOverImage.onload = () => {
      this.world.drawGameOver = (ctx) => {
        this.drawGameOverImage(ctx, gameOverImage, gameOverY);
      };
    };
    gameOverImage.src = "img/9_intro_outro_screens/game_over/game over.png";
    let fallInterval = setInterval(() => {
      gameOverY += this.speed;
      if (gameOverY >= -30) {
        clearInterval(fallInterval);
        gameOverY = -30;
      }
    }, 20);
  }

  /**
   * Displays the lose container after a delay.
   */
  showLoseContainerAfterDelay() {
    setTimeout(() => {
      document.getElementById("lose-container").style.display = "block";
      document.getElementById("touch-controls").style.display = "none";
    }, 2000);
  }
  /**
   * character moving to the right side.
   */
  movingToRightSide() {
    this.moveRight();
    this.otherDirection = false;
    this.idleCounter = 0;
  }

  /**
   * character moving to the left side.
   */
  movingToLeftSide() {
    this.moveLeft();
    this.otherDirection = true;
    this.idleCounter = 0;
  }

  /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Performs the jump action for the character.
   */
  performJump() {
    if (this.speedY === 0) {
      this.jump();
      this.isJumping = true;
      setTimeout(() => {
        this.isJumping = false;
      }, 1000); // Setzen Sie isJumping nach 1 Sekunde zurück
    }
  }

  smallJump() {
    this.speedY = +30;
    this.speedX = +30; // Negativer Wert für einen kleinen Sprung nach oben
    // Passen Sie den Wert an, um die Sprunghöhe zu steuern
  }

  checkLanding() {
    if (!this.isAboveGround()) {
      this.isJumping = false;
    }
  }

  land() {
    this.isJumping = false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Checks if the character is falling.
   * @returns {boolean} - Returns true if the character is falling, otherwise false.
   */
  isFalling() {
    return this.speedY > 0;
  }

  /**
   * Animates character's movement.
   */
  animateMovement() {
    setInterval(() => {
      if (this.isDead()) {
        this.world.camera_x = -this.x + 100;
        return;
      }

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.movingToRightSide();
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.movingToLeftSide();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.performJump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * death animation for the character.
   */
  handleDeath() {
    this.playAnimation(this.IMAGES_DEAD);
    this.idleCounter = 0;
    this.lose();
  }

  /**
   * hurt animation for the character.
   */
  handleHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.hurt_sound.play();
    this.idleCounter = 0;
  }

  /**
   * walking animation for the character.
   */
  handleWalking() {
    this.playAnimation(this.IMAGES_WALKING);
    this.walking_sound.play();
    this.snoring_sound.pause();
    this.idleCounter = 0;
  }

  /**
   * Animates the character's status.
   */
  animateStatus() {
    setInterval(() => {
      if (this.isDead()) {
        this.handleDeath();
      } else if (this.isHurt()) {
        this.handleHurt();
      } else if (
        !this.isAboveGround() &&
        (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      ) {
        this.handleWalking();
      }
    }, 60);
  }

  /**
   * Animates character's jumping action.
   */
  animateJumping() {
    setInterval(() => {
      if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.snoring_sound.pause();
        this.idleCounter = 0;
      }
    }, 180);
  }

  /**
   * Animates character's idle state.
   */
  animateIdle() {
    setInterval(() => {
      if (this.isIdle()) {
        if (this.idleCounter >= 3000 / 200) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
          this.snoring_sound.volume = 0.2;
          this.snoring_sound.play();
        } else {
          this.playAnimation(this.IMAGES_IDLE);
          this.snoring_sound.pause();
          this.idleCounter++;
        }
      } else {
        this.snoring_sound.pause();
      }
    }, 200);
  }

  /**
   * Initiates animations for the character.
   */
  animate() {
    this.animateMovement();
    this.animateStatus();
    this.animateJumping();
    this.animateIdle();
  }
}
