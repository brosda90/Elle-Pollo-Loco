class Coin extends MovableObject {
  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super(x, y);
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.frameOffset = { x: 15, y: 50, width: -30, height: -100 };
    this.x = x;
    this.y = y;

    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 250);
  }
}
