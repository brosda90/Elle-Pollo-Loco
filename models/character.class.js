class Character extends MovableObject {
  height = 280;
  y = 80;
  speed = 5;
  idleCounter = 0; // Counter to keep track of idle time
  hasScaled = false;
  statusBar = null;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  world;
  running_sound = new Audio("audio/running.mp3");

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

  lose() {
    setTimeout(() => {
      document.getElementById("lose-container").style.display = "block";
    }, 2000); // 2 Sekunden Verzögerung
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.idleCounter = 0; // Reset the counter if moving
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.idleCounter = 0; // Reset the counter if moving
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 100;
      //console.log(this.y);
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.idleCounter = 0; // Reset the counter
        this.lose();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.idleCounter = 0; // Reset the counter
      } else if (this.isAboveGround()) {
        // Wird später in einem separaten setInterval behandelt
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleCounter = 0; // Reset the counter
      }
    }, 60);

    // Hinzugefügter setInterval speziell für IMAGES_JUMPING
    setInterval(() => {
      if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.idleCounter = 0; // Reset the counter
      }
    }, 180); // Hier können Sie die Geschwindigkeit ändern. 120ms als Beispiel für eine langsamere Animation.

    setInterval(() => {
      if (
        !this.isDead() &&
        !this.isHurt() &&
        !this.isAboveGround() &&
        !this.world.keyboard.RIGHT &&
        !this.world.keyboard.LEFT
      ) {
        if (this.idleCounter >= 3000 / 200) {
          // Play the long idle animation if idleCounter has reached 15 (3 seconds)
          this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
          // Otherwise, play the regular idle animation and increment the counter
          this.playAnimation(this.IMAGES_IDLE);
          this.idleCounter++;
        }
      }
    }, 200);
  }
}
