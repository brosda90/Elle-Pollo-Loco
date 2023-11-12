class ThrowableObject extends MovableObject {
  world;
  initialXSpeed = 20;
  isSplashing = false;

  IMAGES_BOTTLE_ROTATION = this.generateImagePaths(
    "img/6_salsa_bottle/bottle_rotation",
    "B",
    1,
    4
  );

  IMAGES_BOTTLE_SPLASH = this.generateImagePaths(
    "img/6_salsa_bottle/bottle_rotation/bottle_splash",
    "S",
    1,
    6
  );

  constructor(x, y, world) {
    super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.world = world;

    if (this.world.character.otherDirection) {
      this.x = x - this.width - 70;
      this.speedX = -this.initialXSpeed;
    } else {
      this.x = x;
      this.speedX = this.initialXSpeed;
    }

    this.y = y;
    this.height = 60;
    this.width = 70;
    this.throw();
  }

  /**
   * Plays the bottle break sound effect.
   */
  playBottleBreakSound() {
    if (this.isSplashing && !this.hasPlayedBrokeSound) {
      this.world.playSound("audio/bottle broke.mp3");
      this.hasPlayedBrokeSound = true;
    }
  }
  /**
   * Initiates the throwing action of the object.
   */
  throw() {
    if (this.world.character.bottleCount < 20) {
      return; // Not enough bottles to throw
    }

    this.speedY = 20;
    this.applyGravity();
    this.world.playSound("audio/bottlethrow.wav");
    this.decreaseBottleCount();

    let animationInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.handleBottleFlight();
      }

      if (this.shouldSplash()) {
        this.startSplashing(animationInterval);
      }
    }, 80);
  }
  /**
   * Decreases the bottle count of the character.
   */
  decreaseBottleCount() {
    this.world.character.bottleCount -= 20;
    this.world.statusBarBottles.setPercentage(this.world.character.bottleCount);
  }
  /**
   * Handles the flight animation of the bottle.
   */
  handleBottleFlight() {
    this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    this.x += this.speedX;
  }
  /**
   * Determines if the bottle should splash based on its position.
   * @returns {boolean}
   */
  shouldSplash() {
    return (
      (this.y >= 350 || this.world.checkIfBottleHits()) && !this.isSplashing
    );
  }
  /**
   * Starts the splashing animation and sound, then clears the interval.
   * @param {number} animationInterval - The interval ID to clear.
   */
  startSplashing(animationInterval) {
    this.speedY = 10;
    this.isSplashing = true;
    this.playBottleBreakSound();
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH, () => {
      clearInterval(animationInterval);
    });
  }
}
