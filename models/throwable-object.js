class ThrowableObject extends MovableObject {
  world;
  initialXSpeed = 20;
  isSplashing = false;

  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

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

  throw() {
    if (this.world.character.bottleCount >= 20) {
      this.speedY = 20;
      this.applyGravity();

      let animationInterval = setInterval(() => {
        if (this.isSplashing) {
          return;
        }

        if (this.y >= 350 && !this.isSplashing) {
          this.speedY = 10;
          this.isSplashing = true;
          this.playAnimation(this.IMAGES_BOTTLE_SPLASH, () => {
            this.isSplashing = false;
            clearInterval(animationInterval);
          });
        } else if (this.world.checkIfBottleHits() && !this.isSplashing) {
          this.speedY = 10;
          this.isSplashing = true;
          this.playAnimation(this.IMAGES_BOTTLE_SPLASH, () => {
            this.isSplashing = false;
            clearInterval(animationInterval);
          });
        } else {
          this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }

        this.x += this.speedX;
      }, 80);

      this.world.character.bottleCount -= 20;
      this.world.statusBarBottles.setPercentage(
        this.world.character.bottleCount
      );
    }
  }
}
