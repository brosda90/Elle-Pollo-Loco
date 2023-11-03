class Chicken extends MovableObject {
  height = 80;
  width = 80;
  y = 350;
  hit = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.frameOffset = { x: 5, y: -30, width: -10, height: 20 };
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  hitByBottle() {
    console.log("Chicken is being hit by bottle/stomped.");
    this.speed = 0; // Stopp das Huhn
    this.hit = true;
    this.playAnimation(this.IMAGES_DEAD);

    setTimeout(() => {
      let enemiesArray = this.world.level.enemies; // Hole die Feindliste über die world-Referenz
      let index = enemiesArray.indexOf(this); // Finde den Index dieses Chicken im Array
      if (index !== -1) {
        enemiesArray.splice(index, 1); // Entferne dieses Chicken, wenn es gefunden wurde
        this.hit = false; // Setze den hit Zustand zurück
      }
    }, 2000);
  }

  isStompedBy(character) {
    let characterLeft = character.x;
    let characterRight = character.x + character.width;

    let chickenLeft = this.x;
    let chickenRight = this.x + this.width;

    let offsetX = 20; // Sie können diesen Wert ändern, um den Offset anzupassen
    let condition2 = this.character.speedY < 0; // Der Charakter fällt nach unten

    let condition1 =
      characterRight >= chickenLeft - offsetX &&
      characterLeft <= chickenRight + offsetX;

    console.log(condition1);
    console.log(condition2);
    let isStomping = condition1 && condition2;

    if (isStomping) {
      this.hit = true;
    }
    return isStomping;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.hit && !this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }
}
