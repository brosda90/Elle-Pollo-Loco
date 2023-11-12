class Bottle extends Collectible {
  /**
   * Creates a new bottle object.
   * @param {number} x - The x-coordinate of the bottle.
   * @param {number} y - The y-coordinate of the bottle.
   */
  constructor(x, y) {
    super(x, y, ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"]);
    this.height = 80;
    this.width = 80;
    this.frameOffset = { x: 15, y: -50, width: -30, height: 50 };
  }
}

class BottleCube extends Collectible {
  IMAGES = [
    "img/6_salsa_bottle/salsa_bottle cube 1.png",
    "img/6_salsa_bottle/salsa_bottle cube 2.png",
    "img/6_salsa_bottle/salsa_bottle cube 3.png",
    "img/6_salsa_bottle/salsa_bottle cube 4.png",
    "img/6_salsa_bottle/salsa_bottle cube 5.png",
  ];

  currentImageIndex = 0;
  animationSpeed = 200;
  lastChange = Date.now();

  constructor(x, y) {
    super(x, y, ["img/6_salsa_bottle/salsa_bottle cube 1.png"]);
    this.height = 80;
    this.width = 80;
    this.frameOffset = { x: 15, y: -50, width: -30, height: 50 };
    this.loadImages(this.IMAGES);
  }

  animate() {
    if (Date.now() - this.lastChange > this.animationSpeed) {
      this.lastChange = Date.now();
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.IMAGES.length;
      this.img = this.imageCache[this.IMAGES[this.currentImageIndex]];
    }
  }

  draw(ctx) {
    this.animate();
    super.draw(ctx);
  }
}

class Coin extends Collectible {
  /**
   * Creates a new coin object.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super(x, y, ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"]);
    this.frameOffset = { x: 15, y: 50, width: -30, height: -100 };
  }
}
