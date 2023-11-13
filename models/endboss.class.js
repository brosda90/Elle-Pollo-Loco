class Endboss extends MovableObject {
  width = 200;
  height = 300;
  x = 2800;
  y = 150;
  speedX = 0;
  SOUND_ALERT = new Audio("audio/Endboss.mp3");
  SOUND_HURT = new Audio("audio/Endboss hit.mp3");
  SOUND_WIN = new Audio("audio/you win.mp3");
  SOUND_DEAD = new Audio("audio/Endboss dead.mp3");

  wasHurtBefore = false;
  hasPlayedDeadSound = false;

  hit = false;

  IMAGES_ALERT = this.generateImagePaths(
    "img/4_enemie_boss_chicken/3_attack",
    "G",
    13,
    20
  );

  IMAGES_WALK = this.generateImagePaths(
    "img/4_enemie_boss_chicken/1_walk",
    "G",
    1,
    4
  );

  IMAGES_HURT = this.generateImagePaths(
    "img/4_enemie_boss_chicken/4_hurt",
    "G",
    21,
    23
  );
  IMAGES_DEAD = this.generateImagePaths(
    "img/4_enemie_boss_chicken/5_dead",
    "G",
    24,
    26
  );

  /**
   * Constructs the Endboss object and loads necessary images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.animate();
  }

  /**
   * Handles the movement logic for the Endboss, including stopping movement when dead.
   */
  moveEndboss() {
    if (this.isDead() || this.world.character.isDead()) {
      this.speedX = 0;
      return;
    }

    if (!this.isHurt()) {
      this.x -= this.speedX;
    }
  }

  /**
   * Sets the Endboss state to dead and triggers the win screen after a delay.
   */
  die() {
    this.dead = true;
    setTimeout(() => this.showWinScreen(), 4000);
  }

  /**
   * Handles the behavior when the Endboss is hurt, playing animations and sounds.
   */
  handleHurt() {
    this.playAnimation(
      this.wasHurtBefore ? this.IMAGES_HURT : this.IMAGES_ALERT
    );
    this.playSoundOnce(
      this.wasHurtBefore ? this.SOUND_HURT : this.SOUND_ALERT,
      0.5
    );
    if (!this.wasHurtBefore) {
      this.speedX = 0;
      setTimeout(() => {
        this.wasHurtBefore = true;
        this.speedX = 15;
      }, this.IMAGES_ALERT.length * 160);
    }
  }

  /**
   * Sets the Endboss to a hurt state and adjusts speed if it's the first time being hurt.
   */
  hurt() {
    this.hurting = true;
    if (!this.wasHurtBefore) {
      this.speedX = -25;
    }
    setTimeout(() => (this.hurting = false), 1000);
  }

  /**
   * Checks if the Endboss is dead.
   * @returns {boolean} True if the Endboss is dead, false otherwise.
   */
  isDead() {
    return this.dead;
  }

  /**
   * Checks if the Endboss is hurt.
   * @returns {boolean} True if the Endboss is hurt, false otherwise.
   */
  isHurt() {
    return this.hurting;
  }

  /**
   * Displays the win screen.
   */
  showWinScreen() {
    const winContainer = document.getElementById("win-container");
    document.getElementById("touch-controls").style.display = "none";
    winContainer.style.display = "block";

    setTimeout(() => {
      const restartGameButton = document.getElementById("restartGameButton");
      restartGameButton.addEventListener("click", () => location.reload());
    }, 1000);
  }

  /**
   * Plays a sound once, ensuring it doesn't loop or repeat.
   * @param {Audio} sound - The sound to play.
   * @param {number} volume - The volume at which to play the sound.
   */
  playSoundOnce(sound, volume = 1.0) {
    if (!sound.ended && !sound.playing) {
      sound.volume = volume;
      sound.play();
      sound.playing = true;

      //Status zurückzusetzen, wenn der Sound zu Ende ist
      sound.onended = () => {
        sound.playing = false;
      };
    }
  }

  /**
   * Handles the behavior when the Endboss dies, playing animations and sounds, and removing the boss after death.
   */
  handleDeath() {
    this.playAnimation(this.IMAGES_DEAD);
    this.playSoundOnce(this.SOUND_DEAD);
    this.playSoundOnce(this.SOUND_WIN, 0.2);
    this.speedX = 0;
    setTimeout(
      () => this.removeBossAfterDeath(),
      this.IMAGES_DEAD.length * 1000
    );
  }

  /**
   * Removes the Endboss from the list of enemies and hides the health bar.
   */
  removeBossAfterDeath() {
    const index = this.world.level.enemies.indexOf(this);
    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
      this.world.endbossHealthbar.isVisible = false;
    }
  }

  /**
   * Initiates the animation loop for the Endboss, handling movement and state changes.
   */
  animate() {
    setInterval(() => {
      this.moveEndboss();

      if (this.isDead()) {
        this.handleDeath();
      } else if (this.isHurt()) {
        this.handleHurt();
      } else {
        this.playAnimation(this.IMAGES_WALK);
      }
    }, 160);
  }
}
