class EndbossHealthbar extends MovableObject {
  IMAGES_HealthBar = [
    "img/7_statusbars/2_statusbar_endboss/blue.png",
    "img/7_statusbars/2_statusbar_endboss/green.png",
    "img/7_statusbars/2_statusbar_endboss/Orange.png",
  ];
  isVisible = false;
  hitCount = 0;

  /**
   * Constructs the health bar for the end boss.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HealthBar);
    this.x = 450;
    this.y = -10;
    this.width = 250;
    this.height = 60;
  }

  /**
   * Updates the health bar based on the number of hits taken.
   * @param {number} hitCount
   */
  updateHealthBar(hitCount) {
    this.isVisible = true;
    this.hitCount = hitCount;
    let path = this.IMAGES_HealthBar[this.resolveImageStatus()];
    this.img = this.imageCache[path];
  }

  /**
   * Draws the health bar on the canvas context if it is visible.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.isVisible) {
      super.draw(ctx);
    }
  }

  /**
   * Resolves the index of the image to use for the health bar based on the current hit count.
   * @returns {number}
   */
  resolveImageStatus() {
    if (this.hitCount === 1) {
      return 0;
    } else if (this.hitCount === 2) {
      return 1;
    } else {
      return 2;
    }
  }
}
