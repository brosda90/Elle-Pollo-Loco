class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Constructs a new Cloud object.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = 0 + Math.random() * 500;
    this.animate();
  }

  /**
   * Animates the cloud's movement.
   */
  animate() {
    this.moveLeft();
  }

  /**
   * Moves the cloud to the left based on its speed.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
