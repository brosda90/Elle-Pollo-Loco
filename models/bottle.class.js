class Bottle extends MovableObject {
  IMAGES_BOTTLE = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  height = 80;
  width = 80;

  constructor(x, y) {
    super(x, y);
    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.frameOffset = { x: 15, y: -50, width: -30, height: 50 };
    this.x = x;
    this.y = y;

    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 250);
  }
}
