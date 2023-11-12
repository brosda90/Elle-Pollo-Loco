class Chicken extends MovableObject {
  height = 80;
  width = 80;
  y = 350;
  hit = false;
  chicken_dead = new Audio("audio/stomed.mp3");

  IMAGES_WALKING = this.generateImagePaths(
    "img/3_enemies_chicken/chicken_normal/1_walk/",
    "w",
    1,
    3
  );

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Constructs a new Chicken and initializes its properties.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/w-1.png");
    this.frameOffset = { x: 5, y: -30, width: -10, height: 20 };
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1000 + Math.random() * 800;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Logic when the chicken is hit by a jump.
   */
  hitByJump() {
    this.speed = 0;
    this.hit = true;
    this.playAnimation(this.IMAGES_DEAD);
    this.chicken_dead.play();
    this.chicken_dead.volume = 0.4;
    this.world.character.smallJump();

    setTimeout(() => {
      let enemiesArray = this.world.level.enemies;
      let index = enemiesArray.indexOf(this);

      if (index !== -1) {
        enemiesArray.splice(index, 1);
        this.hit = false;
      }
    }, 2000);
  }

  /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * logic when the chicken is hit by a bottle.
   */
  hitByBottle() {
    this.speed = 0;
    this.hit = true;
    this.playAnimation(this.IMAGES_DEAD);
    this.chicken_dead.play();
    this.chicken_dead.volume = 0.4;

    setTimeout(() => {
      let enemiesArray = this.world.level.enemies;
      let index = enemiesArray.indexOf(this);

      if (index !== -1) {
        enemiesArray.splice(index, 1);
        this.hit = false;
      }
    }, 2000);
  }

  /**
   * Animates the chicken's movement and actions.
   */
  animate() {
    setInterval(() => {
      if (!this.world.character.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.hit && !this.isDead() && !this.world.character.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }
}
